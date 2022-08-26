document.querySelectorAll("[data-tab-target]").forEach((a) => {
  a.addEventListener("click", () => {
    document
      .querySelectorAll(`[data-tab-group='${a.dataset.tabGroup}']`)
      .forEach((a) => {
        a.classList.remove("active-tab");
        a.classList.remove("tab-active");
      });
    document.querySelector(a.dataset.tabTarget).classList.add("active-tab");
    a.classList.add("tab-active");
  });
});
