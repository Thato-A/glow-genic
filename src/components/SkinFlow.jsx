// src/components/SkinFlow.jsx
import { useState } from "react";
import SkinQuiz from "./SkinQuiz";
import SkinResult from "./SkinResult";

export default function SkinFlow() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [resultConcern, setResultConcern] = useState(null);

  const handleQuizFinish = (answers) => {
    // Count the most common answer
    const counts = {};
    answers.forEach((a) => (counts[a] = (counts[a] || 0) + 1));

    const finalConcern = Object.keys(counts).reduce((a, b) =>
      counts[a] > counts[b] ? a : b
    );

    setResultConcern(finalConcern);
    setShowQuiz(false);
  };

  const handleRetake = () => {
    setResultConcern(null);
    setShowQuiz(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {!showQuiz && !resultConcern && (
        <section className="text-center py-20">
          <button
            onClick={() => setShowQuiz(true)}
            className="px-10 py-3 rounded-full bg-teal-600 text-white text-lg hover:bg-teal-700 transition"
          >
            Take the Quiz
          </button>
        </section>
      )}

      {showQuiz && (
        <SkinQuiz
          onFinish={handleQuizFinish}
          onExit={() => setShowQuiz(false)}
        />
      )}

      {resultConcern && (
        <SkinResult concern={resultConcern} onRetake={handleRetake} />
      )}
    </>
  );
}
