import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router';
import { Aperture, Menu, X } from 'lucide-react';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const closeMenu = () => setIsMenuOpen(false);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    if (isMenuOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isMenuOpen]);

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/converter', label: 'Photo Converter' },
    { path: '/how-it-works', label: 'How It Works' },
    { path: '/faq', label: 'FAQ' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-[#1a1a1a]">
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
            className="bg-indigo-500 hover:bg-indigo-400 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all duration-200"
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

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-[#0a0a0a] flex flex-col">
          <div className="h-16 px-6 flex items-center justify-between border-b border-[#1a1a1a]">
            <Link to="/" className="flex items-center gap-2" onClick={closeMenu}>
              <Aperture className="w-6 h-6 text-indigo-400 shrink-0" />
              <div className="flex items-baseline gap-2">
                <span className="text-xl font-bold text-white tracking-tight">MetaShot</span>
                <span className="text-xs font-medium text-indigo-400">by Harsh Shrimali</span>
              </div>
            </Link>
            <button
              className="p-2 text-zinc-400 hover:text-white transition-colors"
              onClick={closeMenu}
              aria-label="Close menu"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          <div className="flex-1 flex flex-col px-6 py-8 gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-2xl font-semibold transition-colors ${
                  location.pathname === link.path ? 'text-white' : 'text-zinc-400 hover:text-white'
                }`}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/converter"
              className="mt-8 bg-indigo-500 text-white text-center text-lg font-medium py-4 rounded-lg active:bg-indigo-400 transition-colors"
              onClick={closeMenu}
            >
              Upload Photo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
