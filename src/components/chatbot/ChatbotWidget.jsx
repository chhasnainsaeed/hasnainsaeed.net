import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { getFallbackReply, quickPrompts } from '../../data/chatbotFAQs'

export default function ChatbotWidget() {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      text: 'Hi, I am Hasnain\'s assistant. Ask anything about services, pricing, timeline, SEO, QA, or booking.',
    },
  ])
  const nextId = useRef(2)
  const messagesContainerRef = useRef(null)

  const hasApiEndpoint = useMemo(() => Boolean(import.meta.env.VITE_CHATBOT_ENDPOINT), [])

  useEffect(() => {
    if (!open) return
    const container = messagesContainerRef.current
    if (!container) return
    container.scrollTop = container.scrollHeight
  }, [messages, loading, open])

  const appendMessage = (role, text) => {
    setMessages((prev) => [...prev, { id: nextId.current++, role, text }])
  }

  const sendMessage = async (text) => {
    const message = text.trim()
    if (!message || loading) return

    appendMessage('user', message)
    setInput('')
    setLoading(true)

    try {
      let reply = ''
      const endpoint = import.meta.env.VITE_CHATBOT_ENDPOINT

      if (endpoint) {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message }),
        })

        if (response.ok) {
          const data = await response.json()
          reply = data.reply || data.message || ''
        }
      }

      if (!reply) {
        reply = getFallbackReply(message)
      }

      appendMessage('assistant', reply)
    } catch {
      appendMessage('assistant', getFallbackReply(message))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-[70]">
      <section
        className={`mb-3 w-[calc(100vw-2rem)] max-w-[370px] overflow-hidden rounded-2xl border border-white/15 bg-zinc-950/95 shadow-[0_20px_65px_rgba(0,0,0,0.5)] backdrop-blur-xl transition duration-200 ${
          open ? 'pointer-events-auto translate-y-0 scale-100 opacity-100' : 'pointer-events-none translate-y-3 scale-[0.985] opacity-0'
        }`}
        data-lenis-prevent="true"
        aria-hidden={!open}
        aria-label="Chat assistant"
      >
        <header className="flex items-center justify-between border-b border-white/10 bg-white/[0.03] px-4 py-3">
          <div>
            <p className="text-sm font-semibold text-white">Hasnain Assistant</p>
            <p className="text-[11px] uppercase tracking-[0.12em] text-zinc-400">
              {hasApiEndpoint ? 'Live mode' : 'Smart fallback mode'}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="rounded-full border border-white/15 px-2 py-1 text-xs text-zinc-300"
            aria-label="Close chat"
          >
            X
          </button>
        </header>

        <div
          ref={messagesContainerRef}
          className="chat-scroll max-h-[330px] space-y-3 overflow-y-auto overscroll-contain p-4"
          data-lenis-prevent="true"
          onWheelCapture={(event) => event.stopPropagation()}
          onTouchMoveCapture={(event) => event.stopPropagation()}
        >
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div
                className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                  message.role === 'user'
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-black'
                    : 'border border-white/10 bg-white/[0.04] text-zinc-100'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
          {loading ? <p className="text-xs text-zinc-400">Assistant is typing...</p> : null}
        </div>

        <div className="border-t border-white/10 p-3">
          <div className="mb-2 flex flex-wrap gap-2">
            {quickPrompts.slice(0, 2).map((prompt) => (
              <button
                key={prompt}
                type="button"
                onClick={() => sendMessage(prompt)}
                className="rounded-full border border-white/15 bg-white/[0.03] px-3 py-1 text-xs text-zinc-200 hover:border-orange-300"
              >
                {prompt}
              </button>
            ))}
          </div>

          <form
            onSubmit={(event) => {
              event.preventDefault()
              sendMessage(input)
            }}
            className="flex items-center gap-2"
          >
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Type your question..."
              className="h-10"
              aria-label="Message input"
            />
            <button
              type="submit"
              disabled={loading}
              className="h-10 rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-4 text-sm font-semibold text-black disabled:opacity-60"
            >
              Send
            </button>
          </form>

          <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-500">
            <span>Need a full proposal?</span>
            <Link to="/contact" className="text-orange-300 hover:text-orange-200">
              Contact page
            </Link>
          </div>
        </div>
      </section>

      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="group inline-flex h-14 items-center gap-2 rounded-full border border-orange-300/35 bg-gradient-to-r from-orange-500 to-red-500 px-5 text-sm font-semibold text-black shadow-[0_16px_45px_rgba(255,115,0,0.35)]"
        aria-label="Toggle chat assistant"
      >
        <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-black/20 bg-black/10 text-xs">AI</span>
        <span>{open ? 'Close Chat' : 'Ask Assistant'}</span>
      </button>
    </div>
  )
}
