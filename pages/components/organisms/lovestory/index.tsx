import { FaHeart } from "react-icons/fa";

const LoveStory = () => {
  const moments = [
    {
      year: "2022",
      title: "Pertama Bertemu",
      description:
        "Kami pertama kali bertemu setelah lebaran dan langsung merasa ada kecocokan.",
    },
    {
      year: "2022",
      title: "Mulai Komitmen",
      description:
        "Setelah mengenal lebih dalam, kami memutuskan untuk menjalani hubungan bersama.",
    },
    {
      year: "2024",
      title: "Lamaran",
      description:
        "Dengan restu keluarga, kami melangsungkan acara lamaran yang penuh kebahagiaan.",
    },
    {
      year: "2025",
      title: "Menuju Pernikahan",
      description:
        "Saat ini kami sedang menyiapkan hari istimewa kami untuk mengikat janji suci.",
    },
  ];

  return (
      <div className="containers" id="lovestory">
        <div className="calon-cardss">
          <div className="love-story-container">
            <h1 className="section-title">Love Story</h1>
            <div className="timeline">
              {moments.map((moment, index) => (
                <div className="timeline-item" key={index}>
                  <div className="timeline-content">
                    <h3 className="moment-title">
                      {moment.year} - {moment.title}
                    </h3>
                    <p className="moment-description">{moment.description}</p>
                  </div>
                  <div className="timeline-icon">
                    <FaHeart />
                  </div>
                </div>
              ))}
            </div>
          </div>
      </div>
    </div>
  );
};

export default LoveStory;
