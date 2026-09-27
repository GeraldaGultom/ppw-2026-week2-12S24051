# Portofolio Web — Geralda Natali Gultom

Tugas Mandiri Minggu 2 — Mata Kuliah Pemrograman dan Pengujian Aplikasi Web (12S3101)
Institut Teknologi Del.

## Deskripsi
Halaman portofolio pribadi satu halaman (single page) yang menampilkan identitas
akademik, tabel riwayat proyek/pengalaman, daftar keahlian, dan formulir konsultasi
yang accessible, dibangun dengan HTML5 semantik dan CSS3 modern.

## Fitur
- Struktur semantik: `header`, `nav`, `main`, `section`, `article`, `aside`, `footer`
- Tabel data semantik lengkap (`caption`, `thead`, `tbody`, `tfoot`, `scope`)
- Daftar `ul` dan `ol`
- Formulir accessible dengan `fieldset`, `legend`, `label for`, dan validasi native
- Tata letak Flexbox & CSS Grid, responsif dengan media query
- Palet warna 60-30-10, sudut membulat, bayangan halus

## Sebelum vs Sesudah Integrasi Framework (Minggu 2 → Minggu 3)

| Aspek | Sebelum (Minggu 2) | Sesudah (Minggu 3) |
|---|---|---|
| Metode Styling | CSS murni ditulis manual dari nol | Bootstrap 5.3.3 + Custom CSS Overrides |
| Sistem Tata Letak | CSS Flexbox & Grid manual | Bootstrap Grid System 12-kolom (`container`, `row`, `col`) |
| Navigasi | Navbar statis tanpa animasi | Navbar `sticky-top` responsif dengan hamburger toggle otomatis |
| Ikon | Tidak ada ikon | Bootstrap Icons pada form dan tombol |
| Kartu Proyek | Kartu statis tanpa interaksi lanjutan | Kartu proyek terhubung ke Modal Dialog untuk detail lengkap |
| Formulir | Label statis di atas input | Floating Labels, Input Group berikon, validasi visual otomatis |
| Tema Warna | CSS variable personal saja | CSS variable personal + override variabel Bootstrap (`--bs-primary`) tanpa `!important` |
| Responsivitas | Media query manual (`@media max-width`) | Breakpoint bawaan Bootstrap (`col-md`, `col-lg`) otomatis multi-perangkat |
| Manajemen Versi | Branch `main` saja | Branch terpisah `week3-bootstrap` untuk isolasi eksperimen |

## Screenshot Tampilan Terbaru

![Screenshot Portofolio B<img width="1917" height="1021" alt="Screenshot 2026-09-27 170340" src="https://github.com/user-attachments/assets/5df9194e-7949-4049-9121-72f13eff0db3" />
ootstrap]

## Live Demo (Versi Bootstrap)

[(https://geraldagultom.github.io/ppw-2026-week2-12S24051/)]

## Cara Menjalankan
1. Clone repositori ini
2. Buka `index.html` di browser (atau gunakan ekstensi Live Server di VS Code)

## Live Demo
https://geraldagultom.github.io/ppw-2026-week2-12S24051/ 

## Screenshot
<img width="1920" height="1080" alt="Screenshot (1110)" src="https://github.com/user-attachments/assets/718aa5af-ec18-4484-b07b-cb8826e86247" />
