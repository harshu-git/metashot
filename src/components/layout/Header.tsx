import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Aperture, Menu, X, ArrowRight } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setIsMenuOpen(false);

  // Close menu on ESC key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  // Lock background scrolling when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
      document.body.style.touchAction = 'none';
    } else {
      document.body.style.overflow = 'unset';
      document.body.style.touchAction = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.body.style.touchAction = 'unset';
    };
  }, [isMenuOpen]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/converter', label: 'Photo Converter' },
    { path: '/how-it-works', label: 'How It Works' },
    { path: '/faq', label: 'FAQ' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-[#1a1a1a]">
        <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand Logo & Author */}
          <Link to="/" className="flex items-center gap-2 group" onClick={closeMenu}>
            <Aperture className="w-6 h-6 text-indigo-400 group-hover:text-indigo-300 transition-colors shrink-0" />
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
              <span className="text-xl font-bold text-white tracking-tight">MetaShot</span>
              <span className="text-[11px] font-medium text-indigo-400/90 whitespace-nowrap">by Harsh Shrimali</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  location.pathname === link.path ? 'text-white' : 'text-zinc-400 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/converter"
              className="bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200 shadow-md shadow-indigo-500/20"
            >
              Upload Photo
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-zinc-400 hover:text-white transition-colors"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </header>

      {/* 100% Solid Fullscreen Mobile Menu Overlay */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-[100] w-screen h-[100dvh] bg-[#09090b] flex flex-col justify-between overflow-y-auto"
          style={{ backgroundColor: '#09090b' }}
        >
          {/* Top Bar */}
          <div className="h-16 px-4 sm:px-6 flex items-center justify-between border-b border-[#222] bg-[#09090b] shrink-0">
            <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
              <Aperture className="w-6 h-6 text-indigo-400 shrink-0" />
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-white tracking-tight">MetaShot</span>
                <span className="text-xs font-medium text-indigo-400">by Harsh Shrimali</span>
              </div>
            </Link>
            <button
              className="p-2 text-zinc-400 hover:text-white bg-[#18181b] rounded-lg border border-[#27272a] transition-colors"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <X className="w-6 h-6 text-white" />
            </button>
          </div>

          {/* Nav Links */}
          <div className="flex-1 flex flex-col px-6 py-8 gap-3 bg-[#09090b]">
            <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-2">
              Navigation
            </span>
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`flex items-center justify-between px-4 py-3.5 rounded-xl border text-lg font-semibold transition-all ${
                  location.pathname === link.path 
                    ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400' 
                    : 'bg-[#121215] border-[#1e1e24] text-zinc-200 hover:text-white'
                }`}
                onClick={closeMenu}
              >
                <span>{link.label}</span>
                <ArrowRight className="w-4 h-4 opacity-60" />
              </Link>
            ))}

            <Link
              to="/converter"
              className="mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:opacity-95 text-white text-center text-base font-bold py-4 rounded-xl shadow-xl shadow-indigo-600/30 active:scale-[0.98] transition-all"
              onClick={closeMenu}
            >
              Upload & Convert Photo
            </Link>
          </div>

          {/* Footer inside mobile menu */}
          <div className="p-6 border-t border-[#1e1e24] bg-[#0c0c0e] text-center text-xs text-zinc-500 shrink-0">
            © {new Date().getFullYear()} MetaShot by Harsh Shrimali. All rights reserved.
          </div>
        </div>
      )}
    </>
  );
}
