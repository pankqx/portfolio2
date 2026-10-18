import './ascii.css';
import portrait from './portrait.json';
import { FIG_KS, FIG_NAME } from './figlet';
import { PERSON, PROJECTS, EXPERIENCE, link } from '../data';

const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const esc = (s: string) => s.replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]!));
const STACK = ['python', 'kotlin', 'java', 'typescript', 'javascript', 'c#', 'sql', 'react', 'next.js', 'electron', 'android', 'asp.net core', 'firebase', 'postgresql', 'docker', 'git', 'ubuntu', 'latex'];

const root = document.getElementById('root')!;
root.innerHTML = `
<header class="bar"><div class="wrap">
  <span>k s pankaj<span class="caret" aria-hidden="true" style="height:1em;width:.5em;margin-left:2px"></span></span>
  <span class="mid">12.91°N 74.85°E · mangaluru · <span id="clock">--:--:--</span> IST</span>
  <span class="right">
    <button id="theme" aria-label="Toggle dark mode">[theme]</button>
    <a class="btn" href="../?boot=0">[reboot ↺]</a>
  </span>
</div></header>

<main class="wrap">
  <section class="hero">
    <figure class="portrait">
      <canvas id="face" aria-label="ASCII portrait of K S Pankaj" role="img"></canvas>
      <figcaption class="cap"><span>fig.1 — self, ${portrait.cols}×${portrait.rows} chars</span><span>move / tap to disturb</span></figcaption>
    </figure>
    <div>
      <pre class="fig ks" aria-hidden="true">${FIG_KS}</pre>
      <pre class="fig" aria-hidden="true">${FIG_NAME}</pre>
      <h1 style="position:absolute;left:-9999px">K S Pankaj</h1>
      <p class="who" id="who" aria-live="polite"></p>
    </div>
  </section>

  <pre class="wave" aria-hidden="true"></pre>
  <section class="sec" id="projects">
    <h2 class="h"><span class="p">~/</span>projects <span class="dim">— ${PROJECTS.length} entries · enter to open</span></h2>
    <ol class="rows">
      ${PROJECTS.map((p, i) => `
      <li class="row"><a href="${link(p)}" target="_blank" rel="noopener">
        <span class="n">${String(i + 1).padStart(2, '0')}</span>
        <span class="name"><b data-scramble="${esc(p.name.toLowerCase())}">${esc(p.name.toLowerCase())}</b> <span class="dots">${'.'.repeat(60)}</span></span>
        <span class="go ${p.demo ? 'live' : ''}"><span class="tag">${esc(p.tags.toLowerCase())}</span>&nbsp;&nbsp;${p.demo ? '[live ↗]' : '[src ↗]'}</span>
        <span class="desc">${esc(p.what)}</span>
      </a></li>`).join('')}
    </ol>
  </section>

  <pre class="wave" aria-hidden="true"></pre>
  <section class="sec">
    <h2 class="h"><span class="p">~/</span>log</h2>
    <div class="log">
      ${EXPERIENCE.map((e) => `<div class="item"><span class="when">${e.when}</span><span><b>${esc(e.role)}</b> @ ${esc(e.org)}<br><span class="note">${esc(e.note)}</span></span></div>`).join('')}
      <div class="item"><span class="when">Oct 2026</span><span><b>GATEWAYS 2026</b> — 24h hackathon, team http dino<br><span class="note">Built Paroh, a HumanTwin AI. Shipped before 8 AM. Slept after.</span></span></div>
      <div class="item"><span class="when">2025 —</span><span><b>MCA</b> @ St Aloysius (Deemed to be University)<br><span class="note">Before that: B.Sc. Computer Science &amp; Mathematics, CGPA 7.7.</span></span></div>
    </div>
  </section>

  <pre class="wave" aria-hidden="true"></pre>
  <section class="sec">
    <h2 class="h"><span class="p">~/</span>stack</h2>
    <div class="stack">${STACK.map((s) => `<span>${s}</span>`).join('')}</div>
  </section>

  <pre class="wave" aria-hidden="true"></pre>
  <footer class="foot">
    <pre class="donut" id="donut" aria-hidden="true"></pre>
    <div>
      <h2 class="h"><span class="p">~/</span>contact <span class="dim">— replies faster than my builds</span></h2>
      <nav class="links">
        <a href="mailto:${PERSON.email}">${PERSON.email}</a>
        <a href="${PERSON.github}" target="_blank" rel="noopener">github.com/pankqx</a>
        <a href="${PERSON.linkedin}" target="_blank" rel="noopener">linkedin.com/in/pankqx</a>
        <a href="../${PERSON.resume}" target="_blank" rel="noopener">resume.pdf</a>
      </nav>
      <p class="fine">uptime <span id="uptime">0s</span> · no photos were harmed, only quantised.</p>
    </div>
  </footer>
</main>`;

/* ---------- theme + clock ---------- */
const themeBtn = document.getElementById('theme')!;
const store = { get: (k: string) => { try { return localStorage.getItem(k); } catch { return null; } }, set: (k: string, v: string) => { try { localStorage.setItem(k, v); } catch { /* ignore */ } } };
const saved = store.get('ascii-theme');
if (saved) document.documentElement.dataset.theme = saved;
const isDark = () => (document.documentElement.dataset.theme ?? (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')) === 'dark';
const paintThemeBtn = () => { themeBtn.textContent = isDark() ? '[light]' : '[dark]'; };
paintThemeBtn();
themeBtn.addEventListener('click', () => { const t = isDark() ? 'light' : 'dark'; document.documentElement.dataset.theme = t; store.set('ascii-theme', t); paintThemeBtn(); readColors(); });

const clock = document.getElementById('clock')!;
const uptime = document.getElementById('uptime')!;
const t0 = Date.now();
const tick = () => {
  clock.textContent = new Date().toLocaleTimeString('en-GB', { timeZone: 'Asia/Kolkata', hour12: false });
  const s = Math.floor((Date.now() - t0) / 1000);
  uptime.textContent = s < 60 ? `${s}s` : `${Math.floor(s / 60)}m ${s % 60}s`;
};
tick(); setInterval(tick, 1000);

/* ---------- portrait engine ---------- */
const RAMP = ' .:-=+*#%@';
const NOISE = '01<>/\\|{}[]_-+*';
const canvas = document.getElementById('face') as HTMLCanvasElement;
const ctx = canvas.getContext('2d')!;
const { cols, rows } = portrait;
const base = Uint8Array.from(portrait.data, (c) => +c);
const revealAt = new Float32Array(cols * rows);
const flick = new Float32Array(cols * rows);
let colInk = '#141412', colHot = '#ff4d1f', colMute = '#8a867b', colPaper = '#efece4';
function readColors() {
  const cs = getComputedStyle(document.documentElement);
  colInk = cs.getPropertyValue('--ink').trim(); colHot = cs.getPropertyValue('--hot').trim();
  colMute = cs.getPropertyValue('--mute').trim(); colPaper = cs.getPropertyValue('--paper').trim();
}
readColors();
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { readColors(); paintThemeBtn(); });

let cw = 0, ch = 0, fs = 0;
function size() {
  const w = canvas.parentElement!.clientWidth;
  const dpr = Math.min(2, window.devicePixelRatio || 1);
  cw = w / cols; ch = cw * 2; fs = cw / 0.6;
  canvas.width = Math.round(w * dpr); canvas.height = Math.round(rows * ch * dpr);
  canvas.style.height = `${rows * ch}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  ctx.font = `${fs}px 'JetBrains Mono', monospace`;
  ctx.textBaseline = 'top';
}
size();
new ResizeObserver(size).observe(canvas.parentElement!);
document.fonts?.ready.then(size);

const start = performance.now();
const cx = cols / 2, cy = rows / 2;
for (let y = 0; y < rows; y++) for (let x = 0; x < cols; x++) {
  const d = Math.hypot((x - cx) / cols, (y - cy) / rows);
  revealAt[y * cols + x] = reduce ? 0 : 250 + d * 2200 + Math.random() * 500;
}

const mouse = { x: -1e4, y: -1e4, on: false };
const ripples: { x: number; y: number; t: number }[] = [];
canvas.addEventListener('pointermove', (e) => { const r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.on = true; });
canvas.addEventListener('pointerleave', () => { mouse.on = false; mouse.x = mouse.y = -1e4; });
canvas.addEventListener('pointerdown', (e) => { const r = canvas.getBoundingClientRect(); ripples.push({ x: e.clientX - r.left, y: e.clientY - r.top, t: performance.now() }); });

let visible = true;
new IntersectionObserver(([en]) => { visible = en.isIntersecting; }).observe(canvas);

function frame(now: number) {
  requestAnimationFrame(frame);
  if (!visible) return;
  const t = now - start;
  ctx.fillStyle = colPaper;
  ctx.fillRect(0, 0, cols * cw, rows * ch);
  const lensR = cw * 14;
  // idle flicker
  if (!reduce) for (let k = 0; k < 6; k++) flick[(Math.random() * flick.length) | 0] = now + 180;
  // drop old ripples
  while (ripples.length && now - ripples[0].t > 1600) ripples.shift();

  const hot: number[] = [];
  const mute: number[] = [];
  ctx.fillStyle = colInk;
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const i = y * cols + x;
      let lv = base[i];
      const px = x * cw, py = y * ch;
      if (t < revealAt[i]) {
        if (lv > 0 || Math.random() < 0.02) mute.push(i);
        continue;
      }
      let isHot = false;
      if (mouse.on) {
        const d = Math.hypot(px + cw / 2 - mouse.x, py + ch / 2 - mouse.y);
        if (d < lensR) {
          const f = 1 - d / lensR;
          lv = Math.min(9, lv + Math.round(f * 5 * Math.sin(t / 140 + d / cw)));
          if (lv < 0) lv = 0;
          if (f > 0.72 && lv > 0) isHot = true;
        }
      }
      for (const r of ripples) {
        const age = now - r.t;
        const rad = age * 0.55;
        const d = Math.hypot(px + cw / 2 - r.x, py + ch / 2 - r.y);
        if (Math.abs(d - rad) < cw * 2.2) { lv = Math.max(lv, 6 - Math.floor(age / 300)); isHot = true; }
      }
      if (flick[i] > now && lv > 0) lv = Math.max(1, lv + (Math.random() < 0.5 ? -1 : 1));
      if (lv <= 0) continue;
      if (isHot) { hot.push(i, lv); continue; }
      ctx.fillText(RAMP[Math.min(9, lv)], px, py);
    }
  }
  if (mute.length) {
    ctx.fillStyle = colMute;
    for (const i of mute) ctx.fillText(NOISE[(Math.random() * NOISE.length) | 0], (i % cols) * cw, ((i / cols) | 0) * ch);
  }
  if (hot.length) {
    ctx.fillStyle = colHot;
    for (let k = 0; k < hot.length; k += 2) { const i = hot[k]; ctx.fillText(RAMP[Math.min(9, hot[k + 1])], (i % cols) * cw, ((i / cols) | 0) * ch); }
  }
}
requestAnimationFrame(frame);

/* ---------- whoami typewriter ---------- */
const LINES: [string, string][] = [
  ['> ', 'whoami'],
  ['', 'k s pankaj. software developer. mca student, mangaluru.'],
  ['> ', 'cat focus.txt'],
  ['', 'android · full-stack web · tools people open twice.'],
  ['> ', 'status'],
  ['', 'open to internships and hard problems.'],
];
const who = document.getElementById('who')!;
(async () => {
  const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
  if (reduce) { who.innerHTML = LINES.map(([p, s]) => `<span class="ln"><span class="p">${p}</span>${esc(s)}</span>`).join(''); return; }
  await sleep(900);
  for (const [p, s] of LINES) {
    const ln = document.createElement('span'); ln.className = 'ln';
    ln.innerHTML = `<span class="p">${p}</span><span class="t"></span><span class="caret"></span>`;
    who.appendChild(ln);
    const tEl = ln.querySelector('.t')!;
    for (let i = 1; i <= s.length; i++) { tEl.textContent = s.slice(0, i); await sleep(p ? 55 : 14); }
    await sleep(p ? 220 : 420);
    ln.querySelector('.caret')!.remove();
  }
  const last = document.createElement('span'); last.className = 'ln'; last.innerHTML = '<span class="p">&gt; </span><span class="caret"></span>';
  who.appendChild(last);
})();

/* ---------- scramble on hover ---------- */
const GLYPHS = '!<>-_\\/[]{}=+*^?#%@';
document.querySelectorAll<HTMLElement>('[data-scramble]').forEach((el) => {
  const final = el.dataset.scramble!;
  let raf = 0;
  const run = () => {
    if (reduce) return;
    cancelAnimationFrame(raf);
    const t0 = performance.now();
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / 420);
      const n = Math.floor(p * final.length);
      el.textContent = final.slice(0, n) + Array.from(final.slice(n), (c) => (c === ' ' ? ' ' : GLYPHS[(Math.random() * GLYPHS.length) | 0])).join('');
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
  };
  el.closest('a')!.addEventListener('pointerenter', run);
  el.closest('a')!.addEventListener('focus', run);
});

/* ---------- wave dividers ---------- */
const waves = Array.from(document.querySelectorAll<HTMLElement>('.wave'));
const WCH = ' .-~=≈';
let charW = 7.8;
const measure = () => { const s = document.createElement('span'); s.textContent = 'x'.repeat(100); s.style.cssText = 'position:absolute;visibility:hidden;font:13px var(--mono)'; document.body.appendChild(s); charW = s.getBoundingClientRect().width / 100 || 7.8; s.remove(); };
measure(); document.fonts?.ready.then(measure);
function drawWaves(t: number) {
  waves.forEach((w, wi) => {
    const n = Math.floor(w.clientWidth / charW);
    let a = '', b = '';
    for (let x = 0; x < n; x++) {
      const v = Math.sin(x * 0.18 + t / 700 + wi) * 0.5 + Math.sin(x * 0.05 - t / 1300) * 0.5;
      const k = Math.round((v * 0.5 + 0.5) * (WCH.length - 1));
      a += WCH[k]; b += WCH[WCH.length - 1 - k];
    }
    w.textContent = a + '\n' + b;
  });
}
drawWaves(0);
if (!reduce) { let last = 0; const loop = (t: number) => { requestAnimationFrame(loop); if (t - last > 60) { last = t; drawWaves(t); } }; requestAnimationFrame(loop); }

/* ---------- spinning donut (torus projected to characters) ---------- */
const donut = document.getElementById('donut')!;
const DW = 64, DH = 26, L = '.,-~:;=!*#$@';
let A = 1, B = 1;
function drawDonut() {
  const out = new Array(DW * DH).fill(' ');
  const z = new Float32Array(DW * DH);
  const cA = Math.cos(A), sA = Math.sin(A), cB = Math.cos(B), sB = Math.sin(B);
  for (let th = 0; th < 6.283; th += 0.07) {
    const ct = Math.cos(th), st = Math.sin(th);
    for (let ph = 0; ph < 6.283; ph += 0.02) {
      const cp = Math.cos(ph), sp = Math.sin(ph);
      const h = ct + 2;
      const D = 1 / (sp * h * sA + st * cA + 5);
      const tt = sp * h * cA - st * sA;
      const x = Math.floor(DW / 2 + 30 * D * (cp * h * cB - tt * sB));
      const y = Math.floor(DH / 2 + 15 * D * (cp * h * sB + tt * cB));
      const o = x + DW * y;
      const N = Math.floor(8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB));
      if (y >= 0 && y < DH && x >= 0 && x < DW && D > z[o]) { z[o] = D; out[o] = L[Math.max(0, N)]; }
    }
  }
  let s = '';
  for (let y = 0; y < DH; y++) s += out.slice(y * DW, y * DW + DW).join('') + '\n';
  donut.textContent = s;
}
drawDonut();
let donutVisible = false;
new IntersectionObserver(([en]) => { donutVisible = en.isIntersecting; }).observe(donut);
if (!reduce) { let last = 0; const loop = (t: number) => { requestAnimationFrame(loop); if (!donutVisible || t - last < 40) return; last = t; A += 0.05; B += 0.025; drawDonut(); }; requestAnimationFrame(loop); }
