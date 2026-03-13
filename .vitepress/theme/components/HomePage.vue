<script setup lang="ts">
import { premierProjects, extendedProjects } from '../../data/projects'
</script>

<template>
  <div class="home-hero">
    <img src="/lutaml-logo_logo-full-light.svg" alt="LutaML Logo" class="home-hero-logo light-logo" />
    <img src="/lutaml-logo_logo-full-dark.svg" alt="LutaML Logo" class="home-hero-logo dark-logo" />
    <h1>Universal Data Modeller</h1>
    <p>
      Define your data models once, use them everywhere. LutaML provides a unified approach
      to data modeling across multiple formats and standards.
    </p>
    <div class="home-hero-actions">
      <a href="/docs/simple-tutorial" class="vp-button medium brand">Get Started</a>
      <a href="https://github.com/lutaml" class="vp-button medium alt">View on GitHub</a>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">
      <span class="icon">★</span>
      Premier Projects
    </h2>
    <p class="section-description">
      The core projects that form the foundation of the LutaML ecosystem.
    </p>
    <div class="projects-grid">
      <div v-for="project in premierProjects" :key="project.name" class="project-card featured">
        <h3>
          {{ project.name }}
          <span v-if="project.version" class="version">{{ project.version }}</span>
        </h3>
        <p>{{ project.description }}</p>
        <div class="links">
          <a :href="project.github" class="primary" target="_blank" rel="noopener">GitHub</a>
          <a v-if="project.docs" :href="project.docs" class="secondary" target="_blank" rel="noopener">Docs</a>
        </div>
      </div>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">
      <span class="icon">⬡</span>
      Extended Models
    </h2>
    <p class="section-description">
      Extend LutaML's capabilities with specialized modeling tools.
    </p>
    <div class="project-list">
      <div v-for="project in extendedProjects" :key="project.name" class="project-list-item">
        <a :href="project.github" target="_blank" rel="noopener">{{ project.name }}</a>
        <span class="category-badge extended">{{ project.category }}</span>
      </div>
    </div>
  </div>

  <div class="section">
    <h2 class="section-title">
      <span class="icon">✦</span>
      Features
    </h2>
    <div class="features-grid">
      <div class="feature-card">
        <h4>🌐 Universal Modeling</h4>
        <p>Define models once, serialize to XML, JSON, YAML, TOML, and more.</p>
      </div>
      <div class="feature-card">
        <h4>📋 Standards Compliant</h4>
        <p>Full support for ISO 10303 EXPRESS, UML, and industry standards.</p>
      </div>
      <div class="feature-card">
        <h4>🔧 Flexible & Extensible</h4>
        <p>Modular architecture allows you to use only what you need.</p>
      </div>
      <div class="feature-card">
        <h4>🔗 API Integration</h4>
        <p>Build HAL-compliant REST APIs with automatic link traversal.</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.home-hero-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
}

.vp-button {
  display: inline-block;
  border: 1px solid transparent;
  text-align: center;
  font-weight: 600;
  border-radius: 20px;
  padding: 0 20px;
  line-height: 38px;
  font-size: 14px;
  text-decoration: none;
  transition: all 0.2s ease;
}

.vp-button.brand {
  background: var(--lutaml-primary);
  color: white;
}

.vp-button.brand:hover {
  background: var(--lutaml-primary-light);
}

.vp-button.alt {
  border-color: var(--vp-c-divider);
  background: var(--vp-c-bg-soft);
  color: var(--vp-c-text-1);
}

.vp-button.alt:hover {
  border-color: var(--lutaml-primary);
}

/* Show/hide logos based on theme */
.dark-logo {
  display: none;
}

.dark .dark-logo {
  display: block;
}

.dark .light-logo {
  display: none;
}
</style>
