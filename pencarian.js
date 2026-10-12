// pencarian.js

function filterTable(keyword, tbodyId) {
  const filter = keyword.toLowerCase();
  const tbody = document.getElementById(tbodyId);
  
  if (!tbody) return; 

  const rows = tbody.getElementsByTagName('tr');

  for (let i = 0; i < rows.length; i++) {
    // Abaikan baris pesan "Data kosong"
    if (rows[i].cells.length === 1 && rows[i].cells[0].colSpan > 1) continue;

    const rowText = rows[i].textContent || rows[i].innerText;
    
    if (rowText.toLowerCase().indexOf(filter) > -1) {
      rows[i].style.display = ""; 
    } else {
      rows[i].style.display = "none"; 
    }
  }
}