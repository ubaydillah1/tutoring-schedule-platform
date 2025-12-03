"use client";
import ConsultationForm from "@/components/student/ConsultationForm";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function FormulirKonsultasiPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Kembali</span>
          </Link>
        </div>
      </nav>

      {/* Main Content */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold text-balance mb-4">
            Formulir Konsultasi Belajar
          </h1>
          <p className="text-muted-foreground text-lg">
            Isi formulir di bawah untuk memulai perjalanan belajarmu dengan
            tutor profesional kami.
          </p>
        </motion.div>

        <ConsultationForm />
      </div>
    </div>
  );
}
