/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Users, Filter, ChevronDown } from "lucide-react";
import Link from "next/link";
import { useUpcomingSessions } from "@/hooks/useUpcomingSessions";
import { useInView } from "react-intersection-observer";
import { useSubjects } from "@/hooks/useSubjects";

interface Participant {
  id: string;
  name: string;
  class: string;
  materi: string;
}

interface SessionData {
  sessionId: string;
  date: string;
  time: string;
  subjects: string[];
  tutors: string[];
  participants: Participant[];
  total: number;
  maxStudents: number;
}

const getTodayString = () => {
  const today = new Date();
  const y = today.getFullYear();
  const m = String(today.getMonth() + 1).padStart(2, "0");
  const d = String(today.getDate()).padStart(2, "0");
  return `${y}-${m}-${d}`;
};

const TODAY_STRING = getTodayString();

const SkeletonCard = () => (
  <div className="bg-white rounded-xl border overflow-hidden shadow-sm animate-pulse">
    <div className="px-6 py-4 border-b bg-gray-100">
      <div className="flex flex-col md:flex-row justify-between gap-4">
        <div>
          <div className="h-4 bg-gray-200 w-24 mb-2 rounded"></div>
          <div className="h-6 bg-gray-300 w-32 rounded"></div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="h-4 bg-gray-200 w-40 rounded"></div>
          <div className="h-4 bg-gray-200 w-32 rounded"></div>
        </div>
      </div>
    </div>
    <div className="divide-y">
      {[...Array(2)].map((_, i) => (
        <div key={i} className="px-6 py-4">
          <div className="flex justify-between">
            <div>
              <div className="h-4 bg-gray-200 w-24 rounded mb-1"></div>
              <div className="h-3 bg-gray-100 w-16 rounded"></div>
            </div>
            <div className="h-4 bg-gray-200 w-20 rounded"></div>
          </div>
        </div>
      ))}
    </div>
    <div className="px-6 py-3 bg-gray-100 h-10"></div>
  </div>
);

export default function ListOfParticipants() {
  const [selectedDate, setSelectedDate] = useState("");
  const [filterMapel, setFilterMapel] = useState("");

  const { data: classes = [] } = useSubjects();

  const { data, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useUpcomingSessions({
      dateFilter: selectedDate || undefined,
      subjectFilter: filterMapel || undefined,
    });

  const sessionsList: SessionData[] = useMemo(() => {
    if (!data) return [];
    return data.pages.flatMap((p) => p.data);
  }, [data]);

  const { ref, inView } = useInView();
  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  const uniqueMapel = useMemo(() => {
    return classes.map((c: any) => c.name);
  }, [classes]);

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("id-ID", {
      weekday: "long",
      month: "long",
      day: "numeric",
    });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: [0.25, 0.46, 0.45, 0.94] as any,
      },
    },
  };

  // --- RENDERING FILTER DAN NAV (STATIS) DIMULAI DI SINI ---

  return (
    <div className="min-h-screen bg-linear-to-br from-background to-muted">
      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="w-5 h-5" />
            Kembali
          </Link>
          <h1 className="hidden sm:block text-lg font-bold">Daftar Peserta</h1>
          <span className="w-20" />
        </div>
      </nav>

      {/* PAGE */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* TITLE */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <h1 className="text-4xl font-bold mb-3">Daftar Peserta Konsultasi</h1>
          <p className="text-muted-foreground text-lg">
            Lihat siswa yang mendaftar untuk setiap sesi
          </p>
        </motion.div>

        {/* FILTERS */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 gap-4 mb-12"
        >
          {/* DATE FILTER */}
          <motion.div variants={itemVariants}>
            <label className="flex items-center gap-2 text-sm font-semibold mb-2">
              <Calendar className="w-4 h-4" /> Filter Tanggal
            </label>
            <div className="relative">
              <Calendar className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="date"
                value={selectedDate}
                min={TODAY_STRING}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full px-4 py-3 pl-12 border rounded-lg bg-white"
              />
            </div>
            {selectedDate && (
              <p className="text-sm text-muted-foreground mt-2">
                Memfilter: {formatDate(selectedDate)}
              </p>
            )}
          </motion.div>

          {/* SUBJECT FILTER */}
          <motion.div variants={itemVariants}>
            <label className="flex items-center gap-2 text-sm font-semibold mb-2">
              <Filter className="w-4 h-4" /> Filter Mata Pelajaran
            </label>

            <div className="relative">
              <select
                value={filterMapel}
                onChange={(e) => setFilterMapel(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg bg-white pr-10 appearance-none"
              >
                <option value="">Semua Mata Pelajaran</option>
                {uniqueMapel.map((m: string) => (
                  <option key={m} value={m}>
                    {m}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none" />
            </div>
          </motion.div>
        </motion.div>

        {/* --- KONTEN DINAMIS DIMULAI DI SINI --- */}

        {/* KONDISI 1: INITIAL LOADING / LOADING SETELAH FILTER BERUBAH */}
        {isLoading && sessionsList.length === 0 ? (
          <div className="space-y-6">
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </div>
        ) : (
          <>
            {/* KONDISI 2: EMPTY STATE */}
            {sessionsList.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="py-16 text-center"
              >
                <Users className="w-14 h-14 text-muted-foreground mx-auto opacity-30 mb-4" />
                <p className="text-muted-foreground text-lg">
                  Tidak ada sesi untuk filter ini.
                </p>
              </motion.div>
            ) : (
              /* KONDISI 3: LIST DATA */
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-6"
              >
                {sessionsList.map((session, sessionIndex) => (
                  <motion.div
                    key={session.sessionId + session.date}
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                    transition={{ duration: 0.5, delay: sessionIndex * 0.05 }}
                    className="bg-white rounded-xl border overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
                  >
                    {/* HEADER */}
                    <div className="px-6 py-4 border-b bg-linear-to-r from-primary/10 to-accent/10">
                      <div className="flex flex-col md:flex-row justify-between gap-4">
                        <div>
                          <p className="text-sm text-muted-foreground">
                            {formatDate(session.date)}
                          </p>
                          <h3 className="text-2xl font-bold">{session.time}</h3>
                          <p className="text-xs text-muted-foreground">
                            {session.total} / {session.maxStudents} peserta
                          </p>
                        </div>

                        <div className="text-sm">
                          <p>
                            <span className="font-semibold text-primary">
                              Mata Pelajaran:
                            </span>{" "}
                            {session.subjects.join(", ")}
                          </p>
                          <p>
                            <span className="font-semibold text-primary">
                              Tutor:
                            </span>{" "}
                            {session.tutors.join(", ")}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* PARTICIPANTS */}
                    <div className="divide-y">
                      {session.participants.map((s) => (
                        <div
                          key={s.id}
                          className="px-6 py-4 hover:bg-muted/30 transition duration-150"
                        >
                          <div className="flex justify-between">
                            <div>
                              <p className="font-semibold">{s.name}</p>
                              <p className="text-sm text-muted-foreground">
                                {s.class}
                              </p>
                            </div>
                            <div className="text-right">
                              <p className="font-medium text-primary">
                                Materi:
                              </p>
                              <p className="max-w-sm truncate">{s.materi}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="px-6 py-3 bg-muted/30 text-sm text-muted-foreground">
                      <Users className="w-4 h-4 inline mr-2" />
                      Total {session.participants.length} peserta terdaftar
                    </div>
                  </motion.div>
                ))}

                {/* LOAD MORE */}
                <div ref={ref} className="py-8 text-center">
                  {isFetchingNextPage ? (
                    // Skeleton untuk loading halaman berikutnya
                    <div className="space-y-6">
                      <SkeletonCard />
                    </div>
                  ) : hasNextPage ? (
                    <button
                      onClick={() => fetchNextPage()}
                      disabled={isFetchingNextPage}
                      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                    >
                      Muat Lebih Banyak
                    </button>
                  ) : (
                    <p className="text-muted-foreground">
                      Semua data sesi telah dimuat.
                    </p>
                  )}
                </div>
              </motion.div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
