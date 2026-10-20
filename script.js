document.addEventListener('DOMContentLoaded', () => {
  /* ==========================================================================
     1. NAVBAR & MOBILE MENU TOGGLE
     ========================================================================== */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobLinks = document.querySelectorAll('.mob-link');

  // Toggle mobile menu
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
  });

  // Tutup mobile menu saat link diklik
  mobLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      mobileMenu.classList.remove('open');
    });
  });

  // Ubah style navbar saat di-scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  /* ==========================================================================
     2. SMOOTH SCROLL & ACTIVE NAV LINK OBSERVER
     ========================================================================== */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  // Observer untuk menandai menu navigasi yang aktif berdasarkan scroll
  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentId}`) {
              link.classList.add('active');
            }
          });
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach(section => sectionObserver.observe(section));

  /* ==========================================================================
     3. HERO TERMINAL TYPING ANIMATION
     ========================================================================== */
  const typedTextSpan = document.getElementById('typedText');
  if (typedTextSpan) {
    const roles = [
      'Fullstack Developer',
      'Laravel & Vue/React Dev',
      'API & Database Architect',
      'UI/UX Enthusiast'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeEffect() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typedTextSpan.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typedTextSpan.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      let speed = isDeleting ? 40 : 80;

      if (!isDeleting && charIndex === currentRole.length) {
        speed = 2000; // Tahan sejenak setelah teks ketik selesai
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        speed = 500;
      }

      setTimeout(typeEffect, speed);
    }

    typeEffect();
  }

  /* ==========================================================================
     4. MOCKUP INTERACTIVE ELEMENTS
     ========================================================================== */
  // A. Realtime Clock untuk WarkopPOS Mockup
  const posTime = document.getElementById('posTime');
  if (posTime) {
    const updatePosClock = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      posTime.textContent = `${hours}:${minutes}`;
    };
    updatePosClock();
    setInterval(updatePosClock, 10000);
  }

  // B. Countdown Timer & Bid Button untuk Barkos Mockup
  const auctionTimer = document.getElementById('auctionTimer');
  const bidAmount = document.getElementById('bidAmount');
  const bidBtn = document.querySelector('.bid-btn');

  let currentBid = 185000;
  let timeRemaining = 134; // 2 menit 14 detik dalam detik

  if (auctionTimer) {
    const timerInterval = setInterval(() => {
      if (timeRemaining <= 0) {
        clearInterval(timerInterval);
        auctionTimer.textContent = 'ENDED';
        if (bidBtn) bidBtn.disabled = true;
        return;
      }
      timeRemaining--;
      const mins = String(Math.floor(timeRemaining / 60)).padStart(2, '0');
      const secs = String(timeRemaining % 60).padStart(2, '0');
      auctionTimer.textContent = `${mins}:${secs}`;
    }, 1000);
  }

  if (bidBtn && bidAmount) {
    bidBtn.addEventListener('click', () => {
      currentBid += 5000;
      bidAmount.textContent = `Rp ${currentBid.toLocaleString('id-ID')}`;
      bidBtn.textContent = 'Bid Placed! (+Rp 5.000)';
      setTimeout(() => {
        bidBtn.textContent = 'Place Bid →';
      }, 1500);
    });
  }

  /* ==========================================================================
     5. CONTACT FORM HANDLING
     ========================================================================== */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const project = document.getElementById('project').value;
      const message = document.getElementById('message').value.trim();

      if (!name || !email || !message) {
        alert('Mohon isi Nama, Email, dan Pesan terlebih dahulu.');
        return;
      }

      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerHTML;

      submitBtn.disabled = true;
      submitBtn.innerHTML = 'Sending...';

      // Simulasi pengiriman form (2 detik)
      setTimeout(() => {
        alert(`Terima kasih ${name}! Pesan kamu telah terkirim. Saya akan membalas ke ${email} secepatnya.`);
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.innerHTML = originalBtnText;
      }, 1500);
    });
  }
});