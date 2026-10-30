// BAB 6 — Proyek Mini dan Jembatan ke Android Studio
BAB.push({
  id: "bab6", nomor: 6, judul: "Proyek Mini",
  judulLengkap: "Bab 6: Proyek Mini dan Jembatan ke Android Studio",
  deskripsi: "Menggabungkan seluruh konsep pada proyek kecil, sambil melihat padanan kode Kotlin yang dihasilkan.",
  pelajaran: [
    {
      id: "p6-0", judul: "Dari Blok ke Kotlin", mode: "Bacaan", tipe: "bacaan", ct: "abstraksi",
      teori: `
        <p>Konsep yang dipelajari pada App Inventor tidak hilang ketika berpindah ke Android Studio; hanya <strong>notasinya</strong> yang berubah. Susunan blok pada modul ini dapat dibaca sebagai kode Kotlin pada panel <em>Kode</em> di bawah ruang kerja.</p>
        <table class="tbl">
          <thead><tr><th>Konsep</th><th>App Inventor</th><th>Kotlin</th></tr></thead>
          <tbody>
            <tr><td>Variabel</td><td><code>initialize global skor to 0</code></td><td><code>var skor = 0</code></td></tr>
            <tr><td>Event</td><td><code>when Button1.Click</code></td><td><code>button1.setOnClickListener { … }</code></td></tr>
            <tr><td>Percabangan</td><td><code>if … then … else</code></td><td><code>if (…) { … } else { … }</code></td></tr>
            <tr><td>Perulangan</td><td><code>while</code></td><td><code>while (…) { … }</code></td></tr>
            <tr><td>Prosedur</td><td><code>to … do</code></td><td><code>fun … () { … }</code></td></tr>
          </tbody>
        </table>
        <p>Di Android Studio, tampilan tidak disusun dengan menyeret komponen ke ponsel, melainkan ditulis pada berkas <strong>layout XML</strong>, sedangkan logika berada pada <strong>MainActivity.kt</strong>. Pemisahan tampilan dan logika ini sama dengan pemisahan <em>Designer</em> dan <em>Blocks</em>.</p>
        <div class="callout"><strong>Catatan:</strong> kode Kotlin pada modul ini bersifat ilustratif untuk membantu transisi; pembuatan proyek Android Studio sesungguhnya memerlukan konfigurasi tambahan seperti Gradle dan emulator.</div>`,
      cek: [
        { teks: "Di Android Studio, logika program lazimnya ditulis pada berkas…", opsi: ["activity_main.xml", "MainActivity.kt", "AndroidManifest.xml", "build.gradle"], jawaban: 1, pembahasan: "Logika Kotlin ditulis pada kelas Activity, misalnya MainActivity.kt." },
        { teks: "Pemisahan Designer dan Blocks pada App Inventor sepadan dengan pemisahan…", opsi: ["Emulator dan ponsel", "Layout XML dan kode Kotlin", "Variabel dan konstanta", "Prosedur dan fungsi"], jawaban: 1, pembahasan: "Tampilan dideskripsikan pada layout XML, sedangkan logika ditulis pada kode Kotlin." }
      ]
    },
    {
      id: "p6-1", judul: "Kalkulator Sederhana", mode: "Designer + Blocks", ct: "dekomposisi", tabAwal: "blocks",
      izin: { palet: [], blok: ["when_click", "set_prop", "get_prop", "math_op", "number"] },
      awal: { komponen: [{ type: "TextBox", props: { Hint: "Angka A" } }, { type: "TextBox", props: { Hint: "Angka B" } }, { type: "Button", props: { Text: "Tambah" } }, { type: "Button", props: { Text: "Kali" } }, { type: "Label", props: { Text: "Hasil" } }] },
      teori: `
        <p>Proyek ini menggabungkan konsep Bab 3: dua input, dua proses berbeda, dan satu output. Dekomposisinya:</p>
        <ul>
          <li><strong>Button1</strong> → <code>A + B</code></li>
          <li><strong>Button2</strong> → <code>A × B</code></li>
          <li>Hasil keduanya ditampilkan pada <code>Label1</code>.</li>
        </ul>
        <p>Setelah selesai, buka panel <em>Kode</em> untuk melihat dua <code>setOnClickListener</code> yang dihasilkan.</p>`,
      uji: [
        { teks: "Gunakan blok operasi matematika.", cek: a => a.blok("math_op") >= 2 },
        { teks: 'A = 6, B = 3, Button1 → "9".', cek: a => { const r = a.jalan(); r.setText("TextBox1", "6"); r.setText("TextBox2", "3"); r.click("Button1"); return r.get("Label1", "Text") === "9"; } },
        { teks: 'A = 6, B = 3, Button2 → "18".', cek: a => { const r = a.jalan(); r.setText("TextBox1", "6"); r.setText("TextBox2", "3"); r.click("Button2"); return r.get("Label1", "Text") === "18"; } }
      ],
      petunjuk: ["Dua handler terpisah: Button1.Click dan Button2.Click.", "Masing-masing mengatur Label1.Text ke hasil operasi blok Math.", "Operator Button1 adalah +, operator Button2 adalah ×."],
      solusi: { blok: [CLICK("Button1", SET("Label1", "Text", MATH("+", PROP("TextBox1", "Text"), PROP("TextBox2", "Text")))), CLICK("Button2", SET("Label1", "Text", MATH("*", PROP("TextBox1", "Text"), PROP("TextBox2", "Text"))))] }
    },
    {
      id: "p6-2", judul: "Kasir dengan Diskon", mode: "Designer + Blocks", ct: "algoritma", tabAwal: "blocks",
      izin: { palet: [], blok: ["when_click", "set_prop", "get_prop", "if_else", "compare", "math_op", "number"] },
      awal: { komponen: [{ type: "TextBox", props: { Hint: "Total belanja (Rp)" } }, { type: "Button", props: { Text: "Hitung Bayar" } }, { type: "Label", props: { Text: "Bayar" } }] },
      teori: `
        <p>Sebuah toko memberi <strong>diskon 10%</strong> untuk belanja minimal Rp100.000. Aturannya dapat dirumuskan sebagai algoritma:</p>
        <ol>
          <li>Baca total belanja.</li>
          <li>Jika total ≥ 100000, bayar = total × 90 ÷ 100.</li>
          <li>Jika tidak, bayar = total.</li>
        </ol>
        <p>Menghitung 90% sebagai <code>× 90 ÷ 100</code> menghindari bilangan desimal sehingga hasilnya tepat.</p>
        <div class="callout"><strong>Nilai batas:</strong> total tepat 100000 harus mendapat diskon. Karena itu operator yang dipakai ≥, bukan &gt;.</div>
        <p>Setelah lulus, periksa panel <em>Kode</em>: struktur <code>if … else</code> pada Kotlin sepadan dengan blok yang Anda susun.</p>`,
      uji: [
        { teks: "Gunakan blok if–then–else.", cek: a => a.blok("if_else") >= 1 },
        { teks: 'Total 200000 → "180000".', cek: a => { const r = a.jalan(); r.setText("TextBox1", "200000"); r.click("Button1"); return r.get("Label1", "Text") === "180000"; } },
        { teks: 'Total 50000 → "50000" (tanpa diskon).', cek: a => { const r = a.jalan(); r.setText("TextBox1", "50000"); r.click("Button1"); return r.get("Label1", "Text") === "50000"; } },
        { teks: 'Total 100000 (batas) → "90000".', cek: a => { const r = a.jalan(); r.setText("TextBox1", "100000"); r.click("Button1"); return r.get("Label1", "Text") === "90000"; } },
        { teks: "Kode Kotlin memuat struktur if.", cek: a => a.kotlin().indexOf("if (") >= 0 }
      ],
      petunjuk: ["Kondisi: TextBox1.Text ≥ 100000.", "Bagian then: set Label1.Text ke ( ( TextBox1.Text × 90 ) ÷ 100 ).", "Bagian else: set Label1.Text ke TextBox1.Text."],
      solusi: { blok: [CLICK("Button1", IFELSE(CMP(">=", PROP("TextBox1", "Text"), N(100000)), [SET("Label1", "Text", MATH("/", MATH("*", PROP("TextBox1", "Text"), N(90)), N(100)))], [SET("Label1", "Text", PROP("TextBox1", "Text"))]))] }
    },
    {
      id: "p6-3", judul: "Faktorial", mode: "Designer + Blocks", ct: "pola", tabAwal: "blocks",
      izin: { palet: [], blok: ["decl", "set_var", "get_var", "when_click", "set_prop", "get_prop", "while_do", "compare", "math_op", "number"] },
      awal: { komponen: [{ type: "TextBox", props: { Hint: "Nilai N" } }, { type: "Button", props: { Text: "Hitung N!" } }, { type: "Label", props: { Text: "Hasil" } }] },
      teori: `
        <p>Faktorial N (ditulis N!) adalah hasil kali bilangan bulat 1 sampai N. Contoh: 5! = 1 × 2 × 3 × 4 × 5 = 120. Menurut definisi, 0! = 1.</p>
        <p>Polanya serupa dengan penjumlahan 1 sampai N pada Bab 4, tetapi akumulatornya <strong>dimulai dari 1</strong> dan operasinya <strong>perkalian</strong>. Mengenali kemiripan struktur inilah <strong>pengenalan pola</strong>: kerangka perulangan yang sama dipakai ulang dengan perubahan kecil.</p>
        <div class="callout"><strong>Mengapa awalnya 1?</strong> Bilangan 1 adalah elemen identitas perkalian; memulai dari 0 membuat seluruh hasil menjadi 0.</div>`,
      uji: [
        { teks: "Gunakan blok while.", cek: a => a.blok("while_do") >= 1 },
        { teks: 'N = 5 → "120".', cek: a => { const r = a.jalan(); r.setText("TextBox1", "5"); r.click("Button1"); return r.get("Label1", "Text") === "120"; } },
        { teks: 'N = 1 → "1".', cek: a => { const r = a.jalan(); r.setText("TextBox1", "1"); r.click("Button1"); return r.get("Label1", "Text") === "1"; } },
        { teks: 'N = 0 → "1".', cek: a => { const r = a.jalan(); r.setText("TextBox1", "0"); r.click("Button1"); return r.get("Label1", "Text") === "1"; } }
      ],
      petunjuk: ["Dua variabel: i (awal 1) dan hasil (awal 1).", "Awal handler: set i ke 1 dan hasil ke 1.", "while (i ≤ TextBox1.Text) { hasil ← hasil × i ; i ← i + 1 }, lalu set Label1.Text ke hasil."],
      solusi: { blok: [DECL("i", N(1)), DECL("hasil", N(1)), CLICK("Button1", SETV("i", N(1)), SETV("hasil", N(1)), WHILE(CMP("<=", GET("i"), PROP("TextBox1", "Text")), [SETV("hasil", MATH("*", GET("hasil"), GET("i"))), SETV("i", MATH("+", GET("i"), N(1)))]), SET("Label1", "Text", GET("hasil")))] }
    },
    {
      id: "p6-4", judul: "Proyek Akhir: Predikat Nilai", mode: "Designer + Blocks", ct: "algoritma", tabAwal: "blocks",
      izin: { palet: [], blok: ["when_click", "set_prop", "get_prop", "if_else", "compare", "number", "text"] },
      awal: { komponen: [{ type: "TextBox", props: { Hint: "Nilai (0–100)" } }, { type: "Button", props: { Text: "Tentukan Predikat" } }, { type: "Label", props: { Text: "Predikat" } }] },
      teori: `
        <p>Proyek akhir ini menggunakan <strong>percabangan bersarang</strong>: bagian <em>else</em> sebuah <code>if</code> berisi <code>if</code> lain. Aturan predikat:</p>
        <table class="tbl">
          <thead><tr><th>Nilai</th><th>Predikat</th></tr></thead>
          <tbody>
            <tr><td>≥ 80</td><td>A</td></tr>
            <tr><td>≥ 70 dan &lt; 80</td><td>B</td></tr>
            <tr><td>≥ 60 dan &lt; 70</td><td>C</td></tr>
            <tr><td>&lt; 60</td><td>D</td></tr>
          </tbody>
        </table>
        <p>Urutan pemeriksaan penting: periksa dari batas <strong>tertinggi</strong> lebih dahulu. Karena bagian <em>else</em> hanya tercapai bila syarat sebelumnya salah, syarat berikutnya tidak perlu menyebut batas atas.</p>
        <div class="callout"><strong>Padanan Android Studio:</strong> rangkaian <code>if … else if … else</code> atau ekspresi <code>when</code> pada Kotlin.</div>`,
      uji: [
        { teks: "Gunakan percabangan if–then–else.", cek: a => a.blok("if_else") >= 2 },
        { teks: 'Nilai 85 → "A".', cek: a => { const r = a.jalan(); r.setText("TextBox1", "85"); r.click("Button1"); return r.get("Label1", "Text") === "A"; } },
        { teks: 'Nilai 80 (batas) → "A".', cek: a => { const r = a.jalan(); r.setText("TextBox1", "80"); r.click("Button1"); return r.get("Label1", "Text") === "A"; } },
        { teks: 'Nilai 79 → "B".', cek: a => { const r = a.jalan(); r.setText("TextBox1", "79"); r.click("Button1"); return r.get("Label1", "Text") === "B"; } },
        { teks: 'Nilai 65 → "C".', cek: a => { const r = a.jalan(); r.setText("TextBox1", "65"); r.click("Button1"); return r.get("Label1", "Text") === "C"; } },
        { teks: 'Nilai 59 → "D".', cek: a => { const r = a.jalan(); r.setText("TextBox1", "59"); r.click("Button1"); return r.get("Label1", "Text") === "D"; } }
      ],
      petunjuk: ["Gunakan tiga blok if–else yang bersarang pada bagian else.", "Periksa ≥ 80 → A; di bagian else periksa ≥ 70 → B; di bagian else periksa ≥ 60 → C; sisanya D.", "Gunakan ≥ pada setiap kondisi agar nilai batas masuk predikat yang benar."],
      solusi: { blok: [CLICK("Button1", IFELSE(CMP(">=", PROP("TextBox1", "Text"), N(80)), [SET("Label1", "Text", T("A"))], [IFELSE(CMP(">=", PROP("TextBox1", "Text"), N(70)), [SET("Label1", "Text", T("B"))], [IFELSE(CMP(">=", PROP("TextBox1", "Text"), N(60)), [SET("Label1", "Text", T("C"))], [SET("Label1", "Text", T("D"))])])]))] }
    }
  ],
  soal: [
    { level: "c1", ct: "abstraksi", teks: "Berkas yang mendeskripsikan tampilan pada Android Studio disebut…", opsi: ["MainActivity.kt", "Layout XML", "Gradle", "Emulator"], jawaban: 1, pembahasan: "Tampilan dideskripsikan pada berkas layout XML, misalnya activity_main.xml." },
    { level: "c1", ct: "algoritma", teks: "Padanan if–then–else pada Kotlin adalah…", opsi: ["if (…) { … } else { … }", "repeat(…)", "fun …()", "var …"], jawaban: 0, pembahasan: "Struktur percabangan pada Kotlin memakai if … else." },
    { level: "c1", ct: "algoritma", teks: "Faktorial 4 (4!) bernilai…", opsi: ["10", "16", "24", "4"], jawaban: 2, pembahasan: "4! = 1 × 2 × 3 × 4 = 24." },
    { level: "c2", ct: "abstraksi", teks: "Apa persamaan Designer–Blocks pada App Inventor dengan layout XML–Kotlin pada Android Studio?", opsi: ["Keduanya memisahkan tampilan dari logika", "Keduanya hanya berisi variabel", "Keduanya tidak memakai komponen", "Keduanya hanya untuk perulangan"], jawaban: 0, pembahasan: "Kedua pasangan memisahkan deskripsi tampilan dari logika program." },
    { level: "c2", ct: "pola", teks: "Mengapa akumulator faktorial dimulai dari 1, bukan 0?", opsi: ["Agar perulangan lebih cepat", "Karena 1 adalah elemen identitas perkalian; memulai dari 0 membuat hasil selalu 0", "Karena App Inventor melarang 0", "Agar hasilnya berupa teks"], jawaban: 1, pembahasan: "Perkalian dengan 0 selalu 0, sehingga nilai awal harus 1." },
    { level: "c3", ct: "algoritma", teks: "Belanja Rp100.000 mendapat diskon 10%. Total bayar untuk belanja Rp100.000 adalah…", opsi: ["Rp100.000", "Rp90.000", "Rp110.000", "Rp10.000"], jawaban: 1, pembahasan: "Belanja tepat pada batas mendapat diskon: 100000 × 90 ÷ 100 = 90000." },
    { level: "c3", ct: "algoritma", teks: "Pada predikat nilai (A ≥ 80, B ≥ 70, C ≥ 60, selain itu D), nilai 70 memperoleh predikat…", opsi: ["A", "B", "C", "D"], jawaban: 1, pembahasan: "70 tidak memenuhi ≥ 80, tetapi memenuhi ≥ 70 sehingga predikatnya B." },
    { level: "c3", ct: "dekomposisi", teks: "Kalkulator dengan dua tombol operasi paling tepat dipecah menjadi…", opsi: ["Dua TextBox sebagai input, satu handler per operasi, satu Label sebagai output", "Satu Label saja", "Satu TextBox dan satu variabel", "Tiga Screen"], jawaban: 0, pembahasan: "Pembagian input, proses per operasi, dan output menjaga setiap bagian tetap sederhana." },
    { level: "c4", ct: "algoritma", teks: "Pada percabangan bersarang predikat nilai, pemeriksaan ≥ 60 diletakkan sebelum ≥ 80. Nilai 90 akan memperoleh predikat…", opsi: ["A", "C", "D", "Kesalahan"], jawaban: 1, pembahasan: "Syarat ≥ 60 terpenuhi lebih dulu sehingga 90 keliru diberi predikat C. Pemeriksaan harus dimulai dari batas tertinggi." },
    { level: "c4", ct: "pola", teks: "Penjumlahan 1 sampai N dan faktorial N memiliki kerangka perulangan yang sama. Perbedaan utama keduanya adalah…", opsi: ["Jenis komponen yang dipakai", "Nilai awal akumulator dan operasi yang dilakukan", "Jumlah tombol", "Warna Label"], jawaban: 1, pembahasan: "Penjumlahan dimulai dari 0 dengan operasi +, sedangkan faktorial dimulai dari 1 dengan operasi ×." }
  ]
});
