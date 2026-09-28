---
layout: ../../layouts/BlogPost.astro
title: "LXR Packages: A Complete Guide to Portable XSD Schema Repositories"
description: Learn how LXR packages solve the real problem of working with XML schema ecosystems — fully resolved types, offline access, and instant loading.
authors:
  - Ribose
date: 2026-04-08
---

# LXR Packages: A Complete Guide to Portable XSD Schema Repositories


When you work with XSD schemas in production, you quickly discover a fundamental truth: **schemas are not isolated artifacts — they form ecosystems**. This post explains what LXR packages are, why they exist, and how to use them.

## The Problem: XML Schemas Are Ecosystems

Consider a typical urban planning schema like the i-UR standard used in Japan's PLATEAU project. Its import graph looks like this:

```
urbanFunction.xsd
  └── urbanObject.xsd
        └── gml/3.2.1/gml.xsd
              ├── xlink/xlink.xsd
              ├── iso/19139/gmd/gmd.xsd
              │     ├── gco/gco.xsd
              │     ├── gss/gss.xsd
              │     ├── gts/gts.xsd
              │     ├── gmx/gmx.xsd
              │     └── gsr/gsr.xsd
              └── gml/3.2.1/basicTypes.xsd
                    └── ...
CityGML modules
  ├── appearance.xsd
  ├── building.xsd
  ├── rel_CityObject.xsd
  └── ...
        └── gml/3.2.1/gml.xsd (shared dependency)
```

This creates an **import graph spanning dozens of schemas from multiple organizations** — OGC, ISO, CityGML working groups. When you need to build XML documents against this ecosystem, you must answer questions like:

- What is the **full definition** of `gml:CodeType`? What elements can use it?
- When `uro:BuildingType` extends `gml:AbstractFeatureType`, what does it inherit?
- What **elements and attributes** are available on `urf:LandUseType`?

Answering these questions requires tracing type references across namespace boundaries — manually tracking import chains, fetching remote schemas, and writing resolution code. This is the problem LXR packages solve.

## What Is an LXR Package?

An **LXR package** (LutaML XML Schema Repository) is a self-contained archive that captures a **fully resolved schema ecosystem**.

It is not just a collection of XSD files. An LXR package contains:

1. **All XSD schema files** (when using `include_all` mode) — no external fetching required
2. **Pre-resolved type index** — every type, element, attribute, group, and their relationships
3. **Namespace mappings** — prefix-to-URI resolution for human-readable queries
4. **Schema location mappings** — rewrite rules that redirect remote imports to local files
5. **Package metadata** — version, description, creation date, statistics

When you load an LXR package, you have immediate access to:

- **Type definitions** with all elements, attributes, restrictions, extensions
- **Reference resolution** — `gml:CodeType` resolves to its exact definition
- **Dependency graph** — what types reference what, and what references them (`used_by`)
- **Namespace awareness** — query by prefix (`gml:PointType`) or full URI
- **Cross-schema navigation** — traverse from any type to any other type in the package

## Building an LXR Package

An LXR package is built from a YAML configuration file:

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

Then build with the CLI:

```bash
lutaml-xsd build from-config config.yml --output package.lxr
```

### Package Contents

An LXR package is a ZIP archive:

```
package.lxr/
├── metadata.yaml           # Package metadata and configuration
├── schemas/               # Bundled XSD files
│   ├── person.xsd
│   └── company.xsd
└── schemas_data/          # Pre-serialized schemas (when resolved)
    ├── person.marshal
    └── company.marshal
```

## Configuration Axes

LXR packages are configured along three independent axes:

### XSD Bundling Mode

| Mode | Description |
|------|-------------|
| `include_all` | Bundles all XSD files with rewritten paths. Fully offline. |
| `allow_external` | Keeps original URL references. Smaller, but requires network. |

### Resolution Mode

| Mode | Description |
|------|-------------|
| `resolved` | Pre-serializes schemas for **instant loading**. Best for production. |
| `bare` | Parses XSD on load. Smaller packages. Best for development. |

### Serialization Format

| Format | Description |
|--------|-------------|
| `marshal` | Ruby's native binary. Fastest. Ruby-only. |
| `json` | Cross-platform. Human-readable. |
| `yaml` | Most human-readable. Best for debugging. |
| `parse` | No serialization. Always parses XSD. Smallest. |

Recommended for production: `include_all` + `resolved` + `marshal`.

## What You Can Do With a Package

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

### Inspect Package Statistics

```bash
lutaml-xsd pkg stats urban_function.lxr
```

Shows type counts by category, namespace counts, and more.

### View Package Structure

```bash
lutaml-xsd pkg tree urban_function.lxr
lutaml-xsd pkg inspect urban_function.lxr
```

## A Real-World Example

The [PLATEAU i-UR Schema Browser](https://metanorma.github.io/plateau-iur-schema-browser/) demonstrates a production LXR package. Its configuration declares:

- **Entry files**: `urbanFunction.xsd` and `urbanObject.xsd`
- **Schema location mappings**: 12 regex rules mapping remote URLs (OGC, ISO, CityGML) to local files for offline processing
- **Namespace mappings**: `urf`, `uro`, `gml`, `xlink`, `xs`
- **Appearance**: Custom logos, colors, and favicons for the SPA

Building the package:

```bash
lutaml-xsd build from-config config.yml --output urban_function.lxr
```

The resulting package contains **50+ schemas, 200+ types, and 10+ namespaces** — fully resolvable offline, with a complete type index ready for queries.

## Summary

LXR packages solve the real problems of working with XSD schema ecosystems:

- **Full type resolution**: Every type, element, attribute — resolved across namespaces and imports
- **Offline reliability**: All schemas bundled locally, no network dependency
- **Instant loading**: Pre-serialized schemas load in milliseconds, not seconds
- **Portable distribution**: Single `.lxr` file contains everything needed

For more details, see the [LXR Packages Guide](/lutaml-xsd/docs/LXR_PACKAGES) and [Package Configuration](/lutaml-xsd/docs/PACKAGE_CONFIGURATION).

## Links

- [lutaml-xsd on GitHub](https://github.com/lutaml/lutaml-xsd)
- [LXR Package Documentation](/lutaml-xsd/docs/LXR_PACKAGES)
- [PLATEAU Schema Browser](https://metanorma.github.io/plateau-iur-schema-browser/)
