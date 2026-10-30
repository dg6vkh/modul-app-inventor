// BAB 5 — Prosedur
BAB.push({
  id: "bab5", nomor: 5, judul: "Prosedur",
  judulLengkap: "Bab 5: Prosedur dan Penggunaan Ulang Kode",
  deskripsi: "Mengelompokkan langkah yang berulang ke dalam prosedur bernama agar program ringkas dan terstruktur.",
  pelajaran: [
    {
      id: "p5-0", judul: "Prosedur dan Abstraksi", mode: "Bacaan", tipe: "bacaan", ct: "abstraksi",
      teori: `
        <p>Ketika kelompok blok yang sama dibutuhkan di beberapa tempat, menyalinnya berulang kali menimbulkan dua masalah: program menjadi panjang, dan perubahan harus dilakukan di setiap salinan. <strong>Prosedur</strong> menyelesaikan masalah ini dengan memberi nama pada sekelompok langkah.</p>
        <table class="tbl">
          <thead><tr><th>Tahap</th><th>Blok App Inventor</th><th>Kotlin</th></tr></thead>
          <tbody>
            <tr><td>Mendefinisikan</td><td><code>to prosedur do …</code></td><td><code>fun prosedur() { … }</code></td></tr>
            <tr><td>Memanggil</td><td><code>call prosedur</code></td><td><code>prosedur()</code></td></tr>
          </tbody>
        </table>
        <p>Prosedur merupakan wujud <strong>abstraksi</strong>: pemanggil cukup mengetahui <em>apa</em> yang dikerjakan prosedur (dari namanya), tanpa memperhatikan <em>bagaimana</em> langkah di dalamnya disusun. Prosedur juga merupakan hasil <strong>dekomposisi</strong>, karena masalah besar dipecah menjadi bagian bernama.</p>
        <div class="callout"><strong>Prinsip:</strong> definisi prosedur ditulis di luar event handler; pemanggilan ditulis di dalam handler.</div>`,
      cek: [
        { teks: "Keuntungan utama menggunakan prosedur adalah…", opsi: ["Aplikasi otomatis lebih cepat", "Langkah yang sama tidak perlu disalin berulang kali", "Tombol menjadi lebih besar", "Variabel tidak lagi dibutuhkan"], jawaban: 1, pembahasan: "Prosedur memungkinkan satu kelompok langkah dipakai ulang melalui pemanggilan, sehingga perubahan cukup dilakukan di satu tempat." },
        { teks: "Pada Kotlin, prosedur dideklarasikan dengan kata kunci…", opsi: ["var", "fun", "val", "if"], jawaban: 1, pembahasan: "Kata kunci fun mendeklarasikan fungsi, padanan prosedur pada App Inventor." }
      ]
    },
    {
      id: "p5-1", judul: "Prosedur Pertama", mode: "Designer + Blocks", ct: "abstraksi", tabAwal: "blocks",
      izin: { palet: [], blok: ["proc_def", "proc_call", "when_click", "set_prop", "text"] },
      awal: { komponen: [{ type: "Button", props: { Text: "Sapa" } }, { type: "Label", props: { Text: "..." } }] },
      teori: `
        <p>Buat prosedur dengan blok <code>to … do</code> (kategori <em>Procedures</em>). Ubah namanya dengan mengetik pada blok, misalnya <code>tampilkanSalam</code>. Isi prosedur adalah langkah yang akan dijalankan.</p>
        <p>Prosedur <strong>tidak berjalan dengan sendirinya</strong>. Ia baru dijalankan ketika dipanggil dengan blok <code>call tampilkanSalam</code>, misalnya dari dalam <code>when Button1.Click</code>.</p>
        <div class="callout"><strong>Padanan Android Studio:</strong> <code>fun tampilkanSalam() { label1.text = "Halo!" }</code> dan pemanggilan <code>tampilkanSalam()</code>.</div>`,
      uji: [
        { teks: "Definisikan sebuah prosedur (to … do).", cek: a => a.blok("proc_def") >= 1 },
        { teks: "Panggil prosedur tersebut (call).", cek: a => a.blok("proc_call") >= 1 },
        { teks: 'Setelah Button1 diklik, Label1.Text = "Halo!".', cek: a => { const r = a.jalan(); r.click("Button1"); return r.get("Label1", "Text") === "Halo!"; } }
      ],
      petunjuk: ["Ambil blok to … do dari kategori Procedures dan beri nama, misalnya tampilkanSalam.", "Di dalam prosedur: set Label1.Text to \"Halo!\".", "Di dalam when Button1.Click: tempatkan blok call dan pilih nama prosedur pada dropdown-nya."],
      solusi: { blok: [PROC("tampilkanSalam", SET("Label1", "Text", T("Halo!"))), CLICK("Button1", CALL("tampilkanSalam"))] }
    },
    {
      id: "p5-2", judul: "Prosedur Reset", mode: "Designer + Blocks", ct: "abstraksi", tabAwal: "blocks",
      izin: { palet: [], blok: ["decl", "set_var", "get_var", "math_op", "number", "proc_def", "proc_call", "when_click", "set_prop"] },
      awal: { komponen: [{ type: "Button", props: { Text: "Tambah" } }, { type: "Button", props: { Text: "Reset" } }, { type: "Label", props: { Text: "0" } }] },
      teori: `
        <p>Pengatur ulang (<em>reset</em>) adalah kandidat yang tepat untuk dijadikan prosedur: ia melibatkan dua langkah yang selalu dilakukan bersama, yaitu <strong>mengembalikan variabel ke 0</strong> dan <strong>memperbarui tampilan</strong>.</p>
        <p>Susunan program:</p>
        <ul>
          <li>Variabel <code>skor</code> bernilai awal 0.</li>
          <li>Prosedur <code>reset</code>: set <code>skor</code> ke 0, set <code>Label1.Text</code> ke <code>skor</code>.</li>
          <li><code>Button1.Click</code>: tambah <code>skor</code> 1 lalu tampilkan. <code>Button2.Click</code>: panggil <code>reset</code>.</li>
        </ul>
        <div class="callout"><strong>Padanan Android Studio:</strong> <code>fun reset() { skor = 0; label1.text = skor.toString() }</code>.</div>`,
      uji: [
        { teks: "Gunakan prosedur dan panggilannya.", cek: a => a.blok("proc_def") >= 1 && a.blok("proc_call") >= 1 },
        { teks: 'Tiga kali klik Button1 → Label1.Text = "3".', cek: a => { const r = a.jalan(); r.click("Button1"); r.click("Button1"); r.click("Button1"); return r.get("Label1", "Text") === "3"; } },
        { teks: 'Setelah Button2 diklik → Label1.Text = "0".', cek: a => { const r = a.jalan(); r.click("Button1"); r.click("Button1"); r.click("Button2"); return r.get("Label1", "Text") === "0"; } },
        { teks: 'Setelah reset, satu klik Button1 → "1".', cek: a => { const r = a.jalan(); r.click("Button1"); r.click("Button1"); r.click("Button2"); r.click("Button1"); return r.get("Label1", "Text") === "1"; } }
      ],
      petunjuk: ["Buat initialize global skor to 0.", "Prosedur reset berisi: set global skor to 0, lalu set Label1.Text to get global skor.", "Button1.Click menambah skor dan menampilkannya; Button2.Click hanya berisi call reset."],
      solusi: { blok: [DECL("skor", N(0)), PROC("reset", SETV("skor", N(0)), SET("Label1", "Text", GET("skor"))), CLICK("Button1", SETV("skor", MATH("+", GET("skor"), N(1))), SET("Label1", "Text", GET("skor"))), CLICK("Button2", CALL("reset"))] }
    },
    {
      id: "p5-3", judul: "Satu Prosedur, Dua Tombol", mode: "Designer + Blocks", ct: "pola", tabAwal: "blocks",
      izin: { palet: [], blok: ["decl", "set_var", "get_var", "math_op", "number", "join", "text", "proc_def", "proc_call", "when_click", "set_prop"] },
      awal: { komponen: [{ type: "Button", props: { Text: "Tambah 5" } }, { type: "Button", props: { Text: "Tambah 10" } }, { type: "Label", props: { Text: "Total: 0" } }] },
      teori: `
        <p>Dua tombol menambah <code>total</code> dengan jumlah berbeda, tetapi <strong>cara menampilkan hasilnya sama</strong>: <code>Label1.Text = "Total: " + total</code>. Kesamaan inilah pola yang dapat dipisahkan ke dalam prosedur bernama, misalnya <code>perbarui</code>.</p>
        <p>Dengan demikian, bila format tampilan berubah, perbaikan cukup dilakukan pada satu prosedur, bukan pada setiap handler.</p>
        <div class="callout"><strong>Perhatikan spasi:</strong> teks <code>"Total: "</code> memuat satu spasi setelah titik dua.</div>`,
      uji: [
        { teks: "Gunakan prosedur dan panggilannya.", cek: a => a.blok("proc_def") >= 1 && a.blok("proc_call") >= 1 },
        { teks: 'Button1 sekali → "Total: 5".', cek: a => { const r = a.jalan(); r.click("Button1"); return r.get("Label1", "Text") === "Total: 5"; } },
        { teks: 'Button1 lalu Button2 → "Total: 15".', cek: a => { const r = a.jalan(); r.click("Button1"); r.click("Button2"); return r.get("Label1", "Text") === "Total: 15"; } }
      ],
      petunjuk: ["Buat initialize global total to 0.", "Prosedur perbarui: set Label1.Text to join(\"Total: \", get global total).", "Setiap handler menambah total lebih dahulu, kemudian memanggil perbarui."],
      solusi: { blok: [DECL("total", N(0)), PROC("perbarui", SET("Label1", "Text", B("join", {}, { a: T("Total: "), b: GET("total") }))), CLICK("Button1", SETV("total", MATH("+", GET("total"), N(5))), CALL("perbarui")), CLICK("Button2", SETV("total", MATH("+", GET("total"), N(10))), CALL("perbarui"))] }
    },
    {
      id: "p5-4", judul: "Membersihkan Formulir", mode: "Designer + Blocks", ct: "dekomposisi", tabAwal: "blocks",
      izin: { palet: [], blok: ["proc_def", "proc_call", "when_click", "set_prop", "get_prop", "text"] },
      awal: { komponen: [{ type: "TextBox", props: { Hint: "Nama" } }, { type: "TextBox", props: { Hint: "Alamat" } }, { type: "Button", props: { Text: "Bersihkan" } }, { type: "Label", props: { Text: "Status" } }] },
      teori: `
        <p>Membersihkan formulir mencakup beberapa langkah: mengosongkan setiap kolom isian dan memberi tahu pengguna. Mengelompokkan langkah-langkah itu ke dalam satu prosedur, misalnya <code>bersihkan</code>, adalah <strong>dekomposisi</strong> yang membuat handler tombol tetap singkat dan mudah dibaca.</p>
        <p>Mengosongkan kolom dilakukan dengan <code>set TextBox1.Text to ""</code> (blok teks tanpa isi).</p>
        <div class="callout"><strong>Padanan Android Studio:</strong> <code>editText1.setText("")</code> di dalam <code>fun bersihkan()</code>.</div>`,
      uji: [
        { teks: "Gunakan prosedur dan panggilannya.", cek: a => a.blok("proc_def") >= 1 && a.blok("proc_call") >= 1 },
        { teks: "Setelah Button1 diklik, kedua TextBox kosong.", cek: a => { const r = a.jalan(); r.setText("TextBox1", "Budi"); r.setText("TextBox2", "Jl. Mawar"); r.click("Button1"); return r.get("TextBox1", "Text") === "" && r.get("TextBox2", "Text") === ""; } },
        { teks: 'Label1.Text = "Formulir dikosongkan".', cek: a => { const r = a.jalan(); r.setText("TextBox1", "x"); r.click("Button1"); return r.get("Label1", "Text") === "Formulir dikosongkan"; } }
      ],
      petunjuk: ["Prosedur bersihkan berisi tiga blok set: TextBox1.Text, TextBox2.Text, dan Label1.Text.", "Teks kosong diperoleh dari blok teks yang kolomnya dibiarkan kosong.", "when Button1.Click hanya berisi call bersihkan."],
      solusi: { blok: [PROC("bersihkan", SET("TextBox1", "Text", T("")), SET("TextBox2", "Text", T("")), SET("Label1", "Text", T("Formulir dikosongkan"))), CLICK("Button1", CALL("bersihkan"))] }
    }
  ],
  soal: [
    { level: "c1", ct: "abstraksi", teks: "Prosedur adalah…", opsi: ["Komponen tak tampak", "Sekelompok langkah yang diberi nama dan dapat dipanggil berulang", "Jenis variabel", "Properti Label"], jawaban: 1, pembahasan: "Prosedur mengelompokkan langkah bernama yang dapat dipanggil kapan pun diperlukan." },
    { level: "c1", ct: "algoritma", teks: "Blok yang dipakai untuk menjalankan prosedur adalah…", opsi: ["to … do", "call …", "initialize global", "repeat"], jawaban: 1, pembahasan: "Blok call menjalankan prosedur yang telah didefinisikan." },
    { level: "c1", ct: "abstraksi", teks: "Padanan prosedur pada Kotlin adalah…", opsi: ["var", "fun", "class", "val"], jawaban: 1, pembahasan: "Prosedur setara dengan fungsi yang dideklarasikan dengan fun." },
    { level: "c2", ct: "abstraksi", teks: "Mengapa prosedur disebut wujud abstraksi?", opsi: ["Karena ia menyembunyikan warna komponen", "Karena pemanggil cukup mengetahui apa yang dikerjakan tanpa memperhatikan langkah rincinya", "Karena ia membuat program lebih cepat", "Karena ia menggantikan variabel"], jawaban: 1, pembahasan: "Nama prosedur mewakili sekumpulan langkah sehingga detailnya tidak perlu dipikirkan setiap kali dipakai." },
    { level: "c2", ct: "algoritma", teks: "Definisi prosedur yang telah dibuat tetapi tidak pernah dipanggil akan…", opsi: ["Berjalan otomatis saat aplikasi dibuka", "Tidak dijalankan sama sekali", "Berjalan setiap detik", "Menghapus semua komponen"], jawaban: 1, pembahasan: "Prosedur hanya dijalankan ketika dipanggil." },
    { level: "c3", ct: "pola", teks: "Dua handler tombol memuat tiga blok tampilan yang identik. Langkah refaktor yang paling tepat adalah…", opsi: ["Menghapus salah satu tombol", "Memindahkan tiga blok itu ke satu prosedur dan memanggilnya dari kedua handler", "Menambah variabel baru", "Menyalin blok itu ke tombol ketiga"], jawaban: 1, pembahasan: "Pola yang sama dipusatkan pada prosedur sehingga penggunaan ulang dan perubahan lebih mudah." },
    { level: "c3", ct: "algoritma", teks: "Prosedur reset berisi set skor ke 0 dan set Label ke skor. Setelah dipanggil, Label menampilkan…", opsi: ["Nilai skor sebelumnya", "0", "Kosong", "Pesan kesalahan"], jawaban: 1, pembahasan: "Skor diatur ke 0 lebih dahulu, lalu Label diperbarui dengan nilai tersebut." },
    { level: "c3", ct: "dekomposisi", teks: "Aplikasi formulir memerlukan pengosongan tiga kolom, pesan status, dan fokus ulang. Pembagian yang paling tepat adalah…", opsi: ["Menyalin semua langkah pada setiap tombol", "Satu prosedur bersihkan yang dipanggil dari tombol", "Menghapus kolom isian", "Menggunakan satu Label saja"], jawaban: 1, pembahasan: "Dekomposisi menempatkan langkah-langkah terkait dalam satu prosedur bernama." },
    { level: "c4", ct: "algoritma", teks: "Prosedur perbarui ditulis di dalam when Button1.Click, bukan di luar handler, sehingga Button2 tidak dapat memanggilnya. Kesimpulan yang tepat adalah…", opsi: ["Definisi prosedur harus ditempatkan di luar handler agar dapat dipakai bersama", "Button2 harus dihapus", "Prosedur tidak boleh memuat blok set", "Kesalahan ini tidak berpengaruh"], jawaban: 0, pembahasan: "Definisi prosedur berada pada tingkat atas program, bukan di dalam event handler." },
    { level: "c4", ct: "pola", teks: "Format tampilan hasil perlu diubah dari \"Total: 5\" menjadi \"Jumlah = 5\". Jika tampilan dipusatkan pada satu prosedur, perubahan yang diperlukan adalah…", opsi: ["Mengubah setiap handler", "Mengubah satu blok teks di dalam prosedur", "Membuat ulang seluruh aplikasi", "Mengganti semua variabel"], jawaban: 1, pembahasan: "Keuntungan prosedur adalah perubahan hanya perlu dilakukan di satu tempat." }
  ]
});
