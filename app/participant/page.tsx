"use client";

import { useState } from "react";
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

// Dummy fix
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
];

export default function ListOfParticipants() {
  const [selectedDate, setSelectedDate] = useState("");
  const [filterMapel, setFilterMapel] = useState("");

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

        {/* Filters (non-functional) */}
        <div className="grid md:grid-cols-2 gap-4 mb-12">
          <div className="space-y-2">
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
              <option value="2024-01-08">Senin, 8 Januari 2024</option>
              <option value="2024-01-09">Selasa, 9 Januari 2024</option>
            </select>
          </div>

          <div className="space-y-2">
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
              <option value="Matematika">Matematika</option>
              <option value="Fisika">Fisika</option>
              <option value="Kimia">Kimia</option>
            </select>
          </div>
        </div>

        {/* STATIC CARD LIST */}
        <div className="space-y-6">
          {mockStudents.map((student) => (
            <div
              key={student.id}
              className="bg-white rounded-xl border border-border overflow-hidden"
            >
              <div className="px-6 py-4 flex justify-between">
                <div>
                  <p className="font-semibold text-foreground">
                    {student.nama}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {student.kelas}
                  </p>
                </div>
                <div className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                  {student.mataPelajaran}
                </div>
              </div>

              <div className="px-6 py-3 bg-muted/30 text-sm text-muted-foreground font-medium border-t border-border">
                <Users className="w-4 h-4 inline mr-2" />
                Sesi {student.sesi} —{" "}
                {new Date(student.hari).toLocaleDateString("id-ID")}
              </div>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-lg">
          <p className="text-foreground font-semibold">
            Total Peserta:{" "}
            <span className="text-primary text-xl">{mockStudents.length}</span>
          </p>
        </div>
      </div>
    </div>
  );
}
