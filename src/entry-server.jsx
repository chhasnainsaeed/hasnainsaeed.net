import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router'
import App from './App'
import { SeoProvider } from './seo/SeoProvider'
import { createHeadState, renderHeadTags } from './seo/head'

export function render(url) {
  const head = createHeadState()
  const html = renderToString(
    <SeoProvider head={head}>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </SeoProvider>,
  )

  return {
    html,
    head: renderHeadTags(head),
  }
}
