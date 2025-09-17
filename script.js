document.addEventListener('DOMContentLoaded', () => {
  const sections = Array.from(document.querySelectorAll('[data-section]'));
  const navLinks = Array.from(document.querySelectorAll('.command-center__nav a'));
  const scrollButtons = Array.from(document.querySelectorAll('[data-scroll]'));
  const progressBar = document.querySelector('.wayfinder__progress');
  const scrollTopButton = document.querySelector('.scroll-top');
  const parallaxNodes = Array.from(document.querySelectorAll('[data-depth]'));
  const loopNodes = Array.from(document.querySelectorAll('[data-loop]'));
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

  const smoothScrollTo = (id) => {
    if (!id) return;
    const target = document.getElementById(id);
    if (!target) return;
    const prefersReduced = prefersReducedMotion.matches;
    target.scrollIntoView({ behavior: prefersReduced ? 'auto' : 'smooth', block: 'start' });
  };

  scrollButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const targetId = button.dataset.scroll;
      if (!targetId) return;
      if (button.tagName === 'A') {
        event.preventDefault();
      }
      smoothScrollTo(targetId);
    });
  });

  const setActiveLink = (hash) => {
    if (!hash) return;
    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      link.classList.toggle('is-active', href === `#${hash}`);
    });
  };

  navLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const href = link.getAttribute('href');
      if (!href || !href.startsWith('#')) return;
      event.preventDefault();
      smoothScrollTo(href.slice(1));
    });
  });

  const updateProgress = () => {
    if (!progressBar) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    progressBar.style.transform = `translateY(${(1 - progress) * 100}%)`;
  };

  let ticking = false;
  const updateParallax = () => {
    parallaxNodes.forEach((node) => {
      const rect = node.getBoundingClientRect();
      const depth = parseFloat(node.dataset.depth || '0.18');
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

    if (scrollTopButton) {
      if (window.scrollY > 600) {
        scrollTopButton.classList.add('is-visible');
      } else {
        scrollTopButton.classList.remove('is-visible');
      }
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
          setActiveLink(id);
        }
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach((section) => observer.observe(section));

  const initLoop = (node) => {
    const type = node.dataset.loop;
    if (!type || node.dataset.loopInit || prefersReducedMotion.matches) return;

    if (type === 'marquee') {
      const children = Array.from(node.children);
      if (!children.length) return;
      const fragment = document.createDocumentFragment();
      children.forEach((child) => {
        fragment.appendChild(child.cloneNode(true));
      });
      node.appendChild(fragment);
    } else if (type === 'vertical') {
      const columns = Array.from(node.querySelectorAll('.portfolio__column'));
      columns.forEach((column) => {
        const items = Array.from(column.children);
        const fragment = document.createDocumentFragment();
        items.forEach((item) => {
          fragment.appendChild(item.cloneNode(true));
        });
        column.appendChild(fragment);
      });
    }

    node.dataset.loopInit = 'true';
  };

  loopNodes.forEach(initLoop);

  if (scrollTopButton) {
    scrollTopButton.addEventListener('click', (event) => {
      event.preventDefault();
      smoothScrollTo(scrollTopButton.dataset.scroll);
    });
  }
});
