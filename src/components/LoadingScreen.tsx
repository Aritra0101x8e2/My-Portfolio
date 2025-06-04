
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prev + 1;
      });
    }, 25);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center z-50">
      {/* Animated background grid */}
      <div className="absolute inset-0 tech-grid opacity-20"></div>
      
      {/* Matrix rain effect */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-full bg-gradient-to-b from-transparent via-blue-500/30 to-transparent"
            style={{ left: `${i * 5}%` }}
            animate={{
              y: ["-100vh", "100vh"],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              delay: Math.random() * 2,
              ease: "linear",
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center">
        {/* Main logo/title */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h1 className="text-6xl md:text-8xl font-orbitron font-bold gradient-text mb-4">
            AK
          </h1>
          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-xl md:text-2xl font-audiowide text-blue-300"
          >
            Aritra Kundu
          </motion.p>
        </motion.div>

        {/* Loading spinner */}
        <motion.div
          className="relative w-32 h-32 mx-auto mb-8"
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        >
          <div className="absolute inset-0 rounded-full border-4 border-blue-500/20"></div>
          <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-500 animate-spin"></div>
          <div className="absolute inset-2 rounded-full border-2 border-transparent border-r-cyan-400 animate-spin" style={{ animationDirection: "reverse" }}></div>
        </motion.div>

        {/* Progress bar */}
        <div className="w-80 mx-auto">
          <div className="flex justify-between text-sm text-blue-300 mb-2">
            <span>Loading Portfolio...</span>
            <span>{progress}%</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-2 overflow-hidden">
            <motion.div
              className="h-full bg-gradient-to-r from-blue-500 to-cyan-400"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>

        {/* Status text */}
        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="mt-6 text-cyan-400 font-exo"
        >
          Initializing systems...
        </motion.p>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-4 left-4 w-12 h-12 border-l-2 border-t-2 border-blue-500"></div>
      <div className="absolute top-4 right-4 w-12 h-12 border-r-2 border-t-2 border-blue-500"></div>
      <div className="absolute bottom-4 left-4 w-12 h-12 border-l-2 border-b-2 border-blue-500"></div>
      <div className="absolute bottom-4 right-4 w-12 h-12 border-r-2 border-b-2 border-blue-500"></div>
    </div>
  );
};

export default LoadingScreen;
