import React, { useState } from "react";
import axios from "axios";

const Search = () => {
  const [alat, setAlat] = useState("");
  const [tanggalAwal, setTanggalAwal] = useState("");
  const [tanggalAkhir, setTanggalAkhir] = useState("");
  const [hasil, setHasil] = useState([]);

  const handleSearch = async () => {
    try {
      const params = new URLSearchParams();
      if (alat) params.append("alat", alat);
      if (tanggalAwal) params.append("tanggal_awal", tanggalAwal);
      if (tanggalAkhir) params.append("tanggal_akhir", tanggalAkhir);

      const res = await axios.get(`http://103.193.178.222:3001/api/search?${params.toString()}`);
      setHasil(res.data);
    } catch (err) {
      console.error("Gagal fetch data pencarian:", err);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4 text-center">Pencarian Data</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div>
          <label>Jenis Alat:</label>
          <select className="w-full p-2 border rounded" value={alat} onChange={(e) => setAlat(e.target.value)}>
            <option value="">Semua</option>
            <option value="Lampu">Lampu</option>
            <option value="Kipas Angin">Kipas Angin</option>
            <option value="TV">TV</option>
          </select>
        </div>
        <div>
          <label>Tanggal Awal:</label>
          <input type="date" className="w-full p-2 border rounded" value={tanggalAwal} onChange={(e) => setTanggalAwal(e.target.value)} />
        </div>
        <div>
          <label>Tanggal Akhir:</label>
          <input type="date" className="w-full p-2 border rounded" value={tanggalAkhir} onChange={(e) => setTanggalAkhir(e.target.value)} />
        </div>
      </div>

      <button onClick={handleSearch} className="bg-blue-600 text-white px-4 py-2 rounded mb-6 hover:bg-blue-700">Cari Data</button>

      {hasil.length > 0 && (
        <table className="w-full border border-collapse text-sm">
          <thead>
            <tr className="bg-gray-200 dark:bg-gray-700 text-center">
              <th className="border p-2">Alat</th>
              <th className="border p-2">Waktu</th>
              <th className="border p-2">Tegangan</th>
              <th className="border p-2">Arus</th>
              <th className="border p-2">Daya</th>
              <th className="border p-2">Energi</th>
            </tr>
          </thead>
          <tbody>
            {hasil.map((item, i) => (
              <tr key={i} className="border text-left">
                <td className="border p-2">{item.alat}</td>
                <td className="border p-2">{item.waktu}</td>
                <td className="border p-2">{item.tegangan}</td>
                <td className="border p-2">{item.arus}</td>
                <td className="border p-2">{item.daya}</td>
                <td className="border p-2">{item.energi}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Search;
