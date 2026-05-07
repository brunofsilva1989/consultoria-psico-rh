const revealItems = document.querySelectorAll(".reveal");
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.14, rootMargin: "0px 0px -40px 0px" });

revealItems.forEach((item, index) => {
  item.style.transitionDelay = item.style.transitionDelay || `${Math.min(index % 4, 3) * 0.06}s`;
  observer.observe(item);
});

const loader = document.querySelector(".site-loader");
const finishLoading = () => {
  document.body.classList.add("is-loaded");

  if (!loader) return;
  loader.classList.add("is-hidden");
  window.setTimeout(() => loader.remove(), 650);
};

window.addEventListener("load", () => {
  window.setTimeout(finishLoading, 1800);
});

window.setTimeout(() => {
  if (!document.body.classList.contains("is-loaded")) finishLoading();
}, 2800);

if (window.AOS) {
  AOS.init({
    duration: 800,
    easing: "ease-out-cubic",
    once: true,
    offset: 80
  });
}

const desktopMotion = window.matchMedia("(min-width: 768px)");

if (desktopMotion.matches && window.gsap && window.ScrollTrigger) {
  gsap.registerPlugin(ScrollTrigger);

  gsap.to(".hero .photo-frame", {
    y: -80,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true
    }
  });

  gsap.to(".about-photo", {
    y: -60,
    ease: "none",
    scrollTrigger: {
      trigger: "#quem-faz",
      start: "top bottom",
      end: "bottom top",
      scrub: true
    }
  });

  gsap.utils.toArray("section h2").forEach((title) => {
    gsap.fromTo(title,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: .8,
        ease: "power3.out",
        scrollTrigger: {
          trigger: title,
          start: "top 84%",
          once: true
        }
      }
    );
  });

  [".benefits-grid .benefit-card", ".services-grid .service-card"].forEach((selector) => {
    const cards = gsap.utils.toArray(selector);
    if (!cards.length) return;

    gsap.fromTo(cards,
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: .7,
        stagger: .15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: cards[0].parentElement,
          start: "top 82%",
          once: true
        }
      }
    );
  });

  gsap.fromTo(".nr-inner h2",
    { x: -20 },
    {
      x: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".nr-banner",
        start: "top bottom",
        end: "bottom top",
        scrub: true
      }
    }
  );
}

if (window.matchMedia("(min-width: 1024px)").matches) {
  const cursor = document.createElement("span");
  cursor.className = "custom-cursor";
  document.body.appendChild(cursor);

  let mouseX = window.innerWidth / 2;
  let mouseY = window.innerHeight / 2;
  let cursorX = mouseX;
  let cursorY = mouseY;

  window.addEventListener("mousemove", (event) => {
    mouseX = event.clientX;
    mouseY = event.clientY;
  });

  document.querySelectorAll("a, button, .btn").forEach((element) => {
    element.addEventListener("mouseenter", () => cursor.classList.add("is-active"));
    element.addEventListener("mouseleave", () => cursor.classList.remove("is-active"));
  });

  const renderCursor = () => {
    cursorX += (mouseX - cursorX) * .16;
    cursorY += (mouseY - cursorY) * .16;
    cursor.style.transform = `translate3d(${cursorX}px, ${cursorY}px, 0) translate(-50%, -50%)`;
    requestAnimationFrame(renderCursor);
  };

  renderCursor();
}
