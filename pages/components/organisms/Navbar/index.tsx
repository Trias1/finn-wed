"use client";
import React, { useEffect, useState } from "react";
import { AiOutlineHome, AiOutlineGift } from "react-icons/ai";
import { BiUser, BiMessageSquareDetail } from "react-icons/bi";
import { FiBook } from "react-icons/fi";
import { RiMapPinLine, RiHeartLine } from "react-icons/ri";
import { BsPatchCheck } from "react-icons/bs";

export default function Navbar() {
  const [activeNav, setActiveNav] = useState("#mainbanner");
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let lastScroll = 0;

    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Hide saat scroll ke bawah
      if (scrollY > lastScroll && scrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      lastScroll = scrollY;

      // Deteksi section aktif
      const sections = [
        "#mainbanner",
        "#calon",
        "#lovestory",
        "#weddingDate",
        "#maps",
        "#adab",
        "#amplop",
        "#submitss",
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.querySelector(sections[i]) as HTMLElement;
        if (el && scrollY + 120 >= el.offsetTop) {
          setActiveNav(sections[i]);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <nav className={`nav ${visible ? "nav-show" : "nav-hide"}`}>
        <a
          href="#mainbanner"
          className={activeNav === "#mainbanner" ? "active" : ""}
          title="Beranda"
        >
          <AiOutlineHome />
        </a>
        <a
          href="#calon"
          className={activeNav === "#calon" ? "active" : ""}
          title="Calon Pasangan"
        >
          <BiUser />
        </a>
        <a
          href="#lovestory"
          className={activeNav === "#lovestory" ? "active" : ""}
          title="Love Story"
        >
          <RiHeartLine />
        </a>
        <a
          href="#weddingDate"
          className={activeNav === "#weddingDate" ? "active" : ""}
          title="Waktu Acara"
        >
          <FiBook />
        </a>
        <a
          href="#maps"
          className={activeNav === "#maps" ? "active" : ""}
          title="Lokasi"
        >
          <RiMapPinLine />
        </a>
        <a
          href="#adab"
          className={activeNav === "#adab" ? "active" : ""}
          title="Adab Walimah"
        >
          <BsPatchCheck />
        </a>
        <a
          href="#amplop"
          className={activeNav === "#amplop" ? "active" : ""}
          title="Kirim Hadiah"
        >
          <AiOutlineGift />
        </a>
        <a
          href="#submitss"
          className={activeNav === "#submitss" ? "active" : ""}
          title="Buku Tamu"
        >
          <BiMessageSquareDetail />
        </a>
      </nav>

      {/* padding bawah biar konten terakhir gak ketutup nav */}
      <div style={{ paddingBottom: "4rem" }}></div>
    </>
  );
}
