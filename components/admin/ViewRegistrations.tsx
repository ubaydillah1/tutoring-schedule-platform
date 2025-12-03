"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Calendar, Download, Users } from "lucide-react";

interface Registration {
  id: string;
  nama: string;
  kelas: string;
  mataPelajaran: string;
  materi: string;
  waktu: string;
  hari: string;
}

const mockRegistrations: Registration[] = [
  {
    id: "1",
    nama: "Adi Pratama",
    kelas: "9 (A)",
    mataPelajaran: "Matematika",
    materi: "Persamaan Linear",
    waktu: "10.00–11.00",
    hari: "2024-01-08",
  },
  {
    id: "2",
    nama: "Bella Kusuma",
    kelas: "9 (B)",
    mataPelajaran: "Fisika",
    materi: "Gaya dan Gerak",
    waktu: "10.00–11.00",
    hari: "2024-01-08",
  },
  {
    id: "3",
    nama: "Citra Dewi",
    kelas: "10 (A)",
    mataPelajaran: "Matematika",
    materi: "Sistem Persamaan",
    waktu: "13.00–14.30",
    hari: "2024-01-08",
  },
];

export default function ViewRegistrations() {
  const [filterDate, setFilterDate] = useState("");

  const uniqueDates = useMemo(() => {
    return Array.from(new Set(mockRegistrations.map((r) => r.hari))).sort(
      (a, b) => new Date(a).getTime() - new Date(b).getTime()
    );
  }, []);

  const pageAnimation = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  const itemAnimation = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const filtered = useMemo(() => {
    return filterDate
      ? mockRegistrations.filter((r) => r.hari === filterDate)
      : mockRegistrations;
  }, [filterDate]);

  // Group by sesi (jam)
  const grouped = useMemo(() => {
    const result: Record<string, Registration[]> = {};
    filtered.forEach((r) => {
      if (!result[r.waktu]) result[r.waktu] = [];
      result[r.waktu].push(r);
    });
    return result;
  }, [filtered]);

  const sortedSessions = Object.keys(grouped).sort();

  return (
    <motion.main
      variants={pageAnimation}
      initial="hidden"
      animate="visible"
      className="p-4 sm:p-8 lg:pl-8 max-w-7xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={itemAnimation} className="mb-8">
        <h1 className="text-4xl font-bold text-foreground">Data Pendaftaran</h1>
        <p className="text-muted-foreground mt-2">
          Lihat daftar siswa per sesi berdasarkan tanggal tertentu
        </p>
      </motion.div>

      {/* Filters */}
      <motion.div
        variants={itemAnimation}
        className="grid sm:grid-cols-2 md:grid-cols-3 gap-4 mb-10"
      >
        <div>
          <label className="flex items-center gap-2 text-sm font-semibold mb-2">
            <Calendar className="w-4 h-4" />
            Pilih Tanggal
          </label>
          <select
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
            className="w-full px-4 py-2 rounded-lg border border-border bg-white focus:outline-none focus:ring-2 focus:ring-primary/50"
          >
            <option value="">Semua Tanggal</option>
            {uniqueDates.map((d) => (
              <option key={d} value={d}>
                {new Date(d).toLocaleDateString("id-ID", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <button className="w-full px-4 py-2 rounded-lg btn-primary font-medium flex items-center justify-center gap-2 hover:scale-105 transition-all">
            <Download className="w-4 h-4" />
            Unduh Data
          </button>
        </div>
      </motion.div>

      {/* Empty State */}
      {sortedSessions.length === 0 && (
        <motion.div
          variants={itemAnimation}
          className="text-center py-16 opacity-70"
        >
          <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground opacity-20" />
          <p className="text-lg text-muted-foreground">
            Tidak ada pendaftaran pada tanggal ini.
          </p>
        </motion.div>
      )}

      {/* Session Groups */}
      <div className="space-y-8">
        {sortedSessions.map((sessionTime) => {
          const list = grouped[sessionTime];
          return (
            <motion.div
              key={sessionTime}
              variants={itemAnimation}
              className="bg-white border border-border rounded-xl overflow-hidden"
            >
              {/* Session Header */}
              <div className="px-6 py-4 bg-muted/30 border-b border-border">
                <h2 className="text-xl font-bold text-foreground">
                  Sesi: {sessionTime}
                </h2>
                {filterDate && (
                  <p className="text-sm text-muted-foreground mt-1">
                    {new Date(filterDate).toLocaleDateString("id-ID", {
                      weekday: "long",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}
              </div>

              {/* List Peserta */}
              <div className="divide-y divide-border">
                {list.map((r) => (
                  <div
                    key={r.id}
                    className="px-6 py-4 hover:bg-muted/20 transition-colors flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3"
                  >
                    <div>
                      <p className="font-semibold text-foreground">{r.nama}</p>
                      <p className="text-sm text-muted-foreground">
                        Kelas {r.kelas}
                      </p>
                    </div>

                    <div className="flex flex-col items-start sm:items-end">
                      <span className="px-3 py-1 bg-primary/10 text-primary text-sm font-medium rounded-full">
                        {r.mataPelajaran}
                      </span>
                      <span className="text-xs text-muted-foreground mt-1">
                        Materi: {r.materi}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Footer */}
              <div className="px-6 py-3 bg-muted/20 border-t border-border text-sm text-muted-foreground font-medium">
                Total {list.length} siswa terdaftar
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.main>
  );
}
