const tabs = document.querySelectorAll(".tab-button");
const panels = document.querySelectorAll(".prototype-frame");
const timelineSteps = document.querySelectorAll(".timeline-step");
const timelineWeek = document.querySelector("#timeline-week");
const timelineTitle = document.querySelector("#timeline-title");
const timelineCopy = document.querySelector("#timeline-copy");
const timelineList = document.querySelector("#timeline-list");
const revealItems = document.querySelectorAll(
  ".section-heading, .prototype-tabs, .prototype-frame, .single-price-card, .maintenance-card, .budget-breakdown, .budget-note, .quote-timeline, .timeline-detail"
);
const timelineDetails = {
  1: {
    week: "Semaine 1",
    title: "Premier échange",
    copy:
      "On commence par une réunion simple pour comprendre les besoins, les priorités et les informations à afficher sur le site.",
    items: [
      "Réunion de lancement",
      "Liste des pages et services à présenter",
      "Première liste des documents à prévoir",
    ],
  },
  2: {
    week: "Semaine 2",
    title: "Plan du site",
    copy:
      "On organise les pages, les textes importants et les informations que les clients devront retrouver facilement.",
    items: [
      "Plan des pages principales",
      "Organisation des contenus",
      "Validation du plan avant de passer au design",
    ],
  },
  3: {
    week: "Semaine 3",
    title: "Design de la proposition",
    copy:
      "On crée une direction visuelle professionnelle, élégante et cohérente avec l'image actuelle d'Espace Blanc.",
    items: [
      "Design de la page principale",
      "Choix des couleurs et de la typographie",
      "Présentation du style général",
    ],
  },
  4: {
    week: "Semaine 4",
    title: "Validation des écrans",
    copy:
      "On présente les écrans clés pour valider la direction avant de construire la version finale.",
    items: [
      "Aperçu du site web",
      "Aperçu de l'espace client",
      "Aperçu de la partie administratrice",
    ],
  },
  5: {
    week: "Semaine 5",
    title: "Création du site web",
    copy:
      "On construit la partie visible du site avec une présentation claire des services et une navigation fluide.",
    items: [
      "Création des sections principales",
      "Adaptation ordinateur et mobile",
      "Ajout des textes et visuels validés",
    ],
  },
  6: {
    week: "Semaine 6",
    title: "Création de l'espace client",
    copy:
      "On met en place l'espace où chaque client pourra suivre son dossier et retrouver ses documents.",
    items: [
      "Page de suivi du dossier",
      "Zone documents",
      "Informations importantes pour le client",
    ],
  },
  7: {
    week: "Semaine 7",
    title: "Corrections et ajustements",
    copy:
      "On relit, on teste et on ajuste les détails pour que tout soit clair avant la mise en ligne.",
    items: [
      "Vérification du site",
      "Corrections des textes et détails visuels",
      "Dernier point de validation",
    ],
  },
  8: {
    week: "Semaine 8",
    title: "Mise en ligne",
    copy:
      "On publie la première version et on explique comment utiliser les parties principales.",
    items: [
      "Mise en ligne",
      "Présentation du fonctionnement",
      "Début de la maintenance mensuelle",
    ],
  },
};

const activatePrototype = (target) => {
  tabs.forEach((item) => {
    item.classList.toggle("active", item.dataset.target === target);
  });

  panels.forEach((panel) => {
    panel.classList.toggle("active", panel.dataset.panel === target);
  });
};

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    activatePrototype(tab.dataset.target);
  });
});

const activateTimelineWeek = (week) => {
  const detail = timelineDetails[week];

  if (!detail) {
    return;
  }

  timelineSteps.forEach((step) => {
    step.classList.toggle("active", step.dataset.week === week);
  });

  timelineWeek.textContent = detail.week;
  timelineTitle.textContent = detail.title;
  timelineCopy.textContent = detail.copy;
  timelineList.innerHTML = detail.items.map((item) => `<li>${item}</li>`).join("");
};

timelineSteps.forEach((step) => {
  step.addEventListener("click", () => {
    activateTimelineWeek(step.dataset.week);
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
