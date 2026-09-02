import { Link } from 'react-router';
import { Aperture } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-[#1a1a1a] py-16 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Column 1 */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2.5">
              <Aperture className="w-6 h-6 text-white shrink-0" />
              <div className="flex items-baseline gap-1.5">
                <span className="text-xl font-bold text-white tracking-tight">MetaShot</span>
                <span className="text-[11px] font-normal text-zinc-400 tracking-normal">by Harsh Shrimali</span>
              </div>
            </Link>
            <p className="text-zinc-400 text-sm">
              Browser-based photo processing tool for premium quality outputs.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="text-white font-medium mb-4">Product</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/converter" className="text-zinc-400 hover:text-white text-sm transition-colors">
                  Photo Converter
                </Link>
              </li>
              <li>
                <Link to="/how-it-works" className="text-zinc-400 hover:text-white text-sm transition-colors">
                  How It Works
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="text-white font-medium mb-4">Resources</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/faq" className="text-zinc-400 hover:text-white text-sm transition-colors">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-zinc-400 hover:text-white text-sm transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-zinc-400 hover:text-white text-sm transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="text-white font-medium mb-4">Legal</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/privacy" className="text-zinc-400 hover:text-white text-sm transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-zinc-400 hover:text-white text-sm transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[#1a1a1a] pt-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <p className="text-zinc-500 text-sm">
            © {new Date().getFullYear()} MetaShot. All rights reserved.
          </p>
          <p className="text-zinc-500 text-xs max-w-xl md:text-right">
            MetaShot is an independent third-party project and is not affiliated with, endorsed by, or sponsored by Meta Platforms, Inc., Ray-Ban, or Instagram.
          </p>
        </div>
      </div>
    </footer>
  );
}
