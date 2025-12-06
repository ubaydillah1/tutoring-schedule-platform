/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, ArrowLeft, Lock } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import axiosInstance from "@/lib/axiosInstance";
import { useAuthStore } from "@/stores/authStore";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await axiosInstance.post("/auth/login", {
        email,
        password,
      });

      useAuthStore.getState().login(res.data.data);

      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.response?.data?.message || "Terjadi kesalahan");
    }

    setLoading(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-primary/10 via-background to-accent/10 flex flex-col">
      {/* Top navigation bar with back button and centered title */}
      <nav className="sticky top-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Kembali</span>
          </Link>

          {/* placeholder to keep title centered */}
          <div className="w-20" />
        </div>
      </nav>

      {/* Centered form area */}
      <div className="flex-1 flex items-center justify-center p-4 pb-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="w-full max-w-md"
        >
          <motion.div variants={itemVariants} className="mb-8 text-center">
            <div className="w-16 h-16 rounded-2xl gradient-accent flex items-center justify-center mx-auto mb-6">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Masuk sebagai Admin
            </h2>
            <p className="text-muted-foreground">
              Masuk untuk mengelola platform konsultasi belajar
            </p>
          </motion.div>

          <motion.form
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            onSubmit={handleSubmit}
            className="bg-white rounded-2xl border border-border shadow-lg p-6 sm:p-8 space-y-6"
          >
            {/* Error Message */}
            {error && (
              <motion.div
                variants={itemVariants}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-4 bg-destructive/10 border border-destructive/30 rounded-lg"
              >
                <p className="text-sm text-destructive font-medium">{error}</p>
              </motion.div>
            )}

            {/* Email */}
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="block text-sm font-semibold text-foreground">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@konsultasi.id"
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </motion.div>

            {/* Password */}
            <motion.div variants={itemVariants} className="space-y-2">
              <label className="block text-sm font-semibold text-foreground">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              />
            </motion.div>

            {/* Submit */}
            <motion.button
              variants={itemVariants}
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg font-semibold btn-primary transition-all hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Memproses...
                </>
              ) : (
                "Masuk"
              )}
            </motion.button>
          </motion.form>
        </motion.div>
      </div>
    </div>
  );
}
