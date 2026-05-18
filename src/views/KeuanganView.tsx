import React, { useState } from 'react';
import { useSimkas } from '../context/SimkasContext';
import { CreditCard, Upload, Calendar, FileCheck, Check, X, ShieldAlert } from 'lucide-react';

export const KeuanganView: React.FC = () => {
  const { role, currentUser, keuangans, santris, submitPembayaran, verifyPembayaran, showToast } = useSimkas();
  const [filterJenis, setFilterJenis] = useState<string>('Semua');

  // Form state for uploading proof
  const [jenis, setJenis] = useState<'spp' | 'uang_makan' | 'donasi' | 'daftar_ulang'>('spp');
  const [bulan, setBulan] = useState('Mei 2026');
  const [jumlah, setJumlah] = useState<number>(250000);
  const [tglBayar, setTglBayar] = useState(new Date().toISOString().substring(0, 10));
  const [fileName, setFileName] = useState('');
  const [catatan, setCatatan] = useState('');

  // Reject modal state
  const [rejectingId, setRejectingId] = useState<string | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  const mySantriInfo = santris.find(s => s.id === currentUser.id) || { name: currentUser.name, kamar: 'A-01' };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFileName(file.name);
      showToast(`Bukti ${file.name} terpilih`, 'info');
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!jumlah || !tglBayar || !fileName) {
      return showToast('Lengkapi jumlah bayar, tanggal, dan unggah file bukti transfer', 'error');
    }

    submitPembayaran({
      santriId: currentUser.id,
      santriNama: mySantriInfo.name,
      kamar: mySantriInfo.kamar,
      jenis,
      bulan,
      jumlah,
      tglBayar,
      bukti: fileName,
      catatan
    });

    setFileName('');
    setCatatan('');
  };

  const handleApprove = (id: string) => {
    verifyPembayaran(id, true, 'Pembayaran valid dan telah dibukukan oleh Bendahara Pesantren.');
  };

  const handleRejectSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rejectReason.trim() && rejectingId) {
      return showToast('Catatan penolakan wajib diisi', 'error');
    }
    if (rejectingId) {
      verifyPembayaran(rejectingId, false, rejectReason);
      setRejectingId(null);
      setRejectReason('');
    }
  };

  const displayedList = keuangans.filter(k => {
    const matchUser = role === 'admin' || k.santriId === currentUser.id;
    const matchJenis = filterJenis === 'Semua' || k.jenis === filterJenis;
    return matchUser && matchJenis;
  });

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div>
          <h2 className="text-lg font-bold text-slate-800">💰 Administrasi Keuangan & Pembayaran Santri</h2>
          <p className="text-xs text-slate-500 mt-1">
            Pengelolaan SPP bulanan, uang katering makan, dan donasi pembangunan dengan sistem unggah bukti bayar.
          </p>
        </div>

        <div className="flex gap-1.5 p-1 bg-slate-100 rounded-2xl text-xs font-bold overflow-x-auto pb-1 md:pb-0">
          {['Semua', 'spp', 'uang_makan', 'donasi'].map((jn) => (
            <button
              key={jn}
              onClick={() => setFilterJenis(jn)}
              className={`px-3 py-2 rounded-xl capitalize whitespace-nowrap transition ${
                filterJenis === jn ? 'bg-white text-emerald-800 shadow-sm font-bold' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {jn === 'Semua' ? 'Semua Kategori' : jn.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Side: Upload Proof Form or Admin Info */}
        <div className="lg:col-span-1 space-y-6">
          {role !== 'admin' ? (
            <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
              <h3 className="font-extrabold text-sm text-slate-800 pb-3 border-b border-slate-100 flex items-center gap-2">
                <Upload className="w-4 h-4 text-emerald-700" />
                <span>Unggah Bukti Bayar / Transfer</span>
              </h3>

              <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-bold text-slate-700">
                <div>
                  <label className="block mb-1">Jenis Pembayaran</label>
                  <select
                    value={jenis}
                    onChange={(e) => {
                      const j = e.target.value as any;
                      setJenis(j);
                      if (j === 'spp') setJumlah(250000);
                      if (j === 'uang_makan') setJumlah(350000);
                      if (j === 'donasi') setJumlah(100000);
                    }}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500/20 capitalize"
                  >
                    <option value="spp">SPP Bulanan (Rp 250.000)</option>
                    <option value="uang_makan">Uang Makan Katering (Rp 350.000)</option>
                    <option value="donasi">Donasi / Infaq Pembangunan</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block mb-1">Bulan Tagihan</label>
                    <select
                      value={bulan}
                      onChange={(e) => setBulan(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                    >
                      <option value="Mei 2026">Mei 2026</option>
                      <option value="Juni 2026">Juni 2026</option>
                      <option value="Juli 2026">Juli 2026</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-1">Tanggal Transfer</label>
                    <input
                      type="date"
                      required
                      value={tglBayar}
                      onChange={(e) => setTglBayar(e.target.value)}
                      className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1">Jumlah Nominal Bayar (Rp)</label>
                  <input
                    type="number"
                    required
                    min={10000}
                    value={jumlah}
                    onChange={(e) => setJumlah(parseInt(e.target.value) || 0)}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none font-bold text-slate-900"
                  />
                </div>

                <div>
                  <label className="block mb-1">Upload Bukti Transfer / Resi</label>
                  <div className="border-2 border-dashed border-slate-200 hover:border-emerald-500 rounded-2xl p-4 text-center bg-slate-50 transition cursor-pointer relative">
                    <input
                      type="file"
                      required
                      id="uploadBuktiFile"
                      accept="image/*,.pdf"
                      onChange={handleFileChange}
                      className="absolute inset-0 opacity-0 cursor-pointer"
                    />
                    <Upload className="w-6 h-6 text-emerald-700 mx-auto mb-2" />
                    <span className="text-xs font-extrabold text-emerald-700 block">Pilih File Foto Bukti</span>
                    <span className="text-[10px] text-slate-400 block mt-1">JPG, PNG atau PDF (Max 5MB)</span>
                    {fileName && (
                      <div className="mt-2 p-2 bg-emerald-100 text-emerald-900 rounded-lg text-[11px] font-bold truncate">
                        ✓ {fileName}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block mb-1">Catatan Pengirim (Opsional)</label>
                  <input
                    type="text"
                    value={catatan}
                    onChange={(e) => setCatatan(e.target.value)}
                    placeholder="Misal: Transfer via BNI a.n. Abdullah"
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl font-bold shadow-lg shadow-emerald-700/25 transition mt-2 flex items-center justify-center gap-2"
                >
                  <FileCheck className="w-4 h-4" />
                  <span>Kirim Bukti Pembayaran</span>
                </button>
              </form>
            </div>
          ) : (
            <div className="bg-gradient-to-br from-slate-900 via-emerald-900 to-slate-900 text-white rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center gap-2">
                <CreditCard className="w-5 h-5 text-emerald-400" />
                <h3 className="font-extrabold text-sm">Verifikasi Keuangan Pesantren</h3>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Setiap bukti transfer yang diunggah oleh santri atau wali santri akan masuk ke daftar verifikasi ini. Harap cocokkan mutasi rekening bank pesantren sebelum menyetujui.
              </p>

              <div className="bg-white/10 rounded-2xl p-4 border border-white/10 space-y-2">
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Menunggu Verifikasi:</span>
                  <span className="font-bold text-amber-300">
                    {keuangans.filter(k => k.status === 'pending').length} Transaksi
                  </span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-slate-400">Total Valid / Lunas:</span>
                  <span className="font-bold text-emerald-400">
                    {keuangans.filter(k => k.status === 'lunas').length} Transaksi
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Side: Payment History & Verification List */}
        <div className="lg:col-span-2 space-y-4">
          {displayedList.length === 0 ? (
            <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center text-slate-400 font-medium">
              Tidak ada riwayat atau tagihan yang sesuai dengan filter.
            </div>
          ) : (
            displayedList.map(k => {
              const isPending = k.status === 'pending';
              const isLunas = k.status === 'lunas';

              return (
                <div key={k.id} className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-md transition space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-slate-100">
                    <div className="flex items-center gap-2.5">
                      <span className={`px-3 py-1 rounded-full text-[11px] font-extrabold uppercase ${
                        isPending ? 'bg-amber-100 text-amber-800 border border-amber-200' :
                        isLunas ? 'bg-emerald-100 text-emerald-800 border border-emerald-200' :
                        'bg-rose-100 text-rose-800 border border-rose-200'
                      }`}>
                        {isPending ? 'Menunggu Verifikasi' : k.status}
                      </span>
                      <span className="text-xs text-slate-400 font-medium flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" /> {k.tglBayar}
                      </span>
                    </div>

                    <span className="text-xs bg-slate-100 text-slate-800 px-3 py-1 rounded-lg font-extrabold uppercase tracking-wide">
                      {k.jenis.replace('_', ' ')} · {k.bulan}
                    </span>
                  </div>

                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div>
                      <h4 className="font-bold text-base text-slate-800">{k.santriNama}</h4>
                      <p className="text-xs text-slate-500 font-medium">Kamar Asrama: {k.kamar}</p>
                    </div>

                    <div className="text-left sm:text-right">
                      <span className="text-xs text-slate-400 font-bold block uppercase">Total Tagihan</span>
                      <span className="text-lg font-extrabold text-slate-900">
                        Rp {k.jumlah.toLocaleString('id-ID')}
                      </span>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-3 rounded-2xl border border-slate-200 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                    <div>
                      <span className="text-slate-500 font-semibold">File Bukti Upload:</span>
                      <span className="font-extrabold text-emerald-700 ml-1.5 underline cursor-pointer hover:text-emerald-800">
                        📁 {k.bukti}
                      </span>
                      {k.catatan && <p className="text-slate-600 mt-1 italic font-medium">💬 &ldquo;{k.catatan}&rdquo;</p>}
                    </div>

                    {role === 'admin' && isPending && (
                      <div className="flex items-center gap-2 shrink-0 self-end sm:self-auto">
                        <button
                          onClick={() => handleApprove(k.id)}
                          className="py-2 px-3.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
                        >
                          <Check className="w-4 h-4" />
                          <span>Valid / Terima</span>
                        </button>
                        <button
                          onClick={() => { setRejectingId(k.id); setRejectReason(''); }}
                          className="py-2 px-3.5 bg-rose-600 hover:bg-rose-700 text-white rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-sm transition"
                        >
                          <X className="w-4 h-4" />
                          <span>Tolak</span>
                        </button>
                      </div>
                    )}
                  </div>

                  {k.verifikator && (
                    <div className={`p-2.5 rounded-xl text-xs font-medium ${
                      isLunas ? 'bg-emerald-50 text-emerald-900 border border-emerald-100' : 'bg-rose-50 text-rose-900 border border-rose-100'
                    }`}>
                      <span className="font-bold">Diverifikasi oleh {k.verifikator} ({k.tglVerifikasi || k.tglBayar})</span>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* Reject Modal */}
      {rejectingId && (
        <div className="fixed inset-0 z-50 bg-slate-900/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full overflow-hidden border border-slate-100 p-6">
            <h3 className="font-extrabold text-base text-slate-800 mb-3 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              <span>Tolak Bukti Pembayaran Keuangan</span>
            </h3>
            <p className="text-xs text-slate-500 mb-4 leading-relaxed">
              Jelaskan alasan penolakan bukti transfer (misal: gambar buram, nominal transfer tidak sesuai dengan tagihan, atau mutasi rekening belum masuk).
            </p>

            <form onSubmit={handleRejectSubmit} className="space-y-4">
              <textarea
                autoFocus
                required
                rows={4}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Misal: Mutasi transfer belum terdaftar di rekening BSI pesantren per tanggal ini..."
                className="w-full p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs outline-none font-medium leading-relaxed"
              />

              <div className="flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRejectingId(null)}
                  className="py-2.5 px-4 bg-slate-100 text-slate-700 rounded-xl text-xs font-bold"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-6 bg-rose-600 text-white rounded-xl text-xs font-bold shadow-lg shadow-rose-600/20"
                >
                  Konfirmasi Tolak Bukti
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
