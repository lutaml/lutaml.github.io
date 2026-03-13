export interface Project {
  name: string
  version: string
  description: string
  github: string
  docs?: string
  featured: boolean
  category: string
}

export const projects: Project[] = [
  // Premier Projects
  {
    name: 'lutaml-model',
    version: 'v0.7.7',
    description: 'Multi-format data modeling library supporting XML, JSON, YAML, TOML, and more. Define your data model once, serialize to any format.',
    github: 'https://github.com/lutaml/lutaml-model',
    docs: 'https://github.com/lutaml/lutaml-model#readme',
    featured: true,
    category: 'Core'
  },
  {
    name: 'lutaml-hal',
    version: 'v0.1.10',
    description: 'HAL (Hypertext Application Language) API client framework for building RESTful API clients with automatic link traversal.',
    github: 'https://github.com/lutaml/lutaml-hal',
    docs: 'https://github.com/lutaml/lutaml-hal#readme',
    featured: true,
    category: 'Core'
  },
  {
    name: 'expressir',
    version: 'v2.2.0',
    description: 'EXPRESS language parser and tools for ISO 10303 STEP data modeling. Parse, analyze, and transform EXPRESS schemas.',
    github: 'https://github.com/lutaml/expressir',
    docs: 'https://github.com/lutaml/expressir#readme',
    featured: true,
    category: 'Core'
  },

  // Extended Models
  {
    name: 'lutaml',
    version: '',
    description: 'Universal data modeling language and toolkit for creating interoperable data models.',
    github: 'https://github.com/lutaml/lutaml',
    featured: false,
    category: 'Extended'
  },
  {
    name: 'lutaml-express',
    version: '',
    description: 'LutaML integration for EXPRESS language modeling and processing.',
    github: 'https://github.com/lutaml/lutaml-express',
    featured: false,
    category: 'Extended'
  },
  {
    name: 'lutaml-path',
    version: '',
    description: 'Path expression library for navigating and querying LutaML models.',
    github: 'https://github.com/lutaml/lutaml-path',
    featured: false,
    category: 'Extended'
  },
  {
    name: 'lutaml-store',
    version: '',
    description: 'Storage and persistence layer for LutaML models.',
    github: 'https://github.com/lutaml/lutaml-store',
    featured: false,
    category: 'Extended'
  },
  {
    name: 'lutaml-sysml',
    version: '',
    description: 'SysML modeling support for the LutaML ecosystem.',
    github: 'https://github.com/lutaml/lutaml-sysml',
    featured: false,
    category: 'Extended'
  },
  {
    name: 'lutaml-uml',
    version: '',
    description: 'UML modeling support with LutaML syntax and tools.',
    github: 'https://github.com/lutaml/lutaml-uml',
    featured: false,
    category: 'Extended'
  },
  {
    name: 'lutaml-xmi',
    version: '',
    description: 'XMI (XML Metadata Interchange) support for model interchange.',
    github: 'https://github.com/lutaml/lutaml-xmi',
    featured: false,
    category: 'Extended'
  },

  // Transformed Models
  {
    name: 'annotated-express',
    version: '',
    description: 'Tools for working with annotated EXPRESS schemas.',
    github: 'https://github.com/lutaml/annotated-express',
    featured: false,
    category: 'Transformed'
  },
  {
    name: 'express-grammar',
    version: '',
    description: 'EXPRESS language grammar definitions for parsing.',
    github: 'https://github.com/lutaml/express-grammar',
    featured: false,
    category: 'Transformed'
  },
  {
    name: 'expression',
    version: '',
    description: 'Expression parsing and evaluation library.',
    github: 'https://github.com/lutaml/expression',
    featured: false,
    category: 'Transformed'
  },
  {
    name: 'reeper',
    version: '',
    description: 'EXPRESS schema processing and transformation tools.',
    github: 'https://github.com/lutaml/reeper',
    featured: false,
    category: 'Transformed'
  },
  {
    name: 'versionian',
    version: '',
    description: 'Version management for data models and schemas.',
    github: 'https://github.com/lutaml/versionian',
    featured: false,
    category: 'Transformed'
  }
]

export const premierProjects = projects.filter(p => p.featured)
export const extendedProjects = projects.filter(p => !p.featured && p.category === 'Extended')
export const transformedProjects = projects.filter(p => !p.featured && p.category === 'Transformed')
