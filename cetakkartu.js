// cetakkartu.js

// 1. Fungsi Cetak 1 Anggota (Berdasarkan ID)
function cetakKartu(memberId) {
  const members = getRecordsByType('member');
  const member = members.find(m => m.__backendId === memberId);
  
  if (!member) {
    alert('Data anggota tidak ditemukan!');
    return;
  }

  generatePrintWindow([member], `Cetak Kartu Anggota - ${member.memberName}`);
}

// 2. Fungsi Cetak SEMUA Anggota
function cetakSemuaKartu() {
  const members = getRecordsByType('member');
  
  if (!members || members.length === 0) {
    alert('Belum ada data anggota yang bisa dicetak!');
    return;
  }

  generatePrintWindow(members, 'Cetak Semua Kartu Anggota');
}

// 3. Fungsi Inti untuk Generate HTML dan Membuka Print Window
function generatePrintWindow(membersArray, title) {
  const printWindow = window.open('', '_blank');
  
  // Looping untuk membuat elemen kartu sebanyak jumlah anggota
  let cardsHtml = '';
  membersArray.forEach(member => {
    const tglDaftar = typeof formatDate === 'function' ? formatDate(member.timestamp) : member.timestamp;
    const shortId = member.__backendId.substring(0, 8).toUpperCase();

    cardsHtml += `
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
    `;
  });

  // Template utama yang membungkus semua kartu
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <title>${title}</title>
      <link rel="stylesheet" href="style.css">
    </head>
    <body class="print-body">
      <div class="cards-wrapper">
        ${cardsHtml}
      </div>
      
      <script>
        window.onload = function() {
          // Memberi waktu sedikit lebih lama agar CSS selesai dimuat
          setTimeout(() => {
            window.print();
          }, 800);
        }
      </script>
    </body>
    </html>
  `;

  printWindow.document.open();
  printWindow.document.write(htmlContent);
  printWindow.document.close();
}