// BAB 2 — Event dan Urutan Aksi
BAB.push({
  id: "bab2", nomor: 2, judul: "Event & Aksi",
  judulLengkap: "Bab 2: Event dan Urutan Aksi",
  deskripsi: "Menghubungkan kejadian (event) dengan serangkaian aksi pada Blocks Editor.",
  pelajaran: [
    {
      id: "p2-0", judul: "Pemrograman Berbasis Event", mode: "Bacaan", tipe: "bacaan", ct: "algoritma",
      teori: `
        <p>Aplikasi Android tidak berjalan dari baris pertama hingga terakhir lalu berhenti. Aplikasi <strong>menunggu</strong> hingga sesuatu terjadi, misalnya pengguna menyentuh tombol, lalu menjalankan kode yang sesuai. Kejadian itu disebut <strong>event</strong>, dan kode yang menanganinya disebut <strong>event handler</strong>.</p>
        <p>Satu interaksi dasar selalu terdiri dari tiga bagian:</p>
        <table class="tbl">
          <thead><tr><th>Bagian</th><th>Contoh pada App Inventor</th><th>Padanan Kotlin</th></tr></thead>
          <tbody>
            <tr><td>Komponen pemicu</td><td>Button1</td><td><code>button1</code></td></tr>
            <tr><td>Event</td><td><code>when Button1.Click</code></td><td><code>setOnClickListener { … }</code></td></tr>
            <tr><td>Aksi</td><td><code>set Label1.Text to …</code></td><td><code>label1.text = …</code></td></tr>
          </tbody>
        </table>
        <p>Di dalam satu handler, blok dijalankan <strong>berurutan dari atas ke bawah</strong>. Mengubah urutan dapat mengubah hasil akhir; inilah wujud nyata sebuah algoritma.</p>
        <div class="callout"><strong>Dua event yang dipakai pada bab ini:</strong> <code>Button.Click</code> (dipicu sentuhan) dan <code>Screen1.Initialize</code> (dijalankan sekali saat layar dibuka).</div>`,
      cek: [
        { teks: "Kode di dalam when Button1.Click dijalankan ketika…", opsi: ["aplikasi pertama kali dibuka", "Button1 ditekan", "Button1 dihapus", "layar diputar"], jawaban: 1, pembahasan: "Event handler hanya berjalan ketika event yang dimaksud terjadi." },
        { teks: "Tiga bagian yang membentuk satu interaksi dasar adalah…", opsi: ["Komponen pemicu, event, dan aksi", "Variabel, perulangan, dan kompilasi", "XML, Gradle, dan Manifest", "Teks, angka, dan warna"], jawaban: 0, pembahasan: "Komponen memicu event, dan event menjalankan aksi." }
      ]
    },
    {
      id: "p1-3", judul: "Event Pertama", mode: "Designer + Blocks", ct: "algoritma", tabAwal: "blocks",
      izin: { palet: [], blok: ["when_click", "set_prop", "text"] },
      awal: { komponen: [{ type: "Button", props: { Text: "Sapa Saya" } }, { type: "Label", props: { Text: "Belum disapa" } }] },
      teori: `
        <p>Tampilan saja belum membuat aplikasi hidup. Logika disusun pada tab <strong>Blocks</strong>. Pola dasarnya: <strong>ketika terjadi sesuatu (event), lakukan sesuatu (aksi)</strong>.</p>
        <p>Blok <code>when Button1.Click</code> adalah <em>event handler</em>. Blok di dalamnya hanya dijalankan ketika Button1 ditekan, bukan saat aplikasi dibuka.</p>
        <div class="callout"><strong>Cara menyusun:</strong> (1) klik <em>Button1</em> pada daftar di sisi kiri editor Blocks, lalu seret <code>when Button1.Click</code> ke area kerja; (2) klik <em>Label1</em> dan seret <code>set Label1.Text to</code> ke dalam slot <em>do</em>; (3) buka <em>Text</em> pada kelompok Built-in, seret blok teks ke soket <em>to</em>, dan ketik isinya. Bila tidak ingin menyeret, klik slot tujuan terlebih dahulu, kemudian klik blok pada daftar.</div>
        <div class="callout"><strong>Padanan Android Studio:</strong> event handler menjadi <code>button1.setOnClickListener { … }</code>.</div>
        <p>Tekan <strong>▶ Jalankan</strong> untuk mencoba aplikasi pada ponsel simulasi.</p>`,
      uji: [
        { teks: "Susun blok when Button1.Click.", cek: a => a.blok("when_click") >= 1 },
        { teks: 'Menekan Button1 mengubah Label1.Text menjadi "Selamat Datang".', cek: a => { const r = a.jalan(); r.click("Button1"); return r.get("Label1", "Text") === "Selamat Datang"; } },
        { teks: 'Sebelum tombol ditekan, Label1 masih bertuliskan "Belum disapa".', cek: a => a.jalan().get("Label1", "Text") === "Belum disapa" }
      ],
      petunjuk: ["Blok when Button1.Click berada pada laci Button1 (hijau).", "Blok set Label1.Text to harus berada di dalam slot do milik event.", "Isi blok teks persis: Selamat Datang (huruf kapital pada S dan D)."],
      solusi: { blok: [CLICK("Button1", SET("Label1", "Text", T("Selamat Datang")))] }
    },
    {
      id: "p2-1", judul: "Dua Tombol, Dua Aksi", mode: "Designer + Blocks", ct: "pola", tabAwal: "blocks",
      izin: { palet: [], blok: ["when_click", "set_prop", "text", "color"] },
      awal: { komponen: [{ type: "Button", props: { Text: "Nyalakan" } }, { type: "Button", props: { Text: "Matikan" } }, { type: "Label", props: { Text: "Lampu mati", BackgroundColor: "#9CA3AF", FontSize: 20 } }] },
      teori: `
        <p>Satu aplikasi dapat memiliki banyak event handler, masing-masing untuk satu komponen. Di dalam satu handler, blok dijalankan <strong>berurutan dari atas ke bawah</strong>; itulah sebuah algoritma.</p>
        <p>Pada latihan ini Label berperan sebagai lampu. Perhatikan bahwa kedua handler memiliki <strong>bentuk yang sama</strong> dan hanya berbeda pada nilai (warna dan teks). Mengenali kemiripan struktur seperti ini disebut <strong>pengenalan pola</strong>; setelah handler pertama selesai, handler kedua dapat dibuat dengan pola yang sama.</p>
        <div class="callout"><strong>Menyusun beberapa aksi:</strong> tambahkan blok <code>set</code> kedua tepat di bawah blok pertama dalam slot <em>do</em>. Blok yang dijatuhkan pada separuh atas/bawah blok lain akan disisipkan sebelum/sesudahnya.</div>
        <p>Properti warna menggunakan blok dari kategori <em>Colors</em>.</p>`,
      uji: [
        { teks: 'Button1 mengubah teks Label1 menjadi "Lampu menyala".', cek: a => { const r = a.jalan(); r.click("Button1"); return r.get("Label1", "Text") === "Lampu menyala"; } },
        { teks: "Button1 mengubah BackgroundColor Label1 menjadi Kuning.", cek: a => { const r = a.jalan(); r.click("Button1"); return r.get("Label1", "BackgroundColor") === "#F59E0B"; } },
        { teks: 'Button2 mengembalikan Label1 menjadi Abu-abu dengan teks "Lampu mati" (setelah Button1 ditekan).', cek: a => { const r = a.jalan(); r.click("Button1"); if (r.get("Label1", "Text") !== "Lampu menyala") return false; r.click("Button2"); return r.get("Label1", "BackgroundColor") === "#9CA3AF" && r.get("Label1", "Text") === "Lampu mati"; } }
      ],
      petunjuk: ["Butuh dua blok when …Click: satu dari laci Button1 dan satu dari laci Button2.", "Setiap handler berisi dua blok set: satu untuk Text, satu untuk BackgroundColor.", "Kuning dan Abu-abu tersedia pada kategori Colors."],
      solusi: { blok: [CLICK("Button1", SET("Label1", "BackgroundColor", COL("#F59E0B")), SET("Label1", "Text", T("Lampu menyala"))), CLICK("Button2", SET("Label1", "BackgroundColor", COL("#9CA3AF")), SET("Label1", "Text", T("Lampu mati")))] }
    },
    {
      id: "p2-2", judul: "Saat Aplikasi Dimulai", mode: "Designer + Blocks", ct: "algoritma", tabAwal: "blocks",
      izin: { palet: [], blok: ["when_init", "when_click", "set_prop", "text"] },
      awal: { komponen: ["Button", "Label"] },
      teori: `
        <p>Tidak semua aksi dipicu oleh sentuhan pengguna. Blok <code>when Screen1.Initialize</code> dijalankan <strong>satu kali</strong> ketika layar pertama kali dibuka, sehingga cocok untuk menyiapkan kondisi awal aplikasi.</p>
        <p>Urutan kejadian pada aplikasi ini: (1) aplikasi dibuka → Initialize berjalan; (2) pengguna menekan tombol → Click berjalan. Memahami urutan kejadian adalah bagian dari berpikir algoritmik.</p>
        <div class="callout"><strong>Padanan Android Studio:</strong> Initialize setara dengan isi <code>onCreate()</code> pada <code>MainActivity</code>.</div>`,
      uji: [
        { teks: "Susun blok when Screen1.Initialize.", cek: a => a.blok("when_init") >= 1 },
        { teks: 'Saat aplikasi mulai: Label1.Text = "Selamat Datang" dan Button1.Text = "Mulai".', cek: a => { const r = a.jalan(); return r.get("Label1", "Text") === "Selamat Datang" && r.get("Button1", "Text") === "Mulai"; } },
        { teks: 'Menekan Button1 mengubah Label1.Text menjadi "Dimulai!".', cek: a => { const r = a.jalan(); r.click("Button1"); return r.get("Label1", "Text") === "Dimulai!"; } }
      ],
      petunjuk: ["Blok Initialize berada pada laci Screen1.", "Initialize berisi dua blok set; Click berisi satu blok set.", "Pastikan teks persis sama, termasuk tanda seru pada Dimulai!"],
      solusi: { blok: [INIT(SET("Label1", "Text", T("Selamat Datang")), SET("Button1", "Text", T("Mulai"))), CLICK("Button1", SET("Label1", "Text", T("Dimulai!")))] }
    },
    {
      id: "p2-3", judul: "Mengubah Tampilan Lewat Blok", mode: "Designer + Blocks", ct: "abstraksi", tabAwal: "blocks",
      izin: { palet: [], blok: ["when_click", "set_prop", "color", "number", "text"] },
      awal: { komponen: [{ type: "Button", props: { Text: "Ubah Gaya" } }, { type: "Label", props: { Text: "Halo" } }] },
      teori: `
        <p>Properti yang pada Designer diatur dengan tangan dapat diubah <strong>saat aplikasi berjalan</strong> melalui blok <code>set Komponen.Properti to</code>. Dengan demikian tampilan bereaksi terhadap tindakan pengguna.</p>
        <p>Nilai yang dimasukkan harus sesuai jenis properti:</p>
        <ul>
          <li><code>BackgroundColor</code> dan <code>TextColor</code> memakai blok warna (kategori <em>Colors</em>).</li>
          <li><code>FontSize</code> memakai blok angka (kategori <em>Math</em>).</li>
          <li><code>Text</code> memakai blok teks (kategori <em>Text</em>).</li>
        </ul>
        <div class="callout"><strong>Tugas:</strong> saat Button1 ditekan, Label1 berlatar Merah, berhuruf Putih, dan berukuran 30. Dropdown pada blok <code>set</code> memilih properti yang diubah.</div>`,
      uji: [
        { teks: "Sebelum tombol ditekan, FontSize Label1 masih 14.", cek: a => a.jalan().get("Label1", "FontSize") === 14 },
        { teks: "Button1 mengubah BackgroundColor Label1 menjadi Merah.", cek: a => { const r = a.jalan(); r.click("Button1"); return r.get("Label1", "BackgroundColor") === "#EF4444"; } },
        { teks: "Button1 mengubah TextColor Label1 menjadi Putih.", cek: a => { const r = a.jalan(); r.click("Button1"); return r.get("Label1", "TextColor") === "#FFFFFF"; } },
        { teks: "Button1 mengubah FontSize Label1 menjadi 30.", cek: a => { const r = a.jalan(); r.click("Button1"); return r.get("Label1", "FontSize") === 30; } }
      ],
      petunjuk: ["Satu handler Button1.Click berisi tiga blok set (satu per properti).", "Pada blok set, pilih properti lewat dropdown: BackgroundColor, TextColor, FontSize.", "Merah dan Putih ada pada kategori Colors; angka 30 pada kategori Math."],
      solusi: { blok: [CLICK("Button1", SET("Label1", "BackgroundColor", COL("#EF4444")), SET("Label1", "TextColor", COL("#FFFFFF")), SET("Label1", "FontSize", N(30)))] }
    },
    {
      id: "p2-4", judul: "Menampilkan dan Menyembunyikan", mode: "Designer + Blocks", ct: "pola", tabAwal: "blocks",
      izin: { palet: [], blok: ["when_click", "set_prop", "bool"] },
      awal: { komponen: [{ type: "Button", props: { Text: "Sembunyikan" } }, { type: "Button", props: { Text: "Tampilkan" } }, { type: "Label", props: { Text: "Saya terlihat" } }] },
      teori: `
        <p>Properti <code>Visible</code> bernilai <strong>Boolean</strong>: hanya <code>true</code> atau <code>false</code>. Nilainya diberikan dengan blok <code>true</code> atau <code>false</code> dari kategori <em>Logic</em>.</p>
        <p>Latihan ini memakai dua handler berpola sama. Yang membedakan hanyalah nilai Boolean yang diberikan: <code>false</code> untuk menyembunyikan dan <code>true</code> untuk menampilkan.</p>
        <div class="callout"><strong>Padanan Android Studio:</strong> <code>label1.visibility = if (false) View.VISIBLE else View.GONE</code> pada kode yang dihasilkan panel.</div>`,
      uji: [
        { teks: "Saat aplikasi mulai, Label1 tampil.", cek: a => a.jalan().get("Label1", "Visible") === true },
        { teks: "Button1 menyembunyikan Label1.", cek: a => { const r = a.jalan(); r.click("Button1"); return r.get("Label1", "Visible") === false; } },
        { teks: "Button2 menampilkan kembali Label1 setelah disembunyikan.", cek: a => { const r = a.jalan(); r.click("Button1"); if (r.get("Label1", "Visible") !== false) return false; r.click("Button2"); return r.get("Label1", "Visible") === true; } }
      ],
      petunjuk: ["Perlu dua handler: Button1.Click dan Button2.Click.", "Pada blok set, pilih properti Visible.", "Blok false dan true ada pada kategori Logic."],
      solusi: { blok: [CLICK("Button1", SET("Label1", "Visible", B("bool", { val: "false" }))), CLICK("Button2", SET("Label1", "Visible", B("bool", { val: "true" })))] }
    },
    {
      id: "p2-5", judul: "Event dan Debugging", mode: "Bacaan", tipe: "bacaan", ct: "algoritma",
      teori: `
        <p>Pada pemrograman berbasis event, <strong>alur</strong> eksekusi ditentukan oleh kejadian, bukan oleh urutan baris dari atas ke bawah. Rangkaian yang terjadi ketika pengguna menekan tombol adalah:</p>
        <ol>
          <li>Pengguna menyentuh <code>Button1</code>.</li>
          <li>Sistem memicu event <code>Button1.Click</code>.</li>
          <li>Blok di dalam <code>when Button1.Click</code> dijalankan <strong>berurutan dari atas ke bawah</strong>.</li>
          <li>Setelah blok terakhir selesai, aplikasi kembali menunggu event berikutnya.</li>
        </ol>
        <p>Konsekuensinya, sebuah blok yang <strong>tidak berada di dalam handler</strong> (dan bukan deklarasi variabel atau prosedur) tidak memiliki pemicu sehingga tidak pernah dijalankan. Handler juga tidak berjalan sendiri: ia hanya aktif ketika event yang dimaksud terjadi.</p>
        <p><strong>Debugging</strong> adalah proses menemukan dan memperbaiki kesalahan. Kesalahan yang paling sering muncul pada bab ini adalah sebagai berikut.</p>
        <table class="tbl">
          <thead><tr><th>Gejala</th><th>Penyebab yang lazim</th></tr></thead>
          <tbody>
            <tr><td>Tombol ditekan, tidak ada perubahan</td><td>Blok set berada di luar handler, atau handler dipasang pada komponen yang salah</td></tr>
            <tr><td>Perubahan terjadi pada komponen yang salah</td><td>Nama komponen pada blok set keliru (misalnya Label2, bukan Label1)</td></tr>
            <tr><td>Tampilan tidak berubah seperti diharapkan</td><td>Properti yang dipilih pada dropdown salah (misalnya TextColor, bukan BackgroundColor)</td></tr>
            <tr><td>Hasil akhir tidak sesuai</td><td>Urutan blok terbalik sehingga nilai akhir menimpa nilai yang diharapkan</td></tr>
          </tbody>
        </table>
        <div class="callout"><strong>Strategi menelusuri:</strong> (1) tentukan hasil yang diharapkan; (2) tekan ▶ Jalankan dan amati hasil nyata; (3) periksa berurutan: apakah blok berada di dalam handler, apakah komponen dan properti sudah benar, apakah urutannya tepat; (4) ubah <em>satu hal</em> pada satu waktu, lalu uji ulang; (5) baca pesan pada konsol.</div>`,
      cek: [
        { teks: "Blok set Label1.Text yang diletakkan di luar event handler akan…", opsi: ["Dijalankan saat aplikasi dibuka", "Tidak dijalankan karena tidak ada event yang memicunya", "Dijalankan setiap detik", "Menghapus Label1"], jawaban: 1, pembahasan: "Blok aksi memerlukan pemicu. Di luar handler, tidak ada kejadian yang menjalankannya." },
        { teks: "Tombol ditekan, tetapi Label2 yang berubah, padahal yang diharapkan Label1. Pemeriksaan pertama yang paling tepat adalah…", opsi: ["Mengganti tombol dengan Label", "Memeriksa nama komponen pada blok set", "Menghapus seluruh blok", "Mengubah FontSize"], jawaban: 1, pembahasan: "Gejala perubahan pada komponen yang salah menunjuk pada nama komponen sasaran di blok set." },
        { teks: "Prinsip penting dalam debugging adalah mengubah…", opsi: ["Sebanyak mungkin hal sekaligus", "Satu hal pada satu waktu, lalu menguji ulang", "Hanya tampilan di Designer", "Hanya nama proyek"], jawaban: 1, pembahasan: "Dengan satu perubahan per percobaan, penyebab perbaikan dapat dipastikan." }
      ]
    },
    {
      id: "p2-6", judul: "Tiga Tombol Warna", mode: "Designer + Blocks", ct: "pola", tabAwal: "blocks",
      izin: { palet: [], blok: ["when_click", "set_prop", "color"] },
      awal: { komponen: [{ type: "Button", props: { Text: "Merah" } }, { type: "Button", props: { Text: "Hijau" } }, { type: "Button", props: { Text: "Biru" } }, { type: "Label", props: { Text: "Pilih warna latar" } }] },
      teori: `
        <p>Tiga tombol di bawah memiliki <strong>pola</strong> yang sama: setiap tombol mengubah <code>BackgroundColor</code> milik <code>Label1</code>, dan hanya warnanya yang berbeda. Mengenali pola ini membuat tiga handler dapat disusun dengan kerangka yang identik.</p>
        <ul>
          <li><code>Button1</code> (Merah) → Label1 berlatar Merah</li>
          <li><code>Button2</code> (Hijau) → Label1 berlatar Hijau</li>
          <li><code>Button3</code> (Biru) → Label1 berlatar Biru</li>
        </ul>
        <div class="callout"><strong>Perhatikan:</strong> ketiga handler mengubah properti yang sama, sehingga warna yang tampil adalah warna dari tombol <em>yang ditekan terakhir</em>. Uji otomatis memeriksa hal ini melalui urutan klik.</div>
        <div class="callout"><strong>Padanan Android Studio:</strong> tiga pemanggilan <code>setOnClickListener</code> yang masing-masing mengubah latar <code>label1</code>.</div>`,
      uji: [
        { teks: "Sebelum tombol ditekan, Label1 belum berlatar warna (bawaan).", cek: a => a.jalan().get("Label1", "BackgroundColor") === "none" },
        { teks: "Button1 mengubah latar Label1 menjadi Merah.", cek: a => { const r = a.jalan(); r.click("Button1"); return r.get("Label1", "BackgroundColor") === "#EF4444"; } },
        { teks: "Button2 mengubah latar Label1 menjadi Hijau.", cek: a => { const r = a.jalan(); r.click("Button2"); return r.get("Label1", "BackgroundColor") === "#10B981"; } },
        { teks: "Button3 mengubah latar Label1 menjadi Biru.", cek: a => { const r = a.jalan(); r.click("Button3"); return r.get("Label1", "BackgroundColor") === "#2563EB"; } },
        { teks: "Klik Button1 lalu Button3: warna akhir Biru.", cek: a => { const r = a.jalan(); r.click("Button1"); r.click("Button3"); return r.get("Label1", "BackgroundColor") === "#2563EB"; } }
      ],
      petunjuk: ["Perlu tiga handler: Button1.Click, Button2.Click, dan Button3.Click.", "Masing-masing berisi satu blok set Label1.BackgroundColor.", "Warna Merah, Hijau, dan Biru ada pada kategori Colors."],
      solusi: { blok: [CLICK("Button1", SET("Label1", "BackgroundColor", COL("#EF4444"))), CLICK("Button2", SET("Label1", "BackgroundColor", COL("#10B981"))), CLICK("Button3", SET("Label1", "BackgroundColor", COL("#2563EB")))] }
    }
  ],
  soal: [
    { level: "c1", ct: "algoritma", teks: "Blok yang menjalankan perintah di dalamnya ketika sebuah tombol ditekan adalah…", opsi: ["when Screen1.Initialize", "initialize global", "when Button1.Click", "repeat"], jawaban: 2, pembahasan: "when Button1.Click adalah event handler yang aktif saat Button1 ditekan." },
    { level: "c1", ct: "dekomposisi", teks: "Event yang berjalan satu kali ketika aplikasi pertama kali dibuka adalah…", opsi: ["Screen1.Initialize", "Button1.Click", "Label1.Text", "TextBox1.Hint"], jawaban: 0, pembahasan: "Screen1.Initialize cocok untuk menyiapkan kondisi awal aplikasi." },
    { level: "c1", ct: "algoritma", teks: "Kejadian seperti sentuhan pada tombol disebut…", opsi: ["Properti", "Event", "Variabel", "Komponen non-visible"], jawaban: 1, pembahasan: "Event adalah peristiwa yang terjadi saat aplikasi berjalan, yang kemudian ditangani oleh event handler." },
    { level: "c2", ct: "algoritma", teks: "Mengapa urutan blok di dalam satu event handler penting?", opsi: ["Karena blok dijalankan acak", "Karena blok dijalankan dari atas ke bawah sehingga urutan memengaruhi hasil", "Karena hanya blok pertama yang dijalankan", "Karena urutan tidak berpengaruh"], jawaban: 1, pembahasan: "Instruksi dijalankan berurutan; mengubah urutan dapat mengubah hasil akhir." },
    { level: "c2", ct: "algoritma", teks: "Event handler yang slot do-nya kosong akan…", opsi: ["Menyebabkan aplikasi berhenti", "Tidak melakukan apa pun ketika event terjadi", "Menjalankan event lain", "Menghapus komponen"], jawaban: 1, pembahasan: "Tanpa blok di dalamnya, tidak ada aksi yang dijalankan saat event terjadi." },
    { level: "c3", ct: "algoritma", teks: "Anda ingin Label1 berwarna latar Kuning saat Button1 ditekan. Susunan yang tepat adalah…", opsi: ["set Label1.BackgroundColor to Kuning (di luar event)", "when Label1.Click do set Button1.BackgroundColor to Kuning", "when Button1.Click do set Label1.BackgroundColor to Kuning", "when Screen1.Initialize do set Button1.Text to Kuning"], jawaban: 2, pembahasan: "Pemicunya Button1.Click, dan sasaran perubahannya adalah properti BackgroundColor milik Label1." },
    { level: "c3", ct: "pola", teks: "Handler tombol Nyalakan dan Matikan memiliki struktur sama dan hanya berbeda pada warna dan teks. Mengenali kesamaan ini adalah…", opsi: ["Dekomposisi", "Pengenalan pola", "Debugging", "Kompilasi"], jawaban: 1, pembahasan: "Struktur yang berulang dengan variasi nilai merupakan pola yang dapat dipakai ulang." },
    { level: "c3", ct: "pola", teks: "Saat tombol ditekan, Label harus berlatar merah dan berukuran huruf 30. Jumlah blok set minimal yang dibutuhkan adalah…", opsi: ["1", "2", "3", "0"], jawaban: 1, pembahasan: "Satu blok set untuk BackgroundColor dan satu blok set untuk FontSize." },
    { level: "c4", ct: "algoritma", teks: "Dalam satu handler, blok pertama men-set Label1.Text menjadi \"Memuat\" dan blok kedua men-set menjadi \"Selesai\". Teks yang akhirnya terlihat pengguna adalah…", opsi: ["Memuat", "Memuat Selesai", "Selesai", "Kosong"], jawaban: 2, pembahasan: "Blok dijalankan berurutan; nilai terakhir menimpa nilai sebelumnya, sehingga yang tampil adalah Selesai." },
    { level: "c4", ct: "algoritma", teks: "Label1 awalnya tampil. Button1 men-set Label1.Visible ke false, Button2 men-set ke true. Pengguna menekan Button1, Button1, lalu Button2. Keadaan akhir Label1 adalah…", opsi: ["Tersembunyi", "Tampil", "Menimbulkan kesalahan", "Berkedip"], jawaban: 1, pembahasan: "Dua kali false tetap false; Button2 kemudian mengubahnya menjadi true sehingga Label tampil." },
    { level: "c1", ct: "dekomposisi", teks: "Komponen yang paling lazim memicu event Click pada modul ini adalah…", opsi: ["Label", "Button", "Screen saja", "Clock saja"], jawaban: 1, pembahasan: "Button menerima sentuhan dan memicu event Click." },
    { level: "c2", ct: "algoritma", teks: "Blok set yang diletakkan di luar event handler tidak berpengaruh karena…", opsi: ["Blok set hanya berlaku pada Label", "Tidak ada event yang memicu pelaksanaannya", "Blok set selalu menimbulkan kesalahan", "App Inventor menghapusnya otomatis"], jawaban: 1, pembahasan: "Aksi dijalankan sebagai respons terhadap event. Tanpa handler, tidak ada pemicu." },
    { level: "c3", ct: "algoritma", teks: "Setelah tombol ditekan, Label1 tidak berubah, padahal blok set mengubah Label2.Text. Langkah penelusuran yang paling tepat adalah…", opsi: ["Menambah ukuran huruf Label1", "Memeriksa dan mengoreksi nama komponen sasaran pada blok set", "Menghapus Button1", "Mengganti warna latar ponsel"], jawaban: 1, pembahasan: "Sasaran perubahan ditentukan oleh nama komponen pada blok set. Bila salah, komponen lain yang berubah." },
    { level: "c3", ct: "pola", teks: "Tiga tombol masing-masing mengubah warna latar Label yang sama dengan warna berbeda. Jumlah event handler yang dibutuhkan adalah…", opsi: ["1", "2", "3", "0"], jawaban: 2, pembahasan: "Setiap tombol memiliki event Click sendiri sehingga dibutuhkan tiga handler berpola sama." },
    { level: "c4", ct: "algoritma", teks: "Button1 mengubah latar Label1 menjadi Merah, Button2 menjadi Hijau. Pengguna menekan Button2, Button1, lalu Button2. Warna akhir Label1 adalah…", opsi: ["Merah", "Hijau", "Merah dan Hijau bergantian", "Tidak berwarna"], jawaban: 1, pembahasan: "Setiap klik menimpa nilai sebelumnya. Klik terakhir adalah Button2 sehingga warna akhirnya Hijau." }
  ]
});