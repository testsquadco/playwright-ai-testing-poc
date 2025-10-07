# Playwright + VS Code: Real-World E2E Workflow (v1.56)

This project shows a practical, human-friendly way to plan, generate, and maintain Playwright tests in VS Code. It uses Playwright’s built-in tooling and VS Code Chat to speed up the boring parts while keeping you in control.

Target app: https://demo-saas.bugbug.io/

## What’s in here
- `specs/saas-demo-test-plan.md` — a human-readable test plan you can edit like any other doc.
- `tests/` — TypeScript tests that match the plan.
- `seed.spec.ts` — a small bootstrap test you can use as a starting point for generated tests.
- `.github/chatmodes/` — VS Code Chat modes for planning, generating, and healing tests.
- `.vscode/mcp.json` — VS Code MCP server config used under the hood.
- `playwright.config.ts` — baseURL, retries, reporters, and device projects.
- `healer-fix.diff` — an example diff produced when fixing a deliberate selector failure (kept un-applied for review).

## Requirements
- Node.js 18+
- VS Code (latest)
- Playwright browsers

Install once:
```bash
npm i
npx playwright install
```

## Everyday commands
- Run all tests:
```bash
npm test -s
```
- UI or headed mode:
```bash
npm run test:ui
npm run test:headed
```
- Reports & traces:
```bash
npm run show-report
# Or open a specific trace
npx playwright show-trace test-results/<path-to-trace>.zip
```

## Using VS Code Chat (Planner → Generator → Healer)
You can do everything by hand, but VS Code Chat can help you move faster:

1) Planner (writes/updates the plan)
- Open VS Code Chat and select the Planner chat mode.
- Prompt idea: “Explore https://demo-saas.bugbug.io and create a comprehensive test plan. Save to specs/saas-demo-test-plan.md. Seed is seed.spec.ts.”

2) Generator (creates tests from the plan)
- In Chat, switch to the Generator chat mode.
- Prompt idea: “Generate Playwright TypeScript tests from specs/saas-demo-test-plan.md. Use seed.spec.ts. Save under tests/ with feature-based filenames.”

3) Healer (helps when something breaks)
- Make a realistic failure (for example, change a working selector to something that doesn’t exist).
- Run tests to capture the failure and artifacts: `npm test -s`.
- In Chat, switch to the Healer chat mode and ask it to analyze the failure and produce a Git-style unified diff patch. Save the output to `healer-fix.diff` so you can review it before applying.

## Tips we actually use
- Prefer accessible, role-based queries (e.g. `getByRole`) over brittle CSS/text-only selectors.
- If strict mode complains about duplicates, scope the query (e.g. `locator('form')`) or use `.first()`.
- Avoid relying on headings for assertions if the app doesn’t expose them as ARIA headings. URLs and stable controls are safer.
- Keep traces/screenshots on retries; they save time when debugging.

## Starting fresh in a new folder
If you’re bootstrapping a new repo, you can create the chat modes and seed file like this:
```bash
npx playwright init-agents --loop=vscode
```
That’s it—open VS Code, use Chat when it helps, and keep the tests readable and stable.
