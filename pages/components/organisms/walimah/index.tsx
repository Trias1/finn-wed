import React from "react";
import { FiClock, FiHeart, FiXCircle, FiUsers } from "react-icons/fi";

import Image from "next/image";

const AdabWalimah = () => {
  return (
    <>
      <div className="containers mt-2" id="adab">
        <div className="card-amp">
          <h1 className="title">Adab - Adab Walimah</h1>
          <p>
            Tanpa mengurangi rasa hormat, ada hal-hal dalam adab seorang muslim
            ketika menghadiri walimah yang harus diperhatikan
          </p>
          <div className="adab">
            <Image
              src="/img/adab.png"
              layout="responsive"
              width={10}
              height={10}
              alt="Zulfa & Trias"
            />
          </div>

          <p>
            Atas perhatian dan pengertiannya, kami mengucapkan Jazakumullohu
            Khoyron
          </p>
        </div>
      </div>
    </>
  );
};

export default AdabWalimah;
