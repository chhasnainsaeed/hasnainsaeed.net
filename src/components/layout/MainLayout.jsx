import { Suspense, lazy } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import useLenis from '../../hooks/useLenis'

const ChatbotWidget = lazy(() => import('../chatbot/ChatbotWidget'))

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
          <Suspense fallback={<div className="section-pad py-16 text-sm text-zinc-400">Loading page...</div>}>
            <Outlet />
          </Suspense>
        </main>
        <Footer />
        <Suspense fallback={null}>
          <ChatbotWidget />
        </Suspense>
      </div>
    </>
  )
}
