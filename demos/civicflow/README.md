# CivicFlow — Municipal Permit Review

A FULCRUMHAUS public-sector workflow demo that turns permit intake, departmental review, service-level risk, and issuance readiness into one operational queue.

## Business problem

Permit teams frequently manage high-volume work across portal submissions, email, plan files, spreadsheets, departmental handoffs, and status questions from applicants. The bottleneck is rarely “lack of a form.” It is staff visibility into what needs attention, why, and what can move next.

## System architecture

- Static zero-build frontend compatible with the existing FULCRUMHAUS Vercel deployment model.
- In-memory permit entities include case ID, permit class, applicant, address, queue age, fee, SLA state, review stage, and compliance checklist state.
- Queue views are organized by intake, department review, and ready-to-issue stages.
- Staff actions mutate workflow state locally so the demo can show routing, revision requests, and permit issuance without a backend.
- Responsive mobile behavior converts the review board to horizontally scrollable work lanes while keeping the detailed decision panel usable.

## Signature interaction

Select a permit, complete its required checklist, and advance it through the review pipeline. The board, status labels, SLA indicators, and ready counts update immediately. A revision request moves the case into an exception state rather than pretending every application follows a happy path.

## Measurable value model

This is a fictional municipal system and contains no real permit records. A production pilot would measure:

- median staff touch time per permit;
- percentage of cases breaching review SLAs;
- time lost to incomplete submissions;
- number of status-check contacts per application;
- days from intake completion to permit issuance.

A reasonable pilot target would be **20–35% lower staff handling time on routine permits** and a material reduction in cases that become overdue because ownership or next action was unclear.

## FULCRUMHAUS standard

- Live polished UI: yes
- Realistic seeded data: yes
- Mobile responsiveness: yes
- Signature interaction: exception-aware permit routing and decision workflow
- Case-study README with business problem, architecture, and measurable value: this file
