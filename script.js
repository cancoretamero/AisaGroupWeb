const sections = [...document.querySelectorAll('[data-section]')];
const navButtons = [...document.querySelectorAll('.nav-dock__links button')];
const quickButtons = [...document.querySelectorAll('[data-scroll-to]')];
const progressBar = document.querySelector('.progress-lift__bar');
const animateTargets = [...document.querySelectorAll('[data-animate]')];
const parallaxItems = [...document.querySelectorAll('[data-depth]')];
const marqueeTracks = [...document.querySelectorAll('[data-loop="marquee"]')];
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function smoothScrollTo(target) {
  const element = document.getElementById(target);
  if (!element) return;
  element.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

function setupSmoothScroll() {
  quickButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const target = button.dataset.scrollTo;
      if (!target) return;
      smoothScrollTo(target);
    });
  });
}

function updateProgress() {
  if (!progressBar) return;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = docHeight > 0 ? Math.min(window.scrollY / docHeight, 1) : 0;
  progressBar.style.setProperty('--progress', progress);
}

function updateActiveNavigation() {
  if (!sections.length) return;
  const scrollPos = window.scrollY + window.innerHeight * 0.35;
  let activeId = sections[0].id;
  for (const section of sections) {
    if (scrollPos >= section.offsetTop) {
      activeId = section.id;
    }
  }

  navButtons.forEach((button) => {
    const target = button.dataset.scrollTo;
    button.classList.toggle('is-active', target === activeId);
  });
}

function setupIntersectionObserver() {
  if (!animateTargets.length) return;
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  animateTargets.forEach((el) => observer.observe(el));
}

function applyParallax() {
  if (!parallaxItems.length || prefersReducedMotion) return;
  const viewportHeight = window.innerHeight;
  parallaxItems.forEach((item) => {
    const depth = parseFloat(item.dataset.depth || '0');
    if (!depth) return;
    const rect = item.getBoundingClientRect();
    const offset = rect.top + rect.height / 2 - viewportHeight / 2;
    item.style.transform = `translateY(${offset * depth * -1}px)`;
  });
}

function duplicateMarquees() {
  if (prefersReducedMotion) return;
  marqueeTracks.forEach((track) => {
    if (track.dataset.duplicated) return;
    track.innerHTML = `${track.innerHTML}${track.innerHTML}`;
    track.dataset.duplicated = 'true';
  });
}

function handleScroll() {
  updateProgress();
  updateActiveNavigation();
  applyParallax();
}

function init() {
  setupSmoothScroll();
  setupIntersectionObserver();
  duplicateMarquees();
  updateProgress();
  updateActiveNavigation();
  applyParallax();
  window.addEventListener('scroll', handleScroll, { passive: true });
  window.addEventListener('resize', () => {
    updateProgress();
    updateActiveNavigation();
    applyParallax();
  });
}

init();
