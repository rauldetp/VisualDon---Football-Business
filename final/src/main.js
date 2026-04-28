import * as d3 from 'd3';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import './css/styles.css';

import { store }              from './js/store.js';
import { loadData, initData } from './js/data.js';
import { onEnter, animCount, mkSelector } from './js/utils.js';
import { mkRadar, mkAccessChart }         from './js/charts.js';
import { mkMap }                          from './js/map.js';
import {
  STEP_PX, getFanStats, getLeagueStats,
  mkScrollBarChart, mkProgressDots, syncProgressDots,
  buildFanLeftPanel, buildLeagueLeftPanel, mkScrollSelector
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

  const prog = document.getElementById('prog');
  window.addEventListener('scroll', () => {
    const s = window.scrollY, t = document.body.scrollHeight - window.innerHeight;
    prog.style.width = `${t > 0 ? (s / t) * 100 : 0}%`;
  });

  const nav = document.querySelector('.nav');
  window.addEventListener('scroll', () => nav.classList.toggle('scrolled', window.scrollY > 46));

  const ro = new IntersectionObserver(e => {
    e.forEach(x => { if (x.isIntersecting) x.target.classList.add('in'); });
  }, { threshold: .05 });
  document.querySelectorAll('.chart-block,.section-head,.fan-card,.swiss-card').forEach(el => {
    el.classList.add('rev'); ro.observe(el);
  });

  onEnter(document.querySelector('.hero-stats-strip'), () => {
    document.querySelectorAll('.hero-stat-value[data-count]').forEach(el => {
      animCount(el, parseInt(el.dataset.count), el.dataset.suffix || '', el.dataset.prefix || '');
    });
  }, 0.45);

  initTimelineCarousel();

  /* ---- FAN ---- */
  const fanScrollActive = new Set(Object.keys(store.LEAGUES).filter(l => l !== 'Swiss SL'));
  let fanStatIdx = 0;

  function updateFanSection() {
    const stat = FAN_STATS[fanStatIdx];
    const tEl  = document.getElementById('fan-chart-title');
    const dEl  = document.getElementById('fan-chart-desc');
    if (tEl) { tEl.style.opacity = 0; setTimeout(() => { tEl.textContent = stat.title; tEl.style.opacity = 1; }, 180); }
    if (dEl) { dEl.style.opacity = 0; setTimeout(() => { dEl.textContent = stat.desc;  dEl.style.opacity = 1; }, 180); }
    mkScrollBarChart('fan-bar-chart', fanScrollActive, stat, 2026);
    buildFanLeftPanel('fan-scroll-left', fanScrollActive);
    syncProgressDots('fan-progress-dots', fanStatIdx);
  }

  mkScrollSelector('fan-scroll-selector', fanScrollActive, () => updateFanSection());
  mkProgressDots('fan-progress-dots', FAN_STATS, 0, i => {
    fanStatIdx = i;
    const outer = document.getElementById('fan-sticky-outer');
    if (outer) { const top = outer.getBoundingClientRect().top + window.scrollY + i * STEP_PX + 10; window.scrollTo({ top, behavior: 'smooth' }); }
    updateFanSection();
  });

  const fanOuterEl  = document.getElementById('fan-sticky-outer');
  const fanSpacerEl = document.getElementById('fan-scroll-spacer');
  if (fanSpacerEl) fanSpacerEl.style.height = (FAN_STATS.length * STEP_PX + 200) + 'px';
  requestAnimationFrame(() => requestAnimationFrame(() => updateFanSection()));

  window.addEventListener('scroll', () => {
    if (!fanOuterEl) return;
    const scrolled = -fanOuterEl.getBoundingClientRect().top;
    if (scrolled < 0) return;
    const newIdx = Math.min(FAN_STATS.length - 1, Math.max(0, Math.floor(scrolled / STEP_PX)));
    if (newIdx !== fanStatIdx) { fanStatIdx = newIdx; updateFanSection(); }
    syncProgressDots('fan-progress-dots', fanStatIdx);
  }, { passive: true });

  /* ---- LEAGUE ---- */
  const leagueScrollActive = new Set(Object.keys(store.LEAGUES).filter(l => l !== 'Swiss SL'));
  let leagueStatIdx = 0;

  function updateLeagueSection() {
    const stat = LEAGUE_STATS[leagueStatIdx];
    const tEl  = document.getElementById('league-chart-title');
    const dEl  = document.getElementById('league-chart-desc');
    if (tEl) { tEl.style.opacity = 0; setTimeout(() => { tEl.textContent = stat.title; tEl.style.opacity = 1; }, 180); }
    if (dEl) { dEl.style.opacity = 0; setTimeout(() => { dEl.textContent = stat.desc;  dEl.style.opacity = 1; }, 180); }
    mkScrollBarChart('league-bar-chart', leagueScrollActive, stat, 2026);
    buildLeagueLeftPanel('league-scroll-left', leagueScrollActive);
    syncProgressDots('league-progress-dots', leagueStatIdx);
  }

  mkScrollSelector('league-scroll-selector', leagueScrollActive, () => updateLeagueSection());
  mkProgressDots('league-progress-dots', LEAGUE_STATS, 0, i => {
    leagueStatIdx = i;
    const outer = document.getElementById('league-sticky-outer');
    if (outer) { const top = outer.getBoundingClientRect().top + window.scrollY + i * STEP_PX + 10; window.scrollTo({ top, behavior: 'smooth' }); }
    updateLeagueSection();
  });

  const leagueOuterEl  = document.getElementById('league-sticky-outer');
  const leagueSpacerEl = document.getElementById('league-scroll-spacer');
  if (leagueSpacerEl) leagueSpacerEl.style.height = (LEAGUE_STATS.length * STEP_PX + 200) + 'px';
  requestAnimationFrame(() => requestAnimationFrame(() => updateLeagueSection()));

  window.addEventListener('scroll', () => {
    if (!leagueOuterEl) return;
    const scrolled = -leagueOuterEl.getBoundingClientRect().top;
    if (scrolled < 0) return;
    const newIdx = Math.min(LEAGUE_STATS.length - 1, Math.max(0, Math.floor(scrolled / STEP_PX)));
    if (newIdx !== leagueStatIdx) { leagueStatIdx = newIdx; updateLeagueSection(); }
    syncProgressDots('league-progress-dots', leagueStatIdx);
  }, { passive: true });

  /* ---- RADAR ---- */
  const cmpActive = new Set(Object.keys(store.LEAGUES).filter(l => l !== 'Swiss SL'));
  let radarCtrl   = null;

  function syncRadar(rebuild) {
    if (rebuild || !radarCtrl) {
      radarCtrl = mkRadar(cmpActive, doRebuild => syncRadar(doRebuild !== false));
    } else {
      radarCtrl.syncPolys();
    }
    document.querySelectorAll('#compare-selector .cpill-s').forEach(btn => {
      const name = btn.dataset.league; if (!name) return;
      const info = store.LEAGUES[name]; if (!info) return;
      const on   = cmpActive.has(name);
      btn.classList.toggle('on', on);
      btn.style.color           = on ? '#fff' : info.color;
      btn.style.backgroundColor = on ? info.color : 'transparent';
    });
  }

  /* ---- ACCESS ---- */
  const accessActive = new Set(['Premier League', 'La Liga', 'Bundesliga', 'Serie A', 'Ligue 1']);
  mkSelector('access-selector', accessActive, () => mkAccessChart(accessActive));
  onEnter(document.getElementById('section-access') || document.body, () => mkAccessChart(accessActive), 0.1);

  /* ---- RADAR SELECTOR ---- */
  function buildCmpSelector() {
    const sel = document.getElementById('compare-selector');
    if (!sel) return;
    sel.innerHTML = '<div class="cs-label">\uD83C\uDF0D S\u00e9lectionner les ligues \u00e0 comparer</div>';
    Object.entries(store.LEAGUES).filter(([n]) => store.swissMode || n !== 'Swiss SL').forEach(([name, info]) => {
      const on = cmpActive.has(name);
      const b  = document.createElement('button');
      b.className           = 'cpill-s' + (on ? ' on' : '');
      b.dataset.league      = name;
      b.style.borderColor   = info.color;
      b.style.color         = on ? '#fff' : info.color;
      b.style.backgroundColor = on ? info.color : 'transparent';
      b.innerHTML = `<span>${info.flag}</span>${name}`;
      b.addEventListener('click', () => {
        if (cmpActive.has(name) && cmpActive.size > 1) cmpActive.delete(name);
        else if (!cmpActive.has(name)) cmpActive.add(name);
        syncRadar(false); buildCmpSelector();
      });
      sel.appendChild(b);
    });
  }
  buildCmpSelector();
  syncRadar(true);

  /* ---- MAP ---- */
  mkMap();

  /* ---- SWISS MODE ---- */
  const ALL_ACTIVE_SETS = [
    { set: fanScrollActive,    rebuild: () => { mkScrollSelector('fan-scroll-selector',    fanScrollActive,    () => updateFanSection());    updateFanSection();    } },
    { set: leagueScrollActive, rebuild: () => { mkScrollSelector('league-scroll-selector', leagueScrollActive, () => updateLeagueSection()); updateLeagueSection(); } },
    { set: accessActive,       rebuild: () => { mkSelector('access-selector', accessActive, () => mkAccessChart(accessActive)); mkAccessChart(accessActive); } },
    { set: cmpActive,          rebuild: () => { buildCmpSelector(); syncRadar(true); } },
  ];

  function applySwissMode(on) {
    store.swissMode = on;
    ALL_ACTIVE_SETS.forEach(({ set, rebuild }) => {
      if (on) { set.clear(); set.add('Swiss SL'); }
      else { set.delete('Swiss SL'); ['Premier League', 'La Liga', 'Bundesliga', 'Serie A', 'Ligue 1'].forEach(l => set.add(l)); }
      rebuild();
    });
    const swissIso = store.COUNTRIES.Switzerland?.iso;
    if (swissIso) {
      d3.selectAll('path.cp').filter(d => String(d.id) === swissIso)
        .attr('fill',   on ? `${store.COUNTRIES.Switzerland.color}44` : '#c5dbbf')
        .attr('stroke', on ? store.COUNTRIES.Switzerland.color : 'rgba(155,185,150,.45)')
        .attr('stroke-width', on ? 1.5 : 0.4)
        .style('cursor', on ? 'pointer' : 'default');
    }
    if (window._rebuildMapPills) window._rebuildMapPills();
  }

  function zoomToSwitzerlandOnMap() {
    const mapSection = document.getElementById('map-section');
    if (mapSection) {
      mapSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setTimeout(() => {
        const pill = document.querySelector(".cpill-map[data-c='Switzerland']");
        if (pill) pill.click();
      }, 900);
    }
  }

  const swissBtn = document.getElementById('swiss-mode-btn');
  if (swissBtn) {
    swissBtn.addEventListener('click', () => {
      const nowOn = swissBtn.getAttribute('aria-pressed') === 'false';
      swissBtn.setAttribute('aria-pressed', nowOn ? 'true' : 'false');
      applySwissMode(nowOn);
      if (nowOn) {
        setTimeout(() => zoomToSwitzerlandOnMap(), 200);
      } else {
        setTimeout(() => {
          const rst = document.querySelector('.cpill-map:not([data-c])');
          if (rst) rst.click();
          const mapSection = document.getElementById('map-section');
          if (mapSection) mapSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    });
  }
}

boot();

function initTimelineCarousel() {
  const boxOuter = document.querySelector('.gallery_box_outer');
  if (!boxOuter || !store.TIMELINE?.length) return;
  boxOuter.innerHTML = '';
  const total = store.TIMELINE.length;

  const cards = [];
  store.TIMELINE.forEach((item, i) => {
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

  const galleryBox = document.querySelector('.gallery_box');
  const galleryOuter = document.querySelector('.gallery_box_outer');
  if (!galleryBox || !galleryOuter) return;

  const referenceCard = cards[0] || null;
  const cardWidth = referenceCard ? Math.round(referenceCard.getBoundingClientRect().width) : 300;
  const targetRadius = Math.max(360, Math.round((cardWidth * 1.05) / (2 * Math.sin(Math.PI / total))));
  const radius = Math.min(targetRadius, 620);

  cards.forEach((card, i) => {
    card.style.transform = `translate(-50%, -50%) rotateY(${i * (360 / total)}deg) translateZ(${radius}px)`;
  });

  const images = [
    'https://images.unsplash.com/photo-1507925921958-8a62f3c3d94b?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1542736667-069246bdbc64?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1509395176047-4a66953fd231?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1483721310020-03333e577078?auto=format&fit=crop&w=900&q=80',
    'https://images.unsplash.com/photo-1508953691664-f62e5b748c7a?auto=format&fit=crop&w=900&q=80'
  ];

  galleryOuter.querySelectorAll('.gallery_box_in').forEach((card, idx) => {
    card.style.backgroundImage = `linear-gradient(rgba(0,0,0,.2), rgba(0,0,0,.45)), url('${images[idx % images.length]}')`;
  });

  const totalCards = galleryOuter.querySelectorAll('.gallery_box_in').length || 1;
  const snapConfig = totalCards > 1 ? { snapTo: 1 / (totalCards - 1), duration: 0.28, ease: 'power1.out' } : false;
  const visibleHeight = Math.max(galleryBox.offsetHeight, window.innerHeight * 0.65);
  const pinDistance = Math.round(visibleHeight + (totalCards - 1) * 28);

  gsap.timeline({
    scrollTrigger: {
      trigger: galleryBox,
      start: 'center center',
      end: `+=${pinDistance}`,
      scrub: 1,
      pin: true,
      pinSpacing: true,
      anticipatePin: 1,
      snap: snapConfig,
      markers: false
    }
  }).to('.gallery_box_outer', { rotateY: -360, ease: 'none' });
}
