import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const EVENTS = [
  {
    date: '29 Noviembre 2024', title: 'El día que nos conocimos', image: null,
    description: `Recuerdo perfectamente la primera vez que te vi entrar al bar de la UCE.
No hablamos de inmediato, pero hoy agradezco tanto haber estado ahí en ese momento… porque sin saberlo, ese día empezaba algo increíble.
Después fuimos a la Pradera, y fue ahí donde por primera vez interactuamos.
Me acuerdo que me asusté un poquito por la forma en que hablabas con los meseros (jajaja), y también porque me puteabas por las puras… como si ya me conocieras de toda la vida (abusiva :v).
Luego fuimos a la gasolinera de la NNUU, y mientras más hablábamos, más entendía que detrás de esa actitud fuerte no había agresividad… sino una chica muy sentimental, tratando de esconder lo que realmente sentía.
Y entonces pasó.
Después de conocernos un poco más, me robaste un beso.
Ese fue el instante que cambió todo.
Sentir tus labios fue como conectar contigo de una forma que no puedo explicar.
Y aunque ni siquiera sabía que estaba buscando a alguien… en ese momento sentí que, de alguna manera, por fin te había encontrado.` },
  { date: '07 Diciembre 2024', title: `El día que aja 🙈😉`, image: ['src/assets/photos/IMG_0896.webp', 'src/assets/photos/IMG_0901.webp'] },
  { date: '25 Diciembre 2024', title: 'Primera Navidad Juntos', image: ['src/assets/photos/IMG_1454.webp', 'src/assets/photos/IMG_1132.webp'] },
  { date: '03 Enero 2025', title: 'Primer viajecito a la playa', image: ['src/assets/photos/IMG_1663.webp'] },
  { date: '14 Enero 2025', title: 'El mejor regalo 😍', image: ['src/assets/photos/IMG_2141.webp', 'src/assets/photos/IMG_2120.webp'] },
  { date: 'Un día especial - 14 Febrero 2025', title: 'Cuando te pedí que seas mi Novia', image: ['src/assets/photos/IMG_2853.webp', 'src/assets/photos/IMG_2847.webp'] },
  { date: 'Otro momento', title: 'Cuando supe que eras la indicada', image: null },
  { date: 'Hoy', title: 'Nuestro primer aniversario', image: null },
]

function TimelineItem({ event, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <motion.div
      ref={ref}
      className="relative flex gap-6 pb-12 last:pb-0"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Línea vertical */}
      <div
        className="absolute left-[11px] top-6 bottom-0 w-0.5 rounded-full"
        style={{ backgroundColor: 'var(--theme-accent)' }}
      />

      {/* Punto */}
      <motion.div
        className="relative z-10 w-6 h-6 rounded-full flex-shrink-0 mt-1 shadow"
        style={{ backgroundColor: 'var(--theme-primary)' }}
        initial={{ scale: 0 }}
        animate={inView ? { scale: 1 } : {}}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
      />

      <div className="flex-1 min-w-0 pt-0">
        <p className="text-sm font-medium text-[var(--theme-accent)]">{event.date}</p>
        <h3 className="text-lg font-semibold text-[var(--theme-text)] mt-1">
          {event.title}
        </h3>
        {event.image &&

          event.image.map((img, index) => {
            return (< div className="mt-3 rounded-xl  overflow-hidden shadow-md max-w-xs" key={`image-${index}`} >
              <img
                src={img}
                alt=""
                className="w-full h-100 object-cover object-top "
              />
            </div>
            )

          })}
        <p className="text-sm  text-[var(--theme-text)]">{event.description}</p>

      </div>
    </motion.div >
  )
}

export default function Timeline() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <section className="relative z-10 py-16 px-4" ref={ref}>
      <motion.h2
        className="text-3xl md:text-3xl font-bold text-center text-[var(--theme-text)] mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
      >
        Fechas memorables
      </motion.h2>

      <div className="max-w-xl mx-auto">
        {EVENTS.map((event, index) => (
          <TimelineItem key={event.date + event.title} event={event} index={index} />
        ))}
      </div>
    </section>
  )
}
