import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import AppClient, { preloadRouteModule } from './AppClient'
import './index.css'

async function bootstrap() {
  const rootElement = document.getElementById('root')

  if (!rootElement) return

  const hasPrerenderedMarkup = rootElement.hasChildNodes()

  if (hasPrerenderedMarkup) {
    try {
      await preloadRouteModule(window.location.pathname)
    } catch {
      // Fall back to client-side rendering if a route chunk fails to preload.
    }
  }

  const app = (
    <StrictMode>
      <BrowserRouter>
        <AppClient />
      </BrowserRouter>
    </StrictMode>
  )

  if (hasPrerenderedMarkup) {
    hydrateRoot(rootElement, app)
    return
  }

  createRoot(rootElement).render(app)
}

void bootstrap()
