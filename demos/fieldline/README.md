# Fieldline — Mobile Field Service Platform

A FULCRUMHAUS operations demo that connects dispatcher workload, technician availability, route context, job evidence, and completion into one field-service workflow.

## Business problem

Field-service teams lose margin when scheduling, technician notes, customer windows, photos, parts, and completion evidence live in separate tools or text threads. The office needs a reliable dispatch picture while technicians need a deliberately simpler mobile surface in the field.

## System architecture

- Static zero-build frontend designed for the existing FULCRUMHAUS Vercel stack.
- Seeded work-order model with service category, priority, duration, location, technician skill, and schedule state.
- Dispatch interaction mutates the visible technician lane and unassigned queue in memory.
- The mobile job card uses a required checklist to gate completion, modeling evidence capture before the work order can close.
- Desktop and mobile layouts intentionally differ: the office sees dense scheduling context while the technician view is task-focused.

## Signature interaction

Choose an unassigned work order and dispatch it into a technician schedule based on the selected crew. Then complete the active technician checklist in the mobile device view and close the job. Office status and field completion visually converge in the same experience.

## Measurable value model

All customers, technicians, and work orders are fictional demonstration data. A production deployment would measure:

- unassigned work-order age;
- schedule utilization by technician and skill;
- drive time between jobs;
- first-time-fix rate;
- percentage of completed jobs with required evidence;
- time from field completion to invoice-ready status.

A practical pilot target would be **15–25% more productive technician time** through better assignment and reduced office/field reconciliation, plus a measurable decrease in jobs returned for missing evidence.

## FULCRUMHAUS standard

- Live polished UI: yes
- Realistic seeded data: yes
- Mobile responsiveness: yes
- Signature interaction: office dispatch + technician evidence-gated completion
- Case-study README with business problem, architecture, and measurable value: this file
