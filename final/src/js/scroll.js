import { store } from './store.js';
import { mkTooltip, fmtM, fmtE } from './utils.js';

export const STEP_PX = 400;

export function getFanStats() {
  return [
    {
      key: 'ticket', title: 'Billet moyen', unit: '\u20ac',
      desc: 'Prix moyen d\u2019un billet de championnat \u00b7 1990\u20132026 \u00b7 hors abonnement saison',
      getData: lg => store.TICKET[lg] || [], fmt: fmtE
    },
    {
      key: 'jersey', title: 'Maillot officiel', unit: '\u20ac',
      desc: 'Prix public d\u2019un maillot adulte floqu\u00e9 \u00b7 kit domicile \u00b7 1990\u20132026',
      getData: lg => store.JERSEY[lg] || [], fmt: fmtE
    },
    {
      key: 'tvsub', title: 'Abonnements TV \u2014 toutes comp\u00e9titions', unit: '\u20ac/mois',
      desc: 'Co\u00fbt mensuel cumul\u00e9 pour suivre TOUS les matchs d\u2019un club \u00b7 championnat + coupes + Europe \u00b7 1992\u20132026',
      getData: lg => store.TV_SUB_FULL[lg] || [], fmt: v => `${Math.round(v)} \u20ac/m`
    },
    {
      key: 'budget', title: 'Budget saison d\u2019un fan type', unit: '\u20ac/saison',
      desc: '17 matchs domicile + maillot officiel + abonnements TV annuels \u00b7 co\u00fbt total supporter \u00b7 1990\u20132026',
      getData: lg => {
        const t = store.TICKET[lg] || [];
        const j = store.JERSEY[lg] || [];
        const s = store.TV_SUB_FULL[lg] || [];
        return store.YEARS.map(yr => ({
          year: yr,
          value: Math.round(
            (t.find(d => d.year === yr)?.value || 0) * 17 +
            (j.find(d => d.year === yr)?.value || 0) +
            (s.find(d => d.year === yr)?.value || 0) * 12
          )
        }));
      },
      fmt: fmtE
    }
  ];
}

export function getLeagueStats() {
  return [
    { key:'tv',      title:'Droits TV du championnat',            unit:'M\u20ac', desc:'Droits TV annuels vendus par la ligue \u00b7 march\u00e9s domestique + international \u00b7 1990\u20132026', getData: lg => store.TV[lg]          || [], fmt: fmtM },
    { key:'wage',    title:'Masse salariale totale',              unit:'M\u20ac', desc:'Total des salaires de tous les joueurs de la ligue sur une saison \u00b7 1980\u20132026',                    getData: lg => store.WAGE_BILL[lg]   || [], fmt: fmtM },
    { key:'sponsor', title:'Revenus sponsors \u2014 ligue enti\u00e8re',  unit:'M\u20ac', desc:'Total des contrats de sponsoring pour tous les clubs de la ligue \u00b7 1980\u20132026',             getData: lg => store.SPONSOR_REV[lg] || [], fmt: fmtM },
    { key:'stadium', title:'Revenus billetterie \u2014 ligue enti\u00e8re',unit:'M\u20ac', desc:'Total des recettes billetterie pour tous les clubs \u00b7 stades + hospitalit\u00e9 \u00b7 1980\u20132026', getData: lg => store.STADIUM_REV[lg] || [], fmt: fmtM },
    { key:'merch',   title:'Revenus merchandising \u2014 ligue enti\u00e8re',unit:'M\u20ac', desc:'Ventes de produits d\u00e9riv\u00e9s (maillots, collections, licences) \u00b7 tous clubs \u00b7 1980\u20132026', getData: lg => store.MERCH_REV[lg]   || [], fmt: fmtM },
  ];
}

const scrollTT = mkTooltip();

export function mkScrollBarChart(containerId, activeSet, statDef, year) {
  const { d3, LEAGUES, TIMELINE, swissMode } = store;
  const c = document.getElementById(containerId);
  if (!c) return;
  const rawW = c.getBoundingClientRect().width;
  if (rawW < 10) { requestAnimationFrame(() => mkScrollBarChart(containerId, activeSet, statDef, year)); return; }
  c.innerHTML = '';

  const activeLgs = Object.keys(LEAGUES).filter(lg => (lg !== 'Swiss SL' || swissMode) && activeSet.has(lg));
  if (!activeLgs.length) return;

  const displayYears = [1990, 1995, 2000, 2005, 2010, 2015, 2020, 2025, 2026];
  const seriesData   = displayYears.map(yr => {
    const vals = {};
    activeLgs.forEach(lg => {
      const data = statDef.getData(lg);
      const pt   = data.find(d => d.year === yr) || data.reduce((a, b) => Math.abs(b.year - yr) < Math.abs(a.year - yr) ? b : a, data[0]);
      vals[lg]   = pt ? pt.value : 0;
    });
    return { yr, vals };
  });

  const maxVal = d3.max(seriesData.flatMap(d => Object.values(d.vals))) || 1;
  const W      = Math.round(rawW);
  const ML = 48, MR = 16, MT = 16, TL_H = 44;
  const BAR_H  = Math.max(160, Math.round(c.getBoundingClientRect().height || 300) - MT - TL_H - 4);
  const H      = MT + BAR_H + TL_H;
  const iW     = W - ML - MR;

  const svg   = d3.select(c).append('svg').attr('viewBox', `0 0 ${W} ${H}`).style('width', '100%').style('height', H + 'px').style('display', 'block');
  const g     = svg.append('g').attr('transform', `translate(${ML},${MT})`);
  const xYear = d3.scaleBand().domain(displayYears).range([0, iW]).padding(0.18);
  const xLg   = d3.scaleBand().domain(activeLgs).rangeRound([0, xYear.bandwidth()]).padding(0.06);
  const y     = d3.scaleLinear().domain([0, maxVal * 1.1]).range([BAR_H, 0]);

  y.ticks(4).forEach(t => {
    g.append('line').attr('x1', 0).attr('x2', iW).attr('y1', y(t)).attr('y2', y(t)).attr('stroke', 'var(--border)').attr('stroke-dasharray', '3,5').attr('stroke-width', .7);
    g.append('text').attr('x', -5).attr('y', y(t)).attr('dominant-baseline', 'middle').attr('text-anchor', 'end').attr('fill', 'var(--muted)').style('font-family', 'Space Mono,monospace').style('font-size', '7px').text(statDef.fmt(t));
  });
  g.append('line').attr('x1', 0).attr('x2', iW).attr('y1', BAR_H).attr('y2', BAR_H).attr('stroke', 'var(--border)').attr('stroke-width', 1.2);

  seriesData.forEach(({ yr, vals }) => {
    const gx = xYear(yr);
    activeLgs.forEach(lg => {
      const v     = vals[lg] || 0;
      const bx    = gx + xLg(lg);
      const bw    = xLg.bandwidth();
      const bh    = BAR_H - y(v);
      const color = LEAGUES[lg].color;
      const bar   = g.append('rect').attr('x', bx).attr('y', BAR_H).attr('width', bw).attr('height', 0).attr('fill', color).attr('rx', 2).attr('opacity', .88);
      bar.transition().duration(420).ease(d3.easeCubicOut).attr('y', y(v)).attr('height', bh);
    });
  });

  const nearestYr = displayYears.reduce((a, b) => Math.abs(b - year) < Math.abs(a - year) ? b : a);
  const hx        = xYear(nearestYr);
  if (hx !== undefined) {
    g.append('rect').attr('x', hx).attr('y', 0).attr('width', xYear.bandwidth()).attr('height', BAR_H)
      .attr('fill', 'var(--gold)').attr('opacity', .07).attr('rx', 3).attr('pointer-events', 'none');
  }
  g.append('text').attr('x', iW).attr('y', -3).attr('text-anchor', 'end')
    .attr('fill', 'var(--gold)').style('font-family', 'Oswald,sans-serif').style('font-size', '13px').style('font-weight', '700').text(year);

  const tlG = g.append('g').attr('transform', `translate(0,${BAR_H})`);
  const tlX = d3.scaleLinear().domain([1990, 2026]).range([0, iW]);

  displayYears.forEach(yr => {
    const tx = tlX(yr);
    tlG.append('line').attr('x1', tx).attr('x2', tx).attr('y1', 0).attr('y2', 7).attr('stroke', 'var(--muted)').attr('stroke-width', .8);
    tlG.append('text').attr('x', tx).attr('y', 18).attr('text-anchor', 'middle')
      .attr('fill', 'var(--muted)').style('font-family', 'Space Mono,monospace').style('font-size', '7px')
      .text(yr === 2026 ? '' : ("'" + String(yr).slice(2)));
  });

  const popupDiv = document.createElement('div');
  popupDiv.className = 'event-popup';
  c.style.position   = 'relative';
  c.appendChild(popupDiv);
  popupDiv.innerHTML = '<span class="event-popup-close">\u2715</span>';
  popupDiv.querySelector('.event-popup-close').addEventListener('click', () => popupDiv.classList.remove('on'));

  TIMELINE.forEach(ev => {
    if (ev.year < 1990 || ev.year > 2026) return;
    const ex = tlX(ev.year);
    const dg = tlG.append('g').attr('transform', `translate(${ex},7)`).style('cursor', 'pointer');
    dg.append('circle').attr('r', 3.5).attr('fill', 'var(--gold)').attr('stroke', 'var(--card)').attr('stroke-width', 1.5);
    dg.append('circle').attr('r', 8).attr('fill', 'transparent');
    dg.on('click', function(event) {
      event.stopPropagation();
      const same = popupDiv.dataset.yr === String(ev.year) && popupDiv.classList.contains('on');
      popupDiv.classList.remove('on');
      if (!same) {
        popupDiv.dataset.yr = ev.year;
        popupDiv.innerHTML  = `<span class="event-popup-close">\u2715</span><div class="event-popup-yr">${ev.year}</div><div class="event-popup-ttl">${ev.title}</div>${ev.body}`;
        popupDiv.querySelector('.event-popup-close').addEventListener('click', () => popupDiv.classList.remove('on'));
        let left = ML + ex - 10;
        if (left + 228 > W) left = W - 232;
        if (left < 0) left = 4;
        popupDiv.style.left = left + 'px';
        popupDiv.classList.add('on');
      }
    });
    dg.on('mouseenter', () => dg.select('circle').attr('r', 5.5));
    dg.on('mouseleave', () => dg.select('circle').attr('r', 3.5));
  });

  const legendId = containerId + '-legend';
  let legendEl   = document.getElementById(legendId);
  if (!legendEl) {
    legendEl           = document.createElement('div');
    legendEl.id        = legendId;
    legendEl.style.cssText = 'display:flex;flex-wrap:wrap;gap:10px 16px;margin-bottom:10px;flex-shrink:0';
    c.parentNode.insertBefore(legendEl, c);
  }
  legendEl.innerHTML = '';
  activeLgs.forEach(lg => {
    const color = LEAGUES[lg].color;
    const flag  = LEAGUES[lg].flag;
    const item  = document.createElement('div');
    item.style.cssText = "display:flex;align-items:center;gap:5px;font-family:'Space Mono',monospace;font-size:8px;color:var(--ink2)";
    item.innerHTML = `<span style="display:inline-block;width:10px;height:10px;border-radius:2px;background:${color};flex-shrink:0"></span>${flag} ${lg}`;
    legendEl.appendChild(item);
  });

  const ov = svg.append('rect').attr('x', ML).attr('y', MT).attr('width', iW).attr('height', BAR_H).attr('fill', 'none').attr('pointer-events', 'all');
  ov.on('mousemove', function(ev) {
    const [mx] = d3.pointer(ev, g.node());
    let best = displayYears[0], bestD = Infinity;
    displayYears.forEach(yr => { const dist = Math.abs(tlX(yr) - mx); if (dist < bestD) { bestD = dist; best = yr; } });
    const hovered = seriesData.find(d => d.yr === best);
    if (!hovered) return;
    const rows = activeLgs.map(lg =>
      `<div class="tt-row"><span class="tt-n" style="color:${LEAGUES[lg].color}">${LEAGUES[lg].flag} ${lg}</span><span>${statDef.fmt(hovered.vals[lg] || 0)}</span></div>`
    ).join('');
    scrollTT.show(`<div class="tt-yr">${best}</div>${rows}`, ev);
  }).on('mouseleave', () => scrollTT.hide());
}

export function mkProgressDots(dotsId, stats, currentIdx, onClickFn) {
  const c = document.getElementById(dotsId);
  if (!c) return;
  c.innerHTML = '';
  stats.forEach((_, i) => {
    const b = document.createElement('button');
    b.className = 'spd' + (i === currentIdx ? ' active' : '');
    b.title     = stats[i].title;
    b.addEventListener('click', () => onClickFn(i));
    c.appendChild(b);
  });
}

export function syncProgressDots(dotsId, idx) {
  document.querySelectorAll(`#${dotsId} .spd`).forEach((b, i) => b.classList.toggle('active', i === idx));
}

export function buildFanLeftPanel(containerId, activeSet) {
  const { LEAGUES, COUNTRIES } = store;
  const c = document.getElementById(containerId);
  if (!c) return;
  c.innerHTML = '<div class="scroll-left-header">Budget saison d\u2019un fan type</div>';
  [...activeSet].forEach(lg => {
    const info  = Object.values(COUNTRIES).find(d => d.league === lg);
    if (!info) return;
    const color       = LEAGUES[lg]?.color || '#999';
    const flag        = LEAGUES[lg]?.flag  || '';
    const matches     = 17;
    const ticketTotal = info.ticket * matches;
    const tvTotal     = info.tvSubFull * 12;
    const total       = ticketTotal + info.jersey + tvTotal;
    const card        = document.createElement('div');
    card.className    = 'scroll-budget-card';
    card.style.borderLeft = `3px solid ${color}`;
    card.innerHTML = `
      <div class="sbc-league">${flag} ${lg}</div>
      <div class="sbc-title">Supporter \u00b7 Saison 2026</div>
      <div class="sbc-item"><span class="sbc-item-lbl">\uD83C\uDFAB ${matches} matchs / saison</span><span class="sbc-item-val" style="color:${color}">${ticketTotal} \u20ac</span></div>
      <div class="sbc-item"><span class="sbc-item-lbl">\uD83D\uDC55 Maillot officiel</span><span class="sbc-item-val" style="color:${color}">${info.jersey} \u20ac</span></div>
      <div class="sbc-item"><span class="sbc-item-lbl">\uD83D\uDCFA Abo TV toutes comp\u00e9t. (an)</span><span class="sbc-item-val" style="color:${color}">${tvTotal} \u20ac</span></div>
      <div class="sbc-total" style="background:${color}14;border:1px solid ${color}30">
        <div class="sbc-total-lbl" style="color:${color}">Total budget saison</div>
        <div class="sbc-total-val" style="color:var(--ink)">${total} \u20ac</div>
      </div>`;
    c.appendChild(card);
  });
}

export function buildLeagueLeftPanel(containerId, activeSet) {
  const { LEAGUES, COUNTRIES } = store;
  const c = document.getElementById(containerId);
  if (!c) return;
  c.innerHTML = '<div class="scroll-left-header">Revenus totaux / an</div>';
  [...activeSet].forEach(lg => {
    const info  = Object.values(COUNTRIES).find(d => d.league === lg);
    if (!info) return;
    const color = LEAGUES[lg]?.color || '#999';
    const flag  = LEAGUES[lg]?.flag  || '';
    const total = info.tv + info.sponsorRevenue + info.stadiumRevenue + info.merchandisingRevenue;
    const card  = document.createElement('div');
    card.className    = 'scroll-budget-card';
    card.style.borderLeft = `3px solid ${color}`;
    card.innerHTML = `
      <div class="sbc-league">${flag} ${lg}</div>
      <div class="sbc-title">Revenus cumul\u00e9s \u00b7 2026</div>
      <div class="sbc-item"><span class="sbc-item-lbl">\uD83D\uDCE1 Droits TV</span><span class="sbc-item-val" style="color:${color}">${fmtM(info.tv)}</span></div>
      <div class="sbc-item"><span class="sbc-item-lbl">\uD83E\uDD1D Sponsors</span><span class="sbc-item-val" style="color:${color}">${fmtM(info.sponsorRevenue)}</span></div>
      <div class="sbc-item"><span class="sbc-item-lbl">\uD83C\uDFDF Billetterie</span><span class="sbc-item-val" style="color:${color}">${fmtM(info.stadiumRevenue)}</span></div>
      <div class="sbc-item"><span class="sbc-item-lbl">\uD83D\uDECD Merchandising</span><span class="sbc-item-val" style="color:${color}">${fmtM(info.merchandisingRevenue)}</span></div>
      <div class="sbc-total" style="background:${color}14;border:1px solid ${color}30">
        <div class="sbc-total-lbl" style="color:${color}">Total revenus 2026</div>
        <div class="sbc-total-val" style="color:var(--ink)">${fmtM(total)}</div>
      </div>`;
    c.appendChild(card);
  });
}

export function mkScrollSelector(containerId, activeSet, onUpdate) {
  const { LEAGUES, swissMode } = store;
  const c = document.getElementById(containerId);
  if (!c) return;
  c.innerHTML = '<div class="cs-label">\uD83C\uDF0D S\u00e9lectionner les ligues \u00e0 comparer</div>';
  Object.entries(LEAGUES).filter(([n]) => n !== 'Swiss SL' || swissMode).forEach(([name, info]) => {
    const b = document.createElement('button');
    b.className = 'cpill-s' + (activeSet.has(name) ? ' on' : '');
    b.style.borderColor       = info.color;
    b.style.color             = activeSet.has(name) ? '#fff' : info.color;
    b.style.backgroundColor   = activeSet.has(name) ? info.color : 'transparent';
    b.innerHTML = `<span>${info.flag}</span>${name}`;
    b.addEventListener('click', () => {
      if (activeSet.has(name) && activeSet.size > 1) {
        activeSet.delete(name); b.classList.remove('on'); b.style.color = info.color; b.style.backgroundColor = 'transparent';
      } else if (!activeSet.has(name)) {
        activeSet.add(name); b.classList.add('on'); b.style.color = '#fff'; b.style.backgroundColor = info.color;
      }
      onUpdate();
    });
    c.appendChild(b);
  });
}
