import { motion, AnimatePresence } from "framer-motion";

interface ContentLoaderProps {
  isLoading: boolean;
  children: React.ReactNode;
  className?: string;
}

export default function ContentLoader({ isLoading, children, className = "" }: ContentLoaderProps) {
  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <motion.div
          key="skeleton"
          initial={{ opacity: 0.4 }}
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className={className}
        >
          {children}
        </motion.div>
      ) : (
        <motion.div
          key="content"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function SkeletonLine({ width = "100%", height = "1em", className = "" }: { width?: string; height?: string; className?: string }) {
  return (
    <div
      className={`rounded bg-current opacity-10 ${className}`}
      style={{ width, height }}
    />
  );
}

export function SkeletonBlock({ lines = 3, className = "" }: { lines?: number; className?: string }) {
  const widths = ["100%", "92%", "85%", "78%", "95%", "88%"];
  return (
    <div className={`space-y-3 ${className}`}>
      {Array.from({ length: lines }, (_, i) => (
        <SkeletonLine key={i} width={widths[i % widths.length]} height="0.9em" />
      ))}
    </div>
  );
}
