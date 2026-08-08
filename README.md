# FULCRUMHAUS

**Strategy · Design · Engineering**

Find the leverage. Build the system.

FULCRUMHAUS is a premium digital systems consultancy website for strategy, digital experience, software, automation, AI systems, and ongoing optimization engagements.

## Production structure

- `index.html` — main landing page
- `project.html` — executive project intake
- `privacy.html` — privacy policy
- `styles.css` — shared visual system
- `app.js` — navigation, intake review, validation, submission states
- `api/submit.js` — Vercel serverless lead endpoint
- `vercel.json` — clean routes and security headers
- `assets/` — production imagery

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
5. QA `/`, `/project`, and `/privacy` at mobile, tablet, laptop, and desktop widths.

## Launch status

MVP launch candidate. Design and application code are approved; final launch requires live deployment, email-delivery verification, and deployed-browser QA.
