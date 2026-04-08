## Cursor Cloud specific instructions

### Overview

This is a TypeScript coding challenge repository implementing `pMapLimit` — a concurrency-limited async map utility. The root project is the primary focus; the `Training/` and `Applications/` directories contain independent training exercises and are not part of the main project.

### Services

| Service | Command | Notes |
|---|---|---|
| Tests | `npm test` | Runs `vitest run`. No vitest config file exists; vitest uses defaults and picks up `test/` plus any `*.spec.ts` files recursively. |
| Typecheck | `npm run typecheck` | Runs `tsc -p tsconfig.json --noEmit` |
| Dev demo | `npm run dev` | Runs `tsx src/index.ts` — a one-shot demo, not a long-running server |
| Watch tests | `npm run test:watch` | Runs `vitest` in watch mode |

### Gotchas

- **`src/utils.ts` is intentionally empty** — it is part of the coding challenge. The `sleep` function is imported by `src/index.ts` and `test/challenge.test.ts` but must be implemented by the developer. This causes 3/7 tests to fail and `npm run dev` / `npm run typecheck` to error until `sleep` is exported from `src/utils.ts`.
- **Vitest picks up Training files**: Since there is no `vitest.config.ts`, vitest's default include pattern matches `Training/JohnK/*.spec.ts` files. These fail because `@playwright/test` is not installed at the root. This is expected — only `test/challenge.test.ts` is the target test file.
- **No external services required**: No databases, Docker, or network services are needed for the core project.
- **Node.js 22+** and **npm 10+** work without issues.
