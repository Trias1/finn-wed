import React from "react";
import { FiInstagram } from "react-icons/fi";
import Image from "next/image";

export default function CalonPasangan() {
  return (
    <section id="calon">
      <div className="containers">
        <div className="calon-cards">
          <div className="text-undangan">
            <p className="arabic-text">
              لَسَّلَامُ عَلَيْكُمْ وَرَحْمَةُ ٱللَّٰهِ وَبَرَكَاتُهُ
            </p>
            <p className="deskripsi">
              Dengan Memohon Rahmat Dan Ridho Allah Subḥānahu Wa Taʿālā, Yang
              Telah Menciptakan Makhluk-Nya Secara Berpasang-Pasangan, Kami
              Bermaksud Menyelenggarakan Pernikahan Kami.
            </p>
          </div>

          <div className="pengantin">
            <Image
              src="/img/prems.png"
              className="rounded-circle "
              layout="responsive"
              width={50}
              height={50}
              alt="Zulfa Syafiyah"
            />
            <p className="nama-pengantin">Zulfa Syafiyah Pratiwi</p>
            <p className="orangtua">
              Putri dari Pak Cartab & Ibu Dewi Komalasari
            </p>
            <a href="https://www.instagram.com/zulfasyapr/" className="sosmed">
              <FiInstagram />
            </a>
          </div>

          <div className="icon-cincin">
            <p className="nama-pasangan">Zulfa 💍 Trias</p>
          </div>

          <div className="pengantin">
            <Image
              src="/img/laks.png"
              className="rounded-circle"
              layout="responsive"
              width={50}
              height={50}
              alt="Trias Zaen Mutaqin"
            />
            <p className="nama-pengantin">Trias Zaen Mutaqin</p>
            <p className="orangtua">Putra dari Pak Asep Sudrajat & Ibu Upi</p>
            <a href="https://www.instagram.com/tzm_1112/" className="sosmed">
              <FiInstagram />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
