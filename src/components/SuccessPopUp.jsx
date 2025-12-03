import { motion } from "framer-motion";

export default function SuccessPopup({ onClose }) {
  return (
    <motion.div
      onClick={onClose}
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-[99999]"
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        className="bg-white p-10 rounded-3xl max-w-md w-full text-center shadow-2xl"
      >
        <h2 className="text-3xl font-bold mb-3 text-gray-800">
          Order Placed 🎉
        </h2>

        <p className="text-gray-600 mb-6">
          Thank you for your purchase! You will receive a confirmation email
          shortly.
        </p>

        <button
          onClick={onClose}
          className="w-full py-3 bg-teal-600 text-white rounded-full hover:bg-teal-700 transition"
        >
          Close
        </button>
      </motion.div>
    </motion.div>
  );
}
