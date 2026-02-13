import { motion } from 'framer-motion'

const REASONS = [
  'En cualquier vida',
  'En cualquier universo',
  'En cualquier versión del destino',
]

export default function ReasonsSection() {
  return (
    <section className="relative z-10 py-16 px-4">
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-center text-[var(--theme-text)] mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Te elegiría otra vez… 💖
      </motion.h2>
      <div className="max-w-lg mx-auto space-y-4">
        {REASONS.map((reason, i) => (
          <motion.div
            key={reason}
            className="rounded-3xl p-5 shadow-lg border flex items-center gap-3"
            style={{
              backgroundColor: 'var(--theme-background)',
              borderColor: 'var(--theme-accent)',
              color: 'var(--theme-text)',
            }}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
          >
            <span className="text-2xl" aria-hidden>✨</span>
            <span className="font-medium text-lg">{reason}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
