// BAB 4 — Percabangan dan Perulangan
BAB.push({
  id: "bab4", nomor: 4, judul: "Percabangan & Perulangan",
  judulLengkap: "Bab 4: Percabangan dan Perulangan",
  deskripsi: "Mengambil keputusan dengan if–else dan operator logika, serta mengulang aksi dengan repeat dan while.",
  pelajaran: [
    {
      id: "p4-0", judul: "Logika Boolean dan Percabangan", mode: "Bacaan", tipe: "bacaan", ct: "algoritma",
      teori: `
        <p>Program mengambil keputusan menggunakan <strong>kondisi</strong>, yaitu ekspresi yang hasilnya <code>true</code> atau <code>false</code>. Kondisi sederhana dibuat dengan operator perbandingan: <code>=  ≠  &lt;  &gt;  ≤  ≥</code>.</p>
        <p>Kondisi dapat digabung dengan operator logika:</p>
        <table class="tbl">
          <thead><tr><th>A</th><th>B</th><th>A and B</th><th>A or B</th></tr></thead>
          <tbody>
            <tr><td>true</td><td>true</td><td>true</td><td>true</td></tr>
            <tr><td>true</td><td>false</td><td>false</td><td>true</td></tr>
            <tr><td>false</td><td>true</td><td>false</td><td>true</td></tr>
            <tr><td>false</td><td>false</td><td>false</td><td>false</td></tr>
          </tbody>
        </table>
        <p><code>not A</code> membalik nilai A. Blok <code>if … then … else …</code> menjalankan bagian <em>then</em> bila kondisi benar dan bagian <em>else</em> bila salah.</p>
        <div class="callout"><strong>Waspadai nilai batas.</strong> Syarat "minimal 60" memakai <code>≥</code>, bukan <code>&gt;</code>, agar nilai tepat 60 ikut lulus. Uji nilai batas selalu menjadi bagian dari pemeriksaan program.</div>
        <div class="callout"><strong>Padanan Android Studio:</strong> <code>if (a &amp;&amp; b) { … } else { … }</code>. Operator <code>and</code> menjadi <code>&amp;&amp;</code>, <code>or</code> menjadi <code>||</code>, dan <code>not</code> menjadi <code>!</code>.</div>`,
      cek: [
        { teks: "Ekspresi (5 > 3) and (2 > 4) bernilai…", opsi: ["true", "false", "5", "kesalahan"], jawaban: 1, pembahasan: "5 > 3 benar, tetapi 2 > 4 salah. Operator and hanya benar jika keduanya benar, sehingga hasilnya false." },
        { teks: "Operator perbandingan yang tepat untuk syarat \"minimal 60\" adalah…", opsi: ["<", "≤", "≥", "="], jawaban: 2, pembahasan: "Minimal 60 berarti 60 atau lebih, yaitu ≥ 60." }
      ]
    },
    {
      id: "p4-1", judul: "Percabangan if–else", mode: "Designer + Blocks", ct: "algoritma", tabAwal: "blocks",
      izin: { palet: [], blok: ["when_click", "set_prop", "get_prop", "if_else", "compare", "number", "text"] },
      awal: { komponen: [{ type: "TextBox", props: { Hint: "Nilai (0–100)" } }, { type: "Button", props: { Text: "Periksa" } }, { type: "Label", props: { Text: "Status" } }] },
      teori: `
        <p>Program sering harus memilih tindakan berdasarkan kondisi. Blok <code>if … then … else …</code> menjalankan bagian <em>then</em> bila kondisi benar, dan bagian <em>else</em> bila salah.</p>
        <p>Kondisi dibentuk dengan blok perbandingan (kategori <em>Math</em>), misalnya <code>TextBox1.Text ≥ 60</code>. Simbol ≥ berarti "lebih besar atau sama dengan", sehingga nilai tepat 60 termasuk lulus.</p>
        <div class="callout"><strong>Aturan:</strong> nilai ≥ 60 menampilkan <code>Lulus</code>, selain itu <code>Belum Lulus</code>.</div>
        <div class="callout"><strong>Padanan Android Studio:</strong> <code>if (nilai &gt;= 60) { … } else { … }</code>.</div>
        <p>Uji batas (nilai 59 dan 60) menunjukkan kesalahan yang sering terjadi ketika memilih operator perbandingan.</p>`,
      uji: [
        { teks: "Gunakan blok if–then–else.", cek: a => a.blok("if_else") >= 1 },
        { teks: 'Nilai 80 → Label1.Text = "Lulus".', cek: a => { const r = a.jalan(); r.setText("TextBox1", "80"); r.click("Button1"); return r.get("Label1", "Text") === "Lulus"; } },
        { teks: 'Nilai 59 → Label1.Text = "Belum Lulus".', cek: a => { const r = a.jalan(); r.setText("TextBox1", "59"); r.click("Button1"); return r.get("Label1", "Text") === "Belum Lulus"; } },
        { teks: 'Nilai 60 (batas) → Label1.Text = "Lulus".', cek: a => { const r = a.jalan(); r.setText("TextBox1", "60"); r.click("Button1"); return r.get("Label1", "Text") === "Lulus"; } }
      ],
      petunjuk: ["Letakkan if–else di dalam when Button1.Click.", "Kondisi: blok perbandingan dengan TextBox1.Text di kiri dan angka 60 di kanan.", "Operator yang tepat adalah ≥ (bukan >), agar nilai 60 lulus."],
      solusi: { blok: [CLICK("Button1", IFELSE(CMP(">=", PROP("TextBox1", "Text"), N(60)), [SET("Label1", "Text", T("Lulus"))], [SET("Label1", "Text", T("Belum Lulus"))]))] }
    },
    {
      id: "p4-3", judul: "Bilangan Genap atau Ganjil", mode: "Designer + Blocks", ct: "pola", tabAwal: "blocks",
      izin: { palet: [], blok: ["when_click", "set_prop", "get_prop", "if_else", "compare", "math_op", "number", "text"] },
      awal: { komponen: [{ type: "TextBox", props: { Hint: "Angka" } }, { type: "Button", props: { Text: "Periksa" } }, { type: "Label", props: { Text: "Hasil" } }] },
      teori: `
        <p>Sebuah bilangan <strong>genap</strong> bila habis dibagi 2, artinya <em>sisa pembagiannya 0</em>. Sisa pembagian dihitung dengan operator <code>mod</code> (pilih pada dropdown blok Math).</p>
        <table class="tbl">
          <thead><tr><th>n</th><th>n mod 2</th><th>Jenis</th></tr></thead>
          <tbody>
            <tr><td>4</td><td>0</td><td>Genap</td></tr>
            <tr><td>7</td><td>1</td><td>Ganjil</td></tr>
            <tr><td>0</td><td>0</td><td>Genap</td></tr>
          </tbody>
        </table>
        <p>Pola "sisa bagi 2 sama dengan 0" dapat dipakai kembali pada banyak masalah lain, misalnya kelipatan 3 atau kelipatan 5.</p>
        <div class="callout"><strong>Padanan Android Studio:</strong> <code>if (n % 2 == 0) { … }</code>.</div>`,
      uji: [
        { teks: "Gunakan operator mod pada blok Math.", cek: a => a.blok("math_op") >= 1 && a.blok("if_else") >= 1 },
        { teks: 'Angka 4 → Label1.Text = "Genap".', cek: a => { const r = a.jalan(); r.setText("TextBox1", "4"); r.click("Button1"); return r.get("Label1", "Text") === "Genap"; } },
        { teks: 'Angka 7 → Label1.Text = "Ganjil".', cek: a => { const r = a.jalan(); r.setText("TextBox1", "7"); r.click("Button1"); return r.get("Label1", "Text") === "Ganjil"; } },
        { teks: 'Angka 0 → Label1.Text = "Genap".', cek: a => { const r = a.jalan(); r.setText("TextBox1", "0"); r.click("Button1"); return r.get("Label1", "Text") === "Genap"; } }
      ],
      petunjuk: ["Kondisi: ( TextBox1.Text mod 2 ) = 0.", "Ubah operator pada blok Math menjadi mod.", "Bagian then → \"Genap\"; bagian else → \"Ganjil\"."],
      solusi: { blok: [CLICK("Button1", IFELSE(CMP("=", MATH("%", PROP("TextBox1", "Text"), N(2)), N(0)), [SET("Label1", "Text", T("Genap"))], [SET("Label1", "Text", T("Ganjil"))]))] }
    },
    {
      id: "p4-4", judul: "Operator Logika: Login", mode: "Designer + Blocks", ct: "algoritma", tabAwal: "blocks",
      izin: { palet: [], blok: ["when_click", "set_prop", "get_prop", "if_else", "logic_op", "compare", "text"] },
      awal: { komponen: [{ type: "TextBox", props: { Hint: "Pengguna" } }, { type: "TextBox", props: { Hint: "Sandi" } }, { type: "Button", props: { Text: "Masuk" } }, { type: "Label", props: { Text: "Status" } }] },
      teori: `
        <p>Login yang benar membutuhkan <strong>dua syarat sekaligus</strong>: nama pengguna benar <em>dan</em> sandi benar. Dua kondisi digabung dengan blok <code>and</code> (kategori Logic).</p>
        <p>Pada latihan ini, nama pengguna yang benar adalah <code>admin</code> dan sandinya <code>123</code>. Bila hanya salah satu benar, akses harus ditolak.</p>
        <div class="callout"><strong>Susunan:</strong> <code>if ( (TextBox1.Text = "admin") and (TextBox2.Text = "123") ) then … else …</code></div>
        <div class="callout"><strong>Padanan Android Studio:</strong> <code>if (user == "admin" &amp;&amp; sandi == "123") { … }</code>.</div>`,
      uji: [
        { teks: "Gunakan blok and (atau or) dari kategori Logic.", cek: a => a.blok("logic_op") >= 1 },
        { teks: 'admin / 123 → Label1.Text = "Selamat datang".', cek: a => { const r = a.jalan(); r.setText("TextBox1", "admin"); r.setText("TextBox2", "123"); r.click("Button1"); return r.get("Label1", "Text") === "Selamat datang"; } },
        { teks: 'admin / salah → Label1.Text = "Akses ditolak".', cek: a => { const r = a.jalan(); r.setText("TextBox1", "admin"); r.setText("TextBox2", "salah"); r.click("Button1"); return r.get("Label1", "Text") === "Akses ditolak"; } },
        { teks: 'tamu / 123 → Label1.Text = "Akses ditolak".', cek: a => { const r = a.jalan(); r.setText("TextBox1", "tamu"); r.setText("TextBox2", "123"); r.click("Button1"); return r.get("Label1", "Text") === "Akses ditolak"; } }
      ],
      petunjuk: ["Gunakan if–else; kondisinya sebuah blok and.", "Soket kiri and: TextBox1.Text = \"admin\"; soket kanan: TextBox2.Text = \"123\".", "Bagian else menampilkan \"Akses ditolak\"."],
      solusi: { blok: [CLICK("Button1", IFELSE(B("logic_op", { op: "and" }, { a: CMP("=", PROP("TextBox1", "Text"), T("admin")), b: CMP("=", PROP("TextBox2", "Text"), T("123")) }), [SET("Label1", "Text", T("Selamat datang"))], [SET("Label1", "Text", T("Akses ditolak"))]))] }
    },
    {
      id: "p4-2", judul: "Perulangan repeat", mode: "Designer + Blocks", ct: "pola", tabAwal: "blocks",
      izin: { palet: [], blok: ["decl", "set_var", "get_var", "math_op", "number", "repeat", "when_click", "set_prop"] },
      awal: { komponen: [{ type: "Button", props: { Text: "Hitung 2 × 5" } }, { type: "Label", props: { Text: "Hasil" } }] },
      teori: `
        <p>Ketika suatu aksi harus diulang, blok <code>repeat n times</code> menghindarkan penyusunan blok yang sama berkali-kali. Mengenali bahwa langkah yang sama muncul berulang adalah <strong>pengenalan pola</strong>.</p>
        <p>Contoh: perkalian 2 × 5 dapat dihitung sebagai penjumlahan berulang, yaitu menambahkan 2 sebanyak 5 kali ke variabel <code>total</code>.</p>
        <div class="callout"><strong>Perhatian:</strong> variabel menyimpan nilainya di antara klik. Jika <code>total</code> tidak dikembalikan ke 0 di awal handler, klik kedua akan menghasilkan 20, bukan 10. Uji ketiga memeriksa hal ini.</div>
        <div class="callout"><strong>Padanan Android Studio:</strong> <code>repeat(5) { total = (total + 2) }</code>.</div>`,
      uji: [
        { teks: "Gunakan blok repeat.", cek: a => a.blok("repeat") >= 1 },
        { teks: 'Klik satu kali → Label1.Text = "10".', cek: a => { const r = a.jalan(); r.click("Button1"); return r.get("Label1", "Text") === "10"; } },
        { teks: 'Klik dua kali tetap menghasilkan "10" (variabel di-reset).', cek: a => { const r = a.jalan(); r.click("Button1"); r.click("Button1"); return r.get("Label1", "Text") === "10"; } }
      ],
      petunjuk: ["Buat initialize global total to 0.", "Di dalam handler: (1) set total ke 0, (2) repeat 5 times berisi set total ke total + 2, (3) set Label1.Text ke total.", "Blok set total ke 0 harus berada sebelum repeat."],
      solusi: { blok: [DECL("total", N(0)), CLICK("Button1", SETV("total", N(0)), REPEAT(N(5), [SETV("total", MATH("+", GET("total"), N(2)))]), SET("Label1", "Text", GET("total")))] }
    },
    {
      id: "p4-5", judul: "Menyusun Teks Berulang", mode: "Designer + Blocks", ct: "pola", tabAwal: "blocks",
      izin: { palet: [], blok: ["decl", "set_var", "get_var", "join", "text", "repeat", "number", "when_click", "set_prop"] },
      awal: { komponen: [{ type: "Button", props: { Text: "Buat Tawa" } }, { type: "Label", props: { Text: "Hasil" } }] },
      teori: `
        <p>Perulangan tidak hanya untuk angka. Teks pun dapat dibangun sedikit demi sedikit: variabel <code>hasil</code> dimulai dari teks kosong, lalu pada tiap putaran <code>hasil</code> digabung dengan potongan teks baru memakai <code>join</code>.</p>
        <p>Target: menampilkan <code>HaHaHa</code> (potongan "Ha" diulang 3 kali). Seperti pada latihan sebelumnya, variabel harus <strong>dikosongkan di awal handler</strong> agar klik berikutnya tidak menumpuk hasil lama.</p>
        <div class="callout"><strong>Padanan Android Studio:</strong> <code>repeat(3) { hasil = hasil + "Ha" }</code>.</div>`,
      uji: [
        { teks: "Gunakan blok repeat.", cek: a => a.blok("repeat") >= 1 },
        { teks: 'Klik satu kali → Label1.Text = "HaHaHa".', cek: a => { const r = a.jalan(); r.click("Button1"); return r.get("Label1", "Text") === "HaHaHa"; } },
        { teks: 'Klik dua kali tetap menghasilkan "HaHaHa".', cek: a => { const r = a.jalan(); r.click("Button1"); r.click("Button1"); return r.get("Label1", "Text") === "HaHaHa"; } }
      ],
      petunjuk: ["Buat initialize global hasil to \"\" (teks kosong).", "Handler: set hasil ke \"\"; repeat 3 kali { set hasil ke join(hasil, \"Ha\") }; set Label1.Text ke hasil.", "Soket join: get global hasil di kiri, teks \"Ha\" di kanan."],
      solusi: { blok: [DECL("hasil", T("")), CLICK("Button1", SETV("hasil", T("")), REPEAT(N(3), [SETV("hasil", B("join", {}, { a: GET("hasil"), b: T("Ha") }))]), SET("Label1", "Text", GET("hasil")))] }
    },
    {
      id: "p4-6", judul: "Perulangan while", mode: "Designer + Blocks", ct: "algoritma", tabAwal: "blocks",
      izin: { palet: [], blok: ["decl", "set_var", "get_var", "when_click", "set_prop", "get_prop", "while_do", "compare", "math_op", "number"] },
      awal: { komponen: [{ type: "TextBox", props: { Hint: "Nilai N" } }, { type: "Button", props: { Text: "Jumlahkan 1 sampai N" } }, { type: "Label", props: { Text: "Hasil" } }] },
      teori: `
        <p><code>repeat</code> dipakai bila jumlah pengulangan sudah diketahui. Bila jumlahnya bergantung pada kondisi (misalnya batas yang diketik pengguna), gunakan <code>while</code>: blok di dalamnya diulang <strong>selama kondisi benar</strong>.</p>
        <p>Untuk menjumlahkan 1 sampai N, diperlukan dua variabel: <code>i</code> (penghitung) dan <code>total</code> (akumulator).</p>
        <ol>
          <li>Set <code>i</code> = 1 dan <code>total</code> = 0.</li>
          <li><strong>while</strong> <code>i ≤ N</code>: tambahkan <code>i</code> ke <code>total</code>, lalu naikkan <code>i</code> sebanyak 1.</li>
          <li>Tampilkan <code>total</code>.</li>
        </ol>
        <div class="callout"><strong>Awas perulangan tak berujung.</strong> Bila <code>i</code> tidak pernah dinaikkan, kondisi <code>i ≤ N</code> selalu benar dan program tidak berhenti. Simulator akan menghentikannya dan menampilkan pesan pada konsol.</div>
        <div class="callout"><strong>Padanan Android Studio:</strong> <code>while (i &lt;= n) { total = total + i; i = i + 1 }</code>.</div>`,
      uji: [
        { teks: "Gunakan blok while.", cek: a => a.blok("while_do") >= 1 },
        { teks: 'N = 5 → Label1.Text = "15".', cek: a => { const r = a.jalan(); r.setText("TextBox1", "5"); r.click("Button1"); return r.get("Label1", "Text") === "15"; } },
        { teks: 'N = 10 → Label1.Text = "55".', cek: a => { const r = a.jalan(); r.setText("TextBox1", "10"); r.click("Button1"); return r.get("Label1", "Text") === "55"; } },
        { teks: 'N = 0 → Label1.Text = "0".', cek: a => { const r = a.jalan(); r.setText("TextBox1", "0"); r.click("Button1"); return r.get("Label1", "Text") === "0"; } }
      ],
      petunjuk: ["Buat dua variabel global: i (awal 1) dan total (awal 0).", "Awal handler: set i ke 1 dan total ke 0 agar klik berikutnya tidak menumpuk.", "while (i ≤ TextBox1.Text) { total ← total + i ; i ← i + 1 }, lalu set Label1.Text ke total."],
      solusi: { blok: [DECL("i", N(1)), DECL("total", N(0)), CLICK("Button1", SETV("i", N(1)), SETV("total", N(0)), WHILE(CMP("<=", GET("i"), PROP("TextBox1", "Text")), [SETV("total", MATH("+", GET("total"), GET("i"))), SETV("i", MATH("+", GET("i"), N(1)))]), SET("Label1", "Text", GET("total")))] }
    }
  ],
  soal: [
    { level: "c1", ct: "algoritma", teks: "Struktur yang memilih tindakan berdasarkan kondisi benar atau salah disebut…", opsi: ["Perulangan", "Percabangan", "Komponen", "Properti"], jawaban: 1, pembahasan: "Percabangan (if–then–else) memilih jalur eksekusi sesuai hasil kondisi." },
    { level: "c1", ct: "pola", teks: "Blok yang digunakan untuk mengulang sekelompok aksi sebanyak n kali adalah…", opsi: ["if", "repeat n times", "initialize global", "when Click"], jawaban: 1, pembahasan: "repeat n times menjalankan blok di dalamnya sebanyak n kali." },
    { level: "c1", ct: "algoritma", teks: "Operator mod menghasilkan…", opsi: ["Hasil bagi", "Sisa pembagian", "Hasil kali", "Pangkat"], jawaban: 1, pembahasan: "mod adalah sisa pembagian; misalnya 7 mod 2 = 1." },
    { level: "c2", ct: "algoritma", teks: "Perbedaan if–then dan if–then–else yang tepat adalah…", opsi: ["Tidak ada perbedaan", "else menyediakan aksi alternatif saat kondisi salah", "then hanya berjalan saat kondisi salah", "else hanya untuk perulangan"], jawaban: 1, pembahasan: "Pada if–then–else terdapat jalur alternatif yang dijalankan ketika kondisi tidak terpenuhi." },
    { level: "c2", ct: "algoritma", teks: "Ekspresi (A and B) bernilai true jika…", opsi: ["A atau B bernilai true", "A dan B keduanya bernilai true", "Salah satunya bernilai false", "Keduanya bernilai false"], jawaban: 1, pembahasan: "Operator and hanya benar jika kedua operandnya benar." },
    { level: "c3", ct: "abstraksi", teks: "Aplikasi menyatakan lulus bila nilai minimal 60. Kondisi yang tepat adalah…", opsi: ["TextBox1.Text < 60", "TextBox1.Text ≥ 60", "TextBox1.Text = 100", "TextBox1.Text ≠ 60"], jawaban: 1, pembahasan: "Syarat minimal 60 berarti nilai 60 dan di atasnya lulus, sehingga operator yang tepat adalah ≥." },
    { level: "c3", ct: "pola", teks: "Menjumlahkan angka 4 sebanyak 5 kali ke variabel yang diawali 0 menghasilkan…", opsi: ["9", "20", "45", "5"], jawaban: 1, pembahasan: "Pola penambahan 4 diulang lima kali: 4 × 5 = 20." },
    { level: "c3", ct: "pola", teks: "Sebuah bilangan n dikatakan genap jika n mod 2 sama dengan…", opsi: ["1", "0", "2", "n"], jawaban: 1, pembahasan: "Bilangan genap habis dibagi 2, sehingga sisa baginya 0." },
    { level: "c4", ct: "algoritma", teks: "Handler perulangan tidak mengembalikan variabel total ke 0. Pada klik kedua, hasil yang tampil menjadi dua kali lipat. Penyebab paling tepat adalah…", opsi: ["Tombol rusak", "Variabel mempertahankan nilai dari klik sebelumnya", "Label menggandakan teks", "repeat selalu berjalan dua kali"], jawaban: 1, pembahasan: "Variabel global menyimpan nilai di antara pemanggilan handler. Perbaikannya adalah mengatur ulang variabel di awal handler." },
    { level: "c4", ct: "algoritma", teks: "Perulangan while i ≤ 3 dengan i bernilai awal 1 dan i tidak pernah dinaikkan akan…", opsi: ["Berhenti setelah 3 kali", "Berjalan tanpa berhenti (perulangan tak berujung)", "Tidak berjalan sama sekali", "Berhenti setelah 1 kali"], jawaban: 1, pembahasan: "Kondisi i ≤ 3 selalu benar karena i tidak berubah, sehingga perulangan tidak pernah berakhir." }
  ]
});
