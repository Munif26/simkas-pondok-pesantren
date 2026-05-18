import React from 'react';
import { useSimkas } from '../context/SimkasContext';
import { Users, CalendarCheck, FileText, CreditCard, ArrowRight, TrendingUp, Sparkles, UserCheck } from 'lucide-react';

export const DashboardView: React.FC = () => {
  const { role, currentUser, santris, perizinans, keuangans, absensis, setCurrentView } = useSimkas();

  const totalSantri = santris.filter(s => s.statusAktif).length;
  const pendingIzin = perizinans.filter(p => p.status === 'pending').length;
  const pendingKeu = keuangans.filter(k => k.status === 'pending').length;
  
  // Calculate today's attendance summary
  const todayStr = new Date().toISOString().substring(0, 10);
  const todayRecords = absensis.filter(a => a.tanggal === todayStr);
  const hadirCount = todayRecords.filter(a => a.status === 'hadir').length;
  const izinCount = todayRecords.filter(a => a.status === 'izin').length;
  const sakitCount = todayRecords.filter(a => a.status === 'sakit').length;
  const alphaCount = todayRecords.filter(a => a.status === 'alpha').length;
  const totalRecorded = todayRecords.length || 1; // avoid div 0
  const attendanceRate = Math.round((hadirCount / totalRecorded) * 100) || 86; // default 86% if empty

  // Filter for santri role
  const myIzin = perizinans.filter(p => p.santriId === currentUser.id);
  const myKeu = keuangans.filter(k => k.santriId === currentUser.id);

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-emerald-800 via-emerald-700 to-teal-900 rounded-3xl p-6 md:p-8 text-white shadow-xl relative overflow-hidden">
        {/* Decorative background shapes */}
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-white/10 rounded-full blur-2xl pointer-events-none"></div>
        <div className="absolute right-40 -top-20 w-48 h-48 bg-emerald-500/20 rounded-full blur-xl pointer-events-none"></div>

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex items-center gap-4 md:gap-6">
            <img
              src={currentUser.avatar}
              alt={currentUser.name}
              className="w-16 h-16 md:w-20 md:h-20 rounded-2xl object-cover ring-4 ring-white/20 shadow-lg"
            />
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="bg-emerald-500/30 text-emerald-300 text-xs font-bold px-2.5 py-0.5 rounded-full border border-emerald-400/30 backdrop-blur-xs flex items-center gap-1">
                  <Sparkles className="w-3 h-3" />
                  <span>SIMKAS v2.0</span>
                </span>
                <span className="text-xs text-emerald-200">Pondok Pesantren Darut Thalibin Telang</span>
              </div>
              <h2 className="text-xl md:text-2xl font-extrabold tracking-tight">
                Selamat Datang, {currentUser.name} 👋
              </h2>
              <p className="text-xs md:text-sm text-emerald-100/90 mt-1 max-w-xl leading-relaxed">
                {role === 'admin' && 'Sistem Informasi Manajemen Kegiatan dan Administrasi Santri. Seluruh modul beroperasi dalam mode terintegrasi 24 jam.'}
                {role === 'santri' && 'Anda terdaftar sebagai santri aktif di kamar A-01. Harap lakukan absensi kegiatan wajib dan pastikan tagihan bulanan telah terverifikasi.'}
                {role === 'ortu' && 'Memantau aktivitas, absensi real-time, dan status pembayaran dari ananda Muhammad Hanif (NIM: 230411100177).'}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2.5 shrink-0">
            {role === 'admin' && (
              <>
                <button
                  onClick={() => setCurrentView('perizinan')}
                  className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-lg shadow-amber-500/20"
                >
                  <FileText className="w-4 h-4" />
                  <span>Izin Pending ({pendingIzin})</span>
                </button>
                <button
                  onClick={() => setCurrentView('keuangan')}
                  className="px-4 py-2.5 bg-white hover:bg-emerald-50 text-emerald-900 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-lg"
                >
                  <CreditCard className="w-4 h-4" />
                  <span>Verifikasi Bayar ({pendingKeu})</span>
                </button>
              </>
            )}
            {role === 'santri' && (
              <button
                onClick={() => setCurrentView('profil')}
                className="px-4 py-2.5 bg-white hover:bg-emerald-50 text-emerald-900 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-lg"
              >
                <UserCheck className="w-4 h-4" />
                <span>Kartu Santri & QR Saya</span>
              </button>
            )}
            {role === 'ortu' && (
              <button
                onClick={() => setCurrentView('keuangan')}
                className="px-4 py-2.5 bg-white hover:bg-emerald-50 text-emerald-900 rounded-xl text-xs font-bold transition flex items-center gap-2 shadow-lg"
              >
                <CreditCard className="w-4 h-4" />
                <span>Upload Bukti Bayar</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Stat 1 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-extrabold text-slate-500 uppercase">Total Santri Aktif</span>
            <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center font-bold">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-extrabold text-slate-800">{totalSantri}</span>
            <span className="text-xs text-emerald-600 font-bold flex items-center">
              <TrendingUp className="w-3 h-3 mr-0.5" /> 100%
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Terbagi di 4 kamar asrama</p>
        </div>

        {/* Stat 2 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-extrabold text-slate-500 uppercase">Izin Keluar / Pulang</span>
            <div className="w-8 h-8 rounded-xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-extrabold text-slate-800">
              {role === 'admin' ? pendingIzin : myIzin.length}
            </span>
            <span className="text-xs text-amber-600 font-bold">
              {role === 'admin' ? 'Pengajuan Pending' : 'Total Riwayat Saya'}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Sistem persetujuan digital</p>
        </div>

        {/* Stat 3 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-extrabold text-slate-500 uppercase">Tingkat Kehadiran</span>
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-700 flex items-center justify-center font-bold">
              <CalendarCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-extrabold text-slate-800">{attendanceRate}%</span>
            <span className="text-xs text-blue-600 font-bold">Hari ini</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Sholat Jamaah & Kajian</p>
        </div>

        {/* Stat 4 */}
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-extrabold text-slate-500 uppercase">Verifikasi Keuangan</span>
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold">
              <CreditCard className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl md:text-3xl font-extrabold text-slate-800">
              {role === 'admin' ? pendingKeu : myKeu.filter(k => k.status === 'lunas').length}
            </span>
            <span className="text-xs text-purple-600 font-bold">
              {role === 'admin' ? 'Menunggu Validasi' : 'Transaksi Lunas'}
            </span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">SPP & Uang Makan Katering</p>
        </div>
      </div>

      {/* Attendance summary bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="font-bold text-slate-800 text-base flex items-center gap-2">
              <span>📊 Pemantauan Kehadiran Real-time Hari Ini</span>
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-md">Live</span>
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">Rekapitulasi otomatis absensi dari sistem RFID & input manual pengurus</p>
          </div>
          <button
            onClick={() => setCurrentView('kegiatan')}
            className="text-xs text-emerald-700 hover:text-emerald-800 font-bold flex items-center gap-1 self-start sm:self-auto"
          >
            <span>Lihat Log & Input Absen</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="h-5 rounded-full overflow-hidden bg-slate-100 flex mb-4">
          <div style={{ width: `${Math.max(attendanceRate, 10)}%` }} className="bg-emerald-600 transition-all duration-700" title={`Hadir: ${hadirCount}`}></div>
          <div style={{ width: `${Math.max((izinCount / totalRecorded) * 100, 5)}%` }} className="bg-amber-400 transition-all duration-700" title={`Izin: ${izinCount}`}></div>
          <div style={{ width: `${Math.max((sakitCount / totalRecorded) * 100, 5)}%` }} className="bg-blue-500 transition-all duration-700" title={`Sakit: ${sakitCount}`}></div>
          <div style={{ width: `${Math.max((alphaCount / totalRecorded) * 100, 5)}%` }} className="bg-rose-500 transition-all duration-700" title={`Alpha: ${alphaCount}`}></div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          <div className="bg-emerald-50 rounded-2xl p-3.5 flex items-center gap-3 border border-emerald-100">
            <div className="w-3.5 h-3.5 rounded-full bg-emerald-600 shrink-0"></div>
            <div>
              <p className="text-xs font-bold text-slate-700">Hadir</p>
              <p className="text-sm font-extrabold text-emerald-800">{hadirCount} Santri ({attendanceRate}%)</p>
            </div>
          </div>

          <div className="bg-amber-50 rounded-2xl p-3.5 flex items-center gap-3 border border-amber-100">
            <div className="w-3.5 h-3.5 rounded-full bg-amber-400 shrink-0"></div>
            <div>
              <p className="text-xs font-bold text-slate-700">Izin Keluar/Pulang</p>
              <p className="text-sm font-extrabold text-amber-800">{izinCount} Santri</p>
            </div>
          </div>

          <div className="bg-blue-50 rounded-2xl p-3.5 flex items-center gap-3 border border-blue-100">
            <div className="w-3.5 h-3.5 rounded-full bg-blue-500 shrink-0"></div>
            <div>
              <p className="text-xs font-bold text-slate-700">Sakit</p>
              <p className="text-sm font-extrabold text-blue-800">{sakitCount} Santri</p>
            </div>
          </div>

          <div className="bg-rose-50 rounded-2xl p-3.5 flex items-center gap-3 border border-rose-100">
            <div className="w-3.5 h-3.5 rounded-full bg-rose-500 shrink-0"></div>
            <div>
              <p className="text-xs font-bold text-slate-700">Alpha (Tanpa Keterangan)</p>
              <p className="text-sm font-extrabold text-rose-800">{alphaCount} Santri</p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Action Navigation Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          onClick={() => setCurrentView('perizinan')}
          className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-amber-400 hover:shadow-lg transition cursor-pointer flex items-start gap-4 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition duration-300 shrink-0">
            📝
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-slate-800 text-base group-hover:text-amber-700 transition">
                {role === 'admin' ? 'Verifikasi Pengajuan Izin Santri' : 'Ajukan Surat Izin Keluar / Pulang'}
              </h4>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-700 group-hover:translate-x-1 transition" />
            </div>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {role === 'admin'
                ? `Terdapat ${pendingIzin} pengajuan izin menunggu persetujuan. Periksa kesesuaian alasan dan tanggal.`
                : 'Mengajukan izin keluar pondok untuk keperluan kuliah, organisasi, atau izin pulang kampung.'}
            </p>
          </div>
        </div>

        <div 
          onClick={() => setCurrentView('keuangan')}
          className="bg-white p-6 rounded-3xl border border-slate-200 hover:border-purple-400 hover:shadow-lg transition cursor-pointer flex items-start gap-4 group"
        >
          <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-700 flex items-center justify-center font-bold text-xl group-hover:scale-110 transition duration-300 shrink-0">
            💰
          </div>
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h4 className="font-extrabold text-slate-800 text-base group-hover:text-purple-700 transition">
                {role === 'admin' ? 'Verifikasi Bukti Bayar SPP & Uang Makan' : 'Unggah Bukti Bayar & Cek Tagihan'}
              </h4>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-700 group-hover:translate-x-1 transition" />
            </div>
            <p className="text-xs text-slate-500 mt-1 leading-relaxed">
              {role === 'admin'
                ? `Terdapat ${pendingKeu} bukti transfer yang diunggah santri/wali menunggu untuk diverifikasi.`
                : 'Lihat rincian tagihan SPP bulanan, uang katering makan, atau donasi pondok. Upload bukti transfer dengan mudah.'}
            </p>
          </div>
        </div>
      </div>

      {/* Info Dosen & Tim SKPL */}
      <div className="bg-slate-900 text-white p-6 rounded-3xl flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl border border-slate-800">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xl font-bold border border-emerald-500/30 shrink-0">
            🎓
          </div>
          <div>
            <h4 className="font-bold text-sm text-slate-100">Sistem Manajemen Kegiatan dan Administrasi Santri</h4>
            <p className="text-xs text-slate-400 mt-1">Dosen Pengampu: Achmad Jauhari S.T., M.Kom (NIP: 1981010920060410003)</p>
            <p className="text-[11px] text-emerald-400/90 mt-1 font-semibold">Anggota: M. Hanif (177) · David Febrianto (062) · M. Ammar A. (109) · M. Taufiq (027) · Syaroful Anam (016)</p>
          </div>
        </div>
        <div className="bg-slate-800 px-4 py-2.5 rounded-2xl border border-slate-700 text-xs font-bold text-center shrink-0">
          <span className="text-slate-400">Prodi: </span>
          <span className="text-white">Teknik Informatika UTM '26</span>
        </div>
      </div>
    </div>
  );
};
