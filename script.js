document.addEventListener('DOMContentLoaded', () => {
  const sections = Array.from(document.querySelectorAll('[data-scene]'));
  const progressIndicator = document.querySelector('.scroll-rail__indicator');
  const navLinks = Array.from(document.querySelectorAll('.app-shell__nav a'));
  const indexRail = document.querySelector('.section-index__rail');
  const indexLinks = indexRail ? Array.from(indexRail.querySelectorAll('a')) : [];
  const sectionToggle = document.querySelector('.section-index__toggle');
  const dockButtons = Array.from(document.querySelectorAll('.floating-dock__button'));
  const marqueeNodes = Array.from(document.querySelectorAll('[data-marquee]'));
  const parallaxNodes = Array.from(document.querySelectorAll('[data-depth]'));

  const smoothScrollTo = (targetId) => {
    if (!targetId) return;
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const setActive = (hash) => {
    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${hash}`);
    });
    indexLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${hash}`);
    });
  };

  const updateProgress = () => {
    if (!progressIndicator) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    progressIndicator.style.transform = `translateY(${(1 - progress) * 100}%)`;
  };

  let ticking = false;
  const updateParallax = () => {
    parallaxNodes.forEach((node) => {
      const depth = parseFloat(node.dataset.depth) || 0.18;
      const rect = node.getBoundingClientRect();
      const offset = (window.innerHeight / 2 - (rect.top + rect.height / 2)) * depth;
      node.style.setProperty('--parallax-shift', `${offset}px`);
    });
  };

  const onScroll = () => {
    updateProgress();
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    updateProgress();
    updateParallax();
  });

  updateProgress();
  updateParallax();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          const id = entry.target.getAttribute('id');
          if (id) {
            setActive(id);
          }
        }
      });
    },
    { threshold: 0.4 }
  );

  sections.forEach((section) => observer.observe(section));

  if (sectionToggle && indexRail) {
    sectionToggle.addEventListener('click', () => {
      const collapsed = indexRail.classList.toggle('is-collapsed');
      sectionToggle.setAttribute('aria-expanded', String(!collapsed));
      if (collapsed) {
        indexRail.style.maxHeight = '0';
        indexRail.style.opacity = '0.4';
      } else {
        indexRail.style.maxHeight = `${indexRail.scrollHeight}px`;
        indexRail.style.opacity = '1';
      }
    });
    indexRail.style.maxHeight = `${indexRail.scrollHeight}px`;
  }

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      event.preventDefault();
      smoothScrollTo(href.slice(1));
    });
  });

  indexLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      event.preventDefault();
      smoothScrollTo(href.slice(1));
    });
  });

  dockButtons.forEach((button) => {
    button.addEventListener('click', () => {
      smoothScrollTo(button.dataset.scroll);
    });
  });

  const initMarquee = (node) => {
    if (node.dataset.marqueeInit) return;
    const children = Array.from(node.children);
    if (!children.length) return;
    const fragment = document.createDocumentFragment();
    children.forEach((child) => {
      fragment.appendChild(child.cloneNode(true));
    });
    node.appendChild(fragment);
    node.dataset.marqueeInit = 'true';
  };

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if (!prefersReducedMotion.matches) {
    marqueeNodes.forEach(initMarquee);
  }
});
