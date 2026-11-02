(() => {
  const root = document.documentElement;
  const languageButtons = document.querySelectorAll("[data-legal-language]");
  const themeButton = document.querySelector("[data-legal-theme]");
  const availableLanguages = new Set(
    Array.from(languageButtons, (button) => button.dataset.legalLanguage),
  );
  let activeHeadings = [];
  let sectionUpdateScheduled = false;

  const setActiveSection = (sectionId) => {
    document
      .querySelectorAll(".legal-toc a, .legal-toc-mobile a")
      .forEach((link) => {
        if (link.getAttribute("href") === `#${sectionId}`) {
          link.setAttribute("aria-current", "location");
        } else {
          link.removeAttribute("aria-current");
        }
      });
  };

  const updateActiveSection = () => {
    if (!activeHeadings.length) return;
    const readingLine = Math.max(80, window.innerHeight * 0.28);
    let activeHeading = activeHeadings[0];
    for (const heading of activeHeadings) {
      if (heading.getBoundingClientRect().top > readingLine) break;
      activeHeading = heading;
    }
    setActiveSection(activeHeading.id);
  };

  const scheduleActiveSectionUpdate = () => {
    if (sectionUpdateScheduled) return;
    sectionUpdateScheduled = true;
    window.requestAnimationFrame(() => {
      sectionUpdateScheduled = false;
      updateActiveSection();
    });
  };

  const observeSections = (language) => {
    activeHeadings = Array.from(document.querySelectorAll(
      `.legal-copy[data-language="${language}"] h2[id]`,
    ));
    updateActiveSection();
  };

  const setLanguage = (language) => {
    const selectedLanguage = availableLanguages.has(language) ? language : "ua";
    root.lang = selectedLanguage === "ua" ? "uk" : "en";

    document.querySelectorAll("[data-language]").forEach((section) => {
      section.hidden = section.dataset.language !== selectedLanguage;
    });
    observeSections(selectedLanguage);

    languageButtons.forEach((button) => {
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.legalLanguage === selectedLanguage),
      );
    });

    document.querySelectorAll("[data-language-control]").forEach((group) => {
      group.setAttribute(
        "aria-label",
        selectedLanguage === "en" ? "Language" : "Мова",
      );
    });

    const title = document.querySelector(
      `[data-language="${selectedLanguage}"] h1`,
    );
    if (title) document.title = `${title.textContent.trim()} | SportBot`;

    localStorage.setItem("lang", selectedLanguage);
    updateThemeLabel(selectedLanguage);
  };

  const updateThemeLabel = (language = root.lang === "en" ? "en" : "ua") => {
    if (!themeButton) return;
    const isDark = root.classList.contains("dark");
    themeButton.setAttribute(
      "aria-label",
      language === "en"
        ? isDark
          ? "Switch to light theme"
          : "Switch to dark theme"
        : isDark
          ? "Увімкнути світлу тему"
          : "Увімкнути темну тему",
    );
    themeButton.setAttribute("aria-pressed", String(isDark));
  };

  const savedTheme = localStorage.getItem("theme");
  const useDarkTheme =
    savedTheme === "dark" ||
    (savedTheme !== "light" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);
  root.classList.toggle("dark", useDarkTheme);

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const language = button.dataset.legalLanguage;
      setLanguage(language);
    });
  });

  if (themeButton) {
    themeButton.addEventListener("click", () => {
      root.classList.toggle("dark");
      localStorage.setItem(
        "theme",
        root.classList.contains("dark") ? "dark" : "light",
      );
      updateThemeLabel();
    });
  }

  const savedLanguage = localStorage.getItem("lang");
  setLanguage(savedLanguage === "en" ? "en" : "ua");
  window.addEventListener("scroll", scheduleActiveSectionUpdate, {
    passive: true,
  });
  window.addEventListener("resize", scheduleActiveSectionUpdate);

  document.querySelectorAll(".legal-toc-mobile a").forEach((link) => {
    link.addEventListener("click", () => {
      const toc = link.closest("details");
      if (toc) toc.open = false;
    });
  });
})();
