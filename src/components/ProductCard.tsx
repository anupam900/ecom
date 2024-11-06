import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

interface Product {
  id: string;
  image: string;
  name: string;
  price: number;
  category: string;
}

export default function ProductCard({ id, image, name, price, category }: Product) {
  return (
    <Link to={`/product/${id}`}>
      <motion.div 
        className="group relative"
        whileHover={{ y: -5 }}
        transition={{ type: "tween" }}
      >
        <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg">
          <img
            src={image}
            alt={name}
            className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
          />
          <button 
            className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.preventDefault();
              // Handle wishlist logic here
            }}
          >
            <Heart className="w-5 h-5" />
          </button>
        </div>
        <div className="mt-4 flex justify-between">
          <div>
            <h3 className="text-sm text-gray-700">{name}</h3>
            <p className="mt-1 text-sm text-gray-500">{category}</p>
          </div>
          <p className="text-sm font-medium text-gray-900">${price}</p>
        </div>
      </motion.div>
    </Link>
  );
}