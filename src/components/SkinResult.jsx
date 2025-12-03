import { routines } from "../data/routine";
import ProductCard from "./ProductCard";
import { motion, AnimatePresence } from "framer-motion";

export default function SkinResult({ concern, onRetake }) {
  const routine = routines[concern];

  return (
    <AnimatePresence mode="wait">
      <motion.section
        key={concern}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-6xl mx-auto px-6 py-20 text-center"
      >
        <h2 className="text-4xl font-bold text-teal-700">{routine.name}</h2>
        <p className="text-gray-600 mt-3 mb-12 max-w-xl mx-auto">
          {routine.description}
        </p>

        {/* Products */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-16">
          {routine.products.map((product, i) => (
            <ProductCard key={product.id} product={product} index={i} />
          ))}
        </div>

        {/* Buttons */}
        <div className="flex gap-6 justify-center">
          <button
            onClick={onRetake}
            className="px-8 py-3 rounded-full bg-teal-600 text-white hover:bg-teal-700 shadow-md transition"
          >
            Retake Quiz
          </button>

          <button
            onClick={() =>
              navigator.share?.({
                title: "My Glow Genic Routine",
                text: routine.name,
              })
            }
            className="px-8 py-3 rounded-full border border-teal-600 text-teal-700 hover:bg-teal-50 transition"
          >
            Share Results
          </button>
        </div>
      </motion.section>
    </AnimatePresence>
  );
}
