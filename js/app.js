/* Uygulama: yönlendirme, dil ve tema düğmeleri, başlatma */
function chrome() {
  document.documentElement.lang = L;
  document.querySelectorAll("[data-k]").forEach((e) => (e.textContent = t(e.dataset.k)));
  document.querySelectorAll(".lang button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.l === L));
}
function route(keep) {
  const h = location.hash.slice(1);
  document.querySelectorAll("nav a[data-r]").forEach((a) => {
    a.dataset.r === h || (h.startsWith("p-") && a.dataset.r === "projeler")
      ? a.setAttribute("aria-current", "page")
      : a.removeAttribute("aria-current");
  });
  if (h === "projeler") list();
  else if (h === "hizmetler") services();
  else if (h === "ofis") office();
  else if (h === "iletisim") contact();
  else if (h.startsWith("p-")) detail(h.slice(2));
  else home();
  if (keep !== true && !(h === "hizmetler" && so)) scrollTo(0, 0);
}
document.querySelectorAll(".lang button").forEach(
  (b) =>
    (b.onclick = () => {
      L = b.dataset.l;
      try {
        localStorage.setItem("nba-lang", L);
      } catch (e) {}
      chrome();
      route(true);
      if (typeof apply === "function") apply();
    }),
);
chrome();
addEventListener("hashchange", route);
route();

/* light / dark toggle */
const R = document.documentElement,
  mq = matchMedia("(prefers-color-scheme: dark)");
try {
  const v = localStorage.getItem("nba-theme");
  if (v) R.setAttribute("data-theme", v);
} catch (e) {}
const isDk = () => {
  const v = R.getAttribute("data-theme");
  return v ? v === "dark" : mq.matches;
};
function syncT() {
  const d = isDk(),
    b = $("#thm");
  b.setAttribute(
    "aria-label",
    L === "en"
      ? d
        ? "Switch to light mode"
        : "Switch to dark mode"
      : d
        ? "Açık temaya geç"
        : "Koyu temaya geç",
  );
  b.title = b.getAttribute("aria-label");
  b.dataset.d = d;
}
$("#thm").onclick = () => {
  const v = isDk() ? "light" : "dark";
  R.setAttribute("data-theme", v);
  try {
    localStorage.setItem("nba-theme", v);
  } catch (e) {}
  syncT();
};
mq.addEventListener?.("change", syncT);
new MutationObserver(syncT).observe(R, { attributes: true, attributeFilter: ["data-theme"] });
function apply() {
  syncT();
}
syncT();
