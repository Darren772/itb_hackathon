// ─── Mock Data — OnlyPeer Demo ───────────────────────────────────────────────
// Realistic ITB student profiles, groups, requests, and messages.
// Used across all pages in Phase 1 (no backend needed).

import type { UserPublic, GroupCard, JoinRequest, Message, Notification } from "@/types";

// ── Users ─────────────────────────────────────────────────────────────────────

export const ME: UserPublic = {
  id: "user-reza-01",
  email: "reza.mahendra@mahasiswa.itb.ac.id",
  full_name: "Reza Mahendra",
  major: "Teknik Informatika",
  academic_year: 2022,
  bio: "Suka ngoprek backend dan sering overthink soal arsitektur. Waktu luang: nonton Formula 1 sambil nge-debug.",
  linkedin_url: "https://linkedin.com/in/rezamahendra",
  skills: ["Python", "FastAPI", "PostgreSQL", "Docker", "Git"],
  courses: [
    { course_code: "IF2210", course_name: "Pemrograman Berorientasi Objek", status: "completed" },
    { course_code: "IF3140", course_name: "Manajemen Basis Data", status: "completed" },
    { course_code: "IF3170", course_name: "Kecerdasan Buatan", status: "current" },
    { course_code: "IF3111", course_name: "Pengembangan Aplikasi pada Platform Khusus", status: "current" },
  ],
  created_at: "2024-02-10T08:00:00Z",
};

export const LEADER_DAFFA: UserPublic = {
  id: "user-daffa-02",
  email: "daffa.ariq@mahasiswa.itb.ac.id",
  full_name: "Daffa Ariq Pramudya",
  major: "Teknik Informatika",
  academic_year: 2021,
  bio: "Full-stack enjoyer. Pernah magang di startup, sekarang lagi obsesi sama system design. Biasanya ngerjain tugas H-1.",
  linkedin_url: "https://linkedin.com/in/daffaariq",
  skills: ["React", "Next.js", "TypeScript", "Node.js", "Supabase"],
  courses: [
    { course_code: "IF3140", course_name: "Manajemen Basis Data", status: "current" },
    { course_code: "IF3250", course_name: "Proyek Perangkat Lunak", status: "current" },
  ],
  created_at: "2023-01-15T08:00:00Z",
};

export const SEEKER_NABILA: UserPublic = {
  id: "user-nabila-03",
  email: "nabila.zahra@mahasiswa.itb.ac.id",
  full_name: "Nabila Zahra Santoso",
  major: "Sistem dan Teknologi Informasi",
  academic_year: 2022,
  bio: "UI/UX enthusiast yang nyasar ke coding. Figma is life, tapi lagi belajar React biar gak bergantung dev terus.",
  linkedin_url: "https://linkedin.com/in/nabilazahra",
  skills: ["Figma", "React", "Tailwind CSS", "User Research", "Prototyping"],
  courses: [
    { course_code: "IF3250", course_name: "Proyek Perangkat Lunak", status: "current" },
    { course_code: "IK3220", course_name: "Interaksi Manusia Komputer", status: "current" },
  ],
  created_at: "2024-01-20T08:00:00Z",
};

// ── Groups ────────────────────────────────────────────────────────────────────

export const MOCK_GROUPS: GroupCard[] = [
  {
    id: "group-01",
    title: "Tubes MBD — nyari backend dev yang gak ngilang",
    description:
      "Kelompok buat Tubes IF3140 Manajemen Basis Data. Kita udah ada frontend (Next.js), butuh 1 orang yang kuat di SQL & normalisasi. Target A, tapi gak mau lembur tiap malem — kita kerja terstruktur dari awal.",
    category: "course",
    course_code: "IF3140",
    target_size: 4,
    current_size: 3,
    target_grade: "A",
    weekly_commitment_hours: 10,
    skills_needed: ["PostgreSQL", "SQL", "Python"],
    leader: { id: "user-daffa-02", full_name: "Daffa Ariq Pramudya", major: "Teknik Informatika" },
    ai_reason: "Kamu punya PostgreSQL & Python — persis yang mereka butuhin, plus satu angkatan.",
    ai_score: 0.94,
    created_at: "2026-11-20T10:30:00Z",
  },
  {
    id: "group-02",
    title: "GEMASTIK XVI — Tim AI/ML, 1 slot tersisa!",
    description:
      "Ikut GEMASTIK cabang Kecerdasan Buatan. Tim kita: 1 ML engineer, 1 backend. Butuh 1 lagi yang bisa riset & nulis laporan teknis. Idealnya udah familiar sama scikit-learn atau PyTorch. Punya pengalaman kompetisi = nilai plus.",
    category: "competition",
    course_code: null,
    target_size: 3,
    current_size: 2,
    target_grade: null,
    weekly_commitment_hours: 15,
    skills_needed: ["Machine Learning", "PyTorch", "Technical Writing"],
    leader: { id: "user-farhan-04", full_name: "Farhan Adi Nugroho", major: "Teknik Informatika" },
    ai_reason: "Kamu ambil IF3170 AI & punya Python — cocok buat tim GEMASTIK ini.",
    ai_score: 0.88,
    created_at: "2026-11-19T14:00:00Z",
  },
  {
    id: "group-03",
    title: "Tubes PPL — Proyek Perangkat Lunak (mau serius)",
    description:
      "Cari anggota buat Tubes IF3250. Konsepnya app manajemen inventaris UMKM. Tech stack: Next.js + FastAPI + PostgreSQL. Kita pakai Agile (sprint 2 mingguan, standup tiap Senin). Kalau kamu tipe yang suka proses rapih dan gak ghosting di grup WA, let's go.",
    category: "course",
    course_code: "IF3250",
    target_size: 5,
    current_size: 3,
    target_grade: "A",
    weekly_commitment_hours: 12,
    skills_needed: ["Next.js", "FastAPI", "Agile", "Git"],
    leader: { id: "user-siska-05", full_name: "Siska Rahmawati", major: "Teknik Informatika" },
    ai_reason: "Stack-nya Next.js + FastAPI, persis yang kamu kuasai. Dan kamu juga ambil IF3250.",
    ai_score: 0.91,
    created_at: "2026-11-18T09:00:00Z",
  },
  {
    id: "group-04",
    title: "Tim Desain — ITB Design Fest 2026",
    description:
      "Cari 1-2 orang buat ikut ITB Design Fest. Tantangannya: redesign pengalaman layanan publik. Kita butuh yang bisa Figma & mau riset user dari awal (bukan langsung loncat ke mockup). Gak harus dari STI atau DKV — siapapun yang genuinely peduli sama user experience.",
    category: "competition",
    course_code: null,
    target_size: 4,
    current_size: 2,
    target_grade: null,
    weekly_commitment_hours: 8,
    skills_needed: ["Figma", "User Research", "Prototyping"],
    leader: { id: "user-aulia-06", full_name: "Aulia Fitri Handayani", major: "Desain Komunikasi Visual" },
    ai_reason: "Figma & riset user ada di skillset kamu — ini tim yang dicari.",
    ai_score: 0.82,
    created_at: "2026-11-17T11:30:00Z",
  },
  {
    id: "group-05",
    title: "Study Group — Persiapan UAS IF3170 AI",
    description:
      "Bukan kelompok tugas, tapi study group serius buat UAS AI. Ketemu 2x seminggu di Labtek V atau online. Bahas slide + latihan soal bareng. Kalau kamu tipe yang belajarnya lebih masuk kalau diskusi dibanding baca sendirian, join aja.",
    category: "social",
    course_code: "IF3170",
    target_size: 6,
    current_size: 4,
    target_grade: null,
    weekly_commitment_hours: 4,
    skills_needed: ["Machine Learning", "Statistics"],
    leader: { id: "user-rizky-07", full_name: "Rizky Firmansyah", major: "Teknik Informatika" },
    ai_reason: "Kamu lagi ambil IF3170 — study group ini bisa bantu banget persiapan UAS.",
    ai_score: 0.79,
    created_at: "2026-11-16T16:00:00Z",
  },
  {
    id: "group-06",
    title: "Panitia OSKM ITB 2027 — Divisi IT",
    description:
      "Rekrut divisi IT OSKM 2027. Tugasnya: bikin sistem pendaftaran peserta, QR check-in, dan dashboard panitia. Ini bukan proyek kelas — ini nyata, dipake ribuan orang. Stack bebas, yang penting bisa deliver. Butuh 3 orang: 1 frontend, 1 backend, 1 yang bisa keduanya.",
    category: "event",
    course_code: null,
    target_size: 3,
    current_size: 1,
    target_grade: null,
    weekly_commitment_hours: 10,
    skills_needed: ["React", "Node.js", "Database", "Project Management"],
    leader: { id: "user-kevin-08", full_name: "Kevin Nathaniel Gunawan", major: "Teknik Informatika" },
    ai_reason: "Backend & DB skills kamu pas banget buat sistem QR check-in yang mereka mau bangun.",
    ai_score: 0.86,
    created_at: "2026-11-15T13:00:00Z",
  },
];

// ── Join Requests ─────────────────────────────────────────────────────────────

export const MOCK_INCOMING_REQUESTS: Array<JoinRequest & {
  seeker: UserPublic;
  group: GroupCard;
}> = [
  {
    id: "req-01",
    seeker_id: "user-nabila-03",
    group_id: "group-01",
    status: "pending",
    created_at: "2026-11-21T09:14:00Z",
    updated_at: "2026-11-21T09:14:00Z",
    seeker: SEEKER_NABILA,
    group: MOCK_GROUPS[0],
  },
  {
    id: "req-02",
    seeker_id: "user-reza-01",
    group_id: "group-03",
    status: "chatting",
    created_at: "2026-11-20T14:30:00Z",
    updated_at: "2026-11-20T16:00:00Z",
    seeker: ME,
    group: MOCK_GROUPS[2],
  },
];

export const MOCK_OUTGOING_REQUESTS: Array<JoinRequest & {
  group: GroupCard;
}> = [
  {
    id: "req-03",
    seeker_id: "user-reza-01",
    group_id: "group-01",
    status: "chatting",
    created_at: "2026-11-20T11:00:00Z",
    updated_at: "2026-11-20T16:00:00Z",
    group: MOCK_GROUPS[0],
  },
  {
    id: "req-04",
    seeker_id: "user-reza-01",
    group_id: "group-02",
    status: "pending",
    created_at: "2026-11-21T08:00:00Z",
    updated_at: "2026-11-21T08:00:00Z",
    group: MOCK_GROUPS[1],
  },
];

// ── Messages ──────────────────────────────────────────────────────────────────

export const MOCK_MESSAGES: Message[] = [
  {
    id: "msg-01",
    request_id: "req-01",
    sender_id: "user-daffa-02",
    content: "Hei Nabila! Liat profile kamu, kamu punya Figma & React ya. Boleh tanya — pengalaman kamu di React udah sampe mana? Kita butuhnya yang bisa handle state management juga.",
    created_at: "2026-11-20T16:05:00Z",
  },
  {
    id: "msg-02",
    request_id: "req-01",
    sender_id: "user-nabila-03",
    content: "Haii Daffa! Iya, React-ku udah lumayan — pernah bikin project pake Zustand & React Query. Kalau Redux sih belum, tapi bisa belajar cepet. Kita pake state management apa di tubes ini?",
    created_at: "2026-11-20T16:12:00Z",
  },
  {
    id: "msg-03",
    request_id: "req-01",
    sender_id: "user-daffa-02",
    content: "Zustand cukup banget kok buat scope tubesnya. Yang lebih penting kamu ngerti async data flow. BTW target grade kamu A juga kan? Tim kita semuanya komit A.",
    created_at: "2026-11-20T16:18:00Z",
  },
  {
    id: "msg-04",
    request_id: "req-01",
    sender_id: "user-nabila-03",
    content: "Iya dong, A. Kalau mau B mending ngerjain sendiri haha. Kapan biasanya meeting? Aku kosong Senin & Kamis malem.",
    created_at: "2026-11-20T16:25:00Z",
  },
  {
    id: "msg-05",
    request_id: "req-01",
    sender_id: "user-daffa-02",
    content: "Perfect, kita emang schedule-nya Senin malem. Oke kayaknya kamu cocok — tunggu approval resmi ya, aku diskusi dulu sama tim 🙏",
    created_at: "2026-11-20T16:30:00Z",
  },
];

// ── Notifications ─────────────────────────────────────────────────────────────

export const MOCK_NOTIFICATIONS: Notification[] = [
  {
    id: "notif-01",
    user_id: "user-reza-01",
    type: "approved",
    payload: { group_title: "Tubes PPL — Proyek Perangkat Lunak", group_id: "group-03" },
    is_read: false,
    created_at: "2026-11-21T10:00:00Z",
  },
  {
    id: "notif-02",
    user_id: "user-reza-01",
    type: "message",
    payload: { sender_name: "Daffa Ariq Pramudya", group_title: "Tubes MBD", request_id: "req-03" },
    is_read: false,
    created_at: "2026-11-20T16:30:00Z",
  },
  {
    id: "notif-03",
    user_id: "user-reza-01",
    type: "chat_opened",
    payload: { group_title: "Tubes MBD — nyari backend dev yang gak ngilang", request_id: "req-03" },
    is_read: true,
    created_at: "2026-11-20T16:00:00Z",
  },
  {
    id: "notif-04",
    user_id: "user-reza-01",
    type: "new_request",
    payload: { group_title: "GEMASTIK XVI", request_id: "req-04" },
    is_read: true,
    created_at: "2026-11-19T09:00:00Z",
  },
];

// ── Fit Summary (AI-03 mock) ──────────────────────────────────────────────────

export const MOCK_FIT_SUMMARY = {
  match_points: [
    "Skill PostgreSQL & Python langsung relevan sama kebutuhan backend tubes IF3140",
    "Ambil mata kuliah IF3140 di semester yang sama — konteks masalahnya sama",
    "Komitmen 10 jam/minggu sesuai kapasitas yang diminta leader",
  ],
  gaps: [
    "Belum ada portofolio tubes tim sebelumnya (pengerjaan solo masih oke)",
    "Belum pernah kerja sama Daffa — chemistry belum terbukti",
  ],
  suggested_questions: [
    "Pernah handle query SQL kompleks (JOIN banyak tabel, subquery)? Bisa kasih contoh kasusnya?",
    "Kalau ada anggota tim yang progressnya ketinggalan, kamu biasanya ngapain?",
  ],
  summary:
    "Nabila punya skill yang langsung bisa dipake dan satu konteks mata kuliah. Layak dipertimbangkan — tanyain pengalaman kolaborasinya.",
};
