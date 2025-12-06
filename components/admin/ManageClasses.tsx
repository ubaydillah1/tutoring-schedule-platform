/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, X } from "lucide-react";
import { useClasses, useCreateClass, useDeleteClass } from "@/hooks/useClasses";

export default function ManageClasses() {
  const { data: classes, isLoading } = useClasses();
  const createMutation = useCreateClass();
  const deleteMutation = useDeleteClass();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({ name: "" });

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ name: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createMutation.mutateAsync(formData);
    handleCloseModal();
  };

  const handleDelete = async (id: string) => {
    await deleteMutation.mutateAsync(id);
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
      {/* HEADER */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-4xl font-bold text-foreground">Kelola Kelas</h1>
          <p className="text-muted-foreground mt-2">Tambah atau hapus kelas</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
          className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-semibold btn-primary transition-all hover:scale-105 active:scale-95"
        >
          <Plus className="w-5 h-5" />
          Tambah Kelas
        </button>
      </motion.div>

      {/* GRID */}
      <motion.div
        variants={itemVariants}
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {isLoading ? (
          <p className="text-muted-foreground">Memuat...</p>
        ) : classes?.length === 0 ? (
          <p className="text-muted-foreground">Belum ada kelas</p>
        ) : (
          classes?.map((kelas: any, idx: number) => (
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
                <p className="text-2xl font-bold text-foreground">
                  {kelas.name}
                </p>
              </div>

              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={() => handleDelete(kelas.id)}
                  className="p-2 hover:bg-destructive/10 rounded-lg text-destructive transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </motion.div>

      {/* MODAL */}
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={handleCloseModal}
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-xl p-8 max-w-md w-full"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-foreground">
                Tambah Kelas
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
                <label className="block text-sm font-semibold mb-2">
                  Nama Kelas
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ name: e.target.value })}
                  placeholder="Contoh: 9 (A)"
                  required
                  className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/50"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 rounded-lg btn-primary font-medium hover:scale-105 active:scale-95"
              >
                Tambah
              </button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </motion.main>
  );
}
