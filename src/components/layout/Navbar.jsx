import { useMemo, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { navLinks } from '../../utils/site'
import ButtonLink from '../ui/ButtonLink'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const linkClass = useMemo(
    () =>
      ({ isActive }) =>
        `relative px-1 py-2 text-sm transition ${isActive ? 'text-white' : 'text-zinc-300 hover:text-white'}`,
    [],
  )

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
              <NavLink key={link.href} to={link.href} className={linkClass}>
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
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/15 bg-white/5 text-white lg:hidden"
            onClick={() => setOpen((prev) => !prev)}
          >
            {open ? 'X' : '='}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="fixed inset-0 z-40 bg-black/75 p-6 backdrop-blur-md lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
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
