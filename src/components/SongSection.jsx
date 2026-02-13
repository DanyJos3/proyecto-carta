import { useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause } from 'lucide-react'

const SPOTIFY_EMBED_URL = '' // Pegar URL de embed de Spotify (ej: https://open.spotify.com/embed/track/...)
const BACKGROUND_SRC = '/song.mp3'


export default function SongSection({backgroundRef}) {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef(null)

  const togglePlay = () => {
    if (!audioRef.current) return
    if (playing) {
      audioRef.current.pause()
      backgroundRef.current.play()
    } else {
      audioRef.current.play()
      backgroundRef.current.pause()

    }
    setPlaying(!playing)
  }

  return (
    <section className="relative z-10 py-16 px-4">
      <motion.div
        className="max-w-xl mx-auto"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[var(--theme-text)] mb-6">
          Canción que me recuerda a ti  🎶
        </h2>
        <p className="text-center text-[var(--theme-text-muted)] mb-8">
        Recuerdo que al inicio de nuestra relación la reproducías a cada momento...
        </p>

        {/* {SPOTIFY_EMBED_URL ? (
          <div className="rounded-3xl overflow-hidden shadow-lg">
            <iframe
              title="Nuestra canción"
              src={SPOTIFY_EMBED_URL}
              width="100%"
              height="152"
              frameBorder="0"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
              className="w-full"
            />
          </div>
        ) : ( */}
        <motion.div
          className="rounded-3xl p-8 shadow-lg border flex flex-col items-center gap-4"
          style={{
            backgroundColor: 'var(--theme-background)',
            borderColor: 'var(--theme-accent)',
          }}
        >
          <audio
            ref={audioRef}
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            src= {BACKGROUND_SRC}
            className="hidden"
          />
          <button
            type="button"
            onClick={togglePlay}
            className="w-16 h-16 rounded-full flex items-center justify-center text-white shadow-lg hover:shadow-xl transition-shadow"
            style={{ backgroundColor: 'var(--theme-primary)' }}
            aria-label={playing ? 'Pausar' : 'Reproducir'}
          >
            {playing ? <Pause className="w-8 h-8" /> : <Play className="w-8 h-8 ml-1" />}
          </button>
          <p className="text-sm text-[var(--theme-text-muted)] text-center">
            Click para reproducir
          </p>
        </motion.div>
        {/* )} */}
      </motion.div>
    </section>
  )
}
