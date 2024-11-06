import { ShoppingCart, Search, Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { state, dispatch } = useCart();

  const cartItemsCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-gray-900">
              LUXE
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              <Link to="/shop" className="text-gray-900 hover:text-gray-600 transition-colors">
                Shop
              </Link>
              <Link to="/collections" className="text-gray-900 hover:text-gray-600 transition-colors">
                Collections
              </Link>
              <Link to="/about" className="text-gray-900 hover:text-gray-600 transition-colors">
                About
              </Link>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <button className="p-2 hover:bg-gray-100 rounded-full transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button 
              onClick={() => dispatch({ type: 'TOGGLE_CART' })}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors relative"
            >
              <ShoppingCart className="w-5 h-5" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {cartItemsCount}
                </span>
              )}
            </button>
            <button 
              className="md:hidden p-2 hover:bg-gray-100 rounded-full transition-colors"
              onClick={() => setIsOpen(!isOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <motion.div 
        className="md:hidden"
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={{
          open: { height: 'auto', opacity: 1 },
          closed: { height: 0, opacity: 0 }
        }}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white">
          <Link 
            to="/shop" 
            className="block px-3 py-2 text-gray-900 hover:bg-gray-100 rounded-md"
            onClick={() => setIsOpen(false)}
          >
            Shop
          </Link>
          <Link 
            to="/collections" 
            className="block px-3 py-2 text-gray-900 hover:bg-gray-100 rounded-md"
            onClick={() => setIsOpen(false)}
          >
            Collections
          </Link>
          <Link 
            to="/about" 
            className="block px-3 py-2 text-gray-900 hover:bg-gray-100 rounded-md"
            onClick={() => setIsOpen(false)}
          >
            About
          </Link>
        </div>
      </motion.div>
    </nav>
  );
}