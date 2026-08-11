# HarborOps — Marina Operations Console

A FULCRUMHAUS systems demo showing how a marina can replace whiteboards, radio-only coordination, and fragmented arrival notes with a shared berth command surface.

## Business problem

Marina staff make time-sensitive berth decisions using vessel length, draft, tide, service requirements, berth availability, and local knowledge. When those inputs live in different places, coordination becomes slower and high-value dock capacity is harder to use efficiently.

## System architecture

- Responsive, zero-build HTML/CSS/JavaScript interface suitable for the existing FULCRUMHAUS static/Vercel stack.
- Seeded operational model for vessels, berth dimensions, draft constraints, occupancy, alerts, and tide conditions.
- Constraint engine evaluates vessel length and under-keel clearance against the selected berth and live tide adjustment.
- Interaction state stays in memory; the demo has no external APIs, persistence, or hidden network dependency.
- Accessible keyboard selection and live status messages make the primary workflow usable without pointer-only controls.

## Signature interaction

Select an arriving vessel and HarborOps immediately marks each open berth as compatible or unsafe. The tide control recalculates the safe-fit envelope in real time, and a compatible berth can be assigned directly from the map.

## Measurable value model

This is a fictional demonstration, not a reported client result. A production implementation would measure:

- median minutes from arrival notice to berth assignment;
- percentage of arrivals assigned without radio rework;
- berth utilization by size/depth class;
- service turnaround time at fuel and utility docks;
- number of constraint conflicts caught before vessel movement.

A reasonable pilot target would be **30–50% faster berth-assignment decisions** and a measurable reduction in avoidable reassignments once live AIS/tide/booking data is integrated.

## FULCRUMHAUS standard

- Live polished UI: yes
- Realistic seeded data: yes
- Mobile responsiveness: yes
- Signature interaction: constraint-aware berth assignment
- Case-study README with business problem, architecture, and measurable value: this file
