import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'LutaML',
  description: 'Universal data modeller',
  lang: 'en-US',

  head: [
    ['link', { rel: 'icon', type: 'image/png', href: '/favicon-96x96.png', sizes: '96x96' }],
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'shortcut icon', href: '/favicon.ico' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    ['meta', { name: 'theme-color', content: '#1e40af' }],
  ],

  themeConfig: {
    logo: {
      light: '/lutaml-logo_logo-full-light.svg',
      dark: '/lutaml-logo_logo-full-dark.svg'
    },
    siteTitle: false,

    nav: [
      { text: 'Introduction', link: '/docs/simple-tutorial' },
      {
        text: 'Software',
        items: [
          { text: 'lutaml-model', link: 'https://github.com/lutaml/lutaml-model' },
          { text: 'lutaml-hal', link: 'https://github.com/lutaml/lutaml-hal' },
          { text: 'expressir', link: 'https://github.com/lutaml/expressir' }
        ]
      },
      { text: 'Documentation', link: 'https://www.lutaml.org/docs/' },
      { text: 'About', link: '/about' }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/lutaml' }
    ],

    footer: {
      message: 'An open source project of <a href="https://www.ribose.com">Ribose</a>',
      copyright: 'Copyright © 2026 Ribose'
    },

    sidebar: {
      '/docs/': [
        {
          text: 'Documentation',
          items: [
            { text: 'Introduction', link: '/docs/simple-tutorial' },
            { text: 'Annotations', link: '/docs/annotations' },
            { text: 'Associations', link: '/docs/associations' },
            { text: 'Class/Enum/Abstract Entities', link: '/docs/class-enum-abstract-entities' },
            { text: 'Code Comments', link: '/docs/code-comments' }
          ]
        }
      ]
    },

    search: {
      provider: 'local'
    },

    outline: {
      level: [2, 3]
    }
  }
})
