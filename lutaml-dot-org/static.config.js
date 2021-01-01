
        import path from 'path'

        const DOCS_PATH = path.join(__dirname, 'docs');

        export default {
          entry: path.join(__dirname, 'src', 'index.tsx'),
          getRoutes: async () => {
            return [
            ]
          },
          plugins: [
            'react-static-plugin-typescript',
            'react-static-plugin-styled-components',
            [
              '@riboseinc/react-static-plugin-aperis-doc-pages',
              {
                sourcePath: DOCS_PATH,
                urlPrefix: '',
                title: "LutaML documentation",
                headerBanner: 'header-banner.svg',
                footerBanner: 'footer-banner.svg',
                footerBannerLink: "https://open.ribose.com/",
              }
            ],
            require.resolve('react-static-plugin-reach-router'),
            require.resolve('react-static-plugin-sitemap'),
            [
              'react-static-plugin-file-watch-reload',
              {
                paths: [`${DOCS_PATH}/**/*`],
              },
            ],
          ],
        }
      