import React, { useEffect, useRef } from "react";
import Image from "next/image";
import Script from "next/script";
import toast from "react-hot-toast";

export default function Amplop() {
  const modalRef = useRef<HTMLDivElement>(null);
  const scrollYRef = useRef<number>(0);

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
        behavior: "smooth",
      });
    };

    modalEl.addEventListener("hidden.bs.modal", handleHidden);
    return () => {
      modalEl.removeEventListener("hidden.bs.modal", handleHidden);
    };
  }, []);

  const copyRekening = (rekening: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(rekening).then(
        () => toast.success("Nomor rekening berhasil disalin!"),
        () => toast.error("Gagal menyalin, coba manual.")
      );
    }
  };

  const amplop = [
    {
      qris: "",
      bankLogo: "/img/blue-bca.png",
      rekening: "006454754307",
      atasNama: "Zulfa Syafiyah Pratiwi",
    },
    {
      qris: "",
      bankLogo: "/img/bca.png",
      rekening: "7275226858",
      atasNama: "Trias Zaen Mutaqin",
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
                alt="Zulfa & Trias"
                className="img-rounded"
              />
            </div>
          </div>

          <div className="nama-pasangan">
            <p>Zulfa & Trias</p>
          </div>

          <div className="keluarga-container">
            <div className="keluarga">
              <h3>Keluarga Besar Wanita</h3>
              <p>Pak Cartab & Ibu Dewi Komalasari</p>
              <p>Keluarga Besar Pak Cartab</p>
            </div>
            <div className="keluarga">
              <h3>Keluarga Besar Pria</h3>
              <p>Pak Asep Sudrajat & Ibu Upi</p>
              <p>Keluarga Besar Pak Sudrajat</p>
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
                <div key={index} className="rekening-block">
                  {item.qris && (
                    <Image
                      src={item.qris}
                      alt="QRIS"
                      width={160}
                      height={160}
                      className="qr-code"
                    />
                  )}
                  <Image
                    src={item.bankLogo}
                    alt="Bank Logo"
                    width={120}
                    height={50}
                    className="bank-logo"
                  />
                  <p className="rekening">{item.rekening}</p>
                  <p className="atas-nama">{item.atasNama}</p>
                  <button
                    className="btn-copy"
                    onClick={() => copyRekening(item.rekening)}
                  >
                    Copy
                  </button>
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
