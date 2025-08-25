"use client";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Script from "next/script";
import { FaBookOpen } from "react-icons/fa";
import {
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { db } from "../../../services/firebase-config";

// Komponen lain
import Navbar from "../../components/organisms/Navbar";
import MainBanner from "../../components/organisms/mainBanner";
import CalonPasangan from "../../components/organisms/calonPasangan";
import WeedingLocation from "../../components/organisms/WeedingLocation";
import Maps from "../../components/organisms/Maps";
import Footer from "../../components/organisms/Footer";
import AddBook from "../../components/organisms/Comments/AddBook";
import BooksList from "../../components/organisms/Comments/BookList";
import LoveStory from "../../components/organisms/lovestory";
import AdabWalimah from "../../components/organisms/walimah";
import Amplop from "../../components/organisms/amplop";

export default function UndanganUserPage() {
  const router = useRouter();
  const { pasangan, id: rawId } = router.query; // ✅ ambil keduanya

  const [userData, setUserData] = useState<any | null>(null);
  const [notFound, setNotFound] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (!router.isReady) return;

    // Buat slug yang sama kayak waktu disimpan
    const formattedId = typeof rawId === "string" ? rawId.toLowerCase().trim() : "";
    if (!formattedId) return;

    // Kalau slug tamu unik global → cukup pakai `formattedId`
    // Kalau slug tamu unik per pasangan → pakai kombinasi pasangan/id
    // const formattedSlug = `${pasangan}/${formattedId}`;

    const fetchTamu = async () => {
      try {
        const q = query(
          collection(db, "tamu"),
          where("slug", "==", formattedId) // 🔧 kalau slug unik per pasangan, ganti ke formattedSlug
        );
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          const data = snapshot.docs[0].data();

          setUserData({
            ...data,
            name: data.name || "Tamu Undangan",
            description:
              data.description ||
              "Kami dengan senang hati mengundang Anda untuk merayakan momen bahagia ini bersama kami.",
            slug: data.slug,
          });

          // auto show modal
          setTimeout(() => {
            if (typeof window !== "undefined" && window.bootstrap && modalRef.current) {
              const modalInstance = new (window as any).bootstrap.Modal(
                modalRef.current
              );
              modalInstance.show();
            }
          }, 500);
        } else {
          setNotFound(true);
        }
      } catch (err) {
        console.error("Error ambil tamu:", err);
        setNotFound(true);
      }
    };

    fetchTamu();
  }, [router.isReady, pasangan, rawId]);

  const handleOpenInvitation = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .catch((err) => console.warn("Autoplay blocked:", err));
    }
    if (window.bootstrap && modalRef.current) {
      const modalInstance = (window as any).bootstrap.Modal.getInstance(
        modalRef.current
      );
      modalInstance?.hide();
    }
  };

  if (notFound) {
    return (
      <div className="text-center mt-5 p-4">
        <h1>Undangan Tidak Ditemukan</h1>
        <p>Silakan cek kembali URL atau hubungi admin.</p>
      </div>
    );
  }

  if (!userData) return null;

  return (
    <>
      {/* Musik */}
      <audio ref={audioRef} loop>
        <source
          src="/audio/WeddingNasheedMuhammadAlMuqitLyricsArabic.mp3"
          type="audio/mp3"
        />
      </audio>

      {/* Modal Intro */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog modal-fullscreen">
          <div className="modal-content" style={{ backgroundColor: "#C38D7A" }}>
            <div
              className="modal-body text-center d-flex flex-column align-items-center justify-content-center"
              style={{ height: "100vh" }}
            >
              <div className="img-undangan mb-4">
                <Image
                  src="/img/bck.png"
                  width={600}
                  height={600}
                  alt="Foto Pengantin"
                />
              </div>
              <p className="nameUndangan fw-bold fs-3 text-white">
                {userData.name}
              </p>
              <p className="desc1 fw-bold text-lg text-white">
                {userData.description}
              </p>
              <div className="descButton d-flex align-items-center gap-2 mt-4 rounded-pill px-3 py-2 bg-white">
                <FaBookOpen />
                <button
                  type="button"
                  className="btn btn-undangan"
                  onClick={handleOpenInvitation}
                >
                  Buka Undangan
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Isi Undangan */}
      <Navbar />
      <MainBanner />
      <CalonPasangan />
      <LoveStory />
      <WeedingLocation />
      <Maps />
      <AdabWalimah />
      <Amplop />
      <AddBook id={userData.slug} setBookId={() => {}} onNewComment="" />
      <BooksList />
      <Footer />

      {/* Bootstrap JS */}
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js"
        strategy="beforeInteractive"
      />
    </>
  );
}
