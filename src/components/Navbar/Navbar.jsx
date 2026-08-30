import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Brain } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Home', to: '/', hash: '' },
  { label: 'How It Works', to: '/', hash: '#how-it-works' },
  { label: 'AI Analysis', to: '/', hash: '#ai-analysis' },
  { label: 'Network', to: '/', hash: '#network' },
  { label: 'Security', to: '/', hash: '#security' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled ? 'glass border-b border-signal/10' : 'bg-transparent'
      }`}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4"
        aria-label="Primary"
      >
        <Link to="/" className="flex items-center gap-2 shrink-0" onClick={() => setOpen(false)}>
          <span className="relative flex h-8 w-8 items-center justify-center rounded-lg border border-signal/40 bg-signal/10">
            <Brain size={18} className="text-signal" strokeWidth={1.75} />
          </span>
          <span className="font-display text-lg font-semibold tracking-tight">
            ZKP <span className="text-signal">CerebraChain</span>
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-8 font-data text-sm text-mist">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={`${link.to}${link.hash}`}
                className="transition-colors hover:text-signal"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <Link
          to="/dashboard"
          className="hidden md:inline-flex items-center rounded-full border border-signal/40 bg-signal/10 px-5 py-2 text-sm font-medium text-signal transition-all hover:bg-signal/20 hover:shadow-[0_0_20px_rgba(79,243,224,0.25)]"
        >
          Open Doctor Dashboard
        </Link>

        <button
          className="md:hidden text-ink"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </nav>

      {open && (
        <div className="md:hidden glass border-t border-signal/10 px-6 py-4 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={`${link.to}${link.hash}`}
              className="font-data text-sm text-mist hover:text-signal"
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Link
            to="/dashboard"
            className="inline-flex items-center justify-center rounded-full border border-signal/40 bg-signal/10 px-5 py-2 text-sm font-medium text-signal"
            onClick={() => setOpen(false)}
          >
            Open Doctor Dashboard
          </Link>
        </div>
      )}
    </header>
  )
}
