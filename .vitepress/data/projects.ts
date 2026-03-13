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
    name: 'canon',
    version: '',
    description: 'Semantic comparison for serialization formats with W3C XML C14N canonicalization. Compare XML, HTML, JSON, and YAML semantically.',
    github: 'https://github.com/lutaml/canon',
    docs: 'https://lutaml.github.io/canon/',
    featured: true,
    category: 'Core'
  },
  {
    name: 'moxml',
    version: '',
    description: 'Modern XML processing library with unified API across Nokogiri, Oga, REXML, LibXML, and Ox backends.',
    github: 'https://github.com/lutaml/moxml',
    docs: 'https://lutaml.github.io/moxml/',
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
  {
    name: 'unibuf',
    version: '',
    description: 'Universal Buffer Format Parser for Protocol Buffers, FlatBuffers, and Cap\'n Proto with text/binary format support.',
    github: 'https://github.com/lutaml/unibuf',
    featured: true,
    category: 'Core'
  },
  {
    name: 'xmi',
    version: '',
    description: 'Ruby object mapper for XMI (XML Metadata Interchange) files with dynamic class generation.',
    github: 'https://github.com/lutaml/xmi',
    featured: true,
    category: 'Core'
  },

  // Extended Projects
  {
    name: 'rng',
    version: '',
    description: 'Ruby tools for RELAX NG schemas supporting both XML (.rng) and compact (.rnc) syntax.',
    github: 'https://github.com/lutaml/rng',
    featured: false,
    category: 'Extended'
  },
  {
    name: 'lutaml',
    version: '',
    description: 'Universal data modeling language and toolkit for creating interoperable data models.',
    github: 'https://github.com/lutaml/lutaml',
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
    name: 'ali',
    version: '',
    description: 'NISO Access and License Indicators (ALI) Schemas implementation (NISO RP-22-2021).',
    github: 'https://github.com/lutaml/ali',
    featured: false,
    category: 'Extended'
  },
  {
    name: 'genericode',
    version: '',
    description: 'OASIS Genericode 1.0 implementation for code lists in XML (.gc) and JSON (.gcj) formats.',
    github: 'https://github.com/lutaml/genericode',
    featured: false,
    category: 'Extended'
  },
  {
    name: 'messagepack',
    version: '',
    description: 'Pure Ruby MessagePack binary serialization format implementation.',
    github: 'https://github.com/lutaml/messagepack',
    docs: 'https://lutaml.github.io/messagepack/',
    featured: false,
    category: 'Extended'
  },
  {
    name: 'oasis-etm',
    version: '',
    description: 'OASIS Exchange Table Model TR 9503:1995 implementation for DocBook and NISO JATS.',
    github: 'https://github.com/lutaml/oasis-etm',
    featured: false,
    category: 'Extended'
  },
  {
    name: 'reqif',
    version: '',
    description: 'ReqIF (Requirements Interchange Format) v1.2 parser and generator.',
    github: 'https://github.com/lutaml/reqif',
    featured: false,
    category: 'Extended'
  },
  {
    name: 'versionian',
    version: '',
    description: 'Declarative versioning schemes library supporting semantic, calendar, and custom version formats.',
    github: 'https://github.com/lutaml/versionian',
    docs: 'https://lutaml.github.io/versionian/',
    featured: false,
    category: 'Extended'
  }
]

export const premierProjects = projects.filter(p => p.featured)
export const extendedProjects = projects.filter(p => !p.featured && p.category === 'Extended')

// Generate nav items for Software dropdown from all projects (sorted alphabetically)
export const softwareNavItems = [...projects]
  .sort((a, b) => a.name.localeCompare(b.name))
  .map(p => ({
    text: p.name,
    link: p.docs || p.github
  }))
