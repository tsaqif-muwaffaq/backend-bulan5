# Kuis Pilihan Ganda — Validasi, Express, dan Prisma

## Soal & Jawaban

1. **Mengapa kita perlu melakukan validasi input?**  
   **Jawaban: b. Mencegah data sampah atau berbahaya masuk ke sistem**

2. **Library populer untuk validasi di Express.js adalah...**  
   **Jawaban: b. express-validator**

3. **HTTP Status Code yang tepat jika validasi gagal adalah...**  
   **Jawaban: c. 400 Bad Request**

4. **Dalam Prisma, relasi One-to-Many didefinisikan dengan...**  
   **Jawaban: a. Array di satu sisi (contoh: Product[]) dan field relation di sisi lain**

5. **Apa fungsi include saat melakukan query findMany?**  
   **Jawaban: c. Mengambil data relasi (join) agar ikut muncul di response**

6. **Jika Product punya categoryId, maka categoryId disebut sebagai...**  
   **Jawaban: b. Foreign Key**

7. **Apa arti @relation(fields: [categoryId], references: [id]) di schema Prisma?**  
   **Jawaban: c. Mendefinisikan hubungan Foreign Key antara kolom categoryId di tabel ini dengan id di tabel referensi**

8. **Manakah format JSON response error validasi yang baik?**  
   **Jawaban: c. {"success": false, "errors": [...]}**

9. **Kapan validasi sebaiknya dilakukan?**  
   **Jawaban: b. Sebelum data diproses atau disimpan ke database**

10. **Library validasi modern yang sangat Type-safe dan cocok untuk TypeScript adalah...**  
    **Jawaban: b. Zod**

11. **Apa nama file konfigurasi utama untuk setup Prisma yang kustom (seperti mengatur path schema)?**  
    **Jawaban: b. prisma.config.ts**

12. **Berdasarkan konfigurasi prisma.config.ts, di mana lokasi file schema model disimpan?**  
    **Jawaban: c. src/prisma/schema/**

13. **File apa yang menjadi entry point definisi schema di prisma.config.ts?**  
    **Jawaban: b. src/prisma/schema.prisma**

14. **Bagaimana cara mendefinisikan fungsi service?**  
    **Jawaban: c. export const getAllProducts = async () => {}**

15. **Di mana lokasi file migrasi disimpan sesuai konfigurasi prisma.config.ts kita?**  
    **Jawaban: b. src/prisma/migrations**

16. **Jika ingin membuat model baru Transaction, apa yang harus dilakukan?**  
    **Jawaban: b. Buat file baru src/prisma/schema/Transaction.prisma**

17. **Bagaimana cara mengimport semua fungsi dari product.service.ts ke controller?**  
    **Jawaban: c. import * as productService from '../services/product.service'**

18. **Dari mana prisma.config.ts mengambil URL database?**  
    **Jawaban: b. File src/config/database.js (yang load .env)**

19. **Mengapa kita memecah schema menjadi banyak file (Modular Schema)?**  
    **Jawaban: b. Agar file schema.prisma tidak terlalu panjang dan lebih mudah di-maintain**
