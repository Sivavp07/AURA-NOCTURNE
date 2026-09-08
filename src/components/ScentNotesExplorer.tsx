import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Compass, X, Check, ShoppingBag, ArrowRight, Info, ShieldCheck, Flame } from 'lucide-react';
import { SCENT_NOTES, FRAGRANCE_VARIATIONS } from '../data/fragranceData';
import { ScentNote, NoteTier, FragranceVariation } from '../types';
import { AudioEngine } from '../utils/audioEngine';

interface ScentNotesExplorerProps {
  activeNoteId: string | null;
  onSelectNote: (note: ScentNote) => void;
  onSelectVariation: (variation: FragranceVariation) => void;
  onAddToCart: (variation: FragranceVariation) => void;
}

export default function ScentNotesExplorer({
  activeNoteId,
  onSelectNote,
  onSelectVariation,
  onAddToCart
}: ScentNotesExplorerProps) {
  const [selectedTier, setSelectedTier] = useState<'all' | NoteTier>('all');
  const [modalNote, setModalNote] = useState<ScentNote | null>(null);

  const filteredNotes = selectedTier === 'all'
    ? SCENT_NOTES
    : SCENT_NOTES.filter((n) => n.tier === selectedTier);

  const handleCardClick = (note: ScentNote) => {
    AudioEngine.playCrystalChime(960);
    onSelectNote(note);
    setModalNote(note);
  };

  const getTierBadge = (tier: NoteTier) => {
    switch (tier) {
      case 'top':
        return { label: 'Top Note • Tête', bg: 'bg-amber-500/15 text-amber-300 border-amber-500/30' };
      case 'heart':
        return { label: 'Heart Note • Cœur', bg: 'bg-rose-500/15 text-rose-300 border-rose-500/30' };
      case 'base':
        return { label: 'Base Note • Fond', bg: 'bg-yellow-600/15 text-yellow-300 border-yellow-600/30' };
    }
  };

  return (
    <section id="scent-notes" className="relative py-20 px-4 sm:px-6 lg:px-8 bg-transparent border-t border-purple-500/20">
      {/* Background Lighting Accent */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-[radial-gradient(circle,rgba(192,132,252,0.08)_0%,transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-purple-400/35 bg-[#170930]/80 text-purple-200 text-[11px] uppercase tracking-[0.25em] font-medium mb-3 shadow-[0_0_15px_rgba(168,85,247,0.2)]">
            <Sparkles className="w-3.5 h-3.5 text-purple-300" />
            <span>Interactive Olfactory Pyramid</span>
          </div>
          <h2 className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-light text-white tracking-[0.14em] uppercase">
            Scent Notes & Raw Accords
          </h2>
          <p className="font-serif-luxury italic text-lg sm:text-xl text-purple-200/90 mt-2">
            “Tap any note below to highlight its profile and reveal the pricing variations it commands.”
          </p>
          <p className="text-xs sm:text-sm text-neutral-300 mt-2 max-w-xl mx-auto leading-relaxed">
            Every precious drop is compounded from wild botanicals harvested under astronomical cycles and cold-macerated in French oak barrels.
          </p>
        </div>

        {/* Note Tier Filter Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-10">
          <button
            id="tab-all-notes"
            onClick={() => {
              AudioEngine.playTactileClick();
              setSelectedTier('all');
            }}
            className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest transition-all cursor-pointer ${
              selectedTier === 'all'
                ? 'bg-gradient-to-r from-purple-600 via-fuchsia-500 to-amber-300 text-black font-bold shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                : 'bg-[#15092a]/70 text-neutral-300 border border-purple-500/20 hover:border-purple-400/50 hover:bg-[#1d0d3a]/80'
            }`}
          >
            All Accords ({SCENT_NOTES.length})
          </button>
          <button
            id="tab-top-notes"
            onClick={() => {
              AudioEngine.playTactileClick();
              setSelectedTier('top');
            }}
            className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest transition-all cursor-pointer ${
              selectedTier === 'top'
                ? 'bg-gradient-to-r from-purple-600 via-fuchsia-500 to-amber-300 text-black font-bold shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                : 'bg-[#15092a]/70 text-neutral-300 border border-purple-500/20 hover:border-purple-400/50 hover:bg-[#1d0d3a]/80'
            }`}
          >
            Top Notes • Tête (3)
          </button>
          <button
            id="tab-heart-notes"
            onClick={() => {
              AudioEngine.playTactileClick();
              setSelectedTier('heart');
            }}
            className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest transition-all cursor-pointer ${
              selectedTier === 'heart'
                ? 'bg-gradient-to-r from-purple-600 via-fuchsia-500 to-amber-300 text-black font-bold shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                : 'bg-[#15092a]/70 text-neutral-300 border border-purple-500/20 hover:border-purple-400/50 hover:bg-[#1d0d3a]/80'
            }`}
          >
            Heart Notes • Cœur (3)
          </button>
          <button
            id="tab-base-notes"
            onClick={() => {
              AudioEngine.playTactileClick();
              setSelectedTier('base');
            }}
            className={`px-4 py-2 rounded-full text-xs uppercase tracking-widest transition-all cursor-pointer ${
              selectedTier === 'base'
                ? 'bg-gradient-to-r from-purple-600 via-fuchsia-500 to-amber-300 text-black font-bold shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                : 'bg-[#15092a]/70 text-neutral-300 border border-purple-500/20 hover:border-purple-400/50 hover:bg-[#1d0d3a]/80'
            }`}
          >
            Base Notes • Fond (4)
          </button>
        </div>

        {/* Scent Notes Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredNotes.map((note) => {
            const isHighlighted = activeNoteId === note.id;
            const badge = getTierBadge(note.tier);

            return (
              <motion.div
                key={note.id}
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onClick={() => handleCardClick(note)}
                id={`note-card-${note.id}`}
                className={`relative group rounded-2xl p-5 cursor-pointer transition-all duration-300 bg-[#14082c]/70 backdrop-blur-xl border ${
                  isHighlighted
                    ? 'border-purple-400 shadow-[0_0_30px_rgba(192,132,252,0.35)] scale-[1.02]'
                    : 'border-purple-500/20 hover:border-purple-400/50 hover:bg-[#1c0c3a]/80'
                }`}
              >
                {/* Note Accent Aura Bar */}
                <div
                  className="absolute top-0 left-6 right-6 h-[2px] rounded-full opacity-80"
                  style={{ backgroundColor: note.colorHex, boxShadow: `0 0 10px ${note.colorHex}` }}
                />

                {/* Tier Badge & Volatility */}
                <div className="flex items-center justify-between gap-2 mb-3 mt-1">
                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono uppercase tracking-wider border ${badge.bg}`}>
                    {badge.label}
                  </span>
                  <div className="flex items-center gap-1">
                    <span
                      className="w-2.5 h-2.5 rounded-full border border-black/40"
                      style={{ backgroundColor: note.colorHex }}
                    />
                  </div>
                </div>

                {/* Note Names */}
                <h3 className="font-cinzel text-lg font-medium text-white group-hover:text-purple-200 transition-colors leading-snug">
                  {note.name}
                </h3>
                <p className="font-serif-luxury italic text-xs text-purple-300/80 mb-2">
                  {note.frenchName}
                </p>

                {/* Origin / Coordinates */}
                <p className="text-[11px] text-neutral-300 font-mono flex items-center gap-1 mb-3">
                  <Compass className="w-3 h-3 text-purple-400" />
                  <span>{note.provenance}</span>
                </p>

                {/* Sensory Description snippet */}
                <p className="text-xs text-neutral-200 line-clamp-2 leading-relaxed mb-4 font-light">
                  {note.sensoryProfile}
                </p>

                {/* Bottom Action Strip with Price Hint */}
                <div className="border-t border-purple-500/15 pt-3 flex items-center justify-between text-xs">
                  <span className="text-[10px] uppercase font-mono tracking-wider text-purple-300">
                    View Variations & Prices
                  </span>
                  <span className="text-purple-300 group-hover:translate-x-1 transition-transform flex items-center gap-1 font-semibold text-[11px]">
                    Inspect <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Pop-Up Modal Card with Detailed Story & Pricing Information for Each Variation */}
        <AnimatePresence>
          {modalNote && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-2xl">
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 20 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-[#14082c]/95 border border-purple-400/35 rounded-3xl p-6 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.95)] backdrop-blur-2xl"
              >
                {/* Close Modal Button */}
                <button
                  id="close-note-modal-btn"
                  onClick={() => {
                    AudioEngine.playTactileClick();
                    setModalNote(null);
                  }}
                  className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Header Profile */}
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full text-[10px] font-mono tracking-widest uppercase border bg-purple-900/40 text-purple-200 border-purple-400/40">
                    {modalNote.tier.toUpperCase()} ACCORD • {modalNote.volatility}
                  </span>
                  <span className="text-xs font-mono text-purple-300/70">
                    COORD: {modalNote.coordinates}
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  <div
                    className="w-4 h-4 rounded-full shadow-[0_0_15px_#c084fc]"
                    style={{ backgroundColor: modalNote.colorHex }}
                  />
                  <h3 className="font-cinzel text-2xl sm:text-3xl text-white font-medium">
                    {modalNote.name}
                  </h3>
                </div>

                <p className="font-serif-luxury italic text-sm text-purple-300 mt-1 mb-4">
                  {modalNote.frenchName} — Sourced from {modalNote.provenance}
                </p>

                {/* Narrative & Molecular Breakdown */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-[#1b0a3a]/75 border border-purple-400/20 rounded-2xl p-4 mb-6">
                  <div>
                    <h4 className="text-[11px] font-mono uppercase tracking-widest text-purple-200 mb-1">
                      Sensory Experience
                    </h4>
                    <p className="text-xs text-neutral-200 leading-relaxed font-light">
                      {modalNote.description}
                    </p>
                  </div>
                  <div>
                    <h4 className="text-[11px] font-mono uppercase tracking-widest text-purple-200 mb-1">
                      Molecular Composition & Harvest
                    </h4>
                    <p className="text-xs text-neutral-300 font-mono mb-1.5">
                      <span className="text-neutral-400">Molecules:</span> {modalNote.molecularCharacter}
                    </p>
                    <p className="text-[11px] text-neutral-400 leading-relaxed">
                      <span className="text-neutral-400 font-mono">Harvest:</span> {modalNote.harvestMethod}
                    </p>
                  </div>
                </div>

                {/* PRICING INFORMATION FOR EACH VARIATION SECTION */}
                <div className="border-t border-purple-500/20 pt-5">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h4 className="font-cinzel text-base sm:text-lg text-white font-medium flex items-center gap-2">
                        <Flame className="w-4 h-4 text-purple-400" />
                        <span>Pricing & Flacon Variations Featuring This Note</span>
                      </h4>
                      <p className="text-xs text-neutral-300">
                        Select a variation to inspect its 3D flacon or directly acquire:
                      </p>
                    </div>
                  </div>

                  {/* Variation Cards List */}
                  <div className="space-y-3">
                    {FRAGRANCE_VARIATIONS.map((variation) => {
                      const noteBreakdown = modalNote.pricingVariationNotes.find(
                        (pv) => pv.variationId === variation.id
                      );

                      return (
                        <div
                          key={variation.id}
                          className="bg-[#180835]/80 hover:bg-[#200b46] border border-purple-400/20 hover:border-purple-400/60 rounded-xl p-4 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-lg"
                        >
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className="font-cinzel text-sm sm:text-base font-semibold text-white">
                                {variation.name}
                              </span>
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-900/30 text-purple-200 border border-purple-400/20">
                                {variation.volume}
                              </span>
                            </div>

                            <p className="text-xs text-purple-300/90 font-serif-luxury italic mt-0.5">
                              {variation.concentration}
                            </p>

                            {/* Specific note impact description */}
                            {noteBreakdown && (
                              <div className="mt-1.5 text-[11px] text-[#eed9b3] font-mono flex items-center gap-1.5">
                                <span className="w-1 h-1 rounded-full bg-purple-400"></span>
                                <span>{noteBreakdown.concentrationImpact}: {noteBreakdown.emphasis}</span>
                              </div>
                            )}
                          </div>

                          {/* Price and Action Buttons */}
                          <div className="flex items-center justify-between sm:justify-end gap-3 pt-2 sm:pt-0 border-t sm:border-t-0 border-purple-500/10">
                            <div className="text-right">
                              <span className="text-xl font-cinzel font-bold text-white tracking-wider">
                                ${variation.price.toLocaleString()}
                              </span>
                              <span className="block text-[9px] uppercase font-mono text-purple-300/80">
                                USD • Complimentary Courier
                              </span>
                            </div>

                            <button
                              id={`select-variation-${variation.id}-btn`}
                              onClick={() => {
                                AudioEngine.playTactileClick();
                                onSelectVariation(variation);
                                setModalNote(null);
                                const flaconSec = document.getElementById('flacon-3d');
                                if (flaconSec) flaconSec.scrollIntoView({ behavior: 'smooth' });
                              }}
                              className="px-3.5 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-xs text-white uppercase tracking-wider font-mono cursor-pointer transition-colors"
                            >
                              Inspect 3D
                            </button>

                            <button
                              id={`quick-add-${variation.id}-btn`}
                              onClick={() => {
                                AudioEngine.playCrystalChime(880);
                                onAddToCart(variation);
                                setModalNote(null);
                              }}
                              className="px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500 via-fuchsia-400 to-amber-200 hover:opacity-95 text-black text-xs uppercase tracking-widest font-semibold flex items-center gap-1.5 shadow-[0_0_18px_rgba(168,85,247,0.35)] transition-all cursor-pointer"
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>Add</span>
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Footer Assurance */}
                <div className="mt-6 pt-4 border-t border-purple-500/20 flex flex-wrap items-center justify-between text-[11px] text-neutral-400 gap-2">
                  <div className="flex items-center gap-1.5 text-purple-300">
                    <ShieldCheck className="w-4 h-4" />
                    <span>Pure Botanical Harvest • Registered Maison Ledger #8429</span>
                  </div>
                  <span className="font-mono text-neutral-400">
                    Complimentary White-Glove Shipping & 2 Master Samples
                  </span>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
