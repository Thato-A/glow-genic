import { motion } from "framer-motion";
import { useState } from "react";
import bgVideo from "../assets/water-video.mp4";
import Consultation from "./Consultation";

export default function Hero() {
  const [showConsult, setShowConsult] = useState(false);

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden">
      {/* BACKGROUND VIDEO */}
      <video
        src={bgVideo}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
      />

      {/* OVERLAY */}
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />

      {/* TEXT */}
      <div className="relative text-center px-6">
        {/* HEADER */}
        <motion.h1
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-6xl md:text-7xl font-bold text-teal-700"
        >
          Glow Genic
        </motion.h1>

        {/* SUBTEXT */}
        <motion.p
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
          className="mt-6 text-xl text-gray-700 max-w-2xl mx-auto"
        >
          Unlock your skin’s true potential with a routine tailored just for
          you.
        </motion.p>

        {/* BUTTON */}
        <motion.button
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 1 }}
          whileHover={{ scale: 1.05 }}
          className="mt-10 px-10 py-3 rounded-full bg-teal-600 text-white text-lg shadow-md hover:bg-teal-700 transition animate-pulse"
          onClick={() => setShowConsult(true)}
        >
          Schedule Consultation
        </motion.button>
      </div>
      {showConsult && <Consultation onClose={() => setShowConsult(false)} />}
    </section>
  );
}
