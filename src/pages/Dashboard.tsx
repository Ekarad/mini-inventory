import React from 'react';
import { useInventory } from '../hooks/useInventory';
import { ShoppingBag, DollarSign, AlertCircle } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { products } = useInventory();

  const totalTypes = products.length;
  const totalValue = products.reduce((acc, p) => acc + (p.price * p.quantity), 0);
  const outOfStock = products.filter(p => p.quantity === 0).length;

  const stats = [
    {
      label: 'Total Products',
      value: totalTypes,
      icon: ShoppingBag,
      color: 'text-blue-500',
      bg: 'bg-blue-50',
    },
    {
      label: 'Total Stock Value',
      value: `$${totalValue.toLocaleString()}`,
      icon: DollarSign,
      color: 'text-green-500',
      bg: 'bg-green-50',
    },
    {
      label: 'Out of Stock',
      value: outOfStock,
      icon: AlertCircle,
      color: 'text-red-500',
      bg: 'bg-red-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat, i) => (
        <div 
          key={i} 
          className="glass p-8 rounded-3xl apple-card border-white/50 backdrop-blur-xl group cursor-default"
          style={{ animationDelay: `${i * 100}ms` }}
        >
          <div className={`${stat.bg} ${stat.color} w-12 h-12 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-500 group-hover:scale-110 group-hover:rotate-6`}>
            <stat.icon size={24} />
          </div>
          <p className="text-apple-dark/60 font-semibold uppercase tracking-wider text-xs mb-1">
            {stat.label}
          </p>
          <h2 className="text-4xl font-bold tracking-tight">
            {stat.value}
          </h2>
        </div>
      ))}
      
      {/* Visual placeholder for recent activity or charts */}
      <div className="md:col-span-3 glass p-8 rounded-3xl apple-card mt-6 border-white/50 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300 fill-mode-both">
        <h3 className="text-xl font-bold mb-6">Inventory Overview</h3>
        {products.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-apple-dark/40 font-medium italic">No products added yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {products.slice(0, 5).map((p, idx) => (
              <div 
                key={p.id} 
                className="flex items-center justify-between p-4 rounded-2xl bg-white/30 border border-white/20 transition-all duration-300 hover:bg-white/50 hover:pl-6 group cursor-default"
                style={{ animationDelay: `${idx * 50}ms` }}
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm font-bold text-apple-blue transition-transform group-hover:rotate-12">
                    {p.name[0].toUpperCase()}
                  </div>
                  <div>
                    <p className="font-bold group-hover:text-apple-blue transition-colors">{p.name}</p>
                    <p className="text-sm text-apple-dark/40">Qty: {p.quantity}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-apple-blue group-hover:scale-110 transition-transform">${(p.price * p.quantity).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
