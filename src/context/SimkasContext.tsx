import React, { createContext, useContext, useState, useEffect } from 'react';
import { Role, User, Santri, Kegiatan, AbsensiRecord, Perizinan, Keuangan, Notifikasi } from '../types/simkas';
import { INITIAL_SANTRI, INITIAL_KEGIATAN, INITIAL_ABSENSI, INITIAL_PERIZINAN, INITIAL_KEUANGAN } from '../data/initialData';

interface Toast {
  id: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
}

interface SimkasContextType {
  role: Role;
  currentUser: User;
  santris: Santri[];
  kegiatans: Kegiatan[];
  absensis: AbsensiRecord[];
  perizinans: Perizinan[];
  keuangans: Keuangan[];
  notifikasis: Notifikasi[];
  toasts: Toast[];
  currentView: string;
  isDbModalOpen: boolean;
  isLoginModalOpen: boolean;
  isLoggedIn: boolean;
  setRole: (role: Role) => void;
  setCurrentView: (view: string) => void;
  setIsDbModalOpen: (open: boolean) => void;
  setIsLoginModalOpen: (open: boolean) => void;
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  showToast: (message: string, type?: 'info' | 'success' | 'warning' | 'error') => void;
  
  // CRUD Santri
  addSantri: (santri: Omit<Santri, 'id'>) => void;
  updateSantri: (id: string, santri: Partial<Santri>) => void;
  deleteSantri: (id: string) => void;
  
  // Absensi
  addAbsensi: (record: Omit<AbsensiRecord, 'id' | 'timestamp'>) => void;
  quickScanRFID: (santriNis: string, kegiatanId: string) => boolean;
  
  // Perizinan
  submitIzin: (izin: Omit<Perizinan, 'id' | 'status' | 'tglPengajuan'>) => void;
  verifyIzin: (id: string, approve: boolean, catatan?: string) => void;
  
  // Keuangan
  submitPembayaran: (pembayaran: Omit<Keuangan, 'id' | 'status'>) => void;
  verifyPembayaran: (id: string, valid: boolean, catatan?: string) => void;
  
  // Notifikasi
  markAllNotifRead: () => void;
  
  // DB & Demo Utilities
  resetDatabase: () => void;
  importDatabaseJson: (jsonString: string) => boolean;
  exportDatabaseJson: () => string;
  getMysqlSchemaSql: () => string;
}

const USERS: Record<Role, User> = {
  admin: {
    id: 'u-admin',
    name: 'Pengurus PPDT 2026',
    email: 'pengurusppdt@gmail.com',
    role: 'admin',
    avatar: 'https://i.pinimg.com/736x/1f/60/b4/1f60b490dd5d034edf6333335ba1dabd.jpg',
  },
  santri: {
    id: 's1',
    name: 'Muhammad Hanif',
    email: 'muhammadhanif@gmail.com',
    role: 'santri',
    avatar: 'https://i.pinimg.com/736x/3d/4b/cf/3d4bcf41b78a7dda73b34b8dceac9cb7.jpg',
    nis: '230411100177',
    kamar: 'A-01',
    angkatan: 2023,
    noHp: '081234567890',
    waliName: 'Bpk. Abdullah',
    waliHp: '082133445566'
  },
  ortu: {
    id: 'u-ortu',
    name: 'Bpk. Abdullah (Wali Santri Hanif)',
    email: 'abdullahwali@gmail.com',
    role: 'ortu',
    avatar: 'https://static.vecteezy.com/system/resources/previews/062/818/892/non_2x/cartoon-portrait-of-elderly-muslim-man-with-white-cap-and-beard-illustration-vector.jpg',
  }
};

const SimkasContext = createContext<SimkasContextType | undefined>(undefined);

export const SimkasProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(() => {
    const saved = localStorage.getItem('simkas_is_logged_in');
    return saved ? saved === 'true' : false;
  });

  const [role, setRoleState] = useState<Role>(() => {
    const saved = localStorage.getItem('simkas_role');
    return (saved as Role) || 'admin';
  });

  const [currentView, setCurrentView] = useState<string>('dashboard');
  const [isDbModalOpen, setIsDbModalOpen] = useState<boolean>(false);
  
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(() => {
    const saved = localStorage.getItem('simkas_is_logged_in');
    return !saved || saved !== 'true';
  });
  
  const [santris, setSantris] = useState<Santri[]>(() => {
    const saved = localStorage.getItem('simkas_santris');
    return saved ? JSON.parse(saved) : INITIAL_SANTRI;
  });

  const [kegiatans, setKegiatans] = useState<Kegiatan[]>(() => {
    const saved = localStorage.getItem('simkas_kegiatans');
    return saved ? JSON.parse(saved) : INITIAL_KEGIATAN;
  });

  const [absensis, setAbsensis] = useState<AbsensiRecord[]>(() => {
    const saved = localStorage.getItem('simkas_absensis');
    return saved ? JSON.parse(saved) : INITIAL_ABSENSI;
  });

  const [perizinans, setPerizinans] = useState<Perizinan[]>(() => {
    const saved = localStorage.getItem('simkas_perizinans');
    return saved ? JSON.parse(saved) : INITIAL_PERIZINAN;
  });

  const [keuangans, setKeuangans] = useState<Keuangan[]>(() => {
    const saved = localStorage.getItem('simkas_keuangans');
    return saved ? JSON.parse(saved) : INITIAL_KEUANGAN;
  });

  const [notifikasis, setNotifikasis] = useState<Notifikasi[]>([
    {
      id: 'n1',
      title: 'Sistem Diperbarui',
      message: 'SIMKAS versi 2.0 berhasil diluncurkan.',
      type: 'info',
      timestamp: 'Baru saja',
      read: false
    },
    {
      id: 'n2',
      title: 'Tagihan Baru Terbit',
      message: 'Tagihan SPP dan Uang Makan bulan Mei 2026 telah diterbitkan.',
      type: 'warning',
      timestamp: '2 jam lalu',
      read: false
    }
  ]);

  const [toasts, setToasts] = useState<Toast[]>([]);

  useEffect(() => {
    localStorage.setItem('simkas_santris', JSON.stringify(santris));
  }, [santris]);

  useEffect(() => {
    localStorage.setItem('simkas_kegiatans', JSON.stringify(kegiatans));
  }, [kegiatans]);

  useEffect(() => {
    localStorage.setItem('simkas_absensis', JSON.stringify(absensis));
  }, [absensis]);

  useEffect(() => {
    localStorage.setItem('simkas_perizinans', JSON.stringify(perizinans));
  }, [perizinans]);

  useEffect(() => {
    localStorage.setItem('simkas_keuangans', JSON.stringify(keuangans));
  }, [keuangans]);

  const showToast = (message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info') => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3500);
  };

  const setRole = (newRole: Role) => {
    setRoleState(newRole);
    localStorage.setItem('simkas_role', newRole);
    const roleNames: Record<Role, string> = {
      admin: 'Pengurus / Dosen',
      santri: 'Santri (M. Hanif)',
      ortu: 'Wali Santri (Bpk. Abdullah)'
    };
    showToast(`Beralih peran ke: ${roleNames[newRole]}`, 'success');
  };

  const login = (email: string, pass: string): boolean => {
    const trimEmail = email.trim().toLowerCase();
    
    if (trimEmail === 'pengurusppdt@gmail.com' && pass === 'admin123') {
      setRoleState('admin');
      setIsLoggedIn(true);
      setIsLoginModalOpen(false);
      localStorage.setItem('simkas_is_logged_in', 'true');
      localStorage.setItem('simkas_role', 'admin');
      showToast('Berhasil login sebagai Pengurus / Dosen (Admin) ✅', 'success');
      return true;
    }
    if (trimEmail === 'muhammadhanif@gmail.com' && pass === 'santri123') {
      setRoleState('santri');
      setIsLoggedIn(true);
      setIsLoginModalOpen(false);
      localStorage.setItem('simkas_is_logged_in', 'true');
      localStorage.setItem('simkas_role', 'santri');
      showToast('Berhasil login sebagai Santri (M. Hanif) ✅', 'success');
      return true;
    }
    if (trimEmail === 'abdullahwali@gmail.com' && pass === 'ortu123') {
      setRoleState('ortu');
      setIsLoggedIn(true);
      setIsLoginModalOpen(false);
      localStorage.setItem('simkas_is_logged_in', 'true');
      localStorage.setItem('simkas_role', 'ortu');
      showToast('Berhasil login sebagai Wali Santri (Bpk. Abdullah) ✅', 'success');
      return true;
    }

    showToast('❌ Login Gagal: Alamat email atau kata sandi tidak sesuai!', 'error');
    return false;
  };

  const logout = () => {
    setIsLoggedIn(false);
    setIsLoginModalOpen(true);
    localStorage.setItem('simkas_is_logged_in', 'false');
    showToast('Anda telah keluar dari aplikasi. Silakan login kembali.', 'warning');
  };

  const currentUser = USERS[role];

  // CRUD Santri
  const addSantri = (newSantriData: Omit<Santri, 'id'>) => {
    const id = `s-${Date.now()}`;
    const newSantri: Santri = { id, ...newSantriData };
    setSantris(prev => [newSantri, ...prev]);
    showToast(`Berhasil menambahkan santri ${newSantri.name}`, 'success');
  };

  const updateSantri = (id: string, data: Partial<Santri>) => {
    setSantris(prev => prev.map(s => s.id === id ? { ...s, ...data } : s));
    showToast('Data santri berhasil diperbarui', 'success');
  };

  const deleteSantri = (id: string) => {
    const target = santris.find(s => s.id === id);
    setSantris(prev => prev.filter(s => s.id !== id));
    showToast(`Santri ${target?.name || ''} telah dihapus dari sistem`, 'warning');
  };

  // Absensi
  const addAbsensi = (record: Omit<AbsensiRecord, 'id' | 'timestamp'>) => {
    const id = `ab-${Date.now()}`;
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);
    setAbsensis(prev => [{ id, timestamp, ...record }, ...prev]);
    showToast(`Absensi ${record.santriNama} (${record.status.toUpperCase()}) disimpan`, 'success');
  };

  const quickScanRFID = (santriNis: string, kegiatanId: string): boolean => {
    const targetSantri = santris.find(s => s.nis === santriNis || s.name.toLowerCase().includes(santriNis.toLowerCase()));
    if (!targetSantri) {
      showToast('Santri tidak ditemukan! Periksa NIS atau Nama.', 'error');
      return false;
    }
    const targetKegiatan = kegiatans.find(k => k.id === kegiatanId);
    if (!targetKegiatan) {
      showToast('Kegiatan tidak valid', 'error');
      return false;
    }

    const todayStr = new Date().toISOString().substring(0, 10);
    // Check if already present
    const exists = absensis.find(a => a.santriId === targetSantri.id && a.kegiatanId === kegiatanId && a.tanggal === todayStr);
    if (exists) {
      showToast(`${targetSantri.name} sudah tercatat hadir pada kegiatan ini hari ini!`, 'warning');
      return false;
    }

    addAbsensi({
      kegiatanId,
      kegiatanNama: targetKegiatan.nama,
      tanggal: todayStr,
      santriId: targetSantri.id,
      santriNama: targetSantri.name,
      status: 'hadir',
      dicatatOleh: 'RFID Scanner / QR Code',
    });
    
    // Add notif
    setNotifikasis(prev => [{
      id: `n-${Date.now()}`,
      title: 'Scan Absensi Berhasil',
      message: `${targetSantri.name} hadir pada ${targetKegiatan.nama}.`,
      type: 'success',
      timestamp: 'Baru saja',
      read: false
    }, ...prev]);

    return true;
  };

  // Perizinan
  const submitIzin = (izinData: Omit<Perizinan, 'id' | 'status' | 'tglPengajuan'>) => {
    const id = `iz-${Date.now()}`;
    const tglPengajuan = new Date().toISOString().replace('T', ' ').substring(0, 19);
    const newIzin: Perizinan = {
      id,
      ...izinData,
      status: 'pending',
      tglPengajuan
    };
    setPerizinans(prev => [newIzin, ...prev]);
    showToast('Surat izin berhasil diajukan! Menunggu persetujuan pengurus.', 'success');
  };

  const verifyIzin = (id: string, approve: boolean, catatan?: string) => {
    const status: 'disetujui' | 'ditolak' = approve ? 'disetujui' : 'ditolak';
    setPerizinans(prev => prev.map(iz => {
      if (iz.id === id) {
        return {
          ...iz,
          status,
          catatanAdmin: catatan || (approve ? 'Disetujui oleh pengurus pondok.' : 'Ditolak.'),
          diverifikasiOleh: currentUser.name
        };
      }
      return iz;
    }));
    showToast(`Pengajuan izin telah ${status.toUpperCase()}`, approve ? 'success' : 'error');
  };

  // Keuangan
  const submitPembayaran = (pembayaranData: Omit<Keuangan, 'id' | 'status'>) => {
    const id = `ke-${Date.now()}`;
    const newPem: Keuangan = {
      id,
      ...pembayaranData,
      status: 'pending'
    };
    setKeuangans(prev => [newPem, ...prev]);
    showToast('Bukti pembayaran berhasil diunggah! Menunggu verifikasi bendahara.', 'success');
  };

  const verifyPembayaran = (id: string, valid: boolean, catatan?: string) => {
    const status: 'lunas' | 'gagal' = valid ? 'lunas' : 'gagal';
    setKeuangans(prev => prev.map(ke => {
      if (ke.id === id) {
        return {
          ...ke,
          status,
          catatan: catatan || ke.catatan,
          verifikator: currentUser.name,
          tglVerifikasi: new Date().toISOString().replace('T', ' ').substring(0, 19)
        };
      }
      return ke;
    }));
    showToast(`Verifikasi pembayaran ${status === 'lunas' ? 'DITERIMA / LUNAS' : 'DITOLAK'}`, valid ? 'success' : 'error');
  };

  const markAllNotifRead = () => {
    setNotifikasis(prev => prev.map(n => ({ ...n, read: true })));
  };

  const resetDatabase = () => {
    setSantris(INITIAL_SANTRI);
    setKegiatans(INITIAL_KEGIATAN);
    setAbsensis(INITIAL_ABSENSI);
    setPerizinans(INITIAL_PERIZINAN);
    setKeuangans(INITIAL_KEUANGAN);
    showToast('Database direset ke data awal demo SKPL (Kelompok 9)', 'warning');
  };

  const exportDatabaseJson = () => {
    const state = {
      santris,
      kegiatans,
      absensis,
      perizinans,
      keuangans
    };
    return JSON.stringify(state, null, 2);
  };

  const importDatabaseJson = (jsonStr: string): boolean => {
    try {
      const data = JSON.parse(jsonStr);
      if (data.santris && Array.isArray(data.santris)) setSantris(data.santris);
      if (data.kegiatans && Array.isArray(data.kegiatans)) setKegiatans(data.kegiatans);
      if (data.absensis && Array.isArray(data.absensis)) setAbsensis(data.absensis);
      if (data.perizinans && Array.isArray(data.perizinans)) setPerizinans(data.perizinans);
      if (data.keuangans && Array.isArray(data.keuangans)) setKeuangans(data.keuangans);
      showToast('Database berhasil diimpor dari file JSON', 'success');
      return true;
    } catch (e) {
      showToast('Gagal mengimpor file JSON. Format tidak sesuai.', 'error');
      return false;
    }
  };

  const getMysqlSchemaSql = () => {
    return `-- ========================================================
-- SISTEM INFORMASI MANAJEMEN KEGIATAN & ADMINISTRASI SANTRI
-- DATABASE SCHEMA SIMULATOR (MySQL / MariaDB / phpMyAdmin)
-- Pondok Pesantren Mahasiswa Darut Thalibin Telang
-- ========================================================

CREATE DATABASE IF NOT EXISTS \`db_simkas_pondok\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE \`db_simkas_pondok\`;

-- 1. TABEL SANTRI
CREATE TABLE \`santri\` (
  \`id_santri\` VARCHAR(50) NOT NULL PRIMARY KEY,
  \`nis\` VARCHAR(20) NOT NULL UNIQUE,
  \`nama\` VARCHAR(100) NOT NULL,
  \`kamar\` VARCHAR(10) NOT NULL,
  \`angkatan\` INT(4) NOT NULL,
  \`tempat_lahir\` VARCHAR(50) NOT NULL,
  \`tanggal_lahir\` DATE NOT NULL,
  \`no_hp\` VARCHAR(20) NOT NULL,
  \`wali_nama\` VARCHAR(100) NOT NULL,
  \`wali_hp\` VARCHAR(20) NOT NULL,
  \`status_aktif\` TINYINT(1) DEFAULT 1,
  \`fakultas_utm\` VARCHAR(100) NOT NULL,
  \`prodi_utm\` VARCHAR(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 2. TABEL KEGIATAN
CREATE TABLE \`kegiatan\` (
  \`id_kegiatan\` VARCHAR(50) NOT NULL PRIMARY KEY,
  \`nama_kegiatan\` VARCHAR(150) NOT NULL,
  \`hari\` VARCHAR(30) NOT NULL,
  \`waktu\` VARCHAR(30) NOT NULL,
  \`durasi\` VARCHAR(30) NOT NULL,
  \`tempat\` VARCHAR(100) NOT NULL,
  \`pengampu\` VARCHAR(100) NOT NULL,
  \`is_wajib\` TINYINT(1) DEFAULT 1,
  \`kategori\` ENUM('jamaah','kajian','khidmah','lainnya') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 3. TABEL ABSENSI
CREATE TABLE \`absensi\` (
  \`id_absensi\` VARCHAR(50) NOT NULL PRIMARY KEY,
  \`id_kegiatan\` VARCHAR(50) NOT NULL,
  \`id_santri\` VARCHAR(50) NOT NULL,
  \`tanggal\` DATE NOT NULL,
  \`status\` ENUM('hadir','izin','sakit','alpha') NOT NULL,
  \`keterangan\` VARCHAR(255) NULL,
  \`dicatat_oleh\` VARCHAR(50) NOT NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (\`id_kegiatan\`) REFERENCES \`kegiatan\`(\`id_kegiatan\`) ON DELETE CASCADE,
  FOREIGN KEY (\`id_santri\`) REFERENCES \`santri\`(\`id_santri\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 4. TABEL PERIZINAN
CREATE TABLE \`perizinan\` (
  \`id_izin\` VARCHAR(50) NOT NULL PRIMARY KEY,
  \`id_santri\` VARCHAR(50) NOT NULL,
  \`jenis\` ENUM('keluar','pulang') NOT NULL,
  \`tgl_berangkat\` DATE NOT NULL,
  \`tgl_kembali\` DATE NOT NULL,
  \`alasan\` TEXT NOT NULL,
  \`status\` ENUM('pending','disetujui','ditolak') DEFAULT 'pending',
  \`catatan_admin\` VARCHAR(255) NULL,
  \`diverifikasi_oleh\` VARCHAR(100) NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (\`id_santri\`) REFERENCES \`santri\`(\`id_santri\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- 5. TABEL KEUANGAN (PEMBAYARAN)
CREATE TABLE \`keuangan\` (
  \`id_bayar\` VARCHAR(50) NOT NULL PRIMARY KEY,
  \`id_santri\` VARCHAR(50) NOT NULL,
  \`jenis\` ENUM('spp','uang_makan','donasi','daftar_ulang') NOT NULL,
  \`bulan_tagihan\` VARCHAR(30) NOT NULL,
  \`jumlah\` DECIMAL(12,2) NOT NULL,
  \`tgl_bayar\` DATE NOT NULL,
  \`file_bukti\` VARCHAR(255) NOT NULL,
  \`status\` ENUM('pending','lunas','gagal') DEFAULT 'pending',
  \`verifikator\` VARCHAR(100) NULL,
  \`created_at\` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (\`id_santri\`) REFERENCES \`santri\`(\`id_santri\`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- INSERT DATA CONTOH KELOMPOK 9 UTM
INSERT INTO \`santri\` (\`id_santri\`, \`nis\`, \`nama\`, \`kamar\`, \`angkatan\`, \`tempat_lahir\`, \`tanggal_lahir\`, \`no_hp\`, \`wali_nama\`, \`wali_hp\`, \`fakultas_utm\`, \`prodi_utm\`) VALUES
('s1', '230411100177', 'Muhammad Hanif', 'A-01', 2023, 'Bangkalan', '2005-04-12', '081234567890', 'Bpk. Abdullah', '082133445566', 'Fakultas Teknik', 'Teknik Informatika'),
('s2', '230411100062', 'David Febrianto', 'A-02', 2023, 'Sampang', '2005-08-21', '081298765432', 'Bpk. Rahmat', '082177889900', 'Fakultas Teknik', 'Teknik Informatika'),
('s3', '240411100109', 'Muhammad Ammar Abdulhakim', 'B-01', 2024, 'Pamekasan', '2006-01-15', '085712345678', 'Bpk. Hasanudin', '085799887766', 'Fakultas Teknik', 'Teknik Informatika'),
('s4', '230411100027', 'M. Taufiq Tamlaul Mizan', 'B-02', 2023, 'Sumenep', '2005-11-03', '081344556677', 'Bpk. Sulaiman', '081322334455', 'Fakultas Teknik', 'Teknik Informatika'),
('s5', '230411100016', 'Syaroful Anam', 'C-01', 2023, 'Gresik', '2005-06-30', '081988776655', 'Bpk. Zainal', '081911223344', 'Fakultas Teknik', 'Teknik Informatika');
`;
  };

  return (
    <SimkasContext.Provider value={{
      role,
      currentUser,
      santris,
      kegiatans,
      absensis,
      perizinans,
      keuangans,
      notifikasis,
      toasts,
      currentView,
      isDbModalOpen,
      isLoginModalOpen,
      isLoggedIn,
      setRole,
      setCurrentView,
      setIsDbModalOpen,
      setIsLoginModalOpen,
      login,
      logout,
      showToast,
      addSantri,
      updateSantri,
      deleteSantri,
      addAbsensi,
      quickScanRFID,
      submitIzin,
      verifyIzin,
      submitPembayaran,
      verifyPembayaran,
      markAllNotifRead,
      resetDatabase,
      importDatabaseJson,
      exportDatabaseJson,
      getMysqlSchemaSql
    }}>
      {children}
    </SimkasContext.Provider>
  );
};

export const useSimkas = () => {
  const context = useContext(SimkasContext);
  if (!context) throw new Error('useSimkas must be used within SimkasProvider');
  return context;
};
