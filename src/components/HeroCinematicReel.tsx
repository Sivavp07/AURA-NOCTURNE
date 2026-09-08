import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, SkipBack, SkipForward, Film, Camera, Sparkles, ChevronDown, Sliders } from 'lucide-react';
import { VIDEO_CONTINUITY_FRAMES } from '../data/fragranceData';
import { AudioEngine } from '../utils/audioEngine';

interface HeroCinematicReelProps {
  onExplorePerfume: () => void;
  onOpenScentFinder: () => void;
}

export default function HeroCinematicReel({
  onExplorePerfume,
  onOpenScentFinder
}: HeroCinematicReelProps) {
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showDirectorNotes, setShowDirectorNotes] = useState(false);
  const timelineRef = useRef<HTMLDivElement>(null);

  const activeFrame = VIDEO_CONTINUITY_FRAMES[currentFrameIndex];

  // Auto-advance frames when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setCurrentFrameIndex((prev) => (prev + 1) % VIDEO_CONTINUITY_FRAMES.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handleSelectFrame = (index: number) => {
    AudioEngine.playTactileClick();
    setCurrentFrameIndex(index);
  };

  const togglePlay = () => {
    AudioEngine.playTactileClick();
    setIsPlaying(!isPlaying);
  };

  const nextFrame = () => {
    AudioEngine.playTactileClick();
    setCurrentFrameIndex((prev) => (prev + 1) % VIDEO_CONTINUITY_FRAMES.length);
  };

  const prevFrame = () => {
    AudioEngine.playTactileClick();
    setCurrentFrameIndex((prev) => (prev - 1 + VIDEO_CONTINUITY_FRAMES.length) % VIDEO_CONTINUITY_FRAMES.length);
  };

  return (
    <section id="film-continuity" className="relative min-h-screen bg-transparent flex flex-col justify-between pt-24 pb-12 overflow-hidden border-b border-purple-500/20">
      {/* Background Subtle Gradient & Grain */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(168,85,247,0.14),transparent)]" />

      {/* Opening Header Brand Statement */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full text-center mt-4 sm:mt-6 mb-6">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1 rounded-full border border-purple-400/35 bg-[#16082c]/80 text-purple-200 text-[11px] uppercase tracking-[0.28em] font-medium mb-4 shadow-[0_0_20px_rgba(192,132,252,0.18)]"
        >
          <Film className="w-3.5 h-3.5 text-purple-300" />
          <span>Cinematic Continuity Reel • Master Distillation 2026</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="font-cinzel text-3xl sm:text-5xl md:text-7xl font-light tracking-[0.16em] text-white uppercase leading-tight"
        >
          Aura Nocturne
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
          className="font-serif-luxury italic text-lg sm:text-2xl text-purple-100/90 max-w-2xl mx-auto mt-2 font-light tracking-wide"
        >
          “The birth of an eternal extrait — from Grasse dawn mist to molten crystal.”
        </motion.p>
      </div>

      {/* Anamorphic 2.39:1 Cinema Viewport Frame */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 w-full my-auto">
        <div className="relative rounded-2xl overflow-hidden border border-[#d4af37]/25 shadow-[0_20px_60px_rgba(0,0,0,0.95)] bg-black aspect-[16/9] md:aspect-[2.39/1] group">
          {/* Cinema Mask lines (Letterbox styling) */}
          <div className="absolute top-0 left-0 right-0 h-3 sm:h-4 bg-black/80 z-20 pointer-events-none border-b border-white/5 flex items-center justify-between px-4 text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
            <span>PANAVISION 65MM • 2.39:1 ASPECT</span>
            <span className="text-[#d4af37] flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-ping"></span>
              REC • 24.000 FPS
            </span>
            <span>4K RAW PRORES 4444 XQ</span>
          </div>

          <div className="absolute bottom-0 left-0 right-0 h-3 sm:h-4 bg-black/80 z-20 pointer-events-none border-t border-white/5 flex items-center justify-between px-4 text-[9px] font-mono text-neutral-500 uppercase tracking-widest">
            <span>SOUNDCUE: {activeFrame.soundCue}</span>
            <span>TIMECODE {activeFrame.timecode}</span>
          </div>

          {/* Active Image with crossfade */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFrame.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
              className="absolute inset-0 w-full h-full"
            >
              <img
                src={activeFrame.imageUrl}
                alt={activeFrame.title}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover brightness-[0.78] contrast-[1.12]"
              />
              {/* Subtle film grain & warm grading vignette */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-black/60 pointer-events-none" />
              <div className="absolute inset-0 bg-radial-[circle_at_center,transparent_50%,rgba(0,0,0,0.7)_100%] pointer-events-none" />
            </motion.div>
          </AnimatePresence>

          {/* On-Frame Scene Title & Narrative Overlay */}
          <div className="absolute bottom-6 sm:bottom-8 left-6 sm:left-10 right-6 sm:right-10 z-20 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="max-w-xl">
              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase bg-[#000]/60 px-2 py-0.5 rounded border border-[#d4af37]/30">
                  {activeFrame.sceneNumber}
                </span>
                <span className="text-xs text-neutral-400 font-mono tracking-wider">
                  {activeFrame.timecode}
                </span>
              </div>
              <h2 className="font-cinzel text-xl sm:text-2xl md:text-3xl text-white font-medium tracking-wider">
                {activeFrame.title}
              </h2>
              <p className="text-xs sm:text-sm text-neutral-300 font-light mt-1 line-clamp-2 sm:line-clamp-3 leading-relaxed">
                {activeFrame.narrative}
              </p>
            </div>

            {/* Frame Controls Bar */}
            <div className="flex items-center gap-2 self-start md:self-end bg-black/70 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 shadow-lg">
              <button
                id="film-prev-btn"
                onClick={prevFrame}
                className="p-1.5 text-neutral-300 hover:text-[#d4af37] transition-colors cursor-pointer"
                title="Previous Frame"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                id="film-play-toggle-btn"
                onClick={togglePlay}
                className="p-2 bg-[#d4af37] text-black rounded-full hover:bg-[#e5c378] transition-transform active:scale-95 cursor-pointer shadow-[0_0_12px_#d4af37]"
                title={isPlaying ? 'Pause Film Continuity' : 'Play Film Continuity'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Play className="w-3.5 h-3.5 fill-current" />}
              </button>

              <button
                id="film-next-btn"
                onClick={nextFrame}
                className="p-1.5 text-neutral-300 hover:text-[#d4af37] transition-colors cursor-pointer"
                title="Next Frame"
              >
                <SkipForward className="w-4 h-4" />
              </button>

              <div className="h-4 w-px bg-neutral-700 mx-1"></div>

              <button
                id="film-notes-toggle-btn"
                onClick={() => setShowDirectorNotes(!showDirectorNotes)}
                className={`p-1.5 rounded text-xs transition-colors flex items-center gap-1 cursor-pointer ${
                  showDirectorNotes ? 'text-[#d4af37]' : 'text-neutral-400 hover:text-white'
                }`}
                title="Toggle Director's Notes"
              >
                <Camera className="w-3.5 h-3.5" />
                <span className="text-[10px] hidden sm:inline">Notes</span>
              </button>
            </div>
          </div>

          {/* Director's Camera Metadata Box (Collapsible) */}
          {showDirectorNotes && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="absolute top-8 right-6 z-30 bg-[#0d0f14]/90 backdrop-blur-md border border-[#d4af37]/30 rounded-xl p-3.5 text-left text-xs max-w-xs shadow-2xl"
            >
              <div className="flex items-center gap-1.5 text-[#d4af37] text-[10px] uppercase font-mono tracking-wider mb-1">
                <Sliders className="w-3 h-3" />
                <span>Director’s Shot Spec</span>
              </div>
              <p className="text-neutral-300 font-mono text-[11px] mb-1">
                <span className="text-neutral-500">Optics:</span> {activeFrame.shotType}
              </p>
              <p className="text-neutral-300 font-mono text-[11px] mb-2">
                <span className="text-neutral-500">Focal:</span> {activeFrame.focalElement}
              </p>
              <p className="text-neutral-400 italic text-[11px] border-t border-white/10 pt-1.5">
                “{activeFrame.directorNote}”
              </p>
            </motion.div>
          )}
        </div>

        {/* Continuity Film Strip Scrubber Bar */}
        <div
          ref={timelineRef}
          className="mt-5 bg-[#0f1116] border border-[#d4af37]/20 rounded-xl p-2.5 flex items-center gap-2 sm:gap-3 overflow-x-auto shadow-xl"
        >
          <div className="flex items-center gap-1.5 px-2 text-[10px] font-mono uppercase text-[#997b2f] tracking-widest whitespace-nowrap">
            <span>Scrub Frames:</span>
          </div>

          {VIDEO_CONTINUITY_FRAMES.map((frame, index) => {
            const isSelected = currentFrameIndex === index;
            return (
              <button
                key={frame.id}
                id={`frame-thumb-${frame.id}`}
                onClick={() => handleSelectFrame(index)}
                className={`relative flex-shrink-0 group rounded-lg overflow-hidden transition-all duration-300 cursor-pointer ${
                  isSelected
                    ? 'ring-2 ring-[#d4af37] scale-102 shadow-[0_0_15px_rgba(212,175,55,0.4)]'
                    : 'opacity-50 hover:opacity-90 ring-1 ring-white/10'
                }`}
              >
                <div className="w-20 sm:w-28 h-12 sm:h-14 relative">
                  <img
                    src={frame.imageUrl}
                    alt={frame.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-colors" />
                  <div className="absolute bottom-1 left-1 bg-black/80 px-1 py-0.2 rounded text-[8px] font-mono text-purple-300">
                    {frame.timecode.slice(3, 8)}
                  </div>
                </div>
                {isSelected && (
                  <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 to-fuchsia-400" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Call to Actions & Jump to Scent Notes + 3D Flacon */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
        <button
          id="hero-explore-flacon-btn"
          onClick={onExplorePerfume}
          className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-amber-300 text-black hover:opacity-95 transition-all font-cinzel text-xs tracking-[0.25em] uppercase font-bold flex items-center justify-center gap-2 shadow-[0_0_30px_rgba(168,85,247,0.4)] cursor-pointer group"
        >
          <Sparkles className="w-4 h-4 text-black group-hover:rotate-12 transition-transform" />
          <span>Explore Scent Notes & 3D Flacon</span>
          <ChevronDown className="w-4 h-4 text-black animate-bounce" />
        </button>

        <button
          id="hero-open-finder-btn"
          onClick={() => {
            AudioEngine.playCrystalChime(880);
            onOpenScentFinder();
          }}
          className="w-full sm:w-auto px-7 py-3.5 rounded-full border border-purple-400/40 bg-[#16082c]/60 hover:bg-purple-900/30 text-purple-100 transition-all font-cinzel text-xs tracking-[0.2em] uppercase font-medium cursor-pointer backdrop-blur-md"
        >
          Consult Bespoke Scent Finder
        </button>
      </div>
    </section>
  );
}
