import { saveAs } from "file-saver";
import { Document, Packer, Paragraph, TextRun } from "docx";

type Guest = {
  id?: string;
  name: string;
  description?: string;
};

export const exportAllUndanganToWord = async (
  guests: Guest[],
  generateTeks: (name: string) => string
) => {
  const paragraphs: Paragraph[] = [];

  guests.forEach((guest, idx) => {
    const teks = generateTeks(guest.name || "Tamu");
    const lines = teks.split("\n");

    lines.forEach((line) => {
      paragraphs.push(new Paragraph({ children: [new TextRun(line)] }));
    });

    if (idx !== guests.length - 1) {
      paragraphs.push(new Paragraph({})); // spasi antar undangan
      paragraphs.push(new Paragraph({}));
    }
  });

  const doc = new Document({
    sections: [
      {
        properties: {},
        children: paragraphs,
      },
    ],
  });

  const blob = await Packer.toBlob(doc);
  saveAs(blob, `Undangan-Tamu-${Date.now()}.docx`);
};
