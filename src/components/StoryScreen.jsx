import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Timeline from './Timeline'
import ReasonsSection from './ReasonsSection'
import ThingsILove from './ThingsILove'
import PolaroidMemories from './PolaroidMemories'
import LoveMap from './LoveMap'
import SongSection from './SongSection'
import ExtraLoveLetter from './ExtraLoveLetter'
import PhotoGallery from './PhotoGallery'
import FinalMessage from './FinalMessage'
import DaysCounter from './DaysCounter'

export default function StoryScreen({ backgroundRef }) {
  const heroRef = useRef(null)
  const storyRef = useRef(null)
  const inViewHero = useInView(heroRef, { once: true })
  const inViewStory = useInView(storyRef, { once: true })

  return (
    <div className="relative z-10">
      {/* Hero */}
      <section
        ref={heroRef}
        className="min-h-[70vh] flex flex-col items-center justify-center text-center px-4 py-16"
      >
        <motion.h1
          className="text-3xl md:text-5xl lg:text-6xl font-bold text-[var(--theme-text)] max-w-4xl leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={inViewHero ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          Un año contigo ha sido mi mejor regalo
        </motion.h1>
        <motion.p
          className="mt-6 text-lg md:text-xl text-[var(--theme-text-muted)]"
          initial={{ opacity: 0, y: 20 }}
          animate={inViewHero ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Feliz aniversario y feliz San Valentín 💘
        </motion.p>
        <motion.img
          className="mx-auto mt-10"
          src={`${import.meta.env.BASE_URL}/photos/hero.png`}
          alt="update_photo"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          style={{
            mixBlendMode: "multiply",
          }}
        />
      </section>

      {/* Historia inicial */}
      <section ref={storyRef} className="max-w-2xl mx-auto px-4 py-12 md:py-16">
        <motion.div
          className="rounded-2xl p-6 md:p-8 shadow-lg"
          style={{
            backgroundColor: 'white',
            border: '1px solid var(--theme-accent)',
            color: 'var(--theme-text)',
          }}
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.9 }}
        >
          <h2 className="text-xl font-semibold text-[var(--theme-primary)] mb-4">
            Nuestra historia
          </h2>
          <p className="leading-relaxed opacity-90">
            Todo comenzó el <strong>29 de noviembre de 2024</strong>.
            Ese día no parecía diferente, pero el destino ya estaba escribiendo algo increíble para nosotros.
            <br></br>

            Desde entonces, cada momento contigo se ha convertido en uno de mis recuerdos favoritos, y poco a poco fui entendiendo que tú eras alguien especial.

            <br></br>
            <br></br>

            Y luego llegó el <strong>14 de febrero de 2025</strong>…
            el día en que finalmente me atreví a pedirte que fueras mi novia.
            En ese instante supe que no estaba dando un paso cualquiera, estaba eligiendo a la persona indicada, a la que quiero a mi lado siempre.

            Este es un pequeño detalle para celebrar nuestro primer aniversario y recordarte, una vez más, que elegirte fue la mejor decisión de mi vida.

            Te amo. 💖
          </p>
        </motion.div>
      </section>

      <DaysCounter />
      <Timeline />
      <ReasonsSection />
      <ThingsILove />
      <PolaroidMemories />
      <LoveMap />
      <SongSection backgroundRef={backgroundRef} />
      {/* <PhotoGallery /> */}
      <FinalMessage />
    </div>
  )
}
