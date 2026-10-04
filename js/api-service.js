// ============================================================
// Data Access Layer — satu-satunya tempat yang boleh "bicara"
// dengan sumber data (file JSON / mock REST endpoint).
// app.js TIDAK PERNAH fetch langsung, selalu lewat sini.
// ============================================================

const ApiService = {
  async getProfile() {
    const res = await fetch('./data/profile.json');
    if (!res.ok) throw new Error(`HTTP Error ${res.status}: ${res.statusText}`);
    return res.json();
  },

  async getProjects() {
    const res = await fetch('./data/project.json');
    if (!res.ok) throw new Error(`HTTP Error ${res.status}: ${res.statusText}`);
    return res.json();
  },

  async getSkills() {
    const res = await fetch('./data/keahlian.json');
    if (!res.ok) throw new Error(`HTTP Error ${res.status}: ${res.statusText}`);
    return res.json();
  },

  async getServices() {
    const res = await fetch('./data/services.json');
    if (!res.ok) throw new Error(`HTTP Error ${res.status}: ${res.statusText}`);
    return res.json();
  },

  // Simulasi REST API POST (belum ada backend asli, jadi disimulasikan).
  // Strukturnya tetap mengikuti pola fetch + async/await yang benar,
  // supaya mudah diganti ke endpoint sungguhan nanti.
  async submitServiceOrder(payload) {
    await new Promise(resolve => setTimeout(resolve, 900)); // simulasi latensi jaringan
    return { success: true, orderId: 'ORD-' + Date.now(), receivedAt: new Date().toISOString() };
  }
};