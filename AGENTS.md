# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js 16 App Router project. Route entry points live in `app/`: `app/layout.tsx` is the root layout and `app/page.tsx` serves `/`. Shared UI belongs in `components/`, with shadcn/Radix primitives in `components/ui/`. Reusable helpers live in `lib/`, currently `lib/utils.ts` with `cn()`. Static files are served from `public/`; product imagery is in `public/assets/`, with README media in `public/readme/`. Generated or framework types live in `types/`.

## Build, Test, and Development Commands

- `npm run dev`: start the local Next.js dev server.
- `npm run build`: create a production build and surface type/build errors.
- `npm run start`: run the built app after `npm run build`.
- `npm run lint`: run ESLint with `eslint-config-next` core web vitals and TypeScript rules.

Use `npm install` to sync dependencies from `package-lock.json`.

## Coding Style & Naming Conventions

Use TypeScript and strict typing for new code. Prefer 2-space indentation for new files and follow nearby style when editing. Use the `@/*` path alias instead of long relative imports. Name React components in PascalCase, utilities in camelCase, and route folders with Next conventions such as `books/new`, `[id]`, or `(group)`. Style with Tailwind CSS v4 utilities and theme tokens in `app/globals.css`; use `cn()` for conditional classes.

## Testing Guidelines

No test runner is configured in `package.json` yet. Until one is added, verify changes with `npm run lint` and `npm run build`. When adding tests, add the runner and script in the same change, prefer `*.test.ts` or `*.test.tsx` files near the code under test, and cover route behavior, auth UI, and shared utilities.

## Commit & Pull Request Guidelines

Follow `Commit message guidelines.md`: `feat:`, `fix:`, `docs:`, `style:`, `refactor:`, `perf:`, `test:`, `build:`, `ci:`, `enhance:`, or `revert:`. Keep descriptions imperative and concise. Pull requests should include a short summary, linked issue when available, screenshots for UI changes, notes for new environment variables, and results from `npm run lint` and `npm run build`.

## Security & Configuration Tips

Clerk powers authentication, so keep secrets in `.env.local` and never commit API keys. Public browser-safe values must use the `NEXT_PUBLIC_` prefix. Review image additions under `public/` for size and licensing before committing.

## Agent-Specific Instructions

This is not legacy Next.js. Before changing Next.js APIs, routing, config, caching, or file conventions, read the relevant local guide in `node_modules/next/dist/docs/` and follow any deprecation notes for this installed version.
