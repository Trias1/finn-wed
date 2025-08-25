"use client";
import { useEffect, useState } from "react";
import { QuerySnapshot, DocumentData, collection, onSnapshot } from "firebase/firestore";
import AdminLayout from "../../components/admin/sidebar/AdminLayout";
import TamuService from "../../../services/tamu-services";
import { db } from "../../../services/firebase-config";

export default function AdminDashboard() {
  const [totalUndangan, setTotalUndangan] = useState(0);
  const [digitalCount, setDigitalCount] = useState(0);
  const [cetakCount, setCetakCount] = useState(0);

  // 🔥 tambahan untuk rekap hadir
  const [totalRespon, setTotalRespon] = useState(0);
  const [hadirCount, setHadirCount] = useState(0);
  const [tidakHadirCount, setTidakHadirCount] = useState(0);

  // Ambil data tamu realtime
  useEffect(() => {
    const unsubscribe = TamuService.getAllTamuRealtime(
      (snapshot: QuerySnapshot<DocumentData>) => {
        setTotalUndangan(snapshot.size);

        let digital = 0;
        let cetak = 0;

        snapshot.docs.forEach((doc) => {
          const data = doc.data();
          if (data.statusUndangan === "digital") digital++;
          if (data.statusUndangan === "cetak") cetak++;
        });

        setDigitalCount(digital);
        setCetakCount(cetak);
      }
    );
    return () => unsubscribe();
  }, []);

  // 🔥 Ambil data kehadiran dari collection "wedd"
  useEffect(() => {
    const q = collection(db, "wedd");
    const unsubscribe = onSnapshot(q, (snapshot) => {
      setTotalRespon(snapshot.size);

      let hadir = 0;
      let tidak = 0;

      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        if (data.status === "Hadir") hadir++;
        if (data.status === "Tidak Hadir") tidak++;
      });

      setHadirCount(hadir);
      setTidakHadirCount(tidak);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AdminLayout>
      <h1 className="text-2xl font-bold mb-6">Dashboard</h1>
      <p className="mt-2 text-gray-700 mb-8">
        Selamat datang di Wedding Admin 🎉
      </p>

      {/* Card Statistik Undangan */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-xl font-bold text-purple-700">Total Undangan</h2>
          <p className="text-3xl font-extrabold mt-2">{totalUndangan}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-xl font-bold text-green-700">Digital</h2>
          <p className="text-3xl font-extrabold mt-2">{digitalCount}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-xl font-bold text-blue-700">Cetak</h2>
          <p className="text-3xl font-extrabold mt-2">{cetakCount}</p>
        </div>
      </div>

      {/* Card Statistik Kehadiran */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-xl font-bold text-gray-700">Total Respon</h2>
          <p className="text-3xl font-extrabold mt-2">{totalRespon}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-xl font-bold text-green-700">Hadir</h2>
          <p className="text-3xl font-extrabold mt-2">{hadirCount}</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h2 className="text-xl font-bold text-red-700">Tidak Hadir</h2>
          <p className="text-3xl font-extrabold mt-2">{tidakHadirCount}</p>
        </div>
      </div>
    </AdminLayout>
  );
}
