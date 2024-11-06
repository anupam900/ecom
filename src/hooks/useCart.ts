import { useQuery, useMutation, useQueryClient } from 'react-query';
import api from '../lib/axios';
import { toast } from 'react-hot-toast';

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image: string;
}

export function useCart() {
  const queryClient = useQueryClient();

  const { data: cart, isLoading } = useQuery('cart', async () => {
    const { data } = await api.get('/cart');
    return data;
  });

  const addToCart = useMutation(
    async (productId: string) => {
      const { data } = await api.post('/cart', { productId });
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('cart');
        toast.success('Added to cart');
      },
      onError: () => {
        toast.error('Failed to add to cart');
      },
    }
  );

  const updateQuantity = useMutation(
    async ({ productId, quantity }: { productId: string; quantity: number }) => {
      const { data } = await api.put(`/cart/${productId}`, { quantity });
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('cart');
      },
      onError: () => {
        toast.error('Failed to update quantity');
      },
    }
  );

  const removeFromCart = useMutation(
    async (productId: string) => {
      await api.delete(`/cart/${productId}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries('cart');
        toast.success('Removed from cart');
      },
      onError: () => {
        toast.error('Failed to remove from cart');
      },
    }
  );

  return {
    cart,
    isLoading,
    addToCart,
    updateQuantity,
    removeFromCart,
  };
}