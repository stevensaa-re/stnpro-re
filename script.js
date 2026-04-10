(function() {
  const cursorGlow = document.querySelector('.cursor-glow');
  if (cursorGlow) {
    document.addEventListener('mousemove', (e) => {
      cursorGlow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    });
  }

  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle?.querySelector('i');
  
  function setTheme(isDark) {
    if (isDark) {
      document.body.classList.remove('light-mode');
      if (themeIcon) {
        themeIcon.className = 'fas fa-moon';
      }
    } else {
      document.body.classList.add('light-mode');
      if (themeIcon) {
        themeIcon.className = 'fas fa-sun';
      }
    }
  }

  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    setTheme(false);
  } else {
    setTheme(true);
  }

  themeToggle?.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('light-mode');
    setTheme(isDark);
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  });

  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  
  menuToggle?.addEventListener('click', () => {
    mobileMenu?.classList.toggle('active');
  });

  document.querySelectorAll('.mobile-link').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu?.classList.remove('active');
    });
  });

  const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  document.querySelectorAll('.biodata-card, .skills-card, .service-card, .partner-card, .section-header').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
  });

  const skillBars = document.querySelectorAll('.skill-progress');
  const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.style.width;
        entry.target.style.width = width;
      }
    });
  }, { threshold: 0.5 });
  skillBars.forEach(bar => skillObserver.observe(bar));

  const modal = document.getElementById('modal');
  const modalTitle = document.getElementById('modalTitle');
  const modalBtn = document.getElementById('modalBtn');
  let currentLink = '';

  const links = {
    instagram: { title: '📸 Instagram Steven Samuel', url: 'https://www.instagram.com/stvnn_saa?igsh=MTBxcngzOHU5cTIycg==' },
    tiktok: { title: '🎵 TikTok Steven Samuel', url: 'https://www.tiktok.com/@stvnn_saa?_r=1&_t=ZS-92jffrzeYzN' },
    drive: { title: '💾 Google Drive Portfolio', url: 'https://drive.google.com/drive/folders/1YFhjsiriEBeOFB7lhuNfVTu1MUBfKeL1?usp=sharing' },
    donate: { title: '💰 Dukung Karya Saya', url: 'https://sociabuzz.com/stvnn_saaa/tribe' }
  };

  window.openModal = function(type) {
    if (links[type]) {
      modalTitle.textContent = links[type].title;
      currentLink = links[type].url;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeModal = function() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  modalBtn?.addEventListener('click', () => {
    if (currentLink) {
      window.open(currentLink, '_blank');
      closeModal();
    }
  });

  modal?.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  const galleryData = [
    { title: 'PC Server (Lama)', image: 'foto 1.jpg', description: 'PC server pertama yang saya gunakan. Spek low end namun cukup untuk kebutuhan belajar dan eksperimen.' },
    { title: 'PC Custom di Laci Meja', image: 'foto 2.jpg', description: 'Proyek iseng merakit PC di dalam laci meja. Hasilnya suhu lumayan tinggi tapi fun! :v' },
    { title: 'Glances Monitoring', image: 'foto 3.jpg', description: 'Sistem monitoring untuk PC server yang bisa diakses dari mana saja.' },
    { title: 'Mixing di Event', image: 'foto 4.jpg', description: 'Momen ketika saya bertugas sebagai sound engineer mixing untuk sebuah acara.' },
    { title: 'VU Meter Digital (Arduino)', image: 'foto 5.jpg', description: 'Proyek IoT VU Meter digital menggunakan Arduino. Terintegrasi dengan sound system, hasilnya memuaskan! :D' },
    { title: 'Arduino Jadi Gantungan Kunci', image: 'foto 6.jpg', description: 'Arduino yang sudah tidak bisa diupload program lagi saya sulap menjadi gantungan kunci unik.' },
    { title: 'Proyek Jam Digital', image: 'foto 7.jpg', description: 'Jam digital berbasis NTP menggunakan modul TM1637 dan Wemos D1 Mini. Akurasi waktu via internet.' },
    { title: 'Truenas Server', image: 'foto 8.jpg', description: 'Sistem operasi TrueNAS Scale yang saya gunakan di server lama untuk manajemen storage.' },
    { title: 'Setup Laptop', image: 'foto 9.jpeg', description: 'Setup workspace saya. Monitor Acer SA243Y + Laptop Asus M415DAO (Ryzen 3 3250U, 12GB RAM, 512GB SSD).' },
    { title: 'Laptop Rusak → All-In-One PC', image: 'foto 10.jpeg', description: 'Mengubah laptop rusak menjadi PC All-In-One. Lumayan untuk monitoring server wkwkwk :v' },
    { title: 'PC Server Sekarang', image: 'foto 11.jpeg', description: 'PC server saat ini: Intel Core i7-2600, RAM 8GB DDR3, SSD 120GB (Ubuntu Server), HDD 160GB + 1TB. Untuk eksperimen, server Minecraft, dan AikaBot.' },
    { title: 'Kameramen Livestream Gereja', image: 'foto 12.jpeg', description: 'Pelayanan di gereja sebagai kameramen untuk livestream ibadah.' }
  ];

  const galleryGrid = document.getElementById('galleryGrid');
  
  if (galleryGrid) {
    galleryData.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'gallery-item-card';
      card.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="gallery-item-img" loading="lazy">
        <div class="gallery-item-title">${item.title}</div>
      `;
      card.addEventListener('click', () => openGalleryModal(index));
      galleryGrid.appendChild(card);
    });
  }

  const galleryModal = document.getElementById('galleryModal');
  const galleryModalImage = document.getElementById('galleryModalImage');
  const galleryModalTitle = document.getElementById('galleryModalTitle');
  const galleryModalDescription = document.getElementById('galleryModalDescription');

  window.openGalleryModal = function(index) {
    const data = galleryData[index];
    if (data) {
      galleryModalImage.src = data.image;
      galleryModalImage.alt = data.title;
      galleryModalTitle.textContent = data.title;
      galleryModalDescription.textContent = data.description;
      galleryModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  };

  window.closeGalleryModal = function() {
    galleryModal.classList.add('closing');
    setTimeout(() => {
      galleryModal.classList.remove('active', 'closing');
      document.body.style.overflow = '';
    }, 300);
  };

  galleryModal?.addEventListener('click', (e) => {
    if (e.target === galleryModal) closeGalleryModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modal?.classList.contains('active')) closeModal();
      if (galleryModal?.classList.contains('active')) closeGalleryModal();
    }
  });

  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  const style = document.createElement('style');
  style.textContent = `
    .navbar.scrolled {
      padding: 12px 0;
      background: rgba(5, 5, 15, 0.95);
    }
    body.light-mode .navbar.scrolled {
      background: rgba(255, 255, 255, 0.98);
    }
    .gallery-modal.closing {
      animation: fadeOut 0.3s ease;
    }
    @keyframes fadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  const heroStats = document.querySelectorAll('.stat-number');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.textContent);
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            el.textContent = target + (el.textContent.includes('+') ? '+' : '');
            clearInterval(timer);
          } else {
            el.textContent = Math.floor(current) + (el.textContent.includes('+') ? '+' : '');
          }
        }, 30);
        statsObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });
  heroStats.forEach(stat => statsObserver.observe(stat));
})();
