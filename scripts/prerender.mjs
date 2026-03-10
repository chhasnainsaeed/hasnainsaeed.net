import { mkdir, readFile, readdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { getPrerenderRoutes } from '../src/seo/prerender-routes.js'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')
const distDir = path.join(rootDir, 'dist')
const serverDir = path.join(distDir, 'server')

function stripManagedHead(template) {
  return template
    .replace(/<title>[\s\S]*?<\/title>/i, '')
    .replace(/<meta[^>]+name="description"[^>]*>\s*/gi, '')
    .replace(/<meta[^>]+name="keywords"[^>]*>\s*/gi, '')
    .replace(/<meta[^>]+name="robots"[^>]*>\s*/gi, '')
    .replace(/<meta[^>]+property="og:[^"]+"[^>]*>\s*/gi, '')
    .replace(/<meta[^>]+name="twitter:[^"]+"[^>]*>\s*/gi, '')
    .replace(/<link[^>]+rel="canonical"[^>]*>\s*/gi, '')
}

function injectHtml(template, appHtml, headHtml) {
  return stripManagedHead(template)
    .replace('<div id="root"></div>', `<div id="root">${appHtml}</div>`)
    .replace('</head>', `${headHtml}</head>`)
  }

async function getServerEntry() {
  const files = await readdir(serverDir)
  const entryFile = files.find((file) => file.startsWith('entry-server'))

  if (!entryFile) {
    throw new Error('Could not find the server entry bundle in dist/server.')
  }

  return pathToFileURL(path.join(serverDir, entryFile)).href
}

const template = await readFile(path.join(distDir, 'index.html'), 'utf8')
const entryUrl = await getServerEntry()
const { render } = await import(entryUrl)

for (const route of getPrerenderRoutes()) {
  const { html, head } = await render(route)
  const output = injectHtml(template, html, head)
  const targetPath = route === '/' ? path.join(distDir, 'index.html') : path.join(distDir, route.slice(1), 'index.html')
  await mkdir(path.dirname(targetPath), { recursive: true })
  await writeFile(targetPath, output, 'utf8')
}
