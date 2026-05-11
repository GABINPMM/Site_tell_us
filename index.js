document.addEventListener('DOMContentLoaded', () => {

  // ===== NAVBAR SCROLL EFFECT =====
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ===== MOBILE MENU =====
  const hamburger = document.getElementById('navHamburger');
  const navLinks = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('open');
  });

  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#recrutement') return; // Handled by modal
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        const headerOffset = 85;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // ===== TABS EXPERTISE =====
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanels = document.querySelectorAll('.tab-panel');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanels.forEach(p => p.classList.remove('active'));
      
      btn.classList.add('active');
      document.getElementById(targetId).classList.add('active');
    });
  });

  // ===== CTA PREFILL LOGIC =====
  const contactSelect = document.getElementById('subject');
  const contactFormArea = document.getElementById('contact');
  const formHint = document.getElementById('formHint');

  const hints = {
    'audit': '→ Parfait pour retracer l\'historique d\'un site.',
    'diagnostic': '→ Idéal pour vérifier la qualité de vos sols.',
    'rehabilitation': '→ Prise en charge complète des travaux.',
    '': ''
  };

  document.querySelectorAll('.btn-contact-prefill').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const subject = btn.getAttribute('data-subject');
      if (contactSelect && subject) {
        contactSelect.value = subject;
        formHint.textContent = hints[subject] || '';
      }
    });
  });

  contactSelect.addEventListener('change', (e) => {
    formHint.textContent = hints[e.target.value] || '';
  });

  // ===== REVEAL ON SCROLL =====
  const revealElements = document.querySelectorAll('.reveal');
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealElements.forEach(el => {
    revealObserver.observe(el);
  });

  // ===== CONTACT FORM TOAST =====
  const contactForm = document.getElementById('contactForm');
  const formToast = document.getElementById('formToast');

  if(contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      // Reset form
      contactForm.reset();
      formHint.textContent = '';
      
      // Show toast
      formToast.classList.add('show');
      
      // Hide toast after 4s
      setTimeout(() => {
        formToast.classList.remove('show');
      }, 4000);
    });
  }
  // ===== RECRUITMENT MODAL =====
  const recruteLink = document.querySelector('a[href="#recrutement"]');
  const recruteModal = document.getElementById('recrutementModal');
  const recruteClose = document.getElementById('recrutementClose');
  const recruteOverlay = document.getElementById('recrutementOverlay');

  if(recruteLink && recruteModal) {
    recruteLink.addEventListener('click', (e) => {
      e.preventDefault();
      recruteModal.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
    
    const closeModal = () => {
      recruteModal.classList.remove('open');
      document.body.style.overflow = '';
    };
    
    recruteClose.addEventListener('click', closeModal);
    recruteOverlay.addEventListener('click', closeModal);
  }
});
