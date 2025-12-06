/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";
import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import { Calendar, Clock, Loader2, CheckCircle } from "lucide-react";
import { useStudentAvailableSessions } from "@/hooks/useStudentAvailableSessions";
import { useClasses } from "@/hooks/useClasses";
import { useStudentRegister } from "@/hooks/useStudentRegister";
import { ChevronDown } from "lucide-react";

interface FormData {
  nama: string;
  kelas: string;
  materi: string;
  hari: string;
  sesi: string;
}

interface ClassItem {
  id: string;
  name: string;
}

export default function ConsultationForm() {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const TODAY_STRING = `${year}-${month}-${day}`;

  const [formData, setFormData] = useState<FormData>({
    nama: "",
    kelas: "",
    materi: "",
    hari: TODAY_STRING,
    sesi: "",
  });

  const { data: classes = [], isFetching: isFetchingClasses } = useClasses();
  const { data: sessions, isLoading: loadingSessions } =
    useStudentAvailableSessions(formData.hari);

  const currentSessions = useMemo(() => {
    return sessions || [];
  }, [sessions]);

  const [submitted, setSubmitted] = useState(false);
  const registerMutation = useStudentRegister();

  const isSubmitting = registerMutation.isPending || loadingSessions;

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDateChange = (date: string) => {
    setFormData((prev) => ({
      ...prev,
      hari: date,
      sesi: "",
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    registerMutation.mutate(
      {
        name: formData.nama,
        classId: formData.kelas,
        sessionId: formData.sesi,
        date: formData.hari,
        materi: formData.materi,
      },
      {
        onSuccess: () => {
          setSubmitted(true);

          setTimeout(() => {
            setSubmitted(false);
            setFormData({
              nama: "",
              kelas: "",
              materi: "",
              hari: TODAY_STRING,
              sesi: "",
            });
          }, 3000);
        },
        onError: (error) => {
          console.error("Registration failed:", error);
          alert(
            `Pendaftaran gagal: ${
              (error as any).message || "Terjadi kesalahan server."
            }`
          );
        },
      }
    );
  };

  const getFormattedDate = () => {
    if (!formData.hari) return "";
    const date = new Date(formData.hari);
    return date.toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white border-2 border-green-500 rounded-2xl p-12 text-center"
      >
        <CheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-green-600 mb-4">
          Pendaftaran Berhasil!
        </h2>
        <p className="text-muted-foreground mb-6">
          Terima kasih! Kami akan segera menghubungi Anda.
        </p>
        <div
          className="text-6xl animate-bounce"
          style={{ animationDuration: "2.5s" }}
        >
          🎉
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* 1. PILIH TANGGAL */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold">
          Pilih Hari <span className="text-red-500">*</span>
        </label>

        <div className="relative">
          <Calendar className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
          <input
            type="date"
            min={TODAY_STRING}
            value={formData.hari}
            onChange={(e) => handleDateChange(e.target.value)}
            className="w-full px-4 py-3 pl-12 border rounded-lg bg-white appearance-none"
          />
        </div>

        <p className="text-sm text-muted-foreground">{getFormattedDate()}</p>
      </div>

      {/* 2. PILIH SESI */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold">
          Pilih Sesi <span className="text-red-500">*</span>
        </label>

        {loadingSessions ? (
          <div className="p-4 flex items-center gap-2 text-blue-500">
            <Loader2 className="w-5 h-5 animate-spin" /> Memuat sesi...
          </div>
        ) : currentSessions.length === 0 ? (
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg text-amber-700 text-sm">
            Tidak ada sesi pada tanggal ini.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3">
            {currentSessions.map((session: any) => {
              const full = session.siswa >= session.maksimal;

              return (
                <label
                  key={session.id}
                  className={`flex items-center gap-4 p-4 border-2 rounded-lg cursor-pointer transition ${
                    full
                      ? "border-red-500 bg-red-50 opacity-70 cursor-not-allowed"
                      : formData.sesi === session.id
                      ? "border-primary bg-primary/10"
                      : "border-gray-300 hover:border-primary/40"
                  }`}
                >
                  <input
                    type="radio"
                    name="sesi"
                    value={session.id}
                    checked={formData.sesi === session.id}
                    onChange={handleInputChange}
                    disabled={full}
                  />

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock className="w-4 h-4 text-primary" />
                      <span className="font-semibold">{session.waktu}</span>
                    </div>
                    <div className="text-xs text-gray-500">
                      📚 {session.subjek.join(", ")} | 👨‍🏫{" "}
                      {session.tutor.join(", ")}
                    </div>
                  </div>

                  <div
                    className={`text-sm font-semibold ${
                      full ? "text-red-500" : "text-green-600"
                    }`}
                  >
                    {full ? "Penuh" : `${session.siswa}/${session.maksimal}`}
                    <div className="text-xs text-gray-500">peserta</div>
                  </div>
                </label>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. NAMA */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold">
          Nama Lengkap <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="nama"
          value={formData.nama}
          onChange={handleInputChange}
          placeholder="Masukkan nama lengkap"
          required
          className="w-full px-4 py-3 border rounded-lg bg-white"
        />
      </div>

      {/* 4. KELAS (Dropdown yang Bagus) */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold">
          Kelas <span className="text-red-500">*</span>
        </label>

        <div className="relative">
          <select
            name="kelas"
            value={formData.kelas}
            onChange={handleInputChange}
            required
            disabled={isFetchingClasses || isSubmitting}
            className="w-full px-3 py-3 border rounded-lg bg-white appearance-none cursor-pointer"
          >
            {classes.map((kelas: ClassItem) => (
              <option key={kelas.id} value={kelas.id}>
                {kelas.name}
              </option>
            ))}
          </select>

          {/* ICON CHEVRON */}
          <ChevronDown className="w-5 h-5 text-gray-500 absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" />
        </div>
      </div>

      {/* 5. MATERI */}
      <div className="space-y-3">
        <label className="block text-sm font-semibold">
          Materi <span className="text-red-500">*</span>
        </label>
        <textarea
          name="materi"
          value={formData.materi}
          onChange={handleInputChange}
          placeholder="Jelaskan materi yang ingin dipelajari"
          rows={4}
          required
          className="w-full px-4 py-3 border rounded-lg bg-white resize-none"
        />
      </div>

      {/* 6. SUBMIT */}
      <div>
        <button
          type="submit"
          disabled={
            isSubmitting ||
            !formData.nama ||
            !formData.kelas ||
            !formData.materi ||
            !formData.sesi
          }
          className="w-full py-4 rounded-lg font-semibold btn-primary flex items-center justify-center gap-2 disabled:opacity-50 transition-all duration-200"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" /> Mengirim...
            </>
          ) : (
            "Kirim Formulir"
          )}
        </button>
      </div>
    </form>
  );
}
