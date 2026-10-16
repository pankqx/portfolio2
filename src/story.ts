import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PROJECTS, link } from './data';

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  ['2022', 'B.Sc. Computer Science & Maths.', 'Government First Grade College. Learned to code. Immediately broke something. Fixed it. Broke two more.'],
  ['2025', 'Joined an MCA program.', 'St Aloysius, Mangaluru. Professionally confused, academically enrolled.'],
  ['May 2026', 'Went freelance.', 'House of Anaika: Shopify, a lead-gen bot, Zoho CRM. First client, first invoice, first existential crisis.'],
  ['Jun 2026', 'Interned at Prasanna Technologies.', 'Enterprise forms, backend debugging, PostgreSQL. Learned that "it works on my machine" is not a deployment strategy.'],
  ['Now', 'Built this site.', 'Which is why you were greeted by a crash. You are welcome.'],
];

export const originHtml = `
<section class="section origin" id="origin">
  <p class="eyebrow">Origin story / patch notes</p>
  <h2 class="h2">How the bug <em>got into production</em></h2>
  <div class="tl" id="tl">
    <svg class="tl-svg" viewBox="0 0 20 1000" preserveAspectRatio="none" aria-hidden="true">
      <path id="tlPath" d="M10 0 C 18 120, 2 220, 10 340 S 18 560, 10 680 S 2 880, 10 1000" fill="none" stroke="#b6ff3c" stroke-width="3" vector-effect="non-scaling-stroke"/>
    </svg>
    ${STAGES.map(([n, t, d], i) => `
    <article class="stage ${i % 2 ? 'r' : 'l'}">
      <span class="mono stage-n">${n}</span>
      <h3>${t}</h3>
      <p>${d}</p>
    </article>`).join('')}
  </div>
</section>`;

export const projectsHtml = `
<section class="work" id="work">
  <div class="work-pin" id="workPin">
    <div class="work-head">
      <p class="eyebrow">Selected work / ${PROJECTS.length} repos</p>
      <h2 class="h2">Things I broke <em>on purpose</em></h2>
      <div class="work-progress" aria-hidden="true"><i id="workBar"></i></div>
    </div>
    <div class="track" id="track">
      ${PROJECTS.map((p, i) => `
      <a class="card" href="${link(p)}" target="_blank" rel="noopener" data-cur="${p.demo ? 'demo' : 'code'}">
        <span class="card-n mono">${String(i + 1).padStart(2, '0')} ${p.demo ? '· live' : ''}</span>
        <h3>${p.name}</h3>
        <p class="card-what">${p.what}</p>
        <p class="card-bug mono">${p.bug}</p>
        <span class="card-tags mono">${p.tags}</span>
      </a>`).join('')}
    </div>
  </div>
</section>`;

export function initStory() {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const path = document.getElementById('tlPath') as unknown as SVGPathElement;

  if (!reduce) {
    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    gsap.to(path, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '#tl', start: 'top 70%', end: 'bottom 60%', scrub: 0.6 } });
    gsap.utils.toArray<HTMLElement>('.stage').forEach((s) => {
      gsap.from(s, { opacity: 0, x: s.classList.contains('l') ? -60 : 60, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: s, start: 'top 85%', once: true } });
    });
  }

  // Horizontal pinned showcase on wide screens. Vertical stack on narrow/touch.
  const mm = gsap.matchMedia();
  mm.add('(min-width: 900px) and (pointer: fine)', () => {
    const track = document.getElementById('track')!;
    const dist = () => Math.max(0, track.scrollWidth - track.clientWidth);
    gsap.to(track, {
      x: () => -dist(),
      ease: 'none',
      scrollTrigger: {
        trigger: '#workPin',
        start: 'top top',
        end: () => `+=${dist()}`,
        pin: true,
        scrub: 1,
        anticipatePin: 1,
        invalidateOnRefresh: true,
        onUpdate: (self) => gsap.set('#workBar', { scaleX: self.progress }),
      },
    });
  });
}
