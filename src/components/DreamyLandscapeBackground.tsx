import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Moon, Sun, Wind, Eye } from 'lucide-react';

export type LandscapeTheme = 'twilight-lavender' | 'celestial-amethyst' | 'velvet-nocturne';

interface DreamyLandscapeBackgroundProps {
  currentTheme: LandscapeTheme;
  onChangeTheme: (theme: LandscapeTheme) => void;
}

export const LANDSCAPE_THEMES = [
  {
    id: 'twilight-lavender' as LandscapeTheme,
    name: 'Nuit à Grasse',
    subtitle: 'Misty Lavender Valleys & Violet Dusk',
    bgImage: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=2560&q=85',
    accentColor: '#c084fc',
    gradientOverlay: 'from-[#0b0318]/90 via-[#180731]/80 to-[#070110]/95',
    ambientHue: 'rgba(168, 85, 247, 0.15)'
  },
  {
    id: 'celestial-amethyst' as LandscapeTheme,
    name: 'Améthyste Céleste',
    subtitle: 'Starry Purple Aurora & Cosmic Nebulae',
    bgImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=2560&q=85',
    accentColor: '#d8b4fe',
    gradientOverlay: 'from-[#0f0422]/90 via-[#220a44]/75 to-[#090214]/95',
    ambientHue: 'rgba(192, 132, 252, 0.18)'
  },
  {
    id: 'velvet-nocturne' as LandscapeTheme,
    name: 'Crépuscule Impérial',
    subtitle: 'Deep Velvet Plum & Starlit Mountain Silhouette',
    bgImage: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=2560&q=85',
    accentColor: '#f3e8ff',
    gradientOverlay: 'from-[#0a0216]/92 via-[#1d0637]/82 to-[#06010e]/96',
    ambientHue: 'rgba(147, 51, 234, 0.16)'
  }
];

export default function DreamyLandscapeBackground({
  currentTheme,
  onChangeTheme
}: DreamyLandscapeBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const activeThemeObj = LANDSCAPE_THEMES.find((t) => t.id === currentTheme) || LANDSCAPE_THEMES[0];

  // Floating star dust & fragrance aura particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    interface Particle {
      x: number;
      y: number;
      radius: number;
      alpha: number;
      speedY: number;
      speedX: number;
      pulse: number;
      pulseSpeed: number;
      hue: number;
    }

    const particles: Particle[] = [];
    const count = Math.min(80, Math.floor((width * height) / 18000));

    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2.2 + 0.6,
        alpha: Math.random() * 0.7 + 0.2,
        speedY: -(Math.random() * 0.35 + 0.1),
        speedX: (Math.random() - 0.5) * 0.25,
        pulse: Math.random() * Math.PI,
        pulseSpeed: Math.random() * 0.02 + 0.008,
        hue: Math.random() > 0.4 ? 275 + Math.random() * 25 : 42 + Math.random() * 15 // violet or soft champagne
      });
    }

    const render = () => {
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p) => {
        p.y += p.speedY;
        p.x += p.speedX;
        p.pulse += p.pulseSpeed;

        if (p.y < -10) {
          p.y = height + 10;
          p.x = Math.random() * width;
        }
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;

        const currentAlpha = p.alpha * (0.6 + 0.4 * Math.sin(p.pulse));

        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2.5);
        if (p.hue > 200) {
          gradient.addColorStop(0, `hsla(${p.hue}, 85%, 78%, ${currentAlpha})`);
          gradient.addColorStop(1, `hsla(${p.hue}, 85%, 60%, 0)`);
        } else {
          gradient.addColorStop(0, `hsla(${p.hue}, 75%, 75%, ${currentAlpha})`);
          gradient.addColorStop(1, `hsla(${p.hue}, 75%, 60%, 0)`);
        }

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius * 2.5, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [currentTheme]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none">
      {/* Dynamic Landscape Photo Layer with crossfade */}
      <AnimatePresence mode="sync">
        <motion.div
          key={activeThemeObj.id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 1.8, ease: 'easeInOut' }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={activeThemeObj.bgImage}
            alt="Dreamy Purple Landscape"
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center filter saturate-[1.25] contrast-[1.08] brightness-[0.72]"
          />
        </motion.div>
      </AnimatePresence>

      {/* Atmospheric Violet Velvet Gradient Veil */}
      <div
        className={`absolute inset-0 bg-gradient-to-b ${activeThemeObj.gradientOverlay} mix-blend-multiply transition-colors duration-1000`}
      />

      {/* Soft Ambient Violet & Lavender Radiance Pods */}
      <div
        className="absolute -top-[15%] left-[20%] w-[65vw] h-[65vw] rounded-full blur-[140px] pointer-events-none transition-all duration-1000"
        style={{ background: 'radial-gradient(circle, rgba(168,85,247,0.22) 0%, rgba(126,34,206,0.08) 50%, transparent 80%)' }}
      />
      <div
        className="absolute top-[45%] -right-[10%] w-[50vw] h-[50vw] rounded-full blur-[130px] pointer-events-none transition-all duration-1000"
        style={{ background: 'radial-gradient(circle, rgba(192,132,252,0.18) 0%, rgba(107,33,168,0.07) 60%, transparent 85%)' }}
      />
      <div
        className="absolute bottom-[-10%] left-[-10%] w-[60vw] h-[60vw] rounded-full blur-[150px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(216,180,254,0.14) 0%, rgba(88,28,135,0.08) 55%, transparent 80%)' }}
      />

      {/* Dreamy Drifting Violet Mist Waves */}
      <div className="absolute inset-0 opacity-40 mix-blend-screen pointer-events-none bg-[radial-gradient(ellipse_at_bottom,rgba(192,132,252,0.12)_0%,transparent_70%)] animate-pulse" style={{ animationDuration: '8s' }} />

      {/* Interactive Stardust & Fragrance Aura Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Subtle Fine Film Grain for Organic Editorial Texture (Removes digital flat/AI feel) */}
      <div
        className="absolute inset-0 opacity-[0.035] pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />
    </div>
  );
}
