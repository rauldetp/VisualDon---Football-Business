import { store } from './store.js';
import { fmtM } from './utils.js';

export async function mkMap() {
  const {
    LEAGUES, COUNTRIES,
    TV_EXT, TICKET_EXT, JERSEY_EXT,
    WAGE_BILL, SPONSOR_REV, STADIUM_REV, MERCH_REV, TV_SUB_FULL
  } = store;

  const globeEl = document.getElementById('globe-container');
  const panelEl = document.getElementById('globe-panel');
  const pdEl    = document.getElementById('p-data');
  if (!globeEl || !panelEl || !pdEl) {
    console.warn('[map.js] Éléments DOM manquants');
    return;
  }

  await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r)));

  let world, topoLib;
  try {
    [world, topoLib] = await Promise.all([
      fetch('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-50m.json').then(r => r.json()),
      loadScript('https://cdn.jsdelivr.net/npm/topojson-client@3/dist/topojson-client.min.js').then(() => window.topojson)
    ]);
  } catch(e) {
    globeEl.innerHTML = '<p style="color:var(--muted);font-family:Space Mono,monospace;padding:40px;font-size:11px">Connexion internet requise.</p>';
    return;
  }

  const geo    = topoLib.feature(world, world.objects.countries);
  const isoMap = Object.fromEntries(Object.entries(COUNTRIES).map(([n, d]) => [d.iso, n]));

  const ACTIVE_COUNTRIES = ['England', 'Spain', 'Germany', 'Italy', 'France'];

  function isActive(name) {
    if (!name) return false;
    if (name === 'Switzerland') return store.swissMode;
    return ACTIVE_COUNTRIES.includes(name);
  }

  const d3 = store.d3;
  const W  = globeEl.offsetWidth  || window.innerWidth;
  const H  = globeEl.offsetHeight || window.innerHeight;

  // ── Container ─────────────────────────────────────────────────────────────
  globeEl.style.display        = 'flex';
  globeEl.style.alignItems     = 'center';
  globeEl.style.justifyContent = 'center';
  globeEl.style.overflow       = 'hidden';
  globeEl.style.background     = '#000000';

  const mapWrap = document.createElement('div');
  mapWrap.style.width           = W + 'px';
  mapWrap.style.height          = H + 'px';
  mapWrap.style.position        = 'relative';
  mapWrap.style.flexShrink      = '0';
  mapWrap.style.cursor          = 'default';
  mapWrap.style.transform       = 'perspective(1200px) rotateX(12deg) rotateY(0deg)';
  mapWrap.style.transformOrigin = '50% 0%';
  mapWrap.style.willChange      = 'transform';
  globeEl.appendChild(mapWrap);

  // ── SVG ───────────────────────────────────────────────────────────────────
  const svg = d3.select(mapWrap).append('svg')
    .attr('width',  W)
    .attr('height', H)
    .style('display', 'block')
    .style('filter', 'drop-shadow(0 30px 60px rgba(0,0,0,0.95))');

  const proj = d3.geoConicConformal()
    .center([8, 46.8])
    .parallels([43, 62])
    .scale(W * 0.58)
    .translate([W / 2, H / 2]);

  const path = d3.geoPath().projection(proj);

  // ── Defs ──────────────────────────────────────────────────────────────────
  const defs = svg.append('defs');
  const dropShadow = defs.append('filter').attr('id', 'country-shadow');
  dropShadow.append('feDropShadow')
    .attr('dx', '0').attr('dy', '4')
    .attr('stdDeviation', '6')
    .attr('flood-color', 'rgba(0,0,0,0.8)');

  svg.append('rect')
    .attr('width', W).attr('height', H)
    .attr('fill', '#000000');

  // ── Europe uniquement ─────────────────────────────────────────────────────
  function isEurope(feature) {
    try {
      const [cx, cy] = d3.geoCentroid(feature);
      return cx > -25 && cx < 45 && cy > 27 && cy < 72;
    } catch { return false; }
  }

  const europeFeats = geo.features.filter(isEurope);

  // ── Pays inactifs ─────────────────────────────────────────────────────────
  svg.append('g').selectAll('path.inactive')
    .data(europeFeats.filter(f => !isActive(isoMap[String(f.id)])))
    .enter().append('path')
    .attr('class', 'inactive')
    .attr('d', path)
    .attr('fill', '#111111')
    .attr('stroke', '#1a1a1a')
    .attr('stroke-width', 0.5)
    .attr('pointer-events', 'none');

  // ── Pays actifs ───────────────────────────────────────────────────────────
  const activeG = svg.append('g').attr('filter', 'url(#country-shadow)');

  function buildActiveCountries() {
    activeG.selectAll('path.active-country').remove();

    activeG.selectAll('path.active-country')
      .data(europeFeats.filter(f => isActive(isoMap[String(f.id)])))
      .enter().append('path')
      .attr('class', 'active-country')
      .attr('d', path)
      .attr('fill', f => hexToRgba(COUNTRIES[isoMap[String(f.id)]].color, 0.75))
      .attr('stroke', f => COUNTRIES[isoMap[String(f.id)]].color)
      .attr('stroke-width', 1.5)
      .style('cursor', 'pointer')
      .on('mouseenter', function(event, f) {
        const name = isoMap[String(f.id)];
        d3.select(this).attr('fill', hexToRgba(COUNTRIES[name].color, 0.95));
      })
      .on('mouseleave', function(event, f) {
        const name = isoMap[String(f.id)];
        // Remet la couleur normale sauf si ce pays est sélectionné
        const isSelected = panelEl.classList.contains('open') &&
          pdEl.querySelector('h3') &&
          pdEl.querySelector('h3').textContent.includes(name.split(' ')[0]);
        if (!isSelected) {
          d3.select(this).attr('fill', hexToRgba(COUNTRIES[name].color, 0.75));
        }
      })
      .on('click', function(event, f) {
        const name = isoMap[String(f.id)];
        if (!name) return;

        // Reset toutes les couleurs
        activeG.selectAll('path.active-country')
          .attr('fill', ff => hexToRgba(COUNTRIES[isoMap[String(ff.id)]].color, 0.75))
          .attr('stroke-width', 1.5);

        // Highlight pays cliqué
        d3.select(this)
          .attr('fill', hexToRgba(COUNTRIES[name].color, 1))
          .attr('stroke-width', 2.5);

        openPanel(name);

        const hint = document.getElementById('globe-hint');
        if (hint) hint.classList.add('hidden');
      });
  }

  buildActiveCountries();

  // Bordures fines
  svg.append('g').selectAll('path.border')
    .data(europeFeats)
    .enter().append('path')
    .attr('class', 'border')
    .attr('d', path)
    .attr('fill', 'none')
    .attr('stroke', '#050505')
    .attr('stroke-width', 0.3)
    .attr('pointer-events', 'none');

  // ── Panel ─────────────────────────────────────────────────────────────────
  function openPanel(name) {
    const info  = COUNTRIES[name];
    const lg    = info.league;
    const color = info.color;

    panelEl.classList.add('open');

    const fanStats = [
      { icon: '🎫', label: 'Billet moyen',             val: `${info.ticket} €`,         data: TICKET_EXT[lg] },
      { icon: '📺', label: 'Abos TV (toutes compét.)', val: `${info.tvSubFull} €/mois`, data: TV_SUB_FULL[lg] },
      { icon: '👕', label: 'Maillot officiel',          val: `${info.jersey} €`,         data: JERSEY_EXT[lg] },
    ];
    const lgStats = [
      { icon: '📡', label: 'Droits TV championnat',        val: fmtM(info.tv),                           data: TV_EXT[lg]      },
      { icon: '💶', label: 'Masse salariale (ligue)',       val: `${fmtM(info.wageBill)}/an`,             data: WAGE_BILL[lg]   },
      { icon: '🤝', label: 'Revenus sponsors (ligue)',      val: `${fmtM(info.sponsorRevenue)}/an`,       data: SPONSOR_REV[lg] },
      { icon: '🏟', label: 'Revenus billetterie (ligue)',   val: `${fmtM(info.stadiumRevenue)}/an`,       data: STADIUM_REV[lg] },
      { icon: '🛍', label: 'Revenus merchandising (ligue)', val: `${fmtM(info.merchandisingRevenue)}/an`, data: MERCH_REV[lg]   },
    ];

    function buildAccSection(headerIcon, headerLabel, headerColor, stats) {
      const wrap = document.createElement('div'); wrap.className = 'acc-section';
      const hdr  = document.createElement('div'); hdr.className  = 'acc-header open';
      hdr.innerHTML   = `<span><span class="acc-icon">${headerIcon}</span>${headerLabel}</span><span class="acc-arrow">▼</span>`;
      hdr.style.color = headerColor;
      wrap.appendChild(hdr);
      const body = document.createElement('div'); body.className = 'acc-body open';
      stats.forEach(stat => {
        const rowWrap    = document.createElement('div');
        const row        = document.createElement('div'); row.className = 'stat-row';
        row.innerHTML    = `<div class="stat-row-left"><span class="stat-row-icon">${stat.icon}</span><span class="stat-row-name">${stat.label}</span></div><span class="stat-row-val" style="color:${color}">${stat.val}</span><span class="stat-row-expand">▼</span>`;
        const chartPanel = document.createElement('div'); chartPanel.className = 'stat-chart-panel';
        const chartInner = document.createElement('div'); chartInner.className = 'stat-chart-inner';
        const chartLbl   = document.createElement('div');
        chartLbl.style.cssText = "font-family:'Space Mono',monospace;font-size:7.5px;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);margin-bottom:4px";
        chartLbl.textContent   = `${stat.label} · 1980–2026`;
        const chartSvgWrap     = document.createElement('div');
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
            if (!chartBuilt && stat.data && d3) {
              chartBuilt = true;
              requestAnimationFrame(() => miniSpkInline(chartSvgWrap, stat.data, color, d3));
            }
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

    pdEl.innerHTML = '';

    const closeBtn = document.createElement('button');
    closeBtn.className = 'globe-panel-close';
    closeBtn.innerHTML = '✕';
    closeBtn.addEventListener('click', () => {
      panelEl.classList.remove('open');
      // Remet toutes les couleurs à la normale
      activeG.selectAll('path.active-country')
        .attr('fill', f => hexToRgba(COUNTRIES[isoMap[String(f.id)]].color, 0.75))
        .attr('stroke-width', 1.5);
    });
    pdEl.appendChild(closeBtn);

    const header = document.createElement('div'); header.className = 'panel-inner';
    header.innerHTML = `<h3 style="color:${color}">${LEAGUES[lg]?.flag || ''} ${name}</h3><p class="panel-sub">${lg} · ${info.clubs} clubs · ${info.pop}</p>`;
    pdEl.appendChild(header);
    pdEl.appendChild(buildAccSection('🧑‍🤝‍🧑', 'Pour les fans',  color, fanStats));
    pdEl.appendChild(buildAccSection('📊',       'Pour la ligue', color, lgStats));
    const desc = document.createElement('div');
    desc.className     = 'panel-desc';
    desc.style.padding = '10px 4px 4px';
    desc.textContent   = info.desc;
    pdEl.appendChild(desc);
  }

  window._rebuildMapPills  = () => buildActiveCountries();
  window._openGlobeCountry = (name) => { if (isActive(name)) openPanel(name); };
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function loadScript(src) {
  return new Promise(res => {
    if (document.querySelector(`script[src="${src}"]`)) { res(); return; }
    const s = document.createElement('script');
    s.src = src; s.onload = res;
    document.head.appendChild(s);
  });
}

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

function miniSpkInline(container, data, color, d3) {
  if (!container || !data?.length) return;
  const w  = container.offsetWidth || 230;
  const h  = 52;
  const sv = d3.select(container).append('svg')
    .attr('viewBox', `0 0 ${w} ${h}`)
    .style('width', '100%').style('height', h + 'px');
  const x = d3.scaleLinear().domain(d3.extent(data, d => d.year)).range([0, w]);
  const y = d3.scaleLinear().domain([0, d3.max(data, d => d.value)]).range([h - 2, 2]);
  sv.append('path').datum(data)
    .attr('fill', `${color}20`)
    .attr('d', d3.area().x(d => x(d.year)).y0(h).y1(d => y(d.value)).curve(d3.curveCatmullRom.alpha(0.5)));
  sv.append('path').datum(data)
    .attr('fill', 'none').attr('stroke', color).attr('stroke-width', 2)
    .attr('d', d3.line().x(d => x(d.year)).y(d => y(d.value)).curve(d3.curveCatmullRom.alpha(0.5)));
  [1980, 1990, 2000, 2010, 2020, 2026].forEach(yr => {
    sv.append('text').attr('x', x(yr)).attr('y', h - 1)
      .attr('text-anchor', 'middle').attr('fill', 'var(--muted)')
      .style('font-family', 'Space Mono,monospace').style('font-size', '7px').text(yr);
  });
}