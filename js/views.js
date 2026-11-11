/* Sayfa görünümleri: ana sayfa, projeler, detay, hizmetler, ofis, iletişim */
const $ = (s) => document.querySelector(s),
  app = $("#app");
const fmt = (n) => n.toLocaleString(L === "en" ? "en-GB" : "tr-TR");
const card = (
  p,
) => `<a class="card" href="#p-${p.s}"><div class="im"><img src="${img(p, 900, 675)}" alt="${q(p, "n")}, ${t("alt")}" loading="lazy"></div>
 <div class="meta"><span class="mono">${p.id}</span><span class="lbl">${q(p, "c")}</span></div><h3>${q(p, "n")}</h3><span class="mono" style="color:var(--mute)">${p.l} · ${p.y}</span></a>`;

function home() {
  const f = P.slice(0, 7);
  app.innerHTML = `<div class="wrap fade"><section class="home">
  <div><div class="idx-h"><span class="lbl">${t("sel")}</span><span class="lbl">${f.length} / ${P.length}</span></div>
   <ul class="idx">${f.map((p, i) => `<li><a href="#p-${p.s}" data-i="${i}" class="${i ? "" : "on"}"><span class="mono cd">${p.id}</span><span class="nm">${q(p, "n")}</span><span class="lbl ct">${q(p, "c")}</span></a></li>`).join("")}</ul>
   <p style="margin-top:22px"><a href="#projeler" class="cp" style="margin:0;font-size:14px">${t("allp")}</a></p></div>
  <div class="stage"><div class="frame">${f.map((p, i) => `<img src="${img(p)}" alt="${q(p, "n")}, ${t("alt")}" class="${i ? "" : "on"}">`).join("")}</div>
   <div class="cap"><b id="cn">${q(f[0], "n")}</b><span class="mono" id="ck" style="color:var(--mute)">${f[0].l} · ${kc(f[0])}</span></div></div>
 </section></div>
 <div class="band"><div class="wrap"><section class="intro"><p>${t("th")}</p>
  <div><p class="mute" style="font:inherit;max-width:58ch;margin:0 0 28px">${t("ab")}</p>
  <div class="stats"><div><strong>${P.length}</strong><span class="lbl">${t("s1")}</span></div><div><strong>${fmt(Math.round(P.reduce((a, p) => a + p.a, 0) / 1000))}K</strong><span class="lbl">${t("s2")}</span></div><div><strong>${new Set(P.map((p) => p.l)).size}</strong><span class="lbl">${t("s3")}</span></div></div></div>
 </section></div></div>`;
  const im = app.querySelectorAll(".frame img"),
    ls = app.querySelectorAll(".idx a");
  const set = (i) => {
    im.forEach((e, j) => e.classList.toggle("on", j == i));
    ls.forEach((e, j) => e.classList.toggle("on", j == i));
    $("#cn").textContent = q(f[i], "n");
    $("#ck").textContent = `${f[i].l} · ${kc(f[i])}`;
  };
  ls.forEach((a) => {
    a.addEventListener("mouseenter", () => set(a.dataset.i));
    a.addEventListener("focus", () => set(a.dataset.i));
  });
}

let cf = "Tümü";
function list() {
  app.innerHTML = `<div class="wrap fade"><div class="ph"><h1>${t("pr")}</h1><div class="chips" role="group" aria-label="${t("cat")}">${cats.map((c) => `<button aria-pressed="${c === cf}" data-c="${c}">${L === "en" ? CE[c] : c}</button>`).join("")}</div></div>
  <div class="grid" id="gr"></div></div>`;
  const draw = () => {
    $("#gr").innerHTML = P.filter((p) => cf === "Tümü" || p.c === cf)
      .map(card)
      .join("");
  };
  draw();
  app.querySelectorAll(".chips button").forEach(
    (b) =>
      (b.onclick = () => {
        cf = b.dataset.c;
        app.querySelectorAll(".chips button").forEach((x) => x.setAttribute("aria-pressed", x === b));
        draw();
      }),
  );
}

function detail(s) {
  const i = P.findIndex((p) => p.s === s);
  if (i < 0) return home();
  const p = P[i],
    pv = P[(i + P.length - 1) % P.length],
    nx = P[(i + 1) % P.length],
    n = q(p, "n");
  app.innerHTML = `<div class="wrap fade"><div class="dt-hero"><img src="${img(p, 2000, 860)}" alt="${n}, ${t("alt")}"></div>
 <section class="dt"><div><span class="lbl">${p.id} · ${q(p, "c")}</span><h1>${n}</h1>
  <dl class="facts"><dt class="lbl">${t("loc")}</dt><dd>${p.l}</dd><dt class="lbl">${t("co")}</dt><dd class="mono">${kc(p)}</dd><dt class="lbl">${t("yr")}</dt><dd>${p.y}</dd>
  <dt class="lbl">${t("ar")}</dt><dd>${fmt(p.a)} m²</dd><dt class="lbl">${t("st")}</dt><dd>${q(p, "st")}</dd><dt class="lbl">${t("cl")}</dt><dd>${q(p, "cl")}</dd></dl></div>
  <div class="body">${q(p, "t")
    .map((x) => `<p>${x}</p>`)
    .join("")}</div></section>
 <div class="gal"><img src="${img(p, 1200, 800, 1)}" alt="${n}, ${t("alt1")}"><img src="${img(p, 1200, 800, 2)}" alt="${n}, ${t("alt2")}"></div>
 <div class="pn"><a href="#p-${pv.s}"><span class="lbl">${t("prev")}</span><b>${q(pv, "n")}</b></a><a href="#p-${nx.s}"><span class="lbl">${t("next")}</span><b>${q(nx, "n")}</b></a></div></div>`;
}

let so = 0;
const ico = (k, z = 40) =>
  `<svg viewBox="0 0 48 48" width="${z}" height="${z}" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round" stroke-linecap="round" aria-hidden="true"><path d="${IC[k]}"/></svg>`;
function services() {
  const x = ST[L];
  app.innerHTML = `<div class="wrap fade"><div class="ph"><h1>${x.h}</h1><p class="lead">${x.lead}</p></div>
 <div class="acc">${SV.map((v, i) => {
   const [n, d, l, b] = v[L],
     rp = P.filter((p) => v.rc === "*" || p.c === v.rc).slice(0, 2);
   return `<details ${i === so ? "open" : ""} data-i="${i}"><summary><span class="mono sn">${String(i + 1).padStart(2, "0")}</span><span class="si">${ico(v.k, 34)}</span><span class="st"><b>${n}</b><span>${d}</span></span><span class="sx" aria-hidden="true"></span></summary>
  <div class="sb"><div class="sbt"><p>${l}</p><span class="lbl">${x.sc}</span><ul>${b.map((y) => `<li>${y}</li>`).join("")}</ul></div>
  <div class="sbr"><span class="lbl">${x.rel}</span>${rp.map((p) => `<a class="rp" href="#p-${p.s}"><img src="${img(p, 480, 320)}" alt=""><span><b>${q(p, "n")}</b><span class="mono">${p.l} · ${p.y}</span></span></a>`).join("")}</div></div></details>`;
 }).join("")}</div>
 <section class="proc"><h2>${x.pr}</h2><ol>${x.ps.map(([a, b], i) => `<li><span class="mono">${String(i + 1).padStart(2, "0")}</span><b>${a}</b><span>${b}</span></li>`).join("")}</ol></section></div>
 <div class="band"><div class="wrap cta"><b>${x.cta}</b><a href="#iletisim" class="ctab">${x.ctab}</a></div></div>`;
  const ds = app.querySelectorAll("details");
  ds.forEach((d) =>
    d.addEventListener("toggle", () => {
      if (d.open) {
        so = +d.dataset.i;
        ds.forEach((o) => o !== d && (o.open = false));
      }
    }),
  );
  if (so) {
    const d = ds[so];
    setTimeout(() => d.scrollIntoView({ block: "start", behavior: "smooth" }), 60);
  }
}

function office() {
  const nm = ["Nazım Bayar"];
  app.innerHTML = `<div class="wrap fade"><div class="ph"><h1>${t("of")}</h1><span class="lbl">${t("ofh")}</span></div>
  <section class="of"><h2>${t("apH")}</h2><div class="body">${t("ap")
    .map((x) => `<p>${x}</p>`)
    .join("")}</div></section>
  <section class="of"><h2>${t("svH")}</h2><div><ul class="svc">${SV.map((v, i) => `<li><a href="#hizmetler" data-so="${i}"><span class="si">${ico(v.k, 22)}</span>${v[L][0]}</a></li>`).join("")}</ul><p style="margin-top:20px"><a href="#hizmetler" class="cp" style="margin:0;font-size:14px">${ST[L].all}</a></p></div></section>
  <section class="of" style="border:0"><h2>${t("tmH")}</h2><div class="team">${nm.map((n, i) => `<div><b>${n}</b><span>${t("tm")[i]}</span></div>`).join("")}</div></section></div>`;
  app.querySelectorAll("[data-so]").forEach(
    (a) =>
      (a.onclick = () => {
        so = +a.dataset.so;
      }),
  );
}

function contact() {
  const em = "info@nbamimarlik.com";
  app.innerHTML = `<div class="wrap fade"><div class="ph"><h1>${t("ct")}</h1></div><section class="ct-g">
  <dl><dt class="lbl">${t("adr")}</dt><dd>Şeyhsinan Mah. Salih Omurtak Cad.<br>Vakıf İş Merkezi, Kat: 1, No: 143/107<br>Çorlu / Tekirdağ<br><a class="cp" style="margin:0" href="https://www.google.com/maps/search/?api=1&query=Vak%C4%B1f+%C4%B0%C5%9F+Merkezi+Salih+Omurtak+Cad.+%C3%87orlu+Tekirda%C4%9F" target="_blank" rel="noopener">${t("map")}</a></dd>
   <dt class="lbl">${t("em")}</dt><dd><button type="button" class="cpx" id="em" data-v="${em}" data-h="${t("cp")}">${em}</button></dd>
   <dt class="lbl">${t("ph")}</dt><dd><button type="button" class="cpx mono" style="font-size:15px" id="tel" data-v="05317204911" data-h="${t("cp")}">0531 720 49 11</button></dd>
   <dt class="lbl">${t("cn")}</dt><dd>Nazım Bayar</dd>
   <dt class="lbl">${t("hr")}</dt><dd>${t("hrv")}</dd></dl>
  <form id="fm" novalidate><div class="row"><label for="f-ad"><span class="lbl">${t("nm")}</span><input id="f-ad" required></label>
   <label for="f-em"><span class="lbl">${t("em")}</span><input id="f-em" type="email" required></label></div>
   <label for="f-k"><span class="lbl">${t("sb")}</span><select id="f-k">${t("sbo")
     .map((o) => `<option>${o}</option>`)
     .join("")}</select></label>
   <label for="f-m"><span class="lbl">${t("ms")}</span><textarea id="f-m" required></textarea></label>
   <button class="btn" type="submit">${t("snd")}</button></form></section></div>`;
  app.querySelectorAll(".cpx").forEach(
    (b) =>
      (b.onclick = () => {
        const ok = () => {
          b.dataset.h = t("cpk");
          b.classList.add("ok");
          toast(t(b.id === "tel" ? "cpd2" : "cpd"));
          setTimeout(() => {
            b.dataset.h = t("cp");
            b.classList.remove("ok");
          }, 1800);
        };
        navigator.clipboard
          ? navigator.clipboard.writeText(b.dataset.v).then(ok, () => {
              getSelection().selectAllChildren(b);
              toast(t("cps"));
            })
          : (getSelection().selectAllChildren(b), toast(t("cps")));
      }),
  );
  $("#fm").onsubmit = (e) => {
    e.preventDefault();
    const f = e.target;
    if (!$("#f-ad").value || !$("#f-em").value.includes("@") || !$("#f-m").value) return toast(t("fe"));
    f.reset();
    toast(t("fo"));
  };
}

let tt;
function toast(m) {
  const x = $("#toast");
  x.textContent = m;
  x.classList.add("on");
  clearTimeout(tt);
  tt = setTimeout(() => x.classList.remove("on"), 2600);
}
