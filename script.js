(function() {
  const heroVu = document.getElementById('heroVu');
  if (heroVu) {
    const bars = 22;
    for (let i = 0; i < bars; i++) {
      const bar = document.createElement('span');
      bar.style.setProperty('--i', i);
      bar.style.setProperty('--h', `${35 + Math.round(Math.random() * 60)}%`);
      bar.style.animationDuration = `${1.1 + Math.random() * 0.9}s`;
      heroVu.appendChild(bar);
    }
  }

  document.querySelectorAll('.services-grid, .project-grid, .contact-grid, .biodata-grid').forEach(group => {
    Array.from(group.children).forEach((child, i) => {
      child.style.setProperty('--stagger', i);
    });
  });

  document.querySelectorAll('.meter').forEach(meter => {
    Array.from(meter.children).forEach((bar, i) => {
      bar.style.setProperty('--bar-i', i);
    });
  });

  const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const el = entry.target;
      if (entry.isIntersecting) {
        const target = parseInt(el.dataset.value, 10) || 0;
        const duration = 900;
        const start = performance.now();
        const runId = (el.dataset.runId = String(Math.random()));
        function tick(now) {
          if (el.dataset.runId !== runId) return;
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = `${Math.round(eased * target)}%`;
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
      } else {
        el.dataset.runId = '';
        el.textContent = '0%';
      }
    });
  }, { threshold: 0.4 });

  document.querySelectorAll('.skill-percent').forEach(el => {
    const val = parseInt(el.textContent, 10);
    if (!isNaN(val)) {
      el.dataset.value = val;
      el.textContent = '0%';
      countObserver.observe(el);
    }
  });

  const themeToggle = document.getElementById('themeToggle');
  const themeIcon = themeToggle?.querySelector('i');

  function setTheme(isDark) {
    if (isDark) {
      document.body.classList.remove('light-mode');
      if (themeIcon) themeIcon.className = 'fas fa-moon';
    } else {
      document.body.classList.add('light-mode');
      if (themeIcon) themeIcon.className = 'fas fa-sun';
    }
  }

  const savedTheme = localStorage.getItem('theme');
  setTheme(savedTheme !== 'light');

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

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      } else {
        entry.target.classList.remove('visible');
      }
    });
  }, { threshold: 0.15 });

  function startRevealObserving(elements) {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        elements.forEach(el => revealObserver.observe(el));
      });
    });
  }

  startRevealObserving(document.querySelectorAll('.section-header, .animate-on-scroll'));

  let pendingLink = null;
  const confirmModal = document.getElementById('confirmModal');
  const confirmModalText = document.getElementById('confirmModalText');
  const confirmOkBtn = document.getElementById('confirmOkBtn');
  const confirmCancelBtn = document.getElementById('confirmCancelBtn');
  const confirmCloseBtn = document.getElementById('confirmCloseBtn');

  const socialLinks = {
    instagram: { title: 'Instagram', url: 'https://www.instagram.com/stvnn_saa?igsh=MTBxcngzOHU5cTIycg==' },
    instagramProjek: { title: 'Instagram Proyek', url: 'https://www.instagram.com/stvnn.saa?igsh=MXd1dmtvbXBhaTFkag==' },
    instagramStn: { title: 'Instagram STN Project Reborn', url: 'https://www.instagram.com/stnpro_re' },
    tiktok: { title: 'TikTok', url: 'https://www.tiktok.com/@stvnn_saa?_r=1&_t=ZS-95PORgi1v89' },
    drive: { title: 'Google Drive', url: 'https://drive.google.com/drive/folders/1DAQ0gYOpDKs4XM1JHrKLWf4Y5UJ3PSS3?usp=drive_link' },
    donate: { title: 'Sociabuzz', url: 'https://sociabuzz.com/stvnn_saaa/tribe' },
    visekaicity: { title: 'VisekaiCity', url: 'https://stevensaa-re.github.io/VisekaiCity-OFC/' },
    michieworld: { title: 'MichieWorld', url: 'https://stevensaa-re.github.io/MichieWorld/' },
    uniweeb: { title: 'UNIWEEB', url: 'https://uniweeb.base44.app/' },
    swiftos: { title: 'SwiftOS', url: 'https://swiftos.base44.app' },
    aikabot: { title: 'AikaBot', url: 'https://wa.me/6285722030679' },
    waAdmin: { title: 'WhatsApp Admin STN Project Reborn', url: 'https://wa.me/6285117499784' },
    telegramKaoruko: { title: 'Kaoruko Waguri Bot', url: 'https://t.me/KaorukooWagurii_bot' },
    sssiTiktok: { title: 'TikTok Sedulur Sound System Indonesia', url: 'https://tiktok.com/@sssi.ofc' },
    sssiWhatsapp: { title: 'Grup WhatsApp Sedulur Sound System Indonesia', url: 'https://chat.whatsapp.com/IrDxqFBn5K8EtlD0IQvde1?mode=gi_t' }
  };

  function closeConfirmModal() {
    confirmModal?.classList.remove('active');
    pendingLink = null;
    document.body.style.overflow = '';
  }

  function openConfirmModal(type) {
    const link = socialLinks[type];
    if (link) {
      pendingLink = link.url;
      confirmModalText.textContent = `Apakah Anda ingin membuka ${link.title}?`;
      confirmModal?.classList.add('active');
      document.body.style.overflow = 'hidden';
    }
  }

  confirmOkBtn?.addEventListener('click', () => {
    if (pendingLink) {
      window.open(pendingLink, '_blank');
      closeConfirmModal();
    }
  });

  confirmCancelBtn?.addEventListener('click', closeConfirmModal);
  confirmCloseBtn?.addEventListener('click', closeConfirmModal);
  confirmModal?.addEventListener('click', (e) => {
    if (e.target === confirmModal) closeConfirmModal();
  });

  window.openConfirmModal = openConfirmModal;

  const telegramModal = document.getElementById('telegramModal');
  const telegramCloseBtn = document.getElementById('telegramCloseBtn');

  function openTelegramModal() {
    telegramModal?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeTelegramModal() {
    telegramModal?.classList.remove('active');
    document.body.style.overflow = '';
  }

  window.openTelegramModal = openTelegramModal;
  window.closeTelegramModal = closeTelegramModal;

  telegramCloseBtn?.addEventListener('click', closeTelegramModal);
  telegramModal?.addEventListener('click', (e) => {
    if (e.target === telegramModal) closeTelegramModal();
  });

  const sssiModal = document.getElementById('sssiModal');
  const sssiCloseBtn = document.getElementById('sssiCloseBtn');

  function openSssiModal() {
    sssiModal?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeSssiModal() {
    sssiModal?.classList.remove('active');
    document.body.style.overflow = '';
  }

  window.openSssiModal = openSssiModal;
  window.closeSssiModal = closeSssiModal;

  sssiCloseBtn?.addEventListener('click', closeSssiModal);
  sssiModal?.addEventListener('click', (e) => {
    if (e.target === sssiModal) closeSssiModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (confirmModal?.classList.contains('active')) closeConfirmModal();
      if (galleryModal?.classList.contains('active')) closeGalleryModal();
      if (telegramModal?.classList.contains('active')) closeTelegramModal();
      if (sssiModal?.classList.contains('active')) closeSssiModal();
    }
  });

  const galleryData = [
    { title: 'PC Server (Lama)', image: 'foto 1.jpg', description: 'PC server pertama yang saya gunakan. Spek low end namun cukup untuk kebutuhan belajar dan eksperimen.' },
    { title: 'Laptop Rusak jadi All-In-One', image: 'foto 10.jpeg', description: 'Mengubah laptop rusak menjadi PC all-in-one. Lumayan untuk monitoring server.' },
    { title: 'PC Server Sekarang', image: 'foto 11.jpeg', description: 'PC server saat ini: Intel Xeon X3440, RAM 8GB DDR3, SSD 120GB (Proxmox), HDD 1TB.' },
    { title: 'Kameramen Livestream Gereja', image: 'foto 12.jpeg', description: 'Pelayanan di gereja sebagai kameramen untuk livestream ibadah.' },
    { title: 'PC Custom di Laci Meja', image: 'foto 2.jpg', description: 'Proyek iseng merakit PC di dalam laci meja. Suhunya lumayan tinggi tapi seru.' },
    { title: 'Glances Monitoring', image: 'foto 3.jpg', description: 'Sistem monitoring untuk PC server yang bisa diakses dari mana saja.' },
    { title: 'Mixing di Event', image: 'foto 4.jpg', description: 'Momen bertugas sebagai sound engineer mixing untuk sebuah acara.' },
    { title: 'VU Meter Digital (Arduino)', image: 'foto 5.jpg', description: 'Proyek IoT VU meter digital menggunakan Arduino, terintegrasi dengan sound system.' },
    { title: 'Arduino Jadi Gantungan Kunci', image: 'foto 6.jpg', description: 'Arduino yang sudah tidak bisa diupload program lagi disulap jadi gantungan kunci.' },
    { title: 'Proyek Jam Digital', image: 'foto 7.jpg', description: 'Jam digital berbasis NTP menggunakan modul TM1637 dan Wemos D1 Mini.' },
    { title: 'TrueNAS Server', image: 'foto 8.jpg', description: 'TrueNAS Scale yang saya gunakan di server lama untuk manajemen storage.' },
    { title: 'Setup Laptop', image: 'foto 9.jpeg', description: 'Setup workspace saya: monitor Acer SA243Y dan laptop Asus M415DAO.' }
  ];

  const galleryScroll = document.getElementById('galleryScroll');

  if (galleryScroll) {
    galleryData.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'gallery-item-card animate-on-scroll';
      card.style.setProperty('--stagger', index % 6);
      card.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="gallery-item-img" loading="lazy" onerror="this.src='STN_PROJECT.png'">
        <div class="gallery-item-title">${item.title}</div>
      `;
      card.addEventListener('click', () => openGalleryModal(index));
      galleryScroll.appendChild(card);
      startRevealObserving([card]);
    });
  }

  const galleryScrollLeft = document.getElementById('galleryScrollLeft');
  const galleryScrollRight = document.getElementById('galleryScrollRight');

  galleryScrollLeft?.addEventListener('click', () => {
    galleryScroll.scrollBy({ left: -320, behavior: 'smooth' });
  });

  galleryScrollRight?.addEventListener('click', () => {
    galleryScroll.scrollBy({ left: 320, behavior: 'smooth' });
  });

  const partnersScroll = document.getElementById('partnersScroll');
  const partnersScrollLeft = document.getElementById('partnersScrollLeft');
  const partnersScrollRight = document.getElementById('partnersScrollRight');

  partnersScrollLeft?.addEventListener('click', () => {
    partnersScroll.scrollBy({ left: -300, behavior: 'smooth' });
  });

  partnersScrollRight?.addEventListener('click', () => {
    partnersScroll.scrollBy({ left: 300, behavior: 'smooth' });
  });

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
    galleryModal.classList.remove('active');
    document.body.style.overflow = '';
  };

  galleryModal?.addEventListener('click', (e) => {
    if (e.target === galleryModal) closeGalleryModal();
  });

  const navbar = document.querySelector('.navbar');
  const scrollProgress = document.getElementById('scrollProgress');

  function updateScrollUI() {
    if (window.scrollY > 40) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
    if (scrollProgress) {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const progress = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
      scrollProgress.style.width = `${progress}%`;
    }
  }

  window.addEventListener('scroll', updateScrollUI);
  updateScrollUI();

  const heroScroll = document.querySelector('.hero-scroll');
  heroScroll?.addEventListener('click', () => {
    document.getElementById('biodata')?.scrollIntoView({ behavior: 'smooth' });
  });
})();
