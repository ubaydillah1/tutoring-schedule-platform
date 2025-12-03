"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Loader2, CheckCircle } from "lucide-react";

interface FormData {
  nama: string;
  kelas: string;
  mataPelajaran: string;
  materi: string;
  hari: string;
  sesi: string;
}

interface SessionSlot {
  id: string;
  waktu: string;
  siswa: number;
  maksimal: number;
  subjek: string[];
  tutor: string[];
}

// Sample data - in real app, fetch from backend
const KELASLIST = [
  "9 (A)",
  "9 (B)",
  "9 (C)",
  "10 (A)",
  "10 (B)",
  "10 (C)",
  "11 (A)",
  "11 (B)",
  "12 (A)",
];
const MATAPELAJARAN = [
  "Matematika",
  "Fisika",
  "Kimia",
  "Biologi",
  "Bahasa Indonesia",
  "Bahasa Inggris",
  "Sejarah",
  "Geografi",
];

const WEEKDAY_SESSIONS: SessionSlot[] = [
  {
    id: "1",
    waktu: "10.00–11.00",
    siswa: 8,
    maksimal: 20,
    subjek: ["Matematika", "Fisika"],
    tutor: ["Pak Ahmad", "Bu Rina"],
  },
  {
    id: "2",
    waktu: "13.00–14.30",
    siswa: 15,
    maksimal: 20,
    subjek: ["Kimia", "Biologi"],
    tutor: ["Pak Budi", "Bu Siti"],
  },
  {
    id: "3",
    waktu: "14.45–16.15",
    siswa: 12,
    maksimal: 20,
    subjek: ["Bahasa Inggris", "Sejarah"],
    tutor: ["Bu Ani", "Pak Hendra"],
  },
  {
    id: "4",
    waktu: "16.30–18.00",
    siswa: 19,
    maksimal: 20,
    subjek: ["Matematika", "Bahasa Indonesia"],
    tutor: ["Pak Ahmad", "Bu Wati"],
  },
  {
    id: "5",
    waktu: "18.30–20.00",
    siswa: 7,
    maksimal: 20,
    subjek: ["Geografi", "Sejarah"],
    tutor: ["Pak Rudi", "Bu Eka"],
  },
];

const SATURDAY_SESSIONS: SessionSlot[] = [
  {
    id: "1",
    waktu: "09.00–10.30",
    siswa: 14,
    maksimal: 20,
    subjek: ["Matematika", "Fisika"],
    tutor: ["Pak Ahmad", "Bu Rina"],
  },
  {
    id: "2",
    waktu: "10.30–12.00",
    siswa: 18,
    maksimal: 20,
    subjek: ["Kimia", "Biologi"],
    tutor: ["Pak Budi", "Bu Siti"],
  },
];

export default function ConsultationForm() {
  const [formData, setFormData] = useState<FormData>({
    nama: "",
    kelas: "",
    mataPelajaran: "",
    materi: "",
    hari: "",
    sesi: "",
  });

  const [currentSessions, setCurrentSessions] = useState<SessionSlot[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleHariChange = (date: string) => {
    const selectedDate = new Date(date);
    const dayOfWeek = selectedDate.getDay();

    setFormData((prev) => ({
      ...prev,
      hari: date,
      sesi: "",
    }));

    // Saturday = 6, Sunday = 0. Exclude Sunday
    if (dayOfWeek === 0) {
      setCurrentSessions([]);
    } else if (dayOfWeek === 6) {
      setCurrentSessions(SATURDAY_SESSIONS);
    } else {
      setCurrentSessions(WEEKDAY_SESSIONS);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate submission
    await new Promise((resolve) => setTimeout(resolve, 1500));

    console.log("Form submitted:", formData);
    setSubmitted(true);
    setLoading(false);

    // Reset after 3 seconds
    setTimeout(() => {
      setFormData({
        nama: "",
        kelas: "",
        mataPelajaran: "",
        materi: "",
        hari: "",
        sesi: "",
      });
      setSubmitted(false);
    }, 3000);
  };

  const getHariDisplay = () => {
    if (!formData.hari) return "";
    const date = new Date(formData.hari);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const selectedSession = currentSessions.find((s) => s.id === formData.sesi);

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

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white border-2 border-green-500 rounded-2xl p-12 text-center"
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
        </motion.div>
        <h2 className="text-3xl font-bold text-green-600 mb-4">
          Pendaftaran Berhasil!
        </h2>
        <p className="text-muted-foreground mb-6">
          Terima kasih telah mendaftar. Tim kami akan segera menghubungi Anda
          untuk konfirmasi.
        </p>
        <motion.div
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
          className="text-6xl"
        >
          🎉
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.form
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      onSubmit={handleSubmit}
      className="space-y-6"
    >
      {/* Nama */}
      <motion.div variants={itemVariants} className="space-y-3">
        <label className="block text-sm font-semibold text-foreground">
          Nama Lengkap <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="nama"
          value={formData.nama}
          onChange={handleInputChange}
          placeholder="Masukkan nama lengkap Anda"
          required
          className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        />
      </motion.div>

      {/* Kelas */}
      <motion.div variants={itemVariants} className="space-y-3">
        <label className="block text-sm font-semibold text-foreground">
          Kelas <span className="text-red-500">*</span>
        </label>
        <select
          name="kelas"
          value={formData.kelas}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        >
          <option value="">Pilih Kelas</option>
          {KELASLIST.map((kelas) => (
            <option key={kelas} value={kelas}>
              {kelas}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Mata Pelajaran */}
      <motion.div variants={itemVariants} className="space-y-3">
        <label className="block text-sm font-semibold text-foreground">
          Mata Pelajaran <span className="text-red-500">*</span>
        </label>
        <select
          name="mataPelajaran"
          value={formData.mataPelajaran}
          onChange={handleInputChange}
          required
          className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
        >
          <option value="">Pilih Mata Pelajaran</option>
          {MATAPELAJARAN.map((mapel) => (
            <option key={mapel} value={mapel}>
              {mapel}
            </option>
          ))}
        </select>
      </motion.div>

      {/* Materi */}
      <motion.div variants={itemVariants} className="space-y-3">
        <label className="block text-sm font-semibold text-foreground">
          Materi yang Ingin Dipelajari <span className="text-red-500">*</span>
        </label>
        <textarea
          name="materi"
          value={formData.materi}
          onChange={handleInputChange}
          placeholder="Jelaskan materi atau topik yang ingin Anda pelajari"
          required
          rows={4}
          className="w-full px-4 py-3 rounded-lg border border-border bg-white text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
        />
      </motion.div>

      {/* Hari */}
      <motion.div variants={itemVariants} className="space-y-3">
        <label className="block text-sm font-semibold text-foreground">
          Pilih Hari <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
          <input
            type="date"
            name="hari"
            value={formData.hari}
            onChange={(e) => handleHariChange(e.target.value)}
            required
            className="w-full pl-12 pr-4 py-3 rounded-lg border border-border bg-white text-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
          />
        </div>
        {formData.hari && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-muted-foreground"
          >
            {getHariDisplay()}
          </motion.p>
        )}
      </motion.div>

      {/* Sesi - dinamis berdasarkan hari */}
      {formData.hari && (
        <motion.div
          variants={itemVariants}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-3"
        >
          <label className="block text-sm font-semibold text-foreground">
            Pilih Sesi <span className="text-red-500">*</span>
          </label>

          {currentSessions.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="p-4 bg-amber-50 border border-amber-200 rounded-lg"
            >
              <p className="text-sm text-amber-700">
                Maaf, Minggu tidak tersedia. Silakan pilih hari lain.
              </p>
            </motion.div>
          ) : (
            <motion.div
              className="grid grid-cols-1 gap-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.05 }}
            >
              {currentSessions.map((session, idx) => (
                <motion.label
                  key={session.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`flex items-center gap-4 p-4 rounded-lg border-2 cursor-pointer transition-all ${
                    formData.sesi === session.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/30 bg-white"
                  }`}
                >
                  <input
                    type="radio"
                    name="sesi"
                    value={session.id}
                    checked={formData.sesi === session.id}
                    onChange={handleInputChange}
                    className="w-5 h-5 text-primary cursor-pointer"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="font-semibold text-foreground">
                        {session.waktu}
                      </span>
                    </div>
                    <div className="flex gap-4 text-xs text-muted-foreground">
                      <span>📚 {session.subjek.join(", ")}</span>
                      <span>👨‍🏫 {session.tutor.join(", ")}</span>
                    </div>
                  </div>
                  <motion.div
                    className={`text-right font-semibold text-sm ${
                      session.siswa >= session.maksimal
                        ? "text-destructive"
                        : "text-primary"
                    }`}
                  >
                    <div>
                      {session.siswa}/{session.maksimal}
                    </div>
                    <div className="text-xs text-muted-foreground font-normal">
                      peserta
                    </div>
                  </motion.div>
                </motion.label>
              ))}
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Selected Session Info */}
      {selectedSession && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 bg-primary/10 border border-primary/30 rounded-lg"
        >
          <p className="text-sm text-primary font-medium">
            ✓ Sesi dipilih: {selectedSession.waktu} ({selectedSession.siswa}/
            {selectedSession.maksimal} peserta)
          </p>
        </motion.div>
      )}

      {/* Submit Button */}
      <motion.div variants={itemVariants} className="pt-6">
        <button
          type="submit"
          disabled={
            loading ||
            !formData.nama ||
            !formData.kelas ||
            !formData.mataPelajaran ||
            !formData.materi ||
            !formData.sesi
          }
          className="w-full py-4 rounded-lg font-semibold btn-primary text-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Mengirim...
            </>
          ) : (
            "Kirim Formulir"
          )}
        </button>
      </motion.div>

      <motion.p
        variants={itemVariants}
        className="text-center text-sm text-muted-foreground"
      >
        Dengan mengirim formulir ini, Anda setuju dengan syarat dan ketentuan
        kami.
      </motion.p>
    </motion.form>
  );
}
