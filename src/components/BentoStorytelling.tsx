import { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, Music, Feather, ShieldAlert, Award, Compass, Volume2, Check } from 'lucide-react';
import { BENTO_STORY_ITEMS } from '../data/fragranceData';
import { AudioEngine } from '../utils/audioEngine';

export default function BentoStorytelling() {
  const [activeResonance, setActiveResonance] = useState(false);
  const [monogramInitials, setMonogramInitials] = useState('AN');
  const [monogramStyle, setMonogramStyle] = useState<'roman' | 'script'>('roman');

  const handleStrikeFlacon = () => {
    setActiveResonance(true);
    AudioEngine.playResonant432Hz();
    setTimeout(() => {
      setActiveResonance(false);
    }, 3000);
  };

  return (
    <section id="bento-craft" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-transparent border-b border-purple-500/20">
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_50%,rgba(168,85,247,0.08),transparent_80%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-purple-400/35 bg-[#170930]/80 text-purple-200 text-[11px] uppercase tracking-[0.25em] font-medium mb-3 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-purple-300" />
            <span>The Haute Parfumerie Bento</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-[0.14em] uppercase">
            Artisanal Provenance & Storytelling
          </h2>
          <p className="font-serif-luxury italic text-lg sm:text-xl text-purple-200/90 mt-2">
            “Where two centuries of French craftsmanship intersect with timeless olfactory alchemy.”
          </p>
        </div>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Card 1: Sillage & Longevity Radar */}
          <div className="bg-[#14082c]/70 backdrop-blur-xl border border-purple-500/25 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-purple-400/60 transition-all">
            <div className="absolute top-0 right-0 w-32 h-32 bg-[radial-gradient(circle,rgba(192,132,252,0.18)_0%,transparent_70%)] pointer-events-none" />

            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-purple-200 px-2.5 py-0.5 rounded-full bg-purple-900/40 border border-purple-400/30">
                Performance Olfactive
              </span>
              <h3 className="font-cinzel text-2xl text-white font-medium mt-3">
                Sillage Architecture
              </h3>
              <p className="text-xs text-neutral-300 font-light mt-2 leading-relaxed">
                Tested across temperate and arid microclimates. Engineered with dense ambergris fixatives to preserve the bouquet through an unbroken 18-hour trajectory.
              </p>

              {/* Sillage Metrics Bars */}
              <div className="mt-6 space-y-3.5">
                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-neutral-400">Epidermal Longevity</span>
                    <span className="text-purple-300 font-semibold">18+ Hours (98%)</span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-400 w-[98%] rounded-full shadow-[0_0_8px_#c084fc]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-neutral-400">Diffusion Radius</span>
                    <span className="text-purple-300 font-semibold">3.2 Meters (91%)</span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-400 w-[91%] rounded-full shadow-[0_0_8px_#c084fc]" />
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-xs font-mono mb-1">
                    <span className="text-neutral-400">Natural Essential Oil Density</span>
                    <span className="text-purple-300 font-semibold">38% - 45% (Pure Extrait)</span>
                  </div>
                  <div className="w-full h-1.5 bg-neutral-900 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-purple-500 via-fuchsia-400 to-amber-200 w-[95%] rounded-full shadow-[0_0_8px_#c084fc]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-purple-500/15 flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <span>Fixative: Atlantic Ambergris</span>
              <span className="text-purple-300">ISO 9235 Certified</span>
            </div>
          </div>

          {/* Card 2: Hand-Cut Crystal Craftsmanship */}
          <div className="bg-[#14082c]/70 backdrop-blur-xl border border-purple-500/25 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-purple-400/60 transition-all">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-purple-200 px-2.5 py-0.5 rounded-full bg-purple-900/40 border border-purple-400/30">
                Haute Verrerie
              </span>
              <h3 className="font-cinzel text-2xl text-white font-medium mt-3">
                680g Solid Crystal Flacon
              </h3>
              <p className="text-xs text-neutral-300 font-light mt-2 leading-relaxed">
                Sculpted by master glass artisans in Nancy, France. Each flacon requires 36 hours of cold wheel cutting to create 32 light-refracting diamond facets.
              </p>

              <div className="mt-6 p-4 rounded-2xl bg-black/50 border border-purple-400/20">
                <div className="text-3xl font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-fuchsia-300 to-amber-200 font-bold">
                  1,400°C
                </div>
                <div className="text-xs text-neutral-300 mt-1 font-mono">
                  Mouth-blown furnace temperature yielding optical purity with zero inclusions.
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-purple-500/15 flex items-center gap-2 text-xs text-neutral-300">
              <Check className="w-4 h-4 text-purple-400" />
              <span>Hermetically ground-glass stopper neck</span>
            </div>
          </div>

          {/* Card 3: Interactive Acoustic Resonance Test (432 Hz) */}
          <div className="bg-[#180935]/80 backdrop-blur-xl border border-purple-400/35 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-purple-400 transition-all">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-purple-200 px-2.5 py-0.5 rounded-full bg-purple-900/40 border border-purple-400/30 flex items-center gap-1 w-fit">
                <Music className="w-3 h-3 text-purple-300" />
                Harmonique Sensorielle
              </span>
              <h3 className="font-cinzel text-2xl text-white font-medium mt-3">
                432 Hz Crystal Strike
              </h3>
              <p className="text-xs text-neutral-300 font-light mt-2 leading-relaxed">
                Experience the acoustic signature. When struck with the gold ceremonial wand, the crystal flacon sings at precisely 432 Hz.
              </p>

              {/* Interactive Strike Button */}
              <div className="mt-6 text-center">
                <button
                  id="strike-crystal-flacon-btn"
                  onClick={handleStrikeFlacon}
                  className={`w-full py-4 rounded-2xl font-cinzel text-xs uppercase tracking-[0.22em] font-bold transition-all shadow-lg flex items-center justify-center gap-2 cursor-pointer ${
                    activeResonance
                      ? 'bg-gradient-to-r from-purple-400 via-white to-fuchsia-400 text-black shadow-[0_0_35px_rgba(192,132,252,0.6)] scale-102'
                      : 'bg-[#220c48] hover:bg-purple-900/50 border border-purple-400/40 text-purple-100'
                  }`}
                >
                  <Volume2 className={`w-4 h-4 ${activeResonance ? 'animate-bounce text-black' : 'text-purple-300'}`} />
                  <span>{activeResonance ? 'Resonating at 432 Hz...' : 'Strike Crystal Flacon'}</span>
                </button>

                {activeResonance && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-3 text-[11px] font-mono text-purple-300 animate-pulse"
                  >
                    Harmonic resonance wave emitted into room audio
                  </motion.div>
                )}
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-purple-500/15 flex items-center justify-between text-[11px] font-mono text-neutral-400">
              <span>Acoustic Crystal Grade</span>
              <span className="text-purple-300">Verre Sonore Pure</span>
            </div>
          </div>

          {/* Card 4: The 400:1 Botanical Harvest Ratio */}
          <div className="bg-[#14082c]/70 backdrop-blur-xl border border-purple-500/25 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-purple-400/60 transition-all">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-purple-200 px-2.5 py-0.5 rounded-full bg-purple-900/40 border border-purple-400/30">
                Extraction Rarity
              </span>
              <h3 className="font-cinzel text-2xl text-white font-medium mt-3">
                The 400:1 Botanical Ratio
              </h3>
              <p className="text-xs text-neutral-300 font-light mt-2 leading-relaxed">
                Four hundred kilograms of delicate blossoms yield just one single deciliter of absolute oil. Harvested exclusively before morning dew evaporates.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="p-3 bg-black/50 border border-purple-400/20 rounded-xl">
                  <span className="font-cinzel text-xl font-bold text-white">400 kg</span>
                  <span className="block text-[10px] font-mono text-neutral-300 uppercase mt-0.5">
                    Fresh Petals
                  </span>
                </div>
                <div className="p-3 bg-black/50 border border-purple-400/20 rounded-xl">
                  <span className="font-cinzel text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-amber-200">100 ml</span>
                  <span className="block text-[10px] font-mono text-neutral-300 uppercase mt-0.5">
                    Pure Essence
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-purple-500/15 text-[11px] text-neutral-400 font-mono">
              Fair-trade cooperatives in Grasse, Taif & Assam
            </div>
          </div>

          {/* Card 5: Master Perfumer Éléonore de Saint-Germain */}
          <div className="bg-[#14082c]/70 backdrop-blur-xl border border-purple-500/25 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-purple-400/60 transition-all">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-purple-200 px-2.5 py-0.5 rounded-full bg-purple-900/40 border border-purple-400/30">
                Le Nez Créateur
              </span>
              <h3 className="font-cinzel text-2xl text-white font-medium mt-3">
                Éléonore de Saint-Germain
              </h3>
              <blockquote className="font-serif-luxury italic text-sm text-purple-200 mt-3 leading-relaxed border-l-2 border-purple-400 pl-3">
                “A perfume must not merely scent the room; it must establish an emotional sovereignty. AURA NOCTURNE is the manifestation of midnight memories and eternal woods.”
              </blockquote>
            </div>

            <div className="mt-6 pt-4 border-t border-purple-500/15 flex items-center justify-between text-xs text-neutral-400">
              <span className="font-cinzel text-neutral-200">Chevalier des Arts</span>
              <span className="font-mono text-purple-300">32 Years Master Nose</span>
            </div>
          </div>

          {/* Card 6: Interactive Monogramming Atelier Preview */}
          <div className="bg-[#14082c]/70 backdrop-blur-xl border border-purple-500/30 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden group hover:border-purple-400 transition-all">
            <div>
              <span className="text-[10px] font-mono tracking-widest uppercase text-purple-200 px-2.5 py-0.5 rounded-full bg-purple-900/40 border border-purple-400/30">
                Sur Mesure Atelier
              </span>
              <h3 className="font-cinzel text-2xl text-white font-medium mt-3">
                Live Monogram Engraving
              </h3>
              <p className="text-xs text-neutral-300 font-light mt-2 leading-relaxed">
                Test your bespoke monogram etched into the 24K gold collar plate. Complimentary with every order.
              </p>

              {/* Interactive Monogram Input */}
              <div className="mt-4 flex items-center gap-2">
                <input
                  id="monogram-input"
                  type="text"
                  maxLength={4}
                  value={monogramInitials}
                  onChange={(e) => setMonogramInitials(e.target.value.toUpperCase())}
                  placeholder="Initials"
                  className="w-24 px-3 py-2 bg-black/60 border border-purple-400/40 rounded-xl text-center font-cinzel text-sm text-white focus:outline-none focus:border-purple-400"
                />
                <div className="flex rounded-xl bg-black/50 border border-purple-500/20 p-0.5 text-xs">
                  <button
                    id="monogram-style-roman"
                    onClick={() => setMonogramStyle('roman')}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-cinzel uppercase transition-colors cursor-pointer ${
                      monogramStyle === 'roman' ? 'bg-gradient-to-r from-purple-500 to-fuchsia-400 text-white font-bold' : 'text-neutral-400'
                    }`}
                  >
                    Roman Serif
                  </button>
                  <button
                    id="monogram-style-script"
                    onClick={() => setMonogramStyle('script')}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-serif-luxury italic transition-colors cursor-pointer ${
                      monogramStyle === 'script' ? 'bg-gradient-to-r from-purple-500 to-fuchsia-400 text-white font-bold' : 'text-neutral-400'
                    }`}
                  >
                    Royal Script
                  </button>
                </div>
              </div>

              {/* Live Gold Plate Preview Graphic */}
              <div className="mt-5 p-4 rounded-2xl bg-gradient-to-r from-purple-500 via-fuchsia-400 to-amber-300 p-[1px] shadow-lg">
                <div className="bg-[#120725] rounded-2xl p-4 text-center">
                  <div className="text-[9px] font-mono text-purple-300 uppercase tracking-widest mb-1">
                    24K Gold Plate Engraving Preview
                  </div>
                  <div
                    className={`text-2xl font-bold tracking-[0.3em] text-[#f5e6c8] text-shadow ${
                      monogramStyle === 'roman' ? 'font-cinzel' : 'font-serif-luxury italic'
                    }`}
                  >
                    {monogramInitials || '—'}
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-purple-500/15 text-[11px] font-mono text-neutral-400 flex items-center justify-between">
              <span>Applied in Paris Atelier</span>
              <span className="text-purple-300">Complimentary</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
