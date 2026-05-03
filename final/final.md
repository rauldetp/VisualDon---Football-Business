football-data.json:

{
  "_sources": {
    "tv_rights": "Deloitte Football Money League 2024 / UEFA Club Licensing Benchmarking Reports / Statista",
    "ticket_prices": "Bundesliga Fan Survey 2023 / UEFA Consumer Report / Football Supporters Europe",
    "jersey_prices": "Official club shops + Decathlon/JD Sports price tracking 2024",
    "wages": "Deloitte Annual Review of Football Finance 2024",
    "attendance": "UEFA / official league stats",
    "avg_salary": "Eurostat 2023 — Mean annual earnings by country",
    "swiss": "Swiss Football League financial report 2023 / CIES Football Observatory",
    "note": "Séries temporelles estimées par interpolation entre points-clés documentés. Valeurs 2026 = projection tendancielle."
  },

  "leagues": {
    "Premier League": { "color": "#9c27b0", "flag": "🏴󠁧󠁢󠁥󠁮󠁧󠁿", "iso": "826" },
    "La Liga":        { "color": "#ef4444", "flag": "🇪🇸",          "iso": "724" },
    "Bundesliga":     { "color": "#fbbf24", "flag": "🇩🇪",          "iso": "276" },
    "Serie A":        { "color": "#10b981", "flag": "🇮🇹",          "iso": "380" },
    "Ligue 1":        { "color": "#3b82f6", "flag": "🇫🇷",          "iso": "250" },
    "Swiss SL":       { "color": "#f97316", "flag": "🇨🇭",          "iso": "756" }
  },

  "countries": {
    "England": {
      "league": "Premier League", "color": "#9c27b0", "iso": "826",
      "clubs": 20, "pop": "56M", "club": "Manchester City",
      "tv": 3100, "ticket": 185, "jersey": 97, "tvSub": 57, "tvSubFull": 142,
      "wageBill": 3780, "sponsorRevenue": 2960, "stadiumRevenue": 1780, "merchandisingRevenue": 2240,
      "topClubRevenue": 714, "avgSalary": 33800,
      "growth": "+3 400%",
      "desc": "La Premier League domine financièrement toutes les ligues. Ses droits TV sont 2× supérieurs à la Liga grâce à une distribution mondiale massive.",
      "source_tv": "Deloitte Money League 2024 — droits domestiques + internationaux consolidés"
    },
    "Spain": {
      "league": "La Liga", "color": "#ef4444", "iso": "724",
      "clubs": 20, "pop": "47M", "club": "Real Madrid",
      "tv": 1500, "ticket": 75, "jersey": 85, "tvSub": 45, "tvSubFull": 98,
      "wageBill": 2240, "sponsorRevenue": 1960, "stadiumRevenue": 1020, "merchandisingRevenue": 1740,
      "topClubRevenue": 831, "avgSalary": 26000,
      "growth": "+1 500%",
      "desc": "La Liga a longtemps misé sur le duo Barça-Real. Sa popularité mondiale lui vaut des droits TV importants, mais la PL creuse l'écart depuis 2015.",
      "source_tv": "LaLiga rapport financier 2022-23"
    },
    "Germany": {
      "league": "Bundesliga", "color": "#fbbf24", "iso": "276",
      "clubs": 18, "pop": "83M", "club": "Bayern Munich",
      "tv": 1400, "ticket": 15, "jersey": 75, "tvSub": 41, "tvSubFull": 78,
      "wageBill": 1584, "sponsorRevenue": 1548, "stadiumRevenue": 1116, "merchandisingRevenue": 1332,
      "topClubRevenue": 765, "avgSalary": 40000,
      "growth": "+870%",
      "desc": "La Bundesliga est la plus accessible pour les fans : billets bon marché grâce à la règle 50+1 qui bloque les investisseurs.",
      "source_tv": "DFL Economic Report 2024"
    },
    "Italy": {
      "league": "Serie A", "color": "#10b981", "iso": "380",
      "clubs": 20, "pop": "60M", "club": "Inter Milan",
      "tv": 1300, "ticket": 60, "jersey": 79, "tvSub": 43, "tvSubFull": 89,
      "wageBill": 1680, "sponsorRevenue": 1440, "stadiumRevenue": 760, "merchandisingRevenue": 1160,
      "topClubRevenue": 519, "avgSalary": 28000,
      "growth": "+1 200%",
      "desc": "La Serie A a dominé les années 90. Elle a perdu du terrain depuis, mais reste une ligue historique avec des clubs emblématiques.",
      "source_tv": "Lega Serie A rapport annuel 2022-23"
    },
    "France": {
      "league": "Ligue 1", "color": "#3b82f6", "iso": "250",
      "clubs": 18, "pop": "68M", "club": "PSG",
      "tv": 900, "ticket": 50, "jersey": 71, "tvSub": 38, "tvSubFull": 74,
      "wageBill": 1188, "sponsorRevenue": 1098, "stadiumRevenue": 576, "merchandisingRevenue": 792,
      "topClubRevenue": 798, "avgSalary": 30000,
      "growth": "+960%",
      "desc": "La Ligue 1 est portée par le PSG depuis le rachat qatari en 2011. Sans ce club, la ligue resterait bien moins visible.",
      "source_tv": "LFP rapport droits TV 2023-24 (post-crise Mediapro)"
    },
    "Switzerland": {
      "league": "Swiss SL", "color": "#f97316", "iso": "756",
      "clubs": 12, "pop": "8.7M", "club": "Young Boys",
      "tv": 55, "ticket": 28, "jersey": 48, "tvSub": 22, "tvSubFull": 38,
      "wageBill": 100, "sponsorRevenue": 96, "stadiumRevenue": 336, "merchandisingRevenue": 60,
      "topClubRevenue": 48, "avgSalary": 78000,
      "growth": "+220%",
      "desc": "La Super League suisse reste dans une autre dimension économique. Mais les mêmes dynamiques d'inflation s'y installent progressivement.",
      "source_tv": "Swiss Football League rapport financier 2022-23"
    }
  },

  "tv_rights_history": {
    "_note": "Points-clés documentés (M€/an), interpolation entre. Sources: Deloitte, UEFA, rapports ligues.",
    "Premier League": [
      {"year":1992,"value":44},  {"year":1997,"value":254},
      {"year":2001,"value":650}, {"year":2004,"value":750},
      {"year":2007,"value":910}, {"year":2010,"value":1200},
      {"year":2013,"value":1780},{"year":2016,"value":2700},
      {"year":2019,"value":3050},{"year":2022,"value":2900},
      {"year":2025,"value":3100},{"year":2026,"value":3100}
    ],
    "La Liga": [
      {"year":1992,"value":60},  {"year":1997,"value":200},
      {"year":2001,"value":450}, {"year":2004,"value":550},
      {"year":2007,"value":650}, {"year":2010,"value":700},
      {"year":2013,"value":740}, {"year":2016,"value":1430},
      {"year":2019,"value":1500},{"year":2022,"value":1500},
      {"year":2025,"value":1500},{"year":2026,"value":1500}
    ],
    "Bundesliga": [
      {"year":1992,"value":55},  {"year":1997,"value":135},
      {"year":2001,"value":290}, {"year":2004,"value":300},
      {"year":2007,"value":390}, {"year":2010,"value":430},
      {"year":2013,"value":628}, {"year":2016,"value":1160},
      {"year":2019,"value":1330},{"year":2022,"value":1400},
      {"year":2025,"value":1400},{"year":2026,"value":1400}
    ],
    "Serie A": [
      {"year":1992,"value":100}, {"year":1997,"value":340},
      {"year":2001,"value":750}, {"year":2004,"value":750},
      {"year":2007,"value":780}, {"year":2010,"value":870},
      {"year":2013,"value":910}, {"year":2016,"value":1050},
      {"year":2019,"value":1350},{"year":2022,"value":1300},
      {"year":2025,"value":1300},{"year":2026,"value":1300}
    ],
    "Ligue 1": [
      {"year":1992,"value":40},  {"year":1997,"value":90},
      {"year":2001,"value":230}, {"year":2004,"value":480},
      {"year":2007,"value":600}, {"year":2010,"value":600},
      {"year":2013,"value":607}, {"year":2016,"value":748},
      {"year":2019,"value":895}, {"year":2020,"value":600},
      {"year":2022,"value":663}, {"year":2025,"value":900},
      {"year":2026,"value":900}
    ],
    "Swiss SL": [
      {"year":1992,"value":6},  {"year":1997,"value":10},
      {"year":2001,"value":16}, {"year":2004,"value":18},
      {"year":2007,"value":22}, {"year":2010,"value":28},
      {"year":2013,"value":32}, {"year":2016,"value":38},
      {"year":2019,"value":43}, {"year":2022,"value":50},
      {"year":2025,"value":55}, {"year":2026,"value":55}
    ]
  },

  "ticket_price_history": {
    "_note": "Prix moyen billet championnat (€). Sources: Football Supporters Europe, UEFA Fan Survey, Bundesliga Fan Report.",
    "Premier League": [
      {"year":1990,"value":8},  {"year":1995,"value":16},
      {"year":2000,"value":30}, {"year":2005,"value":45},
      {"year":2010,"value":72}, {"year":2015,"value":105},
      {"year":2020,"value":145},{"year":2023,"value":185},
      {"year":2026,"value":185}
    ],
    "La Liga": [
      {"year":1990,"value":7},  {"year":1995,"value":14},
      {"year":2000,"value":22}, {"year":2005,"value":32},
      {"year":2010,"value":45}, {"year":2015,"value":58},
      {"year":2020,"value":68}, {"year":2023,"value":75},
      {"year":2026,"value":75}
    ],
    "Bundesliga": [
      {"year":1990,"value":6},  {"year":1995,"value":8},
      {"year":2000,"value":9},  {"year":2005,"value":11},
      {"year":2010,"value":12}, {"year":2015,"value":13},
      {"year":2020,"value":14}, {"year":2023,"value":15},
      {"year":2026,"value":15}
    ],
    "Serie A": [
      {"year":1990,"value":8},  {"year":1995,"value":16},
      {"year":2000,"value":25}, {"year":2005,"value":35},
      {"year":2010,"value":42}, {"year":2015,"value":50},
      {"year":2020,"value":55}, {"year":2023,"value":60},
      {"year":2026,"value":60}
    ],
    "Ligue 1": [
      {"year":1990,"value":7},  {"year":1995,"value":12},
      {"year":2000,"value":18}, {"year":2005,"value":26},
      {"year":2010,"value":33}, {"year":2015,"value":40},
      {"year":2020,"value":45}, {"year":2023,"value":50},
      {"year":2026,"value":50}
    ],
    "Swiss SL": [
      {"year":1990,"value":8},  {"year":1995,"value":10},
      {"year":2000,"value":13}, {"year":2005,"value":16},
      {"year":2010,"value":19}, {"year":2015,"value":22},
      {"year":2020,"value":25}, {"year":2023,"value":28},
      {"year":2026,"value":28}
    ]
  },

  "jersey_price_history": {
    "_note": "Prix maillot domicile adulte officiel (€). Sources: relevés boutiques officielles + JD Sports/Decathlon.",
    "Premier League": [
      {"year":1990,"value":20}, {"year":1995,"value":32},
      {"year":2000,"value":48}, {"year":2005,"value":58},
      {"year":2010,"value":65}, {"year":2015,"value":75},
      {"year":2020,"value":85}, {"year":2023,"value":97},
      {"year":2026,"value":97}
    ],
    "La Liga": [
      {"year":1990,"value":18}, {"year":1995,"value":28},
      {"year":2000,"value":42}, {"year":2005,"value":52},
      {"year":2010,"value":60}, {"year":2015,"value":70},
      {"year":2020,"value":78}, {"year":2023,"value":85},
      {"year":2026,"value":85}
    ],
    "Bundesliga": [
      {"year":1990,"value":16}, {"year":1995,"value":25},
      {"year":2000,"value":36}, {"year":2005,"value":45},
      {"year":2010,"value":54}, {"year":2015,"value":62},
      {"year":2020,"value":70}, {"year":2023,"value":75},
      {"year":2026,"value":75}
    ],
    "Serie A": [
      {"year":1990,"value":18}, {"year":1995,"value":28},
      {"year":2000,"value":42}, {"year":2005,"value":52},
      {"year":2010,"value":58}, {"year":2015,"value":65},
      {"year":2020,"value":72}, {"year":2023,"value":79},
      {"year":2026,"value":79}
    ],
    "Ligue 1": [
      {"year":1990,"value":16}, {"year":1995,"value":24},
      {"year":2000,"value":36}, {"year":2005,"value":46},
      {"year":2010,"value":54}, {"year":2015,"value":60},
      {"year":2020,"value":65}, {"year":2023,"value":71},
      {"year":2026,"value":71}
    ],
    "Swiss SL": [
      {"year":1990,"value":15}, {"year":1995,"value":20},
      {"year":2000,"value":28}, {"year":2005,"value":34},
      {"year":2010,"value":38}, {"year":2015,"value":42},
      {"year":2020,"value":45}, {"year":2023,"value":48},
      {"year":2026,"value":48}
    ]
  },

  "timeline": [
    {
      "year": 1992,
      "title": "Naissance de la Premier League",
      "body": "Les 22 clubs anglais quittent la Football League. BSkyB signe 304 M£ de droits TV sur 5 ans. Le football pro entre dans l'ère télévisée.",
      "tag": "clubs", "tl": "Clubs",
      "source": "The Guardian, 1992 — Premier League founding documents"
    },
    {
      "year": 1995,
      "title": "L'arrêt Bosman",
      "body": "La CJUE libéralise les transferts. Les joueurs peuvent changer de club gratuitement en fin de contrat. Les salaires explosent, les clubs s'endettent.",
      "tag": "global", "tl": "Réglementation",
      "source": "CJCE, affaire C-415/93, 15 décembre 1995"
    },
    {
      "year": 1999,
      "title": "Le premier milliard de droits TV",
      "body": "La Premier League franchit le milliard de livres pour un cycle TV. Pour les fans anglais, les billets augmentent de 45% en cinq ans.",
      "tag": "fans", "tl": "Fans",
      "source": "Deloitte Annual Review of Football Finance 2000"
    },
    {
      "year": 2004,
      "title": "L'ère des propriétaires milliardaires",
      "body": "Abramovich rachète Chelsea pour 140 M£. Les transferts records deviennent un outil de marketing autant qu'un investissement sportif.",
      "tag": "clubs", "tl": "Clubs",
      "source": "BBC Sport, juillet 2003"
    },
    {
      "year": 2011,
      "title": "Qatar rachète le PSG",
      "body": "QSI acquiert le PSG pour 70 M€. En 5 ans : Neymar (222 M€), Mbappé (180 M€). La Ligue 1 devient vitrine d'un soft power national.",
      "tag": "global", "tl": "Mondial",
      "source": "L'Équipe / LFP communiqué officiel, juin 2011"
    },
    {
      "year": 2013,
      "title": "Le billet à 100€ devient normal",
      "body": "En Premier League, le billet moyen dépasse 100€. À Arsenal, certains abonnements dépassent 2 000£/saison. Le fan populaire est progressivement exclu.",
      "tag": "fans", "tl": "Fans",
      "source": "Football Supporters Europe — Fan Cost Index 2013"
    },
    {
      "year": 2016,
      "title": "5 milliards £ pour 3 ans",
      "body": "La PL vend ses droits domestiques 5,14 Mrd£. Chaque club reçoit 100 M£/saison minimum. Le gouffre avec le reste de l'Europe se creuse.",
      "tag": "clubs", "tl": "Clubs",
      "source": "Premier League communiqué officiel, février 2015"
    },
    {
      "year": 2021,
      "title": "La tentative de Super League",
      "body": "12 clubs européens annoncent une Super League fermée. Tollé général, échec en 48h. L'appétit des propriétaires est révélé au grand jour.",
      "tag": "global", "tl": "Crise",
      "source": "UEFA / communiqués clubs, avril 2021"
    },
    {
      "year": 2024,
      "title": "Le maillot à 100€ : la norme",
      "body": "Le maillot officiel PL dépasse 97€. Les clubs sortent 3 à 4 kits par saison. Le merchandising représente jusqu'à 15% des revenus d'un grand club.",
      "tag": "fans", "tl": "Fans",
      "source": "Deloitte Football Money League 2024"
    }
  ]
}


style.css:

:root{--bg:#000000;--bg2:#1a1a1a;--bg3:#2d2d2d;--card:#1a1a1a;--border:#333333;--ink:#ffffff;--ink2:#e0e0e0;--muted:#999999;--green:#2d6a2d;--green-l:#1a3a1a;--green-m:#4a9c4a;--green-v:#00c853;--gold:#e6a817;--shadow:0 2px 16px rgba(0,0,0,.3);--shadow-md:0 8px 32px rgba(0,0,0,.4);--r:14px;--r-lg:22px}
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth;background:#000000}
body{background:#000000;color:var(--ink);font-family:'Barlow',sans-serif;line-height:1.6;overflow-x:hidden}
#prog{position:fixed;top:0;left:0;height:3px;width:0;background:linear-gradient(90deg,var(--green),var(--green-v),var(--gold));z-index:2000;transition:width .1s linear}
#tt{position:fixed;pointer-events:none;background:var(--ink);color:#fff;border-left:3px solid var(--green-v);border-radius:10px;padding:10px 14px;opacity:0;transition:opacity .08s;font-family:'Space Mono',monospace;font-size:10px;line-height:1.9;z-index:9999;box-shadow:var(--shadow-md)}
#tt.on{opacity:1}
.tt-yr{color:var(--green-v);font-size:9px;margin-bottom:4px;letter-spacing:.06em}
.tt-row{display:flex;justify-content:space-between;gap:16px}
.tt-n{opacity:.65}
.nav{position:fixed;top:0;width:100%;z-index:1000;display:flex;justify-content:space-between;align-items:center;padding:14px 52px;background:rgba(0,0,0,.93);backdrop-filter:blur(18px);border-bottom:1px solid var(--border);transition:padding .3s}
.nav.scrolled{padding:9px 52px;box-shadow:var(--shadow)}
.nav-brand{font-family:'Oswald',sans-serif;text-decoration:none;color:var(--green);font-size:19px;font-weight:700;letter-spacing:.06em}
.nav-brand em{color:var(--muted);font-style:normal;font-weight:300}
.nav-links{display:flex;list-style:none;gap:26px}
.nav-links a{text-decoration:none;color:var(--muted);font-family:'Space Mono',monospace;font-size:9px;text-transform:uppercase;letter-spacing:.14em;transition:color .2s}
.nav-links a:hover{color:var(--green)}
.hero{min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:110px 52px 56px;position:relative;overflow:hidden;background:linear-gradient(160deg,#000000 55%,#1a3a1a 100%)}
.hero-pitch{position:absolute;inset:0;background:transparent;pointer-events:none}
.hero-circle{position:absolute;right:5%;top:50%;transform:translateY(-50%);width:clamp(260px,36vw,520px);aspect-ratio:1;border-radius:50%;border:1.5px solid rgba(45,106,45,.1);pointer-events:none}
.hero-circle::after{content:"";position:absolute;inset:13%;border-radius:50%;border:1px solid rgba(45,106,45,.07)}
.hero-copy{position:relative;z-index:1;max-width:800px}
.eyebrow{display:inline-flex;align-items:center;gap:8px;font-family:'Space Mono',monospace;font-size:9px;text-transform:uppercase;letter-spacing:.22em;color:var(--green);margin-bottom:22px;padding:6px 14px;border:1px solid rgba(45,106,45,.2);border-radius:999px;background:rgba(45,106,45,.05)}
.hero-title{font-family:'Oswald',sans-serif;font-size:clamp(52px,9vw,128px);line-height:.88;letter-spacing:-.02em;margin-bottom:20px}
.hero-title .outline{-webkit-text-stroke:1.5px var(--ink);color:transparent}
.hero-title .x{color:var(--muted);font-weight:300}
.hero-title .accent{color:var(--green)}
.hero-sub{max-width:560px;font-size:clamp(14px,1.6vw,17px);line-height:1.85;color:var(--ink2);margin-bottom:32px}
.hero-sub strong{color:var(--green);font-weight:700}
.hero-cta{display:inline-flex;align-items:center;gap:10px;text-decoration:none;font-family:'Space Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.14em;color:#fff;background:var(--green);padding:12px 24px;border-radius:999px;transition:all .25s;font-weight:700;box-shadow:0 4px 16px rgba(45,106,45,.22)}
.hero-cta:hover{background:var(--green-m);transform:translateY(-2px)}
.hero-stats-strip{display:grid;grid-template-columns:repeat(4,1fr);margin-top:56px;border:1px solid var(--border);border-radius:var(--r-lg);overflow:hidden;background:var(--card);box-shadow:var(--shadow)}
.hero-stat{padding:24px 20px;border-right:1px solid var(--border);transition:background .2s}
.hero-stat:last-child{border-right:none}
.hero-stat:hover{background:var(--bg2)}
.hero-stat-value{font-family:'Oswald',sans-serif;font-size:clamp(24px,3.2vw,42px);line-height:1;color:var(--green);margin-bottom:6px}
.hero-stat-label{font-family:'Space Mono',monospace;font-size:8px;letter-spacing:.09em;text-transform:uppercase;color:var(--muted);line-height:1.7}
.section{max-width:1360px;margin:0 auto;padding:88px 52px}
.section-head{margin-bottom:36px;max-width:740px}
.slabel{display:inline-flex;align-items:center;gap:10px;font-family:'Space Mono',monospace;font-size:9px;text-transform:uppercase;letter-spacing:.2em;color:var(--green);margin-bottom:12px}
.slabel::before{content:"";width:16px;height:2px;background:var(--green);border-radius:999px;display:inline-block}
.shead{font-family:'Oswald',sans-serif;font-size:clamp(32px,5.2vw,76px);line-height:.91;letter-spacing:-.015em;margin-bottom:14px}
.sbody{color:var(--ink2);line-height:1.9;font-size:clamp(13px,1.4vw,15px);max-width:620px}
.accent{color:var(--green)}
.country-selector{display:flex;flex-wrap:wrap;gap:8px;margin-bottom:22px;padding:14px 18px;background:var(--card);border:1px solid var(--border);border-radius:var(--r);box-shadow:var(--shadow)}
.cs-label{font-family:'Space Mono',monospace;font-size:8px;text-transform:uppercase;letter-spacing:.14em;color:var(--muted);width:100%;margin-bottom:4px}
.cpill-s{border:1.5px solid;padding:6px 13px;border-radius:999px;cursor:pointer;font-family:'Space Mono',monospace;font-size:8.5px;text-transform:uppercase;letter-spacing:.07em;transition:all .18s;background:transparent;font-weight:700;display:inline-flex;align-items:center;gap:5px}
.cpill-s.on{color:#fff!important}
.chart-block{background:var(--card);border:1px solid var(--border);border-radius:var(--r-lg);padding:24px;box-shadow:var(--shadow);margin-top:18px}
.chart-meta{display:flex;justify-content:space-between;align-items:flex-start;gap:14px;margin-bottom:16px;flex-wrap:wrap}
.chart-meta h3{font-family:'Oswald',sans-serif;font-size:clamp(15px,1.9vw,20px);letter-spacing:.01em;margin-bottom:2px;color:var(--ink)}
.chart-meta p{color:var(--muted);font-size:10.5px;font-family:'Space Mono',monospace}
.axis text{fill:var(--muted);font-family:'Space Mono',monospace;font-size:9px}
.axis line,.axis path{stroke:var(--border)}
.grid line{stroke:var(--bg3);stroke-dasharray:3,5}
.grid path{stroke:none}
.slider-wrap{display:flex;align-items:center;gap:16px;margin-bottom:14px;flex-wrap:wrap}
.yr-display{font-family:'Oswald',sans-serif;font-size:30px;color:var(--green);line-height:1;min-width:60px}
.yr-slider{-webkit-appearance:none;appearance:none;flex:1;height:4px;border-radius:999px;background:var(--bg3);outline:none;cursor:pointer;min-width:140px}
.yr-slider::-webkit-slider-thumb{-webkit-appearance:none;width:17px;height:17px;border-radius:50%;background:var(--green);cursor:pointer;box-shadow:0 2px 8px rgba(45,106,45,.28)}
.yr-slider::-moz-range-thumb{width:17px;height:17px;border-radius:50%;background:var(--green);border:none;cursor:pointer}
.brows{display:flex;flex-direction:column;gap:7px}
.brow{display:grid;grid-template-columns:128px 1fr 84px;align-items:center;gap:11px}
.brow-lbl{font-family:'Space Mono',monospace;font-size:8.5px;text-transform:uppercase;letter-spacing:.05em;color:var(--ink2);text-align:right}
.brow-track{background:var(--bg2);border-radius:999px;height:24px;overflow:hidden}
.brow-fill{height:100%;border-radius:999px;transition:width .55s cubic-bezier(.16,1,.3,1)}
.brow-val{font-family:'Oswald',sans-serif;font-size:16px;color:var(--ink2);text-align:right}
.section-story{background:linear-gradient(180deg,#1a1a1a 0%,#000000 100%);max-width:100%;padding:88px 0}
.section-story .inner{max-width:1360px;margin:0 auto;padding:0 52px}
.timeline{position:relative;padding-bottom:28px}
.timeline::before{content:"";position:absolute;left:50%;top:0;bottom:0;width:2px;background:linear-gradient(180deg,var(--green),transparent);transform:translateX(-50%)}
.tl-item{display:grid;grid-template-columns:1fr 52px 1fr;opacity:0;transform:translateY(22px);transition:opacity .65s,transform .65s}
.tl-item.in{opacity:1;transform:none}
.tl-item:nth-child(odd) .tl-content{text-align:right;padding-right:32px;padding-bottom:40px}
.tl-item:nth-child(even) .tl-content{padding-left:32px;padding-bottom:40px}
.tl-sp{display:flex;flex-direction:column;align-items:center;padding-top:4px}
.tl-dot{width:13px;height:13px;border-radius:50%;background:var(--green);border:3px solid var(--bg2);box-shadow:0 0 0 2px var(--green);margin-top:5px;flex-shrink:0}
.tl-yr{font-family:'Oswald',sans-serif;font-size:12px;color:var(--green);letter-spacing:.08em;margin-bottom:4px}
.tl-ttl{font-family:'Oswald',sans-serif;font-size:clamp(15px,2vw,20px);line-height:1.1;margin-bottom:5px;color:var(--ink)}
.tl-body{color:var(--ink2);font-size:12.5px;line-height:1.8}
.tl-tag{display:inline-block;margin-top:7px;padding:3px 8px;border-radius:999px;font-family:'Space Mono',monospace;font-size:8px;text-transform:uppercase;letter-spacing:.07em}
.tl-tag.clubs{background:rgba(45,106,45,.1);color:var(--green)}
.tl-tag.fans{background:rgba(211,47,47,.1);color:#d32f2f}
.tl-tag.global{background:rgba(230,168,23,.11);color:var(--gold)}
.map-layout{display:grid;grid-template-columns:1fr 310px;border:1px solid var(--border);border-radius:var(--r-lg);overflow:hidden;min-height:590px;box-shadow:var(--shadow-md);background:var(--card)}
#map-container{position:relative;background:#1a3a2a;min-height:590px;cursor:crosshair}
#map-container svg{display:block;width:100%;height:100%}
#map-hint{position:absolute;top:14px;left:50%;transform:translateX(-50%);font-family:'Space Mono',monospace;font-size:8px;color:var(--muted);letter-spacing:.1em;text-transform:uppercase;background:rgba(0,0,0,.9);padding:5px 12px;border-radius:999px;border:1px solid var(--border);pointer-events:none;z-index:5;transition:opacity .35s;white-space:nowrap}
#map-hint.hidden{opacity:0}
.map-panel{background:var(--card);border-left:1px solid var(--border);padding:22px 18px;overflow-y:auto}
.panel-placeholder{min-height:380px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:11px;color:var(--muted);font-family:'Space Mono',monospace;font-size:10.5px;text-align:center;line-height:1.8}
.ph-icon{font-size:40px;opacity:.35}
.panel-inner h3{font-family:'Oswald',sans-serif;font-size:clamp(24px,4.5vw,38px);line-height:.92;margin-bottom:3px}
.panel-sub{font-family:'Space Mono',monospace;font-size:8px;color:var(--muted);margin-bottom:18px;letter-spacing:.07em;text-transform:uppercase}
.panel-row{display:flex;justify-content:space-between;align-items:center;padding:9px 0;border-bottom:1px solid var(--border);gap:10px}
.panel-row span{font-family:'Space Mono',monospace;font-size:8px;color:var(--muted);text-transform:uppercase;letter-spacing:.05em}
.panel-row strong{font-size:13px;color:var(--ink);font-weight:600}
.panel-desc{margin-top:12px;font-size:11.5px;line-height:1.8;color:var(--muted)}
.panel-sparkline{margin-top:14px}
.psl-lbl{font-family:'Space Mono',monospace;font-size:8px;color:var(--muted);text-transform:uppercase;letter-spacing:.06em;margin-bottom:5px}
.map-pills{display:flex;flex-wrap:wrap;gap:7px;margin-top:16px}
.cpill-map{border:1.5px solid var(--border);background:transparent;padding:6px 13px;border-radius:999px;cursor:pointer;font-family:'Space Mono',monospace;font-size:8px;text-transform:uppercase;letter-spacing:.08em;transition:all .18s;color:var(--ink2)}
.cpill-map:hover{border-color:var(--green);color:var(--green)}
.fan-grid{display:grid;grid-template-columns:290px 1fr;gap:20px;align-items:start}
.fan-card{background:var(--card);border:1px solid var(--border);border-radius:var(--r-lg);padding:22px;position:sticky;top:84px;box-shadow:var(--shadow)}
.fan-card-ttl{font-family:'Oswald',sans-serif;font-size:15px;text-transform:uppercase;letter-spacing:.05em;color:var(--ink2);margin-bottom:16px}
.fan-item{display:flex;align-items:center;padding:11px 0;border-bottom:1px solid var(--border);gap:9px}
.fan-item:last-of-type{border-bottom:none}
.fan-icon{font-size:18px;flex-shrink:0}
.fan-name{font-family:'Space Mono',monospace;font-size:8px;text-transform:uppercase;letter-spacing:.07em;color:var(--muted);flex:1}
.fan-amt{font-family:'Oswald',sans-serif;font-size:20px;color:var(--green)}
.fan-total{margin-top:13px;padding:13px;background:var(--green-l);border:1px solid rgba(45,106,45,.18);border-radius:12px;text-align:center}
.fan-total-lbl{font-family:'Space Mono',monospace;font-size:8px;text-transform:uppercase;color:var(--green);letter-spacing:.1em;margin-bottom:4px}
.fan-total-val{font-family:'Oswald',sans-serif;font-size:32px;color:var(--ink)}
.charts-col{display:flex;flex-direction:column;gap:18px}
.compare-layout{
  display:flex;
  align-items:center;
  gap:32px;
  justify-content:center;
}
.radar-legend{background:var(--card);border:1px solid var(--border);border-radius:var(--r);padding:16px;box-shadow:var(--shadow)}
.rl-item{display:flex;align-items:center;gap:8px;padding:6px 0;border-bottom:1px solid var(--border);cursor:pointer;transition:opacity .18s}
.rl-item:last-child{border-bottom:none}
.rl-item.dim{opacity:.3}
.rl-dot{width:9px;height:9px;border-radius:50%;flex-shrink:0}
.rl-name{font-family:'Space Mono',monospace;font-size:8px;text-transform:uppercase;letter-spacing:.07em;color:var(--ink2)}
.bbl-lbl{font-family:'Space Mono',monospace;font-size:8.5px;fill:var(--ink2);pointer-events:none}
.section-suisse{background:linear-gradient(180deg,#1a1a1a 0%,#000000 100%);max-width:100%;padding:88px 0}
.section-suisse .inner{max-width:1360px;margin:0 auto;padding:0 52px}
.swiss-grid{display:grid;grid-template-columns:1fr 1fr;gap:18px}
.swiss-card{background:var(--card);border:1px solid var(--border);border-radius:var(--r);padding:17px 20px;display:flex;justify-content:space-between;align-items:center;box-shadow:var(--shadow)}
.swiss-lbl{font-family:'Space Mono',monospace;font-size:8px;text-transform:uppercase;letter-spacing:.08em;color:var(--muted)}
.swiss-val{font-family:'Oswald',sans-serif;font-size:25px;color:#00897b}
.swiss-ctx{margin-top:16px;color:var(--ink2);line-height:1.9;font-size:13px;padding:16px 18px;background:var(--card);border:1px solid var(--border);border-radius:var(--r);border-left:3px solid #29b6f6;box-shadow:var(--shadow);grid-column:1/-1}
.rev{opacity:0;transform:translateY(26px);transition:opacity .8s cubic-bezier(.16,1,.3,1),transform .8s cubic-bezier(.16,1,.3,1)}
.rev.in{opacity:1;transform:none}
.rev-d1{transition-delay:.1s}.rev-d2{transition-delay:.2s}.rev-d3{transition-delay:.3s}
.c-lbl{font-family:'Space Mono',monospace;font-size:8px;pointer-events:none;font-weight:700;text-transform:uppercase;letter-spacing:.03em;text-shadow:0 1px 3px rgba(255,255,255,.8)}
.acc-section{border:1px solid var(--border);border-radius:var(--r);overflow:hidden;margin-bottom:10px}
.acc-header{display:flex;align-items:center;justify-content:space-between;padding:11px 14px;cursor:pointer;font-family:'Space Mono',monospace;font-size:9px;text-transform:uppercase;letter-spacing:.12em;font-weight:700;user-select:none;transition:background .15s}
.acc-header:hover{background:var(--bg2)}
.acc-header .acc-icon{font-size:15px;margin-right:8px}
.acc-header .acc-arrow{transition:transform .25s;font-size:10px;opacity:.5}
.acc-header.open .acc-arrow{transform:rotate(180deg)}
.acc-body{max-height:0;overflow:hidden;transition:max-height .35s cubic-bezier(.16,1,.3,1)}
.acc-body.open{max-height:2000px}
.stat-row{display:flex;align-items:center;justify-content:space-between;padding:9px 14px;border-top:1px solid var(--border);cursor:pointer;transition:background .15s;gap:10px}
.stat-row:hover{background:var(--bg2)}
.stat-row.active{background:var(--green-l)}
.stat-row-left{display:flex;align-items:center;gap:8px;flex:1;min-width:0}
.stat-row-icon{font-size:13px;flex-shrink:0}
.stat-row-name{font-family:'Space Mono',monospace;font-size:8px;text-transform:uppercase;letter-spacing:.06em;color:var(--ink2);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.stat-row-val{font-family:'Oswald',sans-serif;font-size:15px;flex-shrink:0}
.stat-row-expand{font-size:9px;opacity:.4;flex-shrink:0;transition:transform .2s}
.stat-row.active .stat-row-expand{transform:rotate(180deg);opacity:.7}
.stat-chart-panel{overflow:hidden;max-height:0;transition:max-height .4s cubic-bezier(.16,1,.3,1);background:var(--bg2);border-top:1px solid var(--border)}
.stat-chart-panel.open{max-height:220px}
.stat-chart-inner{padding:10px 14px 6px}
.scroll-cat-section{position:relative;padding-bottom:0}
.scroll-cat-intro{padding-bottom:0!important}
.scroll-cat-selector{margin-top:22px}
.scroll-sticky-outer{position:relative;padding:24px 52px 0}
.scroll-trigger-spacer{height:0;display:block}
.scroll-sticky-panel{
  position:sticky;top:66px;
  display:grid;grid-template-columns:300px 1fr;
  height:calc(100vh - 82px);
  background:var(--card);border:1px solid var(--border);
  border-radius:var(--r-lg);box-shadow:var(--shadow-md);overflow:hidden;
}
.scroll-left{background:var(--bg2);border-right:1px solid var(--border);padding:18px 16px;overflow-y:auto;display:flex;flex-direction:column;gap:10px}
.scroll-left-header{font-family:'Oswald',sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:.08em;color:var(--muted);padding:0 2px 2px;flex-shrink:0;border-bottom:1px solid var(--border);margin-bottom:2px}
.scroll-budget-card{background:var(--card);border:1px solid var(--border);border-radius:var(--r);padding:13px;box-shadow:var(--shadow);flex-shrink:0}
.sbc-league{font-family:'Space Mono',monospace;font-size:8px;text-transform:uppercase;letter-spacing:.1em;color:var(--muted);margin-bottom:4px}
.sbc-title{font-family:'Oswald',sans-serif;font-size:11px;text-transform:uppercase;letter-spacing:.06em;color:var(--ink2);margin-bottom:10px}
.sbc-item{display:flex;align-items:flex-start;justify-content:space-between;padding:5px 0;border-bottom:1px solid var(--border);gap:8px}
.sbc-item:last-of-type{border-bottom:none}
.sbc-item-lbl{font-family:'Space Mono',monospace;font-size:7px;text-transform:uppercase;letter-spacing:.04em;color:var(--muted);flex:1;line-height:1.5}
.sbc-item-val{font-family:'Oswald',sans-serif;font-size:14px;flex-shrink:0}
.sbc-total{margin-top:8px;padding:8px;border-radius:9px;text-align:center}
.sbc-total-lbl{font-family:'Space Mono',monospace;font-size:7px;text-transform:uppercase;letter-spacing:.1em;margin-bottom:3px}
.sbc-total-val{font-family:'Oswald',sans-serif;font-size:22px}
.scroll-right{display:flex;flex-direction:column;padding:20px 24px 0;overflow:hidden;min-height:0}
.scroll-progress-dots{display:flex;gap:7px;margin-bottom:12px;flex-shrink:0}
.spd{width:8px;height:8px;border-radius:50%;background:var(--border);transition:background .25s,transform .2s;cursor:pointer;border:none;padding:0}
.spd.active{background:var(--green);transform:scale(1.35)}
.scroll-cat-league .spd.active{background:var(--gold)}
.scroll-chart-header{margin-bottom:12px;flex-shrink:0}
.scroll-chart-title{font-family:'Oswald',sans-serif;font-size:clamp(20px,2.3vw,30px);line-height:1.05;letter-spacing:-.01em;color:var(--ink);margin-bottom:5px;transition:opacity .2s}
.scroll-chart-desc{font-family:'Space Mono',monospace;font-size:8px;color:var(--muted);line-height:1.7;transition:opacity .2s}
.scroll-bar-chart{flex:1;min-height:0;position:relative;overflow:hidden}
.scroll-bar-chart svg{display:block}
.event-popup{
  position:absolute;background:var(--ink);color:#fff;
  border-left:3px solid var(--gold);border-radius:10px;
  padding:10px 13px;font-family:'Space Mono',monospace;font-size:8.5px;
  line-height:1.75;z-index:200;pointer-events:none;
  width:220px;box-shadow:var(--shadow-md);
  opacity:0;transition:opacity .15s;bottom:46px;
}
.event-popup.on{opacity:1;pointer-events:auto}
.event-popup-close{float:right;cursor:pointer;font-size:11px;opacity:.5;pointer-events:auto}
.event-popup-yr{color:var(--gold);font-size:8px;margin-bottom:3px;letter-spacing:.06em}
.event-popup-ttl{font-weight:700;margin-bottom:5px;font-size:10px;font-family:'Oswald',sans-serif;letter-spacing:.02em;line-height:1.15}
.scroll-cat-league .scroll-sticky-panel{border-color:rgba(230,168,23,.25)}
.scroll-cat-league .scroll-left{background:rgba(50,40,10,.55)}
.swiss-toggle-wrap{margin-top:32px}
.swiss-toggle-card{display:flex;align-items:center;gap:20px;background:var(--card);border:1.5px solid #29b6f6;border-radius:var(--r-lg);padding:22px 26px;box-shadow:0 4px 24px rgba(2,119,189,.1)}
.swiss-toggle-icon{font-size:38px;flex-shrink:0}
.swiss-toggle-text{flex:1;min-width:0}
.swiss-toggle-title{font-family:'Oswald',sans-serif;font-size:18px;color:var(--ink);margin-bottom:5px}
.swiss-toggle-sub{font-size:12.5px;color:var(--muted);line-height:1.65}
.swiss-toggle-btn{display:flex;align-items:center;gap:12px;border:none;background:transparent;cursor:pointer;flex-shrink:0;padding:0}
.stb-off,.stb-on{font-family:'Space Mono',monospace;font-size:10px;text-transform:uppercase;letter-spacing:.1em;font-weight:700;transition:opacity .2s}
.stb-off{color:var(--ink2)}
.stb-on{color:#00897b;display:none}
.stb-track{width:46px;height:24px;background:var(--bg3);border-radius:999px;position:relative;transition:background .3s;flex-shrink:0}
.stb-thumb{position:absolute;top:3px;left:3px;width:18px;height:18px;border-radius:50%;background:#333333;box-shadow:0 1px 4px rgba(255,255,255,.2);transition:transform .3s,background .3s}
.swiss-toggle-btn[aria-pressed="true"] .stb-track{background:#00897b}
.swiss-toggle-btn[aria-pressed="true"] .stb-thumb{transform:translateX(22px)}
.swiss-toggle-btn[aria-pressed="true"] .stb-off{display:none}
.swiss-toggle-btn[aria-pressed="true"] .stb-on{display:block}
.swiss-toggle-btn[aria-pressed="false"] .stb-on{display:none}
.swiss-toggle-btn[aria-pressed="false"] .stb-off{display:block}
.insight-box{margin-top:22px;padding:18px 22px;background:var(--card);border:1px solid var(--border);border-radius:var(--r);border-left:4px solid var(--green-v);box-shadow:var(--shadow)}
.insight-box.gold{border-left-color:var(--gold)}
.insight-box.blue{border-left-color:#29b6f6}
.insight-label{font-family:'Space Mono',monospace;font-size:8px;text-transform:uppercase;letter-spacing:.16em;color:var(--green);margin-bottom:7px;display:flex;align-items:center;gap:6px}
.insight-box.gold .insight-label{color:var(--gold)}
.insight-box.blue .insight-label{color:#29b6f6}
.insight-text{font-size:13px;color:var(--ink2);line-height:1.85}
.insight-text strong{color:var(--ink);font-weight:700}
.insights-row{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-top:22px}
.footer{padding:32px 52px;border-top:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;gap:18px;flex-wrap:wrap;background:var(--card)}
.footer-brand{font-family:'Oswald',sans-serif;font-size:18px;color:var(--green);font-weight:700;letter-spacing:.06em}
.footer-brand em{color:var(--muted);font-style:normal}
.footer p{font-family:'Space Mono',monospace;font-size:8px;color:var(--muted);line-height:1.8}
@media(max-width:900px){.insights-row{grid-template-columns:1fr}}
@media(max-width:900px){.scroll-sticky-outer{padding:16px 16px 0}.scroll-sticky-panel{grid-template-columns:1fr;height:auto;position:static}.scroll-trigger-spacer{height:auto!important}.scroll-left{border-right:none;border-bottom:1px solid var(--border);max-height:260px}}
@media(max-width:1100px){.fan-grid{grid-template-columns:1fr}.fan-card{position:static}.compare-layout{grid-template-columns:1fr}.swiss-grid{grid-template-columns:1fr}}
@media(max-width:900px){.nav{padding:12px 16px}.nav-links{display:none}.section{padding:60px 16px}.hero{padding:88px 16px 40px}.hero-stats-strip{grid-template-columns:1fr 1fr}.map-layout{grid-template-columns:1fr}.timeline::before{left:22px}.tl-item{grid-template-columns:44px 1fr}.tl-item:nth-child(odd) .tl-content,.tl-item:nth-child(even) .tl-content{grid-column:2;text-align:left;padding-left:14px;padding-right:0}.tl-item:nth-child(odd) .tl-sp,.tl-item:nth-child(even) .tl-sp{grid-column:1}.tl-item .tl-em{display:none}.section-story .inner,.section-suisse .inner{padding:0 16px}.footer{padding:22px 16px}}
@media(max-width:560px){.hero-stats-strip{grid-template-columns:1fr}.hero-title{font-size:clamp(44px,13vw,68px)}.brow{grid-template-columns:76px 1fr 52px}}

.gallery_box {
  position: relative;
  width: min(100%, 760px);
  margin: 0 auto 32px;
  min-height: clamp(320px, 45vh, 420px);
  display: flex;
  align-items: center;
  justify-content: center;
  perspective: 1800px;
  overflow: visible;
}
.gallery_box_outer {
  position: absolute;
  top: 50%;
  left: 50%;
  width: clamp(340px, 78vw, 580px);
  height: clamp(240px, 42vh, 340px);
  max-width: 580px;
  transform: translate(-50%, -50%);
  transform-style: preserve-3d;
  border-radius: 32px;
  overflow: visible;
}
.gallery_box_outer::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: 32px;
  box-shadow: inset 0 0 0 1px rgba(255,255,255,.08), inset 0 0 32px rgba(0,0,0,.16);
  pointer-events: none;
}
.gallery_box_in {
  position: absolute;
  width: min(300px, 80vw);
  height: min(240px, 38vh);
  left: 50%;
  top: 50%;
  transform-style: preserve-3d;
  transform-origin: center center;
  border-radius: 22px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.14);
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  box-shadow: 0 20px 40px rgba(0,0,0,.28);
  backface-visibility: hidden;
}
.gallery_box_in .overlay {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: 12px 14px 16px;
  background: linear-gradient(180deg, rgba(0,0,0,0) 42%, rgba(0,0,0,.92) 100%);
}
@media(max-width:900px){
  .gallery_box_outer { width: min(100%, 88vw); height: clamp(220px, 36vh, 300px); }
  .gallery_box_in { width: min(280px, 86vw); height: min(220px, 34vh); }
}
.gallery_box_in .overlay h3 {
  font-family: 'Oswald', sans-serif;
  font-size: clamp(16px, 1.8vw, 20px);
  margin: 0 0 8px 0;
  color: var(--ink);
}
.gallery-card-tag {
  margin-top: 12px;
  display: inline-flex;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 10px;
  letter-spacing: .08em;
  background: rgba(0,0,0,.42);
  color: #fff;
}
.gallery_box_in .overlay p {
  margin: 0;
  color: rgba(255,255,255,.92);
  font-size: clamp(11px, 0.95vw, 13px);
  line-height: 1.6;
}
.gallery-card-year {
  font-family: 'Space Mono', monospace;
  font-size: 10px;
  letter-spacing: .22em;
  text-transform: uppercase;
  color: rgba(255,255,255,.72);
  margin-bottom: 10px;
}
.gallery-card-tag {
  margin-top: 12px;
  display: inline-flex;
}


charts.js:

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


data.js:

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


map.js:

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


scroll.js:

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


store.js:

// Objet partagé par tous les modules.
// Rempli par initData() dans data.js avant tout rendu.
export const store = {
  swissMode: false,
  d3: null,
  YEARS: null,
  YEARS_EXT: null,
  LEAGUES: null,
  COUNTRIES: null,
  TIMELINE: null,
  CLUB_COORDS: null,
  TV: null,
  TICKET: null,
  JERSEY: null,
  TV_SUB: null,
  TV_SUB_FULL: null,
  AVG_SALARY_TS: null,
  WAGE_BILL: null,
  SPONSOR_REV: null,
  MERCH_REV: null,
  STADIUM_REV: null,
  TV_EXT: null,
  TICKET_EXT: null,
  JERSEY_EXT: null,
};


utils.js:

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


main.js:

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


index.html:

<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1.0"/>
<title>Football × Business — VisualDon HEIG-VD</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Oswald:wght@300;400;500;700&family=Space+Mono:wght@400;700&family=Barlow:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
<div id="prog"></div>
<div id="tt"></div>

<nav class="nav">
  <a class="nav-brand" href="#">FOOT<em>×</em>BUSINESS</a>
  <ul class="nav-links">
    <li><a href="#hero">Accueil</a></li>
    <li><a href="#section-story">Histoire</a></li>
    <li><a href="#map-section">Carte</a></li>
    <li><a href="#section-fan-scroll">Supporters</a></li>
    <li><a href="#section-league-scroll">Ligues</a></li>
    <li><a href="#section-access">Accessibilité</a></li>
    <li><a href="#section-compare">Radar</a></li>
    <li><a href="#section-suisse">Suisse</a></li>
  </ul>
</nav>

<header id="hero" class="hero">
  <div class="hero-pitch"></div>
  <div class="hero-circle"></div>
  <div class="hero-copy">
    <p class="eyebrow">⚽ VisualDon · HEIG-VD · 1990–2026</p>
    <h1 class="hero-title">FOOT<span class="outline">BALL</span><br><span class="x">×</span><br><span class="accent">BUSINESS</span></h1>
    <p class="hero-sub">En trente ans, les droits TV, les billets et le merchandising ont transformé le football en industrie à <strong>30 milliards €/an</strong>. Pendant ce temps, le fan moyen paie de plus en plus cher.</p>
    <a href="#section-story" class="hero-cta">Découvrir l'histoire ↓</a>
  </div>
  <div class="hero-stats-strip">
    <div class="hero-stat"><div class="hero-stat-value" data-count="3400" data-suffix="%">0%</div><div class="hero-stat-label">hausse droits TV Premier League</div></div>
    <div class="hero-stat"><div class="hero-stat-value" data-count="185" data-suffix="€">0€</div><div class="hero-stat-label">billet moyen Premier League 2026</div></div>
    <div class="hero-stat"><div class="hero-stat-value" data-count="97" data-suffix="€">0€</div><div class="hero-stat-label">maillot officiel adulte 2026</div></div>
    <div class="hero-stat"><div class="hero-stat-value" data-count="30" data-prefix="+" data-suffix=" Mrd€">0</div><div class="hero-stat-label">revenus totaux Big 5</div></div>
  </div>
</header>

<main>
<section id="section-story" class="section-story">
  <div class="inner">
    <div class="section-head"><p class="slabel">01 — Le tournant historique</p><h2 class="shead">Comment tout a <span class="accent">basculé</span></h2><p class="sbody">Les dates clés qui ont transformé un sport populaire en machine à milliards.</p></div>
    <div class="gallery_box">
      <div class="gallery_box_outer" aria-live="polite"></div>
    </div>
  </div>
</section>

<section id="map-section" class="section">
  <div class="section-head"><p class="slabel">02 — Carte des ligues</p><h2 class="shead">5 ligues, <span class="accent">5 univers</span></h2><p class="sbody">Clique sur un pays pour explorer droits TV, billets, maillots et abonnement fan.</p></div>
  <div class="map-layout">
    <div id="map-container"><div id="map-hint">🖱️ Survole pour info · Clique pour explorer</div></div>
    <aside class="map-panel"><div id="p-data"><div class="panel-placeholder"><div class="ph-icon">🗺️</div><p>Sélectionne un pays<br>sur la carte</p></div></div></aside>
  </div>
  <div id="cpills" class="map-pills"></div>
  <div class="insights-row">
    <div class="insight-box"><div class="insight-label">💡 Analyse — L'argent appelle l'argent</div><p class="insight-text">L'écart de droits TV entre la Premier League et la Ligue 1 n'est pas qu'une question de taille de marché : c'est une spirale auto-entretenue. Des droits plus élevés attirent de meilleurs joueurs, ce qui attire plus de téléspectateurs, ce qui fait monter les droits. La <strong>Liga et la Serie A</strong>, qui dominaient pourtant l'Europe dans les années 90-2000, n'ont pas su internationaliser leur produit assez tôt — elles en paient le prix structurellement aujourd'hui.</p></div>
    <div class="insight-box gold"><div class="insight-label">💡 Analyse — La règle 50+1, un rempart fragile</div><p class="insight-text">La Bundesliga maintient des billets à 15€ grâce à la règle 50+1 qui oblige les fans à détenir la majorité du capital. Mais cette règle est <strong>sous pression croissante</strong> : Hoffenheim, Leverkusen, Wolfsburg y ont déjà dérogé via des investisseurs historiques. Si elle cède, la trajectoire allemande rejoindra mécaniquement celle de l'Angleterre — comme ce fut le cas en France après le rachat du PSG par QSI en 2011.</p></div>
  </div>
</section>

<section id="section-fan-scroll" class="scroll-cat-section">
  <div class="scroll-cat-intro section">
    <p class="slabel">03 — Le coût d'être supporter</p>
    <h2 class="shead">Pendant ce temps,<br><span class="accent">le fan paie</span></h2>
    <p class="sbody">Billet, maillot, abonnements TV : compare le vrai coût d'être supporter selon les ligues.</p>
    <div class="scroll-cat-selector country-selector" id="fan-scroll-selector"></div>
  </div>
  <div class="scroll-sticky-outer" id="fan-sticky-outer">
    <div class="scroll-sticky-panel" id="fan-sticky-panel">
      <div class="scroll-left" id="fan-scroll-left"></div>
      <div class="scroll-right">
        <div class="scroll-progress-dots" id="fan-progress-dots"></div>
        <div class="scroll-chart-header">
          <div class="scroll-chart-title" id="fan-chart-title"></div>
          <div class="scroll-chart-desc" id="fan-chart-desc"></div>
        </div>
        <div id="fan-bar-chart" class="scroll-bar-chart"></div>
      </div>
    </div>
    <div class="scroll-trigger-spacer" id="fan-scroll-spacer"></div>
  </div>
  <div class="insights-row" style="max-width:1360px;margin:22px auto 0;padding:0 52px">
    <div class="insight-box"><div class="insight-label">💡 Analyse — Le billet : qui paie vraiment ?</div><p class="insight-text">La hausse du prix des billets cache une réalité sociale : les supporters historiques des quartiers ouvriers autour d'Anfield, de San Siro ou du Parc des Princes ont progressivement été <strong>déplacés vers les périphéries</strong>, remplacés par une clientèle touristique et corporate. Les stades se vident de leur âme populaire au profit de loges à 500€ la place. En Italie, ce phénomène explique en partie la <strong>baisse des affluences</strong> en Serie A malgré la qualité du jeu.</p></div>
    <div class="insight-box gold"><div class="insight-label">💡 Analyse — Les abonnements TV, une fragmentation délibérée</div><p class="insight-text">La multiplication des plateformes n'est pas accidentelle : les droits TV sont <strong>vendus en lots séparés</strong> aux enchères pour maximiser les revenus des ligues. En Espagne, voir tous les matchs du Real Madrid en 2026 nécessite Movistar <em>et</em> DAZN. En France, la faillite de Mediapro en 2020 a laissé des millions de fans sans accès légal. Ce modèle pousse paradoxalement au <strong>piratage de masse</strong> — les ligues scient la branche sur laquelle elles sont assises.</p></div>
  </div>
</section>

<section id="section-league-scroll" class="scroll-cat-section scroll-cat-league">
  <div class="scroll-cat-intro section">
    <p class="slabel">04 — Les revenus de la ligue</p>
    <h2 class="shead">Une machine<br>à <span class="accent">milliards</span></h2>
    <p class="sbody">Droits TV, sponsors, billetterie, merchandising : les revenus colossaux qui financent le spectacle.</p>
    <div class="scroll-cat-selector country-selector" id="league-scroll-selector"></div>
  </div>
  <div class="scroll-sticky-outer" id="league-sticky-outer">
    <div class="scroll-sticky-panel" id="league-sticky-panel">
      <div class="scroll-left" id="league-scroll-left"></div>
      <div class="scroll-right">
        <div class="scroll-progress-dots" id="league-progress-dots"></div>
        <div class="scroll-chart-header">
          <div class="scroll-chart-title" id="league-chart-title"></div>
          <div class="scroll-chart-desc" id="league-chart-desc"></div>
        </div>
        <div id="league-bar-chart" class="scroll-bar-chart"></div>
      </div>
    </div>
    <div class="scroll-trigger-spacer" id="league-scroll-spacer"></div>
  </div>
  <div class="insights-row" style="max-width:1360px;margin:22px auto 0;padding:0 52px">
    <div class="insight-box"><div class="insight-label">💡 Analyse — Les salaires comme arme concurrentielle</div><p class="insight-text">Quand la masse salariale d'une ligue absorbe plus de 90% de ses droits TV, il ne reste presque rien pour les infrastructures, la formation ou la dette. La Serie A, qui consacrait déjà 85% de ses revenus TV aux salaires dans les années 2000, <strong>a décliné sportivement</strong> au moment même où elle atteignait son pic financier — Calciopoli n'est qu'un catalyseur d'une crise déjà structurelle.</p></div>
    <div class="insight-box gold"><div class="insight-label">💡 Analyse — Le sponsor comme miroir du soft power</div><p class="insight-text">Les revenus sponsors de la Ligue 1 explosent depuis 2011 non pas grâce à la qualité du championnat, mais grâce au <strong>PSG comme vitrine du Qatar</strong>. De même, Manchester City (Abu Dhabi), Chelsea (Abramovich puis Boehly) et Newcastle (Arabie Saoudite) ont transformé leurs clubs en instruments de diplomatie sportive. Les sponsors ne financent plus le foot — ils <strong>achètent de la légitimité géopolitique</strong> à travers lui.</p></div>
  </div>
</section>

<section id="section-access" class="section">
  <div class="section-head">
    <p class="slabel">05 — Accessibilité dans le temps</p>
    <h2 class="shead">Le foot, de moins en<br><span class="accent">moins accessible</span></h2>
    <p class="sbody">Score d'accessibilité : rapport entre le budget annuel d'un supporter (billets + maillot + abos TV) et le salaire moyen du pays. Plus le score baisse, plus le foot devient un luxe.</p>
  </div>
  <div id="access-selector" class="country-selector"></div>
  <div class="chart-block">
    <div class="chart-meta"><div><h3>Score d'accessibilité · 1990–2026</h3><p>100 = très accessible · 0 = inaccessible · budget supporter / salaire mensuel moyen</p></div></div>
    <div id="access-chart"></div>
  </div>
  <div class="insights-row">
    <div class="insight-box"><div class="insight-label">💡 Analyse — Accessibilité et identité de classe</div><p class="insight-text">La corrélation entre la baisse d'accessibilité et la <strong>désindustrialisation</strong> des villes de football n'est pas fortuite. Liverpool, Manchester, Newcastle, Dortmund, Turin : ce sont des villes ouvrières dont les clubs ont été rachetés par des capitaux étrangers au moment même où leur base économique s'effondrait. Le supporter historique voit son club s'enrichir et son stade se transformer — mais <strong>pour quelqu'un d'autre</strong>.</p></div>
    <div class="insight-box gold"><div class="insight-label">💡 Analyse — La France, le cas à part</div><p class="insight-text">La Ligue 1 présente un paradoxe : ses droits TV ont progressé de +960% depuis 1990, mais son score d'accessibilité reste <strong>relativement correct</strong> comparé à l'Espagne ou l'Italie. La raison : les salaires français sont parmi les plus élevés d'Europe et les prix des billets hors PSG restent modérés.</p></div>
  </div>
</section>

<section id="section-compare" class="section">
  <div class="section-head"><p class="slabel">06 — Comparaison multidimensionnelle</p><h2 class="shead">Quelle est la ligue<br><span class="accent">la plus chère ?</span></h2><p class="sbody">Radar sur 5 dimensions : abos TV, billet, maillot, budget saison, accessibilité. Survole pour le détail · 2026.</p></div>
  <div id="compare-selector" class="country-selector"></div>
  <div class="chart-block" style="padding:16px 50px"><div id="radar-chart"></div></div>
  <div class="insights-row">
    <div class="insight-box"><div class="insight-label">💡 Analyse — La convergence vers le haut par le bas</div><p class="insight-text">Le radar révèle que La Liga, la Serie A et la Ligue 1 occupent un <strong>espace intermédiaire inconfortable</strong> : elles ont adopté la logique financière anglaise sans en avoir les revenus TV. Trop chères pour conserver leur base populaire, pas assez riches pour rivaliser sportivement avec la PL.</p></div>
    <div class="insight-box gold"><div class="insight-label">💡 Analyse — L'accessibilité comme indicateur de santé démocratique</div><p class="insight-text">Quand la Bundesliga maintient un score de 91 pendant que la PL chute à 8, il ne s'agit plus seulement d'économie sportive — il s'agit du type de société que ces ligues contribuent à construire. Le foot reste-t-il un <strong>bien commun ou un produit de luxe</strong> ?</p></div>
  </div>
</section>

<section id="section-suisse" class="section-suisse">
  <div class="inner">
    <div class="section-head">
      <p class="slabel">07 — Et chez nous ?</p>
      <h2 class="shead">La Suisse face<br>aux <span class="accent">géants</span></h2>
      <p class="sbody">La Swiss Super League reste dans une autre dimension économique. Mais les mêmes logiques marchandes s'y installent progressivement.</p>
    </div>
    <div class="swiss-grid" id="swiss-comparison"></div>
    <div class="insights-row">
      <div class="insight-box blue"><div class="insight-label">💡 Analyse — La richesse nationale comme bouclier temporaire</div><p class="insight-text">Le fan suisse bénéficie d'un <strong>effet richesse nationale</strong> qui masque l'inflation du foot local. Avec un salaire moyen deux fois supérieur à la moyenne européenne, même des billets en hausse restent proportionnellement abordables. Mais c'est un bouclier, pas une solution.</p></div>
      <div class="insight-box blue"><div class="insight-label">💡 Analyse — La Swiss SL, laboratoire du futur ?</div><p class="insight-text">La Super League suisse offre une perspective rare : celle d'un football <strong>encore ancré dans sa communauté</strong>. La vraie question est : <strong>jusqu'où veut-elle aller</strong> avant de décider que le modèle des Big 5 ne lui convient pas ?</p></div>
    </div>
    <div class="swiss-toggle-wrap" id="swiss-toggle-wrap">
      <div class="swiss-toggle-card">
        <div class="swiss-toggle-icon">🇨🇭</div>
        <div class="swiss-toggle-text">
          <div class="swiss-toggle-title">La Suisse joue-t-elle dans la même cour ?</div>
          <div class="swiss-toggle-sub">Active le mode Suisse pour intégrer la Swiss SL dans tous les graphiques et comparer directement avec les 5 grands championnats.</div>
        </div>
        <button class="swiss-toggle-btn" id="swiss-mode-btn" aria-pressed="false">
          <span class="stb-off">Activer la Suisse</span>
          <span class="stb-on">Suisse activée ✓</span>
          <span class="stb-track"><span class="stb-thumb"></span></span>
        </button>
      </div>
    </div>
  </div>
</section>
</main>

<footer class="footer">
  <div class="footer-brand">FOOT<em>×</em>BUSINESS</div>
  <div><p>Visualisation de données · HEIG-VD COMEM+ · VisualDon 2026</p><p>Sources : Deloitte Football Money League · UEFA · DFL · LFP · SFL · Football Supporters Europe · Eurostat</p></div>
</footer>

<script type="module" src="/src/main.js"></script>
</body>
</html>


package.json:

{
  "name": "football-business",
  "version": "1.0.0",
  "description": "Football x Business — VisualDon HEIG-VD",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  },
  "devDependencies": {
    "vite": "^5.0.0"
  },
  "dependencies": {
    "d3": "^7.8.5",
    "gsap": "^3.12.5"
  }
}


parfait, maintenant côté visuels, j'aimerais que tous les titres soient à la meme taille pour une meilleur uniformité et aussi qu'ils soient tous visibles quand le scroll se bloque sur un graph ou visuel (style map et timeline) donc les redescendre ou je sais pas comment tu veux faire, je veux aussi que les titres pour les circular barplot (Abonnements TV — toutes compétitions, Budget saison d'un fan type, etc) soient en haut à gauche du barplot (à droite du titre de la section(Pendant ce temps, le fan paie, etc) pour que quand on change de graph ce soit plus visible) fais pour les deux circular barplot) et je veux aussi que l'espace entre les graph et les "insights instructif" (style: 💡 Analyse — Accessibilité et identité de classe

La corrélation entre la baisse d'accessibilité et la désindustrialisation des villes de football n'est pas fortuite. Liverpool, Manchester, Newcastle, Dortmund, Turin : ce sont des villes ouvrières dont les clubs ont été rachetés par des capitaux étrangers au moment même où leur base économique s'effondrait. Le supporter historique voit son club s'enrichir et son stade se transformer — mais pour quelqu'un d'autre.) soit les memes partout pour une meilleur uniformité



redonne moi en entier tous les fichiers impactés pour que je copie colle