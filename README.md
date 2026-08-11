# Urbanbrook Scent Memory Concept

An independent, public concept proposal by Two Weeks Team / AgentBa.se.

The site explores how an experience that begins in a physical space could be carried into daily life through scent, ritual, and a future Persona Agent. It is a proposal for discussion, not an official Urbanbrook website, product launch, partnership announcement, or medical service.

## Public-content boundary

This repository intentionally excludes:

- the private first-proposal PDF and meeting notes;
- attendee details, negotiations, budgets, and internal pilot protocols;
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

- `SILLÉANCE`, `RETOUR 01`, `CLAIR 02`, `AIR`, and `PULSE` are working concept names.
- The Persona interaction is a deterministic, no-storage concept demo.
- The site is configured as `noindex` while the concept and name clearance remain under review.
- Sources are recorded in [SOURCES.md](./SOURCES.md).
- Asset provenance is recorded in [ASSET_LICENSES.md](./ASSET_LICENSES.md).

## Rights

Source code, copy, names, and visual assets are not licensed for reuse unless a file explicitly says otherwise. Urbanbrook and third-party names remain the property of their respective owners.
