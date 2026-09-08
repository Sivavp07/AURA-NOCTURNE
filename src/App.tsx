import { useState } from 'react';
import Navbar from './components/Navbar';
import HeroCinematicReel from './components/HeroCinematicReel';
import ScentNotesExplorer from './components/ScentNotesExplorer';
import ThreePerfumeModel from './components/ThreePerfumeModel';
import BentoStorytelling from './components/BentoStorytelling';
import FlaconEditions from './components/FlaconEditions';
import ScentFinderModal from './components/ScentFinderModal';
import CheckoutDrawer from './components/CheckoutDrawer';
import LuxuryCheckoutModal from './components/LuxuryCheckoutModal';
import Footer from './components/Footer';
import DreamyLandscapeBackground, { LandscapeTheme } from './components/DreamyLandscapeBackground';
import AtmosphereSelector from './components/AtmosphereSelector';
import { FRAGRANCE_VARIATIONS, SCENT_NOTES } from './data/fragranceData';
import { FragranceVariation, ScentNote, CartItem } from './types';
import { AudioEngine } from './utils/audioEngine';

export default function App() {
  // Atmospheric Dreamy Landscape Theme State
  const [landscapeTheme, setLandscapeTheme] = useState<LandscapeTheme>('twilight-lavender');

  // Active selected variation (default to Flacon Millésime 100ml)
  const [selectedVariation, setSelectedVariation] = useState<FragranceVariation>(FRAGRANCE_VARIATIONS[1]);
  // Active highlighted scent note from Olfactory Pyramid
  const [activeNote, setActiveNote] = useState<ScentNote | null>(null);

  // Cart State (Initialized with 1 flagship item so user can immediately view luxury bag features)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-init-1',
      variation: FRAGRANCE_VARIATIONS[1],
      quantity: 1,
      engravingText: 'A.N. 2026',
      engravingFont: 'roman',
      giftPackaging: 'signature',
      waxSealColor: 'gold',
      complimentarySamples: ['s-oud-rose', 's-ambre-blanc']
    }
  ]);

  // Modal / Drawer States
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isScentFinderOpen, setIsScentFinderOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('film');

  // Handle Note selection from Olfactory Pyramid
  const handleSelectNote = (note: ScentNote) => {
    setActiveNote(note);
    // Find dominant variation for this note if available
    const matchedVariation = FRAGRANCE_VARIATIONS.find((v) => note.dominantVariations.includes(v.id));
    if (matchedVariation) {
      setSelectedVariation(matchedVariation);
    }
  };

  // Add Variation to Cart
  const handleAddToCart = (variation: FragranceVariation) => {
    AudioEngine.playCrystalChime(880);
    setCartItems((prev) => {
      const existing = prev.find((item) => item.variation.id === variation.id);
      if (existing) {
        return prev.map((item) =>
          item.variation.id === variation.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [
        ...prev,
        {
          id: `cart-${Date.now()}`,
          variation,
          quantity: 1,
          engravingText: '',
          engravingFont: 'roman',
          giftPackaging: 'signature',
          waxSealColor: 'gold',
          complimentarySamples: ['s-oud-rose', 's-iris-cuir']
        }
      ];
    });
    setIsCartOpen(true);
  };

  // Cart Management
  const handleUpdateQuantity = (id: string, delta: number) => {
    AudioEngine.playTactileClick();
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter((item): item is CartItem => item !== null)
    );
  };

  const handleRemoveItem = (id: string) => {
    AudioEngine.playTactileClick();
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleUpdateEngraving = (id: string, text: string, font: 'roman' | 'script') => {
    setCartItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, engravingText: text, engravingFont: font } : item))
    );
  };

  const handleUpdateGiftPackaging = (
    id: string,
    packaging: 'signature' | 'royal-velvet',
    seal: 'gold' | 'black-obsidian' | 'bordeaux'
  ) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, giftPackaging: packaging, waxSealColor: seal } : item
      )
    );
  };

  const handleToggleSample = (itemId: string, sampleId: string) => {
    AudioEngine.playTactileClick();
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          const current = item.complimentarySamples;
          if (current.includes(sampleId)) {
            return { ...item, complimentarySamples: current.filter((s) => s !== sampleId) };
          }
          if (current.length < 2) {
            return { ...item, complimentarySamples: [...current, sampleId] };
          }
          // replace first
          return { ...item, complimentarySamples: [current[1], sampleId] };
        }
        return item;
      })
    );
  };

  const handleProceedToCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen bg-[#080212] text-purple-100 flex flex-col font-sans selection:bg-purple-600 selection:text-white relative">
      {/* Immersive Dreamy Purple Landscape Background & Celestial Stardust */}
      <DreamyLandscapeBackground
        currentTheme={landscapeTheme}
        onChangeTheme={setLandscapeTheme}
      />

      {/* Floating Dreamscape Atmosphere Switcher */}
      <AtmosphereSelector
        currentTheme={landscapeTheme}
        onChangeTheme={setLandscapeTheme}
      />

      {/* Fixed Luxury Navigation */}
      <Navbar
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenScentFinder={() => setIsScentFinderOpen(true)}
        activeSection={activeSection}
      />

      <main className="flex-grow">
        {/* 1. Cinematic Opening Reel with Frames of Video Continuity */}
        <HeroCinematicReel
          onExplorePerfume={() => {
            const el = document.getElementById('scent-notes');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenScentFinder={() => setIsScentFinderOpen(true)}
        />

        {/* 2. Interactive Scent Notes (ABOVE the 3D Model, with pop-up descriptions & pricing information for each variation) */}
        <ScentNotesExplorer
          activeNoteId={activeNote?.id || null}
          onSelectNote={handleSelectNote}
          onSelectVariation={(variation) => setSelectedVariation(variation)}
          onAddToCart={handleAddToCart}
        />

        {/* 3. Interactive 3D Model of the Perfume Flacon */}
        <ThreePerfumeModel
          selectedVariation={selectedVariation}
          activeNote={activeNote}
          onSelectVariation={(v) => setSelectedVariation(v)}
          onAddToCart={handleAddToCart}
        />

        {/* 4. Bento Storytelling Section (Sillage Radar, Crystal Craft, 432 Hz Resonance, 400:1 Ratio, Monogramming) */}
        <BentoStorytelling />

        {/* 5. Flacon Editions Catalog & Pricing Showcase */}
        <FlaconEditions
          selectedVariation={selectedVariation}
          onSelectVariation={(v) => setSelectedVariation(v)}
          onAddToCart={handleAddToCart}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Interactive Scent Finder Diagnostic Modal */}
      <ScentFinderModal
        isOpen={isScentFinderOpen}
        onClose={() => setIsScentFinderOpen(false)}
        onSelectVariation={(v) => setSelectedVariation(v)}
        onAddToCart={handleAddToCart}
      />

      {/* Shopping Bag Drawer with Personalization & Samples */}
      <CheckoutDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onUpdateEngraving={handleUpdateEngraving}
        onUpdateGiftPackaging={handleUpdateGiftPackaging}
        onToggleSample={handleToggleSample}
        onProceedToCheckout={handleProceedToCheckout}
      />

      {/* Luxury E-Commerce Multi-Step Checkout Modal */}
      <LuxuryCheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        onClearCart={handleClearCart}
      />
    </div>
  );
}
