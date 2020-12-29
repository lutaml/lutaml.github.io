
        import React from 'react'
        import { Root, Routes } from 'react-static'
        import { Router } from '@reach/router'
        import { Helmet } from 'react-helmet'
        import chroma from 'chroma-js'
        import GlobalStyle from './GlobalStyle'

        export const pageContainerSelector = 'body > #root > :first-child > :first-child'

        export const primaryColor = chroma('#ff1d25');

        function App() {
          return (
            <Root>

              <GlobalStyle />

              <Helmet>
                <title>LutaML documentation</title>
                <meta charSet="utf-8" />
                <meta http-equiv="X-UA-Compatible" content="IE=edge" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
              </Helmet>

              <React.Suspense fallback={<em>Loading...</em>}>
                <Router>
                  <Routes path="*" />
                </Router>
              </React.Suspense>
            </Root>
          )
        }

        export default App
      