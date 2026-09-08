import { useState, useEffect } from 'react';
import { ShoppingBag, Sparkles, Volume2, VolumeX, Compass, Eye } from 'lucide-react';
import { AudioEngine } from '../utils/audioEngine';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenScentFinder: () => void;
  activeSection: string;
}

export default function Navbar({
  cartCount,
  onOpenCart,
  onOpenScentFinder,
  activeSection
}: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(AudioEngine.isMuted());

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSound = () => {
    const nextMuted = AudioEngine.toggleMuted();
    setIsMuted(!nextMuted);
    if (nextMuted) {
      AudioEngine.playCrystalChime(920);
    }
  };

  const scrollToSection = (id: string) => {
    AudioEngine.playTactileClick();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      id="main-navbar"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-[#0b0318]/80 backdrop-blur-2xl border-b border-purple-500/20 py-3.5 shadow-[0_10px_40px_rgba(0,0,0,0.8)]'
          : 'bg-gradient-to-b from-[#090214]/85 via-[#090214]/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Brandmark */}
        <button
          id="brand-logo-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="flex flex-col items-start text-left group cursor-pointer"
        >
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_10px_#c084fc]"></span>
            <span className="font-cinzel text-lg sm:text-xl md:text-2xl font-semibold tracking-[0.22em] text-[#fbf7ee] group-hover:text-purple-200 transition-colors">
              AURA NOCTURNE
            </span>
          </div>
          <span className="text-[9px] tracking-[0.35em] text-purple-300/80 uppercase pl-3.5 font-medium">
            Haute Parfumerie • Grasse & Paris
          </span>
        </button>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-7 text-xs tracking-[0.2em] uppercase font-medium">
          <button
            id="nav-film-btn"
            onClick={() => scrollToSection('film-continuity')}
            className={`transition-colors cursor-pointer hover:text-purple-200 ${
              activeSection === 'film' ? 'text-purple-300' : 'text-neutral-400'
            }`}
          >
            Reel Continuity
          </button>
          <button
            id="nav-notes-btn"
            onClick={() => scrollToSection('scent-notes')}
            className={`transition-colors cursor-pointer hover:text-purple-200 ${
              activeSection === 'notes' ? 'text-purple-300' : 'text-neutral-400'
            }`}
          >
            Scent Notes
          </button>
          <button
            id="nav-flacon-btn"
            onClick={() => scrollToSection('flacon-3d')}
            className={`transition-colors cursor-pointer hover:text-purple-200 ${
              activeSection === 'flacon' ? 'text-purple-300' : 'text-neutral-400'
            }`}
          >
            3D Flacon
          </button>
          <button
            id="nav-bento-btn"
            onClick={() => scrollToSection('bento-craft')}
            className={`transition-colors cursor-pointer hover:text-purple-200 ${
              activeSection === 'bento' ? 'text-purple-300' : 'text-neutral-400'
            }`}
          >
            Atelier Bento
          </button>
          <button
            id="nav-editions-btn"
            onClick={() => scrollToSection('pricing-editions')}
            className={`transition-colors cursor-pointer hover:text-purple-200 ${
              activeSection === 'editions' ? 'text-purple-300' : 'text-neutral-400'
            }`}
          >
            Editions
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {/* Sound Design Toggle */}
          <button
            id="audio-toggle-btn"
            onClick={toggleSound}
            aria-label="Toggle Sound Design"
            className="p-2 sm:px-3 sm:py-1.5 rounded-full border border-purple-400/25 bg-[#14082c]/70 hover:bg-purple-900/30 text-purple-300 transition-all flex items-center gap-1.5 cursor-pointer text-xs"
            title={isMuted ? 'Unmute Haute Soundscape' : 'Mute Soundscape'}
          >
            {isMuted ? (
              <VolumeX className="w-3.5 h-3.5 text-neutral-400" />
            ) : (
              <Volume2 className="w-3.5 h-3.5 text-purple-400 animate-pulse" />
            )}
            <span className="hidden sm:inline text-[10px] tracking-wider uppercase text-neutral-300">
              {isMuted ? 'Sound Off' : 'Sound On'}
            </span>
          </button>

          {/* Scent Finder Button */}
          <button
            id="open-scent-finder-nav-btn"
            onClick={() => {
              AudioEngine.playCrystalChime(760);
              onOpenScentFinder();
            }}
            className="px-3.5 py-1.5 rounded-full border border-purple-400/35 bg-gradient-to-r from-purple-900/40 to-transparent hover:from-purple-800/50 hover:border-purple-300 text-purple-100 text-[11px] tracking-widest uppercase font-medium flex items-center gap-1.5 transition-all shadow-[0_0_15px_rgba(168,85,247,0.2)] cursor-pointer"
          >
            <Compass className="w-3.5 h-3.5 text-purple-300" />
            <span className="hidden sm:inline">Scent Finder</span>
          </button>

          {/* Shopping Bag Drawer Button */}
          <button
            id="open-cart-btn"
            onClick={() => {
              AudioEngine.playTactileClick();
              onOpenCart();
            }}
            aria-label="Shopping Bag"
            className="relative p-2.5 rounded-full bg-[#15092a]/80 border border-purple-400/30 hover:border-purple-300 hover:bg-purple-900/30 transition-all text-neutral-200 cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-purple-200" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-purple-500 to-fuchsia-400 text-white font-semibold text-[10px] flex items-center justify-center rounded-full shadow-[0_0_10px_#a855f7]">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
