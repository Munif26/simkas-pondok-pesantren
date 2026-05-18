import React, { useState } from 'react';
import { useSimkas } from '../context/SimkasContext';
import { Role } from '../types/simkas';
import { Lock, Mail, ArrowRight, Eye, EyeOff } from 'lucide-react'; // Tambah Eye & EyeOff untuk show/hide password

const LOGO_URL = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSM_dQmz81Ux3vIRx_yx_nf8NG6yqVeIyXhbw&s';

export const LoginModal: React.FC = () => {
  // --- STRUKTUR ASLI (DIPERTAHANKAN) ---
  const { isLoginModalOpen, setIsLoginModalOpen, isLoggedIn, login, role } = useSimkas();
  const [selectedRole, setSelectedRole] = useState<Role>(role);
  const [emailInput, setEmailInput] = useState('pengurusppdt@gmail.com');
  const [passwordInput, setPasswordInput] = useState('admin123');

  // --- STATE TAMBAHAN UNTUK UI BARU ---
  const [showPassword, setShowPassword] = useState(false);

  if (!isLoginModalOpen) return null;

  const handleQuickSelect = (r: Role) => {
    setSelectedRole(r);
    if (r === 'admin') {
      setEmailInput('pengurusppdt@gmail.com');
      setPasswordInput('admin123');
    } else if (r === 'santri') {
      setEmailInput('hanif@santri.darutthalibin.id');
      setPasswordInput('santri123');
    } else if (r === 'ortu') {
      setEmailInput('abdullah.wali@gmail.com');
      setPasswordInput('ortu123');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(emailInput, passwordInput); // Memanggil fungsi login bawaan context kamu
  };

  return (
    // Menggunakan background premium terintegrasi dari desain kedua
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-emerald-800/90 via-emerald-900/95 to-teal-950/95 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto animate-fadeIn">
      
      {/* Elemen Dekoratif Lingkungan Background */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-emerald-700/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-teal-700/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-600/10 rounded-full blur-3xl"></div>
      </div>

      {/* Card Login */}
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl max-w-md w-full p-8 relative z-10 border border-white/20 animate-scaleUp">
        
        {/* Tombol Close (✕) Bawaan Asli */}
        {isLoggedIn && (
          <button
            onClick={() => setIsLoginModalOpen(false)}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 bg-gray-100 hover:bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition"
          >
            ✕
          </button>
        )}

        {/* Logo Section yang Elegan */}
        <div className="flex flex-col items-center mb-6">
          <div className="relative mb-3">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-200 p-1 shadow-lg">
              <img
                src={LOGO_URL}
                alt="Logo Darut Thalibin"
                className="w-full h-full rounded-full object-cover"
              />
            </div>
            <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center shadow-md">
              <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Portal SIMKAS</h1>
          <p className="text-xs text-gray-500 mt-1 text-center font-medium px-4">
            Sistem Informasi Manajemen Kegiatan dan Administrasi Santri
          </p>
          <div className="mt-3 flex items-center gap-2 px-3 py-1 bg-emerald-50 border border-emerald-100 rounded-full">
            <p className="text-[10px] text-emerald-700 font-semibold uppercase tracking-wide">
              Ponpes Darut Thalibin · Bangkalan
            </p>
          </div>
        </div>

        {/* Quick Select Role (Diaktifkan Kembali & Didesain Lebih Rapi) */}
        {/* <div className="grid grid-cols-3 gap-2 mb-5">
          <button
            type="button"
            onClick={() => handleQuickSelect('admin')}
            className={`p-2.5 rounded-2xl border text-center transition ${
              selectedRole === 'admin'
                ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold ring-2 ring-emerald-500/10'
                : 'bg-gray-50 border-gray-100 text-gray-600 hover:bg-gray-100 text-xs font-semibold'
            }`}
          >
            <span className="text-lg block mb-0.5">👨‍💼</span>
            <span className="text-[10px] block">Pengurus</span>
          </button>

          <button
            type="button"
            onClick={() => handleQuickSelect('santri')}
            className={`p-2.5 rounded-2xl border text-center transition ${
              selectedRole === 'santri'
                ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold ring-2 ring-emerald-500/10'
                : 'bg-gray-50 border-gray-100 text-gray-600 hover:bg-gray-100 text-xs font-semibold'
            }`}
          >
            <span className="text-lg block mb-0.5">👳‍♂️</span>
            <span className="text-[10px] block">Santri</span>
          </button>

          <button
            type="button"
            onClick={() => handleQuickSelect('ortu')}
            className={`p-2.5 rounded-2xl border text-center transition ${
              selectedRole === 'ortu'
                ? 'bg-emerald-50 border-emerald-500 text-emerald-800 font-bold ring-2 ring-emerald-500/10'
                : 'bg-gray-50 border-gray-100 text-gray-600 hover:bg-gray-100 text-xs font-semibold'
            }`}
          >
            <span className="text-lg block mb-0.5">👥</span>
            <span className="text-[10px] block">Wali Santri</span>
          </button>
        </div> */}

        {/* Form Submit */}
        <form onSubmit={handleLoginSubmit} className="space-y-4">
          
          {/* Input Email */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 pl-0.5">Alamat Email Pengguna</label>
            <div className="relative">
              <Mail className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type="email"
                required
                value={emailInput}
                onChange={(e) => setEmailInput(e.target.value)}
                placeholder="user@pondok.id"
                className="w-full pl-11 pr-4 py-3 bg-gray-50 text-gray-800 border-2 border-gray-100 rounded-xl text-xs font-medium outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
              />
            </div>
          </div>

          {/* Input Password */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1.5 pl-0.5">Kata Sandi (Password)</label>
            <div className="relative">
              <Lock className="absolute left-4 top-3.5 w-4 h-4 text-gray-400" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Masukkan kata sandi"
                className="w-full pl-11 pr-11 py-3 bg-gray-50 text-gray-800 border-2 border-gray-100 rounded-xl text-xs font-medium outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all"
              />
              
              {/* Tombol Show / Hide Password */}
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Tombol Submit Sign-in */}
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2.5 bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-700 hover:to-emerald-800 text-white font-bold py-3.5 px-4 rounded-xl text-xs shadow-lg shadow-emerald-700/20 hover:shadow-xl hover:shadow-emerald-700/25 active:scale-[0.98] transition-all mt-6"
          >
            <span>LOGIN</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Footer dari Desain Kedua (Identitas Tim) */}
        <div className="mt-6 pt-4 border-t border-gray-100 text-center">
          <p className="text-[10px] text-gray-400 font-medium">
            © 2026 SIMKAS · Pondok Pesantren Darut Thalibin
          </p>
          <p className="text-[9px] text-gray-300 mt-0.5">
            Powered by Kelompok 9 RPL B · Prodi TIF · UTM
          </p>
        </div>

      </div>
    </div>
  );
};