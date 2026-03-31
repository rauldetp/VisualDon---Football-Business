import { store } from './store.js';

export const fmtM = v => v >= 1000 ? `${(v / 1000).toFixed(1)} Mrd\u20ac` : `${Math.round(v)} M\u20ac`;
export const fmtE = v => `${Math.round(v)} \u20ac`;

export function mkTooltip() {
  const el = document.getElementById('tt');
  function mv(e) {
    let x = e.clientX + 13, y = e.clientY - 42;
    if (x + 240 > window.innerWidth) x = e.clientX - 248;
    if (y < 8) y = e.clientY + 13;
    el.style.left = x + 'px';
    el.style.top  = y + 'px';
  }
  return {
    show(h, e) { el.innerHTML = h; el.classList.add('on'); mv(e); },
    hide()     { el.classList.remove('on'); },
    mv
  };
}

export function onEnter(el, cb, th = 0.12) {
  const o = new IntersectionObserver(e => {
    if (e[0].isIntersecting) { cb(); o.disconnect(); }
  }, { threshold: th });
  o.observe(el);
}

export function animCount(el, target, suf = '', pre = '', dur = 1600) {
  const s = performance.now();
  const u = t => {
    const p    = Math.min((t - s) / dur, 1);
    const ease = 1 - Math.pow(1 - p, 3);
    el.textContent = `${pre}${Math.round(ease * target).toLocaleString('fr')}${suf}`;
    if (p < 1) requestAnimationFrame(u);
  };
  requestAnimationFrame(u);
}

export function miniSpk(container, data, color, w = 250, h = 40) {
  const d3  = store.d3;
  const svg = d3.select(container).append('svg').attr('viewBox', `0 0 ${w} ${h}`).style('width', '100%').style('height', h + 'px');
  const x   = d3.scaleLinear().domain(d3.extent(data, d => d.year)).range([0, w]);
  const y   = d3.scaleLinear().domain([0, d3.max(data, d => d.value)]).range([h - 2, 2]);
  svg.append('path').datum(data).attr('fill', `${color}22`).attr('d', d3.area().x(d => x(d.year)).y0(h).y1(d => y(d.value)).curve(d3.curveCatmullRom.alpha(0.5)));
  svg.append('path').datum(data).attr('fill', 'none').attr('stroke', color).attr('stroke-width', 1.8).attr('d', d3.line().x(d => x(d.year)).y(d => y(d.value)).curve(d3.curveCatmullRom.alpha(0.5)));
}

export function mkSelector(id, active, onChange) {
  const { LEAGUES, swissMode } = store;
  const c = document.getElementById(id);
  if (!c) return;
  c.innerHTML = '<div class="cs-label">\uD83C\uDF0D S\u00e9lectionner les ligues \u00e0 comparer</div>';
  Object.entries(LEAGUES).filter(([n]) => n !== 'Swiss SL' || swissMode).forEach(([name, info]) => {
    const b = document.createElement('button');
    b.className = 'cpill-s' + (active.has(name) ? ' on' : '');
    b.style.borderColor       = info.color;
    b.style.color             = active.has(name) ? '#fff' : info.color;
    b.style.backgroundColor   = active.has(name) ? info.color : 'transparent';
    b.innerHTML = `<span>${info.flag}</span>${name}`;
    b.addEventListener('click', () => {
      if (active.has(name) && active.size > 1) {
        active.delete(name);
        b.classList.remove('on');
        b.style.color           = info.color;
        b.style.backgroundColor = 'transparent';
      } else if (!active.has(name)) {
        active.add(name);
        b.classList.add('on');
        b.style.color           = '#fff';
        b.style.backgroundColor = info.color;
      }
      onChange();
    });
    c.appendChild(b);
  });
}
