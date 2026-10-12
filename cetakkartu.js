// cetakkartu.js

function cetakKartu(memberId) {
  // Ambil data dari database/storage (sesuaikan dengan fungsi di sistem Anda)
  const members = getRecordsByType('member');
  const member = members.find(m => m.__backendId === memberId);
  
  if (!member) {
    alert('Data anggota tidak ditemukan!');
    return;
  }

  // Buka jendela baru untuk mencetak
  const printWindow = window.open('', '_blank');
  
  // Format tanggal (pastikan fungsi formatDate tersedia secara global)
  const tglDaftar = typeof formatDate === 'function' ? formatDate(member.timestamp) : member.timestamp;
  const shortId = member.__backendId.substring(0, 8).toUpperCase();

  // Template HTML yang akan dicetak
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>Cetak Kartu Anggota - ${member.memberName}</title>
      <!-- Memanggil file CSS eksternal -->
      <link rel="stylesheet" href="style.css">
    </head>
    <body class="print-body">
      <div class="member-card">
        <div class="card-header">
          <h2>KARTU ANGGOTA PERPUSTAKAAN</h2>
          <p>Kartu ini harap dibawa saat meminjam buku</p>
        </div>
        <div class="card-content">
          <div><strong>Nama Lengkap</strong> : ${member.memberName}</div>
          <div><strong>Kelas</strong> : ${member.memberClass}</div>
          <div><strong>No. Telepon</strong> : ${member.memberPhone}</div>
          <div><strong>Tgl. Daftar</strong> : ${tglDaftar}</div>
        </div>
        <div class="card-footer">
          ID: ${shortId}
        </div>
      </div>
      
      <script>
        // Logika otomatis mencetak saat jendela selesai dimuat
        window.onload = function() {
          setTimeout(() => {
            window.print();
          }, 500);
        }
      </script>
    </body>
    </html>
  `;

  // Tulis HTML ke jendela baru dan tutup dokumen agar browser mulai merender
  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
}