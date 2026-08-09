import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import type { ObjectItem, Category, Availability, AccessLevel } from '../types';
import { Edit, Lock } from 'lucide-react';

export const AdminPage: React.FC = () => {
  const { 
    objects, 
    addObject, 
    updateObject, 
    currentMember, 
    setCurrentMember, 
    orders, 
    setCurrentRoute 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'objects' | 'members' | 'orders'>('objects');
  const [editingObject, setEditingObject] = useState<ObjectItem | null>(null);

  const [newObj, setNewObj] = useState<Partial<ObjectItem>>({
    objectNumber: `OBJECT 00${objects.length + 1}`,
    name: '',
    subtitle: '',
    category: 'CARRY',
    price: 250000,
    priceFormatted: '₹2,50,000',
    availability: 'AVAILABLE',
    edition: 'EDITION I',
    editionTotal: 100,
    remainingCount: 50,
    realityPercentage: 95,
    heroImageReal: '/assets/carry_real.png',
    heroImageUnreal: '/assets/carry_unreal.png',
    xrayDetails: ['FRENCH LEATHER', 'CHROME HARDWARE'],
    materials: [{ name: 'Leather', detail: 'Calfskin' }],
    rotationImages: ['/assets/carry_real.png'],
    description: ''
  });

  const handleSaveObject = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingObject) {
      updateObject(editingObject);
      setEditingObject(null);
    } else if (newObj.name) {
      const createdObj: ObjectItem = {
        id: `obj-${Date.now()}`,
        objectNumber: newObj.objectNumber || 'OBJECT 009',
        name: newObj.name,
        subtitle: newObj.subtitle || '',
        category: (newObj.category as Category) || 'CARRY',
        price: newObj.price || 200000,
        priceFormatted: `₹${(newObj.price || 200000).toLocaleString('en-IN')}`,
        availability: (newObj.availability as Availability) || 'AVAILABLE',
        edition: newObj.edition || 'EDITION I',
        editionTotal: newObj.editionTotal || 100,
        remainingCount: newObj.remainingCount || 50,
        realityPercentage: newObj.realityPercentage || 95,
        heroImageReal: newObj.heroImageReal || '/assets/carry_real.png',
        heroImageUnreal: newObj.heroImageUnreal || '/assets/carry_unreal.png',
        xrayDetails: newObj.xrayDetails || ['HAND-FINISHED ATELIER SPEC'],
        materials: newObj.materials || [{ name: 'Core', detail: 'Luxury Spec' }],
        rotationImages: [newObj.heroImageReal || '/assets/carry_real.png'],
        description: newObj.description || 'Atelier creation.'
      };
      addObject(createdObj);
      setNewObj({
        objectNumber: `OBJECT 00${objects.length + 2}`,
        name: '',
        subtitle: '',
        category: 'CARRY',
        price: 250000,
        availability: 'AVAILABLE',
        description: ''
      });
    }
  };

  return (
    <div className="bg-[#080808] text-[#F2F0EA] min-h-screen pt-32 pb-24 px-6 md:px-12 font-mono">
      <div className="container-editorial space-y-12">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/10 pb-8 gap-4">
          <div>
            <div className="flex items-center gap-2 text-emerald-400 text-xs tracking-widest uppercase mb-1">
              <Lock className="w-4 h-4" />
              <span>ATELIER MANAGEMENT SYSTEM</span>
            </div>
            <h1 className="font-serif text-4xl md:text-6xl text-white font-light">ADMIN CMS PORTAL</h1>
          </div>
          <button onClick={() => setCurrentRoute('home')} className="btn-outline text-xs">
            EXIT ADMIN MODE →
          </button>
        </div>

        <div className="flex flex-wrap gap-4 text-xs tracking-widest border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab('objects')}
            className={`pb-2 px-4 ${activeTab === 'objects' ? 'text-white border-b-2 border-white' : 'text-neutral-500'}`}
          >
            OBJECTS & INVENTORY ({objects.length})
          </button>
          <button
            onClick={() => setActiveTab('members')}
            className={`pb-2 px-4 ${activeTab === 'members' ? 'text-white border-b-2 border-white' : 'text-neutral-500'}`}
          >
            MEMBER ACCESS LEVELS
          </button>
          <button
            onClick={() => setActiveTab('orders')}
            className={`pb-2 px-4 ${activeTab === 'orders' ? 'text-white border-b-2 border-white' : 'text-neutral-500'}`}
          >
            ORDERS & LOGISTICS ({orders.length})
          </button>
        </div>

        {activeTab === 'objects' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 animate-emergent">
            <div className="lg:col-span-5 bg-[#0c0c0c] border border-white/10 p-6 space-y-4">
              <h3 className="font-serif text-2xl text-white font-light">
                {editingObject ? 'EDIT OBJECT' : 'CREATE NEW OBJECT'}
              </h3>

              <form onSubmit={handleSaveObject} className="space-y-4 text-xs">
                <div>
                  <label className="text-neutral-400 block mb-1">OBJECT NUMBER</label>
                  <input
                    type="text"
                    required
                    value={editingObject ? editingObject.objectNumber : newObj.objectNumber || ''}
                    onChange={(e) =>
                      editingObject
                        ? setEditingObject({ ...editingObject, objectNumber: e.target.value })
                        : setNewObj({ ...newObj, objectNumber: e.target.value })
                    }
                    className="w-full bg-neutral-900 border border-white/20 p-2 text-white"
                  />
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">NAME</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. THE 01"
                    value={editingObject ? editingObject.name : newObj.name || ''}
                    onChange={(e) =>
                      editingObject
                        ? setEditingObject({ ...editingObject, name: e.target.value })
                        : setNewObj({ ...newObj, name: e.target.value })
                    }
                    className="w-full bg-neutral-900 border border-white/20 p-2 text-white"
                  />
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">CATEGORY</label>
                  <select
                    value={editingObject ? editingObject.category : newObj.category || 'CARRY'}
                    onChange={(e) =>
                      editingObject
                        ? setEditingObject({ ...editingObject, category: e.target.value as Category })
                        : setNewObj({ ...newObj, category: e.target.value as Category })
                    }
                    className="w-full bg-neutral-900 border border-white/20 p-2 text-white"
                  >
                    <option value="CARRY">CARRY</option>
                    <option value="VISION">VISION</option>
                    <option value="TIME">TIME</option>
                    <option value="SCENT">SCENT</option>
                  </select>
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">AVAILABILITY STATUS</label>
                  <select
                    value={editingObject ? editingObject.availability : newObj.availability || 'AVAILABLE'}
                    onChange={(e) =>
                      editingObject
                        ? setEditingObject({ ...editingObject, availability: e.target.value as Availability })
                        : setNewObj({ ...newObj, availability: e.target.value as Availability })
                    }
                    className="w-full bg-neutral-900 border border-white/20 p-2 text-white"
                  >
                    <option value="AVAILABLE">AVAILABLE</option>
                    <option value="ALMOST GONE">ALMOST GONE</option>
                    <option value="GONE">GONE</option>
                    <option value="NOT YET REAL">NOT YET REAL</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-neutral-400 block mb-1">PRICE (INR)</label>
                    <input
                      type="number"
                      required
                      value={editingObject ? editingObject.price : newObj.price || 200000}
                      onChange={(e) =>
                        editingObject
                          ? setEditingObject({ ...editingObject, price: Number(e.target.value) })
                          : setNewObj({ ...newObj, price: Number(e.target.value) })
                      }
                      className="w-full bg-neutral-900 border border-white/20 p-2 text-white"
                    />
                  </div>
                  <div>
                    <label className="text-neutral-400 block mb-1">EDITION COUNT</label>
                    <input
                      type="number"
                      required
                      value={editingObject ? editingObject.editionTotal : newObj.editionTotal || 100}
                      onChange={(e) =>
                        editingObject
                          ? setEditingObject({ ...editingObject, editionTotal: Number(e.target.value) })
                          : setNewObj({ ...newObj, editionTotal: Number(e.target.value) })
                      }
                      className="w-full bg-neutral-900 border border-white/20 p-2 text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-neutral-400 block mb-1">DESCRIPTION</label>
                  <textarea
                    rows={3}
                    value={editingObject ? editingObject.description : newObj.description || ''}
                    onChange={(e) =>
                      editingObject
                        ? setEditingObject({ ...editingObject, description: e.target.value })
                        : setNewObj({ ...newObj, description: e.target.value })
                    }
                    className="w-full bg-neutral-900 border border-white/20 p-2 text-white"
                  />
                </div>

                <button type="submit" className="btn-primary w-full py-3 justify-center">
                  <span>{editingObject ? 'UPDATE OBJECT' : 'CREATE OBJECT'}</span>
                </button>
              </form>
            </div>

            <div className="lg:col-span-7 space-y-4">
              <h3 className="font-serif text-2xl text-white font-light">ACTIVE OBJECT CATALOGUE</h3>
              <div className="space-y-3">
                {objects.map((obj) => (
                  <div
                    key={obj.id}
                    className="bg-[#0c0c0c] border border-white/10 p-4 flex items-center justify-between hover:border-white/30"
                  >
                    <div>
                      <span className="text-neutral-500 text-[0.65rem] block">{obj.objectNumber} / {obj.category}</span>
                      <h4 className="font-serif text-lg text-white">{obj.name}</h4>
                      <span className="text-neutral-400 text-xs">{obj.priceFormatted} &nbsp;|&nbsp; STATUS: {obj.availability}</span>
                    </div>

                    <button
                      onClick={() => setEditingObject(obj)}
                      className="p-2 border border-white/20 hover:border-white text-white"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'members' && currentMember && (
          <div className="space-y-6 bg-[#0c0c0c] border border-white/10 p-8 animate-emergent">
            <h3 className="font-serif text-2xl text-white font-light">CLUB MEMBER ACCESS DIRECTORY</h3>
            <div className="space-y-4 font-mono text-xs">
              <div className="flex justify-between items-center border-b border-white/10 pb-4">
                <div>
                  <span className="text-white font-bold block">{currentMember.name} ({currentMember.memberId})</span>
                  <span className="text-neutral-400">{currentMember.email}</span>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-emerald-400 font-bold">{currentMember.accessLevel}</span>
                  <select
                    value={currentMember.accessLevel}
                    onChange={(e) =>
                      setCurrentMember({ ...currentMember, accessLevel: e.target.value as AccessLevel })
                    }
                    className="bg-neutral-900 border border-white/20 p-2 text-white"
                  >
                    <option value="ACCESS 01">ACCESS 01</option>
                    <option value="ACCESS 02">ACCESS 02</option>
                    <option value="ACCESS 03">ACCESS 03 (INVITATION ONLY)</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'orders' && (
          <div className="space-y-4 font-mono text-xs animate-emergent">
            {orders.map((ord) => (
              <div key={ord.id} className="bg-[#0c0c0c] border border-white/10 p-6 space-y-2">
                <div className="flex justify-between text-white">
                  <span className="font-bold">ORDER #{ord.orderNumber}</span>
                  <span className="text-emerald-400">{ord.status}</span>
                </div>
                <div className="text-neutral-400">
                  MEMBER: {ord.memberId} | DATE: {ord.date} | TOTAL: ₹{ord.total.toLocaleString('en-IN')}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
