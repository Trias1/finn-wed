"use client";
import React, { useState, useEffect } from "react";

export default function MainBanner() {
  const [isExpired, setIsExpired] = useState(false);
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const countDownDate = new Date("September 28, 2025 11:00:00").getTime();

    const x = setInterval(() => {
      const now = new Date().getTime();
      const distance = countDownDate - now;

      if (distance < 0) {
        clearInterval(x);
        setIsExpired(true); // 👉 kalau sudah lewat, tandai expired
        return;
      }

      setDays(Math.floor(distance / (1000 * 60 * 60 * 24)));
      setHours(
        Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      );
      setMinutes(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      setSeconds(Math.floor((distance % (1000 * 60)) / 1000));
    }, 1000);

    return () => clearInterval(x);
  }, []);

  return (
    <div className="containers" id="mainbanner">
      <div className="main-banner">
        <div className="card-main">
          <img
            src="/img/bck.png"
            alt="Wedding Image"
            className="banner-image"
          />
          <h3 className="pre-title">The Wedding of</h3>
          <h1 className="titles">Zulfa & Trias</h1>
          <h4 className="text-invite">
            We invite you to celebrate our wedding
            <br />
            <span className="mt-1">Ahad, 28 September 2025</span>
          </h4>

          <div className="heading">
            <h3 className="titles mt-1">Jangan Lupa!</h3>
          </div>

          <div className="remaining-time mt-4">
            {isExpired ? (
              <div className="text-center font-semibold text-green-600 mt-4">
                <p className="text-base sm:text-lg md:text-xl leading-relaxed">
                  🎉 Alhamdulillah, hari yang ditunggu telah tiba!
                </p>
                <p className="text-base sm:text-lg md:text-xl leading-relaxed">
                  Mohon doa & restunya 🙏
                </p>
              </div>
            ) : (
              <div id="clock" className="flex gap-6 justify-center">
                <div className="time-secs">
                  <span className="time-number">{days}</span>
                  <div>Days</div>
                </div>
                <div className="time-secs">
                  <span className="time-number">{hours}</span>
                  <div>Hours</div>
                </div>
                <div className="time-secs">
                  <span className="time-number">{minutes}</span>
                  <div>Minutes</div>
                </div>
                <div className="time-secs">
                  <span className="time-number">{seconds}</span>
                  <div>Seconds</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
