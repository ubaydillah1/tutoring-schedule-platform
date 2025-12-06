/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import { useSessions } from "@/hooks/useSessions";
import { useTutors } from "@/hooks/useTutors";
import { useSubjects } from "@/hooks/useSubjects";
import SessionTutorManager from "./SessionTutorManager";

const WEEKDAY = [
  { id: "1", name: "Sesi 1", waktu: "10.00–11.00" },
  { id: "2", name: "Sesi 2", waktu: "13.00–14.30" },
  { id: "3", name: "Sesi 3", waktu: "14.45–16.15" },
  { id: "4", name: "Sesi 4", waktu: "16.30–18.00" },
  { id: "5", name: "Sesi 5", waktu: "18.30–20.00" },
];

const SATURDAY = [
  { id: "6", name: "Sesi 1", waktu: "09.00–10.30" },
  { id: "7", name: "Sesi 2", waktu: "10.30–12.00" },
];

function formatDateKey(d: Date) {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function ManageSessions() {
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const dateKey = formatDateKey(selectedDate);

  const day = selectedDate.getDay();
  const isSunday = day === 0;

  const template = useMemo(() => {
    if (isSunday) return [];
    if (day === 6) return SATURDAY;
    return WEEKDAY;
  }, [day, isSunday]);

  const { data: backend = [], isLoading } = useSessions(dateKey, {
    enabled: !isSunday,
  });

  const { data: tutors = [] } = useTutors();
  const { data: subjects = [] } = useSubjects();

  const merged = template.map((tpl) => {
    const match = backend.find((b: any) => b.slotId === tpl.id);

    return {
      slotId: tpl.id,
      instanceId: match?.id ?? null,
      name: tpl.name,
      waktu: tpl.waktu,
      tutors: match?.tutors ?? [],
      subjects: match?.subjects ?? [],
    };
  });

  const shift = (delta: number) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + delta);
    setSelectedDate(d);
  };

  return (
    <motion.main className="p-4 sm:p-8 max-w-7xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Kelola Sesi per Tanggal</h1>
        <p className="text-muted-foreground">
          Atur tutor & mata pelajaran berdasarkan tanggal.
        </p>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => shift(-1)} className="p-2 border rounded-lg">
          <ChevronLeft />
        </button>

        <div className="px-4 py-2 rounded-lg border bg-white flex items-center gap-2 font-semibold">
          <Calendar className="w-4 h-4 text-primary" />
          {selectedDate.toLocaleDateString("id-ID", {
            weekday: "long",
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </div>

        <button onClick={() => shift(1)} className="p-2 border rounded-lg">
          <ChevronRight />
        </button>

        <input
          type="date"
          value={dateKey}
          className="ml-auto px-3 py-2 border rounded-lg"
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
        />
      </div>

      {isSunday ? (
        <div className="p-6 bg-muted/30 rounded-xl text-center text-muted-foreground">
          Hari Minggu libur. Tidak ada sesi.
        </div>
      ) : isLoading ? (
        <div className="text-muted-foreground">Memuat sesi…</div>
      ) : (
        <div className="grid md:grid-cols-2 gap-6">
          {merged.map((s) => (
            <SessionTutorManager
              key={`${s.slotId}-${dateKey}`}
              slotId={s.slotId}
              instanceId={s.instanceId}
              sessionName={s.name}
              sessionTime={s.waktu}
              dateKey={dateKey}
              existingTutors={s.tutors}
              existingSubjects={s.subjects}
              tutors={tutors}
              subjects={subjects}
            />
          ))}
        </div>
      )}
    </motion.main>
  );
}
