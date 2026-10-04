const form = document.getElementById('consultForm');

// Tampilkan riwayat pesanan yang sudah tersimpan, begitu halaman dibuka
function renderOrderHistory() {
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const list = document.getElementById('orderList');

  if (orders.length === 0) {
    list.innerHTML = `<li class="list-group-item text-muted">Belum ada riwayat.</li>`;
    return;
  }

  list.innerHTML = orders.map(o => `
    <li class="list-group-item">
      <strong>${o.nama}</strong> — ${o.pesan}
      <span class="badge bg-secondary float-end">${new Date(o.timestamp).toLocaleTimeString()}</span>
    </li>
  `).join('');
}

function showToast(title, message) {
  document.getElementById('toastTitle').textContent = title;
  document.getElementById('toastBody').textContent = message;
  const toastEl = document.getElementById('notifToast');
  new bootstrap.Toast(toastEl).show();
}

form.addEventListener('submit', async (e) => {
  e.preventDefault(); // KUNCI UTAMA: mencegah reload halaman standar

  const formData = new FormData(form);
  const payload = Object.fromEntries(formData.entries());

  const submitBtn = form.querySelector('button[type="submit"]');
  submitBtn.disabled = true;
  submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Mengirim...`;

  try {
    // Simulasi delay kirim ke server (nanti di tugas asli, ini beneran fetch POST)
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Simpan ke localStorage
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push({ ...payload, timestamp: new Date().toISOString() });
    localStorage.setItem('orders', JSON.stringify(orders));

    showToast('Sukses!', 'Permintaan berhasil dikirim tanpa reload halaman.');
    form.reset();
    renderOrderHistory();

  } catch (err) {
    showToast('Gagal', 'Terjadi kesalahan, coba lagi.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.innerHTML = 'Kirim Permintaan';
  }
});

document.addEventListener('DOMContentLoaded', renderOrderHistory);