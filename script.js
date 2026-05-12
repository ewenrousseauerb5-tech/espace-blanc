const tabs = document.querySelectorAll(".tab-button");
const panels = document.querySelectorAll(".prototype-frame");
const revealItems = document.querySelectorAll(
  ".section-heading, .prototype-tabs, .prototype-frame, .single-price-card, .budget-note, .quote-timeline div"
);

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    const target = tab.dataset.target;

    tabs.forEach((item) => item.classList.remove("active"));
    panels.forEach((panel) => {
      panel.classList.toggle("active", panel.dataset.panel === target);
    });

    tab.classList.add("active");
  });
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item, index) => {
    item.style.setProperty("--reveal-delay", `${Math.min(index * 45, 240)}ms`);
    observer.observe(item);
  });
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
