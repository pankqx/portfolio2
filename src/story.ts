import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STAGES = [
  ['Stage 01', 'Learned to code.', 'Immediately broke something. Fixed it. Broke two more things.'],
  ['Stage 02', 'Joined an MCA program.', 'AIMIT, St Aloysius, Mangaluru. Professionally confused, academically enrolled.'],
  ['Stage 03', 'Started shipping.', 'Journals, games, bots, apps. If it had a repo, I made it one.'],
  ['Stage 04', 'Entered hackathons.', 'Sleep: optional. Deadlines: not. Coffee: it is a food group.'],
  ['Stage 05', 'Built this site.', 'Which is why you were greeted by a crash. You are welcome.'],
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

type Project = { n: string; name: string; what: string; bug: string; tags: string; href: string };
const PROJECTS: Project[] = [
  { n: '01', name: 'InkLight', what: 'A calm desktop journaling app. Markdown files, Electron, zero clutter.', bug: 'Known issue: helps me reflect, still cannot make me sleep.', tags: 'Electron / React / TypeScript', href: 'https://github.com/pankqx' },
  { n: '02', name: 'ProntoPy', what: 'Learn DSA in Python with streaks and a zero-to-FAANG roadmap.', bug: 'Known issue: streak guilt is a feature, not a bug.', tags: 'Web app / Python / DSA', href: 'https://github.com/pankqx' },
  { n: '03', name: 'EventZee', what: 'Android event management app. 2.0 overhaul in progress.', bug: 'Known issue: attendees may actually show up.', tags: 'Android / Events', href: 'https://github.com/pankqx/EventZee' },
  { n: '04', name: 'PEECE', what: 'Multiplayer card-duel web game with realtime chat.', bug: 'Known issue: friendships may not survive a rematch.', tags: 'Realtime / Web game', href: 'https://github.com/pankqx/peece' },
  { n: '05', name: 'tradingb0t', what: 'Indian-market stock research and signal platform.', bug: 'Known issue: a bot now makes the bad decisions instead of me.', tags: 'Research / Signals / MCA', href: 'https://github.com/pankqx/tradingbot' },
  { n: '06', name: 'Paroh', what: 'HumanTwin AI, my GATEWAYS 2026 hackathon build. A twin that learns only what you allow.', bug: 'Known issue: twin is already more organized than I am.', tags: 'Next.js / AI / Voice', href: 'https://github.com/pankqx/paroh-twin' },
  { n: '07', name: 'Meera', what: 'An animated AI companion website with live chat.', bug: 'Known issue: she replies faster than my real contacts.', tags: 'Web / OpenRouter', href: 'https://github.com/pankqx/aigf' },
];

export const projectsHtml = `
<section class="work" id="work">
  <div class="work-pin" id="workPin">
    <div class="work-head">
      <p class="eyebrow">Selected work</p>
      <h2 class="h2">Things I broke <em>on purpose</em></h2>
      <p class="mono hint">drag the scroll &rarr;</p>
    </div>
    <div class="track" id="track">
      ${PROJECTS.map((p) => `
      <a class="card" href="${p.href}" target="_blank" rel="noopener" data-cur="open">
        <span class="card-n mono">${p.n}</span>
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
  const len = path.getTotalLength();

  if (reduce) return;

  gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
  gsap.to(path, { strokeDashoffset: 0, ease: 'none', scrollTrigger: { trigger: '#tl', start: 'top 70%', end: 'bottom 60%', scrub: 0.6 } });
  gsap.utils.toArray<HTMLElement>('.stage').forEach((s) => {
    gsap.from(s, { opacity: 0, x: s.classList.contains('l') ? -60 : 60, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: s, start: 'top 82%' } });
  });
  gsap.from('.origin .h2', { y: 60, opacity: 0, duration: 0.9, scrollTrigger: { trigger: '.origin .h2', start: 'top 85%' } });

  // horizontal pinned showcase, only on wider screens
  ScrollTrigger.matchMedia({
    '(min-width: 820px)': () => {
      const track = document.getElementById('track')!;
      const dist = () => track.scrollWidth - window.innerWidth + window.innerWidth * 0.12;
      const slide = gsap.to(track, {
        x: () => -dist(),
        ease: 'none',
        scrollTrigger: { trigger: '#workPin', start: 'top top', end: () => `+=${dist()}`, pin: true, scrub: 0.8, invalidateOnRefresh: true },
      });
      gsap.utils.toArray<HTMLElement>('.card').forEach((c, i) => {
        gsap.from(c, { rotate: i % 2 ? 4 : -4, y: 40, opacity: 0.2, duration: 1, scrollTrigger: { trigger: c, containerAnimation: slide, start: 'left 95%', toggleActions: 'play none none reverse' } });
      });
    },
  });
}
