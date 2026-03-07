# template-bun

A Nix flake template for Bun.js development environments. Provides `bun` and `node` via a reproducible dev shell.

## Prerequisites

- [Nix](https://nixos.org/download/) with flakes enabled
- [direnv](https://direnv.net/) (optional, for auto-activation)

## Usage

### Clone and enter the shell

```bash
nix develop
```

### With direnv (recommended)

```bash
direnv allow
```

The environment activates automatically whenever you `cd` into the project directory.

## What's included

| Tool | Purpose |
|------|---------|
| `bun` | JavaScript runtime and package manager |
| `node` | Node.js runtime |

## Forking

To use this as a base for your own project, fork or clone the repo and add your own `package.json` and source files. The flake is intentionally minimal — extend `buildInputs` in `flake.nix` to add more tools.
