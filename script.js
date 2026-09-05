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

/* Visual adjustments requested from the annotated screenshot.
   The yellow marks in the screenshot are annotations, not page colors.
   Target the corresponding elements directly and double their original type sizes. */
(() => {
  const style = document.createElement('style');
  style.textContent = `
    /* Screenshot-marked top metadata: original 9–10px -> exactly 2x. */
    .brand span {
      font-size: 18px !important;
      line-height: 1.15 !important;
    }

    .topbar nav,
    .topbar nav a {
      font-size: 20px !important;
      line-height: 1.15 !important;
    }

    .status {
      font-size: 18px !important;
      line-height: 1.15 !important;
    }

    /* Screenshot-marked section label: original 9px -> 18px. */
    .kicker,
    .eyebrow {
      font-size: 18px !important;
      line-height: 1.15 !important;
    }

    /* Screenshot-marked descriptive text at the bottom of the hero: original 10px -> 20px. */
    .hero-meta {
      font-size: 20px !important;
      line-height: 1.65 !important;
    }

    /* The black hero panel remains removed. */
    .hero {
      grid-template-columns: 1fr !important;
    }
    .hero-card {
      display: none !important;
    }
    .hero-main {
      min-height: calc(100vh - 148px) !important;
    }

    @media (max-width: 980px) {
      .hero {
        grid-template-columns: 1fr !important;
      }
      .hero-main {
        min-height: 70vh !important;
      }
      .topbar nav {
        display: none;
      }
    }
  `;
  document.head.appendChild(style);
})();