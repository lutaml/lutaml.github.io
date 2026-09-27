---
title: "LXR Package Build and SPA Site Generation"
description: Build portable XSD schema packages with fully resolved types, then generate interactive Vue.js documentation sites.
authors:
  - Ribose
date: 2026-04-08
---

# LXR Package Build and SPA Site Generation

<BlogByline />

With our latest release, lutaml-xsd now supports building **LXR packages** (LutaML XML Schema Repository) and generating **interactive SPA documentation** from XSD schemas. This post explains what LXR packages are, why they exist, and how they solve real problems when working with XSD schemas in practice.

## The Core Problem

When you work with XSD schemas in production, you quickly encounter a fundamental challenge: **XML schemas are not isolated artifacts — they form ecosystems**.

Consider a typical urban planning schema like i-UR used in Japan's PLATEAU project:

- `urbanFunction.xsd` imports `urbanObject.xsd`
- `urbanObject.xsd` imports GML 3.2 (Geography Markup Language)
- GML imports ISO 19139 (metadata), XLink, and its own base types
- CityGML modules import GML and their own extension schemas

This creates an **import graph spanning dozens of schemas from multiple organizations**, each with their own namespace, versioning, and conventions.

### What You Actually Need

When building XML documents against this ecosystem, you need to answer questions like:

- What is the **full definition** of `gml:CodeType`? What elements can use it?
- When `uro:BuildingType` extends `gml:AbstractFeatureType`, what does it inherit?
- What **elements and attributes** are available on `urf:LandUseType`?
- Which types does `uro:BuildingType` reference, and what do those reference?

Answering these questions requires **tracing type references across namespace boundaries**, resolving imports, and understanding the complete type graph. In practice this means:

1. Fetching remote schemas over HTTP (fragile, slow, offline impossible)
2. Manually tracking import chains and namespace mappings
3. Writing code to parse and resolve types across schema boundaries
4. Rebuilding this infrastructure for every new project

This is the problem LXR packages solve.

## What Is an LXR Package?

An **LXR package** (LutaML XML Schema Repository) is a self-contained archive that captures a **fully resolved schema ecosystem**.

It is not just a collection of XSD files. An LXR package contains:

1. **All XSD schema files** (when using `include_all` mode) — no external fetching required
2. **Pre-resolved type index** — every type, element, attribute, group, and their relationships
3. **Namespace mappings** — prefix-to-URI resolution for human-readable queries
4. **Schema location mappings** — the rewrite rules that redirect remote imports to local files
5. **Package metadata** — version, description, creation date, statistics

### What "Fully Resolved" Means

When you load an LXR package, you have immediate access to:

- **Type definitions** with all elements, attributes, restrictions, extensions
- **Reference resolution** — `gml:CodeType` resolves to its exact definition
- **Dependency graph** — what types reference what, and what references them (`used_by`)
- **Namespace awareness** — query by prefix (`gml:PointType`) or URI
- **Cross-schema navigation** — traverse from any type to any other type in the package

This is the difference between having **schema files** and having a **schema knowledge base**.

## Why Not Just Parse Schemas Directly?

You can parse XSD files at runtime, but there are significant costs:

**Performance**: Parsing a complex schema set takes 6+ seconds on first load. For production applications that start frequently, this overhead compounds.

**Reliability**: Remote schemas may be unavailable. URLs change. Network partitions happen. A package that includes all schemas locally is deterministic.

**Developer experience**: Navigating type references requires writing resolution code. An LXR package gives you a queryable API immediately.

**Composition**: Multiple packages can be merged into a unified repository with automatic conflict resolution — enabling reuse and separation of concerns. (See our upcoming post on package composition.)

## Building LXR Packages

An LXR package is created from a YAML configuration file that declares:

1. Which schema files to start from (`files`)
2. How to map remote import URLs to local files (`schema_location_mappings`)
3. Namespace prefix mappings (`namespace_mappings`)

### Simple Example

For a basic case with two independent schemas:

```yaml
# config.yml
files:
  - schemas/person.xsd
  - schemas/company.xsd

namespace_mappings:
  - prefix: "p"
    uri: "http://example.com/person"
  - prefix: "c"
    uri: "http://example.com/company"
```

Build with:

```bash
lutaml-xsd build from-config config.yml --output package.lxr
```

This packages two schemas with no imports between them — good for learning the basics.

### Real-World Example: i-UR Urban Function Schemas

A production schema ecosystem is more complex. The i-UR urban function schemas import GML, ISO 19139, and other standards:

```yaml
# config.yml
metadata:
  name: "i-UR Urban Function Schemas"
  version: "3.2.0"
  title: "i-UR Urban Function"

build:
  xsd_mode: include_all           # Bundle all schemas locally
  resolution_mode: resolved       # Pre-serialize for instant loading
  serialization_format: marshal   # Ruby-native format

files:
  - ../../spec/fixtures/i-ur/urbanFunction.xsd

schema_location_mappings:
  # Map GML 3.1.1 URLs to GML 3.2.1 local files
  - from: '^http://schemas\.opengis\.net/gml/3\.1\.1/(?:base/)?(.+\.xsd)$'
    to: ../../spec/fixtures/codesynthesis-gml-3.2.1/gml/3.2.1/\1
    pattern: true

  # Map CityGML HTTP URLs to local files
  - from: '^http://schemas\.opengis\.net/citygml/2\.0/(.+\.xsd)$'
    to: ../../spec/fixtures/citygml/2.0/\1
    pattern: true

  # Map ISO 19139 relative paths
  - from: '(?:\.\./)+((?:gmd|gco|gss|gts|gmx|gsr)/(.+\.xsd))$'
    to: ../../spec/fixtures/codesynthesis-gml-3.2.1/iso/19139/20070417/\1
    pattern: true

namespace_mappings:
  - prefix: "urf"
    uri: "https://www.geospatial.jp/iur/urf/3.2"
  - prefix: "uro"
    uri: "https://www.geospatial.jp/iur/uro/3.2"
  - prefix: "gml"
    uri: "http://www.opengis.net/gml/3.2"
```

Build and inspect:

```bash
lutaml-xsd build from-config config.yml --output urban_function.lxr
lutaml-xsd pkg stats urban_function.lxr
```

This produces a package with 50+ schemas, 200+ types, and 10+ namespaces — fully resolvable offline.

## Configuration Axes

LXR packages are configured along three independent axes:

### XSD Bundling Mode

`include_all` (recommended)::
  Bundles all referenced XSD files into the package with rewritten paths.
  Creates fully self-contained packages that work offline. Larger file size.

`allow_external`::
  Keeps original URL references. Package only contains metadata and indexes.
  Smaller file size, but requires network access for imports.

### Resolution Mode

`resolved` (recommended)::
  Pre-serializes all parsed schema objects. Instant loading — no XML parsing on load.
  Larger package size. Best for production and repeated queries.

`bare`::
  Only includes XSD files. Schemas are parsed on first load.
  Smaller package size. Best for development or schemas that change frequently.

### Serialization Format

`marshal`:: Ruby's native binary format. Fastest serialization/deserialization.
`json`:: Cross-platform text format. Human-readable, slower.
`yaml`:: Most human-readable. Best for debugging.
`parse`:: No serialization. Always parse XSD files. Smallest, slowest.

## What You Can Do With an LXR Package

### Query Types by Qualified Name

```bash
lutaml-xsd pkg type find gml:CodeType urban_function.lxr
```

Returns the full type definition: base type, elements, attributes, restrictions.

### Search Across All Namespaces

```bash
lutaml-xsd pkg search Geometry urban_function.lxr --limit 10
```

Finds types matching "Geometry" across all bundled schemas.

### Understand Type Relationships

For any type, you can navigate:
- What elements and attributes it contains
- What types it extends (for complex types)
- What types reference it (`used_by`)

### Inspect Package Statistics

```bash
lutaml-xsd pkg stats urban_function.lxr
```

Shows type counts by category (complex_type, simple_type, element, group, attribute_group), namespace counts, and more.

## SPA Generation

Once you have a package, you can generate an **interactive HTML documentation site** — a self-contained Vue.js SPA:

```bash
lutaml-xsd doc spa urban_function.lxr --mode vue_inlined --output docs.html
```

The `--mode vue_inlined` produces a **single HTML file** with all CSS and JavaScript embedded. No build step, no server required. Open in any browser.

### Appearance Customization

The `config.yml` can include an `appearance` section for branding:

```yaml
appearance:
  logos:
    long:
      light:
        path: "images/logo-plateau_logo-long.svg"
      dark:
        path: "images/logo-plateau_logo-long-dark.svg"
  colors:
    primary: "#5b9cd4"
    primary_light: "#7eb3de"
    accent: "#dbab3e"
  favicon:
    - type: "image/png"
      sizes: "96x96"
      path: "images/favicon/favicon-96x96.png"
```

This customizes logos, colors, favicons, typography, and custom CSS in the generated SPA.

## Deployed Example

The i-UR urban function schema documentation has been deployed at:

**https://metanorma.github.io/plateau-iur-schema-browser/**

This demonstrates the full SPA output with:
- Searchable type browser across 200+ types
- Namespace navigation
- Type detail views showing elements, attributes, restrictions
- Custom PLATEAU branding
- Dark/light mode support

## Package Composition

A single LXR package is powerful, but composition takes it further: multiple packages can be merged into a unified repository with automatic conflict detection and resolution.

This enables:
- **Separation of concerns** — maintain separate packages for different schema families
- **Reuse** — compose shared schema packages across multiple projects
- **Namespace remapping** — resolve conflicts when packages use overlapping URIs
- **Priority-based resolution** — control which package wins in conflicts

Package composition deserves its own detailed post. Stay tuned.

## Summary

LXR packages solve the real problems of working with XSD schema ecosystems:

- **Full type resolution**: Every type, element, attribute — resolved across namespaces and imports
- **Offline reliability**: All schemas bundled locally, no network dependency
- **Instant loading**: Pre-serialized schemas load in milliseconds, not seconds
- **Portable distribution**: Single `.lxr` file contains everything needed
- **Interactive documentation**: Generate branded SPA sites from packages
- **Composition**: Build packages for schema families and compose them as needed

For more details, see the documentation:

- [LXR Packages Guide](/lutaml-xsd/docs/LXR_PACKAGES)
- [SPA Generation Guide](/lutaml-xsd/docs/SPA_GUIDE)
- [Package Configuration](/lutaml-xsd/docs/PACKAGE_CONFIGURATION)

## Links

- [lutaml-xsd on GitHub](https://github.com/lutaml/lutaml-xsd)
- [LXR Package Documentation](/lutaml-xsd/docs/LXR_PACKAGES)
- [SPA Generation Guide](/lutaml-xsd/docs/SPA_GUIDE)
- [LutaML Project](https://lutaml.github.io/)
