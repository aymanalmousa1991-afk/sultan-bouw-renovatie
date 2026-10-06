import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

gsap.registerPlugin(ScrollTrigger);

const root = document.documentElement;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Splits koppen in woorden zodat ze één voor één omhoog kunnen schuiven. */
function splitWords(el: HTMLElement) {
  const walk = (node: Node) => {
    Array.from(node.childNodes).forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const parts = (child.textContent ?? '').split(/(\s+)/);
        const frag = document.createDocumentFragment();
        parts.forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.append(document.createTextNode(part));
          } else {
            const outer = document.createElement('span');
            outer.className = 'word';
            const inner = document.createElement('span');
            inner.textContent = part;
            outer.append(inner);
            frag.append(outer);
          }
        });
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE && (child as HTMLElement).tagName !== 'BR') {
        walk(child);
      }
    });
  };
  el.setAttribute('aria-label', el.textContent?.replace(/\s+/g, ' ').trim() ?? '');
  walk(el);
  el.querySelectorAll('.word').forEach((w) => w.setAttribute('aria-hidden', 'true'));
}

document.querySelectorAll<HTMLElement>('[data-split]').forEach(splitWords);

if (reduceMotion) {
  // Geen beweging: alles direct tonen, tellers op eindwaarde
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    el.textContent = el.dataset.count ?? el.textContent;
  });
  root.classList.add('motion-ready');
} else {
  initMotion();
}

function initMotion() {
  // ─── Smooth scroll ───
  const lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
  lenis.on('scroll', ScrollTrigger.update);
  gsap.ticker.add((time) => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
  window.addEventListener('scroll-lock', () => lenis.stop());
  window.addEventListener('scroll-unlock', () => lenis.start());

  // Ankerlinks via Lenis (rekening houdend met de vaste navigatie)
  document.querySelectorAll<HTMLAnchorElement>('a[href*="#"]').forEach((a) => {
    a.addEventListener('click', (e) => {
      const url = new URL(a.href);
      if (url.pathname !== location.pathname || !url.hash) return;
      const target = document.querySelector(url.hash);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -80 });
      history.pushState(null, '', url.hash);
    });
  });

  // ─── Koppen: woord voor woord ───
  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    const words = el.querySelectorAll('.word > span');
    const immediate = el.dataset.split === 'load';
    gsap.to(words, {
      yPercent: 0,
      y: 0,
      duration: 1.1,
      ease: 'expo.out',
      stagger: 0.06,
      delay: immediate ? 0.15 : 0,
      scrollTrigger: immediate ? undefined : { trigger: el, start: 'top 88%', once: true },
    });
  });

  // ─── Fade-up reveals, in groepjes ───
  ScrollTrigger.batch('[data-reveal]', {
    start: 'top 90%',
    once: true,
    onEnter: (els) =>
      gsap.to(els, { opacity: 1, y: 0, duration: 1, ease: 'expo.out', stagger: 0.07, overwrite: true }),
  });

  // ─── Foto's: onthullen van onder naar boven, met subtiele zoom ───
  document.querySelectorAll<HTMLElement>('[data-clip-reveal]').forEach((el) => {
    const img = el.querySelector('img');
    const delay = Number(el.dataset.delay) || 0;
    const st = { trigger: el, start: 'top 92%', once: true };
    gsap.to(el, { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.4, ease: 'expo.inOut', delay, scrollTrigger: st });
    if (img) gsap.fromTo(img, { scale: 1.25 }, { scale: 1, duration: 1.8, ease: 'expo.out', delay, scrollTrigger: st });
  });

  // ─── Tellers ───
  document.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
    const end = Number(el.dataset.count);
    const obj = { v: 0 };
    el.textContent = '0';
    gsap.to(obj, {
      v: end,
      duration: 2.2,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => { el.textContent = Math.round(obj.v).toLocaleString('nl-NL'); },
    });
  });

  // ─── Blueprint: lijnen tekenen zichzelf ───
  document.querySelectorAll<SVGSVGElement>('[data-blueprint]').forEach((svg) => {
    const lines = svg.querySelectorAll<SVGGeometryElement>('.draw');
    lines.forEach((p) => {
      const len = p.getTotalLength();
      p.style.strokeDasharray = `${len}`;
      p.style.strokeDashoffset = `${len}`;
    });
    const tl = gsap.timeline({ delay: 0.4 });
    tl.to(lines, { strokeDashoffset: 0, duration: 1.6, ease: 'power2.inOut', stagger: 0.08 })
      .from(svg.querySelectorAll('.fill-in'), { opacity: 0, duration: 0.9, ease: 'power2.out', stagger: 0.12 }, '-=0.6')
      .from(svg.querySelectorAll('.label'), { opacity: 0, y: 6, duration: 0.6, ease: 'expo.out', stagger: 0.06 }, '-=0.5');
  });

  // ─── Parallax ───
  document.querySelectorAll<HTMLElement>('[data-parallax]').forEach((el) => {
    const amount = Number(el.dataset.parallax) || 12;
    gsap.fromTo(el, { yPercent: -amount / 2 }, {
      yPercent: amount / 2,
      ease: 'none',
      scrollTrigger: { trigger: el.parentElement ?? el, start: 'top bottom', end: 'bottom top', scrub: true },
    });
  });

  // ─── Werkwijze: horizontaal scrollen op desktop ───
  const mm = gsap.matchMedia();
  mm.add('(min-width: 1024px)', () => {
    const section = document.querySelector<HTMLElement>('[data-hscroll]');
    const track = section?.querySelector<HTMLElement>('[data-hscroll-track]');
    if (!section || !track) return;
    const distance = () => track.scrollWidth - window.innerWidth;
    const progress = section.querySelector<HTMLElement>('[data-hscroll-progress]');
    gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${distance()}`,
        pin: true,
        scrub: 0.8,
        invalidateOnRefresh: true,
        onUpdate: (self) => { if (progress) progress.style.transform = `scaleX(${self.progress})`; },
      },
    });
  });

  // ─── Footer-woordmerk schuift omhoog ───
  const mark = document.querySelector('[data-footer-mark]');
  if (mark) {
    gsap.from(mark, { yPercent: 40, ease: 'none', scrollTrigger: { trigger: mark, start: 'top bottom', end: 'bottom bottom', scrub: true } });
  }

  // ─── Magnetische knoppen (alleen met muis) ───
  if (window.matchMedia('(pointer: fine)').matches) {
    document.querySelectorAll<HTMLElement>('[data-magnetic]').forEach((el) => {
      const xTo = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'expo.out' });
      const yTo = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'expo.out' });
      el.addEventListener('pointermove', (e) => {
        const r = el.getBoundingClientRect();
        xTo((e.clientX - r.left - r.width / 2) * 0.25);
        yTo((e.clientY - r.top - r.height / 2) * 0.35);
      });
      el.addEventListener('pointerleave', () => { xTo(0); yTo(0); });
    });
  }

  root.classList.add('motion-ready');
  window.addEventListener('load', () => ScrollTrigger.refresh());
}
