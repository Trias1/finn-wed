import * as XLSX from "xlsx";
import TamuService from "../../services/tamu-services";
import toast from "react-hot-toast";

export default function ImportExcel() {
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = async (evt) => {
      const bstr = evt.target?.result;
      const wb = XLSX.read(bstr, { type: "binary" });

      // Ambil sheet pertama
      const wsname = wb.SheetNames[0];
      const ws = wb.Sheets[wsname];

      // Convert ke JSON
      const data: any[] = XLSX.utils.sheet_to_json(ws);

      // Loop simpan ke Firestore
      for (let row of data) {
        const { nama, kategori, statusUndangan } = row;

        // validasi basic
        if (!nama || !kategori || !statusUndangan) {
          toast.error(`Data tidak valid: ${JSON.stringify(row)}`);
          continue;
        }

        try {
          await TamuService.addTamu({
            nama,
            kategori,
            statusUndangan,
          });
        } catch (err) {
          console.error("Gagal import:", err);
        }
      }

      toast.success("Import selesai 🎉");
    };
    reader.readAsBinaryString(file);
  };

  return (
    <div className="p-4 border rounded">
      <h2 className="text-lg text-gray-700 font-bold mb-2">📥 Import Excel Tamu</h2>
      <input
        type="file"
        accept=".xlsx, .xls, .csv"
        onChange={handleFileUpload}
        className="border p-2"
      />
    </div>
  );
}
