import * as d3 from 'd3';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './css/styles.css';

import { store }              from './js/store.js';
import { loadData, initData } from './js/data.js';
import { onEnter, animCount, mkSelector } from './js/utils.js';
import { mkAccessChart, mkCorrelationChart } from './js/charts.js';
import { mkMap }                             from './js/map.js';
import {
  STEP_PX, getFanStats, getLeagueStats,
  mkCircularBarPlot, mkProgressDots, syncProgressDots, mkScrollSelector
} from './js/scroll.js';

async function boot() {
  store.d3 = d3;
  gsap.registerPlugin(ScrollTrigger);
  const raw = await loadData();
  initData(raw);
  initApp();
}

function initApp() {
  const FAN_STATS    = getFanStats();
  const LEAGUE_STATS = getLeagueStats();

  // ── Barre de progression ──────────────────────────────────────────────────
  const prog = document.getElementById('prog');
  window.addEventListener('scroll', () => {
    const s = window.scrollY, t = document.body.scrollHeight - window.innerHeight;
    prog.style.width = `${t > 0 ? (s / t) * 100 : 0}%`;
  });

  // ── Nav ───────────────────────────────────────────────────────────────────
  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 46));

  // ── Reveal ────────────────────────────────────────────────────────────────
  const revealObs = new IntersectionObserver(e => {
    e.forEach(x => { if (x.isIntersecting) x.target.classList.add('in'); });
  }, { threshold: .05 });
  document.querySelectorAll('.chart-block,.section-head,.fan-card,.swiss-card').forEach(el => {
    el.classList.add('rev'); revealObs.observe(el);
  });

  // ── Hero stats ────────────────────────────────────────────────────────────
  onEnter(document.querySelector('.hero-stats-strip'), () => {
    document.querySelectorAll('.hero-stat-value[data-count]').forEach(el => {
      animCount(el, parseInt(el.dataset.count), el.dataset.suffix || '', el.dataset.prefix || '');
    });
  }, 0.45);

  initTimelineCarousel();
  initConclusion();

  /* ──────────────────────────────────────────────────────────────────────────
     ÉTAT PARTAGÉ DES CHAMPIONNATS ACTIFS
     Mode normal  : un seul actif (Set de taille 1)
     Mode suisse  : tous actifs (Set de taille 6)
  ──────────────────────────────────────────────────────────────────────────── */
  const ALL_LEAGUES_NORMAL = ['Premier League', 'La Liga', 'Bundesliga', 'Serie A', 'Ligue 1'];
  const ALL_LEAGUES_SWISS  = ['Premier League', 'La Liga', 'Bundesliga', 'Serie A', 'Ligue 1', 'Swiss SL'];

  // Sets indépendants pour fan et league (peuvent diverger si l'user filtre)
  const fanActive    = new Set(['Premier League']);
  const leagueActive = new Set(['Premier League']);

  /* ──────────────────────────────────────────────────────────────────────────
     SECTION FAN
  ──────────────────────────────────────────────────────────────────────────── */
  let fanStatIdx = 0;

  function updateFanChart() {
    const stat = FAN_STATS[fanStatIdx];
    const tEl  = document.getElementById('fan-chart-title');
    const dEl  = document.getElementById('fan-chart-desc');
    if (tEl) { tEl.style.opacity = 0; setTimeout(() => { tEl.textContent = stat.title; tEl.style.opacity = 1; }, 180); }
    if (dEl) { dEl.style.opacity = 0; setTimeout(() => { dEl.textContent = stat.desc;  dEl.style.opacity = 1; }, 180); }
    mkCircularBarPlot('fan-bar-chart', fanActive, stat);
    syncProgressDots('fan-progress-dots', fanStatIdx);
  }

  function updateFanSelector() {
    mkScrollSelector('fan-scroll-selector', fanActive, () => {
      updateFanSelector();
      updateFanChart();
    });
  }

  mkProgressDots('fan-progress-dots', FAN_STATS, 0, i => {
    fanStatIdx = i;
    const outer = document.getElementById('fan-sticky-outer');
    if (outer) {
      const top = outer.getBoundingClientRect().top + window.scrollY + i * STEP_PX + 10;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    updateFanChart();
  });

  const fanSpacerEl = document.getElementById('fan-scroll-spacer');
  if (fanSpacerEl) fanSpacerEl.style.height = (FAN_STATS.length * STEP_PX + 200) + 'px';

  const fanOuterEl = document.getElementById('fan-sticky-outer');
  window.addEventListener('scroll', () => {
    if (!fanOuterEl) return;
    const scrolled = -fanOuterEl.getBoundingClientRect().top;
    if (scrolled < 0) return;
    const newIdx = Math.min(FAN_STATS.length - 1, Math.max(0, Math.floor(scrolled / STEP_PX)));
    if (newIdx !== fanStatIdx) { fanStatIdx = newIdx; updateFanChart(); }
    syncProgressDots('fan-progress-dots', fanStatIdx);
  }, { passive: true });

  updateFanSelector();
  requestAnimationFrame(() => requestAnimationFrame(() => updateFanChart()));

  /* ──────────────────────────────────────────────────────────────────────────
     SECTION LEAGUE
  ──────────────────────────────────────────────────────────────────────────── */
  let leagueStatIdx = 0;

  function updateLeagueChart() {
    const stat = LEAGUE_STATS[leagueStatIdx];
    const tEl  = document.getElementById('league-chart-title');
    const dEl  = document.getElementById('league-chart-desc');
    if (tEl) { tEl.style.opacity = 0; setTimeout(() => { tEl.textContent = stat.title; tEl.style.opacity = 1; }, 180); }
    if (dEl) { dEl.style.opacity = 0; setTimeout(() => { dEl.textContent = stat.desc;  dEl.style.opacity = 1; }, 180); }
    mkCircularBarPlot('league-bar-chart', leagueActive, stat);
    syncProgressDots('league-progress-dots', leagueStatIdx);
  }

  function updateLeagueSelector() {
    mkScrollSelector('league-scroll-selector', leagueActive, () => {
      updateLeagueSelector();
      updateLeagueChart();
    });
  }

  mkProgressDots('league-progress-dots', LEAGUE_STATS, 0, i => {
    leagueStatIdx = i;
    const outer = document.getElementById('league-sticky-outer');
    if (outer) {
      const top = outer.getBoundingClientRect().top + window.scrollY + i * STEP_PX + 10;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    updateLeagueChart();
  });

  const leagueSpacerEl = document.getElementById('league-scroll-spacer');
  if (leagueSpacerEl) leagueSpacerEl.style.height = (LEAGUE_STATS.length * STEP_PX + 200) + 'px';

  const leagueOuterEl = document.getElementById('league-sticky-outer');
  window.addEventListener('scroll', () => {
    if (!leagueOuterEl) return;
    const scrolled = -leagueOuterEl.getBoundingClientRect().top;
    if (scrolled < 0) return;
    const newIdx = Math.min(LEAGUE_STATS.length - 1, Math.max(0, Math.floor(scrolled / STEP_PX)));
    if (newIdx !== leagueStatIdx) { leagueStatIdx = newIdx; updateLeagueChart(); }
    syncProgressDots('league-progress-dots', leagueStatIdx);
  }, { passive: true });

  updateLeagueSelector();
  requestAnimationFrame(() => requestAnimationFrame(() => updateLeagueChart()));

  /* ──────────────────────────────────────────────────────────────────────────
     ACCESSIBILITÉ
  ──────────────────────────────────────────────────────────────────────────── */
  const accessActive = new Set(['Premier League', 'La Liga', 'Bundesliga', 'Serie A', 'Ligue 1']);
  mkSelector('access-selector', accessActive, () => mkAccessChart(accessActive));
  onEnter(
    document.getElementById('section-access') || document.body,
    () => mkAccessChart(accessActive),
    0.1
  );

  /* ──────────────────────────────────────────────────────────────────────────
     CORRÉLATION
  ──────────────────────────────────────────────────────────────────────────── */
  let corrActiveLg = 'Premier League';

  function updateCorrSelector() {
    const c = document.getElementById('corr-selector');
    if (!c) return;
    c.innerHTML = '<div class="cs-label">🌍 Sélectionner un championnat</div>';
    Object.entries(store.LEAGUES)
      .filter(([n]) => store.swissMode || n !== 'Swiss SL')
      .forEach(([name, info]) => {
        const b  = document.createElement('button');
        const on = corrActiveLg === name;
        b.className             = 'cpill-s' + (on ? ' on' : '');
        b.style.borderColor     = info.color;
        b.style.color           = on ? '#fff' : info.color;
        b.style.backgroundColor = on ? info.color : 'transparent';
        b.innerHTML = `<span>${info.flag}</span>${name}`;
        b.addEventListener('click', () => {
          corrActiveLg = name;
          updateCorrSelector();
          updateCorrChart();
        });
        c.appendChild(b);
      });
  }

  function updateCorrChart() {
    const chartEl = document.getElementById('corr-chart');
    if (!chartEl) return;
    if (chartEl.offsetWidth < 10 || chartEl.offsetHeight < 10) {
      requestAnimationFrame(() => updateCorrChart());
      return;
    }
    mkCorrelationChart('corr-chart', corrActiveLg);
  }

  updateCorrSelector();
  onEnter(
    document.getElementById('section-compare') || document.body,
    () => updateCorrChart(),
    0.1
  );

  /* ──────────────────────────────────────────────────────────────────────────
     GLOBE
  ──────────────────────────────────────────────────────────────────────────── */
  mkMap();

  /* ──────────────────────────────────────────────────────────────────────────
     SWISS MODE
  ──────────────────────────────────────────────────────────────────────────── */
  function applySwissMode(on) {
    store.swissMode = on;

    if (on) {
      // Mode suisse : tous les championnats actifs + multi-select
      fanActive.clear();
      ALL_LEAGUES_SWISS.forEach(l => fanActive.add(l));
      leagueActive.clear();
      ALL_LEAGUES_SWISS.forEach(l => leagueActive.add(l));

      // Corrélation : Swiss SL disponible
      corrActiveLg = 'Swiss SL';
    } else {
      // Mode normal : Premier League uniquement + sélection exclusive
      fanActive.clear();
      fanActive.add('Premier League');
      leagueActive.clear();
      leagueActive.add('Premier League');

      corrActiveLg = 'Premier League';
    }

    // Rebuild tous les sélecteurs et graphiques
    updateFanSelector();    updateFanChart();
    updateLeagueSelector(); updateLeagueChart();
    updateCorrSelector();   updateCorrChart();

    // Access chart
    const accessSet = on
      ? new Set(ALL_LEAGUES_SWISS)
      : new Set(ALL_LEAGUES_NORMAL);
    accessActive.clear();
    accessSet.forEach(l => accessActive.add(l));
    mkSelector('access-selector', accessActive, () => mkAccessChart(accessActive));
    mkAccessChart(accessActive);

    // Carte
    if (window._rebuildMapPills) window._rebuildMapPills();
  }

  function zoomToSwitzerlandOnGlobe() {
    const mapSection = document.getElementById('map-section');
    if (mapSection) mapSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setTimeout(() => {
      if (window._openGlobeCountry) window._openGlobeCountry('Switzerland');
    }, 900);
  }

  const swissBtn = document.getElementById('swiss-mode-btn');
  if (swissBtn) {
    swissBtn.addEventListener('click', () => {
      const nowOn = swissBtn.getAttribute('aria-pressed') === 'false';
      swissBtn.setAttribute('aria-pressed', nowOn ? 'true' : 'false');
      applySwissMode(nowOn);
      if (nowOn) {
        setTimeout(() => zoomToSwitzerlandOnGlobe(), 200);
      } else {
        const panel = document.getElementById('globe-panel');
        if (panel) panel.classList.remove('open');
        const mapSection = document.getElementById('map-section');
        if (mapSection) mapSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }
}

boot();

/* ──────────────────────────────────────────────────────────────────────────────
   CONCLUSION / ÉPILOGUE
──────────────────────────────────────────────────────────────────────────────── */
function initConclusion() {
  /* ── Helpers d'animation ──────────────────────────────────────────────── */
  function countUp(el, target, suf, dur = 1400) {
    const start = performance.now();
    const step  = t => {
      const p    = Math.min((t - start) / dur, 1);
      const ease = 1 - Math.pow(1 - p, 3);
      const v    = Math.round(ease * target);
      el.textContent = v.toLocaleString('fr') + suf;
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }

  function onVisible(el, cb, threshold = 0.2) {
    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) { cb(); obs.disconnect(); }
    }, { threshold });
    obs.observe(el);
  }

  /* ── Diptych : count-up des chiffres 2026 ─────────────────────────────── */
  const diptych = document.querySelector('.conc-diptych');
  if (diptych) {
    onVisible(diptych, () => {
      diptych.classList.add('in');
      diptych.querySelectorAll('[data-conc-count]').forEach((el, i) => {
        const target = parseInt(el.dataset.concCount, 10);
        const suf    = el.dataset.concSuf || '';
        setTimeout(() => countUp(el, target, suf), i * 130);
      });
    }, 0.15);
  }

  /* ── Editorial blocks ─────────────────────────────────────────────────── */
  document.querySelectorAll('.conc-ed-block').forEach(el => {
    onVisible(el, () => el.classList.add('in'), 0.15);
  });

  /* ── Finale : ligne + quote + close ──────────────────────────────────── */
  const quoteLine = document.getElementById('conc-quote-line');
  const quote     = document.querySelector('.conc-quote');
  const close     = document.querySelector('.conc-close');

  if (quoteLine) onVisible(quoteLine, () => {
    quoteLine.classList.add('in');
    if (quote) setTimeout(() => quote.classList.add('in'), 200);
    if (close) setTimeout(() => close.classList.add('in'), 500);
  }, 0.3);
}

/* ──────────────────────────────────────────────────────────────────────────────
   TIMELINE CAROUSEL
──────────────────────────────────────────────────────────────────────────────── */
function initTimelineCarousel() {
  const boxOuter = document.querySelector('.gallery_box_outer');
  if (!boxOuter || !store.TIMELINE?.length) return;
  boxOuter.innerHTML = '';
  const total = store.TIMELINE.length;

  const galleryBox = document.querySelector('.gallery_box');
  if (!galleryBox) return;

  const cards = [];
  store.TIMELINE.forEach((item) => {
    const card = document.createElement('div');
    card.className = 'gallery_box_in';
    const body = typeof item.body === 'string' ? item.body.replace(/<[^>]+>/g, ' ') : '';
    card.innerHTML = `
      <div class="overlay">
        <div class="gallery-card-year">${item.year}</div>
        <h3>${item.title}</h3>
        <p>${body}</p>
        ${item.tl ? `<span class="gallery-card-tag tl-tag ${item.tl}">${item.tl}</span>` : ''}
      </div>`;
    cards.push(card);
    boxOuter.appendChild(card);
  });

  const galleryOuter = document.querySelector('.gallery_box_outer');
  if (!galleryBox || !galleryOuter) return;

  const referenceCard = cards[0] || null;
  const cardWidth     = referenceCard ? Math.round(referenceCard.getBoundingClientRect().width) : 300;
  const targetRadius  = Math.max(360, Math.round((cardWidth * 1.05) / (2 * Math.sin(Math.PI / total))));
  const radius        = Math.min(targetRadius, 620);

  cards.forEach((card, i) => {
    card.style.transform = `translate(-50%, -50%) rotateY(${i * (360 / total)}deg) translateZ(${radius}px)`;
  });

  const images = [
    'https://images.unsplash.com/photo-1665413813191-3143ec934960?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1681505531034-8d67054e07f6?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1569863959165-56dae551d4fc?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1724178395638-42b12b1a6238?q=80&w=1548&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1753187075544-40debfce3ae1?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1609501406245-4b6298867c90?q=80&w=654&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1683838946268-e0db005a09b4?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    'https://images.unsplash.com/photo-1649520937981-763d6a14de7d?q=80&w=2531&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
  ];

  galleryOuter.querySelectorAll('.gallery_box_in').forEach((card, idx) => {
    card.style.backgroundImage = `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.45)), url('${images[idx % images.length]}')`;
  });

  const totalCards    = galleryOuter.querySelectorAll('.gallery_box_in').length || 1;
  const snapConfig    = totalCards > 1 ? { snapTo: 1 / (totalCards - 1), duration: 0.28, ease: 'power1.out' } : false;
  const visibleHeight = Math.max(galleryBox.offsetHeight, window.innerHeight * 0.65);
  const pinDistance   = Math.round(visibleHeight + (totalCards - 1) * 28);

  gsap.timeline({
    scrollTrigger: {
      trigger:       galleryBox,
      start:         'center center',
      end:           `+=${pinDistance}`,
      scrub:         1,
      pin:           true,
      pinSpacing:    true,
      anticipatePin: 1,
      snap:          snapConfig,
      markers:       false,
    }
  }).to('.gallery_box_outer', { rotateY: -360, ease: 'none' });
}