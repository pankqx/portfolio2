# Portfolio2: "Pank.exe Has Stopped Responding"

A one-page, no-inner-pages portfolio told as a dark-comedy story. Playful, experimental, scroll-driven.

## Concept
You land on a fake "system crash" and the site slowly reboots into a portfolio. Each scroll chapter is a stage of the developer's life, narrated with dry, dark humor (anxiety, bugs at 3 AM, "built with AI assistance, and honest about it", trading losses, hackathon sleep deprivation). Humor stays on Pank himself, never on other people.

## Rules from Pank
- No photos of Pank anywhere (earlier decision for pank-os). Characters are illustrated/typographic.
- Simple: one page, no sub-pages, no "inside" app part.
- Motion graphics are the star; content is: GitHub projects, hackathon + skills, contact + resume link.

## Story chapters (scroll order)
0. BOOT: fake BIOS/crash screen, glitch, "Reboot?" button. Loader doubles as joke.
1. HELLO: giant kinetic name, cursor-follow type, one-line pitch.
2. ORIGIN BUG: MCA student, Mangaluru. Tiny comic timeline (SVG line art draws on scroll).
3. PROJECTS ("Things I Broke On Purpose"): horizontal pinned scroll. InkLight, ProntoPy, EventZee, PEECE, tradingb0t, The Brownie Press, Meera, Paroh. Each card has a joke "known issues" footer + real GitHub link.
4. HACKATHON ("24 Hours, 0 Sleep"): GATEWAYS 2026, HumanTwin / Paroh, counter + sleep meter that drains.
5. SKILLS ("Weapons of Mass Debugging"): marquee + magnetic chips.
6. CONTACT ("Hire Me Before My Free Credits Run Out"): email, GitHub, LinkedIn, resume PDF button, confetti glitch outro.

## Repos we actually use (from the screenshots)
- GSAP + ScrollTrigger: scroll timelines, pinned horizontal track, text splitting.
- Motion (motion.dev): springs, hover/magnetic interactions, layout animations.
- Hyperframes (HTML to MP4): render a short intro/boot loop video from our own HTML+GSAP scenes.
- Remotion: considered, skipped (React video pipeline is overkill for a static page).
- motion-design-skill / animate / claude-motion-design: used as reference for timing and easing rules only.
- Pentagi: turned out to be an autonomous AI pentesting agent, not a motion tool. Not used, except as an inspiration for a terminal-style boot sequence.

## Stack
Vite + vanilla TypeScript, GSAP (+ScrollTrigger), Motion, plain CSS. No framework, fast load, deploys to GitHub Pages.

## Build blocks (one commit each, pushed as pankqx)
1. Scaffold (Vite, TS, GitHub Pages workflow, base styles, fonts)
2. Boot/crash intro + loader
3. Hero kinetic type + cursor effects
4. Origin timeline (SVG draw)
5. Projects horizontal showcase
6. Hackathon + skills sections
7. Contact + outro + resume link
8. Polish: reduced-motion fallback, mobile, performance, favicon, OG tags
9. Deploy to GitHub Pages and verify

## Needs from Pank later (placeholders until then)
LinkedIn URL, resume PDF, final email to show, any extra jokes he wants in or out.
