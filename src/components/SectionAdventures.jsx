import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

export default function SectionAdventures({ title = 'Nuestras aventuras juntos' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="relative z-10 py-16 px-4">
      <motion.div
        className="max-w-3xl mx-auto text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--theme-text)] mb-6">
          {title}
        </h2>
        <p className="text-[var(--theme-text-muted)] text-lg mb-10">
          Cada salida, cada viaje y cada momento a tu lado es una aventura. Aquí algunos de nuestros recuerdos.
        </p>
      </motion.div>
    </section>
  )
}
