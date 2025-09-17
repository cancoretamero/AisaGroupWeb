document.addEventListener('DOMContentLoaded', () => {
  const sections = Array.from(document.querySelectorAll('[data-scene]'));
  const progressTrack = document.querySelector('.progress-rail__track');
  const navLinks = Array.from(document.querySelectorAll('.command-bar__nav a'));
  const wayfinder = document.querySelector('.wayfinder');
  const wayfinderLinks = wayfinder ? Array.from(wayfinder.querySelectorAll('.wayfinder__links a')) : [];
  const wayfinderToggle = wayfinder ? wayfinder.querySelector('.wayfinder__toggle') : null;
  const marqueeNodes = Array.from(document.querySelectorAll('[data-marquee]'));
  const parallaxNodes = Array.from(document.querySelectorAll('[data-depth]'));

  const setActiveLinks = (hash) => {
    navLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${hash}`);
    });
    wayfinderLinks.forEach((link) => {
      link.classList.toggle('is-active', link.getAttribute('href') === `#${hash}`);
    });
  };

  const updateProgress = () => {
    if (!progressTrack) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? scrollTop / docHeight : 0;
    progressTrack.style.transform = `translateY(${(1 - progress) * 100}%)`;
  };

  let ticking = false;
  const updateParallax = () => {
    parallaxNodes.forEach((node) => {
      const depth = parseFloat(node.dataset.depth) || 0.15;
      const rect = node.getBoundingClientRect();
      const offset = (window.innerHeight / 2 - (rect.top + rect.height / 2)) * depth;
      node.style.setProperty('--parallax-shift', `${offset}px`);
    });
  };

  const handleScroll = () => {
    updateProgress();
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateParallax();
        ticking = false;
      });
      ticking = true;
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', () => {
    updateProgress();
    updateParallax();
  });
  handleScroll();

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          const id = entry.target.getAttribute('id');
          if (id) {
            setActiveLinks(id);
          }
        }
      });
    },
    { threshold: 0.45 }
  );

  sections.forEach((section) => observer.observe(section));

  if (wayfinderToggle && wayfinder) {
    wayfinderToggle.addEventListener('click', () => {
      const collapsed = wayfinder.classList.toggle('is-collapsed');
      wayfinderToggle.setAttribute('aria-expanded', String(!collapsed));
    });
  }

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

  marqueeNodes.forEach(initMarquee);
});
