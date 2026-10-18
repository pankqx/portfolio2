import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const SKILLS = ['Python', 'TypeScript', 'React', 'Next.js', 'Electron', 'Android', 'Node.js', 'PyQt6', 'SQLite', 'Tailwind', 'Git', 'LaTeX', 'OpenRouter', 'Prompting (professionally)'];

export const hackHtml = `
<section class="section hack" id="hack">
  <p class="eyebrow">GATEWAYS 2026 / team http dino</p>
  <h2 class="h2">24 hours. <em>0 sleep.</em></h2>
  <p class="hack-p">A 24-hour online hackathon. We built <strong>Paroh</strong>, a HumanTwin AI that learns only from data you approve. Team of four, one sunrise, one very awake developer. Submitted on time. Presented to judges. Survived.</p>
  <div class="meters">
    <div class="meter"><span class="mono">hours left</span><b id="mHours">24</b></div>
    <div class="meter"><span class="mono">sleep</span><div class="bar"><i id="mSleep"></i></div></div>
    <div class="meter"><span class="mono">caffeine</span><div class="bar"><i id="mCaf" class="hot"></i></div></div>
  </div>
</section>`;

export const skillsHtml = `
<section class="skills" id="skills">
  <p class="eyebrow pad">Weapons of mass debugging</p>
  <div class="marq"><div class="marq-in" id="marq">${[...SKILLS, ...SKILLS].map((s) => `<span>${s}</span>`).join('')}</div></div>
</section>`;

export const contactHtml = `
<section class="section contact" id="contact">
  <p class="eyebrow">Contact</p>
  <h2 class="h2">Hire me before my <em>free credits</em> run out.</h2>
  <p class="hack-p">Internships, projects, hackathon teams, or just a bug report about this site. All welcome.</p>
  <div class="hero-cta">
    <a class="btn magnet" id="mail" href="mailto:pankqx@gmail.com" data-cur="email">pankqx@gmail.com</a>
    <a class="btn ghost magnet" href="https://github.com/pankqx" target="_blank" rel="noopener" data-cur="code">GitHub</a>
    <a class="btn ghost magnet" id="linkedin" href="https://www.linkedin.com/in/pankqx" target="_blank" rel="noopener" data-cur="connect">LinkedIn</a>
    <a class="btn ghost magnet" id="resume" href="resume.pdf" target="_blank" rel="noopener" data-cur="cv">Resume</a>
  </div>
  <div class="crash-row"><button class="crash mono" id="crash" data-cur="don't">do not press this</button><a class="crash mono" href="ascii/" data-cur="ignore">or ignore everything &rarr; ascii mode</a></div>
  <footer class="foot mono">&copy; ${new Date().getFullYear()} K S Pankaj. No bugs were harmed. Several were created.</footer>
</section>`;

export function initFinale() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // resume link: if the PDF is not there yet, say so honestly instead of a 404
  fetch('resume.pdf', { method: 'HEAD' }).then((r) => {
    if (!r.ok || (r.headers.get('content-type') || '').includes('html')) throw new Error('missing');
  }).catch(() => {
    const el = document.getElementById('resume') as HTMLAnchorElement;
    el.textContent = 'Resume: being rewritten';
    el.href = 'mailto:pankqx@gmail.com?subject=Resume%20please';
    el.removeAttribute('target');
  });

  // crash button: glitch the page, then it recovers
  document.getElementById('crash')!.addEventListener('click', () => {
    if (reduce) { document.title = 'Pank — recovered'; return; }
    const b = document.body;
    gsap.timeline()
      .to(b, { x: () => gsap.utils.random(-14, 14), skewX: () => gsap.utils.random(-6, 6), filter: 'invert(1) hue-rotate(90deg)', duration: 0.06, repeat: 9, yoyo: true })
      .to(b, { x: 0, skewX: 0, filter: 'none', duration: 0.2 });
  });

  if (reduce) return;

  // hackathon meters drain / fill with scroll
  const hours = document.getElementById('mHours')!;
  const st = { trigger: '#hack', start: 'top 60%', end: 'bottom 40%', scrub: 0.5 };
  gsap.to('#mSleep', { width: '3%', ease: 'none', scrollTrigger: st });
  gsap.fromTo('#mCaf', { width: '10%' }, { width: '100%', ease: 'none', scrollTrigger: st });
  const o = { h: 24 };
  gsap.to(o, { h: 0, ease: 'none', onUpdate: () => { hours.textContent = String(Math.round(o.h)); }, scrollTrigger: st });
  gsap.from('.hack .h2, .hack-p, .contact .h2', { y: 60, opacity: 0, duration: 0.9, stagger: 0.1, scrollTrigger: { trigger: '.hack', start: 'top 80%' } });
  gsap.from('.contact .h2, .contact .hero-cta .btn', { y: 50, opacity: 0, duration: 0.8, stagger: 0.08, scrollTrigger: { trigger: '.contact', start: 'top 75%' } });

  // skills marquee, speed reacts to scroll velocity
  const m = gsap.to('#marq', { xPercent: -50, ease: 'none', duration: 30, repeat: -1 });
  ScrollTrigger.create({ onUpdate: (self) => { gsap.to(m, { timeScale: 1 + Math.abs(self.getVelocity()) / 300, duration: 0.2, overwrite: true }); gsap.to(m, { timeScale: 1, duration: 1, delay: 0.2 }); } });
}
