# Kuis Pilihan Ganda – Error Handling & Best Practice

## Soal & Jawaban

1. **Mengapa kita perlu Centralized Error Handling?**  
   **Jawaban:** b. Agar penanganan error konsisten dan tidak perlu try-catch berulang di setiap controller

2. **HTTP Status Code untuk "Data tidak ditemukan" adalah...**  
   **Jawaban:** c. 404

3. **HTTP Status Code untuk "Internal Server Error" (Server Crash) adalah...**  
   **Jawaban:** d. 500

4. **Apa itu "Soft Delete"?**  
   **Jawaban:** c. Menandai data sebagai "terhapus" (misal dengan kolom deletedAt) tanpa benar-benar menghapusnya dari database

5. **Library express-async-errors berfungsi untuk...**  
   **Jawaban:** b. Menangani error di fungsi async secara otomatis tanpa perlu try-catch manual di setiap route

6. **Jika user gagal login karena password salah, status code yang tepat adalah...**  
   **Jawaban:** b. 401 Unauthorized

7. **Kode error Prisma untuk "Unique Constraint Violation" (Data kembar) adalah...**  
   **Jawaban:** a. P2002

8. **Di mana sebaiknya kita meletakkan middleware Error Handler di Express?**  
   **Jawaban:** c. Paling bawah setelah semua route

9. **Apa bahayanya menampilkan err.stack (Stack Trace) ke user di production?**  
   **Jawaban:** b. User jadi tahu struktur folder dan celah keamanan server kita

10. **Status code 201 Created biasanya digunakan setelah berhasil melakukan...**  
    **Jawaban:** b. POST (Create Data)
