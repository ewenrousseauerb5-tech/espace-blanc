const tabs = document.querySelectorAll(".tab-button");
const panels = document.querySelectorAll(".prototype-frame");
const revealItems = document.querySelectorAll(
  ".section-heading, .prototype-tabs, .prototype-frame, .single-price-card, .budget-note, .quote-timeline div"
);
let activePrototypeIndex = 0;
let prototypeRotation;

const activatePrototype = (target) => {
  tabs.forEach((item) => {
    item.classList.toggle("active", item.dataset.target === target);
  });

  panels.forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.panel === target);
  });

  activePrototypeIndex = [...tabs].findIndex((tab) => tab.dataset.target === target);
};

const startPrototypeRotation = () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || tabs.length < 2) {
    return;
  }

  window.clearInterval(prototypeRotation);
  prototypeRotation = window.setInterval(() => {
    activePrototypeIndex = (activePrototypeIndex + 1) % tabs.length;
    activatePrototype(tabs[activePrototypeIndex].dataset.target);
  }, 5200);
};

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    activatePrototype(tab.dataset.target);
    window.clearInterval(prototypeRotation);
    window.setTimeout(startPrototypeRotation, 9000);
  });
});

startPrototypeRotation();

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
