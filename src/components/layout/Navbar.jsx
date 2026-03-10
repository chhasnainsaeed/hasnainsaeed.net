import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { navLinks } from '../../utils/site'
import ButtonLink from '../ui/ButtonLink'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return undefined

    const handleEscape = (event) => {
      if (event.key === 'Escape') setOpen(false)
    }

    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleEscape)

    return () => {
      document.body.style.overflow = originalOverflow
      window.removeEventListener('keydown', handleEscape)
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
                className={({ isActive }) =>
                  `relative px-1 py-2 text-sm transition ${isActive ? 'text-white' : 'text-zinc-300 hover:text-white'}`
                }
              >
                {({ isActive }) => (
                  <span>
                    {link.name}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-0.5 w-full rounded bg-gradient-to-r from-orange-500 to-red-500 transition-opacity duration-300 ${
                        isActive ? 'opacity-100' : 'opacity-0'
                      }`}
                      aria-hidden="true"
                    />
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

      <div
        className={`fixed inset-0 z-40 bg-black/75 p-6 backdrop-blur-md transition-opacity duration-200 lg:hidden ${
          open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
        }`}
        aria-hidden={!open}
      >
        <div
          className={`mt-20 rounded-2xl border border-white/12 bg-zinc-950/95 p-7 transition duration-300 ${
            open ? 'translate-y-0 opacity-100' : '-translate-y-6 opacity-0'
          }`}
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
        </div>
      </div>
    </header>
  )
}
