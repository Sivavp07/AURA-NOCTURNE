import { FragranceVariation, ScentNote, VideoContinuityFrame, BentoStoryItem, ScentFinderQuestion } from '../types';

export const FRAGRANCE_VARIATIONS: FragranceVariation[] = [
  {
    id: 'extrait-50',
    name: 'Extrait de Parfum',
    frenchTitle: "L'Essence Pure",
    subtitle: 'Pure Oil Concentration (38%)',
    volume: '50 ml / 1.7 FL. OZ.',
    volumeMl: 50,
    concentration: 'Extrait de Parfum — 38% Pure Macerated Essences',
    price: 380,
    edition: 'Permanent Grand Classic',
    vessel: 'Hand-blown faceted obsidian-tinted crystal flacon with magnetic gold stopper',
    description: 'An intimate, highly concentrated revelation. Crafted for skin contact, blooming continuously for 16 hours with whisper-soft sillage and deep sensual warmth.',
    accentColor: '#D4AF37',
    liquidColor: '#c59b27',
    inStock: true,
    stockCount: 24,
    perks: [
      'Numbered certificate of compounding',
      'Two complimentary 2ml extrait travel ampoules',
      'Complimentary courier delivery in satin coffret',
      'Optional gold script monogram engraving'
    ]
  },
  {
    id: 'millesime-100',
    name: 'Flacon Millésime',
    frenchTitle: 'Cuvée Royale 2026',
    subtitle: 'High Sillage Formulation (42%)',
    volume: '100 ml / 3.4 FL. OZ.',
    volumeMl: 100,
    concentration: 'Millésime Extrait — 42% Pure Aged Essential Oils',
    price: 680,
    originalPrice: 750,
    edition: 'Numbered Vintage — 1,200 Bottles Worldwide',
    vessel: 'Sculpted crystal flacon featuring 24-karat gold guilloché collar and solid brass cap',
    description: 'Our flagship presentation. Features an extended 18-month oak cask maceration that elevates the smoky Assam oud and Florentine orris butter to operatic depth.',
    accentColor: '#E5C378',
    liquidColor: '#d4af37',
    inStock: true,
    stockCount: 14,
    perks: [
      'Hand-engraved serial number on base',
      'Three complimentary 2ml extrait travel vials',
      'Lacquered grand coffret with velvet lining & wax seal',
      'Bespoke laser-etched bottle personalization included'
    ]
  },
  {
    id: 'crystal-flacon-250',
    name: 'Amphore Baccarat',
    frenchTitle: 'Édition Or 24K',
    subtitle: 'Haute Joaillerie Masterpiece (45%)',
    volume: '250 ml / 8.4 FL. OZ.',
    volumeMl: 250,
    concentration: 'Grand Extrait Impérial — 45% Concentration with 24K Gold Flakes',
    price: 2400,
    edition: 'Limited Artisanal Run — 150 Masterpiece Pieces',
    vessel: 'Mouth-blown Baccarat crystal amphora suspended with suspended 24K gold leaf',
    description: 'A collector magnum crafted by master crystal artisans in Nancy, France. Includes a hand-ground crystal wand for ceremonial pulse-point application and a travel atomiseur.',
    accentColor: '#F3E5AB',
    liquidColor: '#e0b83b',
    inStock: true,
    stockCount: 5,
    perks: [
      'Solid bronze travel atomizer with leather sheath',
      'Lifetime flacon refill privileges at our Grasse & Paris Salons',
      'Personal letter and olfactory formula breakdown signed by Le Nez',
      'White-glove armored courier concierge delivery included'
    ]
  },
  {
    id: 'bespoke-coffret-500',
    name: 'Malle Haute Parfumerie',
    frenchTitle: 'Alambic Privé & Malle Cuir',
    subtitle: 'The Ultimate Collector Trunk (500ml)',
    volume: '500 ml / 16.9 FL. OZ.',
    volumeMl: 500,
    concentration: 'Bespoke Private Reserve — Uncut 48% Distillate',
    price: 4800,
    edition: 'By Appointment Only — 25 Hand-crafted Trunks',
    vessel: 'Handcrafted French calfskin trunk containing custom crystal decanter, pipette, and gold funnel',
    description: 'The pinnacle of bespoke luxury. A private trunk housing the complete olfactory pyramid as individual raw isolate extracts alongside the master flacon for bespoke personal blending.',
    accentColor: '#FFD700',
    liquidColor: '#e6a117',
    inStock: true,
    stockCount: 2,
    perks: [
      'Private 90-minute digital consultation with Master Perfumer Éléonore de Saint-Germain',
      'Set of 6 isolated raw absolute essences (5ml each) for custom layering',
      'Custom hand-tooled leather trunk with brass lock and key',
      'Complimentary lifetime bespoke annual reformulation'
    ]
  }
];

export const SCENT_NOTES: ScentNote[] = [
  // TOP NOTES
  {
    id: 'bergamote-calabre',
    name: 'Calabrian Bergamot',
    frenchName: 'Bergamote Sauvage de Calabre',
    tier: 'top',
    provenance: 'Reggio Calabria, Southern Italy',
    coordinates: '38.1144° N, 15.6508° E',
    description: 'Cold-pressed early morning rinds yield a radiant, sun-drenched citrus brightness with sparkling floral nuance and crisp mineral clarity.',
    sensoryProfile: 'Effervescent, sparkling golden citrus with delicate green tea facets and bitter aristocratic elegance.',
    molecularCharacter: 'Linalyl acetate, Limonene, Bergamottin',
    volatility: 'Ultra Rapid (0-30 min)',
    colorHex: '#E2C768',
    intensity: 85,
    harvestMethod: 'Manual hand-peeling and cold sfumatura extraction within 4 hours of picking.',
    dominantVariations: ['extrait-50', 'millesime-100', 'crystal-flacon-250', 'bespoke-coffret-500'],
    pricingVariationNotes: [
      { variationId: 'extrait-50', emphasis: 'Crisp initial ignition over warm skin', concentrationImpact: 'Top accord: 18% of formula', price: 380 },
      { variationId: 'millesime-100', emphasis: 'Extended effervescence via distilled sfumatura', concentrationImpact: 'Top accord: 22% of formula', price: 680 },
      { variationId: 'crystal-flacon-250', emphasis: 'Vintage 2024 harvested reserve extraction', concentrationImpact: 'Top accord: 25% of formula', price: 2400 }
    ]
  },
  {
    id: 'safran-ispahan',
    name: "Ispahan Red Saffron",
    frenchName: "Safran Pourpre d'Ispahan",
    tier: 'top',
    provenance: 'Khorasan Plateau, Ancient Silk Road',
    coordinates: '32.6546° N, 51.6680° E',
    description: 'Harvested exclusively by hand before sunrise; only the triple crimson stigmas are dried over almond embers to produce a leathery, golden spicy vibration.',
    sensoryProfile: 'Warm metallic leather, bittersweet golden filaments, hay-like intimacy and radiant regal prestige.',
    molecularCharacter: 'Safranal, Crocin, Picrocrocin',
    volatility: 'Ultra Rapid (0-30 min)',
    colorHex: '#C94A29',
    intensity: 90,
    harvestMethod: '200,000 crocus flowers hand-plucked to produce 1 kilogram of pure red stigma thread.',
    dominantVariations: ['millesime-100', 'crystal-flacon-250', 'bespoke-coffret-500'],
    pricingVariationNotes: [
      { variationId: 'millesime-100', emphasis: 'Bridges top citrus into spicy heart rose', concentrationImpact: 'Top accent: 8% of formula', price: 680 },
      { variationId: 'crystal-flacon-250', emphasis: 'Triple concentrated absolute aged 24 months', concentrationImpact: 'Top accent: 12% of formula', price: 2400 },
      { variationId: 'bespoke-coffret-500', emphasis: 'Pure isolate vial included in trunk', concentrationImpact: 'Pure extract reserve', price: 4800 }
    ]
  },
  {
    id: 'baie-rose',
    name: 'Madagascar Pink Peppercorn',
    frenchName: 'Baies Roses de Bourbon',
    tier: 'top',
    provenance: 'Anosy Region, Madagascar',
    coordinates: '25.0388° S, 46.9984° E',
    description: 'CO2-extracted pink berry clusters offering an airy, tingling spice that lifts the dense heart notes with crystalline kinetic energy.',
    sensoryProfile: 'Aromatic, fruity-peppery sparkle with pine undertones and translucent rose petals.',
    molecularCharacter: 'Alpha-pinene, Myrcene, Phellandrene',
    volatility: 'Ultra Rapid (0-30 min)',
    colorHex: '#D3756B',
    intensity: 78,
    harvestMethod: 'Supercritical supercritical CO2 extraction at cold ambient pressures.',
    dominantVariations: ['extrait-50', 'millesime-100'],
    pricingVariationNotes: [
      { variationId: 'extrait-50', emphasis: 'Immediate energetic opening lift', concentrationImpact: 'Opening spark: 6% of formula', price: 380 },
      { variationId: 'millesime-100', emphasis: 'Blended with Persian saffron accord', concentrationImpact: 'Opening spark: 9% of formula', price: 680 }
    ]
  },

  // HEART NOTES
  {
    id: 'rose-taif',
    name: 'Imperial Taif Rose',
    frenchName: 'Rose de Taif Centifolia',
    tier: 'heart',
    provenance: 'Sarawat Mountain Terraces, 2,000m Altitude',
    coordinates: '21.2854° N, 40.4244° E',
    description: 'Revered for two millennia. Grown on crisp misted mountain terraces, this 30-petaled rose exudes intoxicating jammy nectar balanced with cool morning ozone.',
    sensoryProfile: 'Opulent honeyed damascenone, dewy crystalline petals, deep crimson velvet and tea-rose elegance.',
    molecularCharacter: 'Beta-damascenone, Citronellol, Geraniol',
    volatility: 'Tenacious Core (2-6 hrs)',
    colorHex: '#B23A5B',
    intensity: 95,
    harvestMethod: 'Hand-harvested at 4:30 AM before sunrise evaporates the delicate volatile essential dew.',
    dominantVariations: ['extrait-50', 'millesime-100', 'crystal-flacon-250', 'bespoke-coffret-500'],
    pricingVariationNotes: [
      { variationId: 'extrait-50', emphasis: 'Heart note focal anchor (15% heart)', concentrationImpact: 'Core bouquet centerpiece', price: 380 },
      { variationId: 'millesime-100', emphasis: 'Double steam distilled in wood-fired alembics', concentrationImpact: 'Core bouquet centerpiece (22%)', price: 680 },
      { variationId: 'crystal-flacon-250', emphasis: 'Private single-estate harvest grand cru', concentrationImpact: 'Core bouquet centerpiece (30%)', price: 2400 }
    ]
  },
  {
    id: 'jasmin-grasse',
    name: 'Grasse Night Jasmine',
    frenchName: 'Jasmin Grandiflorum de Grasse',
    tier: 'heart',
    provenance: 'Domaine de Manon, Grasse, France',
    coordinates: '43.6602° N, 6.9265° E',
    description: 'The crowning jewel of French haute parfumerie. Scented only as the sun dips below the Provençal horizon, releasing warm indolic fruit and porcelain creaminess.',
    sensoryProfile: 'Luminous solar floral, hypnotic sensual indole, banana-skin cream and warm skin intimacy.',
    molecularCharacter: 'Benzyl acetate, Jasmone, Methyl jasmonate',
    volatility: 'Tenacious Core (2-6 hrs)',
    colorHex: '#EAE1B8',
    intensity: 92,
    harvestMethod: 'Traditional enfleurage on wooden chassis lined with purified plant oils over 72 hours.',
    dominantVariations: ['millesime-100', 'crystal-flacon-250', 'bespoke-coffret-500'],
    pricingVariationNotes: [
      { variationId: 'millesime-100', emphasis: 'Adds luminous white floral radiance', concentrationImpact: 'Heart absolute: 10%', price: 680 },
      { variationId: 'crystal-flacon-250', emphasis: 'Exclusive organic Grasse estate reserve', concentrationImpact: 'Heart absolute: 18%', price: 2400 }
    ]
  },
  {
    id: 'encens-oman',
    name: 'Royal Hojari Frankincense',
    frenchName: "Larmes d'Encens Royal d'Oman",
    tier: 'heart',
    provenance: 'Dhofar Wadis, Sultanate of Oman',
    coordinates: '17.0151° N, 54.0924° E',
    description: 'Crystalline green resin tears gathered from wild Boswellia sacra trees clinging to dry desert limestone cliffs. Smokes with divine citrus and mineral transcendence.',
    sensoryProfile: 'Pristine citrus-pine resin smoke, sacred sanctuary air, ancient parchment and silver embers.',
    molecularCharacter: 'Incensole acetate, Alpha-boswellic acid',
    volatility: 'Tenacious Core (2-6 hrs)',
    colorHex: '#8DA695',
    intensity: 86,
    harvestMethod: 'Sustainable knife-incisions carved only during the sacred waxing moon cycle.',
    dominantVariations: ['extrait-50', 'millesime-100', 'crystal-flacon-250'],
    pricingVariationNotes: [
      { variationId: 'extrait-50', emphasis: 'Adds spiritual verticality and mystery', concentrationImpact: 'Smoky transition accord: 8%', price: 380 },
      { variationId: 'millesime-100', emphasis: 'Infused with Assam oud for sacred smoke', concentrationImpact: 'Smoky transition accord: 14%', price: 680 }
    ]
  },

  // BASE NOTES
  {
    id: 'oud-assam',
    name: '35-Year Aged Assam Oud',
    frenchName: "Oud Royal Sauvage d'Assam",
    tier: 'base',
    provenance: 'Brahmaputra Rainforest Valley, India',
    coordinates: '26.2006° N, 92.9376° E',
    description: 'The black diamond of perfumery. Wild heartwood infected by natural fungi over 35 winters produces an unfathomable depth of dark amber, balsamic smoke, and antique library wood.',
    sensoryProfile: 'Hypnotic dark resin, velvet leather, molasses, damp earth, noble smoldering wood and eternal longevity.',
    molecularCharacter: 'Agarospirol, Jinkoh-eremol, Valerianol',
    volatility: 'Substantive Base (8-24+ hrs)',
    colorHex: '#3D2517',
    intensity: 100,
    harvestMethod: 'Aged in darkened glass carboys underground for 12 years prior to compounding.',
    dominantVariations: ['extrait-50', 'millesime-100', 'crystal-flacon-250', 'bespoke-coffret-500'],
    pricingVariationNotes: [
      { variationId: 'extrait-50', emphasis: 'Base foundation imparting 16h skin longevity', concentrationImpact: 'Base foundation: 20%', price: 380 },
      { variationId: 'millesime-100', emphasis: 'Uncut wild heartwood aged 35 years', concentrationImpact: 'Base foundation: 30%', price: 680 },
      { variationId: 'crystal-flacon-250', emphasis: 'Master reserve with natural suspended gold leaf', concentrationImpact: 'Base foundation: 35%', price: 2400 },
      { variationId: 'bespoke-coffret-500', emphasis: 'Includes 10ml pure uncut oil extract', concentrationImpact: 'Base foundation: 40%', price: 4800 }
    ]
  },
  {
    id: 'iris-pallida',
    name: 'Florentine Iris Pallida Butter',
    frenchName: "Beurre d'Iris Pallida de Florence",
    tier: 'base',
    provenance: 'Chianti Hills, Tuscany, Italy',
    coordinates: '43.5855° N, 11.3126° E',
    description: 'Valued higher by weight than pure platinum. The rhizomes are aged in dry cellars for 6 full years before hydro-distillation yields the fabled powdery, violet-tinted butter.',
    sensoryProfile: 'Aristocratic suede, powdery violet mist, cold marble statues, gossamer silk and timeless refinement.',
    molecularCharacter: 'Alpha-irone, Beta-irone, Gamma-irone',
    volatility: 'Substantive Base (8-24+ hrs)',
    colorHex: '#8C829E',
    intensity: 94,
    harvestMethod: '6 years rhizome desiccation followed by 14-day continuous slow low-temperature distillation.',
    dominantVariations: ['millesime-100', 'crystal-flacon-250', 'bespoke-coffret-500'],
    pricingVariationNotes: [
      { variationId: 'millesime-100', emphasis: 'Softens the oud into supple royal suede', concentrationImpact: 'Base heart: 12%', price: 680 },
      { variationId: 'crystal-flacon-250', emphasis: 'Ultra-rare 15% irones concentration extract', concentrationImpact: 'Base heart: 20%', price: 2400 }
    ]
  },
  {
    id: 'ambre-gris',
    name: 'Floating Atlantic Ambergris',
    frenchName: 'Ambre Gris Flotté Impérial',
    tier: 'base',
    provenance: 'North Atlantic Ocean Reefs',
    coordinates: '28.2916° N, 16.6291° W',
    description: 'Naturally ocean-cured for decades under the sun and salt brine. Imparts a three-dimensional golden warmth that fuses seamlessly with human skin chemistry.',
    sensoryProfile: 'Warm oceanic breeze, radiant sun-warmed skin, tobacco-leaf sweetness and velvet animalic aura.',
    molecularCharacter: 'Ambrein, Ambroxide, Epi-ambrocenol',
    volatility: 'Substantive Base (8-24+ hrs)',
    colorHex: '#BF8A49',
    intensity: 96,
    harvestMethod: 'Found naturally washed ashore on remote beaches; certified ethically collected.',
    dominantVariations: ['extrait-50', 'millesime-100', 'crystal-flacon-250', 'bespoke-coffret-500'],
    pricingVariationNotes: [
      { variationId: 'extrait-50', emphasis: 'Creates signature intimate trail on skin', concentrationImpact: 'Skin fixative: 10%', price: 380 },
      { variationId: 'millesime-100', emphasis: 'High tinctured white ambergris float', concentrationImpact: 'Skin fixative: 16%', price: 680 },
      { variationId: 'crystal-flacon-250', emphasis: 'Centuries-old fossilized tincture', concentrationImpact: 'Skin fixative: 22%', price: 2400 }
    ]
  }
];

export const VIDEO_CONTINUITY_FRAMES: VideoContinuityFrame[] = [
  {
    id: 1,
    timecode: '00:00:04:12',
    sceneNumber: 'SCENE 01 / REEL I',
    title: 'L’Aube à Grasse',
    frenchTitle: 'The Dawn Awakening in Grasse',
    narrative: 'Mist clings to the terraced hills of Provence as pickers gather fragile jasmine and centifolia petals before the golden rays of the morning sun evaporate the precious dew.',
    focalElement: 'Night-blooming Jasmine petals coated in crystalline dew droplets',
    shotType: 'Extreme Macro • Panavision 65mm Anamorphic • 120fps',
    directorNote: 'Keep light soft and diffused; emphasize the tactile fragility of the petals and the cool violet morning atmosphere.',
    imageUrl: 'https://images.unsplash.com/photo-1518895949257-7621c3c786d7?auto=format&fit=crop&w=1600&q=85',
    soundCue: 'Distant chapel bells across valley, whispering wind through olive leaves'
  },
  {
    id: 2,
    timecode: '00:00:18:24',
    sceneNumber: 'SCENE 02 / REEL II',
    title: 'L’Alambic de Cuivre',
    frenchTitle: 'The Alchemy of Copper Distillation',
    narrative: 'Inside the historic stone atelier, handmade copper alembics hiss softly. Low-temperature steam carries the volatile soul of wild resins upward into spiral glass condensing columns.',
    focalElement: 'Golden drops of pure essential nectar coalescing on cold crystal spirals',
    shotType: 'Slow Tracking Shot • 50mm T1.3 Prime • Warm Amber Rim Light',
    directorNote: 'Contrast deep obsidian shadows of the cellar with glowing molten copper and golden liquid reflections.',
    imageUrl: 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?auto=format&fit=crop&w=1600&q=85',
    soundCue: 'Gentle bubbling water, crackle of fire, single resonant drop falling into glass'
  },
  {
    id: 3,
    timecode: '00:00:34:06',
    sceneNumber: 'SCENE 03 / REEL III',
    title: 'La Taille du Cristal',
    frenchTitle: 'The Sculpting of Baccarat Crystal',
    narrative: 'A master glassblower in Nancy gathers molten silica at 1,400°C. With rhythmic breath and wooden paddles, the heavy geometric flacon takes shape, beveled like an emerald cut.',
    focalElement: 'Hand-ground crystal facets reflecting prism spectra against dark velvet',
    shotType: 'High-speed High-contrast • 85mm Macro • Prismatic Flare',
    directorNote: 'Highlight geometric precision; the flacon must feel like an architectural relic excavated from another century.',
    imageUrl: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&w=1600&q=85',
    soundCue: 'Acoustic crystal hum, high-pitch harmonic ring of polished glass'
  },
  {
    id: 4,
    timecode: '00:00:48:19',
    sceneNumber: 'SCENE 04 / REEL IV',
    title: 'L’Infusion d’Or 24K',
    frenchTitle: 'The 24K Gold Suspension',
    narrative: 'The aged Assam oud elixir is blended with genuine 24-karat gold leaf flakes. Under candlelight, the suspended golden constellation swirls in perpetual slow-motion suspension.',
    focalElement: 'Gold leaf flakes dancing inside dense amber distillate',
    shotType: 'Floating Gimbal • Slow Shutter Stream • Deep Amber Depth',
    directorNote: 'The liquid must feel heavy, viscous, and hypnotic—invoking ancient sacred potions.',
    imageUrl: 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?auto=format&fit=crop&w=1600&q=85',
    soundCue: 'Low sub-bass drone, delicate chiming of gold particles in fluid'
  },
  {
    id: 5,
    timecode: '00:01:02:15',
    sceneNumber: 'SCENE 05 / REEL V',
    title: 'Le Sceau Impérial',
    frenchTitle: 'The Imperial Wax Seal & Coronation',
    narrative: 'The flacon is crowned with its brass guilloché stopper and bound with gold thread. A brass signet strikes hot crimson sealing wax, sealing the vintage in time forever.',
    focalElement: 'Brass seal pressing embossed monogram crest into steaming wax',
    shotType: 'Top-down Tableaux • 35mm Vintage Anamorphic • Candlelight',
    directorNote: 'Final resolution: the finished masterpiece standing serene in the darkness, ready to meet its guardian.',
    imageUrl: 'https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1600&q=85',
    soundCue: 'Crisp snap of wax cooling, soft satin ribbon tying, resonant breath'
  }
];

export const BENTO_STORY_ITEMS: BentoStoryItem[] = [
  {
    id: 'craft-crystal',
    category: 'Haute Verrerie',
    title: 'Hand-Cut 32-Facet Flacon',
    subtitle: 'Nancy, Lorraine Atelier',
    description: 'Each vessel weighs 680 grams of dense lead crystal. Hand-beveled and cold-polished over 36 hours to achieve acoustic resonance and optical diamond brilliance.',
    statNumber: '680g',
    statLabel: 'Solid Crystal Weight',
    detailPoints: ['Mouth-blown at 1,400°C', 'Beveled diamond facets', 'Hermetic ground-glass stopper'],
    imageUrl: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'sillage-radar',
    category: 'Performance Olfactive',
    title: 'Sillage & Longevity Architecture',
    subtitle: 'Laboratory Extraction Metrics',
    description: 'Engineered with a high-density resin base that anchors volatile top chords to the skin, creating an unbroken 18-hour olfactory signature with room-filling presence.',
    statNumber: '18+ hrs',
    statLabel: 'Epidermal Persistence',
    detailPoints: ['Sillage Radius: 3.2 Meters', 'Substantive Retention: 98.4%', 'Concentration: 38% - 45%']
  },
  {
    id: 'master-perfumer',
    category: 'Le Nez Créateur',
    title: 'Éléonore de Saint-Germain',
    subtitle: 'Third Generation Master Parfumeur',
    description: '“A perfume must not merely scent the room; it must establish an emotional sovereignty. AURA NOCTURNE is the manifestation of midnight memories, royal woods, and eternal longing.”',
    statNumber: '32 Yrs',
    statLabel: 'Olfactory Craftsmanship',
    detailPoints: ['Chevalier des Arts et des Lettres', 'Trained in Grasse & Kyoto', 'Private perfumer to dynasties'],
    imageUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'rare-harvest',
    category: 'Ethique & Rareté',
    title: 'The 400:1 Botanical Ratio',
    subtitle: 'Extreme Extraction Economics',
    description: 'It requires four hundred kilograms of hand-plucked Taif rose petals and six years of cured Florentine orris root to yield a single deciliter of our concentrated nectar.',
    statNumber: '400 kg',
    statLabel: 'Petals per Deciliter',
    detailPoints: ['100% fair-trade mountain cooperatives', 'Zero synthetic fixatives', 'Wild harvest certified']
  },
  {
    id: 'acoustic-flacon',
    category: 'Harmonique',
    title: '432 Hz Flacon Resonance',
    subtitle: 'Acoustic Sound of Crystal',
    description: 'When tapped gently with our golden applicator wand, the crystal flacon sings at precisely 432 Hz—the harmonic frequency traditionally associated with peace and universal resonance.',
    statNumber: '432 Hz',
    statLabel: 'Tuned Resonant Tone',
    detailPoints: ['Verre sonore quality standard', 'Pitch tuned by acoustic artisan', 'Natural healing vibration']
  },
  {
    id: 'atelier-monogram',
    category: 'Sur Mesure',
    title: 'Custom Guilloché Monogramming',
    subtitle: 'Personalized Royal Heritage',
    description: 'Our Parisian jewelers engrave your initials or family crest directly into the 24k gold collar plate using hand-turned 19th-century rose engine lathes.',
    statNumber: '1 of 1',
    statLabel: 'Individual Numbering',
    detailPoints: ['Roman serif or Royal script', 'Bespoke wax seal cipher', 'Preserved in archive ledger']
  }
];

export const COMPLIMENTARY_SAMPLES = [
  { id: 's-oud-rose', name: 'Oud & Rose Damascena', concentration: 'Extrait 2ml', family: 'Woody Floral' },
  { id: 's-ambre-blanc', name: 'Ambre Blanc & Encens', concentration: 'Extrait 2ml', family: 'Solar Oriental' },
  { id: 's-iris-cuir', name: 'Iris Suede & Vetiver', concentration: 'Extrait 2ml', family: 'Powdery Leather' },
  { id: 's-bergamote-pure', name: 'Bergamote Sauvage & Tea', concentration: 'Extrait 2ml', family: 'Citrus Aromatic' }
];

export const SCENT_FINDER_QUESTIONS: ScentFinderQuestion[] = [
  {
    id: 1,
    question: 'What aura do you wish to project when stepping into a room?',
    subtitle: 'Choose the emotional frequency you inhabit naturally.',
    options: [
      {
        id: 'sovereign',
        label: 'Sovereign & Commanding',
        desc: 'Magnetic authority, heavy silks, ancient woods, and unforgettable presence.',
        icon: 'Crown',
        affinity: { tierAffinity: 'base', primaryVariationId: 'crystal-flacon-250', tags: ['oud', 'leather', 'regal'] }
      },
      {
        id: 'sensual',
        label: 'Intimate & Nocturnal',
        desc: 'Warm candlelit skin, whisper-soft sillage, velvet shadows, and stolen gazes.',
        icon: 'Moon',
        affinity: { tierAffinity: 'heart', primaryVariationId: 'extrait-50', tags: ['rose', 'ambergris', 'sensual'] }
      },
      {
        id: 'radiant',
        label: 'Luminous & Aristocratic',
        desc: 'Crisp morning air over private estates, sun-drenched terrace cocktails, refined charm.',
        icon: 'Sun',
        affinity: { tierAffinity: 'top', primaryVariationId: 'millesime-100', tags: ['bergamot', 'saffron', 'clarity'] }
      },
      {
        id: 'mystic',
        label: 'Sacred & Enigmatic',
        desc: 'Ancient temple smoke, contemplative silence, aged manuscripts, and transcendental calm.',
        icon: 'Flame',
        affinity: { tierAffinity: 'heart', primaryVariationId: 'bespoke-coffret-500', tags: ['frankincense', 'iris', 'rare'] }
      }
    ]
  },
  {
    id: 2,
    question: 'Which sensory landscape calls most deeply to your memory?',
    subtitle: 'Your olfactory memory dictates your true signature accord.',
    options: [
      {
        id: 'grasse-gardens',
        label: 'Midnight Gardens in Provence',
        desc: 'Dew-drenched white jasmine, velvety roses, and damp Mediterranean earth.',
        icon: 'Flower2',
        affinity: { tierAffinity: 'heart', primaryVariationId: 'extrait-50', tags: ['floral', 'nectar'] }
      },
      {
        id: 'ancient-bazaar',
        label: 'Silk Road Spice Vaults',
        desc: 'Crushed crimson saffron threads, cedar chests, raw ambergris, and sweet resin.',
        icon: 'Sparkles',
        affinity: { tierAffinity: 'top', primaryVariationId: 'millesime-100', tags: ['spice', 'warmth'] }
      },
      {
        id: 'sacred-forest',
        label: 'Highland Assam Rainforest',
        desc: 'Smoldering wild agarwood, mossy stone roots, petrichor, and deep dark honey.',
        icon: 'Trees',
        affinity: { tierAffinity: 'base', primaryVariationId: 'crystal-flacon-250', tags: ['deep-wood', 'earth'] }
      },
      {
        id: 'private-salon',
        label: 'Florentine Suede Library',
        desc: 'Old vellum pages, soft powdery iris butter, beeswax, and polished walnut.',
        icon: 'BookOpen',
        affinity: { tierAffinity: 'base', primaryVariationId: 'bespoke-coffret-500', tags: ['suede', 'iris'] }
      }
    ]
  },
  {
    id: 3,
    question: 'How do you prefer your fragrance to evolve throughout the hours?',
    subtitle: 'Select your preferred sillage and projection philosophy.',
    options: [
      {
        id: 'operatic',
        label: 'Grand Sillage (Rooms Remember You)',
        desc: 'Radiates 3+ meters; leaves an intoxicating trail that lingers for hours after you depart.',
        icon: 'Radio',
        affinity: { tierAffinity: 'base', primaryVariationId: 'millesime-100', tags: ['bold', 'sillage'] }
      },
      {
        id: 'skin-touch',
        label: 'Close Skin Whisper (Only for Those You Embrace)',
        desc: 'Intimate and warm; revealed only in close proximity with pure oil tenacity.',
        icon: 'Feather',
        affinity: { tierAffinity: 'top', primaryVariationId: 'extrait-50', tags: ['intimate', 'concentrated'] }
      },
      {
        id: 'chameleon',
        label: 'Metamorphic Symphony (Constantly Shifting)',
        desc: 'Starts crisp and citrus, blooms into lush floral heart, dries into dark smoky oud.',
        icon: 'Compass',
        affinity: { tierAffinity: 'heart', primaryVariationId: 'crystal-flacon-250', tags: ['complex', 'evolving'] }
      }
    ]
  }
];
