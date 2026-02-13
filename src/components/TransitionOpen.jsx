import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'

const PARTICLES = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  x: (i % 5) * 25 - 50,
  y: Math.floor(i / 5) * 30 - 30,
  delay: i * 0.05,
  scale: 0.5 + Math.random() * 0.8,
}))

export default function TransitionOpen({ onComplete }) {
  useEffect(() => {
    const t = setTimeout(onComplete, 3200)
    return () => clearTimeout(t)
  }, [onComplete])

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center relative z-10 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      {/* Caja que se abre */}
      <motion.div
        className="relative z-10"
        initial={{ scale: 1, rotateY: 0 }}
        animate={{
          scale: [1, 1.2, 1.2],
          rotateY: [0, 180],
        }}
        transition={{
          scale: { times: [0, 0.3, 1], duration: 1.2 },
          rotateY: { delay: 0.4, duration: 0.8 },
        }}
      >
        <div
          className="w-24 h-24 rounded-2xl shadow-2xl flex items-center justify-center"
          style={{
            background: `linear-gradient(135deg, var(--theme-primary), var(--theme-accent))`,
            color: 'white',
          }}
        >
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1, duration: 0.4 }}
          >
            <Heart className="w-12 h-12" fill="currentColor" />
          </motion.div>
        </div>
      </motion.div>

      {/* Partículas / corazones que salen */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {PARTICLES.map(({ id, x, y, delay, scale }) => (
          <motion.div
            key={id}
            className="absolute text-[var(--theme-accent)]"
            initial={{ scale: 0, opacity: 0 }}
            animate={{
              scale,
              opacity: [0, 0.9, 0],
              x: x * 8,
              y: y * 8,
            }}
            transition={{
              delay: 0.6 + delay,
              duration: 1.2,
            }}
          >
            <Heart className="w-6 h-6" fill="currentColor" />
          </motion.div>
        ))}
      </div>

      <motion.p
        className="mt-10 text-2xl md:text-2xl font-medium text-center text-[var(--theme-text)] z-10 px-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 2 }}
      >
         Feliz aniversario mi amor bonito 💖
      </motion.p>
      <motion.p
        className="mt-10 text-xl md:text-2xl font-medium text-center text-[var(--theme-text)] z-10 px-4"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2, duration: 0.5 }}
      >
        Te amo con todo mi corazón.
      </motion.p>
    </motion.div>
  )
}
