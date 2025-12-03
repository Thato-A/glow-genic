import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";
import { useState } from "react";

export default function ShoppingCart({ onClose, onCheckout }) {
  const { cart, updateQuantity, removeItem } = useCart();
  const [swipeX, setSwipeX] = useState({});

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <motion.div
      onClick={onClose}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex justify-center items-center z-[99999] p-4"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-white rounded-2xl p-6 w-full max-w-lg shadow-2xl"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-900">Your Cart</h2>

        {cart.length === 0 && (
          <p className="text-gray-600">Your cart is empty.</p>
        )}

        {/* Cart Items */}
        <div className="space-y-4">
          {cart.map((item) => (
            <motion.div
              key={item.id}
              drag="x"
              dragConstraints={{ left: -120, right: 0 }}
              dragElastic={0.15}
              onDrag={(e, info) => {
                setSwipeX((prev) => ({ ...prev, [item.id]: info.point.x }));
              }}
              onDragEnd={(e, info) => {
                if (info.point.x < -80) {
                  removeItem(item.id);
                }
                setSwipeX((prev) => ({ ...prev, [item.id]: 0 }));
              }}
              className="relative bg-gray-50 rounded-xl p-4 shadow-sm overflow-hidden"
            >
              {/* Swipe Background Buttons */}
              <div className="absolute inset-0 flex justify-end items-center pr-4 gap-3 pointer-events-none">
                <button className="bg-gray-300 text-black px-3 py-1 rounded text-sm pointer-events-auto">
                  Save for Later
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded text-sm pointer-events-auto">
                  Delete
                </button>
              </div>

              {/* Foreground Card */}
              <motion.div
                className="relative flex justify-between items-center"
                style={{ x: swipeX[item.id] || 0 }}
              >
                <div>
                  <h3 className="font-semibold text-gray-900">{item.name}</h3>
                  <p className="text-sm text-gray-500">${item.price}</p>

                  <div className="flex items-center mt-2">
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      -
                    </button>
                    <span className="px-3">{item.quantity}</span>
                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-2 py-1 bg-gray-200 rounded"
                    >
                      +
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Subtotal */}
        {cart.length > 0 && (
          <div className="mt-8 border-t pt-4">
            <h3 className="text-lg font-bold text-gray-900">
              Subtotal: ${subtotal.toFixed(2)}
            </h3>

            <button
              onClick={onCheckout}
              className="w-full mt-6 bg-black text-white py-3 rounded-full hover:bg-gray-800 transition"
            >
              Checkout
            </button>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}
