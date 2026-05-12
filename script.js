const tabs = document.querySelectorAll(".tab-button");
const panels = document.querySelectorAll(".prototype-frame");

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
