# FULCRUMHAUS Demo Portfolio

The demo library is split into two complementary bodies of work:

1. **Systems Lab** — six flagship product/operations demos built to the FULCRUMHAUS standard: polished live UI, realistic seeded data, mobile responsiveness, a signature interaction, and a case-study README with a business problem, architecture, and measurable value model.
2. **Prospect concepts** — the existing vertical and account-specific concept pages retained in `demos/*.html`.

## Flagship Systems Lab

| Demo | Domain | Signature interaction |
| --- | --- | --- |
| [HarborOps](./harborops/) | Marina / operations | Vessel-to-berth assignment using live length, draft, and tide constraints |
| [CivicFlow](./civicflow/) | Municipal / public sector | Compliance-gated permit routing, revision handling, and issuance |
| [Blackline](./blackline/) | Enterprise risk | Dependency-aware outage simulation with propagated executive exposure |
| [Fieldline](./fieldline/) | Field service | Office dispatch into technician workflow plus evidence-gated completion |
| [SignalRoom](./signalroom/) | AI / knowledge work | Source-grounded synthesis with an inspectable evidence trail |
| [FreightGrid](./freightgrid/) | Logistics | Network-disruption injection and consequence-aware recovery routing |

Open `demos/index.html` locally or visit `/demos/` on the deployed FULCRUMHAUS site for the portfolio gallery.

## Implementation principles

- No framework or package install is required.
- Each flagship demo is self-contained and can be adapted independently.
- Interaction state is held in memory; public demos do not require persistence.
- Seeded data is fictional and labeled accordingly.
- Modeled business-impact numbers are presented as targets or demonstration values, never as claimed client results.
- Each flagship demo has its own visual language so the library does not read as one dashboard template with different labels.
