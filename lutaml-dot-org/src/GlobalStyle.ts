
        import { createGlobalStyle } from 'styled-components'

        export default createGlobalStyle`
          * {
            scroll-behavior: smooth;
            box-sizing: border-box;
          }

          body {
            font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
            font-size: 17px;
            font-weight: 300;
            -moz-osx-font-smoothing: grayscale;
            margin: 0;
            padding: 0;

            height: 100vh;

            display: flex;
            flex-flow: column nowrap;
          }

          p {
            font-size: 100%;
            line-height: 1.5;
          }

          a {
            color: #ff1d25;
            text-decoration: none;
          }

          :global .svg-inline--fa {
            height: 1em;
            width: 1em;
          }

          img {
            max-width: 100%;
          }
        `
      