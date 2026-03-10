import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import useLenis from '../../hooks/useLenis'

export default function MainLayout() {
  const [ChatbotWidget, setChatbotWidget] = useState(null)

  useLenis()

  useEffect(() => {
    let cancelled = false
    let chatbotQueued = false
    let timeoutId = 0
    let idleId = 0

    const loadChatbot = () => {
      if (chatbotQueued) return
      chatbotQueued = true

      import('../chatbot/ChatbotWidget').then((module) => {
        if (!cancelled) {
          setChatbotWidget(() => module.default)
        }
      })
    }

    const queueLoad = () => {
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(loadChatbot, { timeout: 2500 })
        return
      }

      timeoutId = window.setTimeout(loadChatbot, 1400)
    }

    const loadOnIntent = () => {
      removeIntentListeners()
      loadChatbot()
    }

    const removeIntentListeners = () => {
      window.removeEventListener('pointerdown', loadOnIntent)
      window.removeEventListener('keydown', loadOnIntent)
      window.removeEventListener('touchstart', loadOnIntent)
    }

    queueLoad()
    window.addEventListener('pointerdown', loadOnIntent, { once: true, passive: true })
    window.addEventListener('keydown', loadOnIntent, { once: true })
    window.addEventListener('touchstart', loadOnIntent, { once: true, passive: true })

    return () => {
      cancelled = true
      removeIntentListeners()
      if (idleId && 'cancelIdleCallback' in window) {
        window.cancelIdleCallback(idleId)
      }
      window.clearTimeout(timeoutId)
    }
  }, [])

  return (
    <>
      <ScrollToTop />
      <div className="relative overflow-hidden">
        <div className="glow-dot left-[-120px] top-[280px] h-56 w-56 bg-orange-500/30" aria-hidden="true" />
        <div className="glow-dot right-[-100px] top-[640px] h-72 w-72 bg-red-500/20" aria-hidden="true" />
        <a
          href="#main-content"
          className="sr-only absolute left-4 top-4 z-[80] rounded-full bg-white px-4 py-2 text-sm font-semibold text-black focus:not-sr-only"
        >
          Skip to content
        </a>
        <Navbar />
        <main id="main-content" className="pt-28"><Outlet /></main>
        <Footer />
        {ChatbotWidget ? <ChatbotWidget /> : null}
      </div>
    </>
  )
}
