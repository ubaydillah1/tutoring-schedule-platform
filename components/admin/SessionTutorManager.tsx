"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Minus, Plus, BookOpen, Clock } from "lucide-react";

interface SessionTutorManagerProps {
  sessionName: string;
  sessionTime: string;
  initialTutors: number;
  onTutorsChange: (count: number) => void;
  allTutors?: string[];
}

const DEFAULT_TUTORS = [
  "Pak Ahmad",
  "Bu Rina",
  "Pak Budi",
  "Bu Siti",
  "Bu Ani",
  "Pak Hendra",
  "Bu Wati",
  "Pak Rudi",
  "Bu Eka",
];

export default function SessionTutorManager({
  sessionName,
  sessionTime,
  initialTutors = 0,
  onTutorsChange,
  allTutors = DEFAULT_TUTORS,
}: SessionTutorManagerProps) {
  const [tutorCount, setTutorCount] = useState(initialTutors);

  const handleAddTutor = () => {
    const newCount = tutorCount + 1;
    setTutorCount(newCount);
    onTutorsChange(newCount);
  };

  const handleRemoveTutor = () => {
    if (tutorCount > 0) {
      const newCount = tutorCount - 1;
      setTutorCount(newCount);
      onTutorsChange(newCount);
    }
  };

  const maxStudents = tutorCount * 10;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-linear-to-br from-white to-muted/30 border border-border rounded-xl p-6 hover:shadow-lg transition-shadow"
    >
      {/* Session Header */}
      <div className="flex items-start justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-foreground">{sessionName}</h3>
          <div className="flex items-center gap-2 mt-1">
            <Clock className="w-4 h-4 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">{sessionTime}</p>
          </div>
        </div>
        <span
          className={`px-3 py-1 rounded-full text-xs font-bold ${
            tutorCount > 0
              ? "bg-primary/20 text-primary"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {tutorCount} {tutorCount === 1 ? "Tutor" : "Tutors"}
        </span>
      </div>

      {/* Tutor Count Selector */}
      <div className="mb-6 p-4 bg-muted/50 rounded-lg border border-border">
        <div className="flex items-center justify-between mb-4">
          <label className="flex items-center gap-2 font-semibold text-foreground">
            <Users className="w-4 h-4 text-primary" />
            Jumlah Tutor
          </label>
          <span className="text-2xl font-bold text-primary">{tutorCount}</span>
        </div>

        {/* Increment/Decrement Buttons */}
        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: tutorCount > 0 ? 1.05 : 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleRemoveTutor}
            disabled={tutorCount === 0}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-destructive text-destructive hover:bg-destructive/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-semibold"
          >
            <Minus className="w-5 h-5" />
            Kurangi
          </motion.button>

          <motion.button
            whileHover={{ scale: tutorCount < 3 ? 1.05 : 1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleAddTutor}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-lg border-2 border-primary text-primary hover:bg-primary/10 disabled:opacity-40 disabled:cursor-not-allowed transition-all font-semibold"
          >
            <Plus className="w-5 h-5" />
            Tambah
          </motion.button>
        </div>
      </div>

      {/* Capacity Info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="p-4 rounded-lg bg-linear-to-r from-primary/10 to-accent/10 border border-primary/20"
      >
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">
              Kapasitas Maksimal
            </p>
            <p className="text-2xl font-bold text-foreground">
              {maxStudents} murid
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              {tutorCount} tutor × 10 murid/tutor
            </p>
          </div>
          <div className="p-3 rounded-lg bg-primary/20">
            <BookOpen className="w-6 h-6 text-primary" />
          </div>
        </div>
      </motion.div>

      {/* Tutor List Preview */}
      {tutorCount > 0 && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          className="mt-4 pt-4 border-t border-border"
        >
          <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
            Tutor Tersedia
          </p>
          <div className="space-y-1">
            {allTutors.slice(0, tutorCount).map((tutor, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="flex items-center gap-2 px-3 py-2 rounded-lg bg-primary/5 border border-primary/20"
              >
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="text-sm font-medium text-foreground">
                  {tutor}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
