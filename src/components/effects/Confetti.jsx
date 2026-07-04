import ReactConfetti from "react-confetti";
import { useEffect, useState } from "react";

export default function Confetti({ active = false, duration = 3000 }) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (typeof window !== "undefined") {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
      const handleResize = () => setDimensions({ width: window.innerWidth, height: window.innerHeight });
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  if (!active) return null;

  return (
    <ReactConfetti
      width={dimensions.width}
      height={dimensions.height}
      numberOfPieces={200}
      recycle={false}
      colors={["#ff6b9d", "#7b61ff", "#00d4ff", "#ffd700", "#ff4500", "#00ff88"]}
      style={{ position: "fixed", top: 0, left: 0, zIndex: 9999, pointerEvents: "none" }}
    />
  );
}
