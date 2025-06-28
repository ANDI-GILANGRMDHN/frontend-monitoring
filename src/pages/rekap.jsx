import React, { useEffect, useState } from "react";
import axios from "axios";

const Rekap = () => {
  const [tab, setTab] = useState("harian");
  const [data, setData] = useState([]);
  const [terboros, setTerboros] = useState(null);
  const [alatBoros, setAlatBoros] = useState(null);

  useEffect(() => {
  // Ambil data rekap utama
  const fetchRekap = async () => {
    try {
      const res = await axios.get(`http://cors-anywhere.herokuapp.com/http://103.193.178.222:3001/api/rekap/${tab}`);
      setData(res.data);
    } catch (err) {
      console.error("Gagal ambil data rekap:", err);
    }
  };

  // Ambil data alat paling boros berdasarkan tab
  const fetchAlatBoros = async () => {
    try {
      const res = await axios.get(`http://cors-anywhere.herokuapp.com/http://103.193.178.222:3001/api/terboros/${tab}`);
      setAlatBoros(res.data);
    } catch (err) {
      console.error("Gagal ambil data alat boros:", err);
    }
  };

  fetchRekap();
  fetchAlatBoros();
}, [tab]);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Rekap Penggunaan Energi</h1>

      <div className="mb-4 flex gap-4">
        <button onClick={() => setTab("harian")} className={tab === "harian" ? "font-bold" : ""}>Harian</button>
        <button onClick={() => setTab("mingguan")} className={tab === "mingguan" ? "font-bold" : ""}>Mingguan</button>
        <button onClick={() => setTab("bulanan")} className={tab === "bulanan" ? "font-bold" : ""}>Bulanan</button>
      </div>
{alatBoros && (
  <div className="mb-6 p-4 bg-yellow-100 dark:bg-yellow-900 rounded-lg">
    <p className="text-lg font-semibold text-yellow-800 dark:text-yellow-200">
      🔋 Alat Paling Boros ({tab}): <span className="font-bold">{alatBoros.alat}</span> 
      — {alatBoros.total_energi.toFixed(2)} kWh
    </p>
  </div>
)}
      <table className="w-full border border-gray-300 dark:border-gray-600 border-collapse">
  <thead>
    <tr className="bg-gray-200 dark:bg-gray-700 text-center text-sm font-semibold">
      <th className="border border-gray-300 dark:border-gray-600 p-2">Alat</th>
      <th className="border border-gray-300 dark:border-gray-600 p-2">
        {tab === "harian" ? "Tanggal" : tab === "mingguan" ? "Minggu" : "Bulan"}
      </th>
      <th className="border border-gray-300 dark:border-gray-600 p-2">Energi (kWh)</th>
      <th className="border border-gray-300 dark:border-gray-600 p-2">Daya (W)</th>
      <th className="border border-gray-300 dark:border-gray-600 p-2">Biaya Listrik (Rp)</th>
    </tr>
  </thead>
  <tbody>
    {data.map((item, idx) => (
      <tr key={idx} className="text-left text-sm">
        <td className="border border-gray-300 dark:border-gray-600 p-2">{item.alat}</td>
        <td className="border border-gray-300 dark:border-gray-600 p-2">
          {tab === "harian" && item.tanggal}
          {tab === "mingguan" && `Minggu ${item.minggu}, ${item.tahun}`}
          {tab === "bulanan" && `Bulan ${item.bulan}, ${item.tahun}`}
        </td>
        <td className="border border-gray-300 dark:border-gray-600 p-2">{item.total_energi?.toFixed(2)}</td>
        <td className="border border-gray-300 dark:border-gray-600 p-2">{item.total_daya?.toFixed(2)}</td>
        <td className="border border-gray-300 dark:border-gray-600 p-2">
          Rp {item.total_biaya ? item.total_biaya.toLocaleString() : "-"}
        </td>
      </tr>
    ))}
  </tbody>
</table>
    </div>
  );
};

export default Rekap;
