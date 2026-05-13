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
    title: "Cadrage stratégique",
    copy:
      "Réunion de lancement pour cadrer les objectifs, les profils utilisateurs, les priorités de l'espace client et les documents à gérer.",
    items: [
      "Réunion de lancement avec la direction",
      "Définition du périmètre et des parcours clés",
      "Liste des contenus, documents et statuts à prévoir",
    ],
  },
  2: {
    week: "Semaine 2",
    title: "Architecture UX & contenus",
    copy:
      "Organisation des pages, des accès privés et des contenus nécessaires pour rendre l'expérience claire dès le premier contact.",
    items: [
      "Arborescence du site vitrine et de l'espace privé",
      "Structure des statuts client et des documents",
      "Point de validation court en fin de semaine",
    ],
  },
  3: {
    week: "Semaine 3",
    title: "Direction artistique premium",
    copy:
      "Création d'une identité digitale plus professionnelle, tout en conservant une continuité avec l'univers doux et bleu d'Espace Blanc.",
    items: [
      "Maquette de la page principale",
      "Déclinaison des couleurs, typographies et composants",
      "Réunion de présentation des choix visuels",
    ],
  },
  4: {
    week: "Semaine 4",
    title: "Prototype des écrans clés",
    copy:
      "Construction d'un prototype navigable pour valider la vitrine, le tableau de bord client et l'interface d'administration.",
    items: [
      "Prototype site vitrine",
      "Prototype espace client avec documents et statut",
      "Prototype admin pour piloter les dossiers",
    ],
  },
  5: {
    week: "Semaine 5",
    title: "Développement de la vitrine",
    copy:
      "Intégration responsive de la partie publique, avec une expérience fluide, premium et adaptée aux futurs contenus de la marque.",
    items: [
      "Développement des sections principales",
      "Animations sobres et transitions",
      "Optimisation mobile et desktop",
    ],
  },
  6: {
    week: "Semaine 6",
    title: "Développement de l'espace privé",
    copy:
      "Mise en place de la logique client/admin pour centraliser les documents, les notes, les étapes et le suivi de chaque dossier.",
    items: [
      "Espace client sécurisé",
      "Module de documents et notes",
      "Interface admin pour ajouter et suivre les dossiers",
    ],
  },
  7: {
    week: "Semaine 7",
    title: "Tests, retours et ajustements",
    copy:
      "Phase de vérification avec retours de la direction pour corriger, simplifier et finaliser l'expérience avant mise en ligne.",
    items: [
      "Recette fonctionnelle complète",
      "Corrections design et contenu",
      "Validation finale avant publication",
    ],
  },
  8: {
    week: "Semaine 8",
    title: "Mise en ligne & passation",
    copy:
      "Publication de la première version, configuration finale et accompagnement pour permettre une prise en main sereine.",
    items: [
      "Mise en ligne de la plateforme",
      "Mini formation d'utilisation",
      "Démarrage de la maintenance mensuelle",
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
