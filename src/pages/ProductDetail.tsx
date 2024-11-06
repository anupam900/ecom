import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';
import api from '../lib/axios';
import { useCart } from '../hooks/useCart';
import { Heart, Share2 } from 'lucide-react';

export default function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  const { data: product, isLoading } = useQuery(['product', id], async () => {
    const { data } = await api.get(`/products/${id}`);
    return data;
  });

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="animate-pulse grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="bg-gray-200 aspect-square rounded-lg"></div>
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
            <div className="h-24 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-full aspect-square object-cover rounded-lg"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-6"
        >
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <p className="text-2xl font-medium mt-2">${product.price}</p>
          </div>

          <p className="text-gray-600">{product.description}</p>

          <div className="space-y-4">
            <button
              onClick={() => addToCart.mutate(product.id)}
              className="w-full bg-black text-white py-3 rounded-lg hover:bg-gray-800 transition-colors"
            >
              Add to Cart
            </button>

            <div className="flex gap-4">
              <button className="flex-1 flex items-center justify-center gap-2 border py-3 rounded-lg hover:bg-gray-50">
                <Heart className="w-5 h-5" />
                Save
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 border py-3 rounded-lg hover:bg-gray-50">
                <Share2 className="w-5 h-5" />
                Share
              </button>
            </div>
          </div>

          <div className="border-t pt-6 space-y-4">
            <h3 className="font-medium">Product Details</h3>
            <ul className="space-y-2 text-gray-600">
              {product.details.map((detail: string, index: number) => (
                <li key={index}>{detail}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      </div>
    </div>
  );
}