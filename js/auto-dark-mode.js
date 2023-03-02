// used to change to dark mode / light mode also had a toggle button css can be seen in dark-light-mode.css you will have to use var(--bkg-color); and  var(--text-color);

const btn = document.querySelector(".btn-toggle");
const prefersDarkScheme = window.matchMedia("(prefers-color-scheme: dark)");

const currentTheme = window.localStorage.getItem("theme");

if (currentTheme == "dark") {
  document.body.classList.add("dark-mode");
}

// event for button click
btn.addEventListener("click", function () {
  document.body.classList.toggle("dark-mode");
  var theme = document.body.classList.contains("dark-mode") ? "dark" : "light";
  window.localStorage.setItem("theme", theme);
});

const isDarkMode = () =>
  window.matchMedia &&
  window.matchMedia("(prefers-color-scheme: dark)").matches;

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addListener((e) => (e.matches ? enableDarkMode() : disableDarkMode()));

const runColorMode = (fn) => {
  if (!window.matchMedia) {
    return;
  }
  const query = window.matchMedia("(prefers-color-scheme: dark)");

  fn(query.matches);

  query.addEventListener("change", (event) => fn(event.matches));
};

runColorMode((isDarkMode) => {
  if ((isDarkMode && currentTheme != "light") || currentTheme == "dark") {
    document.body.classList.add("dark-mode");
    window.localStorage.setItem("theme", "dark");
  } else if (!isDarkMode || currentTheme == "light"){
    document.body.classList.remove("dark-mode");
    window.localStorage.setItem("theme", "light");
  }
});
