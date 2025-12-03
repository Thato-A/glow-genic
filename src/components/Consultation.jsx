import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

export default function Consultation({ onClose }) {
  const [penX, setPenX] = useState(0);
  const [success, setSuccess] = useState(false);

  // Pen wobble animation
  useEffect(() => {
    const interval = setInterval(() => {
      setPenX((prev) => (prev === 0 ? 10 : 0));
    }, 500);
    return () => clearInterval(interval);
  }, []);

  // Sparkle animation (unchanged)
  const sparkles = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    size: Math.random() * 6 + 3,
    left: Math.random() * 100,
    delay: Math.random() * 1.5,
  }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);

    setTimeout(() => {
      onClose();
    }, 2300);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      onClick={onClose}
      className="fixed inset-0 z-[999] bg-black/50 backdrop-blur-sm flex justify-center items-center p-4"
    >
      <AnimatePresence mode="wait">
        {!success ? (
          /* MAIN FORM CARD */
          <motion.div
            key="form"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.85 }}
            transition={{ duration: 0.35 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl p-10 relative overflow-y-auto max-h-[90vh]"
          >
            {/* CLOSE BUTTON */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-gray-500 hover:text-red-500 text-xl"
            >
              ✕
            </button>

            <h2 className="text-3xl font-semibold text-teal-700 mb-10">
              Schedule Your Consultation
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              {/* ----------------------------- */}
              {/* NOTEBOOK STYLE LEFT PANEL     */}
              {/* ----------------------------- */}
              <div className="relative bg-[#fff7ea] border border-[#f3d7b2] rounded-3xl p-8 shadow-inner overflow-hidden">
                {/* STICKY NOTE */}
                <div
                  className="absolute -top-4 -left-3 bg-[#fff7a6] w-24 h-24 shadow-md rounded-sm rotate-[-6deg]
                                border border-yellow-300 flex items-center justify-center text-xs font-semibold text-gray-700 z-20"
                >
                  Note
                </div>

                {/* PUSH PIN */}
                <div className="absolute -top-1 left-9 w-3 h-3 bg-red-500 rounded-full shadow-md z-30"></div>

                {/* ANIMATED PENCIL */}
                <motion.div
                  animate={{ x: penX }}
                  transition={{ duration: 0.25, ease: "easeInOut" }}
                  className="absolute right-8 top-16 text-4xl z-20 animate-[wiggle_1.3s_ease-in-out_infinite]"
                >
                  ✏️
                </motion.div>

                {/* TITLE */}
                <h3 className="text-xl font-semibold text-gray-800 mb-6 relative z-20">
                  Your Consultation
                </h3>

                {/* DOTTED LINES */}
                <div className="relative z-10 space-y-6 mt-4 pt-2">
                  {[1, 2, 3, 4].map((i) => (
                    <motion.div
                      key={i}
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: "100%", opacity: 1 }}
                      transition={{ delay: i * 0.25, duration: 0.5 }}
                      className="h-[2px] border-b-2 border-dotted border-[#e2c7a3]"
                    />
                  ))}
                </div>

                {/* SPARKLES (unchanged) */}
                {sparkles.map((s) => (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{
                      opacity: [0, 1, 0],
                      scale: [0.5, 1, 0.5],
                      y: [-5, -15, -25],
                    }}
                    transition={{
                      duration: 1.6,
                      repeat: Infinity,
                      delay: s.delay,
                    }}
                    className="absolute text-yellow-300"
                    style={{
                      left: `${s.left}%`,
                      top: "70px",
                      fontSize: `${s.size}px`,
                    }}
                  >
                    ✨
                  </motion.div>
                ))}

                {/* LIST OF BENEFITS */}
                <ul className="space-y-3 text-gray-700 mt-8 relative z-20">
                  <li>✓ Personalized skin analysis</li>
                  <li>✓ Custom routine recommendations</li>
                  <li>✓ Product guidance</li>
                  <li>✓ Follow-up support</li>
                </ul>
              </div>

              {/* ----------------------------- */}
              {/* RIGHT SIDE FORM               */}
              {/* ----------------------------- */}
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Full Name
                  </label>
                  <input className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500" />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Email
                  </label>
                  <input className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500" />
                </div>

                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block mb-1 font-medium text-gray-700">
                      Preferred Date
                    </label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500"
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-medium text-gray-700">
                      Preferred Time
                    </label>
                    <input
                      type="time"
                      className="w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-teal-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block mb-1 font-medium text-gray-700">
                    Main Concern
                  </label>
                  <textarea className="w-full px-4 py-3 border rounded-xl h-24 focus:ring-2 focus:ring-teal-500"></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-4 text-white text-lg font-medium rounded-xl shadow-md
                  !bg-teal-600 hover:!bg-teal-700 transition"
                >
                  Schedule Consultation
                </button>
              </form>
            </div>
          </motion.div>
        ) : (
          /* SUCCESS ANIMATION */
          <motion.div
            key="success"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-white rounded-3xl shadow-2xl w-full max-w-lg p-12 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 150, delay: 0.2 }}
              className="text-6xl text-teal-600 mb-6"
            >
              ✔️
            </motion.div>

            <h3 className="text-2xl font-semibold text-gray-800 mb-3">
              Consultation Scheduled!
            </h3>

            <p className="text-gray-600">
              We’ll contact you soon with next steps.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
