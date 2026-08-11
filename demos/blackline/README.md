# Blackline — Executive Risk Intelligence

A FULCRUMHAUS enterprise demo for consolidating vendor concentration, cyber controls, recovery readiness, data exposure, and critical-system dependencies into an executive decision surface.

## Business problem

Leadership teams often receive risk information as separate security reports, vendor spreadsheets, compliance evidence, and incident updates. Those artifacts can be individually accurate while still failing to answer the executive question: **what breaks, what does it affect, and what is worth funding first?**

## System architecture

- Static, zero-build risk console compatible with the existing FULCRUMHAUS repository and Vercel deployment model.
- Seeded dependency graph models critical systems, business owners, vendor tiers, control posture, and risk severity.
- Scenario state is held entirely in memory and recalculates executive exposure, risk-domain scores, dependency visualization, and modeled revenue impact.
- SVG edges and HTML nodes create an interactive dependency map without a charting library or runtime dependency.
- The selected-dependency panel turns graph nodes into decision context instead of leaving the visualization purely decorative.

## Signature interaction

Run the **PayRail outage** scenario. Blackline propagates the modeled effect through connected systems, increases the exposure index, changes risk-domain weights, raises modeled revenue-at-risk, highlights affected paths, and surfaces the resulting executive action load.

## Measurable value model

This is a fictional enterprise and all values are modeled demonstration data. A production implementation would measure:

- time required to assemble an executive risk briefing;
- percentage of Tier 0 dependencies with tested recovery evidence;
- number of single-vendor concentration points;
- mean age of evidence supporting critical controls;
- time from a material risk signal to assigned executive action.

A useful pilot target would be **50%+ faster executive risk synthesis** and a measurable increase in critical dependencies with an explicitly owned mitigation or recovery plan.

## FULCRUMHAUS standard

- Live polished UI: yes
- Realistic seeded data: yes
- Mobile responsiveness: yes
- Signature interaction: dependency-aware outage scenario simulation
- Case-study README with business problem, architecture, and measurable value: this file
