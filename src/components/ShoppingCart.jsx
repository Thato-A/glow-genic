import { FiTrash2 } from "react-icons/fi";
import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

export default function ShoppingCart({ onClose, onCheckout }) {
  const { cart, updateQuantity, removeItem } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const tax = subtotal * 0.08;

  const shipping = subtotal >= 70 ? 0 : 7.99;

  const total = subtotal + tax + shipping;

  return (
    <motion.div
      className="fixed inset-0 z-[9999] flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* BACKDROP */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* SLIDE-IN CART PANEL */}
      <motion.div
        initial={{ x: "100%" }}
        animate={{ x: 0 }}
        exit={{ x: "100%" }}
        transition={{ type: "spring", stiffness: 120, damping: 18 }}
        className="relative ml-auto w-full max-w-lg bg-white h-full overflow-y-auto shadow-2xl px-6 py-10 rounded-l-2xl"
      >
        {/* CLOSE BUTTON */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-gray-500 text-2xl hover:text-gray-700"
        >
          ×
        </button>

        {/* HEADER */}
        <p
          className="text-sm text-gray-600 mb-3 cursor-pointer hover:underline"
          onClick={onClose}
        >
          ← Continue Shopping
        </p>

        <h1 className="text-3xl font-bold text-teal-700 mb-8">Shopping Cart</h1>

        {/* CART ITEMS */}
        <div className="space-y-5">
          {cart.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm p-5 flex items-center justify-between border"
            >
              {/* PRODUCT LEFT SIDE */}
              <div className="flex gap-4 items-center">
                <img
                  src={item.image || "/placeholder.jpg"}
                  alt={item.name}
                  className="w-24 h-20 rounded-lg object-cover"
                />

                <div>
                  <h2 className="font-semibold text-gray-800">{item.name}</h2>
                  <p className="text-sm text-gray-500">{item.description}</p>

                  {/* QTY BUTTONS */}
                  <div className="flex items-center mt-3">
                    <button
                      onClick={() =>
                        updateQuantity(item.id, Math.max(1, item.quantity - 1))
                      }
                      className="px-3 py-1 bg-gray-200 rounded-l-lg hover:bg-gray-300"
                    >
                      -
                    </button>

                    <span className="px-4 py-1 bg-gray-100">
                      {item.quantity}
                    </span>

                    <button
                      onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      className="px-3 py-1 bg-gray-200 rounded-r-lg hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* PRICE + DELETE */}
              <div className="flex flex-col items-end">
                <p className="text-lg font-semibold text-gray-900">
                  ${(item.price * item.quantity).toFixed(2)}
                </p>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500 hover:text-red-600 mt-3"
                >
                  <FiTrash2 size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* ORDER SUMMARY */}
        <div className="mt-10 bg-white rounded-xl shadow-md p-6 border">
          <h2 className="text-xl font-semibold mb-6 text-gray-800">
            Order Summary
          </h2>

          {subtotal < 70 && (
            <p className="text-sm text-teal-700 mb-4 font-medium">
              Spend ${(70 - subtotal).toFixed(2)} more to get{" "}
              <span className="font-bold">FREE Shipping</span>!
            </p>
          )}

          <div className="flex justify-between text-gray-700 mb-3">
            <p>Subtotal</p>
            <p>${subtotal.toFixed(2)}</p>
          </div>

          <div className="flex justify-between text-gray-700 mb-3">
            <p>Tax</p>
            <p>${tax.toFixed(2)}</p>
          </div>

          <div className="flex justify-between text-gray-700 mb-6">
            <p>Shipping</p>
            <p className="font-medium">
              {shipping === 0 ? (
                <span className="text-green-600 font-semibold">FREE</span>
              ) : (
                `$${shipping.toFixed(2)}`
              )}
            </p>
          </div>

          <div className="flex justify-between text-gray-900 text-lg font-bold mb-6">
            <p>Total</p>
            <p>${total.toFixed(2)}</p>
          </div>

          {/* CHECKOUT BUTTON */}
          <button
            onClick={onCheckout}
            className="w-full py-3 rounded-lg text-white font-semibold 
  bg-gradient-to-r from-teal-600 to-teal-500 hover:from-teal-700 hover:to-teal-600 
  transition shadow-md"
          >
            Proceed to Checkout
          </button>

          {/* PAYMENT ICONS */}
          <p className="text-sm text-gray-400 text-center mt-4 mb-2">
            We Accept
          </p>

          <div className="flex justify-center gap-3">
            <img src="/public/visa.png" className="h-6" />
            <img src="/public/mastercard.png" className="h-6" />
            <img src="/public/amex.png" className="h-6" />
            <img src="/public/applepay.png" className="h-6" />
            <img src="/public/googlepay.png" className="h-6" />
            <img src="/public/venmo-icon.png" className="h-6" />
          </div>

          <p className="text-[11px] text-gray-400 text-center mt-3">
            Secure checkout with SSL encryption
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
