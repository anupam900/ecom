import { motion } from 'framer-motion';
import { useState } from 'react';
import { useQuery } from 'react-query';
import api from '../lib/axios';
import ProductGrid from '../components/ProductGrid';
import { Filter, SlidersHorizontal } from 'lucide-react';

export default function Shop() {
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    sortBy: 'newest'
  });

  const { data: categories } = useQuery('categories', async () => {
    const { data } = await api.get('/categories');
    return data;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold">Shop</h1>
        <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
          <SlidersHorizontal className="w-4 h-4" />
          Filters
        </button>
      </div>

      <div className="grid grid-cols-4 gap-8">
        <motion.aside
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="col-span-1 space-y-6"
        >
          <div>
            <h3 className="font-medium mb-4">Categories</h3>
            <div className="space-y-2">
              {categories?.map((category: any) => (
                <button
                  key={category.id}
                  onClick={() => setFilters({ ...filters, category: category.id })}
                  className={`block w-full text-left px-3 py-2 rounded-lg ${
                    filters.category === category.id ? 'bg-gray-100' : 'hover:bg-gray-50'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Price Range</h3>
            <select
              value={filters.priceRange}
              onChange={(e) => setFilters({ ...filters, priceRange: e.target.value })}
              className="w-full p-2 border rounded-lg"
            >
              <option value="">All</option>
              <option value="0-50">$0 - $50</option>
              <option value="51-100">$51 - $100</option>
              <option value="101-200">$101 - $200</option>
              <option value="201+">$201+</option>
            </select>
          </div>

          <div>
            <h3 className="font-medium mb-4">Sort By</h3>
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              className="w-full p-2 border rounded-lg"
            >
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </motion.aside>

        <div className="col-span-3">
          <ProductGrid />
        </div>
      </div>
    </div>
  );
}