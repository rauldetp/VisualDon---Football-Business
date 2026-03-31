import { store } from './store.js';
import { mkTooltip, onEnter, fmtM, fmtE } from './utils.js';

export function mkRadar(active, onChange) {
  const { d3, LEAGUES, COUNTRIES, swissMode } = store;
  const c = document.getElementById('radar-chart');
  if (!c) return;
  c.innerHTML = '';

  const dims = ['Abos TV', 'Billet moyen', 'Maillot', 'Budget saison', 'Accessibilit\u00e9'];

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
    .style('width', size + 'px')
    .style('height', size + 'px')
    .style('display', 'block')
    .style('margin', '0 auto');

  for (let l = 1; l <= 5; l++) {
    const r   = (R / 5) * l;
    const pts = dims.map((_, i) => {
      const a = ang(i);
      return `${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`;
    }).join(' ');
    svg.append('polygon').attr('points', pts).attr('fill', 'none').attr('stroke', 'var(--border)').attr('stroke-width', 1);
  }

  dims.forEach((d, i) => {
    const a = ang(i);
    svg.append('line')
      .attr('x1', cx).attr('y1', cy)
      .attr('x2', cx + R * Math.cos(a)).attr('y2', cy + R * Math.sin(a))
      .attr('stroke', 'var(--border)').attr('stroke-width', 1);
    const lr = R * 1.28;
    svg.append('text')
      .attr('x', cx + lr * Math.cos(a)).attr('y', cy + lr * Math.sin(a))
      .attr('text-anchor', 'middle').attr('dominant-baseline', 'middle')
      .attr('fill', 'var(--muted)')
      .style('font-family', 'Space Mono,monospace')
      .style('font-size', '11px')
      .text(d);
  });

  svg.append('text')
    .attr('x', size - 6).attr('y', size - 6).attr('text-anchor', 'end')
    .attr('fill', 'var(--muted)')
    .style('font-family', 'Space Mono,monospace')
    .style('font-size', '8px')
    .text('donn\u00e9es 2026');

  const tooltip = mkTooltip();
  const polys   = {};

  radarDetails.forEach((lg, idx) => {
    const pts = lg.vals.map((v, i) => {
      const r = (v / 100) * R, a = ang(i);
      return [cx + r * Math.cos(a), cy + r * Math.sin(a)];
    });
    const poly = svg.append('polygon')
      .attr('points', pts.map(p => p.join(',')).join(' '))
      .attr('fill', `${lg.color}22`)
      .attr('stroke', lg.color)
      .attr('stroke-width', 2)
      .attr('opacity', active.has(lg.name) ? 1 : 0)
      .style('cursor', 'pointer');
    polys[lg.name] = poly;

    poly.on('mousemove', function(event) {
      const bar = '\u2588'.repeat(Math.round(lg.accessScore / 10)) + '\u2591'.repeat(10 - Math.round(lg.accessScore / 10));
      tooltip.show(
        `<div class="tt-yr" style="color:${lg.color}">${LEAGUES[lg.name]?.flag || ''} ${lg.name} \u00b7 2026</div>` +
        `<div class="tt-row"><span class="tt-n">\uD83D\uDCFA Abos TV</span><span>${lg.tvSub} \u20ac/mois</span></div>` +
        `<div class="tt-row"><span class="tt-n">\uD83C\uDFAB Billet moyen</span><span>${lg.ticket} \u20ac</span></div>` +
        `<div class="tt-row"><span class="tt-n">\uD83D\uDC55 Maillot</span><span>${lg.jersey} \u20ac</span></div>` +
        `<div class="tt-row"><span class="tt-n">\uD83D\uDCB0 Budget saison</span><span>${lg.fanBudget} \u20ac</span></div>` +
        `<div style="margin-top:6px;padding-top:6px;border-top:1px solid rgba(255,255,255,.15)">` +
        `<div class="tt-row"><span class="tt-n">\uD83D\uDCBC Salaire mensuel moy.</span><span>${lg.monthSalary.toLocaleString('fr')} \u20ac</span></div>` +
        `<div class="tt-row"><span class="tt-n">\uD83D\uDCCA Budget / salaire</span><span>${lg.pctSalary}%</span></div>` +
        `<div style="font-family:monospace;font-size:9px;color:${lg.accessScore > 60 ? 'var(--green-v)' : lg.accessScore > 35 ? 'var(--gold)' : '#ef5350'};letter-spacing:1px;margin-top:4px">${bar} ${lg.accessScore}/100</div>` +
        `</div>`,
        event
      );
    }).on('mouseleave', () => tooltip.hide());

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
      it.innerHTML = `<div class="rl-dot" style="background:${lg.color}"></div><div class="rl-name">${lg.league}</div>`;
      it.addEventListener('click', () => {
        const isA = active.has(lg.name);
        if (isA && active.size > 1) {
          active.delete(lg.name); it.classList.add('dim'); polys[lg.name].attr('opacity', 0);
        } else if (!isA) {
          active.add(lg.name); it.classList.remove('dim'); polys[lg.name].attr('opacity', 1);
        }
        if (onChange) onChange(false);
      });
      le.appendChild(it);
    });
  }

  return {
    syncPolys() {
      radarDetails.forEach(lg => {
        polys[lg.name].attr('opacity', active.has(lg.name) ? 1 : 0);
      });
      if (le) {
        le.querySelectorAll('.rl-item').forEach((it, i) => {
          it.classList.toggle('dim', !active.has(radarDetails[i].name));
        });
      }
    }
  };
}

export function mkAccessChart(active) {
  const { d3, LEAGUES, TICKET, JERSEY, TV_SUB_FULL, AVG_SALARY_TS } = store;
  const tooltip = mkTooltip();
  const c = document.getElementById('access-chart');
  if (!c) return;
  c.innerHTML = '';

  const years = d3.range(1990, 2027);

  function buildSeries(lg) {
    return years.map(yr => {
      const t  = (TICKET[lg] || []).find(d => d.year === yr)?.value || 0;
      const j  = (JERSEY[lg] || []).find(d => d.year === yr)?.value || 0;
      const s  = (TV_SUB_FULL[lg] || []).find(d => d.year === yr)?.value || 0;
      const fb = t * 17 + j + s * 12;
      const sal   = (AVG_SALARY_TS[lg] || []).find(d => d.year === yr)?.value || 30000;
      const pct   = (fb / (sal / 12)) * 100;
      const score = Math.min(100, Math.max(0, Math.round((130 - pct) / 1.2)));
      return { year: yr, value: score, fanBudget: Math.round(fb), pct: Math.round(pct) };
    });
  }

  const dataset = {};
  ['Premier League', 'La Liga', 'Bundesliga', 'Serie A', 'Ligue 1', 'Swiss SL']
    .filter(lg => active.has(lg))
    .forEach(lg => { dataset[lg] = buildSeries(lg); });

  const W   = Math.max(c.offsetWidth || 800, 280);
  const H   = 300;
  const mob = window.innerWidth < 640;
  const M   = mob ? { top:14, right:14, bottom:38, left:44 } : { top:14, right:100, bottom:38, left:52 };
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

  [{ y:80, label:'Tr\u00e8s accessible', col:'#2e7d3218' },
   { y:50, label:'Accessible',           col:'#e6a81718' },
   { y:20, label:'Difficile',            col:'#d32f2f18' }
  ].forEach((z, i, arr) => {
    const y0 = i === 0 ? 0 : y(arr[i - 1].y);
    const y1 = y(z.y);
    g.append('rect').attr('x', 0).attr('y', y1).attr('width', iW).attr('height', y0 - y1).attr('fill', z.col);
    g.append('text').attr('x', iW + 4).attr('y', y(z.y) + 4).attr('fill', 'var(--muted)').style('font-family', 'Space Mono,monospace').style('font-size', '7px').text(z.label);
  });

  g.append('g').attr('class', 'grid').call(d3.axisLeft(y).ticks(5).tickSize(-iW).tickFormat(''));
  g.append('g').attr('class', 'axis').attr('transform', `translate(0,${iH})`).call(d3.axisBottom(x).ticks(mob ? 5 : 9).tickFormat(d3.format('d')));
  g.append('g').attr('class', 'axis').call(d3.axisLeft(y).ticks(5).tickFormat(d => d));
  svg.append('text').attr('transform', 'rotate(-90)').attr('x', -(M.top + iH / 2)).attr('y', 12)
    .attr('text-anchor', 'middle').attr('fill', 'var(--muted)')
    .style('font-family', 'Space Mono,monospace').style('font-size', '8px')
    .text("SCORE D'ACCESSIBILIT\u00c9");

  const ch = g.append('line').attr('y1', 0).attr('y2', iH)
    .attr('stroke', 'rgba(0,0,0,.1)').attr('stroke-width', 1).attr('stroke-dasharray', '3,3').style('display', 'none');

  Object.entries(dataset).forEach(([lg, data]) => {
    const color = LEAGUES[lg]?.color || '#999';
    g.append('path').datum(data).attr('fill', 'none').attr('stroke', color).attr('stroke-width', 2.5).attr('d', lf);
    if (!mob) {
      const last = data[data.length - 1];
      g.append('text').attr('x', x(last.year) + 7).attr('y', y(last.value) + 4)
        .attr('fill', color).style('font-family', 'Space Mono,monospace').style('font-size', '7.5px')
        .text(lg.split(' ')[0]);
    }
  });

  svg.append('rect').attr('width', W).attr('height', H).attr('fill', 'none').attr('pointer-events', 'all')
    .on('mousemove', function(event) {
      const [mx] = d3.pointer(event, g.node());
      const yr   = Math.round(x.invert(mx));
      if (yr < 1990 || yr > 2026) { tooltip.hide(); ch.style('display', 'none'); return; }
      ch.style('display', null).attr('x1', mx).attr('x2', mx);
      const rows = Object.entries(dataset).map(([lg, data]) => {
        const pt = data.find(d => d.year === yr);
        if (!pt) return '';
        const bar = '\u2588'.repeat(Math.round(pt.value / 10)) + '\u2591'.repeat(10 - Math.round(pt.value / 10));
        return `<div class="tt-row" style="flex-direction:column;gap:1px;padding:3px 0;border-bottom:1px solid rgba(255,255,255,.1)">
          <div style="display:flex;justify-content:space-between">
            <span class="tt-n" style="color:${LEAGUES[lg]?.color}">${LEAGUES[lg]?.flag} ${lg}</span>
            <span style="font-weight:700">${pt.value}/100</span>
          </div>
          <div style="font-family:monospace;font-size:8px;color:${pt.value > 60 ? 'var(--green-v)' : pt.value > 35 ? 'var(--gold)' : '#ef5350'}">${bar}</div>
          <div style="font-size:8px;opacity:.6">Budget: ${pt.fanBudget}\u20ac \u00b7 ${pt.pct}% du salaire/mois</div>
        </div>`;
      }).join('');
      tooltip.show(`<div class="tt-yr">${yr}</div>${rows}`, event);
    })
    .on('mouseleave', () => { tooltip.hide(); ch.style('display', 'none'); });
}
