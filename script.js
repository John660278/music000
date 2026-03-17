/* ==========================================
   THE EVOLUTION OF MUSIC — JavaScript
   Features: Hamburger, Scroll-to-Top,
             Gallery Modal, Scroll Reveal,
             Particles, Form Handler, Navbar
   ========================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
     1. NAVBAR — Scroll Effect & Active Link
     ========================================== */
  const header = document.getElementById('header');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  function updateNav() {
    // Scrolled style
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }

    // Active link highlight
    let current = '';
    sections.forEach(sec => {
      const sectionTop = sec.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav();

  /* ==========================================
     2. HAMBURGER MENU (Mobile)
     ========================================== */
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navMenu.classList.toggle('open');
    document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
  });

  // Close on nav link click
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // Close on outside click
  document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
      hamburger.classList.remove('open');
      navMenu.classList.remove('open');
      document.body.style.overflow = '';
    }
  });

  /* ==========================================
     3. SCROLL TO TOP BUTTON
     ========================================== */
  const scrollTopBtn = document.getElementById('scroll-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ==========================================
     4. GALLERY MODAL POPUP
     ========================================== */
  const modal = document.getElementById('gallery-modal');
  const modalOverlay = document.getElementById('modal-overlay');
  const modalClose = document.getElementById('modal-close');
  const modalTitle = document.getElementById('modal-title');
  const modalDesc = document.getElementById('modal-desc');
  const modalIcon = document.getElementById('modal-icon');
  const galleryItems = document.querySelectorAll('.gallery-item');

  // Icon map per gallery item
  const iconMap = {
    'เปียโน': '<i class="fas fa-music fa-3x" style="color:#a78bfa"></i>',
    'กีตาร์ไฟฟ้า': '<i class="fas fa-guitar fa-3x" style="color:#f87171"></i>',
    'กลอง': '<i class="fas fa-drum fa-3x" style="color:#38bdf8"></i>',
    'ไวโอลิน': '<i class="fas fa-music fa-3x" style="color:#fbbf24"></i>',
    'Turntable': '<i class="fas fa-record-vinyl fa-3x" style="color:#e879f9"></i>',
    'Synthesizer': '<i class="fas fa-wave-square fa-3x" style="color:#2dd4bf"></i>',
  };

  function openModal(item) {
    const title = item.getAttribute('data-title');
    const desc = item.getAttribute('data-desc');
    const label = item.querySelector('p').textContent.trim();

    modalTitle.textContent = title;
    modalDesc.textContent = desc;
    modalIcon.innerHTML = iconMap[label] || '<i class="fas fa-music fa-3x" style="color:#a855f7"></i>';

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
  }

  galleryItems.forEach(item => {
    item.addEventListener('click', () => openModal(item));
  });

  modalClose.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('open')) closeModal();
  });

  /* ==========================================
     5. SCROLL REVEAL ANIMATION
     ========================================== */
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -40px 0px'
  });

  revealEls.forEach(el => revealObserver.observe(el));

  /* ==========================================
     6. PARTICLE SYSTEM (Hero Background)
     ========================================== */
  const particleContainer = document.getElementById('particles');
  const PARTICLE_COUNT = 40;
  const colors = ['#a855f7', '#3b82f6', '#ec4899', '#06b6d4', '#10b981'];

  function createParticle() {
    const p = document.createElement('div');
    p.classList.add('particle');

    const size = Math.random() * 3 + 1;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const left = Math.random() * 100;
    const duration = Math.random() * 12 + 8;
    const delay = Math.random() * 8;

    p.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      left: ${left}%;
      background: ${color};
      box-shadow: 0 0 ${size * 3}px ${color};
      animation-duration: ${duration}s;
      animation-delay: ${delay}s;
      border-radius: 50%;
    `;

    particleContainer.appendChild(p);

    // Auto remove and recreate
    setTimeout(() => {
      p.remove();
      createParticle();
    }, (duration + delay) * 1000);
  }

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    createParticle();
  }

  /* ==========================================
     7. CONTACT FORM HANDLER
     ========================================== */
  const contactForm = document.getElementById('contact-form');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-msg');

  function showToast(msg, isError = false) {
    toastMsg.textContent = msg;
    toast.style.borderColor = isError ? '#ef4444' : '#10b981';
    toast.style.color = isError ? '#ef4444' : '#10b981';
    toast.style.boxShadow = isError ? '0 0 20px rgba(239,68,68,0.3)' : '0 0 20px rgba(16,185,129,0.3)';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      showToast('กรุณากรอกข้อมูลให้ครบทุกช่อง', true);
      return;
    }

    // Simulate sending
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> กำลังส่ง...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-paper-plane"></i> ส่งข้อความ';
      submitBtn.disabled = false;
      contactForm.reset();
      showToast(`ขอบคุณ ${name}! ข้อความของคุณถูกส่งเรียบร้อย`);
    }, 1500);
  });

  /* ==========================================
     8. SMOOTH SCROLL for Anchor Links
     ========================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.offsetTop - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ==========================================
     9. HERO TYPING EFFECT (Tagline)
     ========================================== */
  const taglineEl = document.querySelector('.hero-tagline');
  if (taglineEl) {
    const originalText = 'นิทรรศการดนตรีเชิงสร้างสรรค์';
    let i = 0;
    taglineEl.childNodes.forEach(node => {
      if (node.nodeType === 3) node.textContent = '';
    });

    // Reset tagline text node
    const textNode = document.createTextNode('');
    taglineEl.appendChild(textNode);

    // Type after short delay
    setTimeout(() => {
      const typeInterval = setInterval(() => {
        if (i <= originalText.length) {
          textNode.textContent = originalText.slice(0, i);
          i++;
        } else {
          clearInterval(typeInterval);
        }
      }, 60);
    }, 600);
  }

  /* ==========================================
     10. TIMELINE ITEM STAGGER DELAY
     ========================================== */
  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach((item, idx) => {
    item.style.transitionDelay = `${idx * 0.1}s`;
  });

  console.log('%c🎵 The Evolution of Music — Loaded Successfully', 
    'color:#a855f7; font-size:14px; font-weight:bold;');

});
