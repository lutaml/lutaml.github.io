# About LutaML

## The Name & Logo

### The Name

**LutaML** derives from the Latin word *"lutam"* meaning clay — a material that is malleable, flexible, and can take any form. This perfectly captures our mission: to provide a modeling framework that adapts to your needs, not the other way around.

### The Logo

The LutaML logo features **9 stacked boxes** representing data abstraction at multiple levels. Just as data can be modeled at different levels of abstraction, the logo's grid structure symbolizes:

- **Flexibility** — Boxes that can represent any data structure
- **Organization** — Systematic arrangement of complex information
- **Interconnection** — How different data models relate to each other

### Light & Dark Mode Logos

The LutaML logo adapts beautifully to light and dark modes, with each version revealing different aspects of the design:

<div class="logo-showcase">
  <div class="logo-card light-card">
    <div class="logo-card-header">Light Mode</div>
    <img src="/lutaml-logo_logo-full-light.svg" alt="LutaML Light Logo" class="logo-display" />
  </div>
  <div class="logo-card dark-card">
    <div class="logo-card-header">Dark Mode</div>
    <img src="/lutaml-logo_logo-full-dark.svg" alt="LutaML Dark Logo" class="logo-display" />
  </div>
</div>

**In light mode**, the boxes appear with subtle blue-white interiors, evoking the clean, open canvas of Ming Dynasty porcelain.

**In dark mode**, the boxes reveal their hidden treasure — golden interiors that shimmer through the transparent sections. This symbolizes the valuable data structures and insights that emerge when you look deeper into your models. The "LutaML" text also transforms to a warm gold color, reflecting the precious nature of well-modeled data.

<style>
.logo-showcase {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin: 2rem 0;
}

.logo-card {
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
}

.logo-card-header {
  font-weight: 600;
  margin-bottom: 1rem;
  font-size: 0.9rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.light-card {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border: 1px solid #cbd5e1;
}

.light-card .logo-card-header {
  color: #475569;
}

.dark-card {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border: 1px solid #334155;
}

.dark-card .logo-card-header {
  color: #94a3b8;
}

.logo-display {
  max-width: 220px;
  height: auto;
}

@media (max-width: 640px) {
  .logo-showcase {
    grid-template-columns: 1fr;
  }

  .logo-display {
    max-width: 180px;
  }
}
</style>

### The Colors

Our color palette draws inspiration from **Ming Dynasty porcelain**:

- **Blue & White** (Primary) — The iconic Ming porcelain colors representing elegance and clarity
- **Gold** (Dark mode accent) — Reveals the treasure within your data models
- **Three-Colored** (Accents) — Green for extended models, Red for transformed models

This historical connection reflects our commitment to standards that stand the test of time.

## Origin Story

LutaML was created to solve a fundamental challenge in software development: the need for a universal data modeler that works across different formats, standards, and use cases. Whether you're working with XML schemas, JSON APIs, or ISO standards like EXPRESS, LutaML provides a unified approach to modeling your data.

## Mission Statement

LutaML's mission is to provide **universal data modeling** that works with any format, any standard, and any use case. We believe developers shouldn't have to choose between flexibility and compliance — they should have both.

## The Ecosystem

| Project | Description | Category |
|---------|-------------|----------|
| [lutaml-model](https://github.com/lutaml/lutaml-model) | Multi-format data modeling (XML, JSON, YAML, TOML) | Core |
| [lutaml-hal](https://github.com/lutaml/lutaml-hal) | HAL API client framework | Core |
| [expressir](https://github.com/lutaml/expressir) | EXPRESS parser for ISO 10303 | Core |
| [lutaml-express](https://github.com/lutaml/lutaml-express) | EXPRESS language integration | Extended |
| [lutaml-uml](https://github.com/lutaml/lutaml-uml) | UML modeling support | Extended |
| [lutaml-xmi](https://github.com/lutaml/lutaml-xmi) | XMI interchange support | Extended |

## Use Cases

<div class="use-cases-grid">
  <div class="use-case-card">
    <h4>📊 Data Modeling</h4>
    <p>Define your data models once, serialize to any format</p>
  </div>
  <div class="use-case-card">
    <h4>📋 Standards Compliance</h4>
    <p>Work with ISO 10303, XML Schema, and industry standards</p>
  </div>
  <div class="use-case-card">
    <h4>🔗 API Integration</h4>
    <p>Build HAL-compliant REST APIs with ease</p>
  </div>
  <div class="use-case-card">
    <h4>⚙️ ISO/STEP Work</h4>
    <p>Parse and transform EXPRESS schemas for STEP data</p>
  </div>
</div>

## Standards Support

LutaML supports a wide range of data modeling standards:

- **ISO 10303 (STEP)** — Industrial automation systems and integration
- **XML Schema** — W3C XML Schema Definition Language
- **UML** — Unified Modeling Language
- **JSON Schema** — JSON-based format for defining structure
- **XMI** — XML Metadata Interchange

## Open Source

LutaML is an open source project. All our repositories are available on GitHub under permissive licenses.

- **GitHub Organization**: [github.com/lutaml](https://github.com/lutaml)
- **Contributing**: We welcome contributions! Check individual repositories for guidelines.
- **Issues**: Report bugs or request features on the respective GitHub issue trackers.

## Get Started

Ready to start modeling? Here's how:

1. **Read the Tutorial** — Start with our [Simple Tutorial](/docs/simple-tutorial)
2. **Explore the Docs** — Check out our [Documentation](/docs/simple-tutorial)
3. **View on GitHub** — Browse the [source code](https://github.com/lutaml)
4. **Join the Community** — Star our repos and contribute!

---

*Open source project maintained by [Ribose](https://www.ribose.com)*
