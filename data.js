// ===========================================================
// DATA.JS — Metadata modul Praktikum Pemrograman Android
// dengan MIT App Inventor (alternatif sebelum Android Studio).
//
// Isi bab berada pada berkas terpisah (bab1.js … bab6.js) dan
// ditambahkan ke daftar BAB. Untuk menambah bab baru, buat berkas
// baru yang memanggil BAB.push({...}) lalu daftarkan pada index.html.
//
// Struktur satu bab:
//   { id, nomor, judul, judulLengkap, deskripsi, pelajaran[], soal[] }
// Pelajaran praktik:
//   { id, judul, mode, ct, tabAwal, izin{designer,blocks,palet[],blok[],maks},
//     awal{komponen[],blok[]}, teori(html), uji[{teks,cek(api)}],
//     petunjuk[], solusi{komponen[],blok[]} }
// Pelajaran bacaan (tipe "bacaan"):
//   { id, judul, mode:"Bacaan", tipe:"bacaan", ct, teori(html),
//     cek[{teks,opsi[],jawaban,pembahasan}] }
// Nomor pelajaran (1.1, 1.2, …) dibuat otomatis dari urutan.
//
// API uji (parameter a): jumlah(tipe), ada(nama), prop(nama,prop),
//   blok(tipe), kosong(), kotlin(), jalan() -> runtime {click, setText, get}
// ===========================================================

const CT_LABEL = {
  dekomposisi: "Dekomposisi", pola: "Pengenalan Pola", abstraksi: "Abstraksi", algoritma: "Algoritma"
};
const BLOOM_LABEL = { c1: "C1 · Mengingat", c2: "C2 · Memahami", c3: "C3 · Menerapkan", c4: "C4 · Menganalisis" };

// Jembatan App Inventor → Android Studio, dikelompokkan per topik
const JEMBATAN = [
  { grup: "Tampilan (Designer → layout XML)", baris: [
    { ai: "Designer (menyusun tampilan)", as: "Berkas layout XML — activity_main.xml" },
    { ai: "Button, Label, TextBox", as: "Button, TextView, EditText" },
    { ai: "Properti Text, FontSize", as: "android:text, android:textSize" },
    { ai: "Properti BackgroundColor, TextColor", as: "android:background (backgroundTint), android:textColor" },
    { ai: "Visible = false", as: 'android:visibility="gone"' },
    { ai: "Enabled = false", as: 'android:enabled="false"' }
  ]},
  { grup: "Event dan aksi (Blocks → Kotlin)", baris: [
    { ai: "Blocks Editor", as: "Kode Kotlin pada MainActivity.kt" },
    { ai: "when Screen1.Initialize", as: "override fun onCreate(…) { … }" },
    { ai: "when Button1.Click", as: "button1.setOnClickListener { … }" },
    { ai: "set Label1.Text to …", as: "label1.text = …" }
  ]},
  { grup: "Data dan operasi", baris: [
    { ai: "initialize global skor to 0", as: "var skor = 0" },
    { ai: "set global skor to …", as: "skor = …" },
    { ai: "join (gabung teks)", as: 'a + b atau "$a$b"' },
    { ai: "+  −  ×  ÷  mod", as: "+  -  *  /  %" }
  ]},
  { grup: "Alur kontrol", baris: [
    { ai: "if – then – else", as: "if (kondisi) { … } else { … }" },
    { ai: "and, or, not", as: "&&, ||, !" },
    { ai: "repeat n times", as: "repeat(n) { … }" },
    { ai: "while", as: "while (kondisi) { … }" }
  ]},
  { grup: "Prosedur", baris: [
    { ai: "to prosedur do …", as: "fun prosedur() { … }" },
    { ai: "call prosedur", as: "prosedur()" }
  ]}
];

const GLOSARIUM = [
  { istilah: "Abstraksi", definisi: "Proses menyaring informasi yang relevan dan mengesampingkan detail yang tidak diperlukan untuk berfokus pada inti masalah." },
  { istilah: "Activity", definisi: "Komponen Android yang mewakili satu layar dengan antarmuka pengguna; pada proyek Kotlin berupa kelas seperti MainActivity." },
  { istilah: "Algoritma", definisi: "Urutan langkah logis dan terbatas untuk menyelesaikan suatu masalah atau mencapai suatu tujuan." },
  { istilah: "Android Studio", definisi: "Lingkungan pengembangan terpadu (IDE) resmi untuk aplikasi Android yang menggunakan bahasa pemrograman tekstual seperti Kotlin dan Java." },
  { istilah: "AndroidManifest.xml", definisi: "Berkas konfigurasi proyek Android yang mendeklarasikan komponen aplikasi (misalnya Activity) dan izin yang dibutuhkan." },
  { istilah: "Blocks Editor", definisi: "Ruang kerja pada App Inventor untuk menyusun logika program dari blok-blok visual yang saling terhubung." },
  { istilah: "Boolean", definisi: "Tipe data yang hanya bernilai benar (true) atau salah (false), lazim dipakai sebagai hasil kondisi." },
  { istilah: "Computational Thinking (CT)", definisi: "Cara berpikir dalam merumuskan masalah dan solusinya sehingga dapat dieksekusi oleh agen pemroses informasi, mencakup dekomposisi, pengenalan pola, abstraksi, dan algoritma." },
  { istilah: "Debugging", definisi: "Proses menemukan dan memperbaiki kesalahan pada program." },
  { istilah: "Dekomposisi", definisi: "Proses memecah masalah atau sistem kompleks menjadi bagian-bagian yang lebih kecil dan lebih mudah dikelola." },
  { istilah: "Designer", definisi: "Ruang kerja pada App Inventor untuk menyusun tampilan aplikasi dengan menempatkan komponen secara visual." },
  { istilah: "Emulator", definisi: "Perangkat Android virtual pada komputer yang dipakai untuk menjalankan dan menguji aplikasi tanpa perangkat fisik." },
  { istilah: "Event (Kejadian)", definisi: "Peristiwa yang terjadi saat aplikasi berjalan, misalnya tombol ditekan atau layar pertama kali dibuka." },
  { istilah: "Event Handler", definisi: "Kumpulan blok atau kode yang dijalankan sebagai respons terhadap suatu event, misalnya when Button1.Click." },
  { istilah: "Gradle", definisi: "Sistem build yang dipakai Android Studio untuk mengompilasi, mengelola dependensi, dan mengemas aplikasi." },
  { istilah: "Infinite loop (perulangan tak berujung)", definisi: "Perulangan yang kondisi berhentinya tidak pernah tercapai sehingga program terus berjalan." },
  { istilah: "Komponen", definisi: "Objek dasar penyusun aplikasi, baik yang tampak (Button, Label, TextBox) maupun yang tidak tampak (Clock, TinyDB)." },
  { istilah: "Kotlin", definisi: "Bahasa pemrograman modern yang direkomendasikan untuk pengembangan aplikasi Android pada Android Studio." },
  { istilah: "Layout XML", definisi: "Berkas berformat XML pada Android Studio yang mendeskripsikan susunan tampilan, setara dengan hasil kerja pada Designer." },
  { istilah: "MIT App Inventor", definisi: "Platform pengembangan aplikasi Android berbasis pemrograman visual (block-based) yang bersifat open source dan dikelola oleh Massachusetts Institute of Technology." },
  { istilah: "Modulo (mod)", definisi: "Operasi yang menghasilkan sisa pembagian; misalnya 7 mod 2 = 1. Sering dipakai untuk menentukan bilangan genap atau ganjil." },
  { istilah: "Operator", definisi: "Simbol atau blok yang melakukan operasi terhadap nilai, misalnya penjumlahan (+) atau perbandingan (≥)." },
  { istilah: "Pengenalan Pola", definisi: "Kemampuan mengenali kemiripan atau keteraturan antarmasalah sehingga solusi yang pernah digunakan dapat diadaptasi." },
  { istilah: "Percabangan", definisi: "Struktur kontrol yang memilih tindakan berdasarkan hasil suatu kondisi (if – then – else)." },
  { istilah: "Perulangan", definisi: "Struktur kontrol yang menjalankan sekelompok instruksi berulang kali sejumlah tertentu atau selama kondisi terpenuhi." },
  { istilah: "Properti", definisi: "Atribut yang melekat pada komponen dan dapat diatur, misalnya Text, BackgroundColor, dan FontSize." },
  { istilah: "Prosedur", definisi: "Kumpulan langkah bernama yang dapat dipanggil berulang kali sehingga program lebih ringkas dan terstruktur (fun pada Kotlin)." },
  { istilah: "Teks (String)", definisi: "Tipe data berupa rangkaian karakter, misalnya nama atau kalimat; dapat digabung dengan blok join." },
  { istilah: "Variabel", definisi: "Tempat penyimpanan data bernama yang nilainya dapat dibaca dan diubah selama program berjalan." }
];

const REFERENSI = [
  "Depdiknas. (2008). Penulisan modul. Jakarta: Direktorat Tenaga Kependidikan.",
  "Wing, J. M. (2006). Computational thinking. Communications of the ACM, 49(3), 33–35.",
  "Patton, E. W., Tissenbaum, M., & Harunani, F. (2019). MIT App Inventor: Objectives, design, and development. Dalam S. Kong & H. Abelson (Eds.), Computational thinking education (hlm. 31–49). Springer.",
  "Tikva, C., & Tambouris, E. (2021). A systematic mapping study on teaching and learning computational thinking through programming in higher education. Thinking Skills and Creativity, 41, 100849. https://doi.org/10.1016/j.tsc.2021.100849",
  "Yu, Q., Yu, K., & Li, B. (2025). Effects of block-based visual programming on K-12 students' learning outcomes. Journal of Educational Computing Research. https://doi.org/10.1177/07356331241293163"
];

// Daftar bab diisi oleh bab1.js … bab6.js
const BAB = [];
