# FULCRUMHAUS

**Strategy · Design · Engineering**

Find the leverage. Build the system.

FULCRUMHAUS is a premium digital systems consultancy website for strategy, digital experience, software, automation, AI systems, and ongoing optimization engagements.

## Systems Lab

The repository includes a flagship interactive demo portfolio under [`demos/`](./demos/). Open `demos/index.html` locally or `/demos/` on the deployed site.

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
- `app.js` — navigation, intake review, validation, third-party submission, timeout handling, and direct-email fallback
- `api/submit.js` — optional Vercel/Resend serverless intake endpoint retained for a controlled first-party deployment path
- `vercel.json` — Vercel routes and security headers
- `assets/` — production imagery
- `demos/index.html` — Systems Lab and concept gallery
- `demos/<system>/index.html` — standalone interactive flagship demos
- `demos/<system>/README.md` — case-study documentation for each flagship demo
- `demos/*.html` — existing prospect and vertical concept library

## Current public deployment

GitHub Pages is the current static deployment path. The Pages workflow:

1. validates the public files and parses `app.js`;
2. creates clean `/project/` and `/privacy/` routes;
3. rewrites root-absolute links for the repository subpath so project Pages hosting does not break assets or navigation;
4. stages the Systems Lab and assets; and
5. deploys only the static public surface.

The browser project-intake form currently submits to FormSubmit and includes an explicit timeout plus a direct-email fallback if that service is unavailable. A production acceptance test still needs to confirm that a controlled submission arrives successfully at the configured inbox.

## Optional first-party Vercel intake

`api/submit.js` provides a stricter server-side intake path with validation, rate limiting, and Resend delivery. If the site is moved to Vercel and the browser is wired back to this endpoint, configure:

- `RESEND_API_KEY`
- `LEADS_TO_EMAIL`
- `LEADS_FROM_EMAIL`

Copy `.env.example` for local reference. Never commit real secrets.

## Local review

Serve the repository over a local HTTP server, then verify:

- `/` landing-page navigation and responsive layout;
- project intake review/validation states;
- `/privacy` content;
- `/demos/` plus the six flagship Systems Lab routes;
- keyboard/focus behavior and reduced-motion behavior where applicable.

Avoid sending test submissions from local development unless you intentionally want the configured inbox to receive them.

## Launch status

**MVP launch candidate.** Automated static validation and deployment are in place. Remaining production acceptance gates are:

1. confirm the latest Pages deployment resolves assets and clean routes under the repository subpath;
2. send one controlled project inquiry and confirm inbox delivery and Reply-To behavior;
3. run mobile, tablet, laptop, and desktop browser QA across `/`, `/project/`, `/privacy/`, `/demos/`, and the six flagship demos.
