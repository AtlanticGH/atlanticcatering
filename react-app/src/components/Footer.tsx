import { Link } from 'react-router-dom'
import { assetUrl } from '@/utils/assets'

interface FooterProps {
  contactId?: boolean
}

export function Footer({ contactId = false }: FooterProps) {
  const year = new Date().getFullYear()

  return (
    <footer
      {...(contactId ? { id: 'contact' } : {})}
      className="site-footer bg-acll-navy text-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto px-5 sm:px-8">
        <div className="pt-14 pb-12 lg:pt-16 lg:pb-14">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 lg:gap-14">
            <div className="lg:col-span-1">
              <Link to="/" className="inline-block mb-4">
                <img
                  src={assetUrl('images/Atlantic logo.png')}
                  alt="Atlantic Catering & Logistics"
                  className="footer-logo h-9 w-auto max-h-10 object-contain object-left"
                  width={180}
                  height={40}
                />
              </Link>
              <p className="text-white/60 text-sm leading-relaxed max-w-xs">
                Corporate catering, camp management & integrated logistics. Multi-ISO certified.
                Ghana.
              </p>
            </div>
            <div>
              <h4 className="footer-heading text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 mb-4">
                Contact
              </h4>
              <ul className="space-y-3 text-sm text-white/70">
                <li>Headquartered in Ghana</li>
                <li>
                  <a
                    href="mailto:info@atlanticcatering-gh.com"
                    className="footer-link hover:text-white transition-colors text-acll-green/90"
                  >
                    info@atlanticcatering-gh.com
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:whistleblower@atlanticcatering-gh.com"
                    className="footer-link hover:text-white transition-colors"
                  >
                    Report misconduct
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="footer-heading text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70 mb-4">
                Compliance
              </h4>
              <ul className="space-y-3 text-sm text-white/70">
                <li>Multi-ISO certified</li>
                <li>UN Global Compact signatory</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="footer-bottom border-t border-white/10 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-white/40 order-2 sm:order-1">
            © <span id="footer-year">{year}</span> Atlantic Catering & Logistics Limited
          </p>
          <p className="text-[11px] text-white/30 uppercase tracking-wider order-1 sm:order-2">
            Multi-ISO certified · Ghana
          </p>
        </div>
      </div>
    </footer>
  )
}
