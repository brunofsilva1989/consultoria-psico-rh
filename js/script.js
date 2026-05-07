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

