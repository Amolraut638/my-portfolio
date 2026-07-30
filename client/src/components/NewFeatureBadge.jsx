import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiArrowRight, FiX } from "react-icons/fi";

export default function NewFeatureBadge() {
  const [visible, setVisible] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Only show to first-time visitors
    const seen = localStorage.getItem("blogFeatureSeen");
    if (!seen) {
      // Small delay so it doesn't pop instantly
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    if (!visible) return;
    // Auto dismiss after 8 seconds
    const timer = setTimeout(() => handleDismiss(), 8000);
    return () => clearTimeout(timer);
  }, [visible]);

  const handleDismiss = () => {
    setVisible(false);
    localStorage.setItem("blogFeatureSeen", "true");
  };

  const handleClick = () => {
    handleDismiss();
    navigate("/blogs");
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 60, scale: 0.8 }}
          transition={{ type: "spring", damping: 20, stiffness: 200 }}
          className="fixed bottom-6 right-4 sm:right-6 z-[999] max-w-xs w-full sm:w-auto"
        >
          <div
            className="relative bg-darkCard border border-primary/30 rounded-2xl shadow-glow overflow-hidden cursor-pointer group"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
            onClick={handleClick}
          >
            {/* Animated gradient border glow */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-primary/20 via-accent/10 to-primary/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Shooting star animation */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
              <motion.div
                className="absolute top-0 left-0 w-1 h-1 bg-primary rounded-full"
                animate={{
                  x: ["-10%", "110%"],
                  y: ["-10%", "110%"],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 2,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute top-0 right-10 w-0.5 h-0.5 bg-accent rounded-full"
                animate={{
                  x: ["-10%", "110%"],
                  y: ["-10%", "110%"],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  repeatDelay: 3,
                  delay: 1,
                  ease: "easeInOut",
                }}
              />
            </div>

            <div className="relative px-4 py-3 flex items-center gap-3">

              {/* Icon with pulse */}
              <div className="relative shrink-0">
                <div className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center text-lg">
                  ✍️
                </div>
                {/* Pulse ring */}
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-primary" />
                </span>
              </div>

              {/* Text */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-black uppercase tracking-widest text-primary bg-primary/10 border border-primary/20 px-2 py-0.5 rounded-full">
                    New
                  </span>
                  <span className="text-xs font-semibold text-lightText">
                    Blog is live!
                  </span>
                </div>
                <p className="text-[11px] text-mutedText leading-snug truncate">
                  System design, backend & more →
                </p>
              </div>

              {/* Arrow */}
              <motion.div
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.2, repeat: Infinity }}
                className="shrink-0 text-primary"
              >
                <FiArrowRight size={16} />
              </motion.div>

              {/* Dismiss */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDismiss();
                }}
                className="shrink-0 text-mutedText hover:text-lightText transition p-0.5 rounded-lg hover:bg-gray-800"
              >
                <FiX size={13} />
              </button>
            </div>

            {/* Bottom progress bar — shows time remaining */}
            <motion.div
              className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary to-accent"
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 8, ease: "linear" }}
            />
          </div>

          {/* Tooltip */}
          <AnimatePresence>
            {showTooltip && (
              <motion.div
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 5 }}
                transition={{ duration: 0.2 }}
                className="absolute -top-10 left-1/2 -translate-x-1/2 bg-darkCard border border-gray-700 text-lightText text-xs px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg"
              >
                Click to read my blogs
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-darkCard border-r border-b border-gray-700 rotate-45" />
              </motion.div>
            )}
          </AnimatePresence>

        </motion.div>
      )}
    </AnimatePresence>
  );
}