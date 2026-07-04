export const hoverWobble = {
  whileHover: { rotate: [0, -3, 3, -2, 2, 0], transition: { duration: 0.4 } },
};

export const hoverBounce = {
  whileHover: { scale: 1.08, transition: { type: "spring", stiffness: 400, damping: 10 } },
};

export const hoverGlow = {
  whileHover: { scale: 1.05, boxShadow: "0 0 20px var(--glow-color)" },
};

export const hoverTilt = {
  whileHover: { rotate: 2, scale: 1.03 },
};

export const hoverLift = {
  whileHover: { y: -5, boxShadow: "0 10px 30px rgba(0,0,0,0.3)" },
};

export const tapEffect = {
  whileTap: { scale: 0.92 },
};

export const magneticHover = {
  whileHover: { scale: 1.1, transition: { type: "spring", stiffness: 300 } },
};
