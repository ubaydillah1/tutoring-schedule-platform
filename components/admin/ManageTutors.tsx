"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Edit2, X, Mail, Phone, Book } from "lucide-react";

interface Tutor {
  id: string;
  name: string;
  email: string;
  phone: string;
  subjects: string[];
  experience: string;
}

const defaultTutors: Tutor[] = [
  {
    id: "1",
    name: "Budi Santoso",
    email: "budi@konsultasi.id",
    phone: "08123456789",
    subjects: ["Matematika", "Fisika"],
    experience: "5 tahun",
  },
  {
    id: "2",
    name: "Siti Nurhaliza",
    email: "siti@konsultasi.id",
    phone: "08234567890",
    subjects: ["Biologi", "Kimia"],
    experience: "3 tahun",
  },
  {
    id: "3",
    name: "Ahmad Wijaya",
    email: "ahmad@konsultasi.id",
    phone: "08345678901",
    subjects: ["Bahasa Inggris", "Bahasa Indonesia"],
    experience: "4 tahun",
  },
  {
    id: "4",
    name: "Nur Azizah",
    email: "nur@konsultasi.id",
    phone: "08456789012",
    subjects: ["Matematika"],
    experience: "2 tahun",
  },
];

const subjectList = [
  "Matematika",
  "Fisika",
  "Kimia",
  "Biologi",
  "Bahasa Inggris",
  "Bahasa Indonesia",
];

export default function ManageTutors() {
  const [tutors, setTutors] = useState<Tutor[]>(defaultTutors);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subjects: [] as string[],
    experience: "",
  });

  const handleOpenModal = (tutor?: Tutor) => {
    if (tutor) {
      setFormData({ ...tutor });
      setEditingId(tutor.id);
    } else {
      setFormData({
        name: "",
        email: "",
        phone: "",
        subjects: [],
        experience: "",
      });
      setEditingId(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      name: "",
      email: "",
      phone: "",
      subjects: [],
      experience: "",
    });
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setTutors(
        tutors.map((t) => (t.id === editingId ? { ...t, ...formData } : t))
      );
    } else {
      setTutors([...tutors, { id: Date.now().toString(), ...formData }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    setTutors(tutors.filter((t) => t.id !== id));
  };

  const toggleSubject = (subject: string) => {
    setFormData((prev) => ({
      ...prev,
      subjects: prev.subjects.includes(subject)
        ? prev.subjects.filter((s) => s !== subject)
        : [...prev.subjects, subject],
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-4 sm:p-8 max-w-7xl"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-4xl font-bold text-foreground">Kelola Tutor</h1>
          <p className="text-muted-foreground mt-2">
            Tambah, edit, atau hapus data tutor
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold btn-primary transition-all hover:scale-105 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Tambah Tutor
        </button>
      </motion.div>

      {/* Table */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-xl border border-border overflow-hidden"
      >
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border bg-muted/30">
                <th className="text-left px-6 py-4 font-semibold text-foreground">
                  Nama Tutor
                </th>
                <th className="text-left px-6 py-4 font-semibold text-foreground">
                  Email
                </th>
                <th className="text-left px-6 py-4 font-semibold text-foreground">
                  No. Telpon
                </th>
                <th className="text-left px-6 py-4 font-semibold text-foreground">
                  Mata Pelajaran
                </th>
                <th className="text-left px-6 py-4 font-semibold text-foreground">
                  Pengalaman
                </th>
                <th className="text-right px-6 py-4 font-semibold text-foreground">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {tutors.map((tutor, idx) => (
                <motion.tr
                  key={tutor.id}
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className="border-b border-border hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-foreground">
                    {tutor.name}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    <div className="flex items-center gap-2 leading-none">
                      <Mail className="w-4 h-4 text-muted-foreground" />
                      <span className="whitespace-nowrap">{tutor.email}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    <div className="flex items-center gap-2 leading-none">
                      <Phone className="w-4 h-4 text-muted-foreground" />
                      <span className="whitespace-nowrap">{tutor.phone}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {tutor.subjects.map((subject) => (
                        <span
                          key={subject}
                          className="px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium"
                        >
                          {subject}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {tutor.experience}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenModal(tutor)}
                        className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(tutor.id)}
                        className="p-2 hover:bg-destructive/10 rounded-lg text-destructive transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Modal */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={handleCloseModal}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                {editingId ? "Edit Tutor" : "Tambah Tutor"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Nama Tutor
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Contoh: Budi Santoso"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="tutor@konsultasi.id"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-foreground mb-2">
                    No. Telpon
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    placeholder="08123456789"
                    required
                    className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                  />
                </div>
              </div>

              {/* Experience */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Pengalaman
                </label>
                <input
                  type="text"
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData({ ...formData, experience: e.target.value })
                  }
                  placeholder="Contoh: 5 tahun"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>

              {/* Subjects */}
              <div>
                <label className="block text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <Book className="w-4 h-4" />
                  Mata Pelajaran
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {subjectList.map((subject) => (
                    <label
                      key={subject}
                      className="flex items-center gap-2 p-3 rounded-lg border border-border hover:bg-muted/50 cursor-pointer transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={formData.subjects.includes(subject)}
                        onChange={() => toggleSubject(subject)}
                        className="w-4 h-4 rounded cursor-pointer"
                      />
                      <span className="text-sm font-medium text-foreground">
                        {subject}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors font-medium"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="flex-1 px-4 py-2 rounded-lg btn-primary font-medium transition-all hover:scale-105 active:scale-95"
                >
                  {editingId ? "Perbarui" : "Tambah"}
                </button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </motion.main>
  );
}
