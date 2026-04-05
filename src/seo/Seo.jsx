import { useEffect } from 'react'
import { buildSeoState } from './head'
import { useSeoHead } from './SeoProvider'
import { siteConfig } from '../utils/site'

function upsertMeta(attribute, value, content) {
  let tag = document.head.querySelector(`meta[${attribute}="${value}"]`)

  if (!content) {
    if (tag?.dataset.seoManaged === 'true') {
      tag.remove()
    }
    return
  }

  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute(attribute, value)
    document.head.appendChild(tag)
  }

  tag.setAttribute('content', content)
  tag.setAttribute('data-seo-managed', 'true')
}

function upsertLink(rel, href) {
  let tag = document.head.querySelector(`link[rel="${rel}"]`)

  if (!tag) {
    tag = document.createElement('link')
    tag.setAttribute('rel', rel)
    document.head.appendChild(tag)
  }

  tag.setAttribute('href', href)
  tag.setAttribute('data-seo-managed', 'true')
}

function syncDocumentHead(state) {
  document.title = state.title

  upsertMeta('name', 'description', state.description)
  upsertMeta('name', 'author', state.author)
  upsertMeta('name', 'keywords', state.keywords)
  upsertMeta('name', 'robots', state.robots)
  upsertMeta('name', 'google-site-verification', state.verification?.google)
  upsertMeta('name', 'msvalidate.01', state.verification?.bing)
  upsertMeta('name', 'yandex-verification', state.verification?.yandex)
  upsertMeta('property', 'og:site_name', siteConfig.name)
  upsertMeta('property', 'og:locale', siteConfig.locale)
  upsertMeta('property', 'og:type', state.type)
  upsertMeta('property', 'og:title', state.ogTitle)
  upsertMeta('property', 'og:description', state.ogDescription)
  upsertMeta('property', 'og:url', state.canonical)
  upsertMeta('property', 'og:image', state.image)
  upsertMeta('property', 'og:updated_time', state.modifiedTime)
  upsertMeta('property', 'article:published_time', state.publishedTime)
  upsertMeta('property', 'article:modified_time', state.modifiedTime)
  upsertMeta('name', 'twitter:card', 'summary_large_image')
  upsertMeta('name', 'twitter:title', state.twitterTitle)
  upsertMeta('name', 'twitter:description', state.twitterDescription)
  upsertMeta('name', 'twitter:image', state.image)
  upsertLink('canonical', state.canonical)

  document.querySelectorAll('script[data-seo-jsonld="true"]').forEach((tag) => tag.remove())

  state.jsonLd.forEach((item) => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.dataset.seoJsonld = 'true'
    script.textContent = JSON.stringify(item)
    document.head.appendChild(script)
  })
}

export default function Seo(props) {
  const state = buildSeoState(props)
  const head = useSeoHead()

  if (head) {
    Object.assign(head, state)
  }

  useEffect(() => {
    syncDocumentHead(state)
  }, [state])

  return null
}
