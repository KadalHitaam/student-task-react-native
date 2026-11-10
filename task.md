# DevFlow / Student Task Hub — Rencana Tugas Bertahap

Dokumen ini memecah PRD menjadi checkpoint kecil yang bisa diuji dan dipulihkan satu per satu. Kerjakan berurutan; lanjut ke checkpoint berikutnya hanya setelah kriteria penerimaan checkpoint saat ini terpenuhi.

## Catatan arsitektur sebelum mulai

- Proyek saat ini menggunakan **Expo SDK 58, Expo Router, dan TypeScript** (`expo-router/entry`), serta sudah memiliki tab layout. Walaupun PRD menyebut React Navigation, implementasi mengikuti aturan proyek yang mengharuskan Expo Router. Gunakan route di `src/app/` dan integrasikan tab pada struktur yang sudah ada; jangan menambahkan navigator kedua.
- Gunakan React Native `StyleSheet` dan desain parchment/earthy sesuai PRD. Pastikan tampilan tetap nyaman di iOS, Android, dan web.
- Paket `@expo/vector-icons` belum tercantum di `package.json`. Pada checkpoint ikon, verifikasi opsi ikon yang tersedia dan tambahkan dependency hanya jika diperlukan, menggunakan versi yang kompatibel dengan Expo SDK.
- Fitur penyimpanan permanen tidak diminta dalam PRD; data mock dan state lokal cukup untuk cakupan awal.

## Batasan ruang lingkup — jangan menambah hal yang tidak perlu

- Implementasikan hanya fitur yang disebut PRD: dashboard, statistik, quest, tambah/hapus/toggle task, filter aktif/selesai, roadmap, dan navigasi dua tab.
- Jangan menambahkan backend/API, database, login, sinkronisasi cloud, notifikasi, kalender, pengaturan, animasi tambahan, atau penyimpanan permanen.
- Jangan menambah dependency jika API/komponen yang sudah tersedia di proyek sudah mencukupi. Hindari mengubah konfigurasi dan file starter yang tidak berkaitan langsung dengan fitur atau validasi.
- Jangan menambah tab, halaman, jenis statistik, atau aturan gamifikasi baru di luar kebutuhan PRD.
- Jika ada perubahan di luar batasan ini yang tampak diperlukan, catat sebagai usulan pekerjaan lanjutan; jangan implementasikan tanpa persetujuan.

## Aturan checkpoint dan pemulihan

1. Sebelum mulai, pastikan perubahan yang sudah ada tersimpan dan catat kondisi awal repository.
2. Selesaikan satu checkpoint, jalankan validasi yang tercantum, lalu tinjau perubahan.
3. Jika repository menggunakan Git, buat commit setelah checkpoint lulus dengan pesan yang mencantumkan nomor checkpoint, misalnya `checkpoint 1: task model and filter hook`. Jangan memasukkan perubahan lain yang tidak terkait.
4. Jika ditemukan kesalahan, perbaiki pada checkpoint yang sama. Bila perbaikan membuat kondisi makin buruk, buat branch pemulihan dari commit checkpoint terakhir yang lulus; hindari `git reset --hard` agar pekerjaan lain tidak hilang.
5. Tandai kotak tugas hanya setelah pekerjaan dan kriteria penerimaan benar-benar lulus.

## Checkpoint 0 — Baseline dan rancangan

- [x] Catat status awal Git dan pastikan file kerja yang sudah ada aman.
- [x] Baca struktur route, layout tab, komponen tema, dan konfigurasi lint/typecheck.
- [x] Tentukan bentuk data `Task` (minimal: `id`, `title`, `description`/detail, `category` atau ikon, `isCompleted`, `xpReward`; tambahkan `createdAt` bila dibutuhkan untuk pengurutan).
- [x] Sepakati aturan XP: XP bertambah tepat sekali saat quest aktif ditandai selesai dan tidak bertambah lagi saat dibatalkan atau ditandai selesai berulang.
- [x] Petakan kebutuhan tampilan, state, hook, route, dan aset; pertahankan desain modular dan hindari memindahkan file di luar kebutuhan.

**Kriteria lulus:** status awal repository dan pemeriksaan dasar tercatat; keputusan arsitektur dan aturan XP jelas. HEAD yang ada menjadi baseline pemulihan.

**Checkpoint pemulihan:** baseline menggunakan HEAD repository yang sudah ada; commit fitur dibuat terpisah per checkpoint.

## Checkpoint 1 — Model tugas, data mock, dan filter

- [x] Buat tipe/model task terpusat di luar folder route.
- [x] Siapkan beberapa quest mock bertema mahasiswa Ilmu Komputer (struktur data, basis data, jaringan, dan proyek aplikasi) dengan reward XP yang bervariasi.
- [x] Buat custom hook `useTaskFilter` yang menerima daftar task dan menghasilkan daftar quest aktif serta selesai.
- [x] Pastikan hasil filter berubah benar ketika status task berubah; tangani daftar kosong.

**Kriteria lulus:** tipe lolos pemeriksaan TypeScript dan filter mengelompokkan semua task secara tepat tanpa mengubah data sumber.

**Validasi:** `npx tsc --noEmit`.

**Checkpoint pemulihan:** commit setelah validasi lulus.

## Checkpoint 2 — Komponen visual yang dapat digunakan ulang

- [x] Buat `StatWidget` untuk label, nilai, dan indikator perubahan positif seperti “+XP hari ini”.
- [x] Buat `TaskItem` yang menerima data task dan callback toggle melalui props.
- [x] Tampilkan status selesai secara jelas, reward XP, teks quest, serta tombol aksi yang mudah digunakan.
- [x] Gunakan warna, garis tepi tipis, radius kecil, tipografi, dan ikon sesuai palet parchment PRD.
- [x] Verifikasi ukuran sentuh, teks panjang, dan kontras pada layar kecil.

**Kriteria lulus:** kedua komponen menerima data lewat props, tidak memiliki state global tersembunyi, dan dapat ditampilkan tanpa error.

**Validasi:** `npx tsc --noEmit` dan `npm run lint`.

**Checkpoint pemulihan:** commit setelah validasi lulus.

## Checkpoint 3 — Dashboard / Sanctuary

- [x] Ganti konten starter route utama dengan `DashboardScreen` (atau komponen layar ekuivalen yang dipanggil route utama).
- [x] Kelola daftar task, XP/level, dan nilai input task baru menggunakan `useState`.
- [x] Gunakan `useEffect` untuk memuat data mock awal saat layar dipasang; hindari menginisialisasi ulang data setiap render.
- [x] Implementasikan `toggleTaskStatus` di parent dan teruskan ke `TaskItem`; jaga XP konsisten ketika task ditandai selesai maupun dibuka kembali.
- [x] Tambahkan form sederhana untuk membuat quest baru, validasi input kosong, dan tetapkan reward awal yang masuk akal.
- [x] Susun dashboard: judul SANCTUARY, tiga widget Gold/XP/Quests Completed, daftar quest aktif/terbaru, dan tampilan empty state bila diperlukan.
- [x] Gunakan `useTaskFilter` untuk memisahkan quest aktif dan selesai.

**Kriteria lulus:** daftar mock langsung terlihat; membuat task dan toggle status berfungsi; statistik mencerminkan data; reward XP tidak terduplikasi; layar dapat discroll.

**Validasi:** `npx tsc --noEmit`, `npm run lint`, serta pemeriksaan manual di web atau simulator.

**Checkpoint pemulihan:** commit setelah semua skenario dashboard lulus.

## Checkpoint 4 — Project Roadmap / Map

- [x] Buat route layar roadmap di `src/app/` mengikuti konvensi Expo Router proyek.
- [x] Tampilkan roadmap/timeline proyek jangka panjang dengan beberapa milestone contoh, status, dan progres visual.
- [x] Gunakan tema dan komponen bersama agar konsisten dengan dashboard.
- [x] Pastikan layout timeline terbaca pada layar kecil dan konten bisa discroll.

**Kriteria lulus:** route roadmap bisa dibuka, memiliki data contoh yang jelas, dan tidak mengganggu dashboard.

**Validasi:** `npx tsc --noEmit`, `npm run lint`, dan buka kedua route secara manual.

**Checkpoint pemulihan:** commit setelah route dan tampilan roadmap lulus.

## Checkpoint 5 — Navigasi tab dan ikon

- [x] Perbarui konfigurasi tab yang sudah ada agar menghubungkan Dashboard/Sanctuary dan Project Roadmap/Map.
- [x] Pilih ikon bertema yang tersedia dan kompatibel dengan SDK; gunakan installer Expo untuk dependency native/Expo bila diperlukan.
- [x] Pastikan label, ikon, warna tab aktif, safe area, dan perpindahan antar-tab berfungsi di web.
- [x] Hapus atau ganti tab starter yang tidak lagi diperlukan tanpa menghapus perilaku layout penting.

**Kriteria lulus:** kedua layar dapat dijangkau dari tab, state dashboard tetap konsisten saat berpindah tab sesuai desain, dan tidak ada route yang hilang.

**Validasi:** `npx tsc --noEmit`, `npm run lint`, serta uji navigasi manual di web dan minimal satu platform native bila tersedia.

**Checkpoint pemulihan:** commit setelah navigasi lulus.

## Checkpoint 6 — Integrasi, aksesibilitas, dan regresi

- [x] Periksa konsistensi warna, tipografi serif pada header, border, tombol, serta ikon.
- [x] Periksa aksesibilitas: label tombol, ukuran area sentuh, kontras, dan informasi status yang tidak hanya dibedakan oleh warna.
- [x] Uji di web: data mock, tambah task (termasuk judul panjang), selesaikan task, batalkan penyelesaian, statistik XP, dan navigasi tab.
- [x] Pastikan tidak ada error console, warning penting, atau perubahan perilaku starter yang tidak disengaja.
- [x] Jalankan `npm run lint`, `npx tsc --noEmit`, dan `npx expo-doctor`; perbaiki isu yang relevan dan kompatibel dengan SDK proyek.
- [x] Catat hal yang belum tercakup (misalnya persistensi lokal) sebagai pekerjaan lanjutan, bukan menambahkan fitur di luar PRD tanpa keputusan.
- [ ] Uji tampilan dan navigasi pada Android/iOS melalui perangkat atau simulator sebelum menyatakan validasi native selesai.

**Kriteria lulus:** seluruh alur utama dan pemeriksaan web selesai. Validasi native masih tertunda karena perangkat/simulator tidak dijalankan pada sesi ini.

**Status:** implementasi dan validasi web selesai; checkpoint belum sepenuhnya ditutup sampai uji Android/iOS dilakukan.

**Checkpoint pemulihan:** simpan commit implementasi web yang telah lulus; tambah commit validasi native setelah pemeriksaan perangkat/simulator.

## Checkpoint 7 — Tambah dan hapus quest (belum dikerjakan)

Checkpoint ini menambahkan hanya fitur Add/Delete yang baru diminta. Jangan mulai checkpoint ini sebelum mendapat instruksi untuk menjalankan pekerjaan. Semua perubahan tetap di state React; jangan menambahkan database atau persistensi.

- [x] Tinjau implementasi Add Quest yang ada dan pertahankan desain serta alur yang sudah dikonfirmasi berjalan; jangan membangun ulang bagian lain.
- [x] Pastikan tombol Add menambah satu quest ke daftar aktif hanya jika judul berisi teks setelah `trim`; pertahankan default kategori, deskripsi, dan XP yang ada tanpa menambah field/form baru.
- [x] Tambahkan aksi Delete pada setiap `TaskItem` untuk quest aktif maupun selesai.
- [x] Saat quest dihapus, keluarkan dari state daftar task; jika quest sudah selesai, pastikan XP, jumlah quest selesai, Gold/statistik turunannya mencerminkan task yang tersisa.
- [x] Pastikan penghapusan quest terakhir menampilkan empty state yang sesuai.
- [x] Pertahankan penyimpanan dalam memori saja: tidak ada database, backend/API, AsyncStorage, atau mekanisme persistensi lain; reload mengembalikan data mock awal.
- [x] Uji tambah judul valid, input kosong/spasi, hapus quest aktif, hapus quest selesai, pembaruan XP/statistik, dan empty state.
- [x] Jalankan `npm run lint` dan `npx tsc --noEmit`, lalu uji alur Add/Delete di web.

**Kriteria lulus:** seluruh acceptance criteria Add/Delete pada PRD terpenuhi; XP/statistik konsisten sesudah penghapusan; tidak ada persistence/database maupun perubahan fitur/desain lain yang tidak diperlukan.

**Validasi:** `npm run lint`, `npx tsc --noEmit`, dan uji manual skenario di atas.

**Status:** selesai. Add/Delete tetap memakai state React lokal; tidak ada database atau persistensi. Uji ulang Add/Delete dan reset data mock setelah reload lulus di web.

**Checkpoint pemulihan:** setelah checkpoint lulus, buat commit terpisah bernama `checkpoint 7: in-memory quest add and delete`. Jika ada kesalahan, pulihkan dari commit terakhir checkpoint yang lulus tanpa membuang pekerjaan lain.

## Urutan pemulihan cepat

- **Bug hanya muncul setelah checkpoint tertentu:** checkout branch pemulihan dari checkpoint terakhir yang lulus, lalu ulangi perubahan sejak checkpoint itu secara bertahap.
- **Perlu membatalkan commit yang sudah dibagikan:** gunakan `git revert <commit>` agar pembatalan tercatat dan tidak menulis ulang riwayat.
- **Belum ada Git:** buat salinan/backup proyek sebelum memulai; inisialisasi Git sebelum checkpoint pertama agar pemulihan per tahap lebih aman.
