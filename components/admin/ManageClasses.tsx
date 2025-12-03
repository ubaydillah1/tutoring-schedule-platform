"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, Edit2, X } from "lucide-react";

interface Class {
  id: string;
  name: string;
}

const defaultClasses: Class[] = [
  { id: "1", name: "9 (A)" },
  { id: "2", name: "9 (B)" },
  { id: "3", name: "9 (C)" },
  { id: "4", name: "10 (A)" },
  { id: "5", name: "10 (B)" },
  { id: "6", name: "10 (C)" },
  { id: "7", name: "11 (A)" },
  { id: "8", name: "11 (B)" },
  { id: "9", name: "12 (A)" },
];

export default function ManageClasses() {
  const [classes, setClasses] = useState<Class[]>(defaultClasses);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: "" });

  const handleOpenModal = (kelas?: Class) => {
    if (kelas) {
      setFormData({ name: kelas.name });
      setEditingId(kelas.id);
    } else {
      setFormData({ name: "" });
      setEditingId(null);
    }
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ name: "" });
    setEditingId(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingId) {
      setClasses(
        classes.map((c) => (c.id === editingId ? { ...c, ...formData } : c))
      );
    } else {
      setClasses([...classes, { id: Date.now().toString(), ...formData }]);
    }
    handleCloseModal();
  };

  const handleDelete = (id: string) => {
    setClasses(classes.filter((c) => c.id !== id));
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
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-4xl font-bold text-foreground">Kelola Kelas</h1>
          <p className="text-muted-foreground mt-2">
            Tambah, edit, atau hapus kelas
          </p>
        </div>

        <button
          onClick={() => handleOpenModal()}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold btn-primary transition-all hover:scale-105 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Tambah Kelas
        </button>
      </motion.div>

      <motion.div
        variants={itemVariants}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {classes.map((kelas, idx) => (
          <motion.div
            key={kelas.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            viewport={{ once: true }}
            className="bg-white border border-border rounded-lg p-6 flex items-center justify-between group hover:shadow-lg transition-all"
          >
            <div>
              <p className="text-sm text-muted-foreground">Kelas</p>
              <p className="text-2xl font-bold text-foreground">{kelas.name}</p>
            </div>
            <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <button
                onClick={() => handleOpenModal(kelas)}
                className="p-2 hover:bg-primary/10 rounded-lg text-primary transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => handleDelete(kelas.id)}
                className="p-2 hover:bg-destructive/10 rounded-lg text-destructive transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>

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
                {editingId ? "Edit Kelas" : "Tambah Kelas"}
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
                  Nama Kelas
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  placeholder="Contoh: 9 (A)"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/50"
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
