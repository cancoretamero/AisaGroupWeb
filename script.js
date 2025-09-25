const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
  }
);

document.querySelectorAll("[data-animate]").forEach((element) => {
  observer.observe(element);
});

const header = document.querySelector(".site-header");
let lastScroll = 0;

window.addEventListener("scroll", () => {
  const current = window.scrollY;
  if (current > lastScroll && current > 120) {
    header.classList.add("header-hidden");
  } else {
    header.classList.remove("header-hidden");
  }
  lastScroll = current;
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const initializeSlider = (slider) => {
  const track = slider.querySelector("[data-slider-track]");
  if (!track) return;

  const slides = Array.from(track.children);
  if (!slides.length) return;

  const prevButton = slider.querySelector("[data-slider-prev]");
  const nextButton = slider.querySelector("[data-slider-next]");
  const autoplayDelay = Number(slider.dataset.autoplay || 0);
  let currentIndex = 0;
  let autoplayId;
  let isInteracting = false;

  const goTo = (index, behavior = "smooth") => {
    currentIndex = (index + slides.length) % slides.length;
    const target = slides[currentIndex];
    if (!target) return;
    const offset = target.offsetLeft - track.offsetLeft;
    track.scrollTo({ left: offset, behavior });
  };

  const startAutoplay = () => {
    if (!autoplayDelay || prefersReducedMotion.matches) return;
    clearInterval(autoplayId);
    autoplayId = setInterval(() => {
      if (isInteracting) return;
      goTo(currentIndex + 1);
    }, autoplayDelay);
  };

  const stopAutoplay = () => {
    clearInterval(autoplayId);
  };

  prevButton?.addEventListener("click", () => {
    goTo(currentIndex - 1);
  });

  nextButton?.addEventListener("click", () => {
    goTo(currentIndex + 1);
  });

  let scrollTimeout;
  track.addEventListener("scroll", () => {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      const { scrollLeft } = track;
      let closestIndex = currentIndex;
      let minDistance = Number.POSITIVE_INFINITY;
      slides.forEach((slide, index) => {
        const distance = Math.abs(slide.offsetLeft - scrollLeft);
        if (distance < minDistance) {
          minDistance = distance;
          closestIndex = index;
        }
      });
      currentIndex = closestIndex;
    }, 120);
  });

  slider.addEventListener("mouseenter", () => {
    isInteracting = true;
    stopAutoplay();
  });

  slider.addEventListener("mouseleave", () => {
    isInteracting = false;
    startAutoplay();
  });

  slider.addEventListener("focusin", () => {
    isInteracting = true;
    stopAutoplay();
  });

  slider.addEventListener("focusout", () => {
    isInteracting = false;
    startAutoplay();
  });

  window.addEventListener("resize", () => {
    goTo(currentIndex, "auto");
  });

  goTo(0, "auto");
  startAutoplay();

  slider.__startAutoplay = startAutoplay;
  slider.__stopAutoplay = stopAutoplay;
};

document.querySelectorAll("[data-slider]").forEach(initializeSlider);

prefersReducedMotion.addEventListener("change", (event) => {
  document.querySelectorAll("[data-slider]").forEach((slider) => {
    slider.__stopAutoplay?.();
    if (!event.matches) {
      slider.__startAutoplay?.();
    }
  });
});
