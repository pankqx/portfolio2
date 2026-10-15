import './style.css';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { bootHtml, runBoot } from './boot';
import { heroHtml, initHero, playHeroIntro } from './hero';
import { originHtml, projectsHtml, initStory } from './story';
import { hackHtml, skillsHtml, contactHtml, initFinale } from './finale';

const app = document.getElementById('app')!;
app.innerHTML = bootHtml + heroHtml + originHtml + projectsHtml + hackHtml + skillsHtml + contactHtml;

initHero();
initStory();
initFinale();

runBoot(() => { ScrollTrigger.refresh(); playHeroIntro(); });
