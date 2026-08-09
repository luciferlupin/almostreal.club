import type { ObjectItem, Edition, ClubMember, Passport, Order } from '../types';

export const INITIAL_OBJECTS: ObjectItem[] = [
  {
    id: 'obj-001',
    objectNumber: 'OBJECT 001',
    name: 'THE 01',
    subtitle: 'SOMETHING FAMILIAR. SOMETHING ISN’T.',
    category: 'CARRY',
    price: 245000,
    priceFormatted: '₹2,45,000',
    availability: 'ALMOST GONE',
    edition: 'EDITION I',
    editionTotal: 250,
    remainingCount: 8,
    realityPercentage: 96,
    heroImageReal: '/assets/carry_real.png',
    heroImageUnreal: '/assets/carry_unreal.png',
    xrayDetails: [
      'FULL-GRAIN FRENCH CALFSKIN',
      'SOLID 316L POLISHED CHROME HARDWARE',
      'HAND-STITCHED WAXED THREAD',
      'EDITION OF 250 / PIECE #087',
      'INTEGRATED ENCRYPTED AUTHENTICATION MICROCHIP'
    ],
    materials: [
      { name: 'Leather', detail: 'Single-source full-grain calfskin leather, hand-dyed in obsidian black.' },
      { name: 'Hardware', detail: 'Solid stainless steel with mirror-polished liquid chrome plating.' },
      { name: 'Lining', detail: 'Ultra-dense Japanese technical faille silk lining with interior passport pocket.' },
      { name: 'Closure', detail: 'Custom architectural spring-loaded lock system tested to 50,000 cycles.' }
    ],
    explodedLayers: [
      { name: '01 / Top Handle & Strap Mounts', description: 'Double-reinforced core bound in saddle-stitched leather with chrome D-rings.' },
      { name: '02 / Outer Shell Architecture', description: 'Structured paneling with heat-embossed subtle ALMOSTREAL® insignia.' },
      { name: '03 / Internal Steel Chassis', description: 'Ultra-lightweight titanium internal spine maintaining permanent silhouette.' },
      { name: '04 / Lock Mechanism & Hardware', description: 'Precision-milled chrome lock assembly with micro-laser etched serial number.' }
    ],
    rotationImages: [
      '/assets/carry_real.png',
      '/assets/carry_unreal.png',
      '/assets/carry_real.png'
    ],
    description: 'THE 01 is an exploration of architectural form and utility. Sculpted from single-origin French calfskin with polished chrome hardware, it stands on the threshold of traditional leather craft and modern sculpture.'
  },
  {
    id: 'obj-002',
    objectNumber: 'OBJECT 002',
    name: '11:59',
    subtitle: 'TIME IS REAL. PROBABLY.',
    category: 'TIME',
    price: 680000,
    priceFormatted: '₹6,80,000',
    availability: 'AVAILABLE',
    edition: 'EDITION I',
    editionTotal: 100,
    remainingCount: 23,
    realityPercentage: 94,
    heroImageReal: '/assets/time_real.png',
    heroImageUnreal: '/assets/time_real.png',
    xrayDetails: [
      'GRADE 5 TITANIUM & BRUSHED STEEL CASE',
      'SKELETONIZED AUTOMATIC CHRONOMETER MOVEMENT',
      'DOUBLE-CURVED SAPPHIRE CRYSTAL WITH ANTI-REFLECTIVE COATING',
      'EDITION OF 100 / PIECE #019',
      'WATER RESISTANCE: 10 ATM (100 METERS)'
    ],
    materials: [
      { name: 'Case', detail: 'Grade 5 aerospace titanium case with micro-blasted matte obsidian finish.' },
      { name: 'Movement', detail: 'In-house skeletonized automatic caliber with 72-hour power reserve.' },
      { name: 'Crystal', detail: 'Scratch-proof double-arched sapphire crystal with dual AR coating.' },
      { name: 'Strap', detail: 'Alligator leather strap bonded with waterproof vulcanized rubber.' }
    ],
    explodedLayers: [
      { name: '01 / Anti-Reflective Crystal Glass', description: 'Synthetic sapphire crystal with 99.8% optical clarity.' },
      { name: '02 / Skeletonized Dial Assembly', description: 'Multi-tiered obsidian dial with hand-applied luminescent markers.' },
      { name: '03 / Automatic Caliber Movement', description: '28,800 vibrations per hour (4Hz) with custom black ruthenium rotor.' },
      { name: '04 / Titanium Monobloc Case', description: 'Monobloc case with integrated strap quick-release system.' }
    ],
    rotationImages: [
      '/assets/time_real.png',
      '/assets/time_real.png'
    ],
    description: '11:59 pauses seconds before transition. A skeletonized timepiece crafted from aerospace grade 5 titanium and anti-reflective sapphire, capturing the temporal illusion of ownership.'
  },
  {
    id: 'obj-003',
    objectNumber: 'OBJECT 003',
    name: 'BLIND',
    subtitle: 'REALITY DEPENDS ON HOW YOU LOOK AT IT.',
    category: 'VISION',
    price: 112000,
    priceFormatted: '₹1,12,000',
    availability: 'AVAILABLE',
    edition: 'EDITION I',
    editionTotal: 300,
    remainingCount: 142,
    realityPercentage: 91,
    heroImageReal: '/assets/vision_real.png',
    heroImageUnreal: '/assets/vision_real.png',
    xrayDetails: [
      'JAPANESE TITANIUM FRAME ARCHITECTURE',
      'CUSTOM PHOTOCHROMIC GLASS LENSES',
      'LASER-ENGRAVED SERIAL NUMBER ON TEMPLE ARM',
      'EDITION OF 300 / PIECE #142'
    ],
    materials: [
      { name: 'Frame', detail: 'Hand-crafted Japanese beta-titanium with satin obsidian coating.' },
      { name: 'Lenses', detail: 'Cat 3 dark grey lenses with 100% UV400 protection and internal AR coating.' },
      { name: 'Hinges', detail: 'Patented screwless 7-barrel hinges designed for lifetime durability.' }
    ],
    explodedLayers: [
      { name: '01 / Lens Optics', description: 'Precision glass optics with anti-glare hydrophobic coating.' },
      { name: '02 / Front Chassis Frame', description: 'Beta-titanium monobloc front structure weighing only 14 grams.' },
      { name: '03 / Chrome Hinges & Temple Arms', description: 'Flexible titanium temples with laser-engraved serial authentication.' }
    ],
    rotationImages: [
      '/assets/vision_real.png',
      '/assets/vision_real.png'
    ],
    description: 'BLIND shields perception from external noise. Hand-crafted Japanese titanium eyewear with dark photochromic optics engineered for discreet global travel.'
  },
  {
    id: 'obj-004',
    objectNumber: 'OBJECT 004',
    name: 'OBSIDIAN SPICE',
    subtitle: 'AN INVISIBLE ILLUSION.',
    category: 'SCENT',
    price: 48000,
    priceFormatted: '₹48,000',
    availability: 'AVAILABLE',
    edition: 'EDITION I',
    editionTotal: 500,
    remainingCount: 289,
    realityPercentage: 88,
    heroImageReal: '/assets/scent_real.png',
    heroImageUnreal: '/assets/scent_real.png',
    xrayDetails: [
      'EXTRAIT DE PARFUM (32% CONCENTRATION)',
      'HAND-BLOWN FLINT GLASS VESSEL WITH HEAVY OBSIDIAN CAP',
      'STEEPED FOR 180 DAYS IN GRASSE, FRANCE',
      'EDITION OF 500 / BOTTLE #289'
    ],
    materials: [
      { name: 'Top Notes', detail: 'Smoked Black Pepper, Saffron, Raw Bergamot.' },
      { name: 'Heart Notes', detail: 'Florentine Dark Iris, Leather Accord, Birch Tar.' },
      { name: 'Base Notes', detail: 'Black Amber, Bourbon Vetiver, Smoked Cedarwood.' }
    ],
    scentArchitecture: {
      top: ['Smoked Black Pepper', 'Saffron', 'Raw Bergamot'],
      heart: ['Florentine Dark Iris', 'Leather Accord', 'Birch Tar'],
      base: ['Black Amber', 'Bourbon Vetiver', 'Smoked Cedarwood']
    },
    explodedLayers: [
      { name: '01 / Obsidian Stone Cap', description: 'Carved natural obsidian stone cap with magnetic precision seal.' },
      { name: '02 / Atomizer Mechanism', description: 'High-dispersion chrome mist atomizer emitting fine 20-micron olfactory droplets.' },
      { name: '03 / Hand-Blown Glass Vessel', description: '50ml thick-walled French flint glass bottle imbued with dark metallic gradient.' }
    ],
    rotationImages: [
      '/assets/scent_real.png',
      '/assets/scent_real.png'
    ],
    description: 'OBSIDIAN SPICE is olfactory architecture. Concentrated at 32% Extrait de Parfum, it unfolds layers of dark iris, leather accord, and smoked cedarwood into an indelible aura.'
  },
  {
    id: 'obj-005',
    objectNumber: 'OBJECT 005',
    name: 'SATCHEL 02',
    subtitle: 'STRUCTURED OBSIDIAN GRAIN.',
    category: 'CARRY',
    price: 195000,
    priceFormatted: '₹1,95,000',
    availability: 'AVAILABLE',
    edition: 'EDITION I',
    editionTotal: 200,
    remainingCount: 42,
    realityPercentage: 95,
    heroImageReal: '/assets/carry_002_real.png',
    heroImageUnreal: '/assets/carry_002_real.png',
    xrayDetails: [
      'FULL-GRAIN EMBOSSED CALFSKIN',
      'HEAVYWEIGHT SOLID CHROME LINK CHAIN STRAP',
      'ATELIER HAND-BURNISHED EDGES',
      'EDITION OF 200 / PIECE #042'
    ],
    materials: [
      { name: 'Leather', detail: 'Embossed pebbled calfskin with scratch-resistant water-repellent finish.' },
      { name: 'Hardware', detail: 'Interlocking solid chrome Cuban chain with dual swivel snap hooks.' },
      { name: 'Interior', detail: 'Divided main chamber with velvet suede lining and zipped coin compartment.' }
    ],
    explodedLayers: [
      { name: '01 / Chrome Chain Hardware', description: 'Heavyweight solid chrome link chain with custom lobster clasps.' },
      { name: '02 / Front Flap & Lock', description: 'Turn-key chrome lock mechanism engraved with ALMOSTREAL® insignia.' },
      { name: '03 / Calfskin Body Structure', description: 'Reinforced leather gussets engineered to hold permanent geometric shape.' }
    ],
    rotationImages: ['/assets/carry_002_real.png'],
    description: 'SATCHEL 02 reimagines the classic flap bag with heavy solid chrome Cuban chain hardware and structured French pebbled calfskin.'
  },
  {
    id: 'obj-006',
    objectNumber: 'OBJECT 006',
    name: 'TITANIUM SHIELD',
    subtitle: 'DISCREET DISCERNMENT.',
    category: 'VISION',
    price: 145000,
    priceFormatted: '₹1,45,000',
    availability: 'AVAILABLE',
    edition: 'EDITION I',
    editionTotal: 150,
    remainingCount: 19,
    realityPercentage: 93,
    heroImageReal: '/assets/vision_002_real.png',
    heroImageUnreal: '/assets/vision_002_real.png',
    xrayDetails: [
      'SCULPTED JAPANESE BETA-TITANIUM TEMPLES',
      'PHOTOCHROMIC OBSIDIAN POLARIZED LENSES',
      'HAND-POLISHED CHROME TEMPLE INSERTS',
      'EDITION OF 150 / PIECE #019'
    ],
    materials: [
      { name: 'Frame', detail: 'Blackened beta-titanium front with silver flame-milled chrome temple accents.' },
      { name: 'Optics', detail: 'Polarized 9-layer glass lenses providing 100% UV protection and anti-scratch coating.' }
    ],
    explodedLayers: [
      { name: '01 / Polarized Lenses', description: '9-layer polarized glass filtering 99.9% of reflective glare.' },
      { name: '02 / Sculpted Titanium Arm', description: 'Fluid flame-sculpted temple arm crafted from solid Japanese titanium.' }
    ],
    rotationImages: ['/assets/vision_002_real.png'],
    description: 'TITANIUM SHIELD features sculpted silver chrome temple arms and photochromic lenses designed for high-contrast sunlight and nighttime glare.'
  },
  {
    id: 'obj-007',
    objectNumber: 'OBJECT 007',
    name: 'TOURBILLON 01',
    subtitle: 'MECHANICAL GRAVITY DEFIANCE.',
    category: 'TIME',
    price: 980000,
    priceFormatted: '₹9,80,000',
    availability: 'ALMOST GONE',
    edition: 'EDITION I',
    editionTotal: 50,
    remainingCount: 3,
    realityPercentage: 99,
    heroImageReal: '/assets/time_002_real.png',
    heroImageUnreal: '/assets/time_002_real.png',
    xrayDetails: [
      'SINGLE-AXIS FLYING TOURBILLON CAGE',
      'GRADE 5 TITANIUM CASE WITH BLACK RUTHENIUM COATING',
      'MANUAL WIND 108-HOUR POWER RESERVE',
      'EDITION OF 50 / PIECE #003'
    ],
    materials: [
      { name: 'Tourbillon', detail: 'Titanium flying tourbillon cage weighing less than 0.28 grams.' },
      { name: 'Case', detail: 'Grade 5 aerospace titanium case with micro-bead-blasted black ruthenium finish.' },
      { name: 'Strap', detail: 'Hand-stitched matte black Louisiana alligator strap.' }
    ],
    explodedLayers: [
      { name: '01 / Flying Tourbillon Cage', description: 'Revolves 360 degrees per minute to counteract gravitational force.' },
      { name: '02 / Skeletonized Ruthenium Plate', description: 'Hand-beveled titanium bridge plates with mirror-finished anglage.' }
    ],
    rotationImages: ['/assets/time_002_real.png'],
    description: 'TOURBILLON 01 represents the pinnacle of haute horlogerie. A flying tourbillon regulating organ floating inside a skeletonized titanium chassis.'
  },
  {
    id: 'obj-008',
    objectNumber: 'OBJECT 008',
    name: 'NOIR OBSIDIENNE',
    subtitle: 'DARK IRIS & SMOKED AMBER.',
    category: 'SCENT',
    price: 68000,
    priceFormatted: '₹68,000',
    availability: 'AVAILABLE',
    edition: 'EDITION I',
    editionTotal: 300,
    remainingCount: 112,
    realityPercentage: 90,
    heroImageReal: '/assets/scent_002_real.png',
    heroImageUnreal: '/assets/scent_002_real.png',
    xrayDetails: [
      'PARFUM CONCENTRATION (36%)',
      'HAND-HAMMERED SILVER CHROMED STOPPER',
      'HEAVY OBSIDIAN FLINT GLASS VESSEL',
      'EDITION OF 300 / BOTTLE #112'
    ],
    materials: [
      { name: 'Top Notes', detail: 'Pink Pepper, Cardamom, Black Violet.' },
      { name: 'Heart Notes', detail: 'Florentine Dark Iris Butter, Cashmere Wood, Smoked Resin.' },
      { name: 'Base Notes', detail: 'Black Amber, Madagascar Vanilla Bean, White Musk.' }
    ],
    scentArchitecture: {
      top: ['Pink Pepper', 'Cardamom', 'Black Violet'],
      heart: ['Florentine Dark Iris Butter', 'Cashmere Wood', 'Smoked Resin'],
      base: ['Black Amber', 'Madagascar Vanilla Bean', 'White Musk']
    },
    explodedLayers: [
      { name: '01 / Hand-Hammered Silver Cap', description: 'Solid silver stopper cap with hand-hammered artisan texture.' },
      { name: '02 / Dark Flint Glass Bottle', description: 'Flint glass bottle infused with dark amber mineral pigment.' }
    ],
    rotationImages: ['/assets/scent_002_real.png'],
    description: 'NOIR OBSIDIENNE is an intense parfum formulation built around rare Florentine dark iris butter, smoked amber, and hand-hammered silver craftsmanship.'
  }
];

export const INITIAL_EDITIONS: Edition[] = [
  {
    id: 'ed-001',
    number: 'EDITION 001',
    title: 'THE INITIAL ILLUSION',
    year: '2026',
    description: 'The first chapter of ALMOSTREAL CLUB. Four permanent object categories exploring the space between reality and illusion.',
    coverImage: '/assets/carry_real.png',
    objectIds: ['obj-001', 'obj-002', 'obj-003', 'obj-004', 'obj-005', 'obj-006', 'obj-007', 'obj-008']
  },
  {
    id: 'ed-002',
    number: 'EDITION 002',
    title: 'FALSE MEMORY',
    year: '2026',
    description: 'Objects designed to evoke nostalgia for places you have never visited and events that never took place.',
    coverImage: '/assets/vision_real.png',
    objectIds: []
  }
];

export const INITIAL_MEMBERS: ClubMember[] = [
  {
    id: 'mem-8809',
    memberId: 'CLUB-MEMBER-08809',
    name: 'ALEXANDER VON STEIN',
    email: 'alexander@almostreal.club',
    accessLevel: 'ACCESS 02',
    memberSince: 'OCTOBER 2026',
    ownedObjects: ['obj-001', 'obj-003'],
    savedObjects: ['obj-002', 'obj-005', 'obj-007']
  }
];

export const INITIAL_PASSPORTS: Passport[] = [
  {
    passportId: 'pass-001',
    objectId: 'obj-001',
    objectName: 'THE 01',
    objectNumber: 'OBJECT 001',
    category: 'CARRY',
    edition: 'EDITION I (#087 / 250)',
    serialNumber: 'AR-01-0087-2026',
    createdDate: 'OCTOBER 14, 2026',
    verificationStatus: 'VERIFIED',
    ownerId: 'mem-8809',
    careInstructions: [
      'Store in dry dark place inside micro-fiber dust pouch.',
      'Treat leather with natural beeswax balsam every 6 months.',
      'Avoid prolonged contact with solvent liquids or sharp edges.'
    ],
    ownershipHistory: [
      { date: 'OCTOBER 10, 2026', owner: 'Atelier AlmostReal (Paris)', action: 'Crafted & Authenticated' },
      { date: 'OCTOBER 14, 2026', owner: 'Alexander von Stein', action: 'Acquired (Pass #087)' }
    ]
  },
  {
    passportId: 'pass-002',
    objectId: 'obj-003',
    objectName: 'BLIND',
    objectNumber: 'OBJECT 003',
    category: 'VISION',
    edition: 'EDITION I (#142 / 300)',
    serialNumber: 'AR-03-0142-2026',
    createdDate: 'NOVEMBER 02, 2026',
    verificationStatus: 'VERIFIED',
    ownerId: 'mem-8809',
    careInstructions: [
      'Clean lenses only with provided ultra-microfiber optical cloth.',
      'Avoid high-temperature direct heat exposure in vehicles.',
      'Keep inside titanium hard case during transit.'
    ],
    ownershipHistory: [
      { date: 'OCTOBER 28, 2026', owner: 'Sabae Optics (Fukui, Japan)', action: 'Assembled & Calibrated' },
      { date: 'NOVEMBER 02, 2026', owner: 'Alexander von Stein', action: 'Acquired (Pass #142)' }
    ]
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ord-10087',
    orderNumber: 'AR-ORD-10087',
    date: 'OCTOBER 14, 2026',
    items: [
      {
        object: INITIAL_OBJECTS[0],
        quantity: 1
      }
    ],
    subtotal: 245000,
    total: 245000,
    shippingAddress: {
      fullName: 'Alexander von Stein',
      addressLine: '742 Executive Tower, Penthouse B',
      city: 'Mumbai',
      country: 'India',
      postalCode: '400051'
    },
    status: 'DELIVERED',
    memberId: 'mem-8809',
    passportsIssued: [INITIAL_PASSPORTS[0]]
  }
];

export const PRIVATE_ROOM_ITEMS = [
  {
    id: 'priv-001',
    code: 'PROTOTYPE X-01',
    percentage: 'NOT YET REAL',
    image: '/assets/vision_real.png',
    title: 'VOID HELMET 00',
    note: 'Classified sensory isolation prototype reserved for Access 03 members. Neural frequency dampening chassis.',
    status: 'DROP DATE: DECEMBER 2026'
  },
  {
    id: 'priv-002',
    code: 'PROTOTYPE X-02',
    percentage: 'NOT YET REAL',
    image: '/assets/carry_unreal.png',
    title: 'LIQUID CHROME MONOLITH',
    note: 'Variable geometry mercury leather vessel. Structural elasticity adapts to internal volume.',
    status: 'DROP DATE: JANUARY 2027'
  }
];
