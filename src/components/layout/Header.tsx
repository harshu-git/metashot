import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Aperture, Menu, X, ArrowRight, Sparkles } from 'lucide-react';

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
    { path: '/converter', label: 'Photo Tool' },
    { path: '/how-it-works', label: 'How It Works' },
    { path: '/faq', label: 'FAQ' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full glass-header transition-colors">
        <div className="container mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Brand Logo & Author */}
          <Link 
            to="/" 
            className="flex items-center gap-2.5 group cursor-pointer focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-lg p-1" 
            onClick={closeMenu}
          >
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500/20 via-indigo-500/10 to-transparent border border-indigo-500/30 flex items-center justify-center text-indigo-400 group-hover:text-indigo-300 group-hover:border-indigo-400/50 transition-all shadow-sm">
              <Aperture className="w-5 h-5 transition-transform duration-300 group-hover:rotate-45" />
            </div>
            <div className="flex flex-col sm:flex-row sm:items-baseline sm:gap-2">
              <span className="text-lg sm:text-xl font-bold text-white tracking-tight group-hover:text-zinc-100 transition-colors">
                MetaShot
              </span>
              <span className="text-[11px] font-medium text-indigo-400/90 whitespace-nowrap flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                by Harsh Shrimali
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1.5 glass-card-subtle p-1.5 rounded-2xl border border-white/[0.1] shadow-inner">
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium px-4 py-1.5 rounded-xl transition-all duration-150 outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 ${
                    isActive 
                      ? 'bg-white/[0.12] backdrop-blur-md text-white shadow-sm font-semibold border border-white/[0.14]' 
                      : 'text-zinc-400 hover:text-white hover:bg-white/[0.06] hover:backdrop-blur-sm'
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Action CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/converter"
              className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 hover:opacity-95 text-white text-sm font-semibold px-4.5 py-2 rounded-xl transition-all duration-200 shadow-lg shadow-indigo-500/25 hover:shadow-indigo-500/40 active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 border border-white/20 animate-shimmer"
            >
              <Sparkles className="w-4 h-4 text-indigo-200" />
              <span>Upload Photo</span>
            </Link>
          </div>

          {/* Mobile Menu Button (44px min touch target) */}
          <button
            type="button"
            className="md:hidden w-11 h-11 flex items-center justify-center text-zinc-300 hover:text-white glass-pill hover:bg-white/[0.1] rounded-xl border border-white/[0.12] transition-colors cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
            onClick={() => setIsMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <Menu className="w-5 h-5" />
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
          <div className="h-16 px-4 sm:px-6 flex items-center justify-between border-b border-white/[0.08] bg-[#09090b] shrink-0">
            <Link to="/" className="flex items-center gap-2.5" onClick={closeMenu}>
              <div className="w-9 h-9 rounded-xl bg-indigo-500/15 border border-indigo-500/30 flex items-center justify-center text-indigo-400">
                <Aperture className="w-5 h-5" />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-white tracking-tight">MetaShot</span>
                <span className="text-xs font-medium text-indigo-400">by Harsh Shrimali</span>
              </div>
            </Link>
            <button
              type="button"
              className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-white bg-[#16161d] rounded-xl border border-white/[0.08] transition-colors cursor-pointer"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Nav Links */}
          <div className="flex-1 flex flex-col px-5 py-8 gap-3 bg-[#09090b]">
            <span className="text-xs uppercase tracking-widest text-zinc-500 font-semibold mb-2">
              Navigation
            </span>
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center justify-between px-4.5 py-3.5 rounded-2xl border text-base font-semibold transition-all min-h-[48px] backdrop-blur-xl ${
                    isActive 
                      ? 'glass-panel border-indigo-500/40 text-indigo-400 shadow-md' 
                      : 'glass-panel-interactive border-white/[0.08] text-zinc-200 hover:text-white'
                  }`}
                  onClick={closeMenu}
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 opacity-50" />
                </Link>
              );
            })}

            <Link
              to="/converter"
              className="mt-6 flex items-center justify-center gap-2 bg-gradient-to-r from-indigo-500 via-indigo-600 to-violet-600 hover:opacity-95 text-white text-center text-base font-bold py-4 rounded-xl shadow-xl shadow-indigo-600/30 active:scale-[0.98] transition-all min-h-[52px]"
              onClick={closeMenu}
            >
              <Sparkles className="w-5 h-5 text-indigo-200" />
              <span>Upload & Convert Photo</span>
            </Link>
          </div>

          {/* Footer inside mobile menu */}
          <div className="p-6 border-t border-white/[0.08] bg-[#0c0c10] text-center text-xs text-zinc-500 shrink-0">
            © {new Date().getFullYear()} MetaShot by Harsh Shrimali. All rights reserved.
          </div>
        </div>
      )}
    </>
  );
}
