
import React from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client';
import { AppContainer } from 'react-hot-loader'

// Your top level component
import App from './App'

// Export your top level component as JSX (for static rendering)
export default App

// Render your app
if (typeof document !== 'undefined') {
  const target = document.getElementById('root')

  const renderMethod = target.hasChildNodes()
            ? hydrateRoot
            : createRoot

  const render = (Comp: () => React.JSX.Element) => {
    renderMethod(
      target,
      <AppContainer>
        <Comp />
      </AppContainer>,
    )
  }

  // Render!
  render(App)

  // Hot Module Replacement
  if (module && module.hot) {
    module.hot.accept('./App', () => {
      render(App)
    })
  }
}
