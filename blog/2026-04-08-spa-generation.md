---
title: "Generating Interactive Schema Documentation with SPA Mode"
description: A comprehensive guide to generating self-contained Vue.js documentation sites from LXR packages, configuring appearance, and deploying to GitHub Pages.
authors:
  - Ribose
date: 2026-04-08
---

# Generating Interactive Schema Documentation with SPA Mode

<BlogByline />

The final piece of the LXR workflow is generating **interactive HTML documentation** from your package. This post covers how SPA generation works, how to configure it fully, and how to deploy it.

## Overview

When you have an LXR package, generating documentation is a single command:

```bash
lutaml-xsd doc spa urban_function.lxr --mode vue_inlined --output docs.html
```

The `--mode vue_inlined` flag produces a **single, self-contained HTML file** with all CSS and JavaScript embedded. No build step, no server required. Open it in any browser.

The output is a Vue.js 3 single-page application that provides:

- **Searchable type browser** across all namespaces
- **Type detail views** with elements, attributes, restrictions
- **Namespace navigation** sidebar
- **Dark/light mode** toggle
- **Custom branding** from your configuration

## Architecture

### Data Flow: Package to HTML

```
┌─────────────────────────────────────────────────────────────────────┐
│                    SPA GENERATION FLOW                               │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  urban_function.lxr                                                 │
│  (ZIP archive)                                                       │
│       │                                                              │
│       ▼                                                              │
│  SchemaRepositoryPackage.load()                                      │
│       │                                                              │
│       ▼                                                              │
│  SchemaSerializer.serialize()                                        │
│       │                                                              │
│       ├── build_metadata()      → title, description, appearance    │
│       ├── serialize_schemas()   → elements, types, attributes       │
│       ├── build_namespaces()    → prefix → URI mapping             │
│       ├── attach_used_by()      → reverse references               │
│       └── generate_diagrams()   → SVG type diagrams                │
│       │                                                              │
│       ▼                                                              │
│  { metadata, schemas[], namespaces[], index{} }  (JSON)             │
│       │                                                              │
│       ▼                                                              │
│  VueInlinedStrategy.generate()                                      │
│       │                                                              │
│       ├── read app.iife.js        (pre-built Vue app)               │
│       ├── read style.css         (compiled styles)                  │
│       ├── inject schema JSON     → window.SCHEMA_DATA              │
│       └── build complete HTML     → docs.html                        │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

### Two Output Modes

| Mode | Output | Server Required | Use Case |
|------|--------|-----------------|----------|
| `vue_inlined` | Single HTML file | No (works with `file://`) | Distribution, offline use |
| `vue_cdn` | HTML + separate JS/CSS | Yes (CORS requires HTTP) | Production web deployment |

`vue_inlined` is the default and recommended for most use cases.

## Generating Documentation

### From the CLI

```bash
# Build the LXR package first
lutaml-xsd build from-config config.yml --output urban_function.lxr

# Generate SPA documentation
lutaml-xsd doc spa urban_function.lxr --mode vue_inlined --output docs.html
```

### From the Ruby API

```ruby
require 'lutaml/xsd'

# Build the package
repository = Lutaml::Xsd::SchemaRepository.from_file('config.yml')
repository.parse.resolve

# Generate the SPA
generator = Lutaml::Xsd::Spa::Generator.new(
  repository.to_package,
  'urban_function_docs.html',
  mode: 'vue_inlined'
)
generator.generate
```

## Appearance Configuration

The `appearance` section of your `config.yml` controls the SPA's visual presentation.

### Complete Appearance Reference

```yaml
appearance:
  # ─── Logos ────────────────────────────────────────────────────────────
  logos:
    square:
      light:
        path: "images/logo-plateau_logo-square.svg"
        url: "https://example.com/logo.svg"    # OR use URL instead
      dark:
        path: "images/logo-plateau_logo-square-dark.svg"
    long:
      light:
        path: "images/logo-plateau_logo-long.svg"
      dark:
        path: "images/logo-plateau_logo-long-dark.svg"
    lutaml_logo:
      light:
        url: "https://raw.githubusercontent.com/lutaml/branding/main/svg/lutaml-logo_logo-full-light.svg"
      dark:
        url: "https://raw.githubusercontent.com/lutaml/branding/main/svg/lutaml-logo_logo-full-dark.svg"

  # ─── Favicon ──────────────────────────────────────────────────────────
  favicon:
    - type: "image/png"
      sizes: "96x96"
      path: "images/favicon/favicon-96x96.png"
    - type: "image/svg+xml"
      path: "images/favicon/favicon.svg"
    - type: "image/x-icon"
      path: "images/favicon/favicon.ico"
    - type: "image/png"
      sizes: "180x180"
      path: "images/favicon/apple-touch-icon.png"
    - type: "application/manifest+json"
      path: "images/favicon/site.webmanifest"

  # ─── Colors ────────────────────────────────────────────────────────────
  colors:
    primary: "#5b9cd4"           # Main brand color
    primary_light: "#7eb3de"    # Hover states
    primary_dark: "#3d82bf"     # Active states
    accent: "#dbab3e"           # Secondary accent
    background_primary: "#ffffff"
    background_secondary: "#f8fafc"

  # ─── Typography ────────────────────────────────────────────────────────
  typography:
    font_family: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
    mono_font_family: "'SF Mono', 'Monaco', 'Inconsolata', 'Fira Code', monospace"

  # ─── Layout ────────────────────────────────────────────────────────────
  layout:
    header_height: "64px"
    sidebar_width: "280px"
    content_padding: "24px"

  # ─── Border Radius ─────────────────────────────────────────────────────
  border_radius:
    default: "0.25rem"
    lg: "0.5rem"
    xl: "0.75rem"
    full: "9999px"

  # ─── Shadows ───────────────────────────────────────────────────────────
  shadows:
    sm: "0 1px 2px 0 rgba(0, 0, 0, 0.05)"
    default: "0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)"
    md: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
    lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)"

  # ─── Custom CSS ───────────────────────────────────────────────────────
  custom_css: |
    /* Inject additional styles */
    .header-title { font-family: 'Noto Sans JP', sans-serif; }
```

### Color Palette (Full Override)

The SPA supports a complete color palette override:

```yaml
colors:
  primary: "#5b9cd4"
  primary_light: "#7eb3de"
  primary_dark: "#3d82bf"
  secondary: "#64748b"
  secondary_light: "#94a3b8"
  secondary_dark: "#475569"
  accent: "#dbab3e"
  background_primary: "#ffffff"
  background_secondary: "#f8fafc"
  text_primary: "#0f172a"
  text_secondary: "#475569"
  border: "#e2e8f0"
  code_background: "#f1f5f9"
  link: "#3b82f6"
  link_hover: "#2563eb"
```

## Deployment

### Local File (No Server)

With `vue_inlined` mode, the output is a single HTML file that works via `file://`:

```bash
# Open directly in browser
open urban_function_docs.html

# Or serve locally
python3 -m http.server 8000
# Then visit http://localhost:8000/urban_function_docs.html
```

### GitHub Pages (Recommended)

The [PLATEAU i-UR Schema Browser](https://metanorma.github.io/plateau-iur-schema-browser/) is deployed on GitHub Pages. Here's the complete workflow:

#### 1. Project Structure

```
plateau-iur-schema-browser/
├── config.yml              # Package + appearance configuration
├── schemas/                # Local schema files
│   ├── i-ur/
│   └── codesynthesis-gml-3.2.1/
├── images/                 # Logos and favicons
│   ├── logo-plateau_logo-long.svg
│   └── favicon/
├── .github/
│   └── workflows/
│       └── deploy.yml      # CI/CD pipeline
└── urban_function_docs.html  # Generated (in .gitignore)
```

#### 2. GitHub Actions Workflow

```yaml
# .github/workflows/deploy.yml
name: Build and Deploy Schema Browser

on:
  push:
    branches: [main]
  workflow_dispatch:

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build-deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    if: ${{ github.ref == 'refs/heads/main' }}
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v6

      - name: Clone lutaml-xsd
        uses: actions/checkout@v6
        with:
          repository: lutaml/lutaml-xsd
          ref: main
          path: lutaml-xsd

      - name: Setup Ruby
        uses: ruby/setup-ruby@v1
        with:
          ruby-version: '4.0'
          bundler-cache: true

      - name: Build frontend SPA assets
        run: |
          cd lutaml-xsd/frontend
          npm install
          npm run build

      - name: Build LXR package
        run: bundle exec lutaml-xsd build from-config config.yml --output urban_function.lxr

      - name: Generate SPA documentation
        run: bundle exec lutaml-xsd doc spa urban_function.lxr --mode vue_inlined --output urban_function_docs.html

      - name: Prepare artifact
        run: |
          mkdir -p _site
          cp urban_function_docs.html _site/index.html
          cp -r images _site/

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v4
        with:
          path: _site

      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

#### 3. Build Pipeline Steps

```
┌─────────────────────────────────────────────────────────────────────┐
│                    CI/CD PIPELINE                                    │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│  1. Checkout code                                                    │
│           │                                                          │
│           ▼                                                          │
│  2. Clone lutaml-xsd (for frontend build)                           │
│           │                                                          │
│           ▼                                                          │
│  3. Build frontend assets                                           │
│      npm install → npm run build                                     │
│      (Builds frontend/dist/app.iife.js and style.css)               │
│           │                                                          │
│           ▼                                                          │
│  4. Build LXR package                                               │
│      lutaml-xsd build from-config config.yml                         │
│      (Resolves all schemas, creates urban_function.lxr)              │
│           │                                                          │
│           ▼                                                          │
│  5. Generate SPA documentation                                      │
│      lutaml-xsd doc spa urban_function.lxr                           │
│      (Creates urban_function_docs.html)                              │
│           │                                                          │
│           ▼                                                          │
│  6. Prepare artifact                                                │
│      Copy HTML to _site/, copy images/                               │
│           │                                                          │
│           ▼                                                          │
│  7. Deploy to GitHub Pages                                          │
│      actions/deploy-pages@v4                                        │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

## The Generated SPA Features

The resulting SPA at [metanorma.github.io/plateau-iur-schema-browser/](https://metanorma.github.io/plateau-iur-schema-browser/) provides:

### Home View
- **Schema cards** showing package metadata (title, version, description, authors)
- **Type statistics** (total types by category)
- **Namespace listing** with type counts per namespace
- **Quick search** prominently displayed

### Type Browser
- **Filterable grid** of all types (complex types, simple types, elements)
- **Category tabs** for filtering by type
- **Namespace filter** dropdown

### Type Detail View
- **Overview tab**: Documentation, base type, namespace info
- **Definition tab**: XML-like type structure showing elements/attributes
- **Source tab**: Raw XSD source
- **Diagram tab**: SVG visualization of type structure

### Navigation
- **Sidebar** with collapsible namespace tree
- **Breadcrumb** navigation
- **Back/forward** browser history support
- **Dark/light mode toggle** in header

## Configuration File Reference

For the complete schema of the configuration file, see [`lxr-package-config.schema.json`](/lutaml-xsd/docs/schemas/lxr-package-config.schema.json).

## Summary

SPA generation transforms your LXR package into an interactive documentation site:

- **Single command** to generate from any LXR package
- **Self-contained HTML** — no build server required for `vue_inlined`
- **Full appearance customization** — logos, colors, typography, favicons
- **GitHub Pages deployment** via simple CI/CD workflow
- **Production-ready** — Vue 3, responsive design, dark mode

The [PLATEAU i-UR Schema Browser](https://metanorma.github.io/plateau-iur-schema-browser/) demonstrates a complete deployment — generating documentation for 50+ schemas with custom PLATEAU branding.

## Links

- [SPA Guide](/lutaml-xsd/docs/SPA_GUIDE)
- [SPA Configuration](/lutaml-xsd/docs/SPA_CONFIGURATION)
- [PLATEAU Schema Browser](https://metanorma.github.io/plateau-iur-schema-browser/)
- [lutaml-xsd on GitHub](https://github.com/lutaml/lutaml-xsd)
