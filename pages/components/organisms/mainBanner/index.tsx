import React, { useState, useEffect } from "react";

export default function mainBanner() {
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

      const day = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hour = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minute = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const second = Math.floor((distance % (1000 * 60)) / 1000);

      setDays(day);
      setHours(hour);
      setMinutes(minute);
      setSeconds(second);

      if (distance < 0) {
        clearInterval(x);
        setIsExpired(true);
      }
    }, 1000);

    return () => {
      clearInterval(x);
    };
  }, [days, hours, minutes, seconds]);

  return (
    <div className="containers" id="mainbanner">
      <div className="main-banner-container">
        <div className="main-banner">
          <div className="display-table center-text">
            <div className="display-table-cell">
              <div className="card-main">
                <div className="slider-content">
                  <img
                    src="/img/bck.png"
                    alt="Wedding Image"
                    className="banner-image"
                  />
                  <h3 className="pre-title ">The Wedding of</h3>
                  <h1 className="titles">Trias & Zulfa</h1>
                  <h4 className="text-invite ">
                    We invite you to celebrate our wedding
                    <br />
                    <span className="mt-1">Sabtu, 28 September 2025</span>
                  </h4>
                  <div className="col-sm-12">
                    <div className="heading">
                      <h3 className="titles mt-1">Jangan Lupa!</h3>
                    </div>
                  </div>
                  <div className="col-12">
                    <div className="remaining-time">
                      {isExpired ? (
                        <div> Yay... The day has arrived!</div>
                      ) : (
                        <div id="clock">
                          <div className="time-secs d-inline-block">
                            {" "}
                            Days
                            <span className="title">{days}</span>
                          </div>
                          <div className="time-secs d-inline-block">
                            {" "}
                            Hours
                            <span className="title">{hours}</span>
                          </div>
                          <div className="time-secs d-inline-block">
                            {" "}
                            Minutes
                            <span className="title">{minutes}</span>
                          </div>
                          <div className="time-secs d-inline-block">
                            {" "}
                            Seconds
                            <span className="title">{seconds}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
