// NIGHTBLOOMY ✦ Little interactive touches

const themeButton = document.getElementById("theme-toggle");
const menuButton = document.getElementById("menu-toggle");
const navigation = document.getElementById("nav");

// Theme settings
const savedTheme = localStorage.getItem("nightbloomy-theme");

if (savedTheme === "light") {
  document.body.classList.add("light-theme");
}

function updateThemeButton() {
  const isLight = document.body.classList.contains("light-theme");
  themeButton.textContent = isLight ? "☾" : "☀";
  themeButton.setAttribute(
    "aria-label",
    isLight ? "Switch to dark theme" : "Switch to light theme"
  );
}

updateThemeButton();

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  const isLight = document.body.classList.contains("light-theme");

  localStorage.setItem(
    "nightbloomy-theme",
    isLight ? "light" : "dark"
  );

  updateThemeButton();
});

// Mobile navigation
menuButton.addEventListener("click", () => {
  const isOpen = navigation.classList.toggle("open");

  menuButton.setAttribute("aria-expanded", isOpen);
  menuButton.textContent = isOpen ? "✕" : "☰";
});

// Close mobile menu after choosing a link
navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navigation.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
    menuButton.textContent = "☰";
  });
});

// Automatically update the copyright year
document.getElementById("year").textContent =
  new Date().getFullYear();
