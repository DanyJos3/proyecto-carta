import { motion } from 'framer-motion'
import { Gift } from 'lucide-react'

export default function GiftBoxScreen({ onOpen }) {
  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center relative z-10 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >

      <p className="text-4xl md:text-4xl mb-8 text-[var(--theme-text-muted)] font-medium text-center">
        <span className="text-[var(--theme-primary)] font-bold text-4xl">Para:</span> Dayla Alejandra
      </p>
      <p className="text-4xl md:text-4xl mb-8 text-[var(--theme-text-muted)] font-medium text-center">
        <span className="text-[var(--theme-primary)] font-bold text-4xl">De:</span> Dany Jose
      </p>
      {/* <p className="text-4xl md:text-4xl mb-8 text-[var(--theme-text-muted)] font-medium text-center">
      (Daniel Jose)
      </p>  */}
      <p className="text-lg md:text-xl mb-8 text-[var(--theme-text-muted)] font-medium text-center">
        Tengo algo especial para ti...
      </p>

      <motion.button
        type="button"
        onClick={onOpen}
        className="focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)] focus-visible:ring-offset-2 rounded-2xl transition-transform hover:scale-105 active:scale-95"
        aria-label="Abrir regalo"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{
          scale: 1,
          opacity: 1,
          y: [0, -8, 0],
        }}
        transition={{
          opacity: { duration: 0.5 },
          scale: { duration: 0.4 },
          y: {
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
      >
        <span
          className="flex items-center justify-center w-24 h-24 md:w-28 md:h-28 rounded-2xl shadow-lg"
          style={{
            background: `linear-gradient(135deg, var(--theme-primary), var(--theme-accent))`,
            color: 'white',
          }}
        >
          <Gift className="w-12 h-12 md:w-14 md:h-14" strokeWidth={1.5} />
        </span>
      </motion.button>

      <p className="mt-6 text-sm text-[var(--theme-text-muted)] opacity-80">
        Toca la caja para continuar
      </p>
    </motion.div>
  )
}
