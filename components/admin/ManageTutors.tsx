/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Trash2, X, Phone } from "lucide-react";
import { useTutors, useCreateTutor, useDeleteTutor } from "@/hooks/useTutors";

export default function ManageTutors() {
  const { data: tutors, isLoading } = useTutors();
  const createMutation = useCreateTutor();
  const deleteMutation = useDeleteTutor();

  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phoneNumber: "",
  });

  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({ name: "", phoneNumber: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createMutation.mutateAsync({
      name: formData.name,
      phoneNumber: formData.phoneNumber || undefined,
    });
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
      className="p-4 sm:p-8 max-w-7xl mx-auto"
    >
      {/* Header */}
      <motion.div
        variants={itemVariants}
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8"
      >
        <div>
          <h1 className="text-4xl font-bold text-foreground">Kelola Tutor</h1>
          <p className="text-muted-foreground mt-2">Tambah atau hapus tutor</p>
        </div>

        <button
          onClick={() => setShowModal(true)}
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
                  No. Telpon
                </th>
                <th className="text-right px-6 py-4 font-semibold text-foreground">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {isLoading ? (
                <tr>
                  <td
                    colSpan={3}
                    className="text-center py-6 text-muted-foreground"
                  >
                    Memuat...
                  </td>
                </tr>
              ) : tutors?.length === 0 ? (
                <tr>
                  <td
                    colSpan={3}
                    className="text-center py-6 text-muted-foreground"
                  >
                    Belum ada tutor
                  </td>
                </tr>
              ) : (
                tutors?.map((tutor: any, idx: number) => (
                  <motion.tr
                    key={tutor.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: idx * 0.05 }}
                    className="border-b border-border hover:bg-muted/30 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-foreground">
                      {tutor.name}
                    </td>

                    <td className="px-6 py-4 text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-muted-foreground" />
                        <span>{tutor.phoneNumber || "-"}</span>
                      </div>
                    </td>

                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDelete(tutor.id)}
                        className="p-2 hover:bg-destructive/10 rounded-lg text-destructive transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </motion.tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Modal Tambah Tutor */}
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
                Tambah Tutor
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
                <label className="block text-sm font-semibold mb-2">
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
                  className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/50"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-semibold mb-2">
                  No. Telpon
                </label>
                <input
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={(e) =>
                    setFormData({ ...formData, phoneNumber: e.target.value })
                  }
                  placeholder="08123456789"
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
