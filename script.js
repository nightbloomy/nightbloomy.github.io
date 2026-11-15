const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".nav-links");
menuButton?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.textContent = open ? "×" : "☰";
});
nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  nav.classList.remove("open"); menuButton?.setAttribute("aria-expanded", "false");
  if (menuButton) menuButton.textContent = "☰";
}));

// Theme picker remembers the visitor's choice on this device.
const themeButtons = document.querySelectorAll("[data-theme-choice]");
function setTheme(theme) {
  document.body.dataset.theme = theme;
  themeButtons.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.themeChoice === theme)));
  document.querySelector('meta[name="theme-color"]')?.setAttribute("content", theme === "night" ? "#211d2b" : theme === "lilac" ? "#fbf9ff" : "#fff7fb");
  try { localStorage.setItem("nightbloomy-theme", theme); } catch {}
}
let savedTheme = "pink";
try { savedTheme = localStorage.getItem("nightbloomy-theme") || "pink"; } catch {}
setTheme(["pink","lilac","night"].includes(savedTheme) ? savedTheme : "pink");
themeButtons.forEach(button => button.addEventListener("click", () => setTheme(button.dataset.themeChoice)));

// Soft falling petals, kept light and disabled for reduced-motion preferences.
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const petalLayer = document.querySelector(".petal-layer");
if (!reducedMotion && petalLayer) {
  const petals = ["✿","❀","·","✧"];
  for (let i = 0; i < 13; i++) {
    const petal = document.createElement("span");
    petal.className = "petal"; petal.textContent = petals[i % petals.length];
    petal.style.left = `${Math.random() * 100}%`;
    petal.style.animationDuration = `${12 + Math.random() * 13}s`;
    petal.style.animationDelay = `${-Math.random() * 20}s`;
    petal.style.fontSize = `${10 + Math.random() * 13}px`;
    petal.style.setProperty("--drift", `${-70 + Math.random() * 140}px`);
    petalLayer.appendChild(petal);
  }
}

// Tiny star trail on mouse devices.
if (!reducedMotion && window.matchMedia("(pointer:fine)").matches) {
  let lastSparkle = 0;
  document.addEventListener("pointermove", event => {
    const now = Date.now();
    if (now - lastSparkle < 65) return;
    lastSparkle = now;
    const star = document.createElement("span");
    star.className = "sparkle-cursor"; star.textContent = Math.random() > .5 ? "✦" : "✧";
    star.style.left = `${event.clientX}px`; star.style.top = `${event.clientY}px`;
    document.body.appendChild(star);
    setTimeout(() => star.remove(), 720);
  });
}

// Encouraging notes.
const notes = [
  "You don't have to bloom all at once. Little steps count, too. ♡",
  "Your ideas deserve a little space to grow. ✿",
  "A messy first try is still a brave beginning. ✨",
  "Rest is part of creating. Take your time, lovely human. ☁",
  "You are allowed to learn as you go. 🌷",
  "Make something just because it makes you happy. ♡",
  "Tiny progress is still progress. Keep going!"
];
const noteText = document.querySelector("#encouragement-text");
function showNote() {
  if (noteText) noteText.textContent = notes[Math.floor(Math.random() * notes.length)];
}
document.querySelector("#another-message")?.addEventListener("click", showNote);
document.querySelector("#message-button")?.addEventListener("click", () => {
  showNote();
  document.querySelector(".message-section")?.scrollIntoView({ behavior: reducedMotion ? "auto" : "smooth" });
});

// Gallery lightbox supports image and illustrated placeholder tiles.
const modal = document.querySelector("#gallery-modal");
const modalArtwork = document.querySelector("#modal-artwork");
const modalTitle = document.querySelector("#modal-title");
const modalDescription = document.querySelector("#modal-description");
function closeModal() {
  modal?.classList.remove("open"); modal?.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}
document.querySelectorAll("[data-gallery-title]").forEach(tile => tile.addEventListener("click", () => {
  modalArtwork.innerHTML = "";
  const image = tile.querySelector("img");
  const artwork = image ? image.cloneNode(true) : tile.querySelector(".doodle-art, .flower-art")?.cloneNode(true);
  if (artwork) modalArtwork.appendChild(artwork);
  modalTitle.textContent = tile.dataset.galleryTitle || "Artwork";
  modalDescription.textContent = tile.dataset.galleryDescription || "";
  modal?.classList.add("open"); modal?.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
  document.querySelector(".modal-close")?.focus();
}));
modal?.querySelectorAll("[data-close-modal]").forEach(button => button.addEventListener("click", closeModal));
document.addEventListener("keydown", event => { if (event.key === "Escape") closeModal(); });

// Little hidden bunny surprise.
const toast = document.querySelector("#toast");
let toastTimer;
function surprise() {
  if (!toast) return;
  toast.textContent = ["A tiny bunny believes in you. 🐰","Secret discovered! Keep making lovely things. ✨","Psst... your creativity is blooming. 🌷","You found a little pocket of joy. ♡"][Math.floor(Math.random() * 4)];
  toast.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove("show"), 2800);
}
document.querySelector("#surprise-button")?.addEventListener("click", surprise);
document.querySelectorAll(".brand").forEach(brand => {
  let taps = 0, reset;
  brand.addEventListener("click", event => {
    if (event.target.closest("a") && event.detail === 0) return;
    taps++; clearTimeout(reset); reset = setTimeout(() => taps = 0, 1200);
    if (taps >= 3) { surprise(); taps = 0; }
  });
});
