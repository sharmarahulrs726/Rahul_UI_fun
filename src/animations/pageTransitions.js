export const pageVariants = {
  initial: { opacity: 0, y: 30, scale: 0.96 },
  in: { opacity: 1, y: 0, scale: 1 },
  out: { opacity: 0, y: -30, scale: 0.96 },
};

export const slideLeft = {
  initial: { x: 300, opacity: 0 },
  in: { x: 0, opacity: 1 },
  out: { x: -300, opacity: 0 },
};

export const slideUp = {
  initial: { y: 50, opacity: 0 },
  in: { y: 0, opacity: 1 },
  out: { y: -50, opacity: 0 },
};

export const scaleUp = {
  initial: { scale: 0.8, opacity: 0 },
  in: { scale: 1, opacity: 1 },
  out: { scale: 0.8, opacity: 0 },
};

export const flipIn = {
  initial: { rotateY: 90, opacity: 0 },
  in: { rotateY: 0, opacity: 1 },
  out: { rotateY: -90, opacity: 0 },
};

export const pageTransition = {
  type: "spring",
  stiffness: 200,
  damping: 25,
};

export const pageTransitionFast = {
  duration: 0.3,
  ease: "easeInOut",
};
