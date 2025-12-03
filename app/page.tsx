"use client";

import { motion, Variants } from "framer-motion";
import { BookOpen, Calendar, Users, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function HomePage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-background via-background to-muted">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex items-center gap-3"
          >
            <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-xl text-foreground hidden sm:inline">
              Konsultasi Belajar
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="flex gap-4"
          >
            <Link
              href="/participant"
              className="px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-lg transition-colors"
            >
              Lihat Peserta
            </Link>
            <Link
              href="/admin/login"
              className="px-4 py-2 text-sm font-medium text-primary-foreground bg-primary rounded-lg hover:bg-primary/90 transition-colors"
            >
              Admin
            </Link>
          </motion.div>
        </div>
      </nav>

      {/* Hero Section */}
      <motion.section
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32"
      >
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div variants={itemVariants} className="space-y-8">
            <div>
              <motion.h1
                className="text-5xl md:text-6xl font-bold tracking-tight text-balance"
                variants={itemVariants}
              >
                Belajar Lebih Efektif dengan{" "}
                <span className="gradient-accent bg-clip-text text-transparent">
                  Tutor Berpengalaman
                </span>
              </motion.h1>
              <motion.p
                variants={itemVariants}
                className="mt-4 text-lg text-muted-foreground text-balance"
              >
                Platform konsultasi belajar yang mudah digunakan. Pilih jadwal
                yang sesuai, temui tutor profesional, dan tingkatkan prestasi
                akademik Anda.
              </motion.p>
            </div>

            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                href="/form"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-semibold btn-primary transition-all hover:scale-105 active:scale-95"
              >
                Isi Formulir Konsultasi
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link
                href="/participant"
                className="inline-flex items-center justify-center px-8 py-4 rounded-xl font-semibold border-2 border-primary text-primary hover:bg-primary/5 transition-colors"
              >
                Lihat Jadwal Sesi
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 pt-8"
            >
              {[
                { icon: Users, label: "Tutor Aktif", value: "50+" },
                { icon: Calendar, label: "Sesi Tersedia", value: "100+" },
                { icon: BookOpen, label: "Mata Pelajaran", value: "12+" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  variants={itemVariants}
                  className="p-4 rounded-lg bg-white/50 border border-white/30 backdrop-blur-sm"
                >
                  <stat.icon className="w-6 h-6 text-primary mb-2" />
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                  <p className="text-2xl font-bold text-foreground">
                    {stat.value}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Illustration */}
          <motion.div
            variants={itemVariants}
            className="relative h-96 md:h-full min-h-96 rounded-2xl overflow-hidden"
          >
            <motion.div
              className="absolute inset-0 bg-linear-to-br from-primary/20 to-accent/20"
              animate={{
                backgroundPosition: ["0% 0%", "100% 100%"],
              }}
              transition={{
                duration: 20,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "reverse",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={{ y: [0, 20, 0] }}
                transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                className="text-center"
              >
                <div className="w-48 h-48 rounded-full bg-linear-to-br from-primary to-accent/40 blur-3xl absolute inset-0 mx-auto" />
                <div className="relative">
                  <div className="text-6xl">📚</div>
                  <p className="text-muted-foreground mt-4 font-medium">
                    Raih Kesuksesan Akademik
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-20 bg-white/40 border-t border-border"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-center mb-16 text-balance"
          >
            Mengapa Memilih Kami?
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-8"
          >
            {[
              {
                icon: Calendar,
                title: "Jadwal Fleksibel",
                desc: "Pilih waktu yang paling sesuai dengan kebutuhan Anda",
              },
              {
                icon: Users,
                title: "Tutor Profesional",
                desc: "Berpengalaman dan terverifikasi dalam bidangnya",
              },
              {
                icon: BookOpen,
                title: "Berbagai Mata Pelajaran",
                desc: "Cakupan lengkap untuk semua kebutuhan belajar",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="p-8 rounded-2xl bg-white border border-border hover:border-primary/30 hover:shadow-xl transition-all duration-300"
              >
                <feature.icon className="w-12 h-12 text-primary mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="py-20"
      >
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="text-4xl font-bold mb-6 text-balance"
          >
            Siap Memulai Perjalanan Belajarmu?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="text-lg text-muted-foreground mb-8"
          >
            Daftarkan diri Anda sekarang dan temui tutor terbaik untuk membantu
            mencapai tujuan akademik Anda.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <Link
              href="/form"
              className="inline-flex items-center gap-2 px-10 py-5 rounded-xl font-semibold btn-primary text-lg transition-all hover:scale-105 active:scale-95"
            >
              Mulai Sekarang
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </div>
      </motion.section>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-muted-foreground">
          <p>© 2025 Konsultasi Belajar. Semua hak dilindungi.</p>
        </div>
      </footer>
    </div>
  );
}
