// ============================================================
// Presentation Layer — kontrol DOM, rendering dinamis, events.
// Semua data didapat lewat ApiService, tidak langsung fetch di sini.
// ============================================================

const state = { projects: [], activeCategory: 'Semua' };

function escapeHTML(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// ---------- PROFILE ----------
async function loadProfile() {
  try {
    const profile = await ApiService.getProfile();
    document.getElementById('profileName').textContent = `Halo, saya ${profile.name}`;
    document.getElementById('profileBio').textContent = profile.bio;
    document.getElementById('profileNim').textContent = profile.nim;
    document.getElementById('profileProgram').textContent = profile.program;
    document.getElementById('profileEmail').textContent = profile.email;
    document.getElementById('profilePhoto').src = profile.photo;
    document.getElementById('statProjects').textContent = profile.stats.projects;
    document.getElementById('statInternships').textContent = profile.stats.internships;
    document.getElementById('statA11y').textContent = profile.stats.accessibility;
  } catch (err) {
    console.error('[Profile Load Error]:', err);
  }
}

// ---------- SKILLS ----------
async function loadSkills() {
  const container = document.getElementById('skillBadges');
  try {
    const skills = await ApiService.getSkills();
    container.innerHTML = skills.map(s => `<li class="list-inline-item badge skill-badge mb-2">${escapeHTML(s)}</li>`).join('');
  } catch (err) {
    container.innerHTML = `<li class="text-danger small">Gagal memuat keahlian.</li>`;
  }
}

// ---------- PROJECTS + FILTER + UI STATES ----------
function renderProjectCards(list) {
  const container = document.getElementById('projectGrid');

  if (list.length === 0) {
    container.innerHTML = `
      <div class="col-12">
        <p class="text-center text-muted py-5">Tidak ada proyek pada kategori ini.</p>
      </div>`; // EMPTY STATE
    return;
  }

  container.innerHTML = list.map(p => `
    <div class="col">
      <article class="card h-100 project-card">
        <img src="${p.thumbnail}" class="card-img-top" alt="${escapeHTML(p.title)}">
        <div class="card-body">
          <span class="badge tech-badge mb-2">${escapeHTML(p.category)}</span>
          <h3 class="h5 card-title">${escapeHTML(p.title)}</h3>
          <p class="card-text text-muted small">${escapeHTML(p.description)}</p>
          <button class="btn btn-outline-primary btn-sm" onclick="openProjectModal(${p.id})">Lihat Detail</button>
        </div>
      </article>
    </div>
  `).join('');
}

function renderCategoryFilters() {
  const categories = ['Semua', ...new Set(state.projects.map(p => p.category))];
  const container = document.getElementById('categoryFilters');
  container.innerHTML = categories.map(cat => `
    <button class="btn btn-sm filter-btn ${cat === state.activeCategory ? 'active' : ''}" data-category="${cat}">
      ${escapeHTML(cat)}
    </button>
  `).join('');

  container.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      state.activeCategory = btn.dataset.category;
      renderCategoryFilters();
      const filtered = state.activeCategory === 'Semua'
        ? state.projects
        : state.projects.filter(p => p.category === state.activeCategory);
      renderProjectCards(filtered);
    });
  });
}

async function loadProjects() {
  const container = document.getElementById('projectGrid');
  container.innerHTML = `
    <div class="col-12 text-center py-5">
      <div class="spinner-border text-primary" role="status"></div>
      <p class="mt-2 text-muted">Memuat proyek...</p>
    </div>`; // LOADING STATE

  try {
    state.projects = await ApiService.getProjects();
    renderCategoryFilters();
    renderProjectCards(state.projects); // SUCCESS STATE
  } catch (err) {
    console.error('[Projects Load Error]:', err);
    container.innerHTML = `
      <div class="col-12">
        <div class="alert alert-danger" role="alert">
          Gagal memuat data proyek. Silakan muat ulang halaman.
        </div>
      </div>`; // ERROR STATE
  }
}

// ---------- UNIVERSAL MODAL ----------
function openProjectModal(projectId) {
  const proj = state.projects.find(p => p.id === projectId);
  if (!proj) return;

  document.getElementById('projectModalTitle').textContent = proj.title;
  document.getElementById('projectModalBody').innerHTML = `
    <img src="${proj.thumbnail}" class="img-fluid rounded mb-3 w-100" alt="${escapeHTML(proj.title)}">
    <p class="text-secondary">${escapeHTML(proj.description)}</p>
    <div class="d-flex flex-wrap gap-2">
      ${proj.tags.map(t => `<span class="badge bg-primary">${escapeHTML(t)}</span>`).join('')}
    </div>
  `;

  const modalEl = document.getElementById('universalProjectModal');
  bootstrap.Modal.getOrCreateInstance(modalEl).show();
}

// ---------- SERVICES CATALOG ----------
async function loadServices() {
  const container = document.getElementById('serviceGrid');
  try {
    const services = await ApiService.getServices();
    container.innerHTML = services.map(s => `
      <div class="col-md-4">
        <div class="card h-100 service-card">
          <div class="card-body">
            <h4 class="h6 fw-bold">${escapeHTML(s.name)}</h4>
            <p class="text-muted small mb-1">${escapeHTML(s.duration)}</p>
            <p class="small">${escapeHTML(s.description)}</p>
            <ul class="small ps-3 mb-0">
              ${s.features.map(f => `<li>${escapeHTML(f)}</li>`).join('')}
            </ul>
          </div>
        </div>
      </div>
    `).join('');
  } catch (err) {
    container.innerHTML = `<div class="alert alert-danger">Gagal memuat katalog layanan.</div>`;
  }
}

// ---------- ORDER HISTORY (localStorage) ----------
function getOrders() {
  return JSON.parse(localStorage.getItem('orders') || '[]');
}

function updateOrderBadge() {
  const badge = document.getElementById('orderBadge');
  const count = getOrders().length;
  badge.textContent = count;
  badge.classList.toggle('d-none', count === 0);
}

function showToast(title, message, isError = false) {
  document.getElementById('toastTitle').textContent = title;
  document.getElementById('toastBody').textContent = message;
  const toastEl = document.getElementById('notifToast');
  toastEl.classList.toggle('text-bg-danger', isError);
  toastEl.classList.toggle('text-bg-success', !isError);
  new bootstrap.Toast(toastEl).show();
}

// ---------- FORM ASYNC SUBMIT ----------
function initForm() {
  const form = document.getElementById('consultForm');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="spinner-border spinner-border-sm"></span> Mengirim...`;

    try {
      const result = await ApiService.submitServiceOrder(payload);

      const orders = getOrders();
      orders.push({ ...payload, orderId: result.orderId, timestamp: result.receivedAt });
      localStorage.setItem('orders', JSON.stringify(orders));

      updateOrderBadge();
      showToast('Sukses!', 'Permintaan layanan berhasil diproses.');
      form.reset();

    } catch (err) {
      console.error('[Form Submit Error]:', err);
      showToast('Gagal', 'Terjadi kesalahan saat mengirim permintaan.', true);
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = '<i class="bi bi-send-check me-1"></i> Kirim Permintaan';
    }
  });
}

// ---------- INIT ----------
document.addEventListener('DOMContentLoaded', () => {
  loadProfile();
  loadSkills();
  loadProjects();
  loadServices();
  initForm();
  updateOrderBadge();
});