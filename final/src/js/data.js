import * as d3 from 'd3';
import { store } from './store.js';

export async function loadData() {
  const res = await fetch('/data/football-data.json');
  return await res.json();
}

function interpolate(keyPoints, yearRange) {
  return yearRange.map(yr => {
    const sorted = [...keyPoints].sort((a, b) => a.year - b.year);
    if (yr <= sorted[0].year) return { year: yr, value: sorted[0].value };
    if (yr >= sorted[sorted.length - 1].year) return { year: yr, value: sorted[sorted.length - 1].value };
    const lo = sorted.filter(p => p.year <= yr).pop();
    const hi = sorted.find(p => p.year > yr);
    const t = (yr - lo.year) / (hi.year - lo.year);
    return { year: yr, value: Math.round(lo.value + t * (hi.value - lo.value)) };
  });
}

export function initData(raw) {
  store.d3 = d3;
  const YEARS     = d3.range(1990, 2027);
  const YEARS_EXT = d3.range(1980, 2027);
  store.YEARS     = YEARS;
  store.YEARS_EXT = YEARS_EXT;
  store.LEAGUES   = raw.leagues;
  store.COUNTRIES = raw.countries;
  store.TIMELINE  = raw.timeline;

  store.CLUB_COORDS = {
    England: [
      ["Arsenal",-0.108,51.555],["Chelsea",-0.191,51.481],["Tottenham",-0.066,51.604],
      ["West Ham",0.017,51.539],["Crystal Palace",-0.085,51.398],["Fulham",-0.221,51.475],
      ["Brentford",-0.289,51.488],["Man City",-2.200,53.483],["Man United",-2.291,53.463],
      ["Liverpool",-2.961,53.431],["Everton",-2.966,53.439],["Newcastle",-1.621,54.976],
      ["Aston Villa",-1.885,52.509],["Leicester",-1.142,52.620],["Nottm Forest",-1.133,52.940],
      ["Sheffield Utd",-1.471,53.370],["Leeds",-1.572,53.777],["Southampton",-1.391,50.906],
      ["Brighton",-0.084,50.861],["Burnley",-2.230,53.789]
    ],
    Spain: [
      ["Real Madrid",-3.688,40.453],["Atletico",-3.599,40.436],["Getafe",-3.717,40.323],
      ["Rayo Vallecano",-3.657,40.391],["Barcelona",2.123,41.381],["Espanyol",2.075,41.349],
      ["Girona",2.821,41.991],["Athletic Bilbao",-2.950,43.264],["Real Sociedad",-1.973,43.301],
      ["Osasuna",-1.637,42.796],["Valencia",-0.358,39.475],["Villarreal",-0.103,39.945],
      ["Levante",-0.362,39.515],["Sevilla",-5.977,37.384],["Real Betis",-5.981,37.357],
      ["Granada",-3.616,37.152],["Almeria",-2.430,36.835],["Celta Vigo",-8.744,42.212],
      ["Dep. Coruna",-8.403,43.335],["Real Valladolid",-4.739,41.645]
    ],
    Germany: [
      ["Bayern Munich",11.625,48.219],["1860 Munich",11.558,48.126],["Augsburg",10.886,48.323],
      ["Nurnberg",11.079,49.430],["Borussia Dortmund",7.452,51.493],["Schalke",7.067,51.555],
      ["Bochum",7.236,51.490],["Bielefeld",8.533,52.004],["Bayer Leverkusen",7.016,51.039],
      ["Koln",6.875,50.933],["Monchengladbach",6.385,51.174],["Dusseldorf",6.793,51.260],
      ["Eintracht Frankfurt",8.646,50.069],["Mainz",8.226,49.984],["Darmstadt",8.644,49.872],
      ["Werder Bremen",8.839,53.066],["Hamburger SV",9.898,53.587],["Wolfsburg",10.804,52.432]
    ],
    Italy: [
      ["Roma",12.572,41.934],["Lazio",12.528,41.934],["Inter Milan",9.124,45.478],
      ["AC Milan",9.124,45.478],["Juventus",7.641,45.110],["Torino",7.659,45.101],
      ["Fiorentina",11.282,43.781],["Empoli",10.950,43.719],["Napoli",14.193,40.828],
      ["Salernitana",14.769,40.680],["Atalanta",9.727,45.700],["Brescia",10.234,45.539],
      ["Genoa",8.951,44.415],["Sampdoria",8.951,44.415],["Bologna",11.343,44.492],
      ["Sassuolo",10.784,44.545],["Verona",10.990,45.434],["Venezia",12.315,45.438],
      ["Udinese",13.230,46.077],["Lecce",18.168,40.353]
    ],
    France: [
      ["PSG",2.253,48.841],["RC Lens",2.815,50.433],["Lille",3.014,50.612],
      ["Monaco",7.416,43.727],["Nice",7.200,43.705],["Marseille",5.396,43.270],
      ["Lyon",4.832,45.765],["Saint-Etienne",4.391,45.461],["Rennes",-1.713,48.107],
      ["Nantes",-1.522,47.256],["Bordeaux",-0.557,44.828],["Toulouse",1.436,43.583],
      ["Montpellier",3.813,43.619],["Strasbourg",7.751,48.560],["Reims",4.031,49.248],
      ["Metz",6.175,49.111],["Brest",-4.484,48.398],["Clermont",3.097,45.786]
    ]
  };

  const TV = {}, TICKET = {}, JERSEY = {};
  Object.keys(raw.leagues).forEach(lg => {
    TV[lg]     = interpolate(raw.tv_rights_history[lg]    || [], YEARS);
    TICKET[lg] = interpolate(raw.ticket_price_history[lg] || [], YEARS);
    JERSEY[lg] = interpolate(raw.jersey_price_history[lg] || [], YEARS);
  });
  store.TV     = TV;
  store.TICKET = TICKET;
  store.JERSEY = JERSEY;

  const tvSub2026 = { "Premier League":57,"La Liga":45,"Bundesliga":41,"Serie A":43,"Ligue 1":38,"Swiss SL":22 };
  const TV_SUB = {};
  Object.keys(raw.leagues).forEach(lg => {
    TV_SUB[lg] = YEARS.map(yr => ({
      year: yr,
      value: yr < 1997 ? 0 : Math.round(tvSub2026[lg] * Math.pow((yr - 1997) / 29, 1.1))
    }));
  });
  store.TV_SUB = TV_SUB;

  const tvSubFull2026 = { "Premier League":142,"La Liga":98,"Bundesliga":78,"Serie A":89,"Ligue 1":74,"Swiss SL":38 };
  const TV_SUB_FULL = {};
  Object.keys(raw.leagues).forEach(lg => {
    TV_SUB_FULL[lg] = YEARS_EXT.map(yr => ({
      year: yr,
      value: yr < 1992 ? 0 : Math.round(tvSubFull2026[lg] * Math.pow(Math.max(0, yr - 1992) / 34, 1.3))
    }));
  });
  store.TV_SUB_FULL = TV_SUB_FULL;

  const sal2023 = { "Premier League":33800,"La Liga":26000,"Bundesliga":40000,"Serie A":28000,"Ligue 1":30000,"Swiss SL":78000 };
  const sal1980 = { "Premier League":10000,"La Liga":8000,"Bundesliga":14000,"Serie A":8000,"Ligue 1":9000,"Swiss SL":28000 };
  const AVG_SALARY_TS = {};
  Object.keys(raw.leagues).forEach(lg => {
    AVG_SALARY_TS[lg] = YEARS_EXT.map(yr => {
      const t = Math.max(0, Math.min(1, (yr - 1980) / 43));
      return { year: yr, value: Math.round(sal1980[lg] + t * (sal2023[lg] - sal1980[lg])) };
    });
  });
  store.AVG_SALARY_TS = AVG_SALARY_TS;

  function makeSeries(key, startFactor) {
    const out = {};
    Object.values(raw.countries).forEach(d => {
      const lg    = d.league;
      const end   = d[key] || 0;
      const start = Math.round(end * startFactor);
      out[lg] = YEARS_EXT.map(yr => {
        const t = Math.pow(Math.max(0, yr - 1980) / 46, 1.8);
        return { year: yr, value: Math.round(start + t * (end - start)) };
      });
    });
    return out;
  }
  store.WAGE_BILL   = makeSeries('wageBill',             0.04);
  store.SPONSOR_REV = makeSeries('sponsorRevenue',       0.02);
  store.MERCH_REV   = makeSeries('merchandisingRevenue', 0.02);
  store.STADIUM_REV = makeSeries('stadiumRevenue',       0.05);

  const TV_EXT = {}, TICKET_EXT = {}, JERSEY_EXT = {};
  Object.keys(raw.leagues).forEach(lg => {
    TV_EXT[lg] = YEARS_EXT.map(yr => {
      const f = TV[lg].find(d => d.year === yr);
      if (f) return f;
      const base = TV[lg][0].value;
      return { year: yr, value: Math.max(0, Math.round(base * (1 - (1990 - yr) * 0.08))) };
    });
    TICKET_EXT[lg] = YEARS_EXT.map(yr => {
      const f = TICKET[lg].find(d => d.year === yr);
      if (f) return f;
      const base = TICKET[lg][0].value;
      return { year: yr, value: Math.max(0, Math.round(base * (1 - (1990 - yr) * 0.05))) };
    });
    JERSEY_EXT[lg] = YEARS_EXT.map(yr => {
      const f = JERSEY[lg].find(d => d.year === yr);
      if (f) return f;
      const base = JERSEY[lg][0].value;
      return { year: yr, value: Math.max(0, Math.round(base * (1 - (1990 - yr) * 0.06))) };
    });
  });
  store.TV_EXT     = TV_EXT;
  store.TICKET_EXT = TICKET_EXT;
  store.JERSEY_EXT = JERSEY_EXT;
}
