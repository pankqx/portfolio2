// Single source of truth for both sites.
// demo: live URL if the project is hosted; otherwise the GitHub repo opens.
export type Project = {
  id: string; name: string; what: string; bug: string; tags: string;
  repo: string; demo?: string;
};

export const PERSON = {
  full: 'K S PANKAJ',
  short: 'Pank',
  role: 'Software developer · MCA student',
  place: 'Mangaluru, India',
  email: 'pankqx@gmail.com',
  github: 'https://github.com/pankqx',
  linkedin: 'https://www.linkedin.com/in/pankqx',
  resume: 'resume.pdf',
};

export const PROJECTS: Project[] = [
  { id: 'prontopy', name: 'ProntoPy', what: 'Learn DSA in Python from zero to FAANG, with streaks and an offline Python playground.', bug: 'Known issue: streak guilt is a feature, not a bug.', tags: 'React / Vite / Python', repo: 'https://github.com/pankqx' },
  { id: 'eventzee', name: 'EventZee', what: 'Role-based Android event platform: Kotlin, MVVM, Firestore sync, UPI confirmation and QR e-tickets.', bug: 'Known issue: attendees may actually show up.', tags: 'Android / Kotlin / Firebase', repo: 'https://github.com/pankqx/EventZee' },
  { id: 'paroh', name: 'Paroh', what: 'HumanTwin AI from GATEWAYS 2026. A voice-first digital twin that learns only what you approve.', bug: 'Known issue: twin is already more organized than I am.', tags: 'Next.js / AI / Voice', repo: 'https://github.com/pankqx/paroh-twin' },
  { id: 'peece', name: 'PEECE', what: 'Multiplayer card-duel web game with realtime chat.', bug: 'Known issue: friendships may not survive a rematch.', tags: 'Realtime / Web game', repo: 'https://github.com/pankqx/peece' },
  { id: 'tradingbot', name: 'tradingb0t', what: 'Indian-market stock research and signal platform.', bug: 'Known issue: a bot now makes the bad decisions instead of me.', tags: 'Research / Signals', repo: 'https://github.com/pankqx/tradingbot' },
  { id: 'zextractor', name: 'zextractor', what: 'Python CLI that turns Google Maps searches into lead lists, with optional AI-written outreach.', bug: 'Known issue: sales team now expects this every week.', tags: 'Python / Automation', repo: 'https://github.com/pankqx/zextractor' },
  { id: 'brownie', name: 'The Brownie Press', what: 'Storefront for a home-based brownie business in Mangalore. Minimum order: 20 pieces.', bug: 'Known issue: testing required eating the product.', tags: 'Web / Small business', repo: 'https://github.com/pankqx/thebrowniepress', demo: 'https://pankqx.github.io/thebrowniepress/' },
  { id: 'meera', name: 'Meera', what: 'An animated AI companion website with live chat.', bug: 'Known issue: she replies faster than my real contacts.', tags: 'Web / OpenRouter', repo: 'https://github.com/pankqx/aigf', demo: 'https://pankqx.github.io/aigf/' },
  { id: 'inklight', name: 'InkLight', what: 'A calm desktop journaling app. Markdown files, Electron, zero clutter.', bug: 'Known issue: helps me reflect, still cannot make me sleep.', tags: 'Electron / React / TS', repo: 'https://github.com/pankqx' },
];

export const EXPERIENCE = [
  { when: 'Jun 2026', role: 'Software Developer Intern', org: 'Prasanna Technologies Pvt. Ltd.', note: 'Config-driven forms and UI for enterprise software. Debugged backends via logs, network traces and PostgreSQL.' },
  { when: 'May 2026', role: 'Freelance Software Developer', org: 'House of Anaika', note: 'Restructured a Shopify catalogue, built a lead-gen tool, centralised ops on Zoho CRM.' },
];

export const link = (p: Project) => p.demo ?? p.repo;
