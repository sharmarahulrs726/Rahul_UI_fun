import { useState, useCallback } from "react";

export function useConfetti(duration = 3000) {
  const [isActive, setIsActive] = useState(false);

  const fire = useCallback(() => {
    setIsActive(true);
    setTimeout(() => setIsActive(false), duration);
  }, [duration]);

  return { isActive, fire };
}
