import { Menu, X, Mail, Phone } from 'lucide-react'
import React, { useState, useEffect } from 'react'

const display = 'font-sub font-medium'

const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Framework', href: '/framework' },
  { label: 'About', href: '/about' },
]

const linkClass = `${display} text-[15px] tracking-[0.1em] uppercase text-[#9A9DA6] hover:text-white transition-colors duration-300 focus-visible:outline-none focus-visible:text-white`

const ctaClass = `${display} text-[15px] tracking-[0.1em] uppercase group relative inline-flex items-center justify-center overflow-hidden rounded-md border border-[#2A2D33] bg-black/30 text-[#ECEDF1] backdrop-blur-sm transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-[#12A2EA] hover:text-white focus-visible:border-[#12A2EA] focus-visible:outline-none`

const CtaSweep: React.FC = () => (
  <span
    aria-hidden="true"
    className="absolute inset-0 h-full w-full -translate-x-full bg-linear-to-r from-[#12A2EA]/0 via-[#12A2EA]/10 to-[#12A2EA]/0 transition-transform duration-700 ease-in-out group-hover:translate-x-full"
  />
)

export const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 font-sub font-medium">
      <div
        className={`transition-colors duration-300 ${
          scrolled || isOpen ? 'bg-black/80 backdrop-blur-md' : 'bg-transparent'
        }`}
      >
        <nav
          className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between"
          aria-label="Primary"
        >
          <a href="/" className="flex items-center group py-2" aria-label="Bini Cooperations home">
            <img
              src="/logo.svg"
              alt="Bini Cooperations Logo"
              className="h-10 md:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <a key={link.label} href={link.href} className={linkClass}>
                {link.label}
              </a>
            ))}

            <a href="/contact" className={`${ctaClass} ml-2 px-5 py-2`}>
              <CtaSweep />
              <span className="relative z-10">Contact</span>
            </a>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen((v) => !v)}
            className="md:hidden -mr-2 p-2 text-[#D8DAE0] hover:text-white transition-colors"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </nav>
      </div>

      <div
        id="mobile-nav"
        className={`md:hidden overflow-hidden transition-all duration-300 bg-black ${
          isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-6 flex flex-col gap-4">
          {NAV_LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setIsOpen(false)}
              className={`${display} text-base tracking-widest uppercase text-[#D8DAE0] hover:text-white transition-colors`}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/contact"
            onClick={() => setIsOpen(false)}
            className={`${ctaClass} mt-2 px-6 py-3 text-base`}
          >
            <CtaSweep />
            <span className="relative z-10">Contact</span>
          </a>
        </div>
      </div>
    </header>
  )
}

const FOOTER_NAV = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services' },
  { label: 'Framework', href: '/framework' },
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

const footerLink = `${display} text-[15px] tracking-[0.03em] text-[#9A9DA6] hover:text-white transition-colors duration-300`
const footerHeading = `${display} text-[#6B6E78] text-[13px] tracking-[0.2em] mb-4 uppercase`

export const Footer: React.FC = () => {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-black py-16 font-sub font-medium">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
        <div className="col-span-2 md:col-span-1">
          <div className="mb-6 flex items-center">
            <img
              src="/logo.svg"
              alt="Bini Cooperations Logo"
              className="h-12 w-auto object-contain"
            />
          </div>
          <p className="text-[#9A9DA6] text-[15px] tracking-[0.03em] max-w-xs leading-relaxed">
            Building software, products, and technology for what's next.
          </p>
        </div>

        <div>
          <div className={footerHeading}>Company</div>
          <ul className="flex flex-col gap-3">
            {FOOTER_NAV.map((l) => (
              <li key={l.label}>
                <a href={l.href} className={footerLink}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className={footerHeading}>Resources</div>
          <ul className="flex flex-col gap-3">
            <li>
              <a
                href="https://bini.js.org"
                target="_blank"
                rel="noopener noreferrer"
                className={footerLink}
              >
                Documentation
              </a>
            </li>
            <li>
              <a
                href="https://github.com/Binidu01/bini-cli"
                target="_blank"
                rel="noopener noreferrer"
                className={footerLink}
              >
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/company/bini-cooperation/"
                target="_blank"
                rel="noopener noreferrer"
                className={footerLink}
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>

        <div>
          <div className={footerHeading}>Contact</div>
          <div className="flex flex-col gap-3">
            <a href="mailto:binicooperations@gmail.com" className={`flex items-center gap-2 ${footerLink}`}>
              <Mail size={14} className="text-[#12A2EA]" />
              binicooperations@gmail.com
            </a>
            <a
              href="https://wa.me/94703850455"
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 ${footerLink}`}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="text-[#25D366]"
                aria-hidden="true"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.173-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              +94 70 385 0455
            </a>
            <a href="tel:+94787296686" className={`flex items-center gap-2 ${footerLink}`}>
              <Phone size={14} className="text-[#12A2EA]" />
              +94 78 729 6686
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 mt-16 pt-8 border-t border-[#15171B] flex flex-col sm:flex-row justify-between items-center gap-4 text-sm tracking-[0.03em] text-[#6B6E78]">
        <p>© {year} Bini Cooperations. All rights reserved.</p>
      </div>
    </footer>
  )
}

const Navbar = {
  Header,
  Footer,
}

export default Navbar