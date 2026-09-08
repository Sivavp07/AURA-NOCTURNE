import { useState, useEffect, type FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Check, ShieldCheck, Lock, CreditCard, Sparkles, Truck, Award, Download, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem } from '../types';
import { AudioEngine } from '../utils/audioEngine';

interface LuxuryCheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onClearCart: () => void;
}

export default function LuxuryCheckoutModal({
  isOpen,
  onClose,
  cartItems,
  onClearCart
}: LuxuryCheckoutModalProps) {
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Form Fields
  const [formData, setFormData] = useState({
    fullName: 'Lady Genevieve Laurent',
    email: 'genevieve.laurent@residence-privee.fr',
    phone: '+33 1 42 68 55 00',
    address: '14 Place Vendôme, Suite Impériale',
    city: 'Paris',
    postalCode: '75001',
    country: 'France',
    deliveryInstructions: 'Ring private concierge upon arrival. Temperature-controlled parcel.',
    cardNumber: '•••• •••• •••• 8842',
    cardExp: '08/29',
    cardCvc: '•••'
  });

  // Generated Certificate Data
  const [certificateData, setCertificateData] = useState<{
    certId: string;
    batchNumber: string;
    compoundDate: string;
  } | null>(null);

  if (!isOpen) return null;

  const totalAmount = cartItems.reduce((acc, item) => acc + item.variation.price * item.quantity, 0);

  const handleNextStep = (e: FormEvent) => {
    e.preventDefault();
    AudioEngine.playTactileClick();
    if (step === 1) {
      setStep(2);
    } else if (step === 2) {
      setIsProcessing(true);
      AudioEngine.playCrystalChime(1040);

      setTimeout(() => {
        setIsProcessing(false);
        const cert = {
          certId: `MAISON-AN-${Math.floor(100000 + Math.random() * 900000)}-PARIS`,
          batchNumber: `VINTAGE-2026-LOT-${Math.floor(10 + Math.random() * 89)}`,
          compoundDate: new Date().toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
          })
        };
        setCertificateData(cert);
        setStep(3);
        onClearCart();

        // Trigger celebratory golden & amethyst confetti
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
          colors: ['#c084fc', '#e879f9', '#f3e5ab', '#ffffff', '#a855f7']
        });
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/90 backdrop-blur-xl">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="relative w-full max-w-2xl bg-[#130728]/95 backdrop-blur-2xl border border-purple-400/35 rounded-3xl p-6 sm:p-8 shadow-[0_25px_90px_rgba(0,0,0,0.98)] max-h-[92vh] overflow-y-auto"
      >
        {/* Close Button */}
        <button
          id="close-checkout-modal-btn"
          onClick={() => {
            AudioEngine.playTactileClick();
            onClose();
          }}
          className="absolute top-5 right-5 p-2 rounded-full bg-white/5 hover:bg-white/10 text-neutral-300 hover:text-white transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header Navigation Steps */}
        <div className="flex items-center justify-between border-b border-purple-500/20 pb-4 mb-6">
          <div>
            <span className="text-[10px] font-mono tracking-widest uppercase text-purple-300">
              White-Glove Concierge Checkout
            </span>
            <h3 className="font-cinzel text-xl sm:text-2xl font-medium text-white tracking-wide">
              {step === 1 && '1. Private Delivery Destination'}
              {step === 2 && '2. Encrypted Payment Vault'}
              {step === 3 && 'Order Confirmed & Certificate Registered'}
            </h3>
          </div>

          <div className="flex items-center gap-1.5 font-mono text-xs text-purple-300">
            <span className={`w-2.5 h-2.5 rounded-full ${step >= 1 ? 'bg-purple-400 shadow-[0_0_8px_#c084fc]' : 'bg-neutral-800'}`} />
            <span className={`w-2.5 h-2.5 rounded-full ${step >= 2 ? 'bg-purple-400 shadow-[0_0_8px_#c084fc]' : 'bg-neutral-800'}`} />
            <span className={`w-2.5 h-2.5 rounded-full ${step === 3 ? 'bg-purple-400 shadow-[0_0_8px_#c084fc]' : 'bg-neutral-800'}`} />
          </div>
        </div>

        {/* STEP 1: White-Glove Courier Address */}
        {step === 1 && (
          <form onSubmit={handleNextStep} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                  Recipient Full Name / Title
                </label>
                <input
                  type="text"
                  required
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#14161f] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                  Private Email for Olfactory Ledger
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#14161f] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                Residence / Penthouse Address
              </label>
              <input
                type="text"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                className="w-full px-3.5 py-2.5 bg-[#14161f] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                  City
                </label>
                <input
                  type="text"
                  required
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#14161f] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                  Postal Code
                </label>
                <input
                  type="text"
                  required
                  value={formData.postalCode}
                  onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#14161f] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>
              <div>
                <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                  Country
                </label>
                <input
                  type="text"
                  required
                  value={formData.country}
                  onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                  className="w-full px-3.5 py-2.5 bg-[#14161f] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#d4af37]"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                Concierge Delivery Special Instructions
              </label>
              <textarea
                rows={2}
                value={formData.deliveryInstructions}
                onChange={(e) => setFormData({ ...formData, deliveryInstructions: e.target.value })}
                className="w-full px-3.5 py-2 bg-[#14161f] border border-white/10 rounded-xl text-xs text-white focus:outline-none focus:border-[#d4af37]"
              />
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs text-emerald-400 font-mono">
                <Truck className="w-4 h-4" />
                <span>Armored Temperature-Controlled Freight: Included</span>
              </div>

              <button
                type="submit"
                id="checkout-step1-next-btn"
                className="px-6 py-3 rounded-xl bg-[#d4af37] hover:bg-[#e5c378] text-black font-cinzel text-xs uppercase tracking-widest font-bold flex items-center gap-2 shadow-[0_0_20px_rgba(212,175,55,0.3)] cursor-pointer"
              >
                <span>Continue to Vault</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}

        {/* STEP 2: Payment Vault */}
        {step === 2 && (
          <form onSubmit={handleNextStep} className="space-y-5">
            <div className="bg-[#12141c] border border-white/10 rounded-2xl p-4.5 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono uppercase text-neutral-400">Total Authorized Amount</span>
                <div className="text-2xl font-cinzel font-bold text-[#d4af37]">
                  ${totalAmount.toLocaleString()} USD
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                <Lock className="w-3.5 h-3.5" />
                <span>256-Bit SSL Encrypted</span>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                  Card Number (Amex Centurion / Black Card Accepted)
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={formData.cardNumber}
                    onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#14161f] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#d4af37] font-mono"
                  />
                  <CreditCard className="w-4 h-4 text-[#d4af37] absolute right-3.5 top-3" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                    Expiration
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.cardExp}
                    onChange={(e) => setFormData({ ...formData, cardExp: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#14161f] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#d4af37] font-mono"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-mono uppercase text-neutral-400 mb-1">
                    CVV / Security Code
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.cardCvc}
                    onChange={(e) => setFormData({ ...formData, cardCvc: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#14161f] border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-[#d4af37] font-mono"
                  />
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setStep(1)}
                className="text-xs text-neutral-400 hover:text-white font-mono uppercase cursor-pointer"
              >
                ← Back to Address
              </button>

              <button
                type="submit"
                disabled={isProcessing}
                id="checkout-confirm-pay-btn"
                className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-500 to-amber-300 text-black font-cinzel text-xs uppercase tracking-[0.25em] font-bold flex items-center gap-2 shadow-[0_0_25px_rgba(168,85,247,0.4)] cursor-pointer hover:scale-102 transition-all disabled:opacity-50"
              >
                {isProcessing ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-black border-t-transparent rounded-full animate-spin"></span>
                    <span>Transacting Vault...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-black" />
                    <span>Authorize ${totalAmount.toLocaleString()} USD</span>
                  </>
                )}
              </button>
            </div>
          </form>
        )}

        {/* STEP 3: Order Confirmed & Royal Certificate of Authenticity */}
        {step === 3 && certificateData && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 text-center"
          >
            {/* Confirmed Icon */}
            <div className="w-16 h-16 rounded-full bg-purple-900/40 border border-purple-400 text-purple-300 flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(192,132,252,0.4)]">
              <Check className="w-8 h-8" />
            </div>

            <div>
              <h3 className="font-cinzel text-2xl sm:text-3xl text-white font-medium tracking-wide uppercase">
                Acquisition Confirmed
              </h3>
              <p className="font-serif-luxury italic text-sm text-purple-300 mt-1">
                Your bespoke flacon has been allocated from the Paris aging cellar.
              </p>
            </div>

            {/* Official Parchment Certificate Card */}
            <div className="relative p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#1b0a3a] to-[#120626] border-2 border-purple-400/40 shadow-[0_0_40px_rgba(168,85,247,0.2)] text-left">
              <div className="flex items-center justify-between border-b border-purple-500/25 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <Award className="w-5 h-5 text-purple-300" />
                  <span className="font-cinzel text-sm font-semibold tracking-widest text-[#f3e5ab] uppercase">
                    Certificat d'Authenticité
                  </span>
                </div>
                <span className="text-[10px] font-mono text-purple-200 bg-purple-900/40 px-2 py-0.5 rounded border border-purple-400/30">
                  REGISTRY VERIFIED
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="font-mono text-[10px] uppercase text-neutral-400">Certificate No:</span>
                    <p className="font-mono text-white font-semibold text-xs tracking-wider">
                      {certificateData.certId}
                    </p>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase text-neutral-400">Master Batch:</span>
                    <p className="font-mono text-white font-semibold text-xs tracking-wider">
                      {certificateData.batchNumber}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <span className="font-mono text-[10px] uppercase text-neutral-400">Guardian / Owner:</span>
                    <p className="text-white font-serif-luxury italic text-sm">
                      {formData.fullName}
                    </p>
                  </div>
                  <div>
                    <span className="font-mono text-[10px] uppercase text-neutral-400">Compounded On:</span>
                    <p className="text-white font-mono text-xs">
                      {certificateData.compoundDate}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 text-[11px] text-neutral-400 leading-relaxed font-light">
                  Hand-filled at Domaine de Saint-Germain, Grasse. Certified containing wild Assam agarwood, 6-year aged Florentine orris butter, and 24K gold suspended leaf.
                </div>

                <div className="pt-2 flex items-center justify-between font-serif-luxury italic text-xs text-[#d4af37]">
                  <span>Signé par Éléonore de Saint-Germain, Le Nez</span>
                  <span className="font-mono text-[10px] uppercase not-italic text-neutral-500">
                    Seal #8849-PARIS
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <button
                id="close-final-checkout-btn"
                onClick={onClose}
                className="w-full sm:w-auto px-8 py-3 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-500 to-amber-300 text-black font-cinzel text-xs font-bold uppercase tracking-widest hover:opacity-95 transition-all cursor-pointer shadow-[0_0_20px_rgba(168,85,247,0.4)]"
              >
                Return to Haute Maison
              </button>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
