// BAB 3 — Variabel, Input, dan Operasi
BAB.push({
  id: "bab3", nomor: 3, judul: "Variabel & Operasi",
  judulLengkap: "Bab 3: Variabel, Input, dan Operasi",
  deskripsi: "Menyimpan data pada variabel, membaca input TextBox, menggabungkan teks, dan menghitung.",
  pelajaran: [
    {
      id: "p3-0", judul: "Tipe Data dan Variabel", mode: "Bacaan", tipe: "bacaan", ct: "abstraksi",
      teori: `
        <p>Setiap nilai dalam program memiliki <strong>tipe data</strong>. Tiga tipe yang dipakai pada modul ini:</p>
        <table class="tbl">
          <thead><tr><th>Tipe</th><th>Contoh</th><th>Dibuat dengan blok</th></tr></thead>
          <tbody>
            <tr><td>Teks (string)</td><td>"Halo"</td><td>Text</td></tr>
            <tr><td>Angka</td><td>7, 2.5</td><td>Math</td></tr>
            <tr><td>Boolean</td><td>true, false</td><td>Logic</td></tr>
          </tbody>
        </table>
        <p><strong>Variabel</strong> adalah wadah bernama untuk menyimpan nilai. Variabel dibuat dengan <code>initialize global … to</code>, dibaca dengan <code>get global …</code>, dan diubah dengan <code>set global … to</code>. Nama yang bermakna, seperti <code>skor</code> atau <code>total</code>, membuat program mudah dipahami.</p>
        <p>Beberapa operasi dasar yang akan dipakai:</p>
        <ul>
          <li><code>+  −  ×  ÷</code> dan <code>mod</code> (sisa pembagian) untuk angka.</li>
          <li><code>join</code> untuk menggabungkan dua teks.</li>
          <li>Blok properti seperti <code>TextBox1.Text</code> untuk membaca isian pengguna. Isian selalu berupa teks, tetapi akan dibaca sebagai angka bila dipakai pada operasi hitung.</li>
        </ul>
        <div class="callout"><strong>Padanan Android Studio:</strong> <code>var skor = 0</code> untuk variabel dan <code>editText1.text.toString()</code> untuk membaca isian.</div>`,
      cek: [
        { teks: "Nilai true atau false termasuk tipe data…", opsi: ["Teks", "Angka", "Boolean", "Warna"], jawaban: 2, pembahasan: "Boolean hanya memiliki dua nilai: true dan false." },
        { teks: "Blok yang dipakai untuk menggabungkan dua teks adalah…", opsi: ["join", "repeat", "if", "set global"], jawaban: 0, pembahasan: "join menggabungkan dua teks menjadi satu." }
      ]
    },
    {
      id: "p3-1", judul: "Variabel Penghitung", mode: "Designer + Blocks", ct: "abstraksi", tabAwal: "blocks",
      izin: { palet: [], blok: ["decl", "set_var", "get_var", "math_op", "number", "when_click", "set_prop", "text"] },
      awal: { komponen: [{ type: "Button", props: { Text: "Tambah Skor" } }, { type: "Label", props: { Text: "0" } }] },
      teori: `
        <p><strong>Variabel</strong> adalah tempat penyimpanan data bernama. Pada App Inventor, variabel dibuat dengan blok <code>initialize global … to</code> di luar event handler, kemudian dibaca dengan <code>get global …</code> dan diubah dengan <code>set global … to</code>.</p>
        <p>Nama variabel yang bermakna (misalnya <code>skor</code>) merupakan bentuk <strong>abstraksi</strong>: pembaca program memahami peran data tanpa melacak nilainya.</p>
        <div class="callout"><strong>Menambah satu:</strong> <code>set global skor to ( get global skor + 1 )</code>. Nilai lama dibaca, ditambah 1, lalu disimpan kembali.</div>
        <div class="callout"><strong>Padanan Android Studio:</strong> <code>var skor = 0</code> pada kelas, dan <code>skor = (skor + 1)</code> pada handler.</div>
        <p>Ubah nama variabel dengan mengetik pada blok <em>initialize global</em>, misalnya <code>skor</code>.</p>`,
      uji: [
        { teks: "Buat variabel global dengan blok initialize global.", cek: a => a.blok("decl") >= 1 },
        { teks: 'Setelah 1 kali klik, Label1.Text = "1".', cek: a => { const r = a.jalan(); r.click("Button1"); return r.get("Label1", "Text") === "1"; } },
        { teks: 'Setelah 3 kali klik, Label1.Text = "3".', cek: a => { const r = a.jalan(); r.click("Button1"); r.click("Button1"); r.click("Button1"); return r.get("Label1", "Text") === "3"; } }
      ],
      petunjuk: ["Mulai dari initialize global skor to 0 (kategori Variables).", "Handler berisi dua blok: set global skor, lalu set Label1.Text.", "Isi set global dengan blok + (kategori Math): get global skor di kiri, angka 1 di kanan."],
      solusi: { blok: [DECL("skor", N(0)), CLICK("Button1", SETV("skor", MATH("+", GET("skor"), N(1))), SET("Label1", "Text", GET("skor")))] }
    },
    {
      id: "p3-2", judul: "Input → Proses → Output", mode: "Designer + Blocks", ct: "dekomposisi", tabAwal: "blocks",
      izin: { palet: [], blok: ["when_click", "set_prop", "get_prop", "math_op", "number", "text"] },
      awal: { komponen: [{ type: "TextBox", props: { Hint: "Angka pertama" } }, { type: "TextBox", props: { Hint: "Angka kedua" } }, { type: "Button", props: { Text: "Jumlahkan" } }, { type: "Label", props: { Text: "Hasil" } }] },
      teori: `
        <p>Banyak aplikasi mengikuti struktur <strong>input → proses → output</strong>. Memecah masalah menjadi tiga bagian ini adalah <strong>dekomposisi</strong>:</p>
        <ul>
          <li><strong>Input</strong> — <code>TextBox1.Text</code> dan <code>TextBox2.Text</code> (dibaca dengan blok properti).</li>
          <li><strong>Proses</strong> — penjumlahan menggunakan blok <code>+</code>.</li>
          <li><strong>Output</strong> — hasil ditampilkan pada <code>Label1.Text</code>.</li>
        </ul>
        <p>Blok properti seperti <code>TextBox1.Text</code> berada pada laci komponennya (klik <em>TextBox1</em> di sisi kiri); pilih properti <em>Text</em> melalui dropdown pada blok. Pada mode Jalankan, Anda dapat mengetik angka pada TextBox di ponsel simulasi.</p>
        <div class="callout"><strong>Padanan Android Studio:</strong> <code>editText1.text.toString().toDouble()</code> membaca input pada Kotlin.</div>`,
      uji: [
        { teks: "Gunakan blok penjumlahan (Math).", cek: a => a.blok("math_op") >= 1 },
        { teks: 'Input 7 dan 5, tekan tombol → Label1.Text = "12".', cek: a => { const r = a.jalan(); r.setText("TextBox1", "7"); r.setText("TextBox2", "5"); r.click("Button1"); return r.get("Label1", "Text") === "12"; } },
        { teks: 'Input 10 dan 2.5 → Label1.Text = "12.5".', cek: a => { const r = a.jalan(); r.setText("TextBox1", "10"); r.setText("TextBox2", "2.5"); r.click("Button1"); return r.get("Label1", "Text") === "12.5"; } }
      ],
      petunjuk: ["Susun: when Button1.Click → set Label1.Text to ( … + … ).", "Dua soket blok + diisi blok properti: TextBox1.Text (dari laci TextBox1) dan TextBox2.Text (dari laci TextBox2).", "Pastikan operatornya +, bukan × atau lainnya."],
      solusi: { blok: [CLICK("Button1", SET("Label1", "Text", MATH("+", PROP("TextBox1", "Text"), PROP("TextBox2", "Text"))))] }
    },
    {
      id: "p3-3", judul: "Menggabungkan Teks", mode: "Designer + Blocks", ct: "abstraksi", tabAwal: "blocks",
      izin: { palet: [], blok: ["when_click", "set_prop", "get_prop", "join", "text"] },
      awal: { komponen: [{ type: "TextBox", props: { Hint: "Nama Anda" } }, { type: "Button", props: { Text: "Sapa" } }, { type: "Label", props: { Text: "Hasil" } }] },
      teori: `
        <p>Blok <code>join</code> menggabungkan <strong>dua</strong> teks menjadi satu. Untuk menggabungkan tiga bagian, tempatkan sebuah <code>join</code> di dalam soket <code>join</code> lainnya (bersarang).</p>
        <p>Contoh: kalimat "Halo, Budi!" terdiri dari tiga bagian: <code>"Halo, "</code>, isi TextBox, dan <code>"!"</code>. Bagian kedua dan ketiga digabung lebih dahulu, kemudian digabung dengan bagian pertama.</p>
        <div class="callout"><strong>Perhatikan spasi:</strong> teks <code>"Halo, "</code> memuat spasi setelah koma. Uji otomatis membandingkan teks persis sama, termasuk spasi.</div>
        <div class="callout"><strong>Padanan Android Studio:</strong> penggabungan teks pada Kotlin dapat ditulis dengan operator <code>+</code> atau string template.</div>`,
      uji: [
        { teks: "Gunakan blok join.", cek: a => a.blok("join") >= 1 },
        { teks: 'Nama "Budi" → Label1.Text = "Halo, Budi!".', cek: a => { const r = a.jalan(); r.setText("TextBox1", "Budi"); r.click("Button1"); return r.get("Label1", "Text") === "Halo, Budi!"; } },
        { teks: 'Nama "Sari" → Label1.Text = "Halo, Sari!".', cek: a => { const r = a.jalan(); r.setText("TextBox1", "Sari"); r.click("Button1"); return r.get("Label1", "Text") === "Halo, Sari!"; } }
      ],
      petunjuk: ["Susun: when Button1.Click → set Label1.Text to join(…, …).", "Soket kedua join diisi join lain yang berisi TextBox1.Text dan \"!\".", "Teks pertama adalah \"Halo, \" (ada spasi di belakang koma)."],
      solusi: { blok: [CLICK("Button1", SET("Label1", "Text", B("join", {}, { a: T("Halo, "), b: B("join", {}, { a: PROP("TextBox1", "Text"), b: T("!") }) })))] }
    },
    {
      id: "p3-4", judul: "Luas Persegi Panjang", mode: "Designer + Blocks", ct: "dekomposisi", tabAwal: "blocks",
      izin: { palet: [], blok: ["when_click", "set_prop", "get_prop", "math_op", "number", "text"] },
      awal: { komponen: [{ type: "TextBox", props: { Hint: "Panjang" } }, { type: "TextBox", props: { Hint: "Lebar" } }, { type: "Button", props: { Text: "Hitung Luas" } }, { type: "Label", props: { Text: "Luas" } }] },
      teori: `
        <p>Dekomposisikan masalah ini seperti sebelumnya: <strong>input</strong> (panjang dan lebar), <strong>proses</strong> (luas = panjang × lebar), dan <strong>output</strong> (hasil pada Label).</p>
        <p>Pada blok <code>+ − × ÷ mod</code>, operator dipilih lewat dropdown di tengah blok. Pilih <strong>×</strong> untuk perkalian.</p>
        <div class="callout"><strong>Padanan Android Studio:</strong> <code>label1.text = (panjang * lebar).toString()</code> dengan panjang dan lebar dibaca sebagai angka.</div>`,
      uji: [
        { teks: "Gunakan blok operasi matematika.", cek: a => a.blok("math_op") >= 1 },
        { teks: 'Panjang 4 dan lebar 5 → Label1.Text = "20".', cek: a => { const r = a.jalan(); r.setText("TextBox1", "4"); r.setText("TextBox2", "5"); r.click("Button1"); return r.get("Label1", "Text") === "20"; } },
        { teks: 'Panjang 2.5 dan lebar 4 → Label1.Text = "10".', cek: a => { const r = a.jalan(); r.setText("TextBox1", "2.5"); r.setText("TextBox2", "4"); r.click("Button1"); return r.get("Label1", "Text") === "10"; } }
      ],
      petunjuk: ["Susun: when Button1.Click → set Label1.Text to ( TextBox1.Text × TextBox2.Text ).", "Ubah operator pada blok Math menjadi ×.", "Ambil TextBox1.Text dan TextBox2.Text dari laci masing-masing."],
      solusi: { blok: [CLICK("Button1", SET("Label1", "Text", MATH("*", PROP("TextBox1", "Text"), PROP("TextBox2", "Text"))))] }
    },
    {
      id: "p3-5", judul: "Konversi Suhu", mode: "Designer + Blocks", ct: "algoritma", tabAwal: "blocks",
      izin: { palet: [], blok: ["when_click", "set_prop", "get_prop", "math_op", "number", "text"] },
      awal: { komponen: [{ type: "TextBox", props: { Hint: "Suhu (°C)" } }, { type: "Button", props: { Text: "Konversi ke °F" } }, { type: "Label", props: { Text: "Fahrenheit" } }] },
      teori: `
        <p>Rumus konversi Celsius ke Fahrenheit adalah <code>F = C × 9 ÷ 5 + 32</code>. Rumus ini memiliki <strong>tiga langkah berurutan</strong>: kalikan 9, bagi 5, lalu tambah 32. Menuliskannya sebagai blok berarti menyusun operasi bersarang dari dalam ke luar.</p>
        <div class="callout"><strong>Urutan blok:</strong> <code>( ( C × 9 ) ÷ 5 ) + 32</code>. Blok yang paling dalam dihitung lebih dahulu.</div>
        <p>Uji otomatis memeriksa tiga suhu: 100 °C → 212, 0 °C → 32, dan 37 °C → 98.6.</p>`,
      uji: [
        { teks: '100 °C → Label1.Text = "212".', cek: a => { const r = a.jalan(); r.setText("TextBox1", "100"); r.click("Button1"); return r.get("Label1", "Text") === "212"; } },
        { teks: '0 °C → Label1.Text = "32".', cek: a => { const r = a.jalan(); r.setText("TextBox1", "0"); r.click("Button1"); return r.get("Label1", "Text") === "32"; } },
        { teks: '37 °C → Label1.Text = "98.6".', cek: a => { const r = a.jalan(); r.setText("TextBox1", "37"); r.click("Button1"); return r.get("Label1", "Text") === "98.6"; } }
      ],
      petunjuk: ["Susun operasi dari dalam ke luar: mulai dari TextBox1.Text × 9.", "Hasilnya dibagi 5, kemudian ditambah 32.", "Setiap operator dipilih lewat dropdown pada blok Math."],
      solusi: { blok: [CLICK("Button1", SET("Label1", "Text", MATH("+", MATH("/", MATH("*", PROP("TextBox1", "Text"), N(9)), N(5)), N(32))))] }
    },
    {
      id: "p3-6", judul: "Menukar Dua Nilai", mode: "Designer + Blocks", ct: "algoritma", tabAwal: "blocks",
      izin: { palet: [], blok: ["decl", "set_var", "get_var", "when_click", "set_prop", "get_prop", "text", "number"] },
      awal: { komponen: [{ type: "TextBox", props: { Hint: "Nilai A" } }, { type: "TextBox", props: { Hint: "Nilai B" } }, { type: "Button", props: { Text: "Tukar" } }] },
      teori: `
        <p>Menukar isi dua wadah tidak dapat dilakukan dengan dua penugasan langsung. Bila A diisi dengan B lebih dahulu, nilai lama A <strong>hilang tertimpa</strong> sebelum sempat disalin ke B.</p>
        <p>Solusinya memakai <strong>variabel sementara</strong>:</p>
        <ol>
          <li>Simpan isi A ke variabel sementara.</li>
          <li>Isi A dengan isi B.</li>
          <li>Isi B dengan nilai pada variabel sementara.</li>
        </ol>
        <div class="callout"><strong>Perhatikan urutan:</strong> mengubah urutan ketiga langkah akan memberi hasil yang salah. Inilah contoh nyata mengapa algoritma harus tepat berurutan.</div>`,
      uji: [
        { teks: "Buat variabel sementara dengan initialize global.", cek: a => a.blok("decl") >= 1 },
        { teks: 'A = "1", B = "2" → setelah klik, A = "2" dan B = "1".', cek: a => { const r = a.jalan(); r.setText("TextBox1", "1"); r.setText("TextBox2", "2"); r.click("Button1"); return r.get("TextBox1", "Text") === "2" && r.get("TextBox2", "Text") === "1"; } },
        { teks: 'A = "kiri", B = "kanan" → setelah klik, A = "kanan" dan B = "kiri".', cek: a => { const r = a.jalan(); r.setText("TextBox1", "kiri"); r.setText("TextBox2", "kanan"); r.click("Button1"); return r.get("TextBox1", "Text") === "kanan" && r.get("TextBox2", "Text") === "kiri"; } }
      ],
      petunjuk: ["Buat initialize global sementara to \"\" (teks kosong).", "Handler berisi tiga blok: set sementara ← TextBox1.Text; set TextBox1.Text ← TextBox2.Text; set TextBox2.Text ← sementara.", "Pada blok set komponen, pilih properti Text lewat dropdown."],
      solusi: { blok: [DECL("sementara", T("")), CLICK("Button1", SETV("sementara", PROP("TextBox1", "Text")), SET("TextBox1", "Text", PROP("TextBox2", "Text")), SET("TextBox2", "Text", GET("sementara")))] }
    }
  ],
  soal: [
    { level: "c1", ct: "abstraksi", teks: "Variabel adalah…", opsi: ["Komponen yang tampak di layar", "Tempat penyimpanan data bernama yang nilainya dapat berubah", "Jenis event", "Nama proyek"], jawaban: 1, pembahasan: "Variabel menyimpan data yang dapat dibaca dan diubah saat program berjalan." },
    { level: "c1", ct: "algoritma", teks: "Blok yang digunakan untuk membuat variabel global adalah…", opsi: ["set global … to", "get global …", "initialize global … to", "when Screen1.Initialize"], jawaban: 2, pembahasan: "initialize global … to mendeklarasikan variabel sekaligus memberi nilai awal." },
    { level: "c1", ct: "abstraksi", teks: "Nilai true dan false termasuk tipe data…", opsi: ["Teks", "Boolean", "Warna", "Daftar"], jawaban: 1, pembahasan: "Boolean hanya memiliki dua nilai: true atau false." },
    { level: "c2", ct: "abstraksi", teks: "Mengapa variabel sebaiknya diberi nama bermakna seperti skor, bukan x?", opsi: ["Agar program berjalan lebih cepat", "Agar peran data mudah dipahami tanpa melacak seluruh program", "Karena App Inventor mewajibkannya", "Agar ukuran aplikasi mengecil"], jawaban: 1, pembahasan: "Nama bermakna mengabstraksikan peran data sehingga program lebih mudah dibaca dan dipelihara." },
    { level: "c2", ct: "algoritma", teks: "Blok join digunakan untuk…", opsi: ["Menjumlahkan dua angka", "Menggabungkan dua teks", "Mengulang aksi", "Membandingkan dua nilai"], jawaban: 1, pembahasan: "join menggabungkan dua teks menjadi satu teks." },
    { level: "c3", ct: "algoritma", teks: "Ekspresi yang tepat untuk menambah variabel skor sebanyak 1 adalah…", opsi: ["set global skor to 1", "set global skor to ( get global skor + 1 )", "get global skor + 1", "initialize global skor to skor + 1"], jawaban: 1, pembahasan: "Nilai lama dibaca, ditambah 1, lalu disimpan kembali ke variabel yang sama." },
    { level: "c3", ct: "dekomposisi", teks: "Aplikasi penjumlah dua angka paling tepat didekomposisi menjadi…", opsi: ["Satu Label saja", "Input (dua TextBox), proses (penjumlahan), output (Label)", "Dua Button tanpa input", "Satu Screen kosong"], jawaban: 1, pembahasan: "Pembagian input–proses–output menghasilkan bagian yang jelas fungsinya." },
    { level: "c3", ct: "algoritma", teks: "Dengan rumus F = C × 9 ÷ 5 + 32, suhu 100 °C setara dengan…", opsi: ["132 °F", "180 °F", "212 °F", "68 °F"], jawaban: 2, pembahasan: "100 × 9 = 900; 900 ÷ 5 = 180; 180 + 32 = 212." },
    { level: "c4", ct: "pola", teks: "Skor awal 0. Setiap klik menjalankan set global skor to (skor + 2). Setelah tombol ditekan tiga kali, Label yang menampilkan skor akan menunjukkan…", opsi: ["2", "3", "6", "0"], jawaban: 2, pembahasan: "Pola penambahan 2 diulang tiga kali: 0 → 2 → 4 → 6." },
    { level: "c4", ct: "dekomposisi", teks: "Untuk menukar isi dua TextBox, mengapa dibutuhkan variabel sementara?", opsi: ["Agar nilai pertama tidak tertimpa sebelum sempat disalin ke TextBox kedua", "Agar aplikasi berjalan lebih cepat", "Karena TextBox tidak dapat diubah", "Agar warna TextBox tidak berubah"], jawaban: 0, pembahasan: "Tanpa penyimpan sementara, penugasan pertama menghapus nilai lama sehingga kedua kotak berisi nilai yang sama." }
  ]
});
