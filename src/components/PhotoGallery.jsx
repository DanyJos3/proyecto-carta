import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

// Cargar todas las fotos posibles (photo1.jpg ... photo20.jpg) con glob de Vite
// const photoGlob = import.meta.glob('/photos/IMG*.webp', { eager: true, query: '?url', import: 'default' })

// function getPhotoUrl(i) {
//   const key = `/photos/IMG_${i}.webp`
//   console.log("key",key)
//   const v = photoGlob[key]
//   console.log("getPhotoUrl", v)
//   return (typeof v === 'string' ? v : v?.default) ?? null
// }

// const PHOTO_IDS = Array.from({ length: 5 }, (_, i) => i + 1)

export default function PhotoGallery() {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  // console.log(PHOTO_IDS)
  // const photoUrls = useMemo(Array.from({ length: 54 }, (_, i) =>
  //   `/photos/photo${String(i + 1).padStart(2, "0")}.webp`
  // ), [])
  // console.log(PHOTO_IDS)
  const photoUrls = Array.from({ length: 50 }, (_, i) =>
    // `/public/photos/IMG_${i}.webp`
    `${import.meta.env.BASE_URL}photos/IMG_${i + 1}.webp`
  )

  // console.log("getPhotoUrl(1)",getPhotoUrl(1))

  return (
    <section className="relative z-10 py-16 px-4">
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-center text-[var(--theme-text)] mb-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        Nuestros momentos
      </motion.h2>

      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
        {photoUrls.map((id, index) => {
          const src = id
          { console.log("src", src) }
          return (
            <motion.button
              key={id}
              type="button"
              onClick={() => setLightboxIndex(index)}
              className="relative rounded-2xl overflow-hidden shadow-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--theme-accent)] aspect-square bg-white/80 flex items-center justify-center text-[var(--theme-text-muted)] border border-[var(--theme-accent)]/20"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.03 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
            >
              {src ? (
                <img
                  src={src}
                  alt={`Momento ${id}`}
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              ) : (
                <span className="text-sm">Foto {id}</span>
              )}
            </motion.button>
          )
        })}
      </div>

      <AnimatePresence>
        {lightboxIndex !== null && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setLightboxIndex(null)}
          >
            <motion.div
              className="relative max-w-4xl max-h-[90vh] w-full"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="absolute -top-12 right-0 text-white hover:opacity-80 p-2"
                onClick={() => setLightboxIndex(null)}
                aria-label="Cerrar"
              >
                <X className="w-8 h-8" />
              </button>
              {photoUrls[lightboxIndex] ? (
                <img
                  src={photoUrls[lightboxIndex]}
                  alt=""
                  className="w-full h-full object-contain rounded-2xl shadow-2xl"
                loading="lazy"
                />
              ) : (
                <div className="bg-white/10 rounded-2xl flex items-center justify-center aspect-video text-white">
                  Foto {PHOTO_IDS[lightboxIndex]}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
