import { Santri, Kegiatan, AbsensiRecord, Perizinan, Keuangan } from '../types/simkas';

export const INITIAL_SANTRI: Santri[] = [
  {
    id: 's1',
    nis: '230411100177',
    name: 'Muhammad Hanif',
    kamar: 'A-01',
    angkatan: 2023,
    tempatLahir: 'Bangkalan',
    tanggalLahir: '2005-04-12',
    noHp: '081234567890',
    waliName: 'Bpk. Abdullah',
    waliHp: '082133445566',
    statusAktif: true,
    fakultasUtm: 'Fakultas Teknik',
    prodiUtm: 'Teknik Informatika'
  },
  {
    id: 's2',
    nis: '230411100062',
    name: 'David Febrianto',
    kamar: 'A-02',
    angkatan: 2023,
    tempatLahir: 'Sampang',
    tanggalLahir: '2005-08-21',
    noHp: '081298765432',
    waliName: 'Bpk. Rahmat',
    waliHp: '082177889900',
    statusAktif: true,
    fakultasUtm: 'Fakultas Teknik',
    prodiUtm: 'Teknik Informatika'
  },
  {
    id: 's3',
    nis: '240411100109',
    name: 'Muhammad Ammar Abdulhakim',
    kamar: 'B-01',
    angkatan: 2024,
    tempatLahir: 'Pamekasan',
    tanggalLahir: '2006-01-15',
    noHp: '085712345678',
    waliName: 'Bpk. Hasanudin',
    waliHp: '085799887766',
    statusAktif: true,
    fakultasUtm: 'Fakultas Teknik',
    prodiUtm: 'Teknik Informatika'
  },
  {
    id: 's4',
    nis: '230411100027',
    name: 'M. Taufiq Tamlaul Mizan',
    kamar: 'B-02',
    angkatan: 2023,
    tempatLahir: 'Sumenep',
    tanggalLahir: '2005-11-03',
    noHp: '081344556677',
    waliName: 'Bpk. Sulaiman',
    waliHp: '081322334455',
    statusAktif: true,
    fakultasUtm: 'Fakultas Teknik',
    prodiUtm: 'Teknik Informatika'
  },
  {
    id: 's5',
    nis: '230411100016',
    name: 'Syaroful Anam',
    kamar: 'C-01',
    angkatan: 2023,
    tempatLahir: 'Gresik',
    tanggalLahir: '2005-06-30',
    noHp: '081988776655',
    waliName: 'Bpk. Zainal',
    waliHp: '081911223344',
    statusAktif: true,
    fakultasUtm: 'Fakultas Teknik',
    prodiUtm: 'Teknik Informatika'
  },
  {
    id: 's6',
    nis: '220411100099',
    name: 'Ahmad Fauzi Nasution',
    kamar: 'C-02',
    angkatan: 2022,
    tempatLahir: 'Medan',
    tanggalLahir: '2004-02-18',
    noHp: '082233445566',
    waliName: 'Bpk. Ibrahim',
    waliHp: '082299887766',
    statusAktif: true,
    fakultasUtm: 'Fakultas Keislaman',
    prodiUtm: 'Hukum Bisnis Syariah'
  },
  {
    id: 's7',
    nis: '240411100204',
    name: 'Bagus Setyawan',
    kamar: 'D-01',
    angkatan: 2024,
    tempatLahir: 'Surabaya',
    tanggalLahir: '2006-09-09',
    noHp: '085611223344',
    waliName: 'Bpk. Bambang',
    waliHp: '085677889900',
    statusAktif: true,
    fakultasUtm: 'Fakultas Ekonomi dan Bisnis',
    prodiUtm: 'Manajemen'
  }
];

export const INITIAL_KEGIATAN: Kegiatan[] = [
  {
    id: 'k1',
    nama: 'Sholat Subuh Jamaah & Wirid',
    hari: 'Setiap Hari',
    waktu: '04:15 WIB',
    durasi: '60 Menit',
    tempat: 'Masjid Darut Thalibin',
    pengampu: 'Ust. Jauhari',
    wajib: true,
    kategori: 'jamaah'
  },
  {
    id: 'k2',
    nama: 'Kajian Kitab Ta’lim Muta’allim',
    hari: 'Senin & Rabu',
    waktu: '19:30 WIB',
    durasi: '90 Menit',
    tempat: 'Aula Utama Pesantren',
    pengampu: 'K.H. Ahmad Nawawi',
    wajib: true,
    kategori: 'kajian'
  },
  {
    id: 'k3',
    nama: 'Sholat Maghrib & Tadarusan Al-Qur’an',
    hari: 'Setiap Hari',
    waktu: '17:30 WIB',
    durasi: '75 Menit',
    tempat: 'Masjid Darut Thalibin',
    pengampu: 'Ust. Jauhari',
    wajib: true,
    kategori: 'jamaah'
  },
  {
    id: 'k4',
    nama: 'Khidmah & Ro’an Kebersihan Pesantren',
    hari: 'Jumat',
    waktu: '06:00 WIB',
    durasi: '120 Menit',
    tempat: 'Seluruh Lingkungan Pondok',
    pengampu: 'Seksi Keamanan & Ketertiban',
    wajib: true,
    kategori: 'khidmah'
  },
  {
    id: 'k5',
    nama: 'Kajian Fiqih Sulam Taufiq',
    hari: 'Selasa & Kamis',
    waktu: '20:00 WIB',
    durasi: '60 Menit',
    tempat: 'Ruang Serbaguna',
    pengampu: 'Ust. Syafi’i',
    wajib: true,
    kategori: 'kajian'
  },
  {
    id: 'k6',
    nama: 'Pelatihan Leadership & Dakwah Mahasiswa',
    hari: 'Sabtu',
    waktu: '16:00 WIB',
    durasi: '90 Menit',
    tempat: 'Gazebo Pondok',
    pengampu: 'Achmad Jauhari S.T., M.Kom',
    wajib: false,
    kategori: 'lainnya'
  }
];

export const INITIAL_ABSENSI: AbsensiRecord[] = [
  {
    id: 'ab1',
    kegiatanId: 'k1',
    kegiatanNama: 'Sholat Subuh Jamaah & Wirid',
    tanggal: '2026-05-18',
    santriId: 's1',
    santriNama: 'Muhammad Hanif',
    status: 'hadir',
    dicatatOleh: 'Sistem RFID/QR',
    timestamp: '2026-05-18 04:20:12'
  },
  {
    id: 'ab2',
    kegiatanId: 'k1',
    kegiatanNama: 'Sholat Subuh Jamaah & Wirid',
    tanggal: '2026-05-18',
    santriId: 's2',
    santriNama: 'David Febrianto',
    status: 'hadir',
    dicatatOleh: 'Sistem RFID/QR',
    timestamp: '2026-05-18 04:22:05'
  },
  {
    id: 'ab3',
    kegiatanId: 'k1',
    kegiatanNama: 'Sholat Subuh Jamaah & Wirid',
    tanggal: '2026-05-18',
    santriId: 's3',
    santriNama: 'Muhammad Ammar Abdulhakim',
    status: 'izin',
    keterangan: 'Menemani keluarga di rumah sakit',
    dicatatOleh: 'Admin Pengurus',
    timestamp: '2026-05-18 04:30:00'
  },
  {
    id: 'ab4',
    kegiatanId: 'k1',
    kegiatanNama: 'Sholat Subuh Jamaah & Wirid',
    tanggal: '2026-05-18',
    santriId: 's4',
    santriNama: 'M. Taufiq Tamlaul Mizan',
    status: 'hadir',
    dicatatOleh: 'Sistem RFID/QR',
    timestamp: '2026-05-18 04:18:45'
  },
  {
    id: 'ab5',
    kegiatanId: 'k1',
    kegiatanNama: 'Sholat Subuh Jamaah & Wirid',
    tanggal: '2026-05-18',
    santriId: 's5',
    santriNama: 'Syaroful Anam',
    status: 'sakit',
    keterangan: 'Demam tinggi di kamar C-01',
    dicatatOleh: 'Petugas Kamar',
    timestamp: '2026-05-18 04:10:00'
  },
  {
    id: 'ab6',
    kegiatanId: 'k2',
    kegiatanNama: 'Kajian Kitab Ta’lim Muta’allim',
    tanggal: '2026-05-18',
    santriId: 's1',
    santriNama: 'Muhammad Hanif',
    status: 'hadir',
    dicatatOleh: 'Pengurus',
    timestamp: '2026-05-18 19:25:00'
  },
  {
    id: 'ab7',
    kegiatanId: 'k2',
    kegiatanNama: 'Kajian Kitab Ta’lim Muta’allim',
    tanggal: '2026-05-18',
    santriId: 's2',
    santriNama: 'David Febrianto',
    status: 'hadir',
    dicatatOleh: 'Pengurus',
    timestamp: '2026-05-18 19:28:00'
  },
  {
    id: 'ab8',
    kegiatanId: 'k2',
    kegiatanNama: 'Kajian Kitab Ta’lim Muta’allim',
    tanggal: '2026-05-18',
    santriId: 's4',
    santriNama: 'M. Taufiq Tamlaul Mizan',
    status: 'hadir',
    dicatatOleh: 'Pengurus',
    timestamp: '2026-05-18 19:30:12'
  },
  {
    id: 'ab9',
    kegiatanId: 'k2',
    kegiatanNama: 'Kajian Kitab Ta’lim Muta’allim',
    tanggal: '2026-05-18',
    santriId: 's5',
    santriNama: 'Syaroful Anam',
    status: 'alpha',
    keterangan: 'Tanpa konfirmasi',
    dicatatOleh: 'Pengurus',
    timestamp: '2026-05-18 19:45:00'
  }
];

export const INITIAL_PERIZINAN: Perizinan[] = [
  {
    id: 'iz1',
    santriId: 's1',
    santriNama: 'Muhammad Hanif',
    kamar: 'A-01',
    jenis: 'keluar',
    tglBerangkat: '2026-05-20',
    tglKembali: '2026-05-21',
    alasan: 'Rapat koordinasi Himpunan Mahasiswa Teknik Informatika (HIMATIF) UTM di Bangkalan kota.',
    status: 'pending',
    tglPengajuan: '2026-05-18 09:15:22'
  },
  {
    id: 'iz2',
    santriId: 's2',
    santriNama: 'David Febrianto',
    kamar: 'A-02',
    jenis: 'pulang',
    tglBerangkat: '2026-05-22',
    tglKembali: '2026-05-25',
    alasan: 'Menghadiri acara pernikahan kakak kandung di Sampang.',
    status: 'disetujui',
    catatanAdmin: 'Telah diverifikasi dengan orang tua. Harap kembali tepat waktu pada tanggal 25 sebelum ashar.',
    tglPengajuan: '2026-05-16 14:20:00',
    diverifikasiOleh: 'Achmad Jauhari S.T., M.Kom'
  },
  {
    id: 'iz3',
    santriId: 's3',
    santriNama: 'Muhammad Ammar Abdulhakim',
    kamar: 'B-01',
    jenis: 'keluar',
    tglBerangkat: '2026-05-17',
    tglKembali: '2026-05-17',
    alasan: 'Membeli perlengkapan kitab dan baju koko di pasar Tanah Merah.',
    status: 'disetujui',
    catatanAdmin: 'Silakan, maksimal jam 17:00 sudah kembali ke pondok.',
    tglPengajuan: '2026-05-17 08:00:00',
    diverifikasiOleh: 'Ust. Jauhari'
  },
  {
    id: 'iz4',
    santriId: 's4',
    santriNama: 'M. Taufiq Tamlaul Mizan',
    kamar: 'B-02',
    jenis: 'pulang',
    tglBerangkat: '2026-05-28',
    tglKembali: '2026-06-02',
    alasan: 'Libur jeda perkuliahan semester dan keperluan keluarga di Sumenep.',
    status: 'pending',
    tglPengajuan: '2026-05-18 11:30:15'
  },
  {
    id: 'iz5',
    santriId: 's5',
    santriNama: 'Syaroful Anam',
    kamar: 'C-01',
    jenis: 'keluar',
    tglBerangkat: '2026-05-19',
    tglKembali: '2026-05-19',
    alasan: 'Bermain futsal bersama teman kampus di luar jam pondok.',
    status: 'ditolak',
    catatanAdmin: 'Hari Selasa malam ada jadwal wajib Kajian Fiqih. Tidak diizinkan keluar untuk kegiatan non-mendesak.',
    tglPengajuan: '2026-05-18 06:10:00',
    diverifikasiOleh: 'Seksi Keamanan & Ketertiban'
  }
];

export const INITIAL_KEUANGAN: Keuangan[] = [
  {
    id: 'ke1',
    santriId: 's1',
    santriNama: 'Muhammad Hanif',
    kamar: 'A-01',
    jenis: 'spp',
    bulan: 'Mei 2026',
    jumlah: 250000,
    tglBayar: '2026-05-02',
    bukti: 'bukti_tf_bni_hanif.jpg',
    status: 'lunas',
    catatan: 'SPP Bulan Mei lunas via transfer BNI',
    verifikator: 'Bendahara Pesantren',
    tglVerifikasi: '2026-05-02 16:30:12'
  },
  {
    id: 'ke2',
    santriId: 's2',
    santriNama: 'David Febrianto',
    kamar: 'A-02',
    jenis: 'uang_makan',
    bulan: 'Mei 2026',
    jumlah: 350000,
    tglBayar: '2026-05-04',
    bukti: 'transfer_bca_david.png',
    status: 'lunas',
    catatan: 'Uang makan katering santri bulan Mei',
    verifikator: 'Bendahara Pesantren',
    tglVerifikasi: '2026-05-05 09:12:00'
  },
  {
    id: 'ke3',
    santriId: 's3',
    santriNama: 'Muhammad Ammar Abdulhakim',
    kamar: 'B-01',
    jenis: 'spp',
    bulan: 'Mei 2026',
    jumlah: 250000,
    tglBayar: '2026-05-15',
    bukti: 'struk_bri_ammar.jpg',
    status: 'pending',
    catatan: 'Transfer dari Bank BRI a.n. Hasanudin (Orang Tua)'
  },
  {
    id: 'ke4',
    santriId: 's4',
    santriNama: 'M. Taufiq Tamlaul Mizan',
    kamar: 'B-02',
    jenis: 'donasi',
    bulan: 'Mei 2026',
    jumlah: 100000,
    tglBayar: '2026-05-17',
    bukti: 'donasi_masjid_taufiq.pdf',
    status: 'pending',
    catatan: 'Infaq pembangunan perluasan tempat wudhu'
  },
  {
    id: 'ke5',
    santriId: 's5',
    santriNama: 'Syaroful Anam',
    kamar: 'C-01',
    jenis: 'spp',
    bulan: 'April 2026',
    jumlah: 250000,
    tglBayar: '2026-04-10',
    bukti: 'tf_mandiri_anam.jpg',
    status: 'lunas',
    catatan: 'SPP April lunas',
    verifikator: 'Bendahara Pesantren',
    tglVerifikasi: '2026-04-11 10:00:00'
  },
  {
    id: 'ke6',
    santriId: 's5',
    santriNama: 'Syaroful Anam',
    kamar: 'C-01',
    jenis: 'spp',
    bulan: 'Mei 2026',
    jumlah: 250000,
    tglBayar: '2026-05-18',
    bukti: 'tf_mandiri_mei.jpg',
    status: 'pending',
    catatan: 'Baru ditransfer pagi ini'
  }
];
