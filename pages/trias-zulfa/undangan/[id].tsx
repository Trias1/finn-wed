import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Script from "next/script";
import { FaBookOpen } from "react-icons/fa";
import undanganData from "../../undangan.json";
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
  const [bookId, setBookId] = useState("");
  const [onNewComment] = useState("");
  const { id: rawId } = router.query;
  const modalRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const [userData, setUserData] = useState<any | null>(null);
  const [notFound, setNotFound] = useState(false);

  const formattedId =
    typeof rawId === "string" ? rawId.toLowerCase().replace(/\s+/g, "-") : "";

  useEffect(() => {
    if (formattedId) {
      const found = undanganData.find(
        (item) => item.name.toLowerCase().replace(/\s+/g, "-") === formattedId
      );

      if (found) {
        setUserData(found);

        const timer = setTimeout(() => {
          if (window.bootstrap && modalRef.current) {
            const modalInstance = new window.bootstrap.Modal(modalRef.current);
            modalInstance.show();
          }
        }, 300);

        return () => clearTimeout(timer);
      } else {
        setNotFound(true);
      }
    }
  }, [formattedId]);

  const handleOpenInvitation = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        .catch((err) => console.warn("Autoplay blocked:", err));
    }

    if (window.bootstrap && modalRef.current) {
      const modalInstance = window.bootstrap.Modal.getInstance(
        modalRef.current
      );
      modalInstance?.hide();
    }
  };

  if (notFound) {
    return (
      <div className="text-center mt-5 p-4">
        <h1>Undangan Tidak Ditemukan</h1>
        <p>
          Silakan periksa kembali URL atau hubungi admin untuk info lebih
          lanjut.
        </p>
      </div>
    );
  }

  if (!userData) return null;

  return (
    <>
      {/* Musik latar: hanya diputar setelah klik tombol */}
      <audio ref={audioRef} loop>
        <source
          src="/audio/WeddingNasheedMuhammadAlMuqitLyricsArabic.mp3"
          type="audio/mp3"
        />
        Browser Anda tidak mendukung elemen audio.
      </audio>

      {/* Modal Undangan */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
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
                  width={1000}
                  height={1000}
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

      {/* Komponen Undangan */}
      <Navbar />
      <MainBanner />
      <CalonPasangan />
      <LoveStory />
      <WeedingLocation />
      <Maps />
      <AdabWalimah />
      <Amplop />
      <AddBook id={bookId} setBookId={setBookId} onNewComment={onNewComment} />
      <BooksList />
      <Footer />

      {/* Bootstrap Script */}
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js"
        strategy="beforeInteractive"
      />
    </>
  );
}
