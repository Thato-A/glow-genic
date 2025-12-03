import { useState } from "react";
import SkinQuiz from "./SkinQuiz";
import SkinResult from "./SkinResult";

export default function SkinFlow() {
  const [showQuiz, setShowQuiz] = useState(false);
  const [resultConcern, setResultConcern] = useState(null);

  const handleQuizFinish = (answers) => {
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
      {/* TAKE THE QUIZ SECTION WITH FLOATING BUBBLES */}
      {!showQuiz && !resultConcern && (
        <section className="relative py-28 flex items-center justify-center overflow-hidden bg-white">
          {/* FLOATING BUBBLES */}
          <div className="absolute inset-0 pointer-events-none">
            {Array.from({ length: 20 }).map((_, i) => (
              <span
                key={i}
                className="bubble"
                style={{
                  left: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 4}s`,
                  animationDuration: `${6 + Math.random() * 6}s`,
                  width: `${20 + Math.random() * 40}px`,
                  height: `${20 + Math.random() * 40}px`,
                }}
              />
            ))}
          </div>

          {/* TAKE QUIZ BUTTON */}
          <button
            onClick={() => setShowQuiz(true)}
            className="relative z-10 px-12 py-4 bg-teal-600 text-white rounded-full text-xl shadow-lg hover:bg-teal-700 transition"
          >
            Take the Quiz
          </button>
        </section>
      )}

      {/* QUIZ */}
      {showQuiz && (
        <SkinQuiz
          onFinish={handleQuizFinish}
          onExit={() => setShowQuiz(false)}
        />
      )}

      {/* RESULT */}
      {resultConcern && (
        <SkinResult concern={resultConcern} onRetake={handleRetake} />
      )}
    </>
  );
}
