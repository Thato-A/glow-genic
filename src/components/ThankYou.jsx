import confetti from "canvas-confetti";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export default function ThankYou() {
  useEffect(() => {
    // fire confetti burst
    const duration = 1.2 * 1000;
    const end = Date.now() + duration;

    const interval = setInterval(function () {
      confetti({
        particleCount: 40,
        startVelocity: 30,
        spread: 360,
        ticks: 50,
        origin: {
          x: Math.random(),
          y: Math.random() - 0.2,
        },
      });

      if (Date.now() > end) clearInterval(interval);
    }, 200);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-6 text-center">
      <h1 className="text-4xl font-bold text-teal-700 mb-4">Thank You! 🎉</h1>
      <p className="text-gray-600 text-lg max-w-lg">
        Your consultation has been scheduled. We’ll reach out shortly with more
        details.
      </p>

      <Link
        to="/"
        className="mt-6 inline-block px-8 py-3 bg-teal-600 text-white rounded-full text-lg hover:bg-teal-700 transition"
      >
        Back to Home
      </Link>
    </div>
  );
}
