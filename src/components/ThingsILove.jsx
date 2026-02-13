import { motion } from 'framer-motion'

const ITEMS = [
  'Tu sonrisa',
  'Tu forma de abrazar',
  'Cómo me haces sentir en paz',
  'Tus locuras bonitas',
  'Cuando me miras',
  'Tu voz',
  'Los planes que hacemos',
  'Tu paciencia',
  'Cada detalle que recuerdas',
  'Que seas mi hogar',
  'Cuando me mimas',
  'Contigo en silencio',
]

export default function ThingsILove() {
  return (
    <section className="relative z-10 py-16 px-4">
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-center text-[var(--theme-text)] mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Pequeñas cosas que amo de ti
      </motion.h2>
      <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-4">
        {ITEMS.map((item, i) => (
          <motion.div
            key={item}
            className="rounded-2xl md:rounded-3xl p-4 shadow-md border text-center"
            style={{
              backgroundColor: 'var(--theme-background)',
              borderColor: 'var(--theme-accent)',
              color: 'var(--theme-text)',
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.05 }}
          >
            <span className="text-sm md:text-base font-medium">{item}</span>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
