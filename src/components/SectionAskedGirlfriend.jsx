import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const DEFAULT_IMAGE = null

export default function SectionAskedGirlfriend({
  image = DEFAULT_IMAGE,
  title = 'El día que te pedí ser mi novia',
  description = 'El 14 de febrero de 2025 te pedí que fueras mi novia. Fue uno de los días más importantes de mi vida. Decir que sí fue el mejor regalo que pude recibir.',
}) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="relative z-10 py-16 px-4">
      <motion.div
        className="max-w-3xl mx-auto"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[var(--theme-text)] mb-8">
          {title}
        </h2>
        <div className="rounded-2xl overflow-hidden shadow-xl bg-white/80" style={{ border: '1px solid var(--theme-accent)' }}>
          {image && (
            <div className="aspect-[4/3] md:aspect-video">
              <img src={image} alt="" className="w-full h-full object-cover" />
            </div>
          )}
          {!image && (
            <div className="aspect-[4/3] md:aspect-video flex items-center justify-center text-[var(--theme-text-muted)] bg-white/50">
              Tu foto del día que te pedí ser mi novia
            </div>
          )}
          <div className="p-6 md:p-8">
            <p className="text-[var(--theme-text)] leading-relaxed text-lg">
              {description}
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
