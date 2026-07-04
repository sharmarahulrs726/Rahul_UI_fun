export const staggerContainer = {
  initial: {},
  in: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
};

export const staggerItem = {
  initial: { y: 30, opacity: 0 },
  in: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 200, damping: 20 } },
};

export const cardEntrance = {
  initial: { scale: 0.8, opacity: 0, y: 20 },
  in: { scale: 1, opacity: 1, y: 0, transition: { type: "spring", stiffness: 200, damping: 20 } },
};

export const listItem = {
  initial: { x: -30, opacity: 0 },
  in: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 200 } },
};

export const popIn = {
  initial: { scale: 0, opacity: 0 },
  in: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 300, damping: 15 } },
};
