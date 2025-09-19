import React from "react";
import { BsClock } from "react-icons/bs";
import { GoLocation } from "react-icons/go";

export default function WeedingLocation() {
  return (
    <div id="weddingDate">
      <div className="containers mt-4">
        <div className="card">
          <h2 className="section-titles">Save The Date</h2>

          <div className="card-body">
            <p className="card-subtitle">
              Insya Allah akan diselenggarakan pada:
            </p>

            <div className="save-the-date">
              <span className="day">Ahad</span>
              <div className="date-container">
                <span className="date">28</span>
                <hr className="date-line" />
              </div>
              <span className="month">September</span>
              <span className="year">2025</span>
            </div>

            {/* ✅ Hanya card-wed yang dibungkus oleh card-duo */}
            <div className="card-duo">
              <div className="card-wed">
                <h3 className="card-title">Akad Nikah</h3>
                <div className="event-detail">
                  <BsClock className="icon" />
                  <h4>08.00 - 10.00 WIB</h4>
                </div>
              </div>

              <div className="card-wed">
                <h3 className="card-title">Walimah</h3>
                <div className="event-detail">
                  <BsClock className="icon" />
                  <h4>11.00 - 14.00 WIB</h4>
                </div>
              </div>
            </div>

            <div className="event-detail">
              <GoLocation className="icon" />
              <h4>Graha Umbaran</h4>
              <h4>
                Jl. Pangeran Cakrabuana No.102, Sendang, Kec. Sumber, Kabupaten
                Cirebon, Jawa Barat 45611
              </h4>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
