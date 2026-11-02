(() => {
  const measurementId = "G-WY7BQKG0NT";
  const clarityId = "z7azswjs1b";

  const scheduleAfterLoad = (callback) => {
    const scheduleWhenIdle = () => {
      window.setTimeout(() => {
        if ("requestIdleCallback" in window) {
          window.requestIdleCallback(callback, { timeout: 2500 });
        } else {
          callback();
        }
      }, 1000);
    };

    if (document.readyState === "complete") {
      scheduleWhenIdle();
    } else {
      window.addEventListener("load", scheduleWhenIdle, { once: true });
    }
  };

  window.dataLayer = window.dataLayer || [];
  window.gtag =
    window.gtag ||
    function () {
      window.dataLayer.push(arguments);
    };
  window.gtag("js", new Date());
  window.gtag("config", measurementId);

  window.clarity =
    window.clarity ||
    function () {
      (window.clarity.q = window.clarity.q || []).push(arguments);
    };

  scheduleAfterLoad(() => {
    const googleTag = document.createElement("script");
    googleTag.async = true;
    googleTag.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(googleTag);

    const clarityTag = document.createElement("script");
    clarityTag.async = true;
    clarityTag.src = `https://www.clarity.ms/tag/${clarityId}`;
    document.head.appendChild(clarityTag);

    if (window.__plerdyCode) return;
    window.__plerdyCode = 1;
    window._protocol = window.location.protocol === "https:" ? "https://" : "http://";
    window._site_hash_code = "a081f5b5a8233112ccb13275ef9f2883";
    window._suid = 82724;

    const plerdyTag = document.createElement("script");
    plerdyTag.async = true;
    plerdyTag.referrerPolicy = "strict-origin-when-cross-origin";
    plerdyTag.setAttribute("data-plerdy_code", "1");
    plerdyTag.src = "https://a.plerdy.com/public/js/click/main.js";
    document.head.appendChild(plerdyTag);
  });
})();
