const progressBar = document.querySelector('.progress-indicator__bar');
const sections = document.querySelectorAll('section');
const floatingMenuLinks = document.querySelectorAll('.floating-menu a');
const navLinks = document.querySelectorAll('.primary-nav a');
const marqueeTracks = document.querySelectorAll('[data-animate="marquee"]');
let lastScroll = 0;

const prefersReducedMotion = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches;

const setProgress = () => {
  const scrollTop = window.scrollY;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const progress = docHeight === 0 ? 0 : (scrollTop / docHeight) * 100;
  progressBar.style.width = `${progress}%`;
};

const setParallax = () => {
  const scrollTop = window.scrollY;
  document.querySelectorAll('[data-depth]').forEach((element) => {
    const depth = parseFloat(element.dataset.depth || '0');
    const translate = -(scrollTop * depth) / 12;
    element.style.transform = `translateY(${translate}px)`;
  });
};

const highlightNavigation = (id) => {
  navLinks.forEach((link) => {
    link.removeAttribute('aria-current');
    if (link.getAttribute('href') === `#${id}`) {
      link.setAttribute('aria-current', 'true');
    }
  });

  floatingMenuLinks.forEach((link) => {
    link.classList.toggle('is-active', link.getAttribute('href') === `#${id}`);
  });
};

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        highlightNavigation(entry.target.id);
      }
    });
  },
  {
    threshold: 0.35,
  }
);

sections.forEach((section) => {
  observer.observe(section);
});

const header = document.querySelector('.floating-header');

const handleHeader = () => {
  const currentScroll = window.scrollY;
  if (currentScroll > lastScroll && currentScroll > 120) {
    header.style.transform = 'translateY(-140%)';
  } else {
    header.style.transform = 'translateY(0)';
  }
  lastScroll = currentScroll;
};

const duplicateMarqueeContent = () => {
  marqueeTracks.forEach((track) => {
    const items = Array.from(track.children);
    items.forEach((item) => track.appendChild(item.cloneNode(true)));
    track.style.setProperty('--items-count', track.children.length);
  });
};

const animateMarquee = () => {
  marqueeTracks.forEach((track) => {
    const speed = prefersReducedMotion ? 0 : 28;
    track.animate(
      [
        { transform: 'translateX(0)' },
        { transform: 'translateX(-50%)' },
      ],
      {
        duration: speed * 1000,
        iterations: Infinity,
        easing: 'linear',
      }
    );
  });
};

const init = () => {
  setProgress();
  setParallax();
  duplicateMarqueeContent();
  if (!prefersReducedMotion) {
    animateMarquee();
  }
};

init();

window.addEventListener('scroll', () => {
  setProgress();
  setParallax();
  handleHeader();
});

window.addEventListener('resize', () => {
  setProgress();
  setParallax();
});

floatingMenuLinks.forEach((link) => {
  link.addEventListener('click', () => {
    highlightNavigation(link.getAttribute('href').replace('#', ''));
  });
});
