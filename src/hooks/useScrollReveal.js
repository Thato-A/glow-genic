import { useRef, useEffect } from "react";
import { useAnimation } from "framer-motion";

export default function useScrollReveal() {
  const ref = useRef(null);
  const controls = useAnimation();

  useEffect(() => {
    const element = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          controls.start({
            opacity: 1,
            y: 0,
            transition: { duration: 0.8, ease: "easeOut" },
          });
        }
      },
      { threshold: 0.2 }
    );

    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, [controls]);

  return { ref, controls };
}
