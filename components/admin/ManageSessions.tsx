"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Calendar } from "lucide-react";
import SessionTutorManager from "./SessionTutorManager";

// sesi tetap
const WEEKDAY_SESSIONS = [
  { id: "1", name: "Sesi 1", waktu: "10.00–11.00" },
  { id: "2", name: "Sesi 2", waktu: "13.00–14.30" },
  { id: "3", name: "Sesi 3", waktu: "14.45–16.15" },
  { id: "4", name: "Sesi 4", waktu: "16.30–18.00" },
  { id: "5", name: "Sesi 5", waktu: "18.30–20.00" },
];

const SATURDAY_SESSIONS = [
  { id: "6", name: "Sesi 1", waktu: "09.00–10.30" },
  { id: "7", name: "Sesi 2", waktu: "10.30–12.00" },
];

function formatDateKey(d: Date) {
  return d.toISOString().slice(0, 10);
}

export default function ManageSessions() {
  const [selectedDate, setSelectedDate] = useState(() => new Date());
  const [dailySessionData, setDailySessionData] = useState<
    Record<string, Record<string, { tutors: number }>>
  >({});

  const dateKey = formatDateKey(selectedDate);
  const day = selectedDate.getDay(); // 0 = Minggu
  const isSunday = day === 0;

  // Tentukan sesi berdasarkan hari
  const sessions = useMemo(() => {
    if (isSunday) return [];
    if (day === 6) return SATURDAY_SESSIONS;
    return WEEKDAY_SESSIONS;
  }, [day, isSunday]);

  // Data default jika belum ada
  const sessionDataForDate =
    dailySessionData[dateKey] ||
    Object.fromEntries(sessions.map((s) => [s.id, { tutors: 0 }]));

  // update tutors
  const updateTutorCount = (sessionId: string, newCount: number) => {
    setDailySessionData((prev) => ({
      ...prev,
      [dateKey]: {
        ...sessionDataForDate,
        [sessionId]: { tutors: newCount },
      },
    }));
  };

  // next/prev
  const shiftDate = (days: number) => {
    const d = new Date(selectedDate);
    d.setDate(d.getDate() + days);
    setSelectedDate(d);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.35 } },
  };

  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-4 sm:p-8 lg:pl-8 max-w-7xl mx-auto"
    >
      {/* HEADER */}
      <motion.div variants={itemVariants} className="mb-10">
        <h1 className="text-4xl font-bold text-foreground">
          Kelola Sesi per Tanggal
        </h1>
        <p className="text-muted-foreground mt-2">
          Atur jumlah tutor berdasarkan tanggal tertentu
        </p>
      </motion.div>

      {/* DATE NAVIGATOR */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-10"
      >
        <div className="flex items-center gap-3">
          <button
            onClick={() => shiftDate(-1)}
            className="p-3 rounded-lg border border-border hover:bg-muted transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="px-4 py-3 rounded-lg border bg-white flex items-center gap-2 font-semibold">
            <Calendar className="w-4 h-4 text-primary" />
            {selectedDate.toLocaleDateString("id-ID", {
              weekday: "long",
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          </div>

          <button
            onClick={() => shiftDate(1)}
            className="p-3 rounded-lg border border-border hover:bg-muted transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <input
          type="date"
          value={dateKey}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
          className="px-4 py-3 rounded-lg border border-border bg-white text-foreground"
        />
      </motion.div>

      {/* CONTENT */}
      {isSunday ? (
        <motion.div
          variants={itemVariants}
          className="p-6 rounded-xl bg-muted/30 border text-center text-muted-foreground font-medium"
        >
          Hari Minggu libur. Tidak ada sesi.
        </motion.div>
      ) : (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-6"
        >
          {sessions.map((session) => (
            <SessionTutorManager
              key={session.id}
              sessionName={session.name}
              sessionTime={session.waktu}
              initialTutors={sessionDataForDate[session.id]?.tutors || 0}
              onTutorsChange={(count) => updateTutorCount(session.id, count)}
            />
          ))}
        </motion.div>
      )}
    </motion.main>
  );
}
