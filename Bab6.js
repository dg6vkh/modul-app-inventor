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
      id: "p6-5", judul: "Struktur Proyek Android Studio", mode: "Bacaan", tipe: "bacaan", ct: "dekomposisi",
      teori: `
        <p>Proyek Android Studio terdiri atas banyak berkas, tetapi hanya sebagian kecil yang berkaitan langsung dengan latihan pada modul ini. Memahami pembagian tugas tiap berkas membantu Anda memetakan karya App Inventor ke proyek sesungguhnya. Pembagian ini merupakan contoh <strong>dekomposisi</strong>: satu aplikasi dipecah menjadi tampilan, logika, konfigurasi, dan sumber daya.</p>
        <table class="tbl">
          <thead><tr><th>Berkas atau folder</th><th>Peran</th><th>Padanan pada App Inventor</th></tr></thead>
          <tbody>
            <tr><td><code>res/layout/activity_main.xml</code></td><td>Mendeskripsikan susunan tampilan</td><td>Designer</td></tr>
            <tr><td><code>MainActivity.kt</code></td><td>Logika program dalam bahasa Kotlin</td><td>Blocks Editor</td></tr>
            <tr><td><code>AndroidManifest.xml</code></td><td>Mendeklarasikan komponen aplikasi (misalnya Activity) dan izin</td><td>Pengaturan proyek dan izin</td></tr>
            <tr><td><code>res/values/strings.xml</code></td><td>Menyimpan teks yang dipakai pada antarmuka</td><td>Properti Text pada komponen</td></tr>
            <tr><td><code>build.gradle</code> atau <code>build.gradle.kts</code></td><td>Konfigurasi proses build dan dependensi</td><td>Tidak ada; App Inventor mengelolanya otomatis</td></tr>
          </tbody>
        </table>
        <p><strong>Siklus awal Activity.</strong> Ketika layar dibuka, Android memanggil fungsi <code>onCreate</code> pada Activity. Di dalamnya, <code>setContentView(R.layout.activity_main)</code> memasang berkas layout ke layar. Peran ini sepadan dengan <code>when Screen1.Initialize</code> pada App Inventor.</p>
        <p><strong>Menghubungkan tampilan dan logika.</strong> Setiap komponen pada layout XML diberi atribut <code>android:id</code>. Pada Kotlin, komponen dengan id tersebut diambil menggunakan <code>findViewById</code> sehingga propertinya dapat dibaca dan diubah. Pada App Inventor, hubungan ini otomatis karena blok langsung merujuk nama komponen.</p>
        <div class="callout"><strong>Implikasi belajar:</strong> kemampuan yang dilatih di sini, yaitu merancang alur, memakai variabel, percabangan, perulangan, dan prosedur, tetap dipakai utuh pada Android Studio. Yang bertambah adalah sintaks, konfigurasi proyek, dan pengelolaan berkas.</div>`,
      cek: [
        { teks: "Berkas yang mendeskripsikan susunan tampilan pada proyek Android Studio adalah…", opsi: ["MainActivity.kt", "activity_main.xml", "build.gradle", "strings.xml"], jawaban: 1, pembahasan: "Susunan tampilan dideskripsikan pada berkas layout XML, misalnya activity_main.xml." },
        { teks: "Fungsi yang dipanggil Android ketika sebuah Activity dibuat adalah…", opsi: ["onCreate", "onClick", "main", "setText"], jawaban: 0, pembahasan: "onCreate dipanggil saat Activity dibuat dan dipakai untuk menyiapkan tampilan awal." },
        { teks: "Atribut yang dipakai untuk memberi nama komponen pada layout XML agar dapat diakses dari Kotlin adalah…", opsi: ["android:text", "android:id", "android:visibility", "android:enabled"], jawaban: 1, pembahasan: "android:id memberi pengenal komponen sehingga dapat diambil melalui findViewById." }
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
      id: "p6-6", judul: "Klasifikasi IMT", mode: "Designer + Blocks", ct: "algoritma", tabAwal: "blocks",
      izin: { palet: [], blok: ["when_click", "set_prop", "get_prop", "if_else", "compare", "math_op", "number", "text"] },
      awal: { komponen: [{ type: "TextBox", props: { Hint: "Berat (kg)" } }, { type: "TextBox", props: { Hint: "Tinggi (m)" } }, { type: "Button", props: { Text: "Hitung IMT" } }, { type: "Label", props: { Text: "Kategori" } }] },
      teori: `
        <p>Indeks Massa Tubuh (IMT) dihitung dengan rumus <code>berat ÷ (tinggi × tinggi)</code>, dengan berat dalam kilogram dan tinggi dalam meter. Pada latihan ini, kategori ditentukan oleh dua batas:</p>
        <table class="tbl">
          <thead><tr><th>IMT</th><th>Kategori</th></tr></thead>
          <tbody>
            <tr><td>&lt; 18,5</td><td>Kurus</td></tr>
            <tr><td>≥ 18,5 dan &lt; 25</td><td>Normal</td></tr>
            <tr><td>≥ 25</td><td>Berlebih</td></tr>
          </tbody>
        </table>
        <p>Latihan ini menggabungkan operasi hitung bersarang dengan <strong>percabangan bersarang</strong>. Ekspresi IMT dipakai pada dua kondisi, sehingga ditulis pada kedua perbandingan.</p>
        <div class="callout"><strong>Catatan:</strong> klasifikasi ini disederhanakan untuk keperluan latihan logika dan tidak dimaksudkan sebagai penilaian kesehatan.</div>
        <div class="callout"><strong>Padanan Android Studio:</strong> <code>val imt = berat / (tinggi * tinggi)</code> diikuti rangkaian <code>if … else if … else</code>.</div>`,
      uji: [
        { teks: "Gunakan percabangan bersarang (minimal dua if–else).", cek: a => a.blok("if_else") >= 2 },
        { teks: 'Berat 50 dan tinggi 1,7 → "Kurus".', cek: a => { const r = a.jalan(); r.setText("TextBox1", "50"); r.setText("TextBox2", "1.7"); r.click("Button1"); return r.get("Label1", "Text") === "Kurus"; } },
        { teks: 'Berat 65 dan tinggi 1,7 → "Normal".', cek: a => { const r = a.jalan(); r.setText("TextBox1", "65"); r.setText("TextBox2", "1.7"); r.click("Button1"); return r.get("Label1", "Text") === "Normal"; } },
        { teks: 'Berat 90 dan tinggi 1,7 → "Berlebih".', cek: a => { const r = a.jalan(); r.setText("TextBox1", "90"); r.setText("TextBox2", "1.7"); r.click("Button1"); return r.get("Label1", "Text") === "Berlebih"; } }
      ],
      petunjuk: ["Ekspresi IMT: TextBox1.Text ÷ ( TextBox2.Text × TextBox2.Text ).", "Kondisi pertama: IMT < 18.5 → Kurus. Pada bagian else, kondisi kedua: IMT < 25 → Normal, selain itu Berlebih.", "Ulangi ekspresi IMT pada kedua blok perbandingan."],
      solusi: { blok: [CLICK("Button1", IFELSE(CMP("<", MATH("/", PROP("TextBox1", "Text"), MATH("*", PROP("TextBox2", "Text"), PROP("TextBox2", "Text"))), N(18.5)), [SET("Label1", "Text", T("Kurus"))], [IFELSE(CMP("<", MATH("/", PROP("TextBox1", "Text"), MATH("*", PROP("TextBox2", "Text"), PROP("TextBox2", "Text"))), N(25)), [SET("Label1", "Text", T("Normal"))], [SET("Label1", "Text", T("Berlebih"))])]))] }
    },
    {
      id: "p6-7", judul: "Bilangan Fibonacci ke-N", mode: "Designer + Blocks", ct: "pola", tabAwal: "blocks",
      izin: { palet: [], blok: ["decl", "set_var", "get_var", "when_click", "set_prop", "get_prop", "while_do", "compare", "math_op", "number"] },
      awal: { komponen: [{ type: "TextBox", props: { Hint: "Nilai N" } }, { type: "Button", props: { Text: "Hitung" } }, { type: "Label", props: { Text: "Hasil" } }] },
      teori: `
        <p>Deret Fibonacci diawali 1, 1, 2, 3, 5, 8, 13, … dengan aturan: setiap suku adalah jumlah dua suku sebelumnya. Suku ke-5 bernilai 5 dan suku ke-10 bernilai 55.</p>
        <p>Algoritma iteratif memakai tiga variabel: <code>a</code> (suku sebelumnya, awal 0), <code>b</code> (suku sekarang, awal 1), dan <code>i</code> (nomor suku, awal 1). Selama <code>i &lt; N</code>:</p>
        <ol>
          <li>Hitung <code>t = a + b</code>.</li>
          <li>Geser nilai: <code>a = b</code>, lalu <code>b = t</code>.</li>
          <li>Naikkan <code>i</code> sebanyak 1.</li>
        </ol>
        <p>Setelah perulangan, hasilnya adalah <code>b</code>. Tabel jejak untuk N = 5:</p>
        <table class="tbl">
          <thead><tr><th>Iterasi</th><th>i (awal)</th><th>a</th><th>b</th></tr></thead>
          <tbody>
            <tr><td>awal</td><td>1</td><td>0</td><td>1</td></tr>
            <tr><td>1</td><td>2</td><td>1</td><td>1</td></tr>
            <tr><td>2</td><td>3</td><td>1</td><td>2</td></tr>
            <tr><td>3</td><td>4</td><td>2</td><td>3</td></tr>
            <tr><td>4</td><td>5</td><td>3</td><td>5</td></tr>
          </tbody>
        </table>
        <div class="callout"><strong>Urutan penugasan menentukan hasil.</strong> Jika <code>a</code> diisi dari <code>b</code> sebelum <code>t</code> dihitung, nilai lama hilang. Pola ini sama dengan pelajaran menukar dua nilai pada Bab 3.</div>`,
      uji: [
        { teks: "Gunakan blok while.", cek: a => a.blok("while_do") >= 1 },
        { teks: 'N = 1 → "1".', cek: a => { const r = a.jalan(); r.setText("TextBox1", "1"); r.click("Button1"); return r.get("Label1", "Text") === "1"; } },
        { teks: 'N = 5 → "5".', cek: a => { const r = a.jalan(); r.setText("TextBox1", "5"); r.click("Button1"); return r.get("Label1", "Text") === "5"; } },
        { teks: 'N = 10 → "55".', cek: a => { const r = a.jalan(); r.setText("TextBox1", "10"); r.click("Button1"); return r.get("Label1", "Text") === "55"; } },
        { teks: 'Klik kedua dengan N = 5 tetap "5" (variabel di-reset).', cek: a => { const r = a.jalan(); r.setText("TextBox1", "10"); r.click("Button1"); r.setText("TextBox1", "5"); r.click("Button1"); return r.get("Label1", "Text") === "5"; } }
      ],
      petunjuk: ["Buat empat variabel global: a, b, i, dan t (sementara).", "Awal handler: a = 0, b = 1, i = 1.", "while (i < TextBox1.Text) { t ← a + b ; a ← b ; b ← t ; i ← i + 1 }, lalu set Label1.Text ke b."],
      solusi: { blok: [DECL("a", N(0)), DECL("b", N(1)), DECL("i", N(1)), DECL("t", N(0)), CLICK("Button1", SETV("a", N(0)), SETV("b", N(1)), SETV("i", N(1)), WHILE(CMP("<", GET("i"), PROP("TextBox1", "Text")), [SETV("t", MATH("+", GET("a"), GET("b"))), SETV("a", GET("b")), SETV("b", GET("t")), SETV("i", MATH("+", GET("i"), N(1)))]), SET("Label1", "Text", GET("b")))] }
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
    { level: "c4", ct: "pola", teks: "Penjumlahan 1 sampai N dan faktorial N memiliki kerangka perulangan yang sama. Perbedaan utama keduanya adalah…", opsi: ["Jenis komponen yang dipakai", "Nilai awal akumulator dan operasi yang dilakukan", "Jumlah tombol", "Warna Label"], jawaban: 1, pembahasan: "Penjumlahan dimulai dari 0 dengan operasi +, sedangkan faktorial dimulai dari 1 dengan operasi ×." },
    { level: "c1", ct: "dekomposisi", teks: "Berkas konfigurasi yang mendeklarasikan komponen aplikasi dan izin pada proyek Android adalah…", opsi: ["AndroidManifest.xml", "activity_main.xml", "MainActivity.kt", "strings.xml"], jawaban: 0, pembahasan: "AndroidManifest.xml mendeklarasikan komponen seperti Activity dan izin yang dibutuhkan aplikasi." },
    { level: "c2", ct: "abstraksi", teks: "Pada Kotlin, hubungan antara komponen pada layout XML dan kodenya dibangun melalui…", opsi: ["Atribut android:id dan pengambilan komponen dengan id tersebut", "Nama berkas Gradle", "Warna latar komponen", "Jumlah baris kode"], jawaban: 0, pembahasan: "Komponen diberi android:id, lalu diambil pada kode (misalnya dengan findViewById) agar propertinya dapat diubah." },
    { level: "c3", ct: "algoritma", teks: "Dengan rumus IMT = berat ÷ (tinggi × tinggi), berat 81 kg dan tinggi 1,8 m menghasilkan IMT sebesar…", opsi: ["15", "25", "45", "81"], jawaban: 1, pembahasan: "1,8 × 1,8 = 3,24; 81 ÷ 3,24 = 25." },
    { level: "c3", ct: "pola", teks: "Suku ke-6 deret Fibonacci 1, 1, 2, 3, 5, … adalah…", opsi: ["6", "8", "9", "13"], jawaban: 1, pembahasan: "Deret berlanjut 1, 1, 2, 3, 5, 8; suku ke-6 bernilai 8." },
    { level: "c4", ct: "algoritma", teks: "Pada algoritma Fibonacci, urutan a ← b dilakukan sebelum t ← a + b. Akibat yang paling tepat adalah…", opsi: ["Hasil tetap benar", "Nilai a yang lama hilang sehingga jumlah yang dihitung keliru", "Perulangan tidak berhenti", "Label tidak menampilkan apa pun"], jawaban: 1, pembahasan: "Penugasan a ← b menimpa nilai a sebelum dipakai menghitung t, sehingga t tidak lagi menjumlahkan dua suku sebelumnya yang benar." }
  ]
});