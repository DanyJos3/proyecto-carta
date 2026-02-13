import { useMemo } from 'react'
import { motion } from 'framer-motion'

const photoGlob = import.meta.glob('../assets/photos/photo*.jpg', { eager: true, query: '?url', import: 'default' })

function getPhotoUrl(i) {
  const key = `../assets/photos/photo${i}.jpg`
  const v = photoGlob[key]
  return (typeof v === 'string' ? v : v?.default) ?? null
}

const POLAROIDS = [
  { photoId: 1, caption: 'Este día fui feliz sin darme cuenta' },
  { photoId: 2, caption: 'Aquí supe que eras mi hogar' },
  { photoId: 3, caption: 'Un momento que quiero repetir siempre' },
  { photoId: 4, caption: 'Contigo hasta el atardecer' },
  { photoId: 5, caption: 'Nuestra historia en una foto' },
  { photoId: 6, caption: 'El día que todo cambió' },
]

export default function PolaroidMemories() {
  const urls = useMemo(() => POLAROIDS.map((p) => getPhotoUrl(p.photoId)), [])

  return (
    <section className="relative z-10 py-16 px-4">
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-center text-[var(--theme-text)] mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Recuerdos en polaroid
      </motion.h2>
      <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
        {POLAROIDS.map((item, i) => (
          <motion.div
            key={item.photoId}
            className="relative bg-white p-3 pb-12 rounded-lg shadow-xl"
            style={{
              transform: `rotate(${i % 2 === 0 ? -3 : 2}deg)`,
              border: '1px solid rgba(0,0,0,0.08)',
            }}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.08 }}
            whileHover={{ rotate: 0, scale: 1.05 }}
          >
            <div className="aspect-square overflow-hidden rounded-sm bg-[var(--theme-background)]">
              {urls[i] ? (
                <img src={urls[i]} alt="" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-[var(--theme-text-muted)] text-sm">
                  Foto {item.photoId}
                </div>
              )}
            </div>
            <p className="absolute bottom-3 left-3 right-3 text-center text-sm font-medium text-[var(--theme-text)]">
              {item.caption}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
