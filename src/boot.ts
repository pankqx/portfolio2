import gsap from 'gsap';

const LINES = [
  'PANK-BIOS v2.6.10  (c) nobody',
  'checking brain........ 62% caffeine, 38% anxiety',
  'loading skills.dll.... ok',
  'loading sleep.dll..... FILE NOT FOUND',
  'mounting /dev/ambition  ok',
  'compiling excuses..... done (0 errors, 214 warnings)',
  'asking AI to write the code... it agreed',
  'FATAL: honesty module enabled, cannot hide that',
];

export const bootHtml = `
<div class="boot" id="boot" role="dialog" aria-label="Fake system crash intro">
  <pre class="boot-log mono" id="bootLog"></pre>
  <div class="boot-dialog" id="bootDialog" hidden>
    <div class="boot-title"><span>pank.exe</span><span>x</span></div>
    <div class="boot-body">
      <div class="boot-icon">!</div>
      <div>
        <p><strong>pank.exe has stopped responding.</strong></p>
        <p class="mono small">Cause: too many side projects. Windows is looking for a solution. Windows will not find one.</p>
      </div>
    </div>
    <div class="boot-actions">
      <button id="bootReboot">Reboot</button>
      <button id="bootIgnore">Ignore (recommended)</button>
    </div>
  </div>
</div>`;

export function runBoot(onDone: () => void) {
  const boot = document.getElementById('boot')!;
  const log = document.getElementById('bootLog')!;
  const dialog = document.getElementById('bootDialog')!;
  document.documentElement.style.overflow = 'hidden';

  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let finished = false;

  const finish = () => {
    if (finished) return;
    finished = true;
    const tl = gsap.timeline({
      onComplete: () => {
        boot.remove();
        document.documentElement.style.overflow = '';
        onDone();
      },
    });
    if (reduce) { tl.to(boot, { opacity: 0, duration: 0.2 }); return; }
    tl.to(boot, { x: () => gsap.utils.random(-30, 30), skewX: 8, duration: 0.05, repeat: 7, yoyo: true })
      .to(boot, { clipPath: 'inset(50% 0 50% 0)', duration: 0.35, ease: 'power4.in' })
      .to(boot, { opacity: 0, duration: 0.15 });
  };

  const showDialog = () => {
    dialog.hidden = false;
    if (!reduce) gsap.from(dialog, { scale: 0.85, opacity: 0, duration: 0.35, ease: 'back.out(2)' });
    (document.getElementById('bootReboot') as HTMLButtonElement).focus();
  };

  document.getElementById('bootReboot')!.addEventListener('click', finish);
  document.getElementById('bootIgnore')!.addEventListener('click', finish);
  window.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !dialog.hidden) finish(); });

  if (reduce) { log.textContent = LINES.join('\n'); showDialog(); return; }

  let i = 0;
  const next = () => {
    if (i >= LINES.length) { setTimeout(showDialog, 350); return; }
    log.textContent += LINES[i++] + '\n';
    setTimeout(next, 260 + Math.random() * 260);
  };
  next();
}
