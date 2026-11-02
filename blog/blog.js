(() => {
  const root = document.documentElement;
  const languageButtons = document.querySelectorAll("[data-blog-language]");
  const themeButton = document.querySelector("[data-blog-theme]");
  const themeIcon = themeButton?.querySelector("img");
  const title = document.querySelector("title[data-ua][data-en]");
  const description = document.querySelector('meta[name="description"][data-ua][data-en]');

  function setLanguage(language) {
    const selected = language === "en" ? "en" : "ua";
    root.lang = selected === "ua" ? "uk" : "en";
    document.querySelectorAll("[data-lang]").forEach((element) => {
      element.hidden = element.dataset.lang !== selected;
    });
    languageButtons.forEach((button) => {
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.blogLanguage === selected),
      );
    });
    document.querySelectorAll("[data-ua][data-en]").forEach((element) => {
      if (element === title || element === description) return;
      if (element.tagName === "META") {
        element.content = element.dataset[selected];
      }
    });
    if (title) title.textContent = title.dataset[selected];
    if (description) description.content = description.dataset[selected];
    localStorage.setItem("lang", selected);
  }

  function setTheme(theme) {
    const isDark = theme === "dark";
    root.classList.toggle("dark", isDark);
    if (themeButton) {
      themeButton.setAttribute(
        "aria-label",
        isDark ? "Switch to light theme" : "Switch to dark theme",
      );
      themeButton.setAttribute("aria-pressed", String(isDark));
    }
    if (themeIcon) {
      themeIcon.src = isDark ? "../sun.png" : "../moon.png";
    }
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  languageButtons.forEach((button) => {
    button.addEventListener("click", () =>
      setLanguage(button.dataset.blogLanguage),
    );
  });

  themeButton?.addEventListener("click", () => {
    setTheme(root.classList.contains("dark") ? "light" : "dark");
  });

  const tocLinks = [...document.querySelectorAll(".blog-toc a[href^='#']")];
  const tocSections = tocLinks
    .map((link) => document.getElementById(link.hash.slice(1)))
    .filter(Boolean);

  if (tocSections.length) {
    const updateActiveSection = () => {
      const readingLine = window.innerHeight * 0.32;
      let activeSection = tocSections[0];
      tocSections.forEach((section) => {
        if (section.getBoundingClientRect().top <= readingLine) {
          activeSection = section;
        }
      });
      tocLinks.forEach((link) => {
        if (link.hash === `#${activeSection.id}`) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    };

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    updateActiveSection();
  }

  const preferredLanguage = localStorage.getItem("lang") || "ua";
  const preferredTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");
  setLanguage(preferredLanguage);
  setTheme(preferredTheme);
})();
