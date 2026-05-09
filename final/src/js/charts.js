import { store } from './store.js';
import { mkTooltip, onEnter, fmtM, fmtE } from './utils.js';

export function mkRadar(active, onChange) {
  const { d3, LEAGUES, COUNTRIES, swissMode } = store;
  const c = document.getElementById('radar-chart');
  if (!c) return;
  c.innerHTML = '';

  const dims = ['Abos TV', 'Billet moyen', 'Maillot', 'Budget saison', 'Accessibilité'];

  const radarDetails = Object.entries(COUNTRIES)
    .filter(([, d]) => d.league !== 'Swiss SL' || swissMode)
    .map(([country, d]) => {
      const fanBudget   = d.ticket * 17 + d.jersey + d.tvSubFull * 12;
      const monthSalary = d.avgSalary / 12;
      const pctSalary   = (fanBudget / monthSalary) * 100;
      const accessScore = Math.min(100, Math.max(0, Math.round((130 - pctSalary) / 1.2)));
      return {
        name: d.league, country, color: d.color,
        tvSub: d.tvSubFull, ticket: d.ticket, jersey: d.jersey,
        fanBudget, avgSalary: d.avgSalary,
        monthSalary: Math.round(monthSalary),
        pctSalary: Math.round(pctSalary),
        accessScore, vals: null
      };
    });

  const mTV = Math.max(...radarDetails.map(d => d.tvSub));
  const mT  = Math.max(...radarDetails.map(d => d.ticket));
  const mJ  = Math.max(...radarDetails.map(d => d.jersey));
  const mB  = Math.max(...radarDetails.map(d => d.fanBudget));
  radarDetails.forEach(d => {
    d.vals = [
      d.tvSub / mTV * 100,
      d.ticket / mT * 100,
      d.jersey / mJ * 100,
      d.fanBudget / mB * 100,
      d.accessScore
    ];
  });

  const size = 480;
  const cx = size / 2, cy = size / 2, R = size * 0.32, N = dims.length;
  const ang = i => (Math.PI * 2 * i) / N - Math.PI / 2;

  const svg = d3.select(c).append('svg')
    .attr('viewBox', `0 0 ${size} ${size}`)
    .style('width', size + 'px').style('height', size + 'px')
    .style('display', 'block').style('margin', '0 auto');

  for (let l = 1; l <= 5; l++) {
    const r   = (R / 5) * l;
    const pts = dims.map((_, i) => { const a = ang(i); return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`; }).join(' ');
    svg.append('polygon').attr('points', pts).attr('fill', 'none').attr('stroke', 'var(--border)').attr('stroke-width', 1);
  }

  dims.forEach((d, i) => {
    const a = ang(i);
    svg.append('line').attr('x1', cx).attr('y1', cy).attr('x2', cx + R * Math.cos(a)).attr('y2', cy + R * Math.sin(a)).attr('stroke', 'var(--border)').attr('stroke-width', 1);
    const lr = R * 1.28;
    svg.append('text').attr('x', cx + lr * Math.cos(a)).attr('y', cy + lr * Math.sin(a))
      .attr('text-anchor', 'middle').attr('dominant-baseline', 'middle')
      .attr('fill', 'var(--muted)').style('font-family', 'Barlow,sans-serif').style('font-size', '12px').text(d);
  });

  svg.append('text').attr('x', size - 6).attr('y', size - 6).attr('text-anchor', 'end')
    .attr('fill', 'var(--muted)').style('font-family', 'Barlow,sans-serif').style('font-size', '12px').text('données 2026');

  const polys = {};

  radarDetails.forEach((lg, idx) => {
    const pts = lg.vals.map((v, i) => { const r = (v / 100) * R, a = ang(i); return [cx + r * Math.cos(a), cy + r * Math.sin(a)]; });
    const poly = svg.append('polygon')
      .attr('points', pts.map(p => p.join(',')).join(' '))
      .attr('fill', `${lg.color}22`).attr('stroke', lg.color).attr('stroke-width', 2)
      .attr('opacity', active.has(lg.name) ? 1 : 0).style('cursor', 'pointer');
    polys[lg.name] = poly;

    if (active.has(lg.name)) {
      poly.attr('opacity', 0).transition().duration(500).delay(idx * 70).attr('opacity', 1);
    }
  });

  const le = document.getElementById('radar-legend');
  if (le) {
    le.innerHTML = '';
    radarDetails.forEach(lg => {
      const it = document.createElement('div');
      it.className = 'rl-item' + (active.has(lg.name) ? '' : ' dim');
      it.innerHTML = `<div class="rl-dot" style="background:${lg.color}"></div><div class="rl-name">${lg.name}</div>`;
      it.addEventListener('click', () => {
        const isA = active.has(lg.name);
        if (isA && active.size > 1) { active.delete(lg.name); it.classList.add('dim'); polys[lg.name].attr('opacity', 0); }
        else if (!isA) { active.add(lg.name); it.classList.remove('dim'); polys[lg.name].attr('opacity', 1); }
        if (onChange) onChange(false);
      });
      le.appendChild(it);
    });
  }

  return {
    syncPolys() {
      radarDetails.forEach(lg => { polys[lg.name].attr('opacity', active.has(lg.name) ? 1 : 0); });
      if (le) { le.querySelectorAll('.rl-item').forEach((it, i) => { it.classList.toggle('dim', !active.has(radarDetails[i].name)); }); }
    }
  };
}

export function mkAccessChart(active) {
  const { d3, LEAGUES, TICKET, JERSEY, TV_SUB_FULL, AVG_SALARY_TS } = store;
  const c = document.getElementById('access-chart');
  if (!c) return;
  c.innerHTML = '';

  const years = d3.range(1990, 2027);

  function buildSeries(lg) {
    return years.map(yr => {
      const t   = (TICKET[lg]        || []).find(d => d.year === yr)?.value || 0;
      const j   = (JERSEY[lg]        || []).find(d => d.year === yr)?.value || 0;
      const s   = (TV_SUB_FULL[lg]   || []).find(d => d.year === yr)?.value || 0;
      const sal = (AVG_SALARY_TS[lg] || []).find(d => d.year === yr)?.value || 30000;
      const fb  = t * 17 + j + s * 12;
      const pct = (fb / (sal / 12)) * 100;
      return { year: yr, value: Math.min(100, Math.max(0, Math.round((130 - pct) / 1.2))), fanBudget: Math.round(fb), pct: Math.round(pct) };
    });
  }

  const dataset = {};
  ['Premier League', 'La Liga', 'Bundesliga', 'Serie A', 'Ligue 1', 'Swiss SL']
    .filter(lg => active.has(lg))
    .forEach(lg => { dataset[lg] = buildSeries(lg); });

  const W   = Math.max(c.offsetWidth || 800, 280);
  const H   = 320;
  const mob = window.innerWidth < 640;
  const M   = mob ? { top: 20, right: 14, bottom: 38, left: 44 } : { top: 20, right: 116, bottom: 38, left: 52 };
  const iW  = W - M.left - M.right;
  const iH  = H - M.top - M.bottom;

  const svg = d3.select(c).append('svg')
    .attr('viewBox', `0 0 ${W} ${H}`)
    .attr('preserveAspectRatio', 'xMidYMid meet')
    .style('width', '100%').style('height', 'auto');
  const g = svg.append('g').attr('transform', `translate(${M.left},${M.top})`);
  const x = d3.scaleLinear().domain([1990, 2026]).range([0, iW]);
  const y = d3.scaleLinear().domain([0, 100]).range([iH, 0]);
  const lf = d3.line().x(d => x(d.year)).y(d => y(d.value)).curve(d3.curveCatmullRom.alpha(0.5));

  [{ y: 80, label: 'Très accessible', col: '#2e7d3218' },
   { y: 50, label: 'Accessible',      col: '#e6a81718' },
   { y: 20, label: 'Difficile',       col: '#d32f2f18' }
  ].forEach((z, i, arr) => {
    const y0 = i === 0 ? 0 : y(arr[i - 1].y);
    const y1 = y(z.y);
    g.append('rect').attr('x', 0).attr('y', y1).attr('width', iW).attr('height', y0 - y1).attr('fill', z.col);
    if (!mob) g.append('text').attr('x', iW + 4).attr('y', y(z.y) + 4).attr('fill', 'var(--muted)').style('font-family', 'Barlow,sans-serif').style('font-size', '12px').text(z.label);
  });

  g.append('g').attr('class', 'grid').call(d3.axisLeft(y).ticks(5).tickSize(-iW).tickFormat(''));
  g.append('g').attr('class', 'axis').attr('transform', `translate(0,${iH})`)
    .call(d3.axisBottom(x).tickValues([1990,1995,2000,2005,2010,2015,2020,2026]).tickFormat(d3.format('d')));
  g.append('g').attr('class', 'axis').call(d3.axisLeft(y).ticks(5).tickFormat(d => d));
  svg.append('text').attr('transform', 'rotate(-90)').attr('x', -(M.top + iH / 2)).attr('y', 12)
    .attr('text-anchor', 'middle').attr('fill', 'var(--muted)').style('font-family', 'Barlow,sans-serif').style('font-size', '12px').text("SCORE D'ACCESSIBILITÉ");

  Object.entries(dataset).forEach(([lg, data]) => {
    const color = LEAGUES[lg]?.color || '#999';
    g.append('path').datum(data).attr('fill', 'none').attr('stroke', color).attr('stroke-width', 2.5).attr('d', lf);
  });
}

// ── Corrélation — Base 100 en 1990 ────────────────────────────────────────────
export function mkCorrelationChart(containerId, league) {
  const { d3, LEAGUES, TICKET, JERSEY, TV_SUB_FULL, TV, WAGE_BILL, SPONSOR_REV, STADIUM_REV, MERCH_REV } = store;

  const c = document.getElementById(containerId);
  if (!c) return;
  c.innerHTML = '';

  const color  = LEAGUES[league]?.color || '#2d6a2d';
  const years  = d3.range(1990, 2027);

  const ticket = TICKET[league]      || [];
  const jersey = JERSEY[league]      || [];
  const tvsub  = TV_SUB_FULL[league] || [];
  const tvD    = TV[league]          || [];
  const wgD    = WAGE_BILL[league]   || [];
  const spD    = SPONSOR_REV[league] || [];
  const stD    = STADIUM_REV[league] || [];
  const mcD    = MERCH_REV[league]   || [];

  const budgetRaw = years.map(yr => ({
    year: yr,
    value: Math.round(
      (ticket.find(d => d.year === yr)?.value || 0) * 17 +
      (jersey.find(d => d.year === yr)?.value || 0) +
      (tvsub.find(d => d.year === yr)?.value  || 0) * 12
    )
  }));

  const revenueRaw = years.map(yr => ({
    year: yr,
    value: Math.round(
      (tvD.find(d => d.year === yr)?.value || 0) +
      (wgD.find(d => d.year === yr)?.value || 0) +
      (spD.find(d => d.year === yr)?.value || 0) +
      (stD.find(d => d.year === yr)?.value || 0) +
      (mcD.find(d => d.year === yr)?.value || 0)
    )
  }));

  function toBase100(series, baseYear = 1990) {
    const base = series.find(d => d.year === baseYear)?.value || series[0]?.value;
    if (!base || base === 0) return [];
    return series.filter(d => d.year >= baseYear && d.value > 0).map(d => ({
      year: d.year, value: +((d.value / base) * 100).toFixed(1), rawValue: d.value
    }));
  }

  const bData = toBase100(budgetRaw,  1990);
  const rData = toBase100(revenueRaw, 1990);

  const commonYears = bData.map(d => d.year).filter(yr => rData.some(d => d.year === yr));
  if (commonYears.length < 2) {
    c.innerHTML = '<p style="color:var(--muted);font-family:Barlow,sans-serif;padding:40px;font-size:12px">Données insuffisantes.</p>';
    return;
  }

  const bFilt = bData.filter(d => commonYears.includes(d.year));
  const rFilt = rData.filter(d => commonYears.includes(d.year));

  const W  = c.offsetWidth  || 800;
  const H  = c.offsetHeight || 400;
  const ML = 78, MR = 44, MT = 36, MB = 44;
  const iW = W - ML - MR;
  const iH = H - MT - MB;

  const svg = d3.select(c).append('svg').attr('width', W).attr('height', H).style('display', 'block');
  const g   = svg.append('g').attr('transform', `translate(${ML},${MT})`);

  const allVals = [...bFilt.map(d => d.value), ...rFilt.map(d => d.value)];
  const yMin = 80;
  const yMax = Math.ceil(d3.max(allVals) / 50) * 50 + 50;

  const xScale = d3.scaleLinear().domain([1990, 2026]).range([0, iW]);
  const yScale = d3.scaleLinear().domain([yMin, yMax]).range([iH, 0]);
  const areaGen = d3.area().x(d => xScale(d.year)).y0(yScale(100)).y1(d => yScale(d.value)).curve(d3.curveCatmullRom.alpha(0.5));
  const lineGen = d3.line().x(d => xScale(d.year)).y(d => yScale(d.value)).curve(d3.curveCatmullRom.alpha(0.5));

  // Base 100 line
  const y100 = yScale(100);
  g.append('line').attr('x1', 0).attr('x2', iW).attr('y1', y100).attr('y2', y100)
    .attr('stroke', 'rgba(255,255,255,0.2)').attr('stroke-dasharray', '4,4');
  g.append('text').attr('x', -6).attr('y', y100 + 4).attr('text-anchor', 'end')
    .attr('fill', 'rgba(255,255,255,0.3)').style('font-family', 'Barlow,sans-serif').style('font-size', '12px').text('100');
  g.append('text').attr('x', xScale(1990) + 4).attr('y', y100 - 18)
    .attr('fill', 'rgba(255,255,255,0.2)').style('font-family', 'Barlow,sans-serif').style('font-size', '12px').text('base 1990 = 100');

  // Grid
  yScale.ticks(6).forEach(tick => {
    if (tick === 100) return;
    g.append('line').attr('x1', 0).attr('x2', iW).attr('y1', yScale(tick)).attr('y2', yScale(tick)).attr('stroke', 'rgba(255,255,255,0.04)');
  });

  // Axes
  g.append('g').attr('transform', `translate(0,${iH})`)
    .call(d3.axisBottom(xScale).tickValues([1990,1995,2000,2005,2010,2015,2020,2026]).tickFormat(d => d).tickSize(4))
    .call(ax => ax.select('.domain').attr('stroke', 'rgba(255,255,255,0.1)'))
    .call(ax => ax.selectAll('text').attr('fill', 'rgba(255,255,255,0.35)').style('font-family', 'Barlow,sans-serif').style('font-size', '12px').attr('dy', '1.4em'))
    .call(ax => ax.selectAll('.tick line').attr('stroke', 'rgba(255,255,255,0.1)'));
  g.append('g')
    .call(d3.axisLeft(yScale).ticks(6).tickFormat(d => d).tickSize(4))
    .call(ax => ax.select('.domain').attr('stroke', 'rgba(255,255,255,0.1)'))
    .call(ax => ax.selectAll('text').attr('fill', 'rgba(255,255,255,0.35)').style('font-family', 'Barlow,sans-serif').style('font-size', '12px').attr('dx', '-4px'))
    .call(ax => ax.selectAll('.tick line').attr('stroke', 'rgba(255,255,255,0.1)'));

  // Areas + lines
  g.append('path').datum(bFilt).attr('fill', hexToRgbaC(color, 0.15)).attr('d', areaGen);
  g.append('path').datum(rFilt).attr('fill', 'rgba(255,255,255,0.04)').attr('d', areaGen);
  g.append('path').datum(bFilt).attr('fill', 'none').attr('stroke', color).attr('stroke-width', 2.5).attr('d', lineGen);
  g.append('path').datum(rFilt).attr('fill', 'none').attr('stroke', 'rgba(255,255,255,0.55)').attr('stroke-width', 2).attr('stroke-dasharray', '6,3').attr('d', lineGen);

  // Multiplier labels at 2026
  const last = bFilt[bFilt.length - 1];
  const lastR = rFilt[rFilt.length - 1];
  if (last) g.append('text').attr('x', xScale(last.year) - 8).attr('y', yScale(last.value) - 8)
    .attr('text-anchor', 'end').attr('fill', color).style('font-family', 'Barlow,sans-serif').style('font-size', '12px').style('font-weight', '700').text(`×${(last.value / 100).toFixed(1)}`);
  if (lastR) g.append('text').attr('x', xScale(lastR.year) - 8).attr('y', yScale(lastR.value) + 18)
    .attr('text-anchor', 'end').attr('fill', 'rgba(255,255,255,0.55)').style('font-family', 'Barlow,sans-serif').style('font-size', '12px').style('font-weight', '700').text(`×${(lastR.value / 100).toFixed(1)}`);

  // Légende
  const leg = g.append('g').attr('transform', `translate(12, 10)`);
  leg.append('rect').attr('x', -8).attr('y', -6).attr('width', 230).attr('height', 58)
    .attr('rx', 6).attr('fill', 'rgba(0,0,0,0.6)').attr('stroke', 'rgba(255,255,255,0.08)');
  leg.append('line').attr('x1', 0).attr('x2', 22).attr('y1', 10).attr('y2', 10).attr('stroke', color).attr('stroke-width', 2.5);
  leg.append('text').attr('x', 28).attr('y', 14).attr('fill', 'rgba(255,255,255,0.65)').style('font-family', 'Barlow,sans-serif').style('font-size', '12px').text('Budget supporter');
  leg.append('line').attr('x1', 0).attr('x2', 22).attr('y1', 34).attr('y2', 34).attr('stroke', 'rgba(255,255,255,0.55)').attr('stroke-width', 2).attr('stroke-dasharray', '6,3');
  leg.append('text').attr('x', 28).attr('y', 38).attr('fill', 'rgba(255,255,255,0.65)').style('font-family', 'Barlow,sans-serif').style('font-size', '12px').text('Revenus ligue');

  svg.append('text').attr('transform', 'rotate(-90)').attr('x', -(MT + iH / 2)).attr('y', 16)
    .attr('text-anchor', 'middle').attr('fill', 'rgba(255,255,255,0.2)').style('font-family', 'Barlow,sans-serif').style('font-size', '12px').text('INDICE BASE 100 (1990)');
}

function hexToRgbaC(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}