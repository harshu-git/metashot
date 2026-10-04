import { Link } from 'react-router';
import { Aperture, ShieldCheck, Heart } from 'lucide-react';

export function Footer() {
  return (
    <footer className="glass-footer pt-16 pb-12 px-4 sm:px-6 relative overflow-hidden">
      {/* Subtle background ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 max-w-2xl h-px bg-gradient-to-r from-transparent via-indigo-500/40 to-transparent pointer-events-none" />

      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-12 mb-12">
          {/* Column 1: Brand & Creator */}
          <div className="space-y-4 md:col-span-1">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:text-indigo-300 transition-colors">
                <Aperture className="w-4.5 h-4.5" />
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold text-white tracking-tight">MetaShot</span>
                <span className="text-xs font-medium text-indigo-400">by Harsh Shrimali</span>
              </div>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Browser-based photo processing tool for authentic Meta camera compatibility. 100% on-device.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full glass-pill border border-emerald-500/25 text-emerald-400 text-xs font-medium">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Zero server uploads</span>
            </div>
          </div>

          {/* Column 2: Product */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-4">Product</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/converter" className="text-zinc-400 hover:text-white text-sm transition-colors block py-0.5">
                  Photo Tool
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-zinc-400 hover:text-white text-sm transition-colors block py-0.5">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-4">Resources</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/faq" className="text-zinc-400 hover:text-white text-sm transition-colors block py-0.5">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-zinc-400 hover:text-white text-sm transition-colors block py-0.5">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-zinc-400 hover:text-white text-sm transition-colors block py-0.5">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="text-xs uppercase tracking-wider text-zinc-400 font-semibold mb-4">Legal</h3>
            <ul className="space-y-2.5">
              <li>
                <Link to="/privacy" className="text-zinc-400 hover:text-white text-sm transition-colors block py-0.5">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-zinc-400 hover:text-white text-sm transition-colors block py-0.5">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 text-xs text-zinc-500">
          <p className="flex items-center gap-1">
            <span>© {new Date().getFullYear()} MetaShot. Built with</span>
            <Heart className="w-3.5 h-3.5 text-indigo-400 fill-indigo-400 inline" />
            <span>by Harsh Shrimali.</span>
          </p>
          <p className="max-w-xl md:text-right leading-relaxed">
            MetaShot is an independent third-party project and is not affiliated with, endorsed by, or sponsored by Meta Platforms, Inc., Ray-Ban, or Instagram.
          </p>
        </div>
      </div>
    </footer>
  );
}
