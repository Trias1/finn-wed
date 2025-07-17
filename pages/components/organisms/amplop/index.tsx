import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Script from "next/script";

export default function Amplop() {
  const modalRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef<number>(0); // simpan posisi scroll

  const openModal = () => {
    if (typeof window !== "undefined") {
      scrollYRef.current = window.scrollY;
    }

    if (window.bootstrap && modalRef.current) {
      const modal = new window.bootstrap.Modal(modalRef.current, {
        focus: false,
      });
      modal.show();
    }
  };

  useEffect(() => {
    const modalEl = modalRef.current;
    if (!modalEl) return;

    const handleHidden = () => {
      window.scrollTo({
        top: scrollYRef.current,
        behavior: "smooth", // atau "smooth" kalau mau animasi
      });
    };

    modalEl.addEventListener("hidden.bs.modal", handleHidden);
    return () => {
      modalEl.removeEventListener("hidden.bs.modal", handleHidden);
    };
  }, []);

  const amplop = [
    {
      image: "/img/qris.png",
      alt: "QRIS Pembayaran",
      rekening: "7275226858",
      bank: "BCA",
      atasNama: "Trias Zaen Mutaqin",
    },
    {
      image: "/img/qris.png",
      alt: "QRIS Pembayaran",
      rekening: "9876543210",
      bank: "Mandiri",
      atasNama: "Trias & Zulfa",
    },
    {
      image: "/img/qris.png",
      alt: "QRIS Pembayaran",
      rekening: "1122334455",
      bank: "BRI",
      atasNama: "Trias & Zulfa",
    },
  ];

  return (
    <section id="amplop">
      <div className="containers mt-4">
        <div className="card-amp">
          <div className="text-undangan">
            <p className="deskripsi">
              Merupakan kehormatan & kebahagiaan bagi kami apabila
              Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa restu
              kepada kedua mempelai. Atas kehadiran dan do’a restunya kami
              sampaikan banyak terima kasih.
            </p>
            <p className="kami-yang-berbahagia">Kami yang berbahagia</p>
          </div>

          <div className="psgns">
            <div className="img-wrapper">
              <Image
                src="/img/bck.png"
                width={300}
                height={300}
                alt="Trias & Zulfa"
                className="img-rounded"
              />
            </div>
          </div>

          <div className="nama-pasangan">
            <p>trias & zulfa</p>
          </div>

          <div className="keluarga-container">
            <div className="keluarga">
              <h3>Keluarga Besar Pria</h3>
              <p>Pak Asep Sudrajat & Ibu Upi</p>
              <p>Keluarga Besar Pak Sudrajat</p>
            </div>

            <div className="keluarga">
              <h3>Keluarga Besar Wanita</h3>
              <p>Pak Cartab & Ibu Dewi Komalasari</p>
              <p>Keluarga Besar Pak Cartab</p>
            </div>
          </div>

          <div className="btn-container">
            <button className="btn-kirim" onClick={openModal}>
              Kirim Hadiah
            </button>
          </div>
        </div>
      </div>

      {/* Modal Kirim Hadiah */}
      <div
        className="modal fade"
        id="modalAmplop"
        tabIndex={-1}
        aria-labelledby="modalAmplopLabel"
        aria-hidden="true"
        ref={modalRef}
      >
        <div className="modal-dialog modal-dialog-centered modal-amplop-custom">
          <div className="modal-content text-center">
            <div className="modal-header">
              <h5 className="modal-title w-100" id="modalAmplopLabel">
                Kirim Hadiah
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body amplop-grid">
              {amplop.map((item, index) => (
                <div key={index} className="amplop-container">
                  <Image
                    src={item.image}
                    alt={item.alt}
                    width={200}
                    height={200}
                  />
                  <p className="mt-3 mb-0 fw-bold">Rekening {item.bank}</p>
                  <p>
                    {item.rekening}
                  </p>
                  <p> {item.atasNama}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bootstrap Script */}
      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.0-beta1/dist/js/bootstrap.bundle.min.js"
        strategy="beforeInteractive"
      />
    </section>
  );
}
