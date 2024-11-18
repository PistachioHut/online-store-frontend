import React, { useState } from 'react';
import { Minus, Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

const CartItem = ({ item, onUpdateQuantity, onRemove }) => {
  return (
    <tr className="border-b border-gray-200">
      <td className="py-4">
        <div className="flex items-center space-x-4">
          <img 
            src={item.image} 
            alt={item.name} 
            className="w-16 h-16 object-cover rounded-md"
          />
          <div>
            <h3 className="font-medium text-gray-900">{item.name}</h3>
            <button 
              onClick={() => onRemove(item.id)}
              className="text-green-600 text-sm hover:text-green-700"
            >
              Remove
            </button>
          </div>
        </div>
      </td>
      <td className="py-4 text-gray-900">${item.price}</td>
      <td className="py-4">
        <div className="flex items-center space-x-2">
          <button 
            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
            className="p-1 rounded-md border border-gray-300 hover:bg-gray-100"
            disabled={item.quantity <= 1}
          >
            <Minus size={16} />
          </button>
          <input 
            type="text" 
            value={item.quantity}
            readOnly
            className="w-12 text-center border border-gray-300 rounded-md"
          />
          <button 
            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
            className="p-1 rounded-md border border-gray-300 hover:bg-gray-100"
          >
            <Plus size={16} />
          </button>
        </div>
      </td>
      <td className="py-4 text-right text-gray-900">
        ${(item.price * item.quantity).toFixed(2)}
      </td>
    </tr>
  );
};

const CartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "File Kiyilmis Ic",
      price: 9.99,
      quantity: 1,
      image: "/assets/images/kesik.png"
    }
  ]);

  const handleUpdateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(items =>
      items.map(item =>
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleRemoveItem = (itemId) => {
    setCartItems(items => items.filter(item => item.id !== itemId));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <h1 className="text-2xl font-medium text-gray-900 text-center mb-4">
          Your cart items
        </h1>
        
        <Link 
          to="/products" 
          className="text-green-600 hover:text-green-700 inline-block mb-8"
        >
          Back to shopping
        </Link>

        {cartItems.length > 0 ? (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200 text-sm text-gray-600">
                    <th className="text-left py-3">Product</th>
                    <th className="text-left py-3">Price</th>
                    <th className="text-left py-3">Quantity</th>
                    <th className="text-right py-3">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map(item => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={handleUpdateQuantity}
                      onRemove={handleRemoveItem}
                    />
                  ))}
                </tbody>
              </table>
            </div>

            <div className="mt-8 flex flex-col items-end">
              <div className="flex justify-between w-full max-w-md border-t border-gray-200 pt-4">
                <span className="font-medium">Sub-total</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Tax and shipping will be calculated at checkout
              </p>
              <Link 
                to="/payment"
                className="mt-4 bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors"
              >
                Check-out
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Your cart is empty</p>
            <Link 
              to="/products" 
              className="mt-4 inline-block bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default CartPage;