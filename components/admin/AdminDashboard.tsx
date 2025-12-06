"use client";

import { motion } from "framer-motion";
import { BookOpen, Users, Calendar } from "lucide-react";

const stats = [
  {
    icon: Briefcase,
    label: "Total Tutor",
    value: "45",
    bgColor: "bg-indigo-100",
    iconColor: "text-indigo-600",
  },
  {
    icon: Users,
    label: "Peserta Terdaftar",
    value: "342",
    bgColor: "bg-blue-100",
    iconColor: "text-blue-600",
  },
  {
    icon: Calendar,
    label: "Sesi Mendatang",
    value: "28",
    bgColor: "bg-emerald-100",
    iconColor: "text-emerald-600",
  },
  {
    icon: BookOpen,
    label: "Mata Pelajaran",
    value: "12",
    bgColor: "bg-orange-100",
    iconColor: "text-orange-600",
  },
];

import { Briefcase } from "lucide-react";

export default function AdminDashboard() {
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
    <motion.main
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="p-4 sm:p-8 max-w-7xl mx-auto"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-2">
          Selamat Datang, Admin (This page still in progress)
        </h1>
        <p className="text-muted-foreground">
          Kelola platform konsultasi belajar Anda
        </p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
      >
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            variants={itemVariants}
            whileHover={{ translateY: -8 }}
            className="bg-white border border-border rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all"
          >
            <div className={`h-2 ${stat.bgColor}`} />
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                  <stat.icon className={`w-6 h-6 ${stat.iconColor}`} />
                </div>
                <span className="text-3xl font-bold text-foreground">
                  {stat.value}
                </span>
              </div>
              <p className="text-sm text-muted-foreground font-medium">
                {stat.label}
              </p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Recent Activity */}
      <motion.div
        variants={itemVariants}
        className="bg-white border border-border rounded-xl p-8 shadow-sm"
      >
        <h2 className="text-2xl font-bold text-foreground mb-6">
          Aktivitas Terbaru
        </h2>
        <div className="space-y-4">
          {[
            {
              user: "Adi Pratama",
              action: "mendaftar untuk sesi Matematika",
              time: "2 jam lalu",
            },
            {
              user: "Bella Kusuma",
              action: "mendaftar untuk sesi Fisika",
              time: "4 jam lalu",
            },
            {
              user: "Citra Dewi",
              action: "menyelesaikan sesi Kimia",
              time: "1 hari lalu",
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="flex items-center justify-between py-3 border-b border-border last:border-0"
            >
              <p className="text-foreground">
                <span className="font-semibold">{item.user}</span>
                <span className="text-muted-foreground"> {item.action}</span>
              </p>
              <p className="text-sm text-muted-foreground">{item.time}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.main>
  );
}
