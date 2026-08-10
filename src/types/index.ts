export type Category = 'CARRY' | 'VISION' | 'TIME' | 'SCENT';

export type Availability = 'AVAILABLE' | 'ALMOST GONE' | 'GONE' | 'NOT YET REAL';

export type AccessLevel = 'ACCESS 01' | 'ACCESS 02' | 'ACCESS 03';

export interface ObjectItem {
  id: string;
  objectNumber: string; // e.g. "OBJECT 001"
  name: string; // e.g. "THE 01"
  subtitle: string;
  category: Category;
  price: number;
  priceFormatted: string;
  availability: Availability;
  edition: string;
  editionTotal: number;
  remainingCount: number;
  realityPercentage: number;
  heroImageReal: string;
  heroImageUnreal: string;
  xrayDetails: string[];
  materials: { name: string; detail: string }[];
  explodedLayers?: { name: string; description: string }[];
  scentArchitecture?: {
    top: string[];
    heart: string[];
    base: string[];
  };
  rotationImages: string[];
  description: string;
  isPrivate?: boolean;
  releaseDate?: string;
}

export interface Edition {
  id: string;
  number: string;
  title: string;
  year: string;
  description: string;
  coverImage: string;
  objectIds: string[];
}

export interface Passport {
  passportId: string;
  objectId: string;
  objectName: string;
  objectNumber: string;
  category: Category;
  edition: string;
  serialNumber: string;
  createdDate: string;
  verificationStatus: 'VERIFIED' | 'PENDING';
  ownerId: string;
  careInstructions: string[];
  ownershipHistory: { date: string; owner: string; action: string }[];
}

export interface ClubMember {
  id: string;
  memberId: string;
  name: string;
  email: string;
  accessLevel: AccessLevel;
  memberSince: string;
  ownedObjects: string[];
  savedObjects: string[];
  privateAccessCode?: string;
}

export interface BagItem {
  object: ObjectItem;
  quantity: number;
  selectedVariant?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  date: string;
  items: BagItem[];
  subtotal: number;
  total: number;
  shippingAddress: {
    fullName: string;
    addressLine: string;
    city: string;
    country: string;
    postalCode: string;
  };
  status: 'ACQUIRED' | 'IN TRANSIT' | 'DELIVERED';
  memberId: string;
  passportsIssued: Passport[];
}

export type NavigationPage = 
  | 'home' 
  | 'new-reality' 
  | 'objects' 
  | 'gallery'
  | 'product-detail' 
  | 'perfume-experience' 
  | 'archive' 
  | 'club' 
  | 'private-room' 
  | 'campaign' 
  | 'checkout' 
  | 'admin';
