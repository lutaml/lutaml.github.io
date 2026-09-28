---
layout: ../../layouts/BlogPost.astro
title: "LXR Package Internals: Entrypoints, Schema Remapping, and Composition"
description: Deep dive into how LXR packages resolve dependencies automatically, how schema location remapping handles broken or outdated schemas, and how packages can be composed for reuse.
authors:
  - Ribose
date: 2026-04-08
---

# LXR Package Internals: Entrypoints, Schema Remapping, and Composition


This post dives into the advanced capabilities of LXR packages: how **entrypoints** drive automatic dependency resolution, how **schema location remapping** handles real-world schema brokenness, and how **package composition** enables reuse across projects.

## Entrypoints and Automatic Dependency Resolution

### The Import Graph Problem

When you declare a schema file in an LXR package configuration, that file is an **entrypoint** — not the full picture. XSD schemas declare `import` and `include` statements pointing to other schemas, which in turn import others:

```
┌─────────────────────────────────────────────────────────────────────┐
│                        DEPENDENCY RESOLUTION                         │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   user declares     automatic traversal        all schemas           │
│   ───────────     ──────────────────────    ────────────           │
│                                                                      │
│   urbanFunction.xsd ──► reads import ──► urbanObject.xsd             │
│                                   ──► reads import ──► gml.xsd      │
│                                                           │          │
│                                                  ┌────────┴────────┐ │
│                                                  │ gml.xsd imports │ │
│                                                  │  • xlink.xsd    │ │
│                                                  │  • gmlBase.xsd  │ │
│                                                  │  • basicTypes.xsd│ │
│                                                  └────────┬────────┘ │
│                                                           │          │
│                                                  ┌────────┴────────┐ │
│                                                  │ gmlBase.xsd     │ │
│                                                  │ imports         │ │
│                                                  │  • coordinateSystems │ │
│                                                  │  • datums.xsd   │ │
│                                                  │  • ...          │ │
│                                                  └────────────────┘ │
│                                                                      │
└─────────────────────────────────────────────────────────────────────┘
```

LXR packages automatically traverse this entire graph starting from your entrypoints, collecting every referenced schema.

### How It Works

In `XsdBundler.collect_all_xsds()`, the process is:

1. **Start with entrypoints** — files declared in `files:` in your config
2. **Parse each schema** — extract all `import` and `include` statements
3. **Follow each reference** — resolve the location via schema location mappings
4. **Repeat until exhausted** — no new schemas found
5. **Rewrite schemaLocation** — update import/include paths to work in the package

The key is that the `SchemaRepository` tracks all **processed schemas** — every schema it has encountered during parsing, along with its resolved location. The bundler collects from this complete set.

```ruby
# Simplified flow in XsdBundler
all_schemas = repository.send(:get_all_processed_schemas)
# all_schemas now contains EVERY schema in the graph, keyed by resolved location
```

### Why Entrypoints Matter

An entrypoint is the **root of a schema ecosystem**. From one entrypoint like `urbanFunction.xsd`, the resolver can reach 50+ schemas across multiple standards (GML, ISO 19139, CityGML, XLink). You never need to manually declare every file — just the top-level schemas your application uses.

This means:

- **Minimal configuration** — declare only your entrypoints, not every dependency
- **Complete bundling** — the resolver ensures no referenced schema is missing
- **Stable against schema updates** — if a dependency updates its own imports, your package still captures everything

### Multiple Entrypoints: Combining Schema Families

Some projects require **multiple independent schema families** in a single package. Consider Japan's PLATEAU project, which combines:

- **i-UR (urban renewal)** schemas for urban function and urban objects
- **FGD (Fundamental Geospatial Data)** schemas for base mapping
- **JPM (Japan Profile for Geographic Information Standards)** schemas for metadata

Each schema family has its own entrypoint, imports different dependencies, and serves different purposes. Yet you want a **unified documentation site** that lets users search across all of them.

```yaml
# config.yml for PLATEAU Schema Browser
files:
  - schemas/i-ur/urbanFunction.xsd   # i-UR urban function types
  - schemas/i-ur/urbanObject.xsd      # i-UR urban object types
  - schemas/fgd/FGD_GMLSchema.xsd     # Fundamental Geospatial Data
  - schemas/jmp/jmp20.xsd             # Japan Profile for Geographic Information Standards (JPGIS) Metadata

namespace_mappings:
  - prefix: "urf"
    uri: "https://www.geospatial.jp/iur/urf/3.2"
  - prefix: "uro"
    uri: "https://www.geospatial.jp/iur/uro/3.2"
  - prefix: "fgd"
    uri: "http://fgd.gsi.go.jp/spec/2008/FGD_GMLSchema"
  - prefix: "gml"
    uri: "http://www.opengis.net/gml/3.2"
  - prefix: "jmp"
    uri: "http://zgate.gsi.go.jp/ch/jmp/"

schema_location_mappings:
  # Map GML HTTP URLs to local files
  - from: '^http://schemas\.opengis\.net/gml/3\.1\.1/(?:base/)?(.+\.xsd)$'
    to: schemas/codesynthesis-gml-3.2.1/gml/3.2.1/\1
    pattern: true
  - from: '^http://schemas\.opengis\.net/gml/3\.2\.1/(.+\.xsd)$'
    to: schemas/codesynthesis-gml-3.2.1/gml/3.2.1/\1
    pattern: true
```

When the parser processes these entrypoints:

1. **urbanFunction.xsd** is parsed → imports GML → GML imports ISO schemas
2. **urbanObject.xsd** is parsed → also imports GML (shared!)
3. **FGD_GMLSchema.xsd** is parsed → imports GML (shared again!)
4. **jmp20.xsd** is parsed → has its own dependencies

The key insight: **schemas accumulate across entrypoint parses**. Each entrypoint may reference shared schemas like GML, but GML is only parsed once and reused. The parsed schemas are cached and shared, avoiding duplicate work and ensuring consistency.

This produces a package with:

| Namespace | Types | Description |
|-----------|-------|-------------|
| `urf` | 481 | Urban function types |
| `uro` | 621 | Urban object types |
| `fgd` | 100 | Fundamental geospatial data |
| `gml` | 866 | Geography Markup Language |
| `jmp` | 132 | Japan Profile for Geographic Information Standards (JPGIS) Metadata |
| **Total** | **3014** | Across all schema families |

All types searchable from a single unified SPA documentation site.

## Schema Location Remapping

Real-world schemas have broken, outdated, or intentionally modified import paths. LXR packages handle this through **schema location remapping** — redirecting any schema location to a local file of your choosing.

### Why Remapping Is Necessary

Consider this real example from the i-UR configuration. The schema declares:

```xml
<import namespace="http://www.opengis.net/gml/3.1.1"
        schemaLocation="http://schemas.opengis.net/gml/3.1.1/base/gml.xsd"/>
```

But GML 3.1.1 has a critical issue: its schema locations reference deprecated W3C URLs that now return errors. Specifically, W3C deprecated the `www.w3.org` namespace for XML Schema types, causing validation to fail. The solution: **remap GML 3.1.1 URLs to GML 3.2.1 files**, which are known to work.

```yaml
# Map GML 3.1.1 HTTP URLs to GML 3.2.1 local files
- from: '^http://schemas\.opengis\.net/gml/3\.1\.1/(?:base/)?(.+\.xsd)$'
  to: ../../spec/fixtures/codesynthesis-gml-3.2.1/gml/3.2.1/\1
  pattern: true
```

This remapping rule says: "Any HTTP request for `schemas.opengis.net/gml/3.1.1/*.xsd` — redirect to the local GML 3.2.1 copy."

### Pattern-Based Remapping

Remapping rules support **regular expressions** for flexible matching:

```yaml
schema_location_mappings:
  # Map CityGML HTTP URLs to local files
  - from: '^http://schemas\.opengis\.net/citygml/2\.0/(.+\.xsd)$'
    to: schemas/citygml/2.0/\1
    pattern: true

  # Map ISO 19139 relative paths (gmd, gco, gss, gts, gmx, gsr)
  - from: '(?:\.\./)+((?:gmd|gco|gss|gts|gmx|gsr)/(.+\.xsd))$'
    to: schemas/codesynthesis-gml-3.2.1/iso/19139/20070417/\1
    pattern: true

  # Map bare ISO 19139 schema filenames
  - from: '^(gmd|gco|gss|gts|gmx|gsr)\.xsd$'
    to: schemas/codesynthesis-gml-3.2.1/iso/19139/20070417/\1/\1.xsd
    pattern: true
```

### How Remapping Works in the Bundler

```
┌──────────────────────────────────────────────────────────────────────┐
│                    SCHEMA LOCATION REWRITING                          │
├──────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  Original XSD content:                                                │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │ <xs:import namespace="http://www.opengis.net/gml/3.2"         │  │
│  │         schemaLocation="http://schemas.opengis.net/gml/3.1.1/ │  │
│  │         base/gml.xsd"/>                                        │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                              │                                        │
│                              ▼                                        │
│                    schema_location_mappings:                           │
│                    from: gml/3.1.1/base/gml.xsd                      │
│                    to:   gml/3.2.1/gml.xsd (local)                   │
│                              │                                        │
│                              ▼                                        │
│  Rewritten XSD content (in package):                                 │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │ <xs:import namespace="http://www.opengis.net/gml/3.2"         │  │
│  │         schemaLocation="gml.xsd"/>                              │  │
│  └────────────────────────────────────────────────────────────────┘  │
│                                                                       │
│  The bundled package uses flattened basenames, so all                 │
│  schemaLocation values point to the correct local file.              │
│                                                                       │
└──────────────────────────────────────────────────────────────────────┘
```

The bundler (`rewrite_schema_locations`) reads each XSD file, finds all `import` and `include` elements, and rewrites their `schemaLocation` attributes to point to the correct file within the package.

## Package Composition

LXR packages can be **composed** — multiple packages merged into a unified repository with automatic conflict resolution. This enables separation of concerns and reuse.

### The Composition Model

```
┌─────────────────────────────────────────────────────────────────────┐
│                      PACKAGE COMPOSITION                              │
├─────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   Package A:                 Package B:                Package C:    │
│   ┌─────────────┐           ┌─────────────┐          ┌───────────┐ │
│   │ GML 3.2.1   │           │ CityGML 2.0 │          │ i-UR 3.2  │ │
│   │ Schema Set  │           │ Module Set  │          │ Schema    │ │
│   │             │           │             │          │           │ │
│   │ 40 schemas  │           │ 15 schemas  │          │ 10 schemas│ │
│   │ Types: 800  │           │ Types: 450  │          │ Types: 200│ │
│   └─────────────┘           └─────────────┘          └───────────┘ │
│          │                        │                         │       │
│          └────────────────────────┼─────────────────────────┘       │
│                                   │                                   │
│                                   ▼                                   │
│                    ┌──────────────────────────────┐                   │
│                    │   COMPOSED REPOSITORY        │                   │
│                    │                              │                   │
│                    │   All schemas merged          │                   │
│                    │   Type index unified          │                   │
│                    │   Namespace registry merged    │                   │
│                    │                              │                   │
│                    │   Conflict resolution:        │                   │
│                    │   - Priority: B > A > C     │                   │
│                    │   - Strategy: override       │                   │
│                    │                              │                   │
│                    └──────────────────────────────┘                   │
│                                                                       │
└─────────────────────────────────────────────────────────────────────┘
```

### Composition Configuration

```yaml
# composition.yml
base_packages:
  - package: schemas/gml-3.2.1.lxr
    priority: 0
    conflict_resolution: keep

  - package: schemas/citygml-2.0.lxr
    priority: 10
    conflict_resolution: override
    namespace_remapping:
      - from_uri: "http://www.opengis.net/citygml/2.0"
        to_uri: "http://example.com/citygml/2.0/modified"

  - package: schemas/i-ur-3.2.lxr
    priority: 5
    conflict_resolution: keep
    exclude_schemas:
      - "urbanObject.xsd"  # Already in GML package
```

### Conflict Resolution Strategies

| Strategy | Behavior |
|----------|----------|
| `keep` | First package wins; duplicates allowed |
| `override` | Highest priority package wins |
| `error` | Raise error on conflict |

### Namespace Remapping

When packages have overlapping URIs, use namespace remapping to disambiguate:

```yaml
namespace_remapping:
  - from_uri: "http://old.example.com/schema/v1"
    to_uri: "http://new.example.com/schema/v1"
```

## Advanced Package Queries

Once a package is loaded, you can query it deeply:

### Type Hierarchy

```bash
# Show type inheritance chain
lutaml-xsd pkg type hierarchy gml:AbstractFeatureType urban_function.lxr
```

### Dependency Analysis

```bash
# What types does BuildingType reference?
lutaml-xsd pkg type deps uro:BuildingType urban_function.lxr

# What types reference BuildingType (used_by)?
lutaml-xsd pkg type used-by uro:BuildingType urban_function.lxr
```

### Element Coverage Analysis

```bash
# Analyze which types are reachable from entry point elements
lutaml-xsd pkg coverage urban_function.lxr --entry UrbanFunctionType
```

## Summary

LXR packages provide sophisticated tooling for real-world schema challenges:

- **Automatic dependency resolution** — entrypoints drive full graph traversal
- **Schema location remapping** — redirect broken or outdated import paths to working files
- **Package composition** — merge packages with conflict resolution and namespace remapping
- **Deep querying** — type hierarchy, dependency analysis, coverage analysis

These capabilities enable you to build reliable, maintainable XML data pipelines even when working with complex, evolving schema standards.

## Links

- [LXR Package Internals](/lutaml-xsd/docs/ARCHITECTURE)
- [Package Composition](/lutaml-xsd/docs/PACKAGE_COMPOSITION)
- [Package Configuration](/lutaml-xsd/docs/PACKAGE_CONFIGURATION)
