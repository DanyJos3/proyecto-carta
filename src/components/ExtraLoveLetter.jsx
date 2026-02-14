import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Heart } from 'lucide-react'

const LETTER_TEXT = `Si pudiera resumir este año en una palabra… sería descubrimiento.

Cada día a tu lado me ha enseñado que el amor no es solo un sentimiento, sino una decisión. La decisión de elegirte una y otra vez, de apoyarte, de reír contigo y de construir algo que merezca la pena.

Gracias por ser mi refugio, mi complicidad y mi hogar. Gracias por la paciencia y amor que me tienes porque estoy consciente de que no soy una persona fácil de querer. 
Gracias por creer en nosotros.

Te amo. Hoy, mañana y en todos los capítulos que faltan. 💌`

export default function ExtraLoveLetter({ onClick }) {
  const [open, setOpen] = useState(false)

  return (
    <section className="relative z-10 py-16 px-4">
      <motion.div
        className="max-w-xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <AnimatePresence mode="wait">
          {!open ? (
            <>
              {/* 
            <motion.div
              key="button"
              exit={{ opacity: 0, scale: 0.95 }}
              className="flex justify-center"
            >

              
              <motion.button
                type="button"
                onClick={() => {
                  onClick() ;
                  setOpen(true); }}
                className="px-8 py-4 rounded-3xl font-medium text-white shadow-lg hover:shadow-xl transition-shadow"
                style={{ backgroundColor: 'var(--theme-primary)' }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Tengo algo más para ti 💌
              </motion.button>
            </motion.div>
            */}



              <motion.button
                type="button"
                onClick={() => {
                  onClick() ;
                  setOpen(true); }}
                className="mt-12 px-8 py-4 rounded-2xl font-semibold text-white flex items-center justify-center gap-2 mx-auto transition hover:opacity-90 hover:scale-105 active:scale-100"
                style={{ backgroundColor: 'var(--theme-accent)' }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                <Heart className="w-5 h-5" fill="currentColor" />
                Tengo algo más para ti 💌
              </motion.button>
            </>

          ) : (
            <>
              <motion.div
                key="letter"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="rounded-3xl p-6 md:p-10 shadow-xl border min-h-[280px]"
                style={{
                  backgroundColor: 'var(--theme-background)',
                  borderColor: 'var(--theme-accent)',
                  color: 'var(--theme-text)',
                }}
              >
                <div className="prose prose-lg max-w-none">
                  {LETTER_TEXT.split('\n\n').map((paragraph, i) => (
                    <motion.p
                      key={i}
                      className="mb-4 last:mb-0 leading-relaxed whitespace-pre-line"
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 + i * 0.12 }}
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>
              </motion.div>
              <motion.div
                key="button"
                exit={{ opacity: 0, scale: 0.95 }}
                className="flex justify-center"
              >
                <motion.button
                  type="button"
                  onClick={() => {
                    setOpen(false);
                  }}
                  className="px-8 py-4 rounded-3xl font-medium text-white shadow-lg hover:shadow-xl transition-shadow"
                  style={{ backgroundColor: 'var(--theme-primary)' }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Cerrar
                </motion.button>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  )
}
