import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import useLenis from '../../hooks/useLenis'

function DeferredChatbot() {
  const [ChatbotWidget, setChatbotWidget] = useState(null)

  useEffect(() => {
    let cancelled = false
    let timeoutId = 0
    let removeLoadListener = null
    let removeInteractionListeners = null

    const loadChatbot = async () => {
      if (cancelled) return

      try {
        const module = await import('../chatbot/ChatbotWidget')
        if (!cancelled) {
          setChatbotWidget(() => module.default)
        }
      } catch {
        setChatbotWidget(null)
      }
    }

    const handleInteraction = () => {
      removeInteractionListeners?.()
      void loadChatbot()
    }

    const registerInteractionListeners = () => {
      const options = { passive: true }

      window.addEventListener('pointerdown', handleInteraction, { once: true, passive: true })
      window.addEventListener('keydown', handleInteraction, { once: true })
      window.addEventListener('scroll', handleInteraction, { once: true, passive: true })

      removeInteractionListeners = () => {
        window.removeEventListener('pointerdown', handleInteraction, options)
        window.removeEventListener('keydown', handleInteraction)
        window.removeEventListener('scroll', handleInteraction, options)
      }
    }

    const scheduleLoad = () => {
      registerInteractionListeners()
      timeoutId = window.setTimeout(() => {
        handleInteraction()
      }, 7000)
    }

    if (document.readyState === 'complete') {
      scheduleLoad()
    } else {
      const onLoad = () => scheduleLoad()
      window.addEventListener('load', onLoad, { once: true })
      removeLoadListener = () => window.removeEventListener('load', onLoad)
    }

    return () => {
      cancelled = true
      removeLoadListener?.()
      removeInteractionListeners?.()
      if (timeoutId) window.clearTimeout(timeoutId)
    }
  }, [])

  return ChatbotWidget ? <ChatbotWidget /> : null
}

export default function MainLayout() {
  useLenis()

  return (
    <>
      <ScrollToTop />
      <div className="relative overflow-hidden">
        <div className="glow-dot left-[-120px] top-[280px] h-56 w-56 bg-orange-500/30" aria-hidden="true" />
        <div className="glow-dot right-[-100px] top-[640px] h-72 w-72 bg-red-500/20" aria-hidden="true" />
        <Navbar />
        <main className="pt-28">
          <Outlet />
        </main>
        <Footer />
        <DeferredChatbot />
      </div>
    </>
  )
}
