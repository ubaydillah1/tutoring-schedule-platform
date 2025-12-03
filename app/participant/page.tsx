"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Users, Filter } from "lucide-react";
import Link from "next/link";

interface Student {
  id: string;
  nama: string;
  kelas: string;
  mataPelajaran: string;
  sesi: string;
  hari: string;
}

interface SessionGroup {
  waktu: string;
  hari: string;
  subjek: string[];
  tutor: string[];
  students: Student[];
}

// Sample data
const mockStudents: Student[] = [
  {
    id: "1",
    nama: "Adi Pratama",
    kelas: "9 (A)",
    mataPelajaran: "Matematika",
    sesi: "1",
    hari: "2024-01-08",
  },
  {
    id: "2",
    nama: "Bella Kusuma",
    kelas: "9 (B)",
    mataPelajaran: "Fisika",
    sesi: "1",
    hari: "2024-01-08",
  },
  {
    id: "3",
    nama: "Citra Dewi",
    kelas: "10 (A)",
    mataPelajaran: "Matematika",
    sesi: "2",
    hari: "2024-01-08",
  },
  {
    id: "4",
    nama: "Dimas Hanif",
    kelas: "10 (B)",
    mataPelajaran: "Kimia",
    sesi: "2",
    hari: "2024-01-08",
  },
  {
    id: "5",
    nama: "Eka Putri",
    kelas: "11 (A)",
    mataPelajaran: "Biologi",
    sesi: "3",
    hari: "2024-01-08",
  },
  {
    id: "6",
    nama: "Fajar Rahman",
    kelas: "9 (C)",
    mataPelajaran: "Bahasa Inggris",
    sesi: "3",
    hari: "2024-01-09",
  },
  {
    id: "7",
    nama: "Gita Santoso",
    kelas: "11 (B)",
    mataPelajaran: "Sejarah",
    sesi: "4",
    hari: "2024-01-09",
  },
  {
    id: "8",
    nama: "Hendra Wijaya",
    kelas: "12 (A)",
    mataPelajaran: "Geografi",
    sesi: "5",
    hari: "2024-01-09",
  },
];

const SESSIONS_MAP = {
  "1": {
    waktu: "10.00–11.00",
    subjek: ["Matematika", "Fisika"],
    tutor: ["Pak Ahmad", "Bu Rina"],
  },
  "2": {
    waktu: "13.00–14.30",
    subjek: ["Kimia", "Biologi"],
    tutor: ["Pak Budi", "Bu Siti"],
  },
  "3": {
    waktu: "14.45–16.15",
    subjek: ["Bahasa Inggris", "Sejarah"],
    tutor: ["Bu Ani", "Pak Hendra"],
  },
  "4": {
    waktu: "16.30–18.00",
    subjek: ["Matematika", "Bahasa Indonesia"],
    tutor: ["Pak Ahmad", "Bu Wati"],
  },
  "5": {
    waktu: "18.30–20.00",
    subjek: ["Geografi", "Sejarah"],
    tutor: ["Pak Rudi", "Bu Eka"],
  },
};

export default function ListOfParticipants() {
  // keep the select states (they won't affect rendering)
  const [selectedDate, setSelectedDate] = useState("");
  const [filterMapel, setFilterMapel] = useState("");

  // group once from mockStudents (filters are intentionally NOT applied)
  const groupedSessions = useMemo<SessionGroup[]>(() => {
    const filtered = [...mockStudents]; // copy just in case
    const grouped: { [key: string]: SessionGroup } = {};

    filtered.forEach((student) => {
      const sessionInfo =
        SESSIONS_MAP[student.sesi as keyof typeof SESSIONS_MAP];
      const key = `${student.sesi}-${student.hari}`;

      if (!grouped[key]) {
        grouped[key] = {
          waktu: sessionInfo?.waktu || "",
          hari: student.hari,
          subjek: sessionInfo?.subjek || [],
          tutor: sessionInfo?.tutor || [],
          students: [],
        };
      }

      grouped[key].students.push(student);
    });

    return [...Object.values(grouped)].sort(
      (a, b) => new Date(a.hari).getTime() - new Date(b.hari).getTime()
    );
    // no dependencies: computed once, unaffected by selectedDate/filterMapel
  }, []);

  // keep dropdown options (static from mock)
  const uniqueDates = useMemo(() => {
    return Array.from(new Set(mockStudents.map((s) => s.hari))).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );
  }, []);

  const uniqueMapel = useMemo(() => {
    return Array.from(new Set(mockStudents.map((s) => s.mataPelajaran))).sort();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Kembali</span>
          </Link>
          <h1 className="text-lg font-bold text-foreground hidden sm:block">
            Daftar Peserta
          </h1>
          <div className="w-20" />
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-balance mb-4">
            Daftar Peserta Konsultasi
          </h1>
          <p className="text-muted-foreground text-lg">
            Lihat siswa-siswa yang telah mendaftar untuk setiap sesi
          </p>
        </motion.div>

        {/* Filters (UI only; they update state but do not affect the shown cards) */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-4 mb-12"
        >
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
              <Calendar className="w-4 h-4" />
              Filter Tanggal
            </label>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground
                        focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none custom-select-arrow"
            >
              <option value="">Semua Tanggal</option>
              {uniqueDates.map((date) => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString("id-ID", {
                    weekday: "long",
                    month: "long",
                    day: "numeric",
                  })}
                </option>
              ))}
            </select>
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-semibold text-foreground mb-2">
              <Filter className="w-4 h-4" />
              Filter Mata Pelajaran
            </label>
            <select
              value={filterMapel}
              onChange={(e) => setFilterMapel(e.target.value)}
              className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground
                        focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all appearance-none custom-select-arrow"
            >
              <option value="">Semua Mata Pelajaran</option>
              {uniqueMapel.map((mapel) => (
                <option key={mapel} value={mapel}>
                  {mapel}
                </option>
              ))}
            </select>
          </motion.div>
        </motion.div>

        {/* Sessions List (cards unchanged; grouping precomputed and static) */}
        {groupedSessions.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <Users className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-20" />
            <p className="text-muted-foreground text-lg">
              Tidak ada data peserta untuk filter yang dipilih
            </p>
          </motion.div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-6"
          >
            {groupedSessions.map((session, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-lg transition-all"
              >
                {/* Session Header */}
                <div className="bg-linear-to-r from-primary/10 to-accent/10 border-b border-border px-6 py-4">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground mb-1">
                        {new Date(session.hari).toLocaleDateString("id-ID", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })}
                      </p>
                      <h3 className="text-2xl font-bold text-foreground">
                        {session.waktu}
                      </h3>
                    </div>
                    <div className="flex flex-col gap-2">
                      <div className="text-sm">
                        <span className="font-semibold text-primary">
                          Mata Pelajaran:
                        </span>
                        <p className="text-foreground">
                          {session.subjek.join(", ")}
                        </p>
                      </div>
                      <div className="text-sm">
                        <span className="font-semibold text-primary">
                          Tutor:
                        </span>
                        <p className="text-foreground">
                          {session.tutor.join(", ")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Students List */}
                <div className="divide-y divide-border">
                  {session.students.map((student, i) => (
                    <motion.div
                      key={student.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.05 }}
                      viewport={{ once: true }}
                      className="px-6 py-4 hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                          <p className="font-semibold text-foreground">
                            {student.nama}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {student.kelas}
                          </p>
                        </div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                          {student.mataPelajaran}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Session Footer */}
                <div className="px-6 py-3 bg-muted/30 text-sm text-muted-foreground font-medium border-t border-border">
                  <Users className="w-4 h-4 inline mr-2" />
                  Total {session.students.length} peserta terdaftar
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
