# WME Scripts

Userscripts for [Waze Map Editor](https://www.waze.com/editor), built with [Bundlemonkey](https://github.com/nickvdyck/bundlemonkey) and TypeScript.

## Prerequisites

- [Bun](https://bun.sh/) (or Node.js)
- [Tampermonkey](https://www.tampermonkey.net/) or [Violentmonkey](https://violentmonkey.github.io/) browser extension

## Setup

```bash
bun install
```

## Development

```bash
# One-off build → .dev/
bun run build

# Watch mode (rebuilds on save) → .dev/
bun run watch

# Watch + serve over HTTP for remote install
bun run watch:remote
```

Built scripts land in `.dev/` as `<script-name>.user.js`. Install them in Tampermonkey by opening the file or using the remote URL from `watch:remote`.

## Adding a new script

1. Create a directory under `src/`:
   ```
   src/my-script/
   └── index.user.ts
   ```

2. Use `defineUserScript` from Bundlemonkey to declare the metadata and entry point:
   ```ts
   import { defineUserScript } from "bundlemonkey";

   export default defineUserScript({
     name: "My Script",
     version: "0.1.0",
     description: "What it does",
     match: ["https://www.waze.com/*/editor/*"],
     grant: ["unsafeWindow"],
     main: () => {
       unsafeWindow.SDK_INITIALIZED.then(initScript);
     },
   });

   async function initScript() {
     const wmeSdk = unsafeWindow.getWmeSdk!({
       scriptId: "my-script",
       scriptName: "My Script",
     });
     // your logic here
   }
   ```

3. Run `bun run build` — Bundlemonkey auto-discovers any `*.user.ts` file.

## Project structure

```
src/
  hello-world/          # Minimal SDK usage example
  wme-sdk-playground/   # Sidebar tab integration example
.dev/                   # Development build output (gitignored)
dist/                   # Production build output (gitignored)
```

## Code quality

```bash
bun run lint      # ESLint (TypeScript rules)
bun run format    # Prettier
```

## WME SDK reference

Types are provided by `wme-sdk-typings` (fetched from Waze's CDN at install time). Key APIs:

- `unsafeWindow.SDK_INITIALIZED` — Promise that resolves when the SDK is ready
- `unsafeWindow.getWmeSdk({ scriptId, scriptName })` — returns the `WmeSDK` instance
- `wmeSdk.Sidebar.registerScriptTab()` — register a sidebar panel
