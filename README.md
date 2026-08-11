# FULCRUMHAUS

**Strategy · Design · Engineering**

Find the leverage. Build the system.

FULCRUMHAUS is a premium digital systems consultancy website for strategy, digital experience, software, automation, AI systems, and ongoing optimization engagements.

## Systems Lab

The repository now includes a flagship interactive demo portfolio under [`demos/`](./demos/). Open `demos/index.html` locally or `/demos/` on the deployed site.

The six Systems Lab demos intentionally cover different industries, visual languages, and decision models:

- **HarborOps** — marina operations and constraint-aware berth assignment.
- **CivicFlow** — municipal permit intake, review, exception handling, and issuance.
- **Blackline** — enterprise risk dependencies and outage scenario propagation.
- **Fieldline** — field-service dispatch plus technician evidence-gated completion.
- **SignalRoom** — source-grounded research synthesis with inspectable evidence.
- **FreightGrid** — logistics exception detection and consequence-aware recovery routing.

Each flagship demo follows the FULCRUMHAUS standard: a polished live interface, realistic fictional seeded data, mobile responsiveness, one signature interaction, and its own case-study README covering the business problem, architecture, and measurable value model.

## Production structure

- `index.html` — main landing page
- `project.html` — executive project intake
- `privacy.html` — privacy policy
- `styles.css` — shared studio visual system
- `app.js` — navigation, intake review, validation, submission states
- `api/submit.js` — Vercel serverless lead endpoint
- `vercel.json` — clean routes and security headers
- `assets/` — production imagery
- `demos/index.html` — Systems Lab and concept gallery
- `demos/<system>/index.html` — standalone interactive flagship demos
- `demos/<system>/README.md` — case-study documentation for each flagship demo
- `demos/*.html` — existing prospect and vertical concept library

## Environment variables

Configure these in Vercel before testing submissions:

- `RESEND_API_KEY`
- `LEADS_TO_EMAIL`
- `LEADS_FROM_EMAIL`

Copy `.env.example` for local reference. Never commit real secrets.

## Deploy

Import this repository into Vercel. No build command is required for the static frontend. Vercel will serve the static files and deploy `api/submit.js` as a serverless function.

After deployment:

1. Add the three environment variables.
2. Redeploy if required.
3. Visit `/project` and submit a real test lead.
4. Confirm delivery and Reply-To behavior.
5. QA `/`, `/project`, `/privacy`, `/demos/`, and the six flagship Systems Lab routes at mobile, tablet, laptop, and desktop widths.

## Launch status

MVP launch candidate with an expanded interactive systems portfolio. Final production launch still requires live email-delivery verification and deployed-browser QA.
