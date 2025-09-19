"use client";
import { useEffect, useState } from "react";
import { QuerySnapshot, DocumentData } from "firebase/firestore";
import TamuService from "../../../services/tamu-services";
import slugify from "slugify";
import { exportAllUndanganToWord } from "../../../utils/exportWord";
import AdminLayout from "../../components/admin/sidebar/AdminLayout";
import toast from "react-hot-toast";

export default function ShareUndangan() {
  const [tamu, setTamu] = useState<any[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const [output, setOutput] = useState("");

  useEffect(() => {
    const unsubscribe = TamuService.getAllTamuRealtime(
      (snapshot: QuerySnapshot<DocumentData>) => {
        const tamuList = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setTamu(tamuList);
      }
    );

    return () => unsubscribe();
  }, []);

  const generateTeks = (name: string) => {
    const link = `https://trias-zulfa-wedding.vercel.app/trias-zulfa/undangan/${slugify(
      name,
      { lower: true }
    )}`;

    return `Kepada Yth. Bapak/Ibu/Saudara/i ${name}
Di Tempat

Bismillahirrahmanirrahim

UNDANGAN WALIMATUL 'URS

Assalamualaikum Warahmatullah Wabarakatuh

Dengan hormat, kami mengundang Bapak/Ibu/Saudara/i sekalian yang dirahmati Allah untuk menghadiri acara pernikahan kami:

Trias Zaen Mutaqin & Zulfa Syafiyah Pratiwi

Hari/Tanggal: Ahad, 28 September 2025
Waktu: Pukul 11.00 WIB – selesai
Tempat: Graha Umbaran
 Jl. Pangeran Cakrabuana No.102, Sendang, Kec. Sumber, Kabupaten Cirebon, Jawa Barat 45611

📎 Berikut link undangan kami:
${link}

Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa dan restu kepada kedua mempelai.

Doa keberkahan bagi pengantin pria dan wanita:

بَارَكَ اللهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ

“Semoga Allah memberkahimu di waktu bahagia dan memberkahimu di waktu susah, serta semoga Allah mempersatukan kalian berdua dalam kebaikan.” (HR. Abu Dawud no. 2130)

Jazakumullahu khairan katsiran

Wassalamualaikum Warahmatullahi Wabarakaatuh`;
  };

  const handleGenerate = () => {
    const data = tamu.find((item) => item.id === selectedId);
    if (!data) return;
    const teks = generateTeks(data.nama);
    setOutput(teks);
  };

  const handleExportAll = () => {
    exportAllUndanganToWord(
      tamu
        .filter((t) => t.statusUndangan === "digital") // hanya digital
        .map((t) => ({ name: t.nama })),
      (name: string) => generateTeks(name)
    );
  };

  const handleExportOne = () => {
    const data = tamu.find((item) => item.id === selectedId);
    if (!data) return;

    exportAllUndanganToWord([{ name: data.nama }], (name: string) =>
      generateTeks(name)
    );
  };

  const handleCopy = () => {
    if (!output) return;
    navigator.clipboard.writeText(output);
    toast.success("Teks undangan berhasil disalin ke clipboard!"
    );
  };

  const handleShareWA = () => {
    if (!output) return;
    const url = `https://wa.me/?text=${encodeURIComponent(output)}`;
    window.open(url, "_blank");
  };

  return (
    <AdminLayout>
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8 space-y-6">
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <span>📨</span> Bagikan Undangan
        </h1>

        {/* Dropdown hanya undangan digital */}
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="border rounded-lg px-4 py-3 w-full shadow-sm text-lg"
        >
          <option value="">-- Pilih Tamu --</option>
          {tamu
            .filter((t) => t.statusUndangan === "digital")
            .map((guest) => (
              <option key={guest.id} value={guest.id}>
                {guest.nama}
              </option>
            ))}
        </select>

        {/* Tombol aksi */}
        <div className="flex flex-wrap gap-3 bg-gray-50 p-5 rounded-lg shadow-inner justify-center">
          <button
            onClick={handleGenerate}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg shadow hover:bg-blue-700 font-semibold"
          >
            ✨ Generate
          </button>
          <button
            onClick={handleCopy}
            className="bg-green-600 text-white px-5 py-3 rounded-lg shadow hover:bg-green-700 font-semibold disabled:opacity-50"
            disabled={!output}
          >
            📋 Copy
          </button>
          <button
            onClick={handleShareWA}
            className="bg-emerald-600 text-white px-5 py-3 rounded-lg shadow hover:bg-emerald-700 font-semibold disabled:opacity-50"
            disabled={!output}
          >
            📲 Share WA
          </button>
          <button
            onClick={handleExportOne}
            className="bg-purple-600 text-white px-5 py-3 rounded-lg shadow hover:bg-purple-700 font-semibold disabled:opacity-50"
            disabled={!selectedId}
          >
            📄 Export 1
          </button>
          <button
            onClick={handleExportAll}
            className="bg-orange-600 text-white px-5 py-3 rounded-lg shadow hover:bg-orange-700 font-semibold"
          >
            📑 Export Semua
          </button>
        </div>

        {output && (
          <div className="p-6 border rounded-lg bg-gray-50 shadow-inner whitespace-pre-line leading-relaxed text-lg">
            {output}
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
