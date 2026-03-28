for (let i = 0; i < 50; i++) {
  const p = document.createElement('div');
  p.className = 'particle';
  p.style.left = Math.random() * 100 + '%';
  p.style.animationDelay = Math.random() * 15 + 's';
  p.style.animationDuration = (Math.random() * 10 + 10) + 's';
  document.getElementById('particles').appendChild(p);
}

const themeToggle = document.getElementById('themeToggle');
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  themeToggle.textContent = document.body.classList.contains('light-mode') ? '🌙 Mode Gelap' : '☀️ Mode Terang';
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) e.target.classList.add('visible');
  });
}, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
document.querySelectorAll('.section-card').forEach(c => observer.observe(c));

const modal = document.getElementById('modal');
const modalTitle = document.getElementById('modalTitle');
const modalBtn = document.getElementById('modalBtn');
let currentLink = '';

const links = {
  instagram: { title: '📸 Lihat Instagram Saya', url: 'https://www.instagram.com/stvnn_saa?igsh=MTBxcngzOHU5cTIycg==' },
  tiktok: { title: '🎵 Lihat Akun TikTok Saya', url: 'https://www.tiktok.com/@stvnn_saa?_r=1&_t=ZS-92jffrzeYzN' },
  drive: { title: '💾 Kunjungi Google Drive', url: 'https://drive.google.com/drive/folders/1YFhjsiriEBeOFB7lhuNfVTu1MUBfKeL1?usp=sharing' },
  donate: { title: '💰 Donate via Sociabuzz', url: 'https://sociabuzz.com/stvnn_saaa/tribe' }
};

function openModal(type) {
  modalTitle.textContent = links[type].title;
  currentLink = links[type].url;
  modal.classList.add('active');
}

function closeModal() {
  modal.classList.remove('active');
}

modalBtn.addEventListener('click', () => {
  window.open(currentLink, '_blank');
  closeModal();
});

modal.addEventListener('click', (e) => {
  if (e.target === modal) closeModal();
});

const galleryData = [
  { title: 'PC Server (lama)', image: 'foto 1.jpg', description: 'ini adalah PC server yang aku pakai. speknya masih low end, tapi cukup untuk kebutuhan aku saat ini.' },
  { title: 'PC Custom ceritanya', image: 'foto 2.jpg', description: 'aku iseng buat ngerakit pc didalem laci meja. hasilnya ya suhunya tinggi wkwk :v.' },
  { title: 'Glances Monitoring', image: 'foto 3.jpg', description: 'sebuah proyek untuk memonitoring PC server saya. dan bisa diakses dimana saja.' },
  { title: 'Mixing di Event', image: 'foto 4.jpg', description: 'ini adalah momen dimana aku ditugaskan untuk mixing disebuah acara.' },
  { title: 'VU Meter Digital (Arduino)', image: 'foto 5.jpg', description: 'ini adalah salah satu proyek IOT yang aku kerjakan, yaitu vu meter digital. vu meter ini digabungkan ke sound system saya dan hasilnya memuaskan juga wkwk :D' },
  { title: 'Arduino jadi Gantungan Kunci', image: 'foto 6.jpg', description: 'ini momen disaat arduino aku sudah tewas (sudah gabisa upload codingan lagi) jadi aku jadiin gantungan kunci aja biar berguna sedikit :v.' },
  { title: 'Proyek Jam Digital', image: 'foto 7.jpg', description: 'aku membuat jam digital ini dari modul TM1637 dan Wemos D1 Mini. sistemnya pakai NTP (bukan RTC).' },
  { title: 'Truenas Server', image: 'foto 8.jpg', description: 'ini OS yang aku gunakan di server lama, Truenas Scale.' },
  { title: 'Setup Laptop', image: 'foto 9.jpeg', description: 'ini setup laptop aku.\nMonitor: Acer SA243Y\nLaptop: Asus M415DAO — Ryzen 3 3250U, RAM 12GB DDR4, SSD 512GB.' },
  { title: 'Laptop Rusak → All-In-One PC', image: 'foto 10.jpeg', description: 'ini adalah proyek aku buat ngejadiin laptop yang rusak buat jadi PC All In One. laptop jadul sih, tapi lumayan lah buat mantau server wkwkw :v' },
  { title: 'PC Server Sekarang', image: 'foto 11.jpeg', description: 'ini adalah PC server aku yang sekarang.\nSpek: Intel Core i7-2600, RAM 8GB DDR3, SSD 120GB (OS : ubuntu server), HDD 160GB + 1TB.\nDipakai buat eksperimen, server Minecraft, dan running AikaBot (WhatsApp bot aku).' },
  { title: 'Kameramen Livestream Gereja', image: 'foto 12.jpeg', description: 'ini pas kemarin aku pelayanan di gereja sebagai kameramen buat livestream gereja.' }
];

const galleryModal = document.getElementById('galleryModal');
const galleryModalImage = document.getElementById('galleryModalImage');
const galleryModalTitle = document.getElementById('galleryModalTitle');
const galleryModalDescription = document.getElementById('galleryModalDescription');

function openGalleryModal(i) {
  const d = galleryData[i];
  galleryModalImage.src = d.image;
  galleryModalImage.alt = d.title;
  galleryModalTitle.textContent = d.title;
  galleryModalDescription.textContent = d.description;
  galleryModal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeGalleryModal() {
  galleryModal.classList.add('closing');
  setTimeout(() => {
    galleryModal.classList.remove('active', 'closing');
    document.body.style.overflow = '';
  }, 300);
}

galleryModal.addEventListener('click', (e) => {
  if (e.target === galleryModal) closeGalleryModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (modal.classList.contains('active')) closeModal();
    if (galleryModal.classList.contains('active')) closeGalleryModal();
  }
});
