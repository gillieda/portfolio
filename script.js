const contact = document.querySelector('.contact-btn');
if (contact) contact.removeAttribute('href');

document.querySelectorAll('a[href^="#"]').forEach((link) => {
  link.addEventListener('click', (event) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

/* Requested visual adjustment: remove the black hero panel and enlarge yellow-marked text. */
(() => {
  const style = document.createElement('style');
  style.textContent = `
    .hero { grid-template-columns: 1fr !important; }
    .hero-card { display: none !important; }
    .hero-main { min-height: calc(100vh - 148px) !important; }
    @media (max-width: 980px) {
      .hero { grid-template-columns: 1fr !important; }
      .hero-main { min-height: 70vh !important; }
    }
    .yellow-text-scale { font-size: 2em !important; line-height: 1.15 !important; }
  `;
  document.head.appendChild(style);

  const isYellow = (value) => {
    const match = value.match(/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)/i);
    if (!match) return false;
    const [, r, g, b] = match.map(Number);
    return r > 190 && g > 170 && b < 100 && g >= b * 1.8;
  };

  document.querySelectorAll('body *').forEach((el) => {
    if (el.children.length > 0) return;
    const cs = getComputedStyle(el);
    if (isYellow(cs.color) || isYellow(cs.backgroundColor)) {
      el.classList.add('yellow-text-scale');
    }
  });
})();