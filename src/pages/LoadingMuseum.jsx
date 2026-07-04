import { motion } from "framer-motion";
import { useState } from "react";
import Card from "../components/ui/Card";
import PageTransition from "../components/layout/PageTransition";
import { staggerContainer, staggerItem } from "../animations";

const loaders = [
  { id: "spinner", label: "Spinner", component: <SpinnerLoader /> },
  { id: "dots", label: "Bouncing Dots", component: <DotsLoader /> },
  { id: "pulse", label: "Pulse Ring", component: <PulseLoader /> },
  { id: "bars", label: "Equalizer", component: <BarsLoader /> },
  { id: "cube", label: "Cube Spin", component: <CubeLoader /> },
  { id: "heart", label: "Heart Beat", component: <HeartLoader /> },
  { id: "orbit", label: "Orbit", component: <OrbitLoader /> },
  { id: "wave", label: "Wave", component: <WaveLoader /> },
  { id: "clock", label: "Clock", component: <ClockLoader /> },
  { id: "flip", label: "Card Flip", component: <FlipLoader /> },
];

function SpinnerLoader() {
  return (
    <motion.div
      className="w-10 h-10 border-3 border-white/20 border-t-[var(--accent-primary)] rounded-full"
      animate={{ rotate: 360 }}
      transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
    />
  );
}

function DotsLoader() {
  return (
    <div className="flex gap-1.5">
      {[0, 1, 2].map((i) => (
        <motion.div
          key={i}
          className="w-3 h-3 rounded-full"
          style={{ backgroundColor: "var(--accent-primary)" }}
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}

function PulseLoader() {
  return (
    <motion.div
      className="w-10 h-10 rounded-full border-2 border-[var(--accent-primary)]"
      animate={{ scale: [1, 1.5], opacity: [1, 0] }}
      transition={{ repeat: Infinity, duration: 1.2 }}
    />
  );
}

function BarsLoader() {
  return (
    <div className="flex gap-1 items-end h-10">
      {[1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={i}
          className="w-2 rounded-full"
          style={{ backgroundColor: "var(--accent-primary)" }}
          animate={{ height: [8, 24, 8] }}
          transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.08 }}
        />
      ))}
    </div>
  );
}

function CubeLoader() {
  return (
    <motion.div
      className="w-8 h-8 border-2 border-[var(--accent-primary)]"
      animate={{ rotate: [0, 45, 90, 135, 180, 225, 270, 315, 360] }}
      transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
    />
  );
}

function HeartLoader() {
  return (
    <motion.span
      className="text-2xl"
      animate={{ scale: [1, 1.3, 1] }}
      transition={{ repeat: Infinity, duration: 0.8 }}
    >
      ❤️
    </motion.span>
  );
}

function OrbitLoader() {
  return (
    <div className="relative w-12 h-12">
      <motion.div
        className="absolute inset-0 border-2 border-dashed rounded-full"
        style={{ borderColor: "var(--accent-primary)" }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      />
      <motion.div
        className="absolute w-3 h-3 rounded-full"
        style={{ backgroundColor: "var(--accent-secondary)", top: 2, left: "50%", marginLeft: -6 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
      />
    </div>
  );
}

function WaveLoader() {
  return (
    <div className="flex gap-1">
      {[0, 1, 2, 3, 4].map((i) => (
        <motion.div
          key={i}
          className="w-1.5 h-10 rounded-full"
          style={{ backgroundColor: "var(--accent-primary)" }}
          animate={{ scaleY: [1, 0.3, 1] }}
          transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
        />
      ))}
    </div>
  );
}

function ClockLoader() {
  return (
    <div className="relative w-10 h-10 border-2 border-white/20 rounded-full">
      <motion.div
        className="absolute w-0.5 bg-[var(--accent-primary)]"
        style={{ height: "40%", top: "10%", left: "50%", marginLeft: -1, transformOrigin: "bottom center" }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
      />
      <motion.div
        className="absolute w-0.5 bg-[var(--accent-secondary)]"
        style={{ height: "30%", top: "20%", left: "50%", marginLeft: -1, transformOrigin: "bottom center" }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 0.5, ease: "linear" }}
      />
    </div>
  );
}

function FlipLoader() {
  return (
    <motion.div
      className="w-8 h-8 rounded-md"
      style={{ backgroundColor: "var(--accent-primary)" }}
      animate={{ rotateY: [0, 180, 360] }}
      transition={{ repeat: Infinity, duration: 1.2 }}
    />
  );
}

export default function LoadingMuseum() {
  const [preview, setPreview] = useState(null);

  return (
    <PageTransition>
      <div className="max-w-2xl mx-auto space-y-6">
        <motion.div
          className="text-center"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
        >
          <h1 className="text-3xl font-black">⏳ Loading Museum</h1>
          <p className="text-[var(--text-secondary)] text-sm">10 custom loaders - click to preview</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-5 gap-3"
          variants={staggerContainer}
          initial="initial"
          animate="in"
        >
          {loaders.map((loader) => (
            <motion.div key={loader.id} variants={staggerItem}>
              <Card
                onClick={() => setPreview(loader)}
                glow={preview?.id === loader.id}
                className="!p-4 flex flex-col items-center justify-center min-h-[100px] cursor-pointer"
              >
                <div className="flex items-center justify-center h-12 mb-2">
                  {loader.component}
                </div>
                <p className="text-xs font-medium text-center">{loader.label}</p>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {preview && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="text-center"
          >
            <Card className="!p-8">
              <h3 className="font-bold mb-4">{preview.label}</h3>
              <div className="flex justify-center mb-4 scale-150">
                {preview.component}
              </div>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setPreview(null)}
                className="px-4 py-2 rounded-xl glass text-sm font-bold"
              >
                Close Preview
              </motion.button>
            </Card>
          </motion.div>
        )}
      </div>
    </PageTransition>
  );
}
