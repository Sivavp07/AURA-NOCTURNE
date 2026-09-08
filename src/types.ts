export type NoteTier = 'top' | 'heart' | 'base';

export interface FragranceVariation {
  id: string;
  name: string;
  frenchTitle: string;
  subtitle: string;
  volume: string;
  volumeMl: number;
  concentration: string;
  price: number;
  originalPrice?: number;
  edition: string;
  vessel: string;
  description: string;
  accentColor: string;
  liquidColor: string;
  inStock: boolean;
  stockCount: number;
  perks: string[];
}

export interface ScentNote {
  id: string;
  name: string;
  frenchName: string;
  tier: NoteTier;
  provenance: string;
  coordinates: string;
  description: string;
  sensoryProfile: string;
  molecularCharacter: string;
  volatility: 'Ultra Rapid (0-30 min)' | 'Tenacious Core (2-6 hrs)' | 'Substantive Base (8-24+ hrs)';
  colorHex: string;
  intensity: number; // 1-100
  harvestMethod: string;
  dominantVariations: string[]; // ids of variations
  pricingVariationNotes: {
    variationId: string;
    emphasis: string;
    concentrationImpact: string;
    price: number;
  }[];
}

export interface VideoContinuityFrame {
  id: number;
  timecode: string;
  sceneNumber: string;
  title: string;
  frenchTitle: string;
  narrative: string;
  focalElement: string;
  shotType: string;
  directorNote: string;
  imageUrl: string;
  soundCue: string;
}

export interface BentoStoryItem {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  description: string;
  statNumber?: string;
  statLabel?: string;
  detailPoints?: string[];
  imageUrl?: string;
}

export interface CartItem {
  id: string;
  variation: FragranceVariation;
  quantity: number;
  engravingText: string;
  engravingFont: 'roman' | 'script';
  giftPackaging: 'signature' | 'royal-velvet';
  waxSealColor: 'gold' | 'black-obsidian' | 'bordeaux';
  complimentarySamples: string[];
}

export interface ScentFinderQuestion {
  id: number;
  question: string;
  subtitle: string;
  options: {
    id: string;
    label: string;
    desc: string;
    icon: string;
    affinity: {
      tierAffinity: NoteTier;
      primaryVariationId: string;
      tags: string[];
    };
  }[];
}
