import { Link } from 'react-router-dom'
import ButtonLink from '../ui/ButtonLink'
import { navLinks } from '../../utils/site'

const socials = [
  { label: 'LinkedIn', icon: 'in' },
  { label: 'Upwork', icon: 'Up' },
  { label: 'Email', icon: '@' },
]

export default function Footer() {
  return (
    <footer className="section-pad pb-10 pt-24">
      <div className="section-wrap premium-card p-8 sm:p-10">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_1fr_1fr]">
          <div>
            <p className="text-xl font-semibold text-white">Hasnain Saeed</p>
            <p className="mt-3 max-w-sm text-zinc-300">Freelance web developer creating high-converting websites for modern brands.</p>
            <div className="mt-4 inline-flex rounded-full border border-emerald-400/35 bg-emerald-500/10 px-3 py-1 text-xs uppercase tracking-[0.16em] text-emerald-300">
              Available for freelance projects
            </div>
            <p className="mt-4 text-sm text-zinc-300">Email: your-email@example.com | WhatsApp: +92-XXX-XXXXXXX</p>
            <p className="mt-2 text-xs uppercase tracking-[0.16em] text-zinc-400">Usually replies within 24 hours</p>
            <ButtonLink to="/contact" className="mt-5">
              Book Consultation
            </ButtonLink>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-[0.2em] text-zinc-400">Quick Links</h3>
            <ul className="mt-4 space-y-2 text-zinc-300">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link className="hover:text-orange-300" to={link.href}>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm uppercase tracking-[0.2em] text-zinc-400">Social</h3>
            <ul className="mt-4 space-y-3 text-zinc-300">
              {socials.map((social) => (
                <li key={social.label}>
                  <a href="#" className="inline-flex items-center gap-3" aria-label={social.label}>
                    <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-white/20 bg-white/[0.03] text-xs font-semibold">
                      {social.icon}
                    </span>
                    <span>{social.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-10 border-t border-white/10 pt-5 text-sm text-zinc-400">
          Copyright {new Date().getFullYear()} Hasnain Saeed. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
