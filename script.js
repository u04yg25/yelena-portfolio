// Small interactions: project filters, mobile navigation, and current year.
const filters = document.querySelectorAll(".filter");
const projects = document.querySelectorAll(".project-card");

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const selected = button.dataset.filter;
    filters.forEach((item) => item.classList.toggle("active", item === button));
    projects.forEach((project) => {
      project.hidden = selected !== "all" && project.dataset.category !== selected;
    });
  });
});

const menuToggle = document.querySelector("#menu-toggle");
const nav = document.querySelector("#nav");
menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
  menuToggle.textContent = open ? "×" : "☰";
});
nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    menuToggle?.setAttribute("aria-expanded", "false");
    if (menuToggle) menuToggle.textContent = "☰";
  });
});

document.querySelector("#year").textContent = new Date().getFullYear();


// Credential cards: hover/focus works on desktop; tap toggles details on touch screens.
const credentialCards = document.querySelectorAll(".credential-card");
credentialCards.forEach((card) => {
  card.addEventListener("click", () => {
    const willOpen = !card.classList.contains("is-open");
    credentialCards.forEach((other) => {
      other.classList.remove("is-open");
      other.setAttribute("aria-expanded", "false");
    });
    if (willOpen) {
      card.classList.add("is-open");
      card.setAttribute("aria-expanded", "true");
    }
  });
  card.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      card.click();
    }
    if (event.key === "Escape") {
      card.classList.remove("is-open");
      card.setAttribute("aria-expanded", "false");
    }
  });
});

// Allow certificate links to open without closing the card.
document.querySelectorAll('.certificate-view').forEach(link => link.addEventListener('click', event => event.stopPropagation()));

// Keep certificate links clickable without toggling their parent cards.
document.querySelectorAll(".certificate-view").forEach(link => link.addEventListener("click", event => event.stopPropagation()));

// Reveal contact choices without exposing email addresses in the default layout.
const emailTrigger=document.querySelector(".email-choices-trigger");
const emailOptions=document.querySelector("#email-options");
emailTrigger?.addEventListener("click",()=>{
  const open=emailTrigger.getAttribute("aria-expanded")!=="true";
  emailTrigger.setAttribute("aria-expanded",String(open));
  emailOptions.hidden=!open;
});
