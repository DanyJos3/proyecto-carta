import { motion } from 'framer-motion'

const HEARTS = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${5 + Math.random() * 90}%`,
  delay: Math.random() * 5,
  duration: 8 + Math.random() * 6,
  size: 12 + Math.random() * 20,
  opacity: 0.15 + Math.random() * 0.25,
}))

export default function FloatingHearts() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden>
      {HEARTS.map(({ id, left, delay, duration, size, opacity }) => (
        <motion.div
          key={id}
          className="absolute bottom-0 text-[var(--theme-accent)]"
          style={{
            left,
            width: size,
            height: size,
            opacity,
          }}
          initial={{ y: 0, rotate: 0 }}
          animate={{
            y: -1200,
            rotate: [0, 15, -10, 0],
          }}
          transition={{
            duration,
            delay,
            repeat: Infinity,
          }}
        >
          <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </svg>
        </motion.div>
      ))}
    </div>
  )
}
