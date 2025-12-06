"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu,
  X,
  LogOut,
  BookOpen,
  BarChart3,
  Users,
  Calendar,
  Briefcase,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";

const navItems = [
  { icon: BarChart3, label: "Dashboard", href: "/admin/dashboard" },
  { icon: BookOpen, label: "Mata Pelajaran", href: "/admin/subjects" },
  { icon: Users, label: "Kelas", href: "/admin/classes" },
  { icon: Briefcase, label: "Kelola Tutor", href: "/admin/tutors" },
  { icon: Calendar, label: "Kelola Sesi", href: "/admin/sessions" },
  { icon: Users, label: "Data Pendaftaran", href: "/admin/registrations" },
];

export default function AdminNav() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    router.push("/");
  };

  return (
    <>
      {/* Mobile Nav */}
      <nav className="sticky top-0 z-50 backdrop-blur-md bg-background/80 border-b border-border lg:hidden">
        <div className="flex items-center justify-between h-16 px-4">
          <Link href="/admin/dashboard" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-white" />
            </div>
            <span className="font-bold text-lg hidden sm:inline">Admin</span>
          </Link>

          <button
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label={open ? "Tutup menu" : "Buka menu"}
            className="p-2 hover:bg-muted rounded-lg transition-colors"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="border-t border-border"
            >
              <div className="px-4 py-4 space-y-2 max-h-[60vh] overflow-y-auto">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                      pathname === item.href
                        ? "bg-primary text-primary-foreground"
                        : "text-foreground hover:bg-muted"
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}

                <button
                  onClick={() => {
                    setOpen(false);
                    handleLogout();
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-colors font-medium"
                >
                  <LogOut className="w-5 h-5" />
                  Keluar
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Desktop Sidebar */}
      <motion.aside
        // FIX: tambahkan lg:block supaya tampil pada breakpoint lg+
        className="hidden lg:block lg:fixed left-0 top-0 bottom-0 w-72 bg-background border-r border-border pt-6 overflow-y-auto z-40"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Link
          href="/admin/dashboard"
          className="flex items-center gap-3 px-6 mb-8"
        >
          <div className="w-10 h-10 rounded-lg gradient-accent flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg">Konsultasi</span>
            <span className="text-xs text-muted-foreground">Admin Panel</span>
          </div>
        </Link>

        {/* Main Navigation */}
        <nav className="space-y-2 px-3 mb-8">
          {navItems.map((item) => (
            <motion.div key={item.href} whileHover={{ x: 4 }}>
              <Link
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                  pathname === item.href
                    ? "bg-primary text-primary-foreground"
                    : "text-foreground hover:bg-muted"
                }`}
              >
                <item.icon className="w-5 h-5 text-foreground" />
                <span className="font-medium">{item.label}</span>
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Logout Button (fixed near bottom inside sidebar) */}
        <div className="px-3 pb-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-lg text-destructive hover:bg-destructive/10 transition-colors font-medium"
          >
            <LogOut className="w-5 h-5" />
            Keluar
          </button>
        </div>
      </motion.aside>
    </>
  );
}
