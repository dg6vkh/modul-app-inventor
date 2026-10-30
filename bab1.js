// BAB 1 — Mengenal MIT App Inventor dan Designer
BAB.push({
  id: "bab1", nomor: 1, judul: "Mengenal Designer",
  judulLengkap: "Bab 1: Mengenal MIT App Inventor dan Designer",
  deskripsi: "Memahami peta belajar App Inventor ke Android Studio, lalu menyusun tampilan dari komponen dan properti.",
  pelajaran: [
    {
      id: "p1-0", judul: "Peta Konsep: App Inventor dan Android Studio", mode: "Bacaan", tipe: "bacaan", ct: "abstraksi",
      teori: `
        <p>Modul ini menggunakan <strong>MIT App Inventor</strong> sebagai jembatan menuju <strong>Android Studio</strong>. App Inventor menyusun program dari blok visual, sedangkan Android Studio menuliskannya sebagai kode (Kotlin) dan berkas tampilan (XML). Konsep yang dipelajari sama: komponen, event, variabel, percabangan, perulangan, dan prosedur. Yang berbeda hanyalah cara menuliskannya.</p>
        <table class="tbl">
          <thead><tr><th>Aspek</th><th>MIT App Inventor</th><th>Android Studio</th></tr></thead>
          <tbody>
            <tr><td>Bahasa</td><td>Blok visual</td><td>Kotlin atau Java</td></tr>
            <tr><td>Menyusun tampilan</td><td>Designer</td><td>Layout XML (<code>activity_main.xml</code>)</td></tr>
            <tr><td>Menyusun logika</td><td>Blocks Editor</td><td><code>MainActivity.kt</code></td></tr>
            <tr><td>Menguji aplikasi</td><td>Emulator atau perangkat</td><td>Emulator atau perangkat</td></tr>
            <tr><td>Fokus belajar</td><td>Logika dan alur program</td><td>Struktur proyek dan API Android</td></tr>
          </tbody>
        </table>
        <p>Pembelajaran disusun mengikuti empat komponen <em>computational thinking</em>:</p>
        <ul>
          <li><strong>Dekomposisi</strong> — memecah masalah menjadi bagian kecil.</li>
          <li><strong>Pengenalan pola</strong> — mengenali kemiripan antarmasalah.</li>
          <li><strong>Abstraksi</strong> — fokus pada hal yang penting dan menyembunyikan detail.</li>
          <li><strong>Algoritma</strong> — menyusun langkah penyelesaian secara berurutan.</li>
        </ul>
        <div class="callout"><strong>Alur tiap pelajaran praktik:</strong> baca teori singkat → susun komponen atau blok → tekan ▶ Jalankan → tekan ✓ Periksa Jawaban. Panel "Padanan di Android Studio" menampilkan kode setara dari karya Anda.</div>`,
      cek: [
        { teks: "Pada Android Studio, berkas yang menggambarkan susunan tampilan layar adalah…", opsi: ["MainActivity.kt", "activity_main.xml", "gradle.properties", "R.java"], jawaban: 1, pembahasan: "Susunan tampilan ditulis pada berkas layout XML, setara dengan hasil kerja di Designer." },
        { teks: "Mengapa konsep logika di App Inventor berguna sebelum belajar Android Studio?", opsi: ["Karena konsep dasarnya (event, variabel, percabangan, perulangan) dipakai kembali pada Kotlin", "Karena Android Studio tidak memakai variabel", "Karena App Inventor otomatis membuat proyek Android Studio", "Karena Kotlin tidak memiliki perulangan"], jawaban: 0, pembahasan: "Yang berubah hanya cara menuliskannya; konsep pemrogramannya sama." }
      ]
    },
    {
      id: "p1-1", judul: "Halo, Layar!", mode: "Designer", ct: "dekomposisi", tabAwal: "designer",
      izin: { blocks: false, palet: ["Button", "Label"], maks: 6 },
      awal: { komponen: [] },
      teori: `
        <p>MIT App Inventor adalah platform pengembangan aplikasi Android berbasis blok. Pekerjaan dibagi menjadi dua ruang kerja: <strong>Designer</strong> untuk menyusun tampilan dan <strong>Blocks</strong> untuk menyusun logika. Pelajaran ini berlangsung di Designer.</p>
        <p>Aplikasi tersusun atas <strong>komponen</strong>. <code>Button</code> menerima sentuhan dan <code>Label</code> menampilkan teks. Setiap komponen memiliki <strong>properti</strong> (misalnya <code>Text</code>) yang dapat diubah pada panel Properties.</p>
        <div class="callout"><strong>Dekomposisi:</strong> memecah aplikasi menjadi komponen-komponen kecil adalah langkah pertama dalam merancang tampilan.</div>
        <div class="callout"><strong>Padanan Android Studio:</strong> Designer setara dengan berkas layout XML. Button menjadi <code>&lt;Button&gt;</code> dan Label menjadi <code>&lt;TextView&gt;</code>. Bukalah panel "Padanan di Android Studio" di bawah editor untuk melihat hasilnya.</div>
        <p><em>Cara kerja:</em> klik atau seret komponen dari Palette ke layar ponsel, pilih komponen pada daftar Components, kemudian ubah propertinya.</p>`,
      uji: [
        { teks: "Tambahkan satu komponen Button.", cek: a => a.jumlah("Button") >= 1 },
        { teks: "Tambahkan satu komponen Label.", cek: a => a.jumlah("Label") >= 1 },
        { teks: 'Ubah properti Text pada Label1 menjadi "Halo, Dunia!".', cek: a => String(a.prop("Label1", "Text") || "").toLowerCase().includes("halo") }
      ],
      petunjuk: ["Klik item Button pada Palette, lalu item Label.", "Pilih Label1 pada daftar Components; kolom Text ada pada panel Properties.", "Hapus teks bawaan, lalu ketik: Halo, Dunia!"],
      solusi: { komponen: ["Button", { type: "Label", props: { Text: "Halo, Dunia!" } }] }
    },
    {
      id: "p1-2", judul: "Mengatur Properti", mode: "Designer", ct: "abstraksi", tabAwal: "designer",
      izin: { blocks: false, palet: [], maks: 6 },
      awal: { komponen: ["Button", "Label"] },
      teori: `
        <p>Properti adalah pengaturan yang menentukan rupa dan perilaku komponen. Anda cukup memilih nilai, sedangkan proses menggambar tombol atau menata huruf ditangani oleh sistem. Inilah <strong>abstraksi</strong>: detail implementasi disembunyikan sehingga perhatian dapat tertuju pada hal yang penting.</p>
        <p>Properti yang umum digunakan:</p>
        <ul>
          <li><code>Text</code> — isi teks yang tampil.</li>
          <li><code>BackgroundColor</code> dan <code>TextColor</code> — warna latar dan warna huruf.</li>
          <li><code>FontSize</code> — ukuran huruf.</li>
          <li><code>Visible</code> dan <code>Enabled</code> — tampil/tersembunyi dan aktif/nonaktif.</li>
        </ul>
        <div class="callout"><strong>Padanan Android Studio:</strong> properti menjadi atribut XML seperti <code>android:text</code>, <code>android:textSize</code>, dan <code>android:textColor</code>. Perhatikan panel kode saat Anda mengubah nilai.</div>`,
      uji: [
        { teks: 'Ubah Text pada Button1 menjadi "Mulai".', cek: a => String(a.prop("Button1", "Text") || "").trim().toLowerCase() === "mulai" },
        { teks: "Ubah BackgroundColor pada Button1 menjadi Biru.", cek: a => a.prop("Button1", "BackgroundColor") === "#2563EB" },
        { teks: "Ubah FontSize pada Label1 menjadi 20 atau lebih.", cek: a => Number(a.prop("Label1", "FontSize")) >= 20 }
      ],
      petunjuk: ["Pilih Button1 lebih dahulu, kemudian gunakan panel Properties.", "BackgroundColor dipilih dari daftar warna, bukan diketik.", "FontSize berupa angka; coba 24."],
      solusi: { komponen: [{ type: "Button", props: { Text: "Mulai", BackgroundColor: "#2563EB" } }, { type: "Label", props: { FontSize: 24 } }] }
    },
    {
      id: "p1-4", judul: "Visible dan Enabled", mode: "Designer", ct: "abstraksi", tabAwal: "designer",
      izin: { blocks: false, palet: [], maks: 6 },
      awal: { komponen: [{ type: "Button", props: { Text: "Kirim" } }, { type: "Button", props: { Text: "Hapus" } }, { type: "Label", props: { Text: "Saya akan disembunyikan" } }] },
      teori: `
        <p>Dua properti Boolean mengatur perilaku komponen tanpa menulis logika apa pun:</p>
        <ul>
          <li><code>Enabled</code> — bila tidak dicentang, tombol tetap terlihat tetapi tidak dapat disentuh.</li>
          <li><code>Visible</code> — bila tidak dicentang, komponen tidak tampil saat aplikasi berjalan.</li>
        </ul>
        <p>Pada Designer, komponen yang <em>tidak</em> Visible tetap ada di daftar Components. Centang ikon mata di atas ponsel (<em>Display hidden components</em>) bila Anda ingin melihatnya kembali di Viewer.</p>
        <div class="callout"><strong>Padanan Android Studio:</strong> <code>android:enabled="false"</code> dan <code>android:visibility="gone"</code>. Perhatikan kedua atribut itu muncul pada panel kode setelah Anda mengubah properti.</div>`,
      uji: [
        { teks: "Nonaktifkan Button1 (hilangkan centang Enabled).", cek: a => a.prop("Button1", "Enabled") === false },
        { teks: "Sembunyikan Label1 (hilangkan centang Visible).", cek: a => a.prop("Label1", "Visible") === false },
        { teks: "Pastikan Button2 tetap aktif dan tampil.", cek: a => a.prop("Button2", "Enabled") === true && a.prop("Button2", "Visible") === true }
      ],
      petunjuk: ["Pilih Button1 pada daftar Components; Enabled berada pada kelompok Behavior.", "Visible berada pada kelompok Appearance milik Label1.", "Jangan ubah Button2."],
      solusi: { komponen: [{ type: "Button", props: { Text: "Kirim", Enabled: false } }, { type: "Button", props: { Text: "Hapus" } }, { type: "Label", props: { Text: "Saya akan disembunyikan", Visible: false } }] }
    },
    {
      id: "p1-5", judul: "Merancang Formulir Masuk", mode: "Designer", ct: "dekomposisi", tabAwal: "designer",
      izin: { blocks: false, palet: ["Label", "TextBox", "Button"], maks: 6 },
      awal: { komponen: [] },
      teori: `
        <p>Sebelum menyusun komponen, <strong>pecah dulu kebutuhan layar</strong>. Formulir masuk membutuhkan: judul, kolom nama pengguna, kolom kata sandi, dan tombol masuk. Setiap bagian dipenuhi oleh satu komponen:</p>
        <table class="tbl">
          <thead><tr><th>Kebutuhan</th><th>Komponen</th></tr></thead>
          <tbody>
            <tr><td>Judul formulir</td><td>Label</td></tr>
            <tr><td>Kolom nama pengguna dan kata sandi</td><td>TextBox ×2</td></tr>
            <tr><td>Tombol masuk</td><td>Button</td></tr>
          </tbody>
        </table>
        <p>Properti <code>Hint</code> pada TextBox menampilkan petunjuk samar yang hilang saat pengguna mengetik.</p>
        <div class="callout"><strong>Padanan Android Studio:</strong> TextBox menjadi <code>&lt;EditText&gt;</code> dengan atribut <code>android:hint</code>.</div>`,
      uji: [
        { teks: "Tambahkan dua komponen TextBox.", cek: a => a.jumlah("TextBox") >= 2 },
        { teks: 'Tambahkan satu Button dengan Text "Masuk".', cek: a => a.jumlah("Button") >= 1 && String(a.prop("Button1", "Text") || "").trim().toLowerCase() === "masuk" },
        { teks: 'Isi Hint TextBox1 dengan "Nama pengguna" dan TextBox2 dengan "Kata sandi".', cek: a => String(a.prop("TextBox1", "Hint") || "").trim().toLowerCase() === "nama pengguna" && String(a.prop("TextBox2", "Hint") || "").trim().toLowerCase() === "kata sandi" },
        { teks: "Tambahkan satu Label sebagai judul formulir.", cek: a => a.jumlah("Label") >= 1 }
      ],
      petunjuk: ["Tambahkan komponen satu per satu dari Palette.", "Hint ada pada kelompok Appearance milik TextBox.", "Hasil akhirnya: 1 Label, 2 TextBox, 1 Button."],
      solusi: { komponen: [{ type: "Label", props: { Text: "Masuk ke Aplikasi", FontSize: 22 } }, { type: "TextBox", props: { Hint: "Nama pengguna" } }, { type: "TextBox", props: { Hint: "Kata sandi" } }, { type: "Button", props: { Text: "Masuk" } }] }
    }
  ],
  soal: [
    { level: "c1", ct: "dekomposisi", teks: "Ruang kerja pada App Inventor yang digunakan untuk menyusun tampilan aplikasi disebut…", opsi: ["Blocks Editor", "Designer", "Emulator", "Companion"], jawaban: 1, pembahasan: "Designer digunakan untuk menempatkan komponen dan mengatur tampilan; logika disusun di Blocks Editor." },
    { level: "c1", ct: "abstraksi", teks: "Komponen yang berfungsi menampilkan teks dan tidak dapat diubah langsung oleh pengguna adalah…", opsi: ["Button", "Label", "TextBox", "Screen"], jawaban: 1, pembahasan: "Label menampilkan teks. TextBox menerima ketikan pengguna, sedangkan Button menerima sentuhan." },
    { level: "c1", ct: "abstraksi", teks: "Panel pada Designer yang dipakai untuk mengubah Text dan BackgroundColor sebuah komponen adalah…", opsi: ["Palette", "Components", "Properties", "Media"], jawaban: 2, pembahasan: "Panel Properties memuat seluruh properti komponen yang sedang dipilih." },
    { level: "c2", ct: "abstraksi", teks: "Mengapa pengaturan properti seperti BackgroundColor dapat dikategorikan sebagai abstraksi?", opsi: ["Karena pengembang menulis kode mesin secara langsung", "Karena pengembang cukup memilih nilai tanpa mengurus proses penggambaran di balik layar", "Karena properti tidak dapat diubah", "Karena properti hanya ada pada komponen non-visible"], jawaban: 1, pembahasan: "Abstraksi menyembunyikan detail implementasi; pengembang hanya berurusan dengan nilai properti yang relevan." },
    { level: "c2", ct: "dekomposisi", teks: "Sebuah aplikasi perlu menampilkan pertanyaan, kolom jawaban, dan tombol kirim. Pemilihan komponen Label, TextBox, dan Button mencerminkan komponen CT…", opsi: ["Dekomposisi", "Evaluasi", "Rekursi", "Enkripsi"], jawaban: 0, pembahasan: "Kebutuhan aplikasi dipecah menjadi bagian-bagian fungsional yang masing-masing dipenuhi satu komponen." },
    { level: "c2", ct: "pola", teks: "Properti Visible pada sebuah komponen berfungsi untuk…", opsi: ["Mengubah warna huruf", "Menentukan komponen tampil atau tersembunyi", "Mengubah ukuran huruf", "Menghapus komponen dari proyek"], jawaban: 1, pembahasan: "Visible bernilai Boolean: tercentang berarti tampil, tidak tercentang berarti tersembunyi saat aplikasi berjalan." },
    { level: "c3", ct: "pola", teks: "Anda telah mengatur Button1 (teks, warna, ukuran huruf). Untuk Button2 dengan gaya yang sama, langkah yang paling mencerminkan pengenalan pola adalah…", opsi: ["Merancang gaya baru dari nol", "Mengulang urutan pengaturan properti yang sama pada Button2", "Menghapus Button1", "Mengganti Button dengan Label"], jawaban: 1, pembahasan: "Mengenali bahwa tugasnya sama dengan yang pernah diselesaikan memungkinkan solusi lama dipakai ulang." },
    { level: "c3", ct: "dekomposisi", teks: "Formulir masuk membutuhkan kolom pengguna, kolom sandi, dan tombol. Komponen yang paling tepat secara berurutan adalah…", opsi: ["Label, Label, Button", "TextBox, TextBox, Button", "Button, Button, Label", "TextBox, Label, Label"], jawaban: 1, pembahasan: "Kolom isian memakai TextBox karena menerima ketikan; tombol memakai Button." },
    { level: "c4", ct: "abstraksi", teks: "Seorang mahasiswa memakai TextBox untuk menampilkan hasil perhitungan yang tidak boleh diubah pengguna. Analisis yang paling tepat adalah…", opsi: ["Tepat, karena TextBox paling fleksibel", "Kurang tepat, karena pengguna dapat mengetik di TextBox; Label lebih sesuai untuk keluaran", "Tepat, karena Label tidak dapat menampilkan angka", "Tidak ada perbedaan antara keduanya"], jawaban: 1, pembahasan: "Pemilihan komponen mengikuti perannya: TextBox untuk masukan, Label untuk keluaran yang tidak perlu diedit." },
    { level: "c4", ct: "abstraksi", teks: "Sebuah tombol terlihat di layar tetapi tidak merespons sentuhan. Properti yang paling mungkin menjadi penyebabnya adalah…", opsi: ["Enabled tidak dicentang", "Text berisi huruf besar", "FontSize terlalu kecil", "BackgroundColor berwarna biru"], jawaban: 0, pembahasan: "Enabled = false membuat komponen tetap tampil tetapi tidak dapat disentuh." }
  ]
});
