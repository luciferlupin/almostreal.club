import React, { createContext, useContext, useState } from 'react';
import type { 
  ObjectItem, 
  BagItem, 
  ClubMember, 
  Passport, 
  Order, 
  NavigationPage 
} from '../types';
import { 
  INITIAL_OBJECTS, 
  INITIAL_MEMBERS, 
  INITIAL_PASSPORTS, 
  INITIAL_ORDERS 
} from '../data/mockData';

interface AppContextType {
  currentRoute: NavigationPage;
  setCurrentRoute: (route: NavigationPage) => void;
  selectedObjectId: string | null;
  setSelectedObjectId: (id: string | null) => void;
  objects: ObjectItem[];
  addObject: (newObj: ObjectItem) => void;
  updateObject: (updatedObj: ObjectItem) => void;
  bag: BagItem[];
  addToBag: (object: ObjectItem) => void;
  removeFromBag: (objectId: string) => void;
  updateBagQuantity: (objectId: string, delta: number) => void;
  clearBag: () => void;
  savedObjectIds: string[];
  toggleSaveObject: (objectId: string) => void;
  isBagOpen: boolean;
  setIsBagOpen: (open: boolean) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  realityStatus: string;
  setRealityStatus: (status: string) => void;
  currentMember: ClubMember | null;
  setCurrentMember: (member: ClubMember | null) => void;
  passports: Passport[];
  activePassportModal: Passport | null;
  setActivePassportModal: (p: Passport | null) => void;
  orders: Order[];
  placeOrder: (shippingInfo: any) => Order;
  isAdmin: boolean;
  setIsAdmin: (admin: boolean) => void;
  hasEnteredClub: boolean;
  setHasEnteredClub: (entered: boolean) => void;
  cursorLabel: string;
  setCursorLabel: (label: string) => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRouteState] = useState<NavigationPage>('home');
  const [selectedObjectId, setSelectedObjectId] = useState<string | null>('obj-001');
  const [objects, setObjects] = useState<ObjectItem[]>(INITIAL_OBJECTS);
  const [bag, setBag] = useState<BagItem[]>([]);
  const [savedObjectIds, setSavedObjectIds] = useState<string[]>(['obj-003', 'obj-004']);
  const [isBagOpen, setIsBagOpen] = useState<boolean>(false);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [realityStatus, setRealityStatus] = useState<string>('87% REAL');
  const [currentMember, setCurrentMember] = useState<ClubMember | null>(INITIAL_MEMBERS[0]);
  const [passports, setPassports] = useState<Passport[]>(INITIAL_PASSPORTS);
  const [activePassportModal, setActivePassportModal] = useState<Passport | null>(null);
  const [orders, setOrders] = useState<Order[]>(INITIAL_ORDERS);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [hasEnteredClub, setHasEnteredClub] = useState<boolean>(false);
  const [cursorLabel, setCursorLabel] = useState<string>('');

  const setCurrentRoute = (route: NavigationPage) => {
    setCurrentRouteState(route);
    window.scrollTo({ top: 0, behavior: 'smooth' });

    switch (route) {
      case 'home':
        setRealityStatus('87% REAL');
        break;
      case 'objects':
      case 'product-detail':
        setRealityStatus('96% REAL');
        break;
      case 'campaign':
        setRealityStatus('42% REAL');
        break;
      case 'archive':
        setRealityStatus('71% REAL');
        break;
      case 'private-room':
        setRealityStatus('??% REAL');
        break;
      case 'club':
        setRealityStatus('99% REAL');
        break;
      default:
        setRealityStatus('87% REAL');
    }
  };

  const addObject = (newObj: ObjectItem) => {
    setObjects((prev) => [newObj, ...prev]);
  };

  const updateObject = (updatedObj: ObjectItem) => {
    setObjects((prev) => prev.map((o) => (o.id === updatedObj.id ? updatedObj : o)));
  };

  const addToBag = (object: ObjectItem) => {
    setBag((prev) => {
      const existing = prev.find((item) => item.object.id === object.id);
      if (existing) {
        return prev.map((item) =>
          item.object.id === object.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { object, quantity: 1 }];
    });
    setIsBagOpen(true);
  };

  const removeFromBag = (objectId: string) => {
    setBag((prev) => prev.filter((item) => item.object.id !== objectId));
  };

  const updateBagQuantity = (objectId: string, delta: number) => {
    setBag((prev) =>
      prev
        .map((item) => {
          if (item.object.id === objectId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as BagItem[]
    );
  };

  const clearBag = () => setBag([]);

  const toggleSaveObject = (objectId: string) => {
    setSavedObjectIds((prev) =>
      prev.includes(objectId)
        ? prev.filter((id) => id !== objectId)
        : [...prev, objectId]
    );
  };

  const placeOrder = (shippingInfo: any): Order => {
    const subtotal = bag.reduce((acc, item) => acc + item.object.price * item.quantity, 0);
    
    const newPassports: Passport[] = bag.map((item) => ({
      passportId: `AR-${item.object.category.substring(0, 2)}-${Math.floor(1000 + Math.random() * 9000)}`,
      objectId: item.object.id,
      objectName: item.object.name,
      objectNumber: item.object.objectNumber,
      category: item.object.category,
      edition: item.object.edition,
      serialNumber: `${String(Math.floor(Math.random() * 50) + 1).padStart(3, '0')} / ${item.object.editionTotal}`,
      createdDate: new Date().toISOString().split('T')[0],
      verificationStatus: 'VERIFIED',
      ownerId: currentMember ? currentMember.memberId : 'MEMBER 00481',
      careInstructions: [
        'Keep stored in original dark obsidian climate box.',
        'Avoid exposure to direct corrosive elements.',
        'Verify digital chip at ALMOSTREAL Atelier.'
      ],
      ownershipHistory: [
        { date: new Date().toISOString().split('T')[0], owner: 'ALMOSTREAL CLUB ATELIER', action: 'CRAFTED & AUTHENTICATED' },
        { date: new Date().toISOString().split('T')[0], owner: currentMember ? currentMember.memberId : 'MEMBER 00481', action: 'ACQUIRED OBJECT' }
      ]
    }));

    const newOrder: Order = {
      id: `ord-${Date.now()}`,
      orderNumber: `ARC-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0],
      items: [...bag],
      subtotal,
      total: subtotal,
      shippingAddress: shippingInfo,
      status: 'ACQUIRED',
      memberId: currentMember ? currentMember.memberId : 'MEMBER 00481',
      passportsIssued: newPassports
    };

    setOrders((prev) => [newOrder, ...prev]);
    setPassports((prev) => [...newPassports, ...prev]);
    clearBag();

    if (currentMember) {
      const newOwnedIds = newPassports.map((p) => p.passportId);
      setCurrentMember({
        ...currentMember,
        ownedObjects: [...currentMember.ownedObjects, ...newOwnedIds]
      });
    }

    return newOrder;
  };

  return (
    <AppContext.Provider
      value={{
        currentRoute,
        setCurrentRoute,
        selectedObjectId,
        setSelectedObjectId,
        objects,
        addObject,
        updateObject,
        bag,
        addToBag,
        removeFromBag,
        updateBagQuantity,
        clearBag,
        savedObjectIds,
        toggleSaveObject,
        isBagOpen,
        setIsBagOpen,
        isSearchOpen,
        setIsSearchOpen,
        realityStatus,
        setRealityStatus,
        currentMember,
        setCurrentMember,
        passports,
        activePassportModal,
        setActivePassportModal,
        orders,
        placeOrder,
        isAdmin,
        setIsAdmin,
        hasEnteredClub,
        setHasEnteredClub,
        cursorLabel,
        setCursorLabel
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within AppProvider');
  return context;
};
