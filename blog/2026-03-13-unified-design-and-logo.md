---
title: Introducing LutaML's New Unified Design and Logo
description: The LutaML project site now features a beautiful new design with a distinctive logo inspired by Ming Dynasty porcelain and a carefully crafted blue color palette.
authors:
  - Ribose
date: 2026-03-13
---

# Introducing LutaML's New Unified Design and Logo

<BlogByline />

The LutaML project site has been redesigned with a unified visual identity.

The new design features a distinctive logo and a carefully crafted blue
color palette inspired by Ming Dynasty porcelain, working beautifully across
light and dark modes.

## The new LutaML logo

The LutaML logo embodies the concept of universal data modeling with flexibility
and elegance.

<div class="logo-hero">
  <img src="/lutaml-logo_logo-full-light.svg" alt="LutaML Logo" class="hero-logo-light" />
  <img src="/lutaml-logo_logo-full-dark.svg" alt="LutaML Logo" class="hero-logo-dark" />
</div>

<style>
.logo-hero {
  padding: 2rem;
  border-radius: 12px;
  text-align: center;
  margin: 1.5rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.hero-logo-light,
.hero-logo-dark {
  max-width: 280px;
  height: auto;
}

.hero-logo-dark {
  display: none;
}

html.dark .hero-logo-light {
  display: none;
}

html.dark .hero-logo-dark {
  display: block;
}

/* Light mode: light background */
.logo-hero {
  background: linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%);
  border: 1px solid #cbd5e1;
}

/* Dark mode: dark background */
html.dark .logo-hero {
  background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%);
  border: 1px solid #334155;
}
</style>

## Design elements

### **The Name**

**LutaML** derives from the Latin word *"lutam"* meaning clay — a material that
is malleable, flexible, and can take any form. This perfectly captures our
mission: to provide a modeling framework that adapts to your needs, not the
other way around.

### **The 9 Stacked Boxes**

The logo features **9 stacked boxes** representing data abstraction at multiple
levels. Just as data can be modeled at different levels of abstraction, the
logo's grid structure symbolizes:

* **Flexibility** — Boxes that can represent any data structure
* **Organization** — Systematic arrangement of complex information
* **Interconnection** — How different data models relate to each other

### **The Ming Porcelain Colors**

Our color palette draws inspiration from **Ming Dynasty porcelain**, a
timeless art form known for its elegance and precision:

* **Blue** — The iconic Ming porcelain color representing elegance, clarity,
  and the depth of data structures
* **White** — The clean canvas upon which models are defined
* **Gold** (Dark mode) — Reveals the hidden treasure within data models
* **Green** — Accent color for extended models
* **Red** — Accent color for transformed models

This historical connection reflects our commitment to standards that stand
the test of time.

## Light & Dark Mode: Revealing Hidden Treasure

A special feature of the LutaML logo is how it transforms between light and
dark modes:

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

**In light mode**, the 9 stacked boxes appear with subtle blue-white interiors,
evoking the clean, open canvas of Ming Dynasty porcelain — ready to receive
any data structure you define.

**In dark mode**, something magical happens: the boxes reveal their hidden
contents through transparent sections, showing **golden interiors** that shimmer
within. The "LutaML" text also transforms to a warm gold color.

This design choice symbolizes a core truth about data modeling: when you look
deeper into your models, you discover valuable insights — the **treasure**
hidden within your data structures. Dark mode becomes an invitation to explore
and discover what's inside.

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

## Color palette

The brand colors were carefully chosen to create a distinctive aesthetic:

* **Primary Blue** (#1e40af) — Core brand color, conveying trust and stability
* **Light Blue** (#3b82f6) — Accent color for interactive elements
* **Dark Blue** (#1e3a8a) — Emphasis and depth

The palette avoids common tech industry tropes, giving LutaML a unique
visual identity that connects ancient craftsmanship with modern data modeling.

## What's new

The redesigned site includes these improvements:

* **Light/dark mode** — Full theme support with dedicated logos for each mode
* **Responsive design** — Optimized layouts for mobile, tablet, and desktop viewing
* **Project showcase** — Clear presentation of the LutaML ecosystem
* **Blog section** — Stay updated with project news and tutorials
* **Accessibility** — Improved color contrast and semantic HTML throughout

## The LutaML ecosystem

The site now showcases all LutaML projects in one place:

* **lutaml-model** — Multi-format data modeling (XML, JSON, YAML, TOML)
* **lutaml-hal** — HAL API client framework
* **expressir** — EXPRESS parser for ISO 10303

Plus extended models for EXPRESS, UML, and XMI integration.

## Feedback

We'd love to hear your feedback on the new design! Feel free to share your
thoughts by opening an issue on the
[LutaML GitHub repository](https://github.com/lutaml/lutaml.github.io/issues).
