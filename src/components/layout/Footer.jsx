import { Link } from 'react-router-dom'
import ButtonLink from '../ui/ButtonLink'
import { navLinks } from '../../utils/site'

const socials = [
  { label: 'LinkedIn', icon: 'in', href: '#' },
  { label: 'Upwork', icon: 'Up', href: '#' },
  { label: 'Email', icon: '@', href: 'mailto:your-email@example.com' },
]

export default function Footer() {
  return (
    <footer className="section-pad pb-10 pt-20">
      <div className="section-wrap premium-card p-7 sm:p-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="text-xl font-semibold text-white">Hasnain Saeed</p>
            <p className="mt-3 max-w-sm text-zinc-300">Freelance web developer creating high-converting websites for modern brands.</p>

            <div className="mt-5 inline-flex rounded-full border border-emerald-400/35 bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-emerald-300">
              Available for freelance projects
            </div>

            <div className="mt-5 text-sm text-zinc-300">
              <p>
                <span className="text-zinc-400">Email:</span> your-email@example.com
              </p>
              <p className="mt-1">
                <span className="text-zinc-400">WhatsApp:</span> +92-XXX-XXXXXXX
              </p>
            </div>

            <ButtonLink to="/contact" className="mt-6">
              Book Consultation
            </ButtonLink>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-[0.2em] text-zinc-400">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-zinc-300">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link className="inline-flex rounded-md px-1 py-1 transition hover:text-orange-300" to={link.href}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-[0.2em] text-zinc-400">Social</h3>
            <ul className="mt-4 space-y-2 text-zinc-300">
              {socials.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className="group inline-flex items-center gap-3 rounded-lg px-2 py-2 transition hover:bg-white/5"
                    aria-label={social.label}
                  >
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/[0.03] text-xs font-semibold transition group-hover:border-orange-300/40 group-hover:text-orange-200">
                      {social.icon}
                    </span>
                    <span className="text-sm transition group-hover:text-white">{social.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t border-white/10 pt-5 text-sm text-zinc-400 sm:flex sm:items-center sm:justify-between">
          <p>Copyright {new Date().getFullYear()} Hasnain Saeed. All rights reserved.</p>
          <p className="mt-2 text-xs uppercase tracking-[0.16em] text-zinc-500 sm:mt-0">Built for speed and conversion</p>
        </div>
      </div>
    </footer>
  )
}
