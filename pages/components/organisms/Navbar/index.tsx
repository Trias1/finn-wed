import React, { useEffect, useState } from "react";
import { AiOutlineHome, AiOutlineGift } from "react-icons/ai";
import { BiUser, BiMessageSquareDetail } from "react-icons/bi";
import { FiBook } from "react-icons/fi";
import { RiMapPinLine, RiHeartLine } from "react-icons/ri";
import { BsPatchCheck } from "react-icons/bs";

export default function Navbar() {
  const [activeNav, setActiveNav] = useState("#mainbanner");
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const scrollPosition = scrollY + 100;

      // Sembunyikan saat scroll ke bawah
      if (scrollY > prevScrollPos && scrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setPrevScrollPos(scrollY);

      // Deteksi bagian aktif
      const sections = [
        { id: "#mainbanner", offset: document.getElementById("mainbanner")?.offsetTop },
        { id: "#calon", offset: document.getElementById("calon")?.offsetTop },
        { id: "#lovestory", offset: document.getElementById("lovestory")?.offsetTop },
        { id: "#weddingDate", offset: document.getElementById("weddingDate")?.offsetTop },
        { id: "#maps", offset: document.getElementById("maps")?.offsetTop },
        { id: "#adab", offset: document.getElementById("adab")?.offsetTop },
        { id: "#amplop", offset: document.getElementById("amplop")?.offsetTop },
        { id: "#submitss", offset: document.getElementById("submitss")?.offsetTop },
      ];

      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i].offset !== undefined && scrollPosition >= sections[i].offset!) {
          setActiveNav(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [prevScrollPos]);

  return (
    <>
      <nav className={`nav ${visible ? "nav-show" : "nav-hide"}`}>
        <a href="#mainbanner" className={activeNav === "#mainbanner" ? "active" : ""} title="Beranda">
          <AiOutlineHome />
        </a>
        <a href="#calon" className={activeNav === "#calon" ? "active" : ""} title="Calon Pasangan">
          <BiUser />
        </a>
        <a href="#lovestory" className={activeNav === "#lovestory" ? "active" : ""} title="Love Story">
          <RiHeartLine />
        </a>
        <a href="#weddingDate" className={activeNav === "#weddingDate" ? "active" : ""} title="Waktu Acara">
          <FiBook />
        </a>
        <a href="#maps" className={activeNav === "#maps" ? "active" : ""} title="Lokasi">
          <RiMapPinLine />
        </a>
        <a href="#adab" className={activeNav === "#adab" ? "active" : ""} title="Adab Walimah">
          <BsPatchCheck />
        </a>
        <a href="#amplop" className={activeNav === "#amplop" ? "active" : ""} title="Kirim Hadiah">
          <AiOutlineGift />
        </a>
        <a href="#submitss" className={activeNav === "#submitss" ? "active" : ""} title="Buku Tamu">
          <BiMessageSquareDetail />
        </a>
      </nav>
      <div style={{ paddingBottom: "3rem" }}></div>
    </>
  );
}
