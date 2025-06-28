import React, { useEffect, useState } from "react";
import axios from "axios";

const Dashboard = () => {
  const [dataByAlat, setDataByAlat] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://103.193.178.222:3001/api/data");
        // Ambil data terakhir untuk setiap alat
        const grouped = {};
        res.data.forEach((item) => {
          grouped[item.alat] = item; // Menimpa jika ada yang baru, hasilnya hanya 1 per alat
        });
        setDataByAlat(grouped);
      } catch (err) {
        console.error("Gagal fetch data:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, []);

  const alatList = Object.values(dataByAlat);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Dashboard Monitoring</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {alatList.map((item, index) => (
          <div
            key={index}
            className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-xl shadow p-4 text-left"
          >
            <h2 className="font-semibold text-lg mb-2 text-black dark:text-white">
              {item.alat}
            </h2>
            <p className="text-black dark:text-gray-200">Tegangan: {item.tegangan} V</p>
            <p className="text-black dark:text-gray-200">Arus: {item.arus} A</p>
            <p className="text-black dark:text-gray-200">Daya: {item.daya} W</p>
            <p className="text-black dark:text-gray-200">Energi: {item.energi} kWh</p>
            <p className="text-sm text-gray-400 mt-2">{new Date(item.waktu).toLocaleString()}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
