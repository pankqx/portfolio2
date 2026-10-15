import gsap from 'gsap';
import { animate } from 'motion';

export const heroHtml = `
<div class="cursor" id="cursor" aria-hidden="true"><span id="cursorTxt"></span></div>
<header class="nav">
  <span class="mono">pank.exe</span>
  <nav class="mono">
    <a href="#work" data-cur="look">work</a>
    <a href="#hack" data-cur="zzz">hackathon</a>
    <a href="#contact" data-cur="hire?">contact</a>
  </nav>
</header>
<section class="hero" id="top">
  <p class="eyebrow">Portfolio v2 / now with fewer features and more jokes</p>
  <h1 class="hero-name" id="heroName" aria-label="Pank">
    <span class="ch" data-ch>P</span><span class="ch" data-ch>A</span><span class="ch" data-ch>N</span><span class="ch" data-ch>K</span>
  </h1>
  <p class="hero-sub">MCA student in Mangaluru. I build software tools, hackathon entries and the occasional regret. <em id="rot">Sometimes they even work.</em></p>
  <div class="hero-cta">
    <a class="btn magnet" href="#work" data-cur="go">See what I broke</a>
    <a class="btn ghost magnet" href="#contact" data-cur="hire?">Hire me (please)</a>
  </div>
  <p class="scroll-hint mono">scroll to keep rebooting &darr;</p>
</section>`;

const ROASTS = [
  'Sometimes they even work.',
  'Tested in production. By you.',
  'Runs on tea, deadlines and hope.',
  'Zero bugs, only surprise features.',
  'Slept 4 hours. Shipped 6 repos.',
];

export function initHero() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const chars = gsap.utils.toArray<HTMLElement>('[data-ch]');

  if (!reduce) {
    gsap.from(chars, { yPercent: 120, rotate: 12, opacity: 0, duration: 1, stagger: 0.08, ease: 'power4.out', delay: 0.1 });
    gsap.from('.hero-sub, .hero-cta, .eyebrow, .scroll-hint', { y: 30, opacity: 0, duration: 0.8, stagger: 0.12, delay: 0.5, ease: 'power3.out' });
  }

  // rotating roast line
  const rot = document.getElementById('rot')!;
  let r = 0;
  setInterval(() => {
    r = (r + 1) % ROASTS.length;
    if (reduce) { rot.textContent = ROASTS[r]; return; }
    gsap.to(rot, { opacity: 0, y: -8, duration: 0.2, onComplete: () => {
      rot.textContent = ROASTS[r];
      gsap.fromTo(rot, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.25 });
    } });
  }, 2600);

  if (!window.matchMedia('(pointer: fine)').matches) return;

  // custom cursor + letters that lean toward the pointer
  const cursor = document.getElementById('cursor')!;
  const txt = document.getElementById('cursorTxt')!;
  const cx = gsap.quickTo(cursor, 'x', { duration: 0.25, ease: 'power3' });
  const cy = gsap.quickTo(cursor, 'y', { duration: 0.25, ease: 'power3' });
  window.addEventListener('pointermove', (e) => {
    cx(e.clientX); cy(e.clientY);
    if (reduce) return;
    chars.forEach((c) => {
      const b = c.getBoundingClientRect();
      const dx = e.clientX - (b.left + b.width / 2);
      const dy = e.clientY - (b.top + b.height / 2);
      const d = Math.hypot(dx, dy);
      const f = Math.max(0, 1 - d / 420);
      gsap.to(c, { x: dx * f * 0.12, y: dy * f * 0.12, rotate: dx * f * 0.04, duration: 0.5, overwrite: 'auto' });
    });
  });
  document.addEventListener('pointerover', (e) => {
    const t = (e.target as HTMLElement).closest<HTMLElement>('[data-cur]');
    txt.textContent = t?.dataset.cur ?? '';
    cursor.classList.toggle('big', !!t);
  });

  // magnetic buttons with a spring (Motion)
  document.querySelectorAll<HTMLElement>('.magnet').forEach((el) => {
    el.addEventListener('pointermove', (e) => {
      const b = el.getBoundingClientRect();
      const x = (e.clientX - (b.left + b.width / 2)) * 0.3;
      const y = (e.clientY - (b.top + b.height / 2)) * 0.4;
      animate(el, { x, y }, { type: 'spring', stiffness: 300, damping: 18 });
    });
    el.addEventListener('pointerleave', () => animate(el, { x: 0, y: 0 }, { type: 'spring', stiffness: 300, damping: 12 }));
  });
}
