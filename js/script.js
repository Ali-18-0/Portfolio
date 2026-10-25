// ═══════════════════════════════════════════════════
//  ALI PORTFOLIO — script.js
// ═══════════════════════════════════════════════════

/* ── Sticky navbar + scroll spy ── */
const navbar   = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

window.addEventListener('scroll', () => {
  // Scrolled class
  navbar.classList.toggle('scrolled', window.scrollY > 40);

  // Active link highlight
  let current = '';
  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 100) current = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + current) link.classList.add('active');
  });
});

/* ── Hamburger menu ── */
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
});

// Close menu on link click
navMenu.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
  });
});

/* ── Smooth scroll for all anchor links ── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 70; // navbar height
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ── Contact form (Formspree) ── */
const contactForm    = document.getElementById('contactForm');
const contactSuccess = document.getElementById('contactSuccess');

if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);
    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        contactForm.reset();
        contactSuccess.classList.add('show');
        setTimeout(() => contactSuccess.classList.remove('show'), 5000);
      }
    } catch (err) {
      console.error('Contact form error:', err);
    }
  });
}

/* ── Feedback form (Formspree) ── */
const feedbackForm    = document.getElementById('feedbackForm');
const feedbackSuccess = document.getElementById('feedbackSuccess');

if (feedbackForm) {
  feedbackForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(feedbackForm);
    try {
      const res = await fetch(feedbackForm.action, {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        feedbackForm.reset();
        feedbackSuccess.classList.add('show');
        setTimeout(() => feedbackSuccess.classList.remove('show'), 5000);
      }
    } catch (err) {
      console.error('Feedback form error:', err);
    }
  });
}

/* ── Scroll-reveal animation ── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('revealed');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.about-card, .skill-card, .project-card, .feedback-inner, .contact-form-wrap, .contact-globe'
).forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});
