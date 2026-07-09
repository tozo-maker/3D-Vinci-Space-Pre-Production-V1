import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { sdk, isMedusaConfigured } from './client';
import { PRODUCTS, Product as DummyProduct } from '../../data';

// --- Types ---
export interface MedusaProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  thumbnail: string;
  variants: any[];
  collection?: any;
  categories?: any[];
  price?: {
    calculated_price: number;
    currency_code: string;
  };
}

// Map Dummy Data to Medusa-like structure
const mapDummyToMedusa = (dummy: DummyProduct): MedusaProduct => ({
  id: dummy.id,
  title: dummy.name,
  handle: dummy.name.toLowerCase().replace(/\s+/g, '-'),
  description: dummy.description,
  thumbnail: dummy.image,
  variants: [{ id: `var_${dummy.id}`, title: 'Default', prices: [{ currency_code: 'gel', amount: dummy.price }] }],
  categories: [{ name: dummy.category }],
  price: {
    calculated_price: dummy.price,
    currency_code: 'GEL',
  }
});

// --- Products Hooks ---
export function useProducts(query?: any) {
  return useQuery({
    queryKey: ['products', query],
    queryFn: async () => {
      if (isMedusaConfigured) {
        const { products } = await sdk.store.product.list({
          fields: "*variants.calculated_price,*categories",
          ...query,
        });
        return products.map((p: any) => ({
          ...p,
          thumbnail: p.thumbnail ? (p.thumbnail.startsWith('https://') ? `/api/proxy-image?url=${encodeURIComponent(p.thumbnail)}` : p.thumbnail) : ''
        }));
      }
      
      // Fallback to dummy data
      return PRODUCTS.map(mapDummyToMedusa);
    },
  });
}

export function useProduct(handle: string) {
  return useQuery({
    queryKey: ['product', handle],
    queryFn: async () => {
      if (isMedusaConfigured) {
        const { products } = await sdk.store.product.list({ handle, fields: "*variants.calculated_price,*categories" });
        const p = products[0];
        if (p) {
          return {
            ...p,
            thumbnail: p.thumbnail ? (p.thumbnail.startsWith('https://') ? `/api/proxy-image?url=${encodeURIComponent(p.thumbnail)}` : p.thumbnail) : ''
          };
        }
        return p;
      }
      return PRODUCTS.map(mapDummyToMedusa).find(p => p.handle === handle);
    },
    enabled: !!handle,
  });
}

// --- Cart Hooks ---

// Mock Cart Helpers
const getMockCart = () => {
  if (typeof window === 'undefined') return null;
  const stored = localStorage.getItem('mock_cart');
  if (stored) return JSON.parse(stored);
  return { id: 'mock_cart_1', items: [], total: 0 };
};
const setMockCart = (cart: any) => {
  if (typeof window !== 'undefined') localStorage.setItem('mock_cart', JSON.stringify(cart));
};

export function useCart() {
  const cartId = typeof window !== 'undefined' ? localStorage.getItem('cart_id') : null;

  return useQuery({
    queryKey: ['cart', cartId],
    queryFn: async () => {
      if (!isMedusaConfigured) return getMockCart();
      
      if (!cartId) {
        const { cart } = await sdk.store.cart.create({ region_id: 'reg_1' });
        localStorage.setItem('cart_id', cart.id);
        return cart;
      }
      try {
        const { cart } = await sdk.store.cart.retrieve(cartId);
        return cart;
      } catch (err) {
        const { cart } = await sdk.store.cart.create({ region_id: 'reg_1' });
        localStorage.setItem('cart_id', cart.id);
        return cart;
      }
    },
  });
}

export function useAddToCart() {
  const queryClient = useQueryClient();
  const cartId = typeof window !== 'undefined' ? localStorage.getItem('cart_id') : null;

  return useMutation({
    mutationFn: async ({ variantId, quantity, metadata, productOverride }: { variantId: string; quantity: number, metadata?: any, productOverride?: any }) => {
      if (!isMedusaConfigured) {
        const cart = getMockCart();
        const existing = cart.items.find((i: any) => i.variant_id === variantId && JSON.stringify(i.metadata) === JSON.stringify(metadata));
        if (existing) {
          existing.quantity += quantity;
        } else {
          cart.items.push({
            id: `line_${Math.random()}`,
            variant_id: variantId,
            quantity,
            unit_price: productOverride?.price || 100,
            metadata,
            title: productOverride?.name || `Item ${variantId}`,
            thumbnail: productOverride?.image || '',
          });
        }
        cart.total = cart.items.reduce((acc: number, item: any) => acc + (item.unit_price * item.quantity), 0);
        setMockCart(cart);
        return cart;
      }

      if (!cartId) throw new Error("No cart id");
      const { cart } = await sdk.store.cart.createLineItem(cartId, {
        variant_id: variantId,
        quantity,
        metadata,
      });
      return cart;
    },
    onSuccess: (data) => {
      if (data) queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

export function useRemoveLineItem() {
  const queryClient = useQueryClient();
  const cartId = typeof window !== 'undefined' ? localStorage.getItem('cart_id') : null;

  return useMutation({
    mutationFn: async (lineId: string) => {
      if (!isMedusaConfigured) {
        const cart = getMockCart();
        cart.items = cart.items.filter((i: any) => i.id !== lineId);
        cart.total = cart.items.reduce((acc: number, item: any) => acc + (item.unit_price * item.quantity), 0);
        setMockCart(cart);
        return cart;
      }
      if (!cartId) throw new Error("No cart id");
      const { cart } = await sdk.store.cart.deleteLineItem(cartId, lineId);
      return cart;
    },
    onSuccess: (data) => {
      if (data) queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

export function useUpdateLineItem() {
  const queryClient = useQueryClient();
  const cartId = typeof window !== 'undefined' ? localStorage.getItem('cart_id') : null;

  return useMutation({
    mutationFn: async ({ lineId, quantity }: { lineId: string, quantity: number }) => {
      if (!isMedusaConfigured) {
        const cart = getMockCart();
        const item = cart.items.find((i: any) => i.id === lineId);
        if (item) {
          item.quantity = quantity;
        }
        cart.total = cart.items.reduce((acc: number, item: any) => acc + (item.unit_price * item.quantity), 0);
        setMockCart(cart);
        return cart;
      }
      if (!cartId) throw new Error("No cart id");
      const { cart } = await sdk.store.cart.updateLineItem(cartId, lineId, { quantity });
      return cart;
    },
    onSuccess: (data) => {
      if (data) queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}


// --- Checkout Hooks ---
export function useUpdateCart() {
  const queryClient = useQueryClient();
  const cartId = typeof window !== 'undefined' ? localStorage.getItem('cart_id') : null;

  return useMutation({
    mutationFn: async (data: any) => {
      if (!isMedusaConfigured) {
        const cart = getMockCart();
        Object.assign(cart, data);
        setMockCart(cart);
        return cart;
      }
      if (!cartId) throw new Error("No cart id");
      const { cart } = await sdk.store.cart.update(cartId, data);
      return cart;
    },
    onSuccess: (data) => {
      if (data) queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

export function useCompleteCheckout() {
  const queryClient = useQueryClient();
  const cartId = typeof window !== 'undefined' ? localStorage.getItem('cart_id') : null;

  return useMutation({
    mutationFn: async () => {
      if (!isMedusaConfigured) {
        localStorage.removeItem('mock_cart');
        return { type: 'order', order: { id: `mock_order_${Math.random()}` } };
      }
      if (!cartId) throw new Error("No cart id");
      const { type, order, cart } = await sdk.store.cart.complete(cartId);
      if (type === 'order') {
        localStorage.removeItem('cart_id');
        return order;
      }
      return cart;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['cart'] });
    },
  });
}

