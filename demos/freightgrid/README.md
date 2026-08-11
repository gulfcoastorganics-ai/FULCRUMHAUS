# FreightGrid — Logistics Exception Manager

A FULCRUMHAUS logistics demo that turns shipment telemetry, transfer windows, consequence, and route alternatives into an exception-response system rather than a passive tracking screen.

## Business problem

Shipment platforms are often good at showing where freight is and weaker at helping an operator decide what to do when the plan breaks. The business impact of a delay depends on the shipment, transfer window, customer consequence, available recovery paths, and speed of the response—not simply whether an ETA turned red.

## System architecture

- Static zero-build frontend compatible with the existing FULCRUMHAUS Vercel setup.
- Seeded freight entities include route, cargo consequence, transfer windows, mode, and current state.
- SVG route geometry plus HTML network nodes creates a lightweight live-network visualization without a mapping or charting dependency.
- Scenario state models a transfer-node closure and recalculates at-risk load count, on-time ETA, modeled exposure, route state, and recovery options.
- Recovery actions mutate the selected load and aggregate operational metrics in memory.

## Signature interaction

Inject a closure at **Relay K4**. FreightGrid propagates the exception into the route, the selected load, network exposure, and ETA model. The operator can then commit an alternate lane or hold strategy and immediately see the modeled consequence of that decision.

## Measurable value model

All network, shipment, and monetary values are fictional modeled data. A production system would measure:

- median minutes from exception detection to recovery decision;
- percentage of at-risk loads recovered inside their critical transfer windows;
- modeled versus realized delay cost;
- carrier acknowledgement time;
- number of exception escalations requiring manual spreadsheet reconciliation.

A realistic pilot target would be **30–50% faster exception response** and higher recovery-window retention on the small subset of loads carrying the greatest consequence.

## FULCRUMHAUS standard

- Live polished UI: yes
- Realistic seeded data: yes
- Mobile responsiveness: yes
- Signature interaction: disruption injection + consequence-aware recovery routing
- Case-study README with business problem, architecture, and measurable value: this file
