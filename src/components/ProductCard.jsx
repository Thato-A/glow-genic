import { motion } from "framer-motion";
import { useCart } from "../context/CartContext";

export default function ProductCard({ product, index }) {
  const { addToCart, cart, updateQuantity } = useCart();
  const cartItem = cart.find((item) => item.id === product.id);
  const quantity = cartItem?.quantity || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="bg-white rounded-2xl shadow-md p-5 flex flex-col justify-between hover:shadow-xl transition cursor-pointer"
    >
      {/* Product Image */}
      <div className="w-full h-40 flex justify-center items-center mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="h-full object-contain"
        />
      </div>

      {/* Product Info */}
      <div className="text-left flex-grow">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-500">{product.step}</p>
        <p className="text-gray-600 mt-1">{product.benefit}</p>

        <p className="text-xl font-bold text-gray-900 mt-4">${product.price}</p>
      </div>

      {/* Add to Cart OR Quantity */}
      {quantity === 0 ? (
        <button
          onClick={() => addToCart(product)}
          className="mt-5 w-full bg-black text-white py-2 rounded-full hover:bg-gray-800 transition text-sm tracking-wide"
        >
          ADD TO CART
        </button>
      ) : (
        <div className="mt-5 flex items-center justify-between bg-gray-100 rounded-full px-4 py-2">
          <button
            onClick={() => updateQuantity(product.id, quantity - 1)}
            className="text-xl text-gray-700 font-bold"
          >
            -
          </button>
          <span className="text-lg font-medium">{quantity}</span>
          <button
            onClick={() => updateQuantity(product.id, quantity + 1)}
            className="text-xl text-gray-700 font-bold"
          >
            +
          </button>
        </div>
      )}

      {/* Save for Later */}
      <button className="mt-3 text-xs text-gray-600 underline hover:text-gray-800">
        Save for Later
      </button>
    </motion.div>
  );
}
