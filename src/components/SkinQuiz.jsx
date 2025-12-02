// src/components/SkinQuiz.jsx
import { useState, useEffect, useRef } from "react";
import { quizQuestions } from "../data/quizQuestions";
import { motion } from "framer-motion";

export default function SkinQuiz({ onFinish, onExit }) {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [selected, setSelected] = useState(null);

  const question = quizQuestions[index];
  const progress = ((index + 1) / quizQuestions.length) * 100;

  const containerRef = useRef(null);

  // Smooth auto-scroll to top when switching questions
  useEffect(() => {
    containerRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [index]);

  const handleNext = () => {
    if (!selected) return alert("Please choose an answer.");

    const updated = [...answers];
    updated[index] = selected;
    setAnswers(updated);
    setSelected(updated[index + 1] || null);

    if (index === quizQuestions.length - 1) {
      onFinish(updated);
    } else {
      setIndex(index + 1);
    }
  };

  const handleBack = () => {
    if (index === 0) return;
    setSelected(answers[index - 1] || null);
    setIndex(index - 1);
  };

  const handleExit = () => {
    if (
      confirm(
        "Are you sure you want to exit the quiz? Your answers will be lost."
      )
    ) {
      onExit();
    }
  };

  return (
    <section
      ref={containerRef}
      className="min-h-screen flex items-center justify-center px-6 py-20"
    >
      <motion.div
        key={index}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white/90 rounded-3xl shadow-xl p-10 w-full max-w-xl relative"
      >
        {/* Exit button */}
        <button
          onClick={handleExit}
          className="absolute top-6 right-6 text-gray-600 hover:text-red-500"
        >
          ✕
        </button>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 rounded-full h-2 mb-8">
          <div
            className="bg-teal-600 h-2 rounded-full transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>

        <h2 className="text-3xl font-semibold text-teal-700 mb-6">
          {question.question}
        </h2>

        <div className="space-y-4">
          {question.options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setSelected(opt.value)}
              className={`w-full py-3 px-5 rounded-full border transition text-left ${
                selected === opt.value
                  ? "border-teal-700 bg-teal-600 text-white"
                  : "border-gray-300 hover:border-teal-600 hover:bg-teal-50"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        <div className="flex justify-between items-center mt-10">
          {/* Back button */}
          <button
            onClick={handleBack}
            disabled={index === 0}
            className={`px-6 py-2 rounded-full border ${
              index === 0
                ? "opacity-40 cursor-not-allowed"
                : "hover:bg-teal-50 border-teal-600 text-teal-700"
            }`}
          >
            ← Back
          </button>

          {/* Next or Finish */}
          <button
            onClick={handleNext}
            className="px-8 py-2 rounded-full bg-teal-600 text-white hover:bg-teal-700 transition"
          >
            {index === quizQuestions.length - 1 ? "Finish" : "Next →"}
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-6 text-center">
          Question {index + 1} of {quizQuestions.length}
        </p>
      </motion.div>
    </section>
  );
}
