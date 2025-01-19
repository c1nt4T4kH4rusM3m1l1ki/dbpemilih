// utils/nikParser.js
export class NikParser {
    constructor(nik = null) {
      this.tanggalLahir = null;
      this.jenisKelamin = null;
      this.umur = null;
      this.error = null;
  
      // Jika NIK diberikan saat instansiasi, langsung proses
      if (nik) {
        this.parseNIK(nik);
      }
    }
  
    /**
     * Memproses NIK untuk mendapatkan tanggal lahir, jenis kelamin, dan umur.
     * @param {string} nik - Nomor Induk Kependudukan (16 digit).
     * @returns {NikParser} - Mengembalikan instance ini untuk method chaining.
     */
    parseNIK(nik) {
      try {
        // Reset state
        this.error = null;
  
        // Validasi panjang NIK
        if (nik.length !== 16) {
          throw new Error('NIK harus terdiri dari 16 digit.');
        }
  
        // Ambil 6 digit setelah kode wilayah (digit ke-7 sampai ke-12)
        const tglLahirStr = nik.substring(6, 12);
  
        // Pisahkan tanggal, bulan, dan tahun
        let tanggal = parseInt(tglLahirStr.substring(0, 2), 10);
        const bulan = parseInt(tglLahirStr.substring(2, 4), 10);
        let tahun = parseInt(tglLahirStr.substring(4, 6), 10);
  
        // Cek jenis kelamin berdasarkan tanggal
        if (tanggal > 40) {
          tanggal -= 40; // Kurangi 40 untuk mendapatkan tanggal asli
          this.jenisKelamin = 'Perempuan';
        } else {
          this.jenisKelamin = 'Laki-laki';
        }
  
        // Konversi tahun dari 2 digit ke 4 digit
        if (tahun <= 30) {
          tahun += 2000; // Tahun 2000-an
        } else {
          tahun += 1900; // Tahun 1900-an
        }
  
        // Validasi tanggal dan bulan
        const jumlahHariDalamBulan = new Date(tahun, bulan, 0).getDate();
        if (
          isNaN(tanggal) ||
          isNaN(bulan) ||
          isNaN(tahun) ||
          tanggal < 1 ||
          tanggal > jumlahHariDalamBulan ||
          bulan < 1 ||
          bulan > 12
        ) {
          throw new Error('Format tanggal lahir dalam NIK tidak valid.');
        }
  
        // Simpan tanggal lahir sebagai objek Date
        const date = new Date(tahun, bulan - 1, tanggal);
  
        // Hitung umur
        const hariIni = new Date();
        let age = hariIni.getFullYear() - date.getFullYear();
        if (
          hariIni.getMonth() < date.getMonth() ||
          (hariIni.getMonth() === date.getMonth() && hariIni.getDate() < date.getDate())
        ) {
          age--; // Kurangi umur jika ulang tahun belum lewat
        }
  
        // Set nilai
        this.tanggalLahir = date.toLocaleDateString('id-ID', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        });
        this.umur = age;
      } catch (err) {
        this.error = err.message;
        this.tanggalLahir = null;
        this.jenisKelamin = null;
        this.umur = null;
      }
  
      // Return instance untuk method chaining
      return this;
    }
  
    /**
     * Static method untuk instansiasi dan parsing dalam satu baris.
     * @param {string} nik - Nomor Induk Kependudukan (16 digit).
     * @returns {NikParser} - Instance NikParser yang sudah diproses.
     */
    static parse(nik) {
      return new NikParser(nik);
    }
  }