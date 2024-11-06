import { motion } from 'framer-motion';
import { useQuery } from 'react-query';
import ProductCard from './ProductCard';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

// Mock data for development
const mockProducts = [
  {
    id: '1',
    name: 'Classic White Sneakers',
    price: 89.99,
    category: 'Footwear',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '2',
    name: 'Leather Backpack',
    price: 129.99,
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '3',
    name: 'Denim Jacket',
    price: 149.99,
    category: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&q=80&w=600'
  },
  {
    id: '4',
    name: 'Cotton T-Shirt',
    price: 29.99,
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=600'
  }
];

export default function ProductGrid() {
  // In a real app, this would fetch from an API
  const { data: products, isLoading } = useQuery('products', async () => {
    // Simulating API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    return mockProducts;
  });

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg aspect-square mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {products?.map((product) => (
        <motion.div key={product.id} variants={item}>
          <ProductCard {...product} />
        </motion.div>
      ))}
    </motion.div>
  );
}