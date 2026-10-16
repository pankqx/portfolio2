import gsap from 'gsap';

// Crash dialog shown over the (blurred) live site. No black screen.
export const bootHtml = `
<div class="boot" id="boot" role="dialog" aria-modal="true" aria-label="pank.exe has stopped responding">
  <div class="boot-dialog" id="bootDialog">
    <div class="boot-title"><span>pank.exe</span><span aria-hidden="true">x</span></div>
    <div class="boot-body">
      <div class="boot-icon" aria-hidden="true">!</div>
      <div>
        <p><strong>pank.exe has stopped responding.</strong></p>
        <p class="mono small">Cause: too many side projects. Windows is looking for a solution. Windows will not find one.</p>
        <div class="boot-progress" aria-hidden="true"><i id="bootBar"></i></div>
      </div>
    </div>
    <div class="boot-actions">
      <button id="bootReboot">Reboot</button>
      <button id="bootIgnore">Ignore</button>
    </div>
  </div>
</div>`;

export function runBoot(onReboot: () => void, onIgnore: () => void) {
  const boot = document.getElementById('boot')!;
  const dialog = document.getElementById('bootDialog')!;
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.documentElement.classList.add('booting');

  let done = false;
  const close = (then: () => void, toPaper = false) => {
    if (done) return;
    done = true;
    const end = () => { boot.remove(); document.documentElement.classList.remove('booting'); then(); };
    if (reduce) { end(); return; }
    const tl = gsap.timeline({ onComplete: end });
    tl.to(dialog, { x: () => gsap.utils.random(-24, 24), skewX: () => gsap.utils.random(-10, 10), duration: 0.05, repeat: 7, yoyo: true })
      .to(dialog, { scaleY: 0.02, duration: 0.18, ease: 'power4.in' })
      .to(dialog, { scaleX: 0, duration: 0.14, ease: 'power4.in' });
    if (toPaper) tl.to(boot, { backgroundColor: '#efece4', backdropFilter: 'blur(0px)', duration: 0.25 }, '-=0.1');
    else tl.to(boot, { opacity: 0, duration: 0.25 }, '-=0.1');
  };

  document.getElementById('bootReboot')!.addEventListener('click', () => close(onReboot));
  document.getElementById('bootIgnore')!.addEventListener('click', () => close(onIgnore, true));

  if (reduce) { (document.getElementById('bootReboot') as HTMLButtonElement).focus(); return; }

  gsap.timeline()
    .from(dialog, { scale: 0.6, opacity: 0, duration: 0.5, ease: 'back.out(2.2)', delay: 0.25 })
    .fromTo('#bootBar', { width: '0%' }, { width: '92%', duration: 2.2, ease: 'power2.out' })
    .to('#bootBar', { backgroundColor: '#ff4d1f', duration: 0.2 })
    .to(dialog, { x: 6, duration: 0.05, repeat: 5, yoyo: true });
  (document.getElementById('bootReboot') as HTMLButtonElement).focus({ preventScroll: true });
}
