import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import useScrollReveal from "../hooks/useScrollReveal";

export default function Contact() {
  const { ref, controls } = useScrollReveal();
  // typing animation
  const [typingIndex, setTypingIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setTypingIndex((prev) => (prev + 1) % 3);
    }, 400);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={controls}
      className="py-24"
    >
      <section className="py-24 px-6 max-w-7xl mx-auto">
        {/* TITLE */}
        <div className="text-center mb-16">
          <h2 className="text-5xl font-semibold text-teal-700 mb-3">
            Get In Touch
          </h2>
          <p className="text-gray-600 text-lg">
            Have questions? We'd love to hear from you!
          </p>
        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* PHONE MOCKUP */}
          <div className="flex justify-center h-full">
            <div className="bg-[#061224] rounded-[40px] shadow-2xl p-4 w-[340px] md:w-[380px] h-full flex flex-col">
              <div className="bg-white rounded-[30px] flex flex-col overflow-hidden shadow-lg h-full">
                {/* HEADER */}
                <div className="flex items-center gap-3 px-5 py-4 border-b">
                  <div className="w-8 h-8 rounded-full bg-teal-600 flex items-center justify-center text-white">
                    💬
                  </div>
                  <div>
                    <p className="font-semibold text-gray-800">
                      Glow Genic Support
                    </p>
                    <p className="text-xs text-teal-500">Online</p>
                  </div>
                </div>

                {/* CHAT SECTION */}
                <div className="flex-1 px-5 py-6 bg-teal-50 relative">
                  {/* MESSAGE 1 */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="bg-white shadow-md px-4 py-2 rounded-2xl mb-3 w-fit"
                  >
                    Hi! How can we help?
                  </motion.div>

                  {/* MESSAGE 2 */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-white shadow-md px-4 py-2 rounded-2xl mb-6 w-fit"
                  >
                    We're here for all your skincare questions! 💕
                  </motion.div>

                  {/* TYPING INDICATOR */}
                  <div className="flex gap-2 px-3 py-2 bg-white shadow-md rounded-full w-[60px]">
                    {[0, 1, 2].map((i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full bg-teal-400 transition-all ${
                          typingIndex === i ? "opacity-100" : "opacity-40"
                        }`}
                      />
                    ))}
                  </div>

                  {/* TEXT FIELD MOCK */}
                  <div className="absolute bottom-4 left-4 right-4 bg-white flex items-center px-4 py-2 rounded-full shadow">
                    <span className="text-gray-400">✉️</span>
                    <input
                      disabled
                      placeholder="Type your message..."
                      className="ml-2 w-full outline-none text-gray-500 bg-transparent"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: CONTACT FORM */}
          <div className="w-full">
            <form className="space-y-6">
              {/* NAME */}
              <div>
                <label className="block mb-1 text-gray-700 font-medium">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* EMAIL */}
              <div>
                <label className="block mb-1 text-gray-700 font-medium">
                  Your Email
                </label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* SUBJECT */}
              <div>
                <label className="block mb-1 text-gray-700 font-medium">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="How can we help?"
                  className="w-full border rounded-xl px-4 py-3 focus:ring-2 focus:ring-teal-500"
                />
              </div>

              {/* MESSAGE */}
              <div>
                <label className="block mb-1 text-gray-700 font-medium">
                  Message
                </label>
                <textarea
                  placeholder="Tell us more about your inquiry..."
                  className="w-full border rounded-xl px-4 py-3 h-32 focus:ring-2 focus:ring-teal-500"
                ></textarea>
              </div>

              {/* FIXED GRADIENT BUTTON */}
              <button
                type="submit"
                className="w-full py-4 text-white text-lg font-medium rounded-xl shadow-md
            !bg-teal-600 hover:!bg-teal-700 transition"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </motion.section>
  );
}
