import './style.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { bootHtml, runBoot } from './boot';
import { heroHtml, initHero, playHeroIntro } from './hero';
import { originHtml, projectsHtml, initStory } from './story';
import { hackHtml, skillsHtml, contactHtml, initFinale } from './finale';

gsap.registerPlugin(ScrollTrigger);

const skipBoot = new URLSearchParams(location.search).get('boot') === '0';
const app = document.getElementById('app')!;
app.innerHTML = (skipBoot ? '' : bootHtml) + heroHtml + originHtml + projectsHtml + hackHtml + skillsHtml + contactHtml;

// Smooth scroll that drives ScrollTrigger from one clock (fixes jumpy pinned section).
const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
let lenis: Lenis | null = null;
if (!reduce) {
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((t) => lenis!.raf(t * 1000));
  gsap.ticker.lagSmoothing(0);
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach((a) =>
    a.addEventListener('click', (e) => { e.preventDefault(); lenis!.scrollTo(a.getAttribute('href')!, { offset: 0 }); }));
}

initHero();
initStory();
initFinale();

// Real fonts change text widths; re-measure pinned sections once they are in.
document.fonts?.ready.then(() => ScrollTrigger.refresh());
window.addEventListener('load', () => ScrollTrigger.refresh());

const start = () => { lenis?.start(); ScrollTrigger.refresh(); playHeroIntro(); };
if (skipBoot) start();
else {
  lenis?.stop();
  runBoot(start, () => { location.href = 'ascii/'; });
}
