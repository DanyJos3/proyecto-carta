import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const PHASES = {
  MEET: 0,
  HANDS: 1,
  WALK: 2,
  OLD: 3,
}

export default function CoupleAnimation() {
  const [phase, setPhase] = useState(PHASES.MEET)

  useEffect(() => {
    const t1 = setTimeout(() => setPhase(PHASES.HANDS), 2500)
    const t2 = setTimeout(() => setPhase(PHASES.WALK), 4500)
    const t3 = setTimeout(() => setPhase(PHASES.OLD), 7500)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [])

  const isOld = phase === PHASES.OLD
  const isWalking = phase === PHASES.WALK || phase === PHASES.OLD
  const isHoldingHands = phase >= PHASES.HANDS

  return (
    <section className="relative z-10 py-20 px-4 overflow-hidden">
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-center text-[var(--theme-text)] mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        Para siempre juntos
      </motion.h2>

      <div className="max-w-4xl mx-auto relative h-64 md:h-80">
        {/* Contenedor que se mueve: primero los acerca al centro, luego camina a la derecha juntos */}
        <motion.div
          className="absolute inset-0 flex items-end justify-center gap-4"
          initial={{ x: 0 }}
          animate={{
            x: phase === PHASES.MEET ? 0 : phase >= PHASES.WALK ? '15%' : 0,
          }}
          transition={{
            duration: phase === PHASES.MEET ? 0 : 2,
            ease: 'easeInOut',
          }}
        >
          {/* Personaje izquierdo: entra desde la izquierda */}
          <motion.div
            className="absolute bottom-0 flex flex-col items-center"
            style={{ left: '50%' }}
            initial={{ x: '-120%' }}
            animate={{
              x: phase >= PHASES.MEET ? '-4rem' : '-120%',
            }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          >
            <motion.div
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border-4 flex-shrink-0"
              style={{
                backgroundColor: isOld ? '#e5e7eb' : 'var(--theme-primary)',
                borderColor: isOld ? '#9ca3af' : 'var(--theme-secondary)',
              }}
              animate={isWalking ? { y: [0, -4, 0] } : {}}
              transition={{ duration: 0.5, repeat: isWalking ? Infinity : 0 }}
            />
            <motion.div
              className="w-10 h-14 md:w-12 md:h-16 rounded-b-xl -mt-1"
              style={{
                backgroundColor: isOld ? '#9ca3af' : 'var(--theme-accent)',
              }}
              animate={isOld ? { scaleX: 0.95, scaleY: 0.9, rotate: -2 } : {}}
            />
            <motion.div
              className="flex gap-1 -mt-1"
              animate={isWalking ? { rotate: [0, 8, -8, 0] } : {}}
              transition={{ duration: 0.4, repeat: isWalking ? Infinity : 0 }}
            >
              <div className="w-3 h-8 rounded-full" style={{ backgroundColor: isOld ? '#9ca3af' : 'var(--theme-text)' }} />
              <div className="w-3 h-8 rounded-full" style={{ backgroundColor: isOld ? '#9ca3af' : 'var(--theme-text)' }} />
            </motion.div>
          </motion.div>

          {/* Manos unidas */}
          <motion.div
            className="absolute bottom-14 left-1/2 -translate-x-1/2 flex items-center gap-0 pointer-events-none z-10"
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: isHoldingHands ? 1 : 0,
              scale: isHoldingHands ? 1 : 0,
            }}
            transition={{ duration: 0.4 }}
          >
            <div
              className="w-4 h-4 rounded-full border-2"
              style={{ borderColor: 'var(--theme-primary)', backgroundColor: 'var(--theme-background)' }}
            />
            <div className="w-6 h-1 rounded-full" style={{ backgroundColor: 'var(--theme-primary)' }} />
            <div
              className="w-4 h-4 rounded-full border-2"
              style={{ borderColor: 'var(--theme-primary)', backgroundColor: 'var(--theme-background)' }}
            />
          </motion.div>

          {/* Personaje derecho: entra desde la derecha */}
          <motion.div
            className="absolute bottom-0 flex flex-col items-center"
            style={{ left: '50%' }}
            initial={{ x: '20%' }}
            animate={{
              x: phase >= PHASES.MEET ? '4rem' : '20%',
            }}
            transition={{ duration: 2, ease: 'easeInOut' }}
          >
            <motion.div
              className="w-12 h-12 md:w-14 md:h-14 rounded-full border-4 flex-shrink-0"
              style={{
                backgroundColor: isOld ? '#e5e7eb' : 'var(--theme-accent)',
                borderColor: isOld ? '#9ca3af' : 'var(--theme-secondary)',
              }}
              animate={isWalking ? { y: [0, -4, 0] } : {}}
              transition={{ duration: 0.5, repeat: isWalking ? Infinity : 0, delay: 0.25 }}
            />
            <motion.div
              className="w-10 h-14 md:w-12 md:h-16 rounded-b-xl -mt-1"
              style={{
                backgroundColor: isOld ? '#9ca3af' : 'var(--theme-primary)',
              }}
              animate={isOld ? { scaleX: 0.95, scaleY: 0.9, rotate: 2 } : {}}
            />
            <motion.div
              className="flex gap-1 -mt-1"
              animate={isWalking ? { rotate: [0, -8, 8, 0] } : {}}
              transition={{ duration: 0.4, repeat: isWalking ? Infinity : 0, delay: 0.2 }}
            >
              <div className="w-3 h-8 rounded-full" style={{ backgroundColor: isOld ? '#9ca3af' : 'var(--theme-text)' }} />
              <div className="w-3 h-8 rounded-full" style={{ backgroundColor: isOld ? '#9ca3af' : 'var(--theme-text)' }} />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>

      <motion.p
        className="text-center text-[var(--theme-text-muted)] mt-8 max-w-md mx-auto"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 8 }}
      >
        Nos conocimos, nos dimos la mano y elegimos caminar juntos... hasta volvernos viejitos.
      </motion.p>
    </section>
  )
}
