/* Proje görsellerini canvas ile çizen fonksiyonlar */
/* procedural architectural renders */
const sh = (h, f) => {
  let n = parseInt(h.slice(1), 16),
    r = n >> 16,
    g = (n >> 8) & 255,
    b = n & 255,
    t = f < 0 ? 0 : 255,
    a = Math.abs(f);
  return `rgb(${Math.round(r + (t - r) * a)},${Math.round(g + (t - g) * a)},${Math.round(b + (t - b) * a)})`;
};
const cache = {};
function img(p, W = 1600, H = 1100, vr = 0) {
  const key = p.s + W + H + vr;
  if (cache[key]) return cache[key];
  const c = document.createElement("canvas");
  c.width = W;
  c.height = H;
  const x = c.getContext("2d");
  let sd = p.sd * 97 + vr * 13;
  const r = () => (sd = (sd * 16807) % 2147483647) / 2147483647;
  const [s1, s2, g1, m1, gl] = p.pal,
    hz = H * (p.hz + vr * 0.06),
    sc = 1 + vr * 0.25,
    ox = -vr * 0.14 * W;
  let g = x.createLinearGradient(0, 0, 0, hz);
  g.addColorStop(0, s1);
  g.addColorStop(1, s2);
  x.fillStyle = g;
  x.fillRect(0, 0, W, H);
  g = x.createRadialGradient(W * 0.78, hz * 0.82, 0, W * 0.78, hz * 0.82, W * 0.55);
  g.addColorStop(0, "rgba(255,236,200,.85)");
  g.addColorStop(0.25, "rgba(255,200,150,.35)");
  g.addColorStop(1, "rgba(255,200,150,0)");
  x.fillStyle = g;
  x.fillRect(0, 0, W, hz);
  x.fillStyle = sh(s1, -0.18);
  x.beginPath();
  x.moveTo(0, hz);
  for (let i = 0; i <= 24; i++) x.lineTo((W * i) / 24, hz - H * (0.015 + r() * 0.05));
  x.lineTo(W, hz);
  x.fill();
  g = x.createLinearGradient(0, hz, 0, H);
  g.addColorStop(0, g1);
  g.addColorStop(1, sh(g1, -0.22));
  x.fillStyle = g;
  x.fillRect(0, hz, W, H - hz);
  const vs = [...p.v].sort((a, b) => a[4] - b[4]);
  vs.forEach(([vx, vw, vh, d, yo]) => {
    const X = ox + vx * W * sc,
      w = vw * W * sc,
      h = vh * H * sc,
      dd = d * W * sc,
      dy = dd * 0.42,
      B = hz + yo * H * sc + H * 0.08,
      T = B - h;
    // shadow
    x.fillStyle = "rgba(20,25,30,.18)";
    x.beginPath();
    x.moveTo(X + w, B);
    x.lineTo(X + w + dd, B - dy);
    x.lineTo(X + w + dd + h * 0.55, B - dy + h * 0.08);
    x.lineTo(X + w + h * 0.5, B + h * 0.1);
    x.fill();
    if (yo < -0.05) {
      x.fillStyle = "rgba(20,25,30,.12)";
      x.fillRect(X + w * 0.1, B + H * 0.02, w * 0.9, H * 0.02);
    }
    // side
    x.fillStyle = sh(m1, -0.28);
    x.beginPath();
    x.moveTo(X + w, T);
    x.lineTo(X + w + dd, T - dy);
    x.lineTo(X + w + dd, B - dy);
    x.lineTo(X + w, B);
    x.fill();
    // top
    x.fillStyle = sh(m1, 0.25);
    x.beginPath();
    x.moveTo(X, T);
    x.lineTo(X + dd, T - dy);
    x.lineTo(X + w + dd, T - dy);
    x.lineTo(X + w, T);
    x.fill();
    // front
    g = x.createLinearGradient(X, 0, X + w, 0);
    g.addColorStop(0, sh(m1, 0.08));
    g.addColorStop(1, sh(m1, -0.06));
    x.fillStyle = g;
    x.fillRect(X, T, w, h);
    // openings
    const gg = x.createLinearGradient(0, T, 0, B);
    gg.addColorStop(0, sh(gl, 0.35));
    gg.addColorStop(0.5, gl);
    gg.addColorStop(1, sh(gl, -0.25));
    x.fillStyle = gg;
    const fl = Math.max(1, Math.round(h / (H * 0.045)));
    if (p.w === "strip")
      for (let i = 0; i < fl; i++) {
        const fy = T + (h * (i + 0.28)) / fl;
        x.fillRect(X + w * 0.04, fy, w * 0.92, (h / fl) * 0.48);
      }
    else if (p.w === "grid") {
      const cl = Math.max(3, Math.round(w / (W * 0.022)));
      for (let i = 0; i < fl; i++)
        for (let j = 0; j < cl; j++)
          x.fillRect(X + (w * (j + 0.12)) / cl, T + (h * (i + 0.12)) / fl, (w / cl) * 0.8, (h / fl) * 0.76);
    } else if (p.w === "fins") {
      x.fillRect(X + w * 0.03, T + h * 0.12, w * 0.94, h * 0.76);
      x.fillStyle = sh(m1, 0.02);
      const n = Math.round(w / (W * 0.012));
      for (let j = 0; j <= n; j++)
        x.fillRect(X + w * 0.03 + (w * 0.94 * j) / n - 2, T + h * 0.12, 4, h * 0.76);
    } else {
      const n = Math.max(2, Math.round(w / (W * 0.08)));
      for (let j = 0; j < n; j++)
        if (r() > 0.35) x.fillRect(X + (w * (j + 0.3)) / n, T + h * 0.25, (w / n) * 0.35, h * 0.5);
    }
    // glass reflection
    x.fillStyle = "rgba(255,255,255,.06)";
    x.beginPath();
    x.moveTo(X + w * 0.2, T);
    x.lineTo(X + w * 0.45, T);
    x.lineTo(X + w * 0.25, B);
    x.lineTo(X, B);
    x.fill();
  });
  // trees
  for (let i = 0; i < 14; i++) {
    const tx = r() * W,
      ty = hz + H * (0.1 + r() * 0.25),
      tr = H * (0.012 + r() * 0.02);
    x.fillStyle = `rgba(52,98,58,${0.55 + r() * 0.3})`;
    x.beginPath();
    x.ellipse(tx, ty - tr, tr * 0.8, tr * 1.3, 0, 0, 7);
    x.fill();
  }
  // grain
  const id = x.getImageData(0, 0, W, H),
    dt = id.data;
  for (let i = 0; i < dt.length; i += 4) {
    const n = (Math.random() - 0.5) * 10;
    dt[i] += n;
    dt[i + 1] += n;
    dt[i + 2] += n;
  }
  x.putImageData(id, 0, 0);
  return (cache[key] = c.toDataURL("image/jpeg", 0.84));
}
