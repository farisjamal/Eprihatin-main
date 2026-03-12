import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Breadcrumb } from "../../components/shared/Breadcrumb";

const FAQS = [
  { q: "Apakah itu Sistem e-Prihatin UTHM?", a: "Sistem e-Prihatin UTHM adalah platform dalam talian berpusat untuk pengurusan sumbangan kebajikan universiti. Ia membolehkan penyumbang dari kalangan orang awam, staf, alumni, dan industri untuk menderma kepada pelbagai tabung kebajikan UTHM secara selamat dan mudah." },
  { q: "Siapa yang boleh menderma melalui sistem ini?", a: "Sesiapa sahaja boleh menderma melalui sistem ini, termasuk orang awam, staf UTHM, alumni, dan pihak industri/korporat. Setiap kategori penyumbang mempunyai pilihan kaedah pembayaran yang berbeza." },
  { q: "Apakah kaedah pembayaran yang diterima?", a: "Kami menerima pembayaran melalui FPX (perbankan dalam talian), pindahan bank terus, dan potongan gaji bulanan (untuk staf UTHM sahaja). Semua pembayaran diproses melalui gerbang pembayaran yang selamat." },
  { q: "Adakah sumbangan saya layak untuk pengecualian cukai?", a: "Ya! UTHM merupakan institusi yang diluluskan di bawah Seksyen 44(6) Akta Cukai Pendapatan 1967. Surat pengecualian cukai akan dijana secara automatik setelah sumbangan anda berjaya diproses." },
  { q: "Bagaimana cara memohon potongan gaji untuk staf UTHM?", a: "Staf UTHM boleh memilih 'Potongan Gaji' semasa proses sumbangan. Borang potongan gaji akan dipaparkan untuk dilengkapkan. Permohonan akan disemak dan diluluskan oleh Pejabat Bendahari dalam masa 3 hari bekerja." },
  { q: "Bagaimana saya boleh semak status sumbangan saya?", a: "Anda boleh menyemak status sumbangan anda di halaman 'Sejarah Sumbangan'. Log masuk ke akaun anda dan pilih menu yang berkaitan." },
  { q: "Adakah maklumat peribadi saya selamat?", a: "Ya, semua maklumat peribadi anda dilindungi mengikut Akta Perlindungan Data Peribadi 2010 (PDPA). Kami menggunakan enkripsi SSL untuk melindungi semua transaksi dalam talian." },
  { q: "Siapa yang harus dihubungi jika ada masalah?", a: "Sila hubungi Pejabat Hal Ehwal Pelajar UTHM di eprihatin@uthm.edu.my atau +607-453 7000 untuk sebarang bantuan atau pertanyaan." },
];

export default function FAQ() {
  const navigate = useNavigate();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="max-w-3xl mx-auto px-6 py-10">
      <Breadcrumb items={[{ label: "Utama", onClick: () => navigate("/") }, { label: "Soalan Lazim" }]} />
      <h1 className="text-2xl font-bold text-[#0F172A] mb-2">Soalan Lazim (FAQ)</h1>
      <p className="text-[#64748B] mb-8">Jawapan kepada soalan-soalan yang sering ditanya berkaitan Sistem e-Prihatin UTHM.</p>

      <div className="space-y-3">
        {FAQS.map((faq, i) => (
          <div key={i} className="overflow-hidden glass-panel">
            <button
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors"
              style={{ background: openIndex === i ? "rgba(77,159,255,0.04)" : "transparent" }}
            >
              <span className="text-sm font-semibold text-[#0F172A] pr-4">{faq.q}</span>
              {openIndex === i ? (
                <ChevronUp className="w-4 h-4 text-[#0A2FA6] flex-shrink-0" />
              ) : (
                <ChevronDown className="w-4 h-4 text-[#64748B] flex-shrink-0" />
              )}
            </button>
            {openIndex === i && (
              <div className="px-5 pb-4" style={{ borderTop: "1px solid rgba(226,232,240,0.6)" }}>
                <p className="text-sm text-[#64748B] leading-relaxed pt-3">{faq.a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}