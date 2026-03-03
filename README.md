# From Pitch to Profit  
## The Commercialization of European Football

---

## 🎯 Contexte

Football has historically been rooted in working-class culture and collective identity. Over the past decades, however, professional football has undergone significant financial expansion across Europe.

This project compares the financial evolution of the five major European football leagues:

- Premier League (England)
- La Liga (Spain)
- Bundesliga (Germany)
- Serie A (Italy)
- Ligue 1 (France)

with the Swiss Super League.

As Swiss students, we approach this topic from a European perspective while including Switzerland as a point of comparison. Our goal is not to rank leagues, but to examine structural economic trends across different football ecosystems.

### Data Sources

To ensure comparability, we selected standardized financial and economic indicators available across countries:

- Deloitte Annual Review of Football Finance (league revenues)
- UEFA financial reports
- Publicly available studies on average ticket prices
- World Bank / OECD data (median income per country)
- Swiss Federal Statistical Office (OFS) for Swiss economic data

### Potential Biases

- Financial data focuses primarily on professional leagues and does not include lower divisions.
- Ticket prices are averages and do not reflect all seat categories.
- Salary data may be estimated rather than officially disclosed.
- National median income does not represent all football supporters.
- Economic indicators vary depending on reporting methodology.

Data reflects institutional and economic priorities and is never neutral.

---

## 📊 Description des données

The datasets are structured in CSV format and primarily include quantitative variables.

Main attributes:

- `year` (number) — year of observation
- `league` (string) — name of the league
- `country` (string) — country
- `avg_ticket_price` (number) — average ticket price
- `broadcasting_revenue` (number) — total TV revenue per league
- `median_income` (number) — median annual income per country

Most variables are continuous numerical values (revenues, prices, income).  
Categorical variables include league and country.

All datasets are stored in the `/data` folder.

---

## 🧠 But

This project adopts a primarily explanatory approach.

We aim to visualize the economic transformation of European football over time and compare it with national income levels.

Our central question is:

**Has football in Europe become increasingly commercialized to the point of distancing itself from ordinary supporters?**

We do not aim to provide a definitive answer, but to highlight structural economic growth and the potential gap between football's financial expansion and supporters' purchasing power.

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

1. Evolution of broadcasting revenues per league  
2. Evolution of average ticket prices  
3. Comparison between ticket prices and median income  
4. Cross-league comparison including Switzerland  

The site will combine narrative structure with interactive elements (hover, filtering, transitions).

---

## 👥 Audience

- Football supporters
- Students and researchers
- Individuals interested in sports economics
- European audiences, including Switzerland

---

## 📚 Références

- Deloitte Annual Review of Football Finance
- UEFA Financial Reports
- World Bank Open Data
- OECD Data Portal
- Swiss Federal Statistical Office (OFS)
- The Pudding (data-driven storytelling)
- FlowingData
- Academic research on sports commercialization

---

## 📌 Message

Football is no longer only a sport — it is a major European economic industry.

By comparing financial growth with median income levels, this project seeks to make visible the evolving economic structure of European football and question its accessibility.