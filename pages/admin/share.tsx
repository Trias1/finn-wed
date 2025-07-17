import { useState } from "react";
import undanganData from "../undangan.json";
import { exportAllUndanganToWord } from "../../utils/exportWord"; // langsung import fungsinya

export default function ShareUndangan() {
  const [selectedId, setSelectedId] = useState("");
  const [output, setOutput] = useState("");

  const generateTeks = (name: string) => {
    const link = `https://trias-zulfa-wedding.vercel.app/trias-zulfa/undangan/${name
      .toLowerCase()
      .replace(/\s+/g, "-")}`;

    return `Kepada Yth. Bapak/Ibu/Saudara/i ${name}
Di Tempat

Bismillahirrahmanirrahim

UNDANGAN WALIMATUL 'URS

Assalamualaikum Warahmatullah Wabarakatuh

Segala puji hanya bagi Allah yang Maha Pengasih lagi Maha Penyayang, Shalawat dan salam kami ucapkan kepada Nabi Muhammad صلى الله عليه وسلم, keluarga beliau, para sahabat dan seluruh kaum muslimin, yang berpegang teguh di atas sunnahnya.

Dengan hormat, kami mengundang Bapak/Ibu/Saudara/i sekalian yang dirahmati Allah untuk menghadiri acara pernikahan kami:

📎 Berikut link undangan kami:
${link}

Merupakan suatu kebahagiaan bagi kami apabila Bapak/Ibu/Saudara/i berkenan hadir untuk memberikan doa dan restu kepada kedua mempelai.

🤲🏻 Doa keberkahan bagi pengantin pria dan wanita:

بَارَكَ اللهُ لَكَ وَبَارَكَ عَلَيْكَ وَجَمَعَ بَيْنَكُمَا فِي خَيْرٍ

“Semoga Allah memberkahimu di waktu bahagia dan memberkahimu di waktu susah, serta semoga Allah mempersatukan kalian berdua dalam kebaikan.” (HR. Abu Dawud no. 2130)

Jazakumullahu khairan katsiran

Wassalamualaikum Warahmatullahi Wabarakaatuh`;
  };

  const handleGenerate = () => {
    const data = undanganData.find((item) => item.id === selectedId);
    if (!data) return;

    const teks = generateTeks(data.name);
    setOutput(teks);
  };

  const handleExport = () => {
    exportAllUndanganToWord(undanganData, generateTeks);
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Bagikan Undangan</h1>

      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        style={{ margin: "1rem 0", padding: "0.5rem" }}
      >
        <option value="">-- Pilih Tamu --</option>
        {undanganData.map((guest) => (
          <option key={guest.id} value={guest.id}>
            {guest.name}
          </option>
        ))}
      </select>

      <br />
      <button onClick={handleGenerate} style={{ padding: "0.5rem 1rem", marginRight: "1rem" }}>
        Generate Teks
      </button>

      <button onClick={handleExport} style={{ padding: "0.5rem 1rem" }}>
        Export Semua ke Word
      </button>

      {output && (
        <textarea
          value={output}
          rows={20}
          style={{ width: "100%", marginTop: "1rem" }}
          readOnly
        />
      )}
    </div>
  );
}
