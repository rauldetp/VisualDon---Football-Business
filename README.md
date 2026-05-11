# From Pitch to Profit  
## The Economic Evolution of Europe’s Top Football Leagues


## 🎨 Wireframe

Figma prototype:  
https://www.figma.com/design/beSusXySDdpg1PuXgSer7I/Sans-titre?node-id=0-1&t=ofjjxGtYV1JtnrXp-1

---

## 🎯 Contexte

Over the past decades, professional football has undergone major economic transformation. Broadcasting deals, sponsorship contracts, player salaries, ticket prices and merchandising costs have increased significantly, turning football into a powerful entertainment industry.

This project focuses on the financial evolution of the five major European leagues:

- Premier League (England)
- La Liga (Spain)
- Bundesliga (Germany)
- Serie A (Italy)
- Ligue 1 (France)

These leagues represent the economic core of European football and serve as key indicators of broader structural trends within the sport.

As Swiss students, we also include a short contextual section comparing these trends with the Swiss Super League, in order to reflect on how global financial dynamics influence smaller football markets.

Beyond revenues and ticket prices, we also examine the evolution of merchandising prices — particularly official jerseys and football apparel — as these products represent another important economic layer of modern football consumption.

---

## 📊 Data Sources

A COMPLETER SELON NOS RECHERCHES !! Voici quelques exemples qui pourraient nous être utiles :


<!-- - Deloitte Annual Review of Football Finance (league revenues)
- UEFA Financial Reports
- Historical broadcasting revenue data (league reports)
- Public studies and press investigations on average ticket prices
- Historical jersey price data (club shops archives, press reports, Wayback Machine archives)
- World Bank and OECD data (median income per country)
- Swiss Federal Statistical Office (OFS) for Swiss income data

All data sources will be cited precisely once the final datasets are selected and cleaned.

We focus on indicators that are available across multiple leagues to maintain structural comparability. -->

---

## ⚠ Potential Biases

- Financial data primarily covers top professional leagues.
- Ticket price data reflects averages and varies by category.
- Jersey and merchandise prices may differ depending on edition, supplier and year.
- Salary data may be estimated rather than officially disclosed.
- National median income does not represent all supporters.
- Reporting methodologies may differ across leagues and years.

Additionally, merchandising price data may require reconstruction from archived sources, which introduces methodological limitations.

Data reflects institutional and economic structures and is never neutral.

---

## 📈 Description des données

Datasets are structured in CSV format and contain both quantitative and categorical variables.

Main attributes include:

- `year` (number) — year of observation
- `league` (string) — league name
- `country` (string) — country
- `broadcasting_revenue` (number) — total TV revenue per league
- `avg_ticket_price` (number) — average ticket price
- `jersey_price` (number) — official home jersey retail price
- `median_income` (number) — national median income

Most variables are continuous numerical values (prices, revenues, income).  
Categorical variables include league and country.

All cleaned datasets are stored in the `/data` directory.

---

## 🧠 But

This project adopts a primarily explanatory approach.

We aim to visualize the economic growth of Europe’s top football leagues and compare this evolution with national income levels in order to question accessibility and financial imbalance.

By including merchandising prices (such as official jerseys), we expand the analysis beyond stadium access and examine the broader cost of participating in football culture as a supporter.

Our central question is:

**How has the economic structure of elite European football evolved, and what does this imply for its accessibility to ordinary supporters?**

The Swiss Super League will be included as a contextual comparison to reflect on how these economic dynamics resonate beyond the “Big Five” leagues.

---

## 🎨 Type de visualisation

The project will be implemented as an interactive website using:

- D3.js
- SVG
- d3-scale
- d3-axis
- d3-array
- d3-fetch

Planned visualizations:

1. Evolution of broadcasting revenues (Top 5 leagues)
2. Evolution of average ticket prices
3. Evolution of official jersey prices
4. Comparison between supporter costs (ticket + jersey) and median income
5. Cross-league comparison
6. Short contextual comparison with Switzerland

The site will combine narrative structure with interactive elements (hover, filtering, transitions).

---

## 👥 Audience

- Football supporters
- Students and researchers
- Individuals interested in sports economics
- European audience with contextual relevance for Switzerland

---

## 📚 Références

- Deloitte Annual Review of Football Finance
- UEFA Financial Reports
- World Bank Open Data
- OECD Data Portal
- Swiss Federal Statistical Office (OFS)
- Data journalism platforms such as The Pudding and FlowingData
- Academic research on sports commercialization
- Press investigations on football merchandising inflation

---

## 📌 Message

Elite European football has become a powerful economic system characterized by sustained financial growth.

By visualizing revenue expansion, ticket price inflation and merchandising cost increases, and comparing them with national income levels, this project seeks to make visible the structural transformation of football and question its evolving accessibility.

---

## ✅ What We Actually Built

> This section documents the adjustments made relative to the initial intentions described above.

### 🔧 Final Tech Stack

The project evolved well beyond a simple D3.js site. The final stack is:

- **Vite 5** — bundler and dev server (not part of the original plan)
- **D3.js v7** — charts, scales, axes, SVG transitions
- **GSAP 3 + ScrollTrigger** — scroll-driven animations, 3D carousel, section pinning (major addition vs. initial plan)
- **HTML / CSS / JavaScript vanilla** — ES Modules, no UI framework

### 🗂 Modular Architecture

The codebase is split into distinct modules:

| File | Role |
|---|---|
| `data.js` | Data loading and structuring |
| `store.js` | Shared global state across modules |
| `charts.js` | Line charts (TV rights evolution, correlations) |
| `scroll.js` | Scroll-driven circular bar visualizations |
| `map.js` | Interactive SVG map by country/league |
| `main.js` | Orchestration and initialization |

### 📊 Visualizations Built

1. **Hero section** — animated key stats on load (Big 5 aggregates)
2. **Historical carousel** — key moments in modern football (1992–2021), GSAP 3D animation
3. **Interactive SVG map** — country-level navigation, league data on click
4. **Circular bar charts** — revenue, ticket, jersey and salary evolution (1990–2026) per league
5. **Line charts** — TV rights evolution and economic correlations
6. **Supporter cost section** — tickets + jerseys + TV subscriptions + merchandising
7. **Switzerland comparison** — Swiss Super League as an accessible reference point
8. **Epilogue** — editorial synthesis + 2070 projection (CAGR model)

### 📈 Key Figures (Big 5 aggregate, 1990–2026)

| Indicator | Value |
|---|---|
| TV rights growth | +1,340% (€365M → €5,255M) |
| Average ticket price | €49 |
| Official adult jersey | €90 |
| Total Big 5 revenues | ~€37 billion/year |

### 📚 Sources Actually Used

The sources listed initially were partially revised. The following were effectively used:

- **Deloitte Football Money League** — club and league revenues
- **DFL Economic Report** — Bundesliga data
- **LFP (Ligue de Football Professionnel)** — Ligue 1 data
- **LaLiga** — La Liga financial data
- **Lega Serie A** — Serie A annual report
- **SFL (Swiss Football League)** — Swiss Super League data
- **Football Supporters Europe** — supporter costs, ticket prices
- **Eurostat** — national median incomes, economic context

> Sources initially considered but **not retained**: UEFA Financial Reports (aggregate data not usable at league level), CIES Football Observatory (not directly integrated), World Bank / OECD (replaced by Eurostat for European granularity).

### 📐 Data Format

Data was ultimately structured as **JSON** (rather than CSV as originally planned), in a single file:

```
public/data/football-data.json
```

This allowed time series per league to be embedded directly and fed into all modules through a single shared store.
