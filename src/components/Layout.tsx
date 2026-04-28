import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, Package, Boxes } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const location = useLocation();
  const [cursorPos, setCursorPos] = React.useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = React.useState(false);

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/products', label: 'Products', icon: Package },
  ];

  return (
    <div className="min-h-screen relative font-sans text-apple-dark overflow-x-hidden">
      {/* Custom Cursor Follower */}
      <div 
        id="cursor-follower"
        style={{ 
          transform: `translate(${cursorPos.x - 10}px, ${cursorPos.y - 10}px) scale(${isHovering ? 2.5 : 1})`,
          opacity: cursorPos.x === 0 ? 0 : 1
        }}
      />

      {/* Background Image */}
      <div 
        className="fixed inset-0 z-[-1] bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-out"
        style={{ 
          backgroundImage: `url('/ui/background.webp')`,
          filter: 'brightness(0.95) contrast(1.05)',
          transform: `scale(1.05) translate(${(cursorPos.x / window.innerWidth - 0.5) * 10}px, ${(cursorPos.y / window.innerHeight - 0.5) * 10}px)`
        }}
      />
      
      {/* Sidebar / Navigation */}
      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
        <div className="glass px-4 py-2 rounded-full flex items-center gap-2 shadow-2xl border-white/40">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-500 hover:scale-105 active:scale-95 ${
                location.pathname === item.path
                  ? 'bg-apple-blue text-white shadow-lg'
                  : 'hover:bg-white/50 text-apple-dark/70'
              }`}
            >
              <item.icon size={18} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          ))}
        </div>
      </nav>

      <main className="max-w-6xl mx-auto pt-12 pb-32 px-6">
        <header className="mb-12 flex items-center gap-4 animate-in fade-in slide-in-from-top-4 duration-1000 ease-out">
          <div 
            className="w-12 h-12 bg-apple-blue rounded-xl flex items-center justify-center text-white shadow-xl hover:rotate-12 transition-transform duration-300"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
          >
            <Boxes size={28} />
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight">StockMaster</h1>
            <p className="text-apple-dark/50 font-medium">Inventory Management</p>
          </div>
        </header>
        
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 ease-out">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
