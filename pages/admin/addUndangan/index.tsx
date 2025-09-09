"use client";
import React, { useEffect, useState, Fragment } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../../../services/firebase-auth";
import TamuService from "../../../services/tamu-services";
import { QuerySnapshot, DocumentData } from "firebase/firestore";
import slugify from "slugify";
import { FaLink, FaWhatsapp, FaEllipsisV, FaPlus } from "react-icons/fa";
import AdminLayout from "../../components/admin/sidebar/AdminLayout";
import { Menu, Transition } from "@headlessui/react";
import toast from "react-hot-toast";
import ImportExcel from "../ImportExcel";

export default function ListUndangan() {
  const [tamu, setTamu] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  // filter
  const [filterKategori, setFilterKategori] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // modal add & edit
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newData, setNewData] = useState({
    nama: "",
    kategori: "Umum",
    statusUndangan: "digital",
  });
  const [editData, setEditData] = useState<any>(null);

  const router = useRouter();

  // 🔒 cek login
  useEffect(() => {
    const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/login");
      } else {
        const unsubscribeTamu = TamuService.getAllTamuRealtime(
          (snapshot: QuerySnapshot<DocumentData>) => {
            const tamuList = snapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setTamu(tamuList);
            setLoading(false);
          }
        );
        return () => unsubscribeTamu();
      }
    });
    return () => unsubscribeAuth();
  }, [router]);

  // ➕ Tambah tamu
  const handleAdd = async () => {
    if (!newData.nama) return toast.error("Nama tamu harus diisi");
    const slug = slugify(newData.nama, { lower: true });

    await TamuService.addTamu({
      nama: newData.nama,
      kategori: newData.kategori,
      statusUndangan: newData.statusUndangan,
      slug,
    });

    toast.success("Undangan berhasil ditambah 🎉");
    setShowAddModal(false);
    setNewData({ nama: "", kategori: "Umum", statusUndangan: "digital" });
  };

  // ✏️ Edit tamu
  const handleEdit = (t: any) => {
    setEditData(t);
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    if (!editData?.nama) return toast.error("Nama tidak boleh kosong");
    try {
      const newSlug = slugify(editData.nama, { lower: true });
      await TamuService.updateTamu(editData.id, {
        nama: editData.nama,
        kategori: editData.kategori,
        statusUndangan: editData.statusUndangan,
        slug: newSlug,
      });
      toast.success("Undangan berhasil diupdate 🎉");
      setShowEditModal(false);
    } catch (err) {
      console.error(err);
      toast.error("Gagal update undangan");
    }
  };

  // 🗑️ Delete tamu
  const handleDelete = async (id: string, nama: string) => {
    const yakin = confirm(`Yakin mau hapus undangan "${nama}"?`);
    if (!yakin) return;
    try {
      await TamuService.deleteTamu(id);
      toast.success(`"${nama}" berhasil dihapus 🗑️`);
    } catch (err) {
      console.error(err);
      toast.error("Gagal hapus undangan");
    }
  };

  // 📲 Generate teks undangan
// 📲 Generate teks undangan (versi aman WA)
const generateTeks = (name: string, slug: string) => {
  const link = `https://trias-zulfa-wedding.vercel.app/trias-zulfa/undangan/${slug}`;

  return `Kepada Yth. Bapak/Ibu/Saudara/i ${name}
Di Tempat

Bismillahirrahmanirrahim

*UNDANGAN WALIMATUL 'URS*

Assalamualaikum Warahmatullahi Wabarakatuh

Dengan hormat, kami mengundang Bapak/Ibu/Saudara/i sekalian untuk menghadiri acara pernikahan kami:

*Trias Zaen Mutaqin & Zulfa Syafiyah Pratiwi*

Hari/Tanggal : Ahad, 28 September 2025
Waktu        : 11.00 WIB – selesai
Tempat       : Graha Umbaran
Jl. Pangeran Cakrabuana No.102, Sendang, Kec. Sumber, Kabupaten Cirebon

Link undangan kami:
${link}

Merupakan kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa dan restu.

Doa keberkahan:
Barakallahu laka wa baraka ‘alaika wa jama‘a bainakuma fii khair

"Semoga Allah memberkahimu di waktu bahagia maupun susah, serta mempersatukan kalian berdua dalam kebaikan." (HR. Abu Dawud no. 2130)

Jazakumullahu khairan katsiran

Wassalamualaikum Warahmatullahi Wabarakatuh`;
};



  // 📲 Share WA
  const handleShareWA = (t: any) => {
    const pesan = generateTeks(t.nama, t.slug);
    const waUrl = `https://wa.me/?text=${encodeURIComponent(pesan)}`;
    window.open(waUrl, "_blank");
  };

  if (loading) return <p className="text-center mt-5">Loading...</p>;

  // 🔍 filter + search
  const filteredTamu = tamu.filter((t) => {
    const matchSearch = t.nama.toLowerCase().includes(search.toLowerCase());
    const matchKategori =
      filterKategori === "all" || t.kategori === filterKategori;
    const matchStatus =
      filterStatus === "all" || t.statusUndangan === filterStatus;
    return matchSearch && matchKategori && matchStatus;
  });

  // 📌 urutkan sesuai abjad
  const sortedTamu = [...filteredTamu].sort((a, b) =>
    a.nama.localeCompare(b.nama, "id", { sensitivity: "base" })
  );

  // 🚀 pagination logic
  const totalPages = Math.ceil(sortedTamu.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentData = sortedTamu.slice(startIndex, startIndex + itemsPerPage);

  return (
    <AdminLayout>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-6">
        <h1 className="text-2xl font-bold">📋 Daftar Undangan</h1>

        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-blue-700"
          >
            <FaPlus /> Tambah
          </button>
          <ImportExcel />
        </div>
      </div>

      {/* 🔍 Search + Filter */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
        <input
          type="text"
          placeholder="Cari nama tamu..."
          className="border rounded px-3 py-2 focus:ring-2 focus:ring-purple-500"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
        />

        <select
          value={filterKategori}
          onChange={(e) => {
            setFilterKategori(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded px-3 py-2 focus:ring-2 focus:ring-purple-500"
        >
          <option value="all">Semua Kategori</option>
          <option value="Umum">Umum</option>
          <option value="Keluarga">Keluarga</option>
          <option value="Kantor">Kantor</option>
          <option value="Teman">Teman</option>
        </select>

        <select
          value={filterStatus}
          onChange={(e) => {
            setFilterStatus(e.target.value);
            setCurrentPage(1);
          }}
          className="border rounded px-3 py-2 focus:ring-2 focus:ring-purple-500"
        >
          <option value="all">Semua Status</option>
          <option value="digital">Digital</option>
          <option value="cetak">Cetak</option>
        </select>
      </div>

      {/* List tamu */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentData.map((t) => (
          <div key={t.id} className="bg-white rounded-lg shadow p-5 relative">
            {/* menu 3 titik */}
            <div className="absolute top-3 right-3">
              <Menu as="div" className="relative inline-block text-left">
                <Menu.Button className="p-2 rounded-full hover:bg-gray-100">
                  <FaEllipsisV />
                </Menu.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 mt-2 w-32 bg-white border rounded shadow-lg z-10">
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => handleEdit(t)}
                          className={`block w-full text-left px-4 py-2 text-sm ${
                            active ? "bg-yellow-100" : ""
                          }`}
                        >
                          ✏️ Edit
                        </button>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <button
                          onClick={() => handleDelete(t.id, t.nama)}
                          className={`block w-full text-left px-4 py-2 text-sm text-red-600 ${
                            active ? "bg-red-100" : ""
                          }`}
                        >
                          🗑️ Hapus
                        </button>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>

            <h5 className="text-lg font-bold">{t.nama}</h5>
            <p className="text-gray-600">
              {t.kategori} ({t.statusUndangan})
            </p>
            <p className="text-sm text-gray-500 flex items-center gap-1 mt-2">
              <FaLink /> /undangan/{t.slug}
            </p>

            <button
              onClick={() => handleShareWA(t)}
              className="mt-4 bg-green-600 text-white py-2 rounded flex items-center justify-center gap-2 hover:bg-green-700 w-full"
            >
              <FaWhatsapp /> Share via WhatsApp
            </button>
          </div>
        ))}
      </div>

      {/* 🚀 Pagination Controls */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 mt-6">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            ⬅ Prev
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50"
          >
            Next ➡
          </button>
        </div>
      )}

      {/* Modal Tambah */}
      {showAddModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Tambah Undangan</h2>

            <input
              type="text"
              placeholder="Nama tamu"
              value={newData.nama}
              onChange={(e) => setNewData({ ...newData, nama: e.target.value })}
              className="w-full border rounded px-3 py-2 mb-3"
            />

            <select
              value={newData.kategori}
              onChange={(e) =>
                setNewData({ ...newData, kategori: e.target.value })
              }
              className="w-full border rounded px-3 py-2 mb-3"
            >
              <option value="Umum">Umum</option>
              <option value="Keluarga">Keluarga</option>
              <option value="Kantor">Kantor</option>
              <option value="Teman">Teman</option>
            </select>

            <select
              value={newData.statusUndangan}
              onChange={(e) =>
                setNewData({ ...newData, statusUndangan: e.target.value })
              }
              className="w-full border rounded px-3 py-2 mb-3"
            >
              <option value="digital">Digital</option>
              <option value="cetak">Cetak</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={handleAdd}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Edit */}
      {showEditModal && editData && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Edit Undangan</h2>

            <input
              type="text"
              value={editData.nama}
              onChange={(e) =>
                setEditData({ ...editData, nama: e.target.value })
              }
              className="w-full border rounded px-3 py-2 mb-3"
            />

            <select
              value={editData.kategori}
              onChange={(e) =>
                setEditData({ ...editData, kategori: e.target.value })
              }
              className="w-full border rounded px-3 py-2 mb-3"
            >
              <option value="Umum">Umum</option>
              <option value="Keluarga">Keluarga</option>
              <option value="Kantor">Kantor</option>
              <option value="Teman">Teman</option>
            </select>

            <select
              value={editData.statusUndangan}
              onChange={(e) =>
                setEditData({ ...editData, statusUndangan: e.target.value })
              }
              className="w-full border rounded px-3 py-2 mb-3"
            >
              <option value="digital">Digital</option>
              <option value="cetak">Cetak</option>
            </select>

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400"
              >
                Batal
              </button>
              <button
                onClick={handleUpdate}
                className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
}
