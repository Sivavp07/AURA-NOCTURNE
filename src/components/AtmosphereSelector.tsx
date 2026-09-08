import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Moon, ChevronRight, Eye, Wind } from 'lucide-react';
import { LandscapeTheme, LANDSCAPE_THEMES } from './DreamyLandscapeBackground';
import { AudioEngine } from '../utils/audioEngine';

interface AtmosphereSelectorProps {
  currentTheme: LandscapeTheme;
  onChangeTheme: (theme: LandscapeTheme) => void;
}

export default function AtmosphereSelector({
  currentTheme,
  onChangeTheme
}: AtmosphereSelectorProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const active = LANDSCAPE_THEMES.find((t) => t.id === currentTheme) || LANDSCAPE_THEMES[0];

  return (
    <aside aria-label="Dreamscape Atmosphere Selection" className="fixed bottom-6 right-6 z-40 hidden md:block">
      <div className="relative">
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, y: 15, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 15, scale: 0.95 }}
              className="absolute bottom-14 right-0 w-72 p-4 rounded-2xl bg-[#110722]/85 backdrop-blur-2xl border border-purple-400/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)] space-y-2.5 mb-2"
            >
              <div className="flex items-center justify-between pb-2 border-b border-purple-500/20">
                <span className="font-serif-luxury italic text-sm text-purple-200">
                  Atmosphère du Crépuscule
                </span>
                <span className="text-[10px] font-mono text-purple-400 uppercase tracking-widest">
                  Dreamscape
                </span>
              </div>

              <div className="space-y-1.5">
                {LANDSCAPE_THEMES.map((theme) => {
                  const isSelected = theme.id === currentTheme;
                  return (
                    <button
                      key={theme.id}
                      onClick={() => {
                        AudioEngine.playCrystalChime(980);
                        onChangeTheme(theme.id);
                      }}
                      className={`w-full p-2.5 rounded-xl text-left transition-all flex items-center gap-3 cursor-pointer ${
                        isSelected
                          ? 'bg-purple-900/40 border border-purple-400/60 shadow-[0_0_15px_rgba(192,132,252,0.2)]'
                          : 'bg-black/20 hover:bg-purple-950/30 border border-transparent text-neutral-400 hover:text-white'
                      }`}
                    >
                      <div
                        className="w-7 h-7 rounded-lg overflow-hidden border border-purple-400/30 flex-shrink-0"
                        style={{
                          backgroundImage: `url(${theme.bgImage})`,
                          backgroundSize: 'cover',
                          backgroundPosition: 'center'
                        }}
                      />
                      <div className="flex-1 min-w-0">
                        <div className={`font-cinzel text-xs font-medium truncate ${isSelected ? 'text-purple-100' : 'text-neutral-300'}`}>
                          {theme.name}
                        </div>
                        <div className="text-[10px] text-purple-300/70 font-light truncate">
                          {theme.subtitle}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Floating Capsule Button */}
        <button
          id="toggle-dreamscape-atmosphere-btn"
          onClick={() => {
            AudioEngine.playTactileClick();
            setIsExpanded(!isExpanded);
          }}
          className="px-4 py-2.5 rounded-full bg-[#120724]/85 hover:bg-[#1b0a38]/90 text-purple-200 hover:text-white border border-purple-400/35 backdrop-blur-xl shadow-[0_8px_30px_rgba(147,51,234,0.35)] flex items-center gap-2.5 text-xs font-cinzel tracking-wider cursor-pointer group transition-all"
          title="Change Purple Dreamscape Landscape"
        >
          <Moon className="w-3.5 h-3.5 text-purple-300 group-hover:rotate-12 transition-transform" />
          <span className="font-medium text-[11px]">{active.name}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc] animate-pulse" />
        </button>
      </div>
    </aside>
  );
}
