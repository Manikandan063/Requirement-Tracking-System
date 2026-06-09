import { motion } from 'framer-motion';

export default function InfinityLoader({ text = "Loading..." }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full min-h-[40vh]">
      <div className="relative flex items-center justify-center">
        <svg width="120" height="60" viewBox="0 0 100 50" className="overflow-visible">
          {/* Background Track */}
          <path
            d="M 25 10 C 10 10 10 40 25 40 C 40 40 60 10 75 10 C 90 10 90 40 75 40 C 60 40 40 10 25 10"
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="6"
            strokeLinecap="round"
            className="dark:stroke-slate-800"
          />
          {/* Animated Infinity Loop */}
          <motion.path
            d="M 25 10 C 10 10 10 40 25 40 C 40 40 60 10 75 10 C 90 10 90 40 75 40 C 60 40 40 10 25 10"
            fill="none"
            stroke="#F97316"
            strokeWidth="6"
            strokeLinecap="round"
            initial={{ pathLength: 0, pathOffset: 0 }}
            animate={{ pathLength: 0.5, pathOffset: 1 }}
            transition={{
              duration: 2,
              ease: "linear",
              repeat: Infinity,
            }}
          />
        </svg>
      </div>
      {text && (
        <p className="text-slate-500 dark:text-slate-400 font-bold mt-4 animate-pulse tracking-wide">
          {text}
        </p>
      )}
    </div>
  );
}
