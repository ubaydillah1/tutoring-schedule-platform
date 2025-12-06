/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Trash2, Clock, Users } from "lucide-react";
import { useUpdateSession } from "@/hooks/useSessions";

interface Item {
  id: string;
  name: string;
}

interface Props {
  slotId: string;
  instanceId: string | null;
  sessionName: string;
  sessionTime: string;
  dateKey: string;
  tutors: Item[];
  subjects: Item[];
  existingTutors: Item[];
  existingSubjects: Item[];
}

export default function SessionTutorManager({
  slotId,
  instanceId,
  sessionName,
  sessionTime,
  dateKey,
  tutors,
  subjects,
  existingTutors,
  existingSubjects,
}: Props) {
  const [selectedTutors, setSelectedTutors] = useState(() =>
    existingTutors.map((t) => t.id)
  );

  const [selectedSubjects, setSelectedSubjects] = useState(() =>
    existingSubjects.map((s) => s.id)
  );

  const updateMutation = useUpdateSession();

  const hasChanges = useMemo(() => {
    const eq = (a: any[], b: any[]) =>
      a.length === b.length && a.every((v, i) => v === b[i]);

    return (
      !eq(
        existingTutors.map((t) => t.id),
        selectedTutors
      ) ||
      !eq(
        existingSubjects.map((s) => s.id),
        selectedSubjects
      )
    );
  }, [selectedTutors, selectedSubjects, existingTutors, existingSubjects]);

  const save = () => {
    updateMutation.mutate({
      slotId,
      instanceId,
      date: dateKey,
      tutorIds: selectedTutors,
      subjectIds: selectedSubjects,
    });
  };

  return (
    <motion.div className="bg-white border rounded-xl p-6 shadow-sm hover:shadow-md transition">
      {/* HEADER */}
      <div className="flex justify-between mb-4">
        <div>
          <h3 className="font-semibold text-lg">{sessionName}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            {sessionTime}
          </div>
        </div>

        <div className="px-3 py-1 rounded-full text-xs bg-primary/20 text-primary font-bold flex items-center">
          {selectedTutors.length} Tutor
        </div>
      </div>

      {/* TUTORS */}
      <div className="mb-4 p-3 border rounded-lg bg-muted/40">
        <div className="font-semibold mb-2">Tutor</div>

        <div className="flex flex-wrap gap-2 mb-3">
          {selectedTutors.map((id) => {
            const t = tutors.find((x) => x.id === id);
            return (
              <span
                key={id}
                className="px-3 py-1 bg-primary/10 border border-primary/20 rounded-full flex items-center gap-2"
              >
                {t?.name}
                <Trash2
                  className="w-4 h-4 text-red-500 cursor-pointer"
                  onClick={() =>
                    setSelectedTutors((prev) => prev.filter((x) => x !== id))
                  }
                />
              </span>
            );
          })}
        </div>

        <select
          className="w-full px-3 py-2 bg-white border rounded-lg"
          onChange={(e) => {
            const val = e.target.value;
            if (val && !selectedTutors.includes(val))
              setSelectedTutors((prev) => [...prev, val]);
            e.target.value = "";
          }}
        >
          <option value="">Tambah tutor…</option>
          {tutors
            .filter((t) => !selectedTutors.includes(t.id))
            .map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
        </select>
      </div>

      {/* SUBJECTS */}
      <div className="mb-4 p-3 border rounded-lg bg-muted/40">
        <div className="font-semibold mb-2">Mata Pelajaran (maks 2)</div>

        <div className="flex flex-wrap gap-2 mb-3">
          {selectedSubjects.map((id) => {
            const s = subjects.find((x) => x.id === id);
            return (
              <span
                key={id}
                className="px-3 py-1 bg-secondary/10 border border-secondary/20 rounded-full flex items-center gap-2"
              >
                {s?.name}
                <Trash2
                  className="w-4 h-4 text-red-500 cursor-pointer"
                  onClick={() =>
                    setSelectedSubjects((prev) => prev.filter((x) => x !== id))
                  }
                />
              </span>
            );
          })}
        </div>

        {/* SUBJECT DROPDOWN HILANG JIKA 2 SUDAH TERISI */}
        {selectedSubjects.length < 2 && (
          <select
            className="w-full px-3 py-2 bg-white border rounded-lg"
            onChange={(e) => {
              const val = e.target.value;
              if (val && !selectedSubjects.includes(val))
                setSelectedSubjects((prev) => [...prev, val]);
              e.target.value = "";
            }}
          >
            <option value="">Tambah mata pelajaran…</option>
            {subjects
              .filter((s) => !selectedSubjects.includes(s.id))
              .map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
          </select>
        )}
      </div>

      {/* CAPACITY BOX */}
      <div className="p-4 bg-primary/10 border border-primary/20 rounded-lg mb-4 flex items-center justify-between">
        <div>
          <div className="text-xs uppercase text-muted-foreground">
            Kapasitas Maksimal
          </div>
          <div className="text-2xl font-bold">10 murid</div>
        </div>

        <Users className="w-10 h-10 text-primary opacity-70" />
      </div>

      {/* SAVE BUTTON */}
      <button
        onClick={save}
        disabled={!hasChanges || updateMutation.isPending}
        className={`w-full py-2 rounded-lg font-semibold transition ${
          hasChanges
            ? "bg-primary text-white hover:bg-primary/90"
            : "opacity-50 cursor-not-allowed bg-gray-300 text-gray-600"
        }`}
      >
        {updateMutation.isPending ? "Menyimpan..." : "Simpan Perubahan"}
      </button>
    </motion.div>
  );
}
