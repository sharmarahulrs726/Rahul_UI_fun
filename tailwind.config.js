/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 8s linear infinite",
        "bounce-slow": "bounce 2s infinite",
        "pulse-fast": "pulse 0.5s infinite",
        wobble: "wobble 0.5s ease-in-out",
        float: "float 3s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        shake: "shake 0.5s ease-in-out",
        squash: "squash 0.6s ease-in-out",
        "walk-in": "walkIn 0.8s ease-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.3s ease-out",
        "fade-in": "fadeIn 0.5s ease-out",
        "confetti-fall": "confettiFall 3s ease-in-out infinite",
        "door-open": "doorOpen 1.2s ease-in-out forwards",
        "stamp-in": "stampIn 0.3s ease-out",
        spin3d: "spin3d 2s linear infinite",
      },
      keyframes: {
        wobble: {
          "0%, 100%": { transform: "rotate(0deg)" },
          "25%": { transform: "rotate(-5deg)" },
          "75%": { transform: "rotate(5deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glow: {
          from: { boxShadow: "0 0 5px rgba(255,255,255,0.3)" },
          to: { boxShadow: "0 0 20px rgba(255,255,255,0.8)" },
        },
        shake: {
          "0%, 100%": { transform: "translateX(0)" },
          "25%": { transform: "translateX(-10px)" },
          "50%": { transform: "translateX(10px)" },
          "75%": { transform: "translateX(-5px)" },
        },
        squash: {
          "0%": { transform: "scaleY(1) scaleX(1)" },
          "50%": { transform: "scaleY(0.3) scaleX(1.4)" },
          "100%": { transform: "scaleY(1) scaleX(1)" },
        },
        walkIn: {
          "0%": { transform: "translateX(-100px)", opacity: "0" },
          "100%": { transform: "translateX(0)", opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        confettiFall: {
          "0%": { transform: "translateY(-100vh) rotate(0deg)", opacity: "1" },
          "100%": { transform: "translateY(100vh) rotate(720deg)", opacity: "0" },
        },
        doorOpen: {
          "0%": { transform: "perspective(800px) rotateY(0deg)" },
          "100%": { transform: "perspective(800px) rotateY(-120deg)" },
        },
        stampIn: {
          "0%": { transform: "scale(3)", opacity: "0" },
          "60%": { transform: "scale(0.9)" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
        spin3d: {
          "0%": { transform: "rotateY(0deg)" },
          "100%": { transform: "rotateY(360deg)" },
        },
      },
    },
  },
  plugins: [],
};
