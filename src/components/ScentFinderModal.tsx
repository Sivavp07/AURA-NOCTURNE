import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Sparkles, Check, ArrowRight, ArrowLeft, Compass, ShoppingBag, Crown, Moon, Sun, Flame, Flower2, Trees, BookOpen, Radio, Feather } from 'lucide-react';
import { SCENT_FINDER_QUESTIONS, FRAGRANCE_VARIATIONS } from '../data/fragranceData';
import { FragranceVariation } from '../types';
import { AudioEngine } from '../utils/audioEngine';

interface ScentFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectVariation: (variation: FragranceVariation) => void;
  onAddToCart: (variation: FragranceVariation) => void;
}

export default function ScentFinderModal({
  isOpen,
  onClose,
  onSelectVariation,
  onAddToCart
}: ScentFinderModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [isCalculating, setIsCalculating] = useState(false);
  const [resultVariation, setResultVariation] = useState<FragranceVariation | null>(null);

  if (!isOpen) return null;

  const currentQuestion = SCENT_FINDER_QUESTIONS[currentStep];

  const handleSelectOption = (optionId: string) => {
    AudioEngine.playCrystalChime(840);
    const updated = { ...answers, [currentQuestion.id]: optionId };
    setAnswers(updated);

    if (currentStep < SCENT_FINDER_QUESTIONS.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate match
      setIsCalculating(true);
      setTimeout(() => {
        setIsCalculating(false);
        // Match calculation based on selected answers
        const option1 = currentQuestion.options.find((o) => o.id === optionId);
        const matchId = option1?.affinity.primaryVariationId || 'millesime-100';
        const matched = FRAGRANCE_VARIATIONS.find((v) => v.id === matchId) || FRAGRANCE_VARIATIONS[1];
        setResultVariation(matched);
      }, 1200);
    }
  };

  const handleReset = () => {
    setAnswers({});
    setCurrentStep(0);
    setResultVariation(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        className="relative w-full max-w-2xl bg-[#14082c]/95 backdrop-blur-2xl border border-purple-400/35 rounded-3xl p-6 sm:p-8 shadow-[0_25px_80px_rgba(0,0,0,0.95)] overflow-hidden"
      >
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[radial-gradient(circle,rgba(192,132,252,0.15)_0%,transparent_70%)] pointer-events-none" />

        {/* Close button */}
        <button
          id="close-scent-finder-btn"
          onClick={() => {
            AudioEngine.playTactileClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/15 text-neutral-300 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-2 mb-2">
          <span className="w-2 h-2 rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc]"></span>
          <span className="text-[10px] font-mono tracking-[0.25em] uppercase text-purple-200">
            Le Nez Artificiel • Bespoke Olfactory Diagnostic
          </span>
        </div>

        {/* Calculation Loader Screen */}
        {isCalculating ? (
          <div className="py-20 text-center space-y-4">
            <div className="w-16 h-16 border-2 border-purple-400/30 border-t-purple-400 rounded-full animate-spin mx-auto shadow-[0_0_20px_rgba(192,132,252,0.4)]" />
            <h3 className="font-cinzel text-xl text-white font-medium tracking-widest uppercase">
              Compounding Your Olfactory Profile...
            </h3>
            <p className="font-serif-luxury italic text-sm text-neutral-300">
              Harmonizing volatile top accords with rare base resin fixatives.
            </p>
          </div>
        ) : resultVariation ? (
          /* Result Screen */
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="text-center pt-2">
              <span className="px-3.5 py-1 rounded-full text-[10px] font-mono uppercase tracking-widest bg-purple-900/40 text-purple-200 border border-purple-400/35">
                98.6% Olfactory Harmony Score
              </span>
              <h3 className="font-cinzel text-2xl sm:text-3xl font-medium text-white tracking-wide mt-3">
                Your Signature Accord: {resultVariation.name}
              </h3>
              <p className="font-serif-luxury italic text-sm text-purple-300 mt-1">
                {resultVariation.frenchTitle} — {resultVariation.concentration}
              </p>
            </div>

            <div className="bg-[#1b0a3a]/80 border border-purple-400/25 rounded-2xl p-5 text-left space-y-3 shadow-lg">
              <p className="text-xs text-neutral-200 font-light leading-relaxed">
                {resultVariation.description}
              </p>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-purple-500/20 text-xs">
                <div>
                  <span className="font-mono text-[10px] uppercase text-neutral-400">Volume:</span>
                  <p className="text-white font-medium">{resultVariation.volume}</p>
                </div>
                <div>
                  <span className="font-mono text-[10px] uppercase text-neutral-400">Price:</span>
                  <p className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-fuchsia-200 to-amber-200 font-cinzel font-bold text-base">
                    ${resultVariation.price.toLocaleString()}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <button
                id="reset-finder-btn"
                onClick={handleReset}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-purple-500/30 text-xs text-neutral-300 hover:text-white uppercase tracking-wider font-mono cursor-pointer"
              >
                Retake Diagnostic
              </button>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <button
                  id="inspect-finder-match-btn"
                  onClick={() => {
                    onSelectVariation(resultVariation);
                    onClose();
                    const el = document.getElementById('flacon-3d');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-purple-900/40 hover:bg-purple-800/50 border border-purple-400/30 text-xs text-white uppercase tracking-wider font-mono cursor-pointer"
                >
                  Inspect in 3D
                </button>

                <button
                  id="acquire-finder-match-btn"
                  onClick={() => {
                    AudioEngine.playCrystalChime(880);
                    onAddToCart(resultVariation);
                    onClose();
                  }}
                  className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-500 to-amber-300 hover:opacity-95 text-black text-xs font-cinzel font-bold uppercase tracking-widest flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(192,132,252,0.4)] cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Acquire Now</span>
                </button>
              </div>
            </div>
          </motion.div>
        ) : (
          /* Question Steps Screen */
          <div className="space-y-6">
            <div>
              <div className="flex items-center justify-between text-xs font-mono text-neutral-400 mb-2">
                <span>Phase {currentStep + 1} of {SCENT_FINDER_QUESTIONS.length}</span>
                <span className="text-purple-300">Progress {Math.round(((currentStep + 1) / SCENT_FINDER_QUESTIONS.length) * 100)}%</span>
              </div>
              <div className="w-full h-1 bg-neutral-900 rounded-full overflow-hidden mb-5">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-fuchsia-400 transition-all duration-500 rounded-full"
                  style={{ width: `${((currentStep + 1) / SCENT_FINDER_QUESTIONS.length) * 100}%` }}
                />
              </div>

              <h3 className="font-cinzel text-xl sm:text-2xl font-medium text-white">
                {currentQuestion.question}
              </h3>
              <p className="font-serif-luxury italic text-xs sm:text-sm text-neutral-300 mt-1">
                {currentQuestion.subtitle}
              </p>
            </div>

            {/* Option Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQuestion.options.map((option) => {
                return (
                  <button
                    key={option.id}
                    id={`finder-opt-${option.id}`}
                    onClick={() => handleSelectOption(option.id)}
                    className="text-left p-4 rounded-2xl bg-[#180835]/80 border border-purple-500/20 hover:border-purple-400 hover:bg-[#200b46] transition-all group cursor-pointer flex flex-col justify-between shadow-md"
                  >
                    <div>
                      <span className="font-cinzel text-sm font-semibold text-white group-hover:text-purple-200 transition-colors block">
                        {option.label}
                      </span>
                      <p className="text-[11px] text-neutral-300 leading-relaxed font-light mt-1">
                        {option.desc}
                      </p>
                    </div>
                    <div className="mt-3 flex items-center justify-end text-[10px] font-mono text-purple-300 opacity-0 group-hover:opacity-100 transition-opacity">
                      Select Accord →
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Navigation Back */}
            {currentStep > 0 && (
              <div className="pt-2">
                <button
                  id="finder-prev-step-btn"
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="text-xs text-neutral-400 hover:text-white flex items-center gap-1 font-mono uppercase cursor-pointer"
                >
                  <ArrowLeft className="w-3 h-3" /> Back
                </button>
              </div>
            )}
          </div>
        )}
      </motion.div>
    </div>
  );
}
