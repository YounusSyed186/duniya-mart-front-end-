import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingBag } from 'lucide-react';
import { formatPrice } from '../lib/utils';

export function CartPage() {
  // Placeholder data - in production, this would come from a cart state management system
  const cartItems = [
    {
      id: '1',
      name: 'Premium Basmati Rice',
      price: 2500,
      quantity: 200,
      image: 'https://images.unsplash.com/photo-1586201375761-83865001e31c?auto=format&fit=crop&q=80&w=300',
      seller: 'Royal Foods Wholesale',
    },
    // Add more items as needed
  ];

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const gst = subtotal * 0.18; // 18% GST
  const total = subtotal + gst;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Shopping Cart</h1>

      {cartItems.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item.id} className="bg-white rounded-lg shadow p-4 flex gap-4">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-24 h-24 object-cover rounded"
                />
                <div className="flex-grow">
                  <h3 className="font-semibold">{item.name}</h3>
                  <p className="text-sm text-gray-600">Seller: {item.seller}</p>
                  <div className="mt-2 flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-green-600">{formatPrice(item.price)}/kg</p>
                      <p className="text-sm text-gray-600">Quantity: {item.quantity}kg</p>
                    </div>
                    <button className="text-red-500 hover:text-red-600">
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow p-6 h-fit">
            <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between">
                <span>GST (18%)</span>
                <span>{formatPrice(gst)}</span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
            <button className="w-full mt-6 bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700">
              Proceed to Checkout
            </button>
            <Link
              to="/products"
              className="flex items-center justify-center mt-4 text-green-600 hover:text-green-700"
            >
              <ShoppingBag className="h-4 w-4 mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <ShoppingBag className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-4">Add some products to your cart to proceed</p>
          <Link
            to="/products"
            className="inline-flex items-center px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </div>
  );
}