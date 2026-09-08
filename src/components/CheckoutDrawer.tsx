import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trash2, ShoppingBag, Gift, Sparkles, Check, ArrowRight, ShieldCheck } from 'lucide-react';
import { CartItem, FragranceVariation } from '../types';
import { COMPLIMENTARY_SAMPLES } from '../data/fragranceData';
import { AudioEngine } from '../utils/audioEngine';

interface CheckoutDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onUpdateEngraving: (id: string, text: string, font: 'roman' | 'script') => void;
  onUpdateGiftPackaging: (id: string, packaging: 'signature' | 'royal-velvet', seal: 'gold' | 'black-obsidian' | 'bordeaux') => void;
  onToggleSample: (id: string, sampleId: string) => void;
  onProceedToCheckout: () => void;
}

export default function CheckoutDrawer({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onUpdateEngraving,
  onUpdateGiftPackaging,
  onToggleSample,
  onProceedToCheckout
}: CheckoutDrawerProps) {
  const [editingEngravingId, setEditingEngravingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.variation.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 28, stiffness: 280 }}
        className="w-full max-w-lg bg-[#120727]/95 backdrop-blur-2xl border-l border-purple-500/30 h-full flex flex-col justify-between shadow-2xl relative"
      >
        {/* Drawer Header */}
        <div className="p-6 border-b border-purple-500/20 flex items-center justify-between bg-[#180935]/80">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-purple-300" />
            <h3 className="font-cinzel text-lg font-medium text-white tracking-wider uppercase">
              La Malle d’Achats ({cartItems.reduce((acc, item) => acc + item.quantity, 0)})
            </h3>
          </div>
          <button
            id="close-cart-drawer-btn"
            onClick={() => {
              AudioEngine.playTactileClick();
              onClose();
            }}
            className="p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Items Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {cartItems.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag className="w-12 h-12 text-[#997b2f] mx-auto mb-4 opacity-40" />
              <p className="font-cinzel text-white text-base">Your shopping coffret is empty</p>
              <p className="text-xs text-neutral-400 font-serif-luxury italic mt-1">
                Explore our olfactory creations and select a flacon of your choice.
              </p>
            </div>
          ) : (
            cartItems.map((item) => (
              <div
                key={item.id}
                className="bg-[#11131b] border border-white/10 rounded-2xl p-4.5 space-y-3"
              >
                {/* Item Header */}
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#d4af37]">
                      {item.variation.volume}
                    </span>
                    <h4 className="font-cinzel text-base font-medium text-white">
                      {item.variation.name}
                    </h4>
                    <p className="font-serif-luxury italic text-xs text-neutral-400">
                      {item.variation.frenchTitle}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="font-cinzel font-bold text-white text-base">
                      ${(item.variation.price * item.quantity).toLocaleString()}
                    </span>
                    <div className="flex items-center gap-1 mt-2 justify-end">
                      <button
                        onClick={() => onUpdateQuantity(item.id, -1)}
                        className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 text-white text-xs flex items-center justify-center cursor-pointer"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-xs font-mono text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, 1)}
                        className="w-6 h-6 rounded bg-white/5 hover:bg-white/10 text-white text-xs flex items-center justify-center cursor-pointer"
                      >
                        +
                      </button>
                      <button
                        onClick={() => onRemoveItem(item.id)}
                        className="p-1 ml-1 text-neutral-500 hover:text-red-400 transition-colors cursor-pointer"
                        title="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Personalized Engraving Section */}
                <div className="pt-2 border-t border-white/5">
                  <div className="flex items-center justify-between text-[11px] mb-1.5">
                    <span className="text-[#d4af37] font-mono uppercase flex items-center gap-1">
                      <Sparkles className="w-3 h-3" />
                      24K Gold Collar Monogram
                    </span>
                    <span className="text-[10px] text-neutral-400 font-mono">Complimentary</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      maxLength={12}
                      value={item.engravingText}
                      onChange={(e) => onUpdateEngraving(item.id, e.target.value.toUpperCase(), item.engravingFont)}
                      placeholder="Add Engraving (e.g. A.N. 2026)"
                      className="flex-1 px-3 py-1.5 bg-black/60 border border-white/10 rounded-lg text-xs text-white focus:outline-none focus:border-[#d4af37] font-mono uppercase"
                    />
                    <div className="flex rounded-lg bg-black/40 border border-white/10 p-0.5 text-[10px]">
                      <button
                        onClick={() => onUpdateEngraving(item.id, item.engravingText, 'roman')}
                        className={`px-2 py-1 rounded cursor-pointer ${
                          item.engravingFont === 'roman' ? 'bg-[#d4af37] text-black font-bold' : 'text-neutral-400'
                        }`}
                      >
                        Roman
                      </button>
                      <button
                        onClick={() => onUpdateEngraving(item.id, item.engravingText, 'script')}
                        className={`px-2 py-1 rounded cursor-pointer ${
                          item.engravingFont === 'script' ? 'bg-[#d4af37] text-black font-bold font-serif-luxury italic' : 'text-neutral-400'
                        }`}
                      >
                        Script
                      </button>
                    </div>
                  </div>
                </div>

                {/* Complimentary Samples Selection (2 samples per item) */}
                <div className="pt-2 border-t border-white/5">
                  <div className="flex items-center justify-between text-[11px] mb-1.5">
                    <span className="text-neutral-300 font-mono uppercase">
                      Select 2 Complimentary 2ml Extraits:
                    </span>
                    <span className="text-[10px] text-[#d4af37] font-mono">
                      {item.complimentarySamples.length}/2 Picked
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-1.5">
                    {COMPLIMENTARY_SAMPLES.map((sample) => {
                      const isPicked = item.complimentarySamples.includes(sample.id);
                      return (
                        <button
                          key={sample.id}
                          onClick={() => onToggleSample(item.id, sample.id)}
                          className={`p-2 rounded-lg text-left text-[10px] border transition-all cursor-pointer ${
                            isPicked
                              ? 'bg-[#d4af37]/15 border-[#d4af37] text-[#f3e5ab]'
                              : 'bg-black/30 border-white/5 text-neutral-400 hover:border-white/20'
                          }`}
                        >
                          <div className="font-medium truncate">{sample.name}</div>
                          <div className="text-[9px] text-neutral-500">{sample.concentration}</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Wax Seal Gift Presentation Choice */}
                <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
                  <span className="text-neutral-400 flex items-center gap-1">
                    <Gift className="w-3.5 h-3.5 text-[#d4af37]" />
                    Hot Wax Seal Color:
                  </span>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onUpdateGiftPackaging(item.id, item.giftPackaging, 'gold')}
                      className={`w-4 h-4 rounded-full border cursor-pointer ${
                        item.waxSealColor === 'gold' ? 'ring-2 ring-[#d4af37] scale-110' : 'opacity-70'
                      }`}
                      style={{ backgroundColor: '#D4AF37' }}
                      title="24K Gold Wax Seal"
                    />
                    <button
                      onClick={() => onUpdateGiftPackaging(item.id, item.giftPackaging, 'black-obsidian')}
                      className={`w-4 h-4 rounded-full border cursor-pointer ${
                        item.waxSealColor === 'black-obsidian' ? 'ring-2 ring-[#d4af37] scale-110' : 'opacity-70'
                      }`}
                      style={{ backgroundColor: '#101216' }}
                      title="Obsidian Black Wax Seal"
                    />
                    <button
                      onClick={() => onUpdateGiftPackaging(item.id, item.giftPackaging, 'bordeaux')}
                      className={`w-4 h-4 rounded-full border cursor-pointer ${
                        item.waxSealColor === 'bordeaux' ? 'ring-2 ring-[#d4af37] scale-110' : 'opacity-70'
                      }`}
                      style={{ backgroundColor: '#6e1923' }}
                      title="Royal Bordeaux Wax Seal"
                    />
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer Checkout CTA */}
        {cartItems.length > 0 && (
          <div className="p-6 bg-[#180935]/90 border-t border-purple-500/20 space-y-4">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-neutral-300">
                <span>Subtotal</span>
                <span className="text-white font-mono">${subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-neutral-300">
                <span>White-Glove Insured Courier</span>
                <span className="text-purple-300 font-mono">Complimentary ($0)</span>
              </div>
              <div className="flex justify-between text-base font-cinzel font-bold text-white pt-2 border-t border-purple-500/20">
                <span>Total Due</span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-fuchsia-200 to-amber-200">${subtotal.toLocaleString()} USD</span>
              </div>
            </div>

            <button
              id="drawer-proceed-checkout-btn"
              onClick={() => {
                AudioEngine.playCrystalChime(920);
                onProceedToCheckout();
              }}
              className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-500 to-amber-300 hover:opacity-95 text-black font-cinzel text-xs uppercase tracking-[0.25em] font-bold flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(168,85,247,0.4)] transition-all cursor-pointer"
            >
              <span>Proceed to Luxury Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] font-mono text-purple-300/80 uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>Encrypted Concierge Gateway • Hand-Delivered in Satin Box</span>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
