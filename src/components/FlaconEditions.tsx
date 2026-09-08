import { motion } from 'motion/react';
import { Sparkles, Check, ShoppingBag, Eye, Crown, Shield } from 'lucide-react';
import { FRAGRANCE_VARIATIONS } from '../data/fragranceData';
import { FragranceVariation } from '../types';
import { AudioEngine } from '../utils/audioEngine';

interface FlaconEditionsProps {
  selectedVariation: FragranceVariation;
  onSelectVariation: (variation: FragranceVariation) => void;
  onAddToCart: (variation: FragranceVariation) => void;
}

export default function FlaconEditions({
  selectedVariation,
  onSelectVariation,
  onAddToCart
}: FlaconEditionsProps) {
  return (
    <section id="pricing-editions" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-transparent border-b border-purple-500/20">
      {/* Background Lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(168,85,247,0.08),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-purple-400/35 bg-[#170930]/80 text-purple-200 text-[11px] uppercase tracking-[0.25em] font-medium mb-3 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <Crown className="w-3.5 h-3.5 text-purple-300" />
            <span>Haute Parfumerie Catalog</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-[0.14em] uppercase">
            The Master Editions & Vessels
          </h2>
          <p className="font-serif-luxury italic text-lg sm:text-xl text-purple-200/90 mt-2">
            “Four distinct expressions of concentration, vessel architecture, and collector exclusivity.”
          </p>
        </div>

        {/* Editions Comparison Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FRAGRANCE_VARIATIONS.map((variation) => {
            const isSelected = selectedVariation.id === variation.id;

            return (
              <motion.div
                key={variation.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className={`relative rounded-3xl p-6 flex flex-col justify-between transition-all duration-300 bg-[#14082c]/75 backdrop-blur-xl border shadow-xl ${
                  isSelected
                    ? 'border-purple-400 shadow-[0_0_35px_rgba(192,132,252,0.35)] ring-1 ring-purple-400'
                    : 'border-purple-500/20 hover:border-purple-400/50 hover:bg-[#1a0b38]/80'
                }`}
              >
                {/* Highlight Badge if Flagship / Masterpiece */}
                {variation.id === 'millesime-100' && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 via-fuchsia-400 to-amber-200 text-black font-cinzel text-[9px] uppercase tracking-[0.25em] font-bold px-3 py-0.5 rounded-full shadow-lg">
                    Flagship Presentation
                  </div>
                )}

                {variation.id === 'crystal-flacon-250' && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-500 via-amber-300 to-fuchsia-400 text-black font-cinzel text-[9px] uppercase tracking-[0.25em] font-bold px-3 py-0.5 rounded-full shadow-lg">
                    24K Gold Suspension
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between text-[10px] font-mono text-neutral-400 uppercase tracking-wider mb-2">
                    <span>{variation.volume}</span>
                    <span className="text-purple-300">{variation.edition}</span>
                  </div>

                  <h3 className="font-cinzel text-xl text-white font-medium">
                    {variation.name}
                  </h3>
                  <p className="font-serif-luxury italic text-xs text-purple-300 mt-0.5 mb-3">
                    {variation.frenchTitle}
                  </p>

                  <div className="text-2xl font-cinzel font-bold text-white mb-2">
                    ${variation.price.toLocaleString()}
                    <span className="text-xs font-mono text-purple-300/70 font-normal ml-1">USD</span>
                  </div>

                  <p className="text-xs text-neutral-300 font-light leading-relaxed mb-4">
                    {variation.description}
                  </p>

                  <div className="border-t border-purple-500/15 pt-3 mb-4 space-y-2">
                    <div className="text-[11px] font-mono text-[#eed9b3]">
                      {variation.concentration}
                    </div>
                    <div className="space-y-1">
                      {variation.perks.slice(0, 3).map((perk, i) => (
                        <div key={i} className="flex items-start gap-1.5 text-[11px] text-neutral-300">
                          <Check className="w-3 h-3 text-purple-400 flex-shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{perk}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  <button
                    id={`editions-inspect-${variation.id}-btn`}
                    onClick={() => {
                      AudioEngine.playTactileClick();
                      onSelectVariation(variation);
                      const el = document.getElementById('flacon-3d');
                      if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className={`w-full py-2.5 rounded-xl text-xs uppercase tracking-wider font-mono transition-colors cursor-pointer flex items-center justify-center gap-1.5 ${
                      isSelected
                        ? 'bg-purple-900/40 text-purple-200 border border-purple-400/30'
                        : 'bg-white/5 hover:bg-white/10 text-neutral-300'
                    }`}
                  >
                    <Eye className="w-3.5 h-3.5" />
                    <span>{isSelected ? 'Currently in 3D' : 'View in 3D Flacon'}</span>
                  </button>

                  <button
                    id={`editions-add-${variation.id}-btn`}
                    onClick={() => {
                      AudioEngine.playCrystalChime(880);
                      onAddToCart(variation);
                    }}
                    className="w-full py-3 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-500 to-amber-300 hover:opacity-95 text-black font-cinzel text-xs uppercase tracking-widest font-bold flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(168,85,247,0.35)] transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Acquire Flacon</span>
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
