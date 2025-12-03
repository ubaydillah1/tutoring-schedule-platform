"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Edit2, X } from "lucide-react";

interface Subject {
  id: string;
  name: string;
  description: string;
}

const defaultSubjects: Subject[] = [
  {
    id: "1",
    name: "Matematika",
    description: "Pelajaran matematika untuk semua tingkat",
  },
  { id: "2", name: "Fisika", description: "Teori dan praktik fisika dasar" },
  { id: "3", name: "Kimia", description: "Pelajaran kimia dan reaksi kimia" },
  { id: "4", name: "Biologi", description: "Ilmu makhluk hidup dan ekosistem" },
  {
    id: "5",
    name: "Bahasa Inggris",
    description: "Kursus bahasa Inggris profesional",
  },
];

export default function ManageSubjects() {
  const [subjects, setSubjects] = useState<Subject[]>(defaultSubjects);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "", description: "" });

  const handleOpenModal = (subject?: Subject) => {
    if (subject) {
      setFormData({ name: subject.name, description: subject.description });
      setEditingId(subject.id);
    } else {
      setFormData({ name: "", description: "" });
      setEditingId(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ name: "", description: "" });
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setSubjects(
        subjects.map((s) => (s.id === editingId ? { ...s, ...formData } : s))
      );
    } else {
      setSubjects([...subjects, { id: Date.now().toString(), ...formData }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    setSubjects(subjects.filter((s) => s.id !== id));
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
      className="p-4 sm:p-8 lg:pl-8 max-w-7xl mx-auto"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-4xl font-bold text-foreground">
            Kelola Mata Pelajaran
          </h1>
          <p className="text-muted-foreground mt-2">
            Tambah, edit, atau hapus mata pelajaran
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold btn-primary transition-all hover:scale-105 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Tambah Mata Pelajaran
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
                  Nama Mata Pelajaran
                </th>
                <th className="text-left px-6 py-4 font-semibold text-foreground">
                  Deskripsi
                </th>
                <th className="text-right px-6 py-4 font-semibold text-foreground">
                  Aksi
                </th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, idx) => (
                <motion.tr
                  key={subject.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: idx * 0.05 }}
                  viewport={{ once: true }}
                  className="border-b border-border hover:bg-muted/30 transition-colors"
                >
                  <td className="px-6 py-4 font-medium text-foreground">
                    {subject.name}
                  </td>
                  <td className="px-6 py-4 text-muted-foreground">
                    {subject.description}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => handleOpenModal(subject)}
                        className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(subject.id)}
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
            className="bg-white rounded-xl p-8 max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                {editingId ? "Edit Mata Pelajaran" : "Tambah Mata Pelajaran"}
              </h2>
              <button
                onClick={handleCloseModal}
                className="p-2 hover:bg-muted rounded-lg transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Nama Mata Pelajaran
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Contoh: Matematika"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-foreground mb-2">
                  Deskripsi
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Deskripsi mata pelajaran"
                  rows={3}
                  className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50 resize-none"
                />
              </div>
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
