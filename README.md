# Urbanbrook Scent Memory Concept

An independent, public concept proposal by Two Weeks Team / AgentBa.se.

The site is the detailed interactive companion to a concise submission deck. It expands the complete proposal journey: Urbanbrook's existing experience assets, scent-memory evidence and hypotheses, mental-wellness market signals, the SILLÉANCE state and product system, a four-SKU launch roadmap, a user-controlled Persona Memory concept, a 12-week pilot, proposed collaboration roles, guardrails, and a claim-linked source hub.

It is a proposal for discussion, not an official Urbanbrook website, product launch, signed partnership announcement, or medical service.

## Public-content boundary

This repository intentionally excludes:

- the private first-proposal PDF and meeting notes;
- attendee details, negotiations, budgets, final owners, sample sizes, success thresholds, and internal pilot operations;
- unlicensed Urbanbrook, press, stock, or third-party product imagery;
- production prompts, personal data, API keys, and live agent memory.

Only public-safe concept copy, directly linked sources, and rights-documented project assets belong here.

## Local development

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Validation

```bash
npm run lint
npm run build
npm test
```

Vercel uses the same validated static export and removes build-only Vite
metadata before publishing:

```bash
npm run build:vercel
```

The deployment serves `dist/client` with the framework preset set to `Other`.
No runtime functions, storage, or environment variables are required.

## Status

- `SILLÉANCE`, `RETOUR 01`, `CLAIR 02`, `NUIT 03`, `AIR`, `PULSE`, `PEAU`, and `LIN` are working concept names.
- The Camille Persona interaction is a deterministic concept demo. Its memory view is simulated in React state only and is never persisted or transmitted.
- The site is configured as `noindex` while the concept and name clearance remain under review.
- Sources are recorded in [SOURCES.md](./SOURCES.md).
- Asset provenance is recorded in [ASSET_LICENSES.md](./ASSET_LICENSES.md).

## Rights

Source code, copy, names, and visual assets are not licensed for reuse unless a file explicitly says otherwise. Urbanbrook and third-party names remain the property of their respective owners.
