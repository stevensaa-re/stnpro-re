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

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.section-header').forEach(el => {
    sectionObserver.observe(el);
  });

  const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    animateObserver.observe(el);
  });

  const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.service-card').forEach(el => {
    serviceObserver.observe(el);
  });

  const partnerObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, index * 100);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.partner-card').forEach(el => {
    partnerObserver.observe(el);
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

  let pendingLink = null;
  const confirmModal = document.getElementById('confirmModal');
  const confirmModalText = document.getElementById('confirmModalText');
  const confirmOkBtn = document.getElementById('confirmOkBtn');
  const confirmCancelBtn = document.getElementById('confirmCancelBtn');
  const confirmCloseBtn = document.getElementById('confirmCloseBtn');

  const socialLinks = {
    instagram: { title: 'Instagram', url: 'https://www.instagram.com/stvnn_saa?igsh=MTBxcngzOHU5cTIycg==' },
    tiktok: { title: 'TikTok', url: 'https://www.tiktok.com/@stvnn_saa?_r=1&_t=ZS-95PORgi1v89' },
    drive: { title: 'Google Drive', url: 'https://drive.google.com/drive/folders/1DAQ0gYOpDKs4XM1JHrKLWf4Y5UJ3PSS3?usp=drive_link' },
    donate: { title: 'Sociabuzz', url: 'https://sociabuzz.com/stvnn_saaa/tribe' },
    visekaicity: { title: 'VisekaiCity', url: 'https://stevensaa-re.github.io/VisekaiCity-OFC/' },
    michieworld: { title: 'MichieWorld', url: 'https://stevensaa-re.github.io/MichieWorld/' },
    uniweeb: { title: 'UNIWEEB', url: 'https://uniweeb.vercel.app/' },
    swiftos: { title: 'SwiftOS', url: 'https://stevensaa-re.github.io/SwiftOS/' },
    aikabot: { title: 'AikaBot', url: 'https://wa.me/6285117573210' }
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

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (confirmModal?.classList.contains('active')) closeConfirmModal();
      if (galleryModal?.classList.contains('active')) closeGalleryModal();
    }
  });

  const galleryData = [
    { title: 'PC Server (Lama)', image: 'foto 1.jpg', description: 'PC server pertama yang saya gunakan. Spek low end namun cukup untuk kebutuhan belajar dan eksperimen.' },
    { title: 'Laptop Rusak → All-In-One PC', image: 'foto 10.jpeg', description: 'Mengubah laptop rusak menjadi PC All-In-One. Lumayan untuk monitoring server.' },
    { title: 'PC Server Sekarang', image: 'foto 11.jpeg', description: 'PC server saat ini: Intel Core i7-2600, RAM 8GB DDR3, SSD 120GB (Ubuntu Server), HDD 160GB + 1TB.' },
    { title: 'Kameramen Livestream Gereja', image: 'foto 12.jpeg', description: 'Pelayanan di gereja sebagai kameramen untuk livestream ibadah.' },
    { title: 'PC Custom di Laci Meja', image: 'foto 2.jpg', description: 'Proyek iseng merakit PC di dalam laci meja. Hasilnya suhu lumayan tinggi tapi fun!' },
    { title: 'Glances Monitoring', image: 'foto 3.jpg', description: 'Sistem monitoring untuk PC server yang bisa diakses dari mana saja.' },
    { title: 'Mixing di Event', image: 'foto 4.jpg', description: 'Momen ketika saya bertugas sebagai sound engineer mixing untuk sebuah acara.' },
    { title: 'VU Meter Digital (Arduino)', image: 'foto 5.jpg', description: 'Proyek IoT VU Meter digital menggunakan Arduino. Terintegrasi dengan sound system.' },
    { title: 'Arduino Jadi Gantungan Kunci', image: 'foto 6.jpg', description: 'Arduino yang sudah tidak bisa diupload program lagi saya sulap menjadi gantungan kunci unik.' },
    { title: 'Proyek Jam Digital', image: 'foto 7.jpg', description: 'Jam digital berbasis NTP menggunakan modul TM1637 dan Wemos D1 Mini.' },
    { title: 'Truenas Server', image: 'foto 8.jpg', description: 'Sistem operasi TrueNAS Scale yang saya gunakan di server lama untuk manajemen storage.' },
    { title: 'Setup Laptop', image: 'foto 9.jpeg', description: 'Setup workspace saya. Monitor Acer SA243Y + Laptop Asus M415DAO.' }
  ];

  const galleryScroll = document.getElementById('galleryScroll');
  
  if (galleryScroll) {
    galleryData.forEach((item, index) => {
      const card = document.createElement('div');
      card.className = 'gallery-item-card';
      card.innerHTML = `
        <img src="${item.image}" alt="${item.title}" class="gallery-item-img" loading="lazy" onerror="this.src='STN_PROJECT.png'">
        <div class="gallery-item-title">${item.title}</div>
      `;
      card.addEventListener('click', () => openGalleryModal(index));
      galleryScroll.appendChild(card);
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
    galleryModal.classList.add('closing');
    setTimeout(() => {
      galleryModal.classList.remove('active', 'closing');
      document.body.style.overflow = '';
    }, 300);
  };

  galleryModal?.addEventListener('click', (e) => {
    if (e.target === galleryModal) closeGalleryModal();
  });

  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  const heroScroll = document.querySelector('.hero-scroll');
  heroScroll?.addEventListener('click', () => {
    document.getElementById('biodata')?.scrollIntoView({ behavior: 'smooth' });
  });
})();
