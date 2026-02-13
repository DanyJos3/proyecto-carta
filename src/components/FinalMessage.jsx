import { useState } from 'react'
import { motion } from 'framer-motion'
import { Heart } from 'lucide-react'
import ExtraLoveLetter from './ExtraLoveLetter'

function Confetti() {
  const items = Array.from({ length: 60 }, (_, i) => ({
    id: i,
    x: Math.random() * 100 - 50,
    delay: Math.random() * 0.5,
    color: ['var(--theme-primary)', 'var(--theme-accent)', 'var(--theme-secondary)'][i % 3],
    size: 6 + Math.random() * 10,
  }))

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {items.map(({ id, x, delay, color, size }) => (
        <motion.div
          key={id}
          className="absolute left-1/2 top-1/2 rounded-full"
          style={{
            width: size,
            height: size,
            backgroundColor: color,
          }}
          initial={{ x: 0, y: 0, opacity: 1 }}
          animate={{
            x: x * 20,
            y: -400 - Math.random() * 200,
            opacity: 0,
            rotate: 720,
          }}
          transition={{
            duration: 2,
            delay,
          }}
        />
      ))}
      {Array.from({ length: 25 }, (_, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute left-1/2 top-1/2 text-[var(--theme-accent)]"
          style={{ width: 24, height: 24 }}
          initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
          animate={{
            x: (Math.random() - 0.5) * 400,
            y: -300 - Math.random() * 200,
            scale: [0, 1, 1],
            opacity: [1, 1, 0],
          }}
          transition={{
            duration: 2.2,
            delay: Math.random() * 0.4,
          }}
        >
          <Heart className="w-full h-full" fill="currentColor" />
        </motion.div>
      ))}
    </div>
  )
}

export default function FinalMessage({ onForever }) {
  const [showConfetti, setShowConfetti] = useState(false)

  const handleForever = () => {
    setShowConfetti(true)
    //onForever?. ()
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 z-10 overflow-hidden">
      {showConfetti && <Confetti />}

      <motion.div
        className="text-center max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-[var(--theme-text)] leading-tight">
          Gracias por este año...
        </h2>
        <p className="mt-6 text-xl md:text-2xl text-[var(--theme-text-muted)]">
          Te amo con todo mi corazón.
        </p>
        <p className="mt-4 text-xl md:text-2xl font-medium text-[var(--theme-primary)]">
          Feliz aniversario 💖
        </p>
{/*
        <motion.button
          type="button"
          onClick={handleForever}
          className="mt-12 px-8 py-4 rounded-2xl font-semibold text-white flex items-center justify-center gap-2 mx-auto transition hover:opacity-90 hover:scale-105 active:scale-100"
          style={{ backgroundColor: 'var(--theme-accent)' }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          <Heart className="w-5 h-5" fill="currentColor" />
          Para siempre contigo
        </motion.button>*/}

          <ExtraLoveLetter onClick={handleForever} />

      </motion.div>
    </section>
  )
}
