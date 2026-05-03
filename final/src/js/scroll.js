import { store } from './store.js';
import { fmtM, fmtE } from './utils.js';

export const STEP_PX = 400;

export function getFanStats() {
  return [
    {
      key: 'ticket', title: 'Billet moyen', unit: '€',
      desc: 'Prix moyen d\'un billet de championnat · 1990–2026 · hors abonnement saison',
      getData: lg => store.TICKET[lg] || [], fmt: fmtE
    },
    {
      key: 'jersey', title: 'Maillot officiel', unit: '€',
      desc: 'Prix public d\'un maillot adulte floqué · kit domicile · 1990–2026',
      getData: lg => store.JERSEY[lg] || [], fmt: fmtE
    },
    {
      key: 'tvsub', title: 'Abonnements TV — toutes compétitions', unit: '€/mois',
      desc: 'Coût mensuel cumulé pour suivre TOUS les matchs d\'un club · 1992–2026',
      getData: lg => store.TV_SUB_FULL[lg] || [], fmt: v => `${Math.round(v)} €/m`
    },
    {
      key: 'budget', title: 'Budget saison d\'un fan type', unit: '€/saison',
      desc: '17 matchs domicile + maillot officiel + abonnements TV annuels · 1990–2026',
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
    { key: 'tv',      title: 'Droits TV du championnat',              unit: 'M€', desc: 'Droits TV annuels vendus par la ligue · 1990–2026',               getData: lg => store.TV[lg]          || [], fmt: fmtM },
    { key: 'wage',    title: 'Masse salariale totale',                unit: 'M€', desc: 'Total des salaires de tous les joueurs · 1980–2026',                getData: lg => store.WAGE_BILL[lg]   || [], fmt: fmtM },
    { key: 'sponsor', title: 'Revenus sponsors — ligue entière',      unit: 'M€', desc: 'Total des contrats de sponsoring pour tous les clubs · 1980–2026',  getData: lg => store.SPONSOR_REV[lg] || [], fmt: fmtM },
    { key: 'stadium', title: 'Revenus billetterie — ligue entière',   unit: 'M€', desc: 'Total des recettes billetterie pour tous les clubs · 1980–2026',    getData: lg => store.STADIUM_REV[lg] || [], fmt: fmtM },
    { key: 'merch',   title: 'Revenus merchandising — ligue entière', unit: 'M€', desc: 'Ventes de produits dérivés · tous clubs · 1980–2026',               getData: lg => store.MERCH_REV[lg]   || [], fmt: fmtM },
  ];
}

// ── Circular Bar Plot ─────────────────────────────────────────────────────────
export function mkCircularBarPlot(containerId, activeLeagues, statDef) {
  const { d3, LEAGUES } = store;
  const c = document.getElementById(containerId);
  if (!c) return;

  const doRender = () => {
    const W = c.offsetWidth;
    const H = c.offsetHeight;
    if (W < 10 || H < 10) { requestAnimationFrame(doRender); return; }
    if (store.swissMode) {
      _renderMulti(c, activeLeagues, statDef, W, H, d3, LEAGUES);
    } else {
      const league = [...activeLeagues][0] || 'Premier League';
      _renderSingle(c, league, statDef, W, H, d3, LEAGUES);
    }
  };
  doRender();
}

// ── Rendu simple (mode normal) ────────────────────────────────────────────────
function _renderSingle(c, league, statDef, W, H, d3, LEAGUES) {
  c.innerHTML = '';

  const data = statDef.getData(league);
  if (!data || !data.length) return;

  const color   = LEAGUES[league]?.color || '#2d6a2d';
  const labelSp = 52;
  const size    = Math.min(W, H) - labelSp * 2;
  const cx      = W / 2;
  const cy      = H / 2 + H * 0.04;
  const innerR  = size * 0.18;
  const outerR  = size * 0.42;

  const svg = d3.select(c).append('svg')
    .attr('width', W).attr('height', H)
    .style('display', 'block').style('overflow', 'visible');

  const g = svg.append('g').attr('transform', `translate(${cx},${cy})`);

  const years  = data.map(d => d.year);
  const maxVal = d3.max(data, d => d.value) || 1;

  const angleScale = d3.scaleBand()
    .domain(years).range([0, Math.PI * 2]).padding(0.06);

  const radScale = d3.scaleLinear()
    .domain([0, maxVal]).range([innerR, outerR]);

  [0.25, 0.5, 0.75, 1].forEach(t => {
    g.append('circle').attr('r', innerR + (outerR - innerR) * t)
      .attr('fill', 'none')
      .attr('stroke', 'rgba(255,255,255,0.06)')
      .attr('stroke-dasharray', '3,5');
  });

  g.append('text').attr('x', 5).attr('y', -outerR + 12)
    .attr('fill', 'rgba(255,255,255,0.22)')
    .style('font-family', 'Space Mono,monospace')
    .style('font-size', Math.max(8, size * 0.018) + 'px')
    .text(statDef.fmt(maxVal));

  g.append('text').attr('x', 5).attr('y', -(innerR + (outerR - innerR) * 0.5) + 12)
    .attr('fill', 'rgba(255,255,255,0.15)')
    .style('font-family', 'Space Mono,monospace')
    .style('font-size', Math.max(7, size * 0.015) + 'px')
    .text(statDef.fmt(maxVal * 0.5));

  const arcGen = d3.arc();

  const bars = g.selectAll('path.cbar').data(data).enter().append('path')
    .attr('class', 'cbar')
    .attr('d', d => arcGen({ innerRadius: innerR, outerRadius: innerR + 0.5, startAngle: angleScale(d.year), endAngle: angleScale(d.year) + angleScale.bandwidth() }))
    .attr('fill', hexToRgba(color, 0.8))
    .attr('stroke', color).attr('stroke-width', 0.4)
    .style('cursor', 'pointer');

  bars.transition().duration(800).delay((d, i) => i * 10).ease(d3.easeCubicOut)
    .attr('d', d => arcGen({ innerRadius: innerR, outerRadius: Math.max(innerR + 1, radScale(d.value)), startAngle: angleScale(d.year), endAngle: angleScale(d.year) + angleScale.bandwidth() }));

  const labelR = outerR + 14;
  data.forEach(d => {
    const mid  = angleScale(d.year) + angleScale.bandwidth() / 2;
    const svgA = mid - Math.PI / 2;
    const x = Math.cos(svgA) * labelR;
    const y = Math.sin(svgA) * labelR;
    let rot = mid * 180 / Math.PI;
    if (mid > Math.PI) rot -= 180;
    g.append('text').attr('x', x).attr('y', y)
      .attr('text-anchor', 'middle').attr('dominant-baseline', 'middle')
      .attr('fill', 'rgba(255,255,255,0.38)')
      .style('font-family', 'Space Mono,monospace')
      .style('font-size', Math.max(6, size * 0.013) + 'px')
      .attr('transform', `rotate(${rot},${x},${y})`)
      .text(d.year);
  });

  const last = data[data.length - 1];
  g.append('circle').attr('r', innerR - 2).attr('fill', '#080808');

  const centerVal = g.append('text')
    .attr('text-anchor', 'middle').attr('y', -size * 0.028)
    .attr('fill', color)
    .style('font-family', 'Oswald,sans-serif')
    .style('font-size', Math.max(18, size * 0.055) + 'px')
    .style('font-weight', '700')
    .text(statDef.fmt(last.value));

  const centerYr = g.append('text')
    .attr('text-anchor', 'middle').attr('y', size * 0.022)
    .attr('fill', 'rgba(255,255,255,0.3)')
    .style('font-family', 'Space Mono,monospace')
    .style('font-size', Math.max(7, size * 0.016) + 'px')
    .text('2026');

  g.append('text')
    .attr('text-anchor', 'middle').attr('y', size * 0.053)
    .attr('fill', 'rgba(255,255,255,0.18)')
    .style('font-family', 'Space Mono,monospace')
    .style('font-size', Math.max(6, size * 0.013) + 'px')
    .text(statDef.unit);

  bars
    .on('mouseenter', function(event, d) {
      d3.select(this).attr('fill', hexToRgba(color, 1)).attr('stroke-width', 1.5);
      centerVal.text(statDef.fmt(d.value));
      centerYr.text(d.year);
    })
    .on('mouseleave', function() {
      d3.select(this).attr('fill', hexToRgba(color, 0.8)).attr('stroke-width', 0.4);
      centerVal.text(statDef.fmt(last.value));
      centerYr.text('2026');
    });
}

// ── Rendu multi (mode suisse) ─────────────────────────────────────────────────
function _renderMulti(c, activeLeagues, statDef, W, H, d3, LEAGUES) {
  c.innerHTML = '';

  const leagues = [...activeLeagues];
  if (!leagues.length) return;

  const allData   = {};
  leagues.forEach(lg => { allData[lg] = statDef.getData(lg) || []; });

  const globalMax = d3.max(leagues.flatMap(lg => allData[lg].map(d => d.value))) || 1;
  const years     = allData[leagues[0]].map(d => d.year);

  const labelSp = 52;
  const size    = Math.min(W, H) - labelSp * 2;
  const cx      = W / 2;
  const cy      = H / 2 + H * 0.04;
  const innerR  = size * 0.18;
  const outerR  = size * 0.42;

  const radScale = d3.scaleLinear()
    .domain([0, globalMax]).range([innerR, outerR]);

  const svg = d3.select(c).append('svg')
    .attr('width', W).attr('height', H)
    .style('display', 'block').style('overflow', 'visible');

  const g = svg.append('g').attr('transform', `translate(${cx},${cy})`);

  [0.25, 0.5, 0.75, 1].forEach(t => {
    const r = innerR + (outerR - innerR) * t;
    g.append('circle').attr('r', r)
      .attr('fill', 'none')
      .attr('stroke', 'rgba(255,255,255,0.06)')
      .attr('stroke-dasharray', '3,5');
  });

  g.append('text').attr('x', 5).attr('y', -outerR + 12)
    .attr('fill', 'rgba(255,255,255,0.22)')
    .style('font-family', 'Space Mono,monospace')
    .style('font-size', Math.max(8, size * 0.018) + 'px')
    .text(statDef.fmt(globalMax));

  g.append('text').attr('x', 5).attr('y', -(innerR + (outerR - innerR) * 0.5) + 12)
    .attr('fill', 'rgba(255,255,255,0.15)')
    .style('font-family', 'Space Mono,monospace')
    .style('font-size', Math.max(7, size * 0.015) + 'px')
    .text(statDef.fmt(globalMax * 0.5));

  const superBandW = (Math.PI * 2) / years.length;
  const padding    = 0.08;
  const subPadding = 0.04;
  const usable     = superBandW * (1 - padding);
  const subBandW   = (usable / leagues.length) * (1 - subPadding);

  const arcGen = d3.arc();

  // Centre
  g.append('circle').attr('r', innerR - 2).attr('fill', '#080808');

  const centerVal = g.append('text')
    .attr('text-anchor', 'middle').attr('y', -size * 0.036)
    .style('font-family', 'Oswald,sans-serif')
    .style('font-size', Math.max(16, size * 0.048) + 'px')
    .style('font-weight', '700')
    .attr('fill', 'rgba(255,255,255,0.15)')
    .text('—');

  const centerYr = g.append('text')
    .attr('text-anchor', 'middle').attr('y', size * 0.012)
    .attr('fill', 'rgba(255,255,255,0.2)')
    .style('font-family', 'Space Mono,monospace')
    .style('font-size', Math.max(7, size * 0.015) + 'px')
    .text('survole');

  const centerLg = g.append('text')
    .attr('text-anchor', 'middle').attr('y', size * 0.042)
    .attr('fill', 'rgba(255,255,255,0.18)')
    .style('font-family', 'Space Mono,monospace')
    .style('font-size', Math.max(6, size * 0.013) + 'px')
    .text('un bâton');

  g.append('text')
    .attr('text-anchor', 'middle').attr('y', size * 0.072)
    .attr('fill', 'rgba(255,255,255,0.12)')
    .style('font-family', 'Space Mono,monospace')
    .style('font-size', Math.max(6, size * 0.012) + 'px')
    .text(statDef.unit + ' · échelle absolue');

  // Barres
  leagues.forEach((lg, lgIdx) => {
    const color = LEAGUES[lg]?.color || '#999';
    const flag  = LEAGUES[lg]?.flag  || '';
    const data  = allData[lg];

    data.forEach((d, yearIdx) => {
      const superStart  = yearIdx * superBandW + (superBandW * padding) / 2;
      const subStart    = superStart + lgIdx * (subBandW + subBandW * subPadding);
      const startAngle  = subStart;
      const endAngle    = subStart + subBandW;
      const outerRadius = Math.max(innerR + 1, radScale(d.value));

      const bar = g.append('path')
        .attr('d', arcGen({ innerRadius: innerR, outerRadius: innerR + 0.5, startAngle, endAngle }))
        .attr('fill', hexToRgba(color, 0.8))
        .attr('stroke', color).attr('stroke-width', 0.3)
        .style('cursor', 'pointer');

      bar.transition().duration(800).delay(yearIdx * 8 + lgIdx * 40).ease(d3.easeCubicOut)
        .attr('d', arcGen({ innerRadius: innerR, outerRadius, startAngle, endAngle }));

      bar
        .on('mouseenter', function() {
          d3.select(this).attr('fill', hexToRgba(color, 1)).attr('stroke-width', 1.2);
          centerVal.attr('fill', color).text(statDef.fmt(d.value));
          centerYr.attr('fill', 'rgba(255,255,255,0.45)').text(d.year);
          centerLg.attr('fill', color).text(`${flag} ${lg}`);
        })
        .on('mouseleave', function() {
          d3.select(this).attr('fill', hexToRgba(color, 0.8)).attr('stroke-width', 0.3);
          centerVal.attr('fill', 'rgba(255,255,255,0.15)').text('—');
          centerYr.attr('fill', 'rgba(255,255,255,0.2)').text('survole');
          centerLg.attr('fill', 'rgba(255,255,255,0.18)').text('un bâton');
        });
    });
  });

  // Labels années
  const labelR   = outerR + 14;
  const labelYrs = [1990, 1995, 2000, 2005, 2010, 2015, 2020, 2026];

  years.filter(yr => labelYrs.includes(yr)).forEach(yr => {
    const yearIdx = years.indexOf(yr);
    const mid     = yearIdx * superBandW + superBandW / 2;
    const svgA    = mid - Math.PI / 2;
    const x = Math.cos(svgA) * labelR;
    const y = Math.sin(svgA) * labelR;
    let rot = mid * 180 / Math.PI;
    if (mid > Math.PI) rot -= 180;
    g.append('text').attr('x', x).attr('y', y)
      .attr('text-anchor', 'middle').attr('dominant-baseline', 'middle')
      .attr('fill', 'rgba(255,255,255,0.38)')
      .style('font-family', 'Space Mono,monospace')
      .style('font-size', Math.max(6, size * 0.013) + 'px')
      .attr('transform', `rotate(${rot},${x},${y})`).text(yr);
  });

  // Légende sous le graphe
  const legG    = svg.append('g').attr('transform', `translate(${W / 2}, ${H - 14})`);
  const legW    = Math.min(W - 40, leagues.length * 90);
  const legStep = legW / leagues.length;

  leagues.forEach((lg, i) => {
    const color = LEAGUES[lg]?.color || '#999';
    const flag  = LEAGUES[lg]?.flag  || '';
    const x     = -legW / 2 + i * legStep + legStep / 2;
    legG.append('circle').attr('cx', x - 24).attr('cy', 0).attr('r', 4).attr('fill', color);
    legG.append('text').attr('x', x - 16).attr('y', 4)
      .attr('fill', 'rgba(255,255,255,0.45)')
      .style('font-family', 'Space Mono,monospace').style('font-size', '8px')
      .text(`${flag} ${lg.split(' ')[0]}`);
  });
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

export function mkProgressDots(dotsId, stats, currentIdx, onClickFn) {
  const c = document.getElementById(dotsId);
  if (!c) return;
  c.innerHTML = '';
  stats.forEach((_, i) => {
    const b = document.createElement('button');
    b.className = 'spd' + (i === currentIdx ? ' active' : '');
    b.title = stats[i].title;
    b.addEventListener('click', () => onClickFn(i));
    c.appendChild(b);
  });
}

export function syncProgressDots(dotsId, idx) {
  document.querySelectorAll(`#${dotsId} .spd`).forEach((b, i) => b.classList.toggle('active', i === idx));
}

export function mkScrollSelector(containerId, activeLeagues, onUpdate) {
  const { LEAGUES, swissMode } = store;
  const c = document.getElementById(containerId);
  if (!c) return;

  const label = swissMode
    ? '🌍 Comparer les championnats (mode Suisse)'
    : '🌍 Sélectionner un championnat';

  c.innerHTML = `<div class="cs-label">${label}</div>`;

  Object.entries(LEAGUES)
    .filter(([n]) => n !== 'Swiss SL' || swissMode)
    .forEach(([name, info]) => {
      const b  = document.createElement('button');
      const on = activeLeagues.has(name);
      b.className             = 'cpill-s' + (on ? ' on' : '');
      b.style.borderColor     = info.color;
      b.style.color           = on ? '#fff' : info.color;
      b.style.backgroundColor = on ? info.color : 'transparent';
      b.innerHTML = `<span>${info.flag}</span>${name}`;

      b.addEventListener('click', () => {
        if (swissMode) {
          if (activeLeagues.has(name)) {
            if (activeLeagues.size > 1) activeLeagues.delete(name);
          } else {
            activeLeagues.add(name);
          }
        } else {
          activeLeagues.clear();
          activeLeagues.add(name);
        }
        onUpdate();
      });
      c.appendChild(b);
    });
}