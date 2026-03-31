import { store } from './store.js';
import { mkTooltip, fmtM } from './utils.js';

export async function mkMap() {
  const { d3, LEAGUES, COUNTRIES, CLUB_COORDS, TV_EXT, TICKET_EXT, JERSEY_EXT, WAGE_BILL, SPONSOR_REV, STADIUM_REV, MERCH_REV, TV_SUB_FULL } = store;
  const c  = document.getElementById('map-container');
  const pd = document.getElementById('p-data');
  if (!c || !pd) return;

  const W    = c.offsetWidth || 840;
  const H    = 590;
  const svg  = d3.select(c).append('svg').attr('viewBox', `0 0 ${W} ${H}`).style('width', '100%').style('height', '100%');
  const proj = d3.geoMercator().center([8, 50]).scale(W * 0.78).translate([W / 2, H / 2]);
  const path = d3.geoPath().projection(proj);

  svg.append('defs').append('clipPath').attr('id', 'map-clip').append('rect').attr('width', W).attr('height', H);
  const g    = svg.append('g').attr('clip-path', 'url(#map-clip)');
  const zoom = d3.zoom().scaleExtent([1, 10]).on('zoom', e => g.attr('transform', e.transform));
  svg.call(zoom);

  let world;
  try {
    world = await fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json').then(r => r.json());
  } catch(e) {
    pd.innerHTML = '<p style="padding:20px;color:var(--muted);font-family:Space Mono,monospace;font-size:11px">Connexion internet requise pour la carte.</p>';
    return;
  }

  const ts = document.createElement('script');
  ts.src   = 'https://cdn.jsdelivr.net/npm/topojson-client@3/dist/topojson-client.min.js';
  document.head.appendChild(ts);
  await new Promise(res => { ts.onload = res; });

  const geo    = topojson.feature(world, world.objects.countries);
  const isoMap = Object.fromEntries(Object.entries(COUNTRIES).map(([n, d]) => [d.iso, n]));

  function inEurope(feature) {
    try {
      const [cLon, cLat] = d3.geoCentroid(feature);
      if (isNaN(cLon) || isNaN(cLat)) return false;
      if (cLon < -26 || cLon > 50)    return false;
      if (cLat < 27  || cLat > 72)    return false;
      const [px, py] = path.centroid(feature);
      if (isNaN(px) || isNaN(py)) return false;
      return px > -W * 0.05 && px < W * 1.05 && py > -H * 0.05 && py < H * 1.05;
    } catch { return false; }
  }

  const feats  = geo.features.filter(inEurope);
  let   sel    = null;
  const mapTT  = mkTooltip();
  const clubsG = g.append('g').attr('class', 'clubs-layer');

  g.selectAll('path.cp').data(feats).enter().append('path').attr('class', 'cp')
    .attr('d', path)
    .attr('fill', d => {
      const n = isoMap[String(d.id)];
      return (n && (n !== 'Switzerland' || store.swissMode)) ? `${COUNTRIES[n].color}44` : '#c5dbbf';
    })
    .attr('stroke', d => {
      const n = isoMap[String(d.id)];
      return (n && (n !== 'Switzerland' || store.swissMode)) ? COUNTRIES[n].color : 'rgba(155,185,150,.45)';
    })
    .attr('stroke-width', d => {
      const n = isoMap[String(d.id)];
      return (n && (n !== 'Switzerland' || store.swissMode)) ? 1.5 : 0.4;
    })
    .style('cursor', d => {
      const n = isoMap[String(d.id)];
      return (n && (n !== 'Switzerland' || store.swissMode)) ? 'pointer' : 'default';
    })
    .on('mouseenter', function(e, d) {
      const n = isoMap[String(d.id)];
      if (!n || n === sel) return;
      if (n === 'Switzerland' && !store.swissMode) return;
      d3.select(this).attr('fill', `${COUNTRIES[n].color}70`);
      const info = COUNTRIES[n];
      mapTT.show(
        `<div class="tt-yr">${LEAGUES[info.league]?.flag || ''} ${n}</div>` +
        `<div class="tt-row"><span class="tt-n">Ligue</span><span>${info.league}</span></div>` +
        `<div class="tt-row"><span class="tt-n">Droits TV</span><span>${fmtM(info.tv)}</span></div>` +
        `<div style="margin-top:5px;font-size:8px;opacity:.5;font-family:'Space Mono',monospace">Cliquer pour explorer \u2192</div>`,
        e
      );
    })
    .on('mousemove', function(e, d) {
      const n = isoMap[String(d.id)];
      if (n && n !== sel && (n !== 'Switzerland' || store.swissMode)) mapTT.mv(e);
    })
    .on('mouseleave', function(e, d) {
      const n = isoMap[String(d.id)];
      if (!n || n === sel) return;
      if (n === 'Switzerland' && !store.swissMode) { mapTT.hide(); return; }
      d3.select(this).attr('fill', `${COUNTRIES[n].color}44`);
      mapTT.hide();
    })
    .on('click', function(e, d) {
      const n = isoMap[String(d.id)];
      if (!n) return;
      if (n === 'Switzerland' && !store.swissMode) return;
      mapTT.hide();
      if (sel) g.selectAll('path.cp').filter(dd => isoMap[String(dd.id)] === sel).attr('fill', `${COUNTRIES[sel].color}44`);
      sel = n;
      d3.select(this).attr('fill', `${COUNTRIES[n].color}80`);
      zoomToCountry(d);
      showClubDots(n);
      openPanel(n);
      updPills(n);
      const hint = document.getElementById('map-hint');
      if (hint) hint.classList.add('hidden');
    });

  g.selectAll('path.cp').filter(d => String(d.id) === '756')
    .on('mouseenter.swiss', function(e) {
      if (!store.swissMode || sel === 'Switzerland') return;
      const info = COUNTRIES.Switzerland;
      d3.select(this).attr('fill', `${info.color}70`);
      mapTT.show(
        `<div class="tt-yr">${LEAGUES[info.league]?.flag || ''} Switzerland</div>` +
        `<div class="tt-row"><span class="tt-n">Ligue</span><span>${info.league}</span></div>` +
        `<div class="tt-row"><span class="tt-n">Droits TV</span><span>${fmtM(info.tv)}</span></div>`,
        e
      );
    })
    .on('mousemove.swiss', function(e) { if (store.swissMode && sel !== 'Switzerland') mapTT.mv(e); })
    .on('mouseleave.swiss', function() {
      if (!store.swissMode || sel === 'Switzerland') return;
      d3.select(this).attr('fill', `${COUNTRIES.Switzerland.color}44`);
      mapTT.hide();
    });

  const metroLonLat = { "250": [[-5.1,42.3],[8.2,51.1]], "724": [[-9.3,35.9],[4.3,43.8]] };

  function showClubDots(countryName) {
    clubsG.selectAll('*').remove();
    const coords = CLUB_COORDS[countryName];
    if (!coords) return;
    const info = COUNTRIES[countryName];
    coords.forEach(([name, lon, lat]) => {
      const [px, py] = proj([lon, lat]);
      const dot = clubsG.append('g').attr('transform', `translate(${px},${py})`).style('pointer-events', 'none');
      dot.append('circle').attr('r', 7).attr('fill', `${info.color}22`).attr('stroke', `${info.color}55`).attr('stroke-width', 1);
      dot.append('circle').attr('r', 3.5).attr('fill', info.color).attr('stroke', '#fff').attr('stroke-width', 1.2)
        .attr('opacity', 0).transition().duration(350).delay(Math.random() * 250).attr('opacity', 1);
    });
  }

  function hideClubDots() { clubsG.selectAll('*').remove(); }

  function zoomToCountry(feature) {
    const override = metroLonLat[String(feature.id)];
    let x0, y0, x1, y1;
    if (override) {
      const [p0, p1] = override.map(ll => proj(ll));
      x0 = p0[0]; y0 = p0[1]; x1 = p1[0]; y1 = p1[1];
    } else {
      [[x0,y0],[x1,y1]] = path.bounds(feature);
    }
    const sc = Math.min(8, 0.82 / Math.max((x1 - x0) / W, (y1 - y0) / H));
    svg.transition().duration(680).call(
      zoom.transform,
      d3.zoomIdentity.translate(W / 2 - sc * (x0 + x1) / 2, H / 2 - sc * (y0 + y1) / 2).scale(sc)
    );
  }

  function miniSpkInline(container, data, color) {
    if (!container || !data || !data.length) return;
    const w  = container.offsetWidth || 230;
    const h  = 52;
    const sv = d3.select(container).append('svg').attr('viewBox', `0 0 ${w} ${h}`).style('width', '100%').style('height', h + 'px');
    const x  = d3.scaleLinear().domain(d3.extent(data, d => d.year)).range([0, w]);
    const y  = d3.scaleLinear().domain([0, d3.max(data, d => d.value)]).range([h - 2, 2]);
    sv.append('g').selectAll('line').data(y.ticks(3)).enter().append('line')
      .attr('x1', 0).attr('x2', w).attr('y1', d => y(d)).attr('y2', d => y(d))
      .attr('stroke', 'var(--border)').attr('stroke-dasharray', '2,3');
    sv.append('path').datum(data).attr('fill', `${color}20`)
      .attr('d', d3.area().x(d => x(d.year)).y0(h).y1(d => y(d.value)).curve(d3.curveCatmullRom.alpha(0.5)));
    sv.append('path').datum(data).attr('fill', 'none').attr('stroke', color).attr('stroke-width', 2)
      .attr('d', d3.line().x(d => x(d.year)).y(d => y(d.value)).curve(d3.curveCatmullRom.alpha(0.5)));
    [1980,1990,2000,2010,2020,2026].forEach(yr => {
      sv.append('text').attr('x', x(yr)).attr('y', h - 1).attr('text-anchor', 'middle')
        .attr('fill', 'var(--muted)').style('font-family', 'Space Mono,monospace').style('font-size', '7px').text(yr);
    });
  }

  function openPanel(name) {
    const info  = COUNTRIES[name];
    const lg    = info.league;
    const color = info.color;

    const fanStats = [
      { icon:'\uD83C\uDFAB', label:'Billet moyen',            val:`${info.ticket} \u20ac`,        data: TICKET_EXT[lg] },
      { icon:'\uD83D\uDCFA', label:'Abos TV (toutes comp\u00e9t.)', val:`${info.tvSubFull} \u20ac/mois`, data: TV_SUB_FULL[lg] },
      { icon:'\uD83D\uDC55', label:'Maillot officiel',         val:`${info.jersey} \u20ac`,        data: JERSEY_EXT[lg] },
    ];
    const lgStats = [
      { icon:'\uD83D\uDCE1', label:'Droits TV championnat',         val: fmtM(info.tv),                            data: TV_EXT[lg] },
      { icon:'\uD83D\uDCB6', label:'Masse salariale (ligue)',        val: `${fmtM(info.wageBill)}/an`,              data: WAGE_BILL[lg] },
      { icon:'\uD83E\uDD1D', label:'Revenus sponsors (ligue)',       val: `${fmtM(info.sponsorRevenue)}/an`,        data: SPONSOR_REV[lg] },
      { icon:'\uD83C\uDFDF', label:'Revenus billetterie (ligue)',    val: `${fmtM(info.stadiumRevenue)}/an`,        data: STADIUM_REV[lg] },
      { icon:'\uD83D\uDECD', label:'Revenus merchandising (ligue)',  val: `${fmtM(info.merchandisingRevenue)}/an`,  data: MERCH_REV[lg] },
    ];

    function buildAccSection(headerIcon, headerLabel, headerColor, stats) {
      const wrap = document.createElement('div'); wrap.className = 'acc-section';
      const hdr  = document.createElement('div'); hdr.className  = 'acc-header open';
      hdr.innerHTML   = `<span><span class="acc-icon">${headerIcon}</span>${headerLabel}</span><span class="acc-arrow">\u25bc</span>`;
      hdr.style.color = headerColor;
      wrap.appendChild(hdr);
      const body = document.createElement('div'); body.className = 'acc-body open';
      stats.forEach(stat => {
        const rowWrap    = document.createElement('div');
        const row        = document.createElement('div'); row.className = 'stat-row';
        row.innerHTML    = `<div class="stat-row-left"><span class="stat-row-icon">${stat.icon}</span><span class="stat-row-name">${stat.label}</span></div><span class="stat-row-val" style="color:${color}">${stat.val}</span><span class="stat-row-expand">\u25bc</span>`;
        const chartPanel = document.createElement('div'); chartPanel.className = 'stat-chart-panel';
        const chartInner = document.createElement('div'); chartInner.className = 'stat-chart-inner';
        const chartLbl   = document.createElement('div');
        chartLbl.style.cssText = "font-family:'Space Mono',monospace;font-size:7.5px;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);margin-bottom:4px";
        chartLbl.textContent = `${stat.label} \u00b7 1980\u20132026`;
        const chartSvgWrap = document.createElement('div');
        chartPanel.appendChild(chartInner);
        chartInner.appendChild(chartLbl);
        chartInner.appendChild(chartSvgWrap);
        let chartBuilt = false;
        row.addEventListener('click', () => {
          const isOpen = chartPanel.classList.contains('open');
          body.querySelectorAll('.stat-chart-panel.open').forEach(p => {
            if (p !== chartPanel) { p.classList.remove('open'); p.previousElementSibling.classList.remove('active'); }
          });
          if (isOpen) { chartPanel.classList.remove('open'); row.classList.remove('active'); }
          else {
            chartPanel.classList.add('open'); row.classList.add('active');
            if (!chartBuilt && stat.data) { chartBuilt = true; requestAnimationFrame(() => miniSpkInline(chartSvgWrap, stat.data, color)); }
          }
        });
        rowWrap.appendChild(row); rowWrap.appendChild(chartPanel); body.appendChild(rowWrap);
      });
      wrap.appendChild(body);
      hdr.addEventListener('click', e => {
        if (e.target.closest('.stat-row')) return;
        const open = body.classList.contains('open');
        body.classList.toggle('open', !open);
        hdr.classList.toggle('open', !open);
      });
      return wrap;
    }

    pd.innerHTML = '';
    const header = document.createElement('div'); header.className = 'panel-inner';
    header.innerHTML = `<h3 style="color:${color}">${LEAGUES[lg]?.flag || ''} ${name}</h3><p class="panel-sub">${lg} \u00b7 ${info.clubs} clubs \u00b7 ${info.pop}</p>`;
    pd.appendChild(header);
    pd.appendChild(buildAccSection('\uD83E\uDDD1\u200D\uD83E\uDD1D\u200D\uD83E\uDDD1', 'Pour les fans',  color, fanStats));
    pd.appendChild(buildAccSection('\uD83D\uDCCA',                                      'Pour la ligue', color, lgStats));
    const desc = document.createElement('div'); desc.className = 'panel-desc'; desc.style.padding = '10px 4px 4px'; desc.textContent = info.desc;
    pd.appendChild(desc);
  }

  function updPills(activeName) {
    document.querySelectorAll('.cpill-map[data-c]').forEach(p => {
      const info = COUNTRIES[p.dataset.c];
      if (p.dataset.c === activeName) {
        p.style.background  = info.color; p.style.color = '#fff'; p.style.borderColor = info.color;
      } else {
        p.style.background  = 'transparent'; p.style.color = info?.color || 'var(--ink2)'; p.style.borderColor = 'var(--border)';
      }
    });
  }

  function rebuildMapPills() {
    const pills = document.getElementById('cpills');
    if (!pills) return;
    pills.innerHTML = '';
    Object.entries(COUNTRIES).filter(([n]) => n !== 'Switzerland' || store.swissMode).forEach(([name, info]) => {
      const p = document.createElement('button');
      p.className   = 'cpill-map';
      p.dataset.c   = name;
      p.style.color = info.color;
      p.textContent = `${LEAGUES[info.league]?.flag || ''} ${name}`;
      p.addEventListener('click', () => {
        if (name === 'Switzerland' && !store.swissMode) return;
        const ft = feats.find(f => isoMap[String(f.id)] === name);
        if (sel) g.selectAll('path.cp').filter(dd => isoMap[String(dd.id)] === sel).attr('fill', `${COUNTRIES[sel].color}40`);
        sel = name;
        g.selectAll('path.cp').filter(dd => isoMap[String(dd.id)] === name).attr('fill', `${info.color}80`);
        if (ft) zoomToCountry(ft);
        showClubDots(name); openPanel(name); updPills(name);
        const hint = document.getElementById('map-hint'); if (hint) hint.classList.add('hidden');
      });
      pills.appendChild(p);
    });
    const rst = document.createElement('button');
    rst.className   = 'cpill-map';
    rst.textContent = '\u21ba R\u00e9initialiser la vue';
    rst.addEventListener('click', () => {
      svg.transition().duration(580).call(zoom.transform, d3.zoomIdentity);
      if (sel) { g.selectAll('path.cp').filter(d => isoMap[String(d.id)] === sel).attr('fill', `${COUNTRIES[sel].color}40`); sel = null; }
      hideClubDots();
      pd.innerHTML = '<div class="panel-placeholder"><div class="ph-icon">\uD83D\uDDFA\uFE0F</div><p>S\u00e9lectionne un pays<br>sur la carte</p></div>';
      const hint = document.getElementById('map-hint'); if (hint) hint.classList.remove('hidden');
      updPills(null);
    });
    pills.appendChild(rst);
  }

  rebuildMapPills();
  window._rebuildMapPills = rebuildMapPills;
}
