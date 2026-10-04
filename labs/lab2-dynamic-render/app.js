const state = { projects: [] };

// Fungsi ini mencegah XSS: kalau ada teks aneh di data, dia dijadikan teks polos, bukan kode
function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

async function loadProjects() {
  const container = document.getElementById('projectGrid');

  // 1. LOADING STATE dulu, sebelum data datang
  container.innerHTML = `
    <div class="text-center py-5">
      <div class="spinner-border text-primary"></div>
      <p class="mt-2 text-muted">Memuat proyek...</p>
    </div>`;

  try {
    // 2. Minta data ke project.json, TUNGGU (await) sampai selesai
    const response = await fetch('./project.json');
    if (!response.ok) throw new Error(`HTTP Error ${response.status}`);
    state.projects = await response.json();

    // 3. Kalau datanya kosong
    if (state.projects.length === 0) {
      container.innerHTML = `<p class="text-muted">Belum ada proyek.</p>`;
      return;
    }

    // 4. SUCCESS: bangun kartu HTML dari data JSON pakai .map()
    container.innerHTML = state.projects.map(p => `
      <div class="col">
        <div class="card h-100">
          <img src="${p.thumbnail}" class="card-img-top" alt="${escapeHTML(p.title)}">
          <div class="card-body">
            <span class="badge bg-secondary mb-2">${escapeHTML(p.category)}</span>
            <h5 class="card-title">${escapeHTML(p.title)}</h5>
            <p class="card-text text-muted small">${escapeHTML(p.description)}</p>
            <button class="btn btn-outline-primary btn-sm" onclick="openProjectModal(${p.id})">Lihat Detail</button>
          </div>
        </div>
      </div>
    `).join('');

  } catch (err) {
    // 5. ERROR STATE kalau fetch gagal
    console.error('[API Error]:', err);
    container.innerHTML = `<div class="alert alert-danger">Gagal memuat data proyek.</div>`;
  }
}

function openProjectModal(projectId) {
  const proj = state.projects.find(p => p.id === projectId);
  if (!proj) return;

  document.getElementById('projectModalTitle').textContent = proj.title;
  document.getElementById('projectModalBody').innerHTML = `
    <img src="${proj.thumbnail}" class="img-fluid rounded mb-3 w-100">
    <p>${escapeHTML(proj.description)}</p>
  `;

  const modalEl = document.getElementById('universalProjectModal');
  bootstrap.Modal.getOrCreateInstance(modalEl).show();
}

// Jalankan loadProjects() begitu halaman selesai dimuat
document.addEventListener('DOMContentLoaded', loadProjects);