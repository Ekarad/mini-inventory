import React, { useState } from 'react';
import { useInventory } from '../hooks/useInventory';
import { Plus, Minus, Trash2, Search, PackagePlus } from 'lucide-react';

const Products: React.FC = () => {
  const { products, addProduct, updateQuantity, deleteProduct } = useInventory();
  const [searchTerm, setSearchTerm] = useState('');
  
  // Form state
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newQty, setNewQty] = useState('');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName || !newPrice || !newQty) return;
    
    addProduct(newName, Number(newPrice), Number(newQty));
    setNewName('');
    setNewPrice('');
    setNewQty('');
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      {/* Search & Add Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add Product Form */}
        <div className="glass p-8 rounded-3xl apple-card border-white/50 h-fit">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-apple-blue/10 text-apple-blue rounded-xl flex items-center justify-center">
              <PackagePlus size={22} />
            </div>
            <h2 className="text-xl font-bold">Add New Product</h2>
          </div>
          
          <form onSubmit={handleAdd} className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-apple-dark/60 mb-1.5 ml-1">Product Name</label>
              <input
                type="text"
                placeholder="iPhone 15 Pro"
                className="w-full bg-white/50 border border-white/30 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-apple-blue/20 transition-all"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-apple-dark/60 mb-1.5 ml-1">Price ($)</label>
                <input
                  type="number"
                  placeholder="999"
                  className="w-full bg-white/50 border border-white/30 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-apple-blue/20 transition-all"
                  value={newPrice}
                  onChange={(e) => setNewPrice(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-apple-dark/60 mb-1.5 ml-1">Initial Qty</label>
                <input
                  type="number"
                  placeholder="10"
                  className="w-full bg-white/50 border border-white/30 rounded-2xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-apple-blue/20 transition-all"
                  value={newQty}
                  onChange={(e) => setNewQty(e.target.value)}
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-apple-blue text-white font-bold py-4 rounded-2xl shadow-lg shadow-apple-blue/20 hover:scale-[1.02] active:scale-[0.98] transition-all mt-4 hover:shadow-apple-blue/40"
            >
              Add Product
            </button>
          </form>
        </div>

        {/* Product List Section */}
        <div className="lg:col-span-2 space-y-6">
          {/* Search Bar */}
          <div className="glass px-6 py-4 rounded-3xl apple-card border-white/50 flex items-center gap-4 group focus-within:shadow-lg transition-shadow">
            <Search className="text-apple-dark/30 group-focus-within:text-apple-blue transition-colors" size={20} />
            <input
              type="text"
              placeholder="Search products by name..."
              className="bg-transparent w-full focus:outline-none font-medium placeholder:text-apple-dark/20"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredProducts.length === 0 ? (
              <div className="sm:col-span-2 glass p-12 text-center rounded-3xl border-white/50 animate-in fade-in zoom-in duration-500">
                <p className="text-apple-dark/40 font-medium italic">No products found.</p>
              </div>
            ) : (
              filteredProducts.map((p, idx) => (
                <div
                  key={p.id}
                  className={`glass p-6 rounded-3xl apple-card border-white/50 relative overflow-hidden group/card ${
                    p.quantity === 0 ? 'bg-red-50/70 border-red-200' : ''
                  }`}
                  style={{ animationDelay: `${idx * 50}ms` }}
                >
                  {p.quantity === 0 && (
                    <div className="absolute top-4 right-4 bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shadow-sm animate-pulse">
                      Out of Stock
                    </div>
                  )}
                  
                  <h3 className="text-lg font-bold mb-1 truncate pr-16 group-hover/card:text-apple-blue transition-colors">{p.name}</h3>
                  <p className="text-2xl font-bold text-apple-blue mb-6 transition-transform group-hover/card:scale-110 origin-left">${p.price.toLocaleString()}</p>
                  
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center bg-white/40 rounded-2xl p-1 gap-2 border border-white/20 shadow-sm transition-transform group-hover/card:translate-x-1">
                      <button
                        onClick={() => updateQuantity(p.id, -1)}
                        className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-white transition-all active:scale-75"
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-8 text-center font-bold">{p.quantity}</span>
                      <button
                        onClick={() => updateQuantity(p.id, 1)}
                        className="w-8 h-8 rounded-xl flex items-center justify-center hover:bg-white transition-all active:scale-75"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="w-10 h-10 rounded-2xl flex items-center justify-center text-red-500 hover:bg-red-500 hover:text-white transition-all duration-500 active:scale-75 hover:rotate-12"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
