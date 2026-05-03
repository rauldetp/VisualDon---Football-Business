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
   TIMELINE CAROUSEL
──────────────────────────────────────────────────────────────────────────────── */
function initTimelineCarousel() {
  const boxOuter = document.querySelector('.gallery_box_outer');
  if (!boxOuter || !store.TIMELINE?.length) return;
  boxOuter.innerHTML = '';
  const total = store.TIMELINE.length;

  const cards = [];
  store.TIMELINE.forEach(item => {
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

  const galleryBox   = document.querySelector('.gallery_box');
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
    'https://images.unsplash.com/photo-1507925921958-8a62f3c3d94b?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1542736667-069246bdbc64?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1508953691664-f62e5b748c7a?auto=format&fit=crop&w=900&q=80',
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