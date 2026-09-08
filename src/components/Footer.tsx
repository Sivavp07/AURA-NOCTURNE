import { useState, type FormEvent } from 'react';
import { Sparkles, Shield, Compass, Mail, ArrowRight, Check } from 'lucide-react';

export default function Footer() {
  const [subscribed, setSubscribed] = useState(false);
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setTimeout(() => {
      setEmail('');
      setSubscribed(false);
    }, 4000);
  };

  return (
    <footer className="bg-[#0b0318]/90 backdrop-blur-xl border-t border-purple-500/20 pt-16 pb-12 px-4 sm:px-6 lg:px-8 text-neutral-400">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-purple-500/15">
        {/* Col 1: Maison */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc]"></span>
            <span className="font-cinzel text-xl text-white font-semibold tracking-[0.2em]">
              AURA NOCTURNE
            </span>
          </div>
          <p className="font-serif-luxury italic text-xs text-purple-300">
            Maison Fondée à Grasse, 1842
          </p>
          <p className="text-xs leading-relaxed text-neutral-300 font-light">
            Distilling sacred wild botanicals, pure ambergris, and 35-year aged Assam oud into numbered crystal vessels for discerning patrons across the world.
          </p>
        </div>

        {/* Col 2: Salons & Ateliers */}
        <div className="space-y-3 text-xs">
          <h4 className="font-cinzel text-sm text-white uppercase tracking-wider font-medium">
            Salons & Private Ateliers
          </h4>
          <p className="text-neutral-300">
            <strong className="text-purple-200 block font-medium">Salon Paris Vendôme:</strong>
            14 Place Vendôme, 75001 Paris, France
          </p>
          <p className="text-neutral-300">
            <strong className="text-purple-200 block font-medium">Domaine des Roses de Grasse:</strong>
            Chemin des Parfums d'Or, 06130 Grasse, France
          </p>
          <p className="text-neutral-400 font-mono text-[11px] pt-1">
            Private consultations by appointment only.
          </p>
        </div>

        {/* Col 3: Concierge Services */}
        <div className="space-y-2.5 text-xs">
          <h4 className="font-cinzel text-sm text-white uppercase tracking-wider font-medium">
            Concierge Privilèges
          </h4>
          <ul className="space-y-2 text-neutral-300">
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-purple-400"></span>
              <span>Complimentary Armored Courier Delivery</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-purple-400"></span>
              <span>Hand-Engraved Guilloché Monogramming</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-purple-400"></span>
              <span>Lifetime Flacon Refills at Grasse Salon</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-purple-400"></span>
              <span>Personal Certificate of Authenticity Ledger</span>
            </li>
            <li className="flex items-center gap-2">
              <span className="w-1 h-1 rounded-full bg-purple-400"></span>
              <span>Private Olfactory Diagnostic with Le Nez</span>
            </li>
          </ul>
        </div>

        {/* Col 4: Private Gazette Invitation */}
        <div className="space-y-3">
          <h4 className="font-cinzel text-sm text-white uppercase tracking-wider font-medium">
            The Private Gazette
          </h4>
          <p className="text-xs text-neutral-300 leading-relaxed">
            Receive discreet invitations to limited private vintage barrel releases and rare harvest allocations.
          </p>
          {subscribed ? (
            <div className="flex items-center gap-2 p-3 rounded-xl bg-purple-900/40 border border-purple-400/40 text-xs text-purple-200">
              <Check className="w-4 h-4 text-purple-300" />
              <span>Registered to the Private Gazette ledger.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex rounded-xl overflow-hidden border border-purple-500/30 bg-[#16092d]/80 focus-within:border-purple-400">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                className="px-3.5 py-2.5 text-xs bg-transparent text-white focus:outline-none flex-1 font-mono placeholder:text-neutral-500"
              />
              <button
                type="submit"
                className="px-3.5 bg-gradient-to-r from-purple-600 to-fuchsia-500 text-white hover:opacity-90 transition-colors flex items-center justify-center cursor-pointer"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-neutral-400 gap-4">
        <div>
          © 2026 AURA NOCTURNE HAUTE PARFUMERIE. TOUS DROITS RÉSERVÉS.
        </div>
        <div className="flex items-center space-x-6 text-neutral-400">
          <span className="hover:text-purple-300 transition-colors cursor-pointer">Confidentiality</span>
          <span className="hover:text-purple-300 transition-colors cursor-pointer">Heritage Archives</span>
          <span className="hover:text-purple-300 transition-colors cursor-pointer">Certificate Verification</span>
        </div>
      </div>
    </footer>
  );
}
