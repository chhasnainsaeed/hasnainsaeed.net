import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { FiMenu, FiX } from 'react-icons/fi'
import { navLinks } from '../../utils/site'
import ButtonLink from '../ui/ButtonLink'

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname])

  useEffect(() => {
    if (!open) return undefined

    const previousBodyOverflow = document.body.style.overflow
    const previousHtmlOverflow = document.documentElement.style.overflow

    document.body.style.overflow = 'hidden'
    document.documentElement.style.overflow = 'hidden'

    return () => {
      document.body.style.overflow = previousBodyOverflow
      document.documentElement.style.overflow = previousHtmlOverflow
    }
  }, [open])

  return (
    <header className="fixed inset-x-0 top-0 z-50 section-pad pt-4">
      <nav className="section-wrap glass-panel rounded-2xl px-4 py-3 sm:px-6">
        <div className="flex items-center justify-between gap-4">
          <NavLink to="/" className="font-semibold tracking-wide text-white">
            <span className="hidden sm:inline">Hasnain Saeed</span>
            <span className="sm:hidden">Hasnain.</span>
          </NavLink>

          <div className="hidden items-center gap-6 lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                className={({ isActive }) => `relative px-1 py-2 text-sm transition ${isActive ? 'text-white' : 'text-zinc-300 hover:text-white'}`}
              >
                {({ isActive }) => (
                  <span>
                    {link.name}
                    {isActive ? (
                      <motion.span
                        className="absolute -bottom-0.5 left-0 h-0.5 w-full rounded bg-gradient-to-r from-orange-500 to-red-500"
                        layoutId="navActiveLine"
                      />
                    ) : null}
                  </span>
                )}
              </NavLink>
            ))}
          </div>

          <div className="hidden lg:block">
            <ButtonLink to="/contact">Book Consultation</ButtonLink>
          </div>

          <button
            type="button"
            aria-label="Toggle menu"
            aria-controls="mobile-nav"
            aria-expanded={open}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white lg:hidden"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? <FiX className="h-4 w-4" /> : <FiMenu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-40 overflow-y-auto bg-black/75 p-6 backdrop-blur-md lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              id="mobile-nav"
              className="mt-20 rounded-2xl border border-white/12 bg-zinc-950/95 p-7"
              initial={{ y: -24, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -24, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <NavLink
                    key={link.href}
                    to={link.href}
                    className={({ isActive }) =>
                      `rounded-lg px-3 py-2 text-base ${isActive ? 'bg-orange-500/20 text-white' : 'text-zinc-300'}`
                    }
                    onClick={() => setOpen(false)}
                  >
                    {link.name}
                  </NavLink>
                ))}
                <ButtonLink to="/contact" className="mt-3" onClick={() => setOpen(false)}>
                  Book Consultation
                </ButtonLink>
              </div>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  )
}
