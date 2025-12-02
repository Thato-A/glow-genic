// src/components/ProductCard.jsx
import { motion } from "framer-motion";

export default function ProductCard({ product, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.15 }}
      className="p-6 rounded-3xl bg-white shadow-md border hover:shadow-xl hover:border-teal-400 hover:-translate-y-1 hover:shadow-teal-200/50 transition cursor-pointer group"
    >
      <h4 className="text-xl font-semibold text-teal-700 group-hover:text-teal-600">
        {product.name}
      </h4>
      <p className="text-gray-600 mt-2">{product.step}</p>
      <p className="mt-1 text-teal-500 font-medium">{product.benefit}</p>
    </motion.div>
  );
}
