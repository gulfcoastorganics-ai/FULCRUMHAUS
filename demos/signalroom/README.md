# SignalRoom — AI Research Workspace

A FULCRUMHAUS knowledge-work demo for source-grounded research, claim synthesis, contradiction handling, and evidence-aware briefing.

## Business problem

Teams increasingly use AI to summarize documents, but summary speed is not the same as research quality. High-stakes work needs a visible source set, support for each claim, unresolved contradictions, explicit evidence gaps, and a way to turn analysis into a decision-ready brief without losing provenance.

## System architecture

- Static zero-build frontend compatible with the existing FULCRUMHAUS Vercel deployment model.
- Seeded corpus models internal memos, interview synthesis, scenario analysis, financial modeling, and a vendor proposal.
- Source-selection state is held in memory and drives a local deterministic synthesis simulation.
- Evidence mode exposes supporting snippets, claim-level confidence, and an unresolved evidence gap.
- No external model, vector database, or API is required for the demo, which keeps it reliable in a public portfolio while preserving the interaction pattern of a production AI research system.

## Signature interaction

Select the research sources, ask a question, and regenerate the synthesis. Then switch on **Evidence mode** to expose the specific support trail, confidence state, and unresolved gap instead of treating the answer as an opaque AI response.

## Measurable value model

All documents and claims in the demo are fictional. A production implementation would measure:

- researcher time from corpus intake to first decision-ready brief;
- percentage of material claims with traceable supporting evidence;
- contradictions surfaced before publication;
- citation correction rate during review;
- number and age of unresolved evidence gaps.

A useful pilot target would be **40–60% faster first-pass synthesis** while maintaining explicit provenance for every material conclusion and reducing manual citation reconstruction during review.

## FULCRUMHAUS standard

- Live polished UI: yes
- Realistic seeded data: yes
- Mobile responsiveness: yes
- Signature interaction: source-grounded synthesis with an inspectable evidence mode
- Case-study README with business problem, architecture, and measurable value: this file
