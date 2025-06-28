// File: src/App.jsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Dashboard from './pages/Dashboard';
import Rekap from './pages/rekap';
import Search from './pages/search';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="flex min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-white">
        <Router>
          <aside className="w-64 bg-white dark:bg-gray-800 p-4 border-r border-gray-200 dark:border-gray-700">
            <h2 className="text-xl font-bold mb-6">Smart Power Monitor</h2>
            <nav className="flex flex-col gap-4">
              <Link to="/" className="hover:underline">Dasbor</Link>
              <Link to="/rekap" className="hover:underline">Rekap</Link>
              <Link to="/search" className="hover:underline">Pencarian Data</Link>
              <div className="mt-4">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={darkMode} onChange={() => setDarkMode(!darkMode)} />
                  Dark Mode
                </label>
              </div>
            </nav>
          </aside>
          <main className="flex-1 p-6 overflow-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/rekap" element={<Rekap />} />
              <Route path="/search" element={<Search />} />
            </Routes>
          </main>
        </Router>
      </div>
    </div>
  );
}

export default App;

// Catatan:
// - Buat folder `src/pages` dan tambahkan file `Dashboard.jsx`, `Rekap.jsx`, dan `Search.jsx`
// - Gunakan tailwind.config untuk aktifkan dark mode
// - Tambahkan grafik dan data sesuai struktur yang kamu sebut di halaman masing-masing
