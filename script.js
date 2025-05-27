// Parallax effect for hero section
window.addEventListener('scroll', () => {
  const hero = document.querySelector('.parallax');
  if (hero) {
    let offset = window.scrollY * 0.4;
    hero.style.backgroundPosition = `center ${offset}px`;
  }
  // Animate navbar on scroll
  const nav = document.querySelector('nav');
  if (window.scrollY > 50) {
    nav.style.background = 'rgba(26, 26, 26, 0.95)';
    nav.style.padding = '15px 0';
  } else {
    nav.style.background = 'var(--dark)';
    nav.style.padding = '20px 0';
  }
});

// Button hover effects
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    btn.style.transform = 'scale(1.05)';
  });
  btn.addEventListener('mouseleave', () => {
    btn.style.transform = 'scale(1)';
  });
});

// Modal open/close logic (Bootstrap handles via data attributes, but fallback for demo)
document.querySelectorAll('[data-bs-toggle="modal"]').forEach(btn => {
  btn.addEventListener('click', e => {
    const target = btn.getAttribute('href') || btn.dataset.bsTarget;
    if (target) {
      const modal = document.querySelector(target);
      if (modal) modal.classList.add('show');
    }
  });
});
document.querySelectorAll('.modal .btn-close').forEach(btn => {
  btn.addEventListener('click', e => {
    btn.closest('.modal').classList.remove('show');
  });
});

// Testimonials carousel auto-advance
const carousel = document.querySelector('#testimonialCarousel');
if (carousel) {
  let interval = setInterval(() => {
    const nextBtn = carousel.querySelector('.carousel-control-next');
    if (nextBtn) nextBtn.click();
  }, 5000);
  carousel.addEventListener('mouseenter', () => clearInterval(interval));
  carousel.addEventListener('mouseleave', () => {
    interval = setInterval(() => {
      const nextBtn = carousel.querySelector('.carousel-control-next');
      if (nextBtn) nextBtn.click();
    }, 5000);
  });
}

// Animate on scroll (AOS)
if (window.AOS) {
  AOS.init({ duration: 1200, once: true });
}