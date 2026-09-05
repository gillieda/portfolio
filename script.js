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

/* Requested visual adjustment: remove the black hero panel and make every yellow-marked text exactly 2x its original size. */
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
    .yellow-text-scale { line-height: 1.15 !important; }
  `;
  document.head.appendChild(style);

  const isYellow = (value) => {
    const match = value && value.match(/rgba?\\((\\d+),\\s*(\\d+),\\s*(\\d+)/i);
    if (!match) return false;
    const [, r, g, b] = match.slice(1).map(Number);
    return r > 190 && g > 150 && b < 130 && g >= b * 1.5;
  };

  const markAndDouble = (el) => {
    if (el.classList.contains('yellow-text-scale')) return;
    const size = parseFloat(getComputedStyle(el).fontSize);
    if (!Number.isFinite(size) || size <= 0) return;
    el.classList.add('yellow-text-scale');
    el.style.setProperty('font-size', `${size * 2}px`, 'important');
  };

  document.querySelectorAll('body *').forEach((el) => {
    if (!el.textContent.trim()) return;

    const cs = getComputedStyle(el);
    const before = getComputedStyle(el, '::before');
    const after = getComputedStyle(el, '::after');
    const ownYellow = isYellow(cs.color) || isYellow(cs.backgroundColor);
    const pseudoYellow = isYellow(before.backgroundColor) || isYellow(after.backgroundColor);

    /* For text color, act on the actual text-bearing leaf. */
    if (el.children.length === 0 && ownYellow) {
      markAndDouble(el);
      return;
    }

    /* For a yellow highlight/background, scale the text-bearing container once. */
    if (pseudoYellow || (isYellow(cs.backgroundColor) && el.children.length === 0)) {
      markAndDouble(el);
    }
  });
})();