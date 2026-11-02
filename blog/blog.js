(() => {
  const root = document.documentElement;
  const languageButtons = document.querySelectorAll("[data-blog-language]");
  const themeButton = document.querySelector("[data-blog-theme]");
  const themeIcon = themeButton?.querySelector("img");
  const title = document.querySelector("title[data-ua][data-en]");
  const translatableMeta = document.querySelectorAll("meta[data-ua][data-en]");

  function normalizeLanguage(language) {
    return language === "en" ? "en" : "ua";
  }

  function setLanguage(language) {
    const selected = normalizeLanguage(language);
    root.lang = selected === "ua" ? "uk" : "en";

    document.querySelectorAll("[data-lang]").forEach((element) => {
      element.hidden = element.dataset.lang !== selected;
    });

    document.querySelectorAll("img[data-ua-alt][data-en-alt]").forEach((image) => {
      image.alt = image.dataset[selected === "ua" ? "uaAlt" : "enAlt"];
    });

    const fixedLabels = {
      "Progress & Gamification": { ua: "Прогрес і гейміфікація", en: "Progress & Gamification" },
      "SportBot Tutorials": { ua: "Інструкції SportBot", en: "SportBot Tutorials" },
      Progress: { ua: "Прогрес", en: "Progress" },
      Tutorials: { ua: "Інструкції", en: "Tutorials" },
    };
    document.querySelectorAll(".blog-eyebrow, .blog-breadcrumbs > span, .blog-brand span").forEach((element) => {
      const key = element.textContent.trim();
      const label = fixedLabels[key] || Object.values(fixedLabels).find((value) => value.ua === key || value.en === key);
      if (label) element.textContent = label[selected];
    });

    languageButtons.forEach((button) => {
      button.setAttribute(
        "aria-pressed",
        String(normalizeLanguage(button.dataset.blogLanguage) === selected),
      );
    });

    translatableMeta.forEach((element) => {
      element.content = element.dataset[selected] || element.dataset.en || "";
    });
    if (title) title.textContent = title.dataset[selected] || title.dataset.en;

    const labels = selected === "ua"
      ? {
          "Language and theme controls": "Керування мовою та темою",
          "Language and theme": "Мова та тема",
          Language: "Мова",
          Breadcrumb: "Навігаційний шлях",
          "Table of contents": "Зміст статті",
          Footer: "Нижній колонтитул",
        }
      : {
          "Language and theme controls": "Language and theme controls",
          "Керування мовою та темою": "Language and theme controls",
          "Language and theme": "Language and theme",
          "Мова та тема": "Language and theme",
          Language: "Language",
          "Мова": "Language",
          Breadcrumb: "Breadcrumb",
          "Навігаційний шлях": "Breadcrumb",
          "Table of contents": "Table of contents",
          "Зміст статті": "Table of contents",
          Footer: "Footer",
          "Нижній колонтитул": "Footer",
        };
    document.querySelectorAll("[aria-label]").forEach((element) => {
      const translated = labels[element.getAttribute("aria-label")];
      if (translated) element.setAttribute("aria-label", translated);
    });

    document.querySelectorAll("[data-ua-label][data-en-label]").forEach((element) => {
      element.setAttribute(
        "aria-label",
        selected === "ua" ? element.dataset.uaLabel : element.dataset.enLabel,
      );
    });
    document.querySelectorAll("[data-ua-placeholder][data-en-placeholder]").forEach((element) => {
      element.placeholder = selected === "ua" ? element.dataset.uaPlaceholder : element.dataset.enPlaceholder;
    });

    if (themeButton) {
      const isDark = root.classList.contains("dark");
      themeButton.setAttribute(
        "aria-label",
        isDark
          ? (selected === "ua" ? "Увімкнути світлу тему" : "Switch to light theme")
          : (selected === "ua" ? "Увімкнути темну тему" : "Switch to dark theme"),
      );
    }

    localStorage.setItem("lang", selected);
  }

  function setTheme(theme) {
    const isDark = theme === "dark";
    root.classList.toggle("dark", isDark);
    if (themeButton) {
      themeButton.setAttribute(
        "aria-label",
        isDark
          ? (root.lang === "uk" ? "Увімкнути світлу тему" : "Switch to light theme")
          : (root.lang === "uk" ? "Увімкнути темну тему" : "Switch to dark theme"),
      );
      themeButton.setAttribute("aria-pressed", String(isDark));
    }
    if (themeIcon) themeIcon.src = isDark ? "../sun.png" : "../moon.png";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  }

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => setLanguage(button.dataset.blogLanguage));
  });
  themeButton?.addEventListener("click", () => {
    setTheme(root.classList.contains("dark") ? "light" : "dark");
  });

  const tocLinks = [...document.querySelectorAll(".blog-toc a[href^='#']")];
  const tocSections = tocLinks.map((link) => document.getElementById(link.hash.slice(1))).filter(Boolean);
  if (tocSections.length) {
    const updateActiveSection = () => {
      const readingLine = window.innerHeight * 0.32;
      let activeSection = tocSections[0];
      tocSections.forEach((section) => {
        if (section.getBoundingClientRect().top <= readingLine) activeSection = section;
      });
      tocLinks.forEach((link) => {
        link.toggleAttribute("aria-current", link.hash === `#${activeSection.id}`);
      });
    };
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    updateActiveSection();
  }

  const storedLanguage = localStorage.getItem("lang");
  setLanguage(storedLanguage === "en" ? "en" : "ua");
  setTheme(localStorage.getItem("theme") || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"));
})();
