import { useRef, useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Music, Volume2 } from 'lucide-react'

// Música de fondo (suena sola al cargar la web)
const BACKGROUND_SRC = `${import.meta.env.BASE_URL}/music.mp3`
// Música del botón (suena al hacer clic; puede ser "nuestra canción")
const BUTTON_SONG_SRC = `${import.meta.env.BASE_URL}/song.mp3`

export default function BackgroundMusic({ backgroundRef }) {
  const buttonSongRef = useRef(null)
  const [mode, setMode] = useState(null) // 'background' | 'button' | null (nada o bloqueado)

  // const playBackground = () => {
  //   if (!backgroundRef.current || !buttonSongRef.current) return
  //   buttonSongRef.current.pause()
  //   buttonSongRef.current.currentTime = 0
  //   backgroundRef.current.play().then(() => setMode('background')).catch(() => {})
  // }

  // const playButtonSong = () => {
  //   if (!backgroundRef.current || !buttonSongRef.current) return
  //   backgroundRef.current.pause()
  //   backgroundRef.current.currentTime = 0
  //   buttonSongRef.current.play().then(() => setMode('button')).catch(() => {})
  // }

  // const handleClick = () => {
  //   if (mode === null) {
  //     playBackground()
  //     return
  //   }
  //   if (mode === 'background') {
  //     playButtonSong()
  //     return
  //   }
  //   playBackground()
  // }

  // useEffect(() => {
  //   const bg = backgroundRef.current
  //   if (!bg) return
  //   bg.loop = true
  //   bg.volume = 0.5
  //   bg.play().then(() => setMode('background')).catch(() => {})
  // }, [])

  // useEffect(() => {
  //   const song = buttonSongRef.current
  //   const bg = backgroundRef.current
  //   if (!song || !bg) return
  //   const onEnded = () => {
  //     song.pause()
  //     song.currentTime = 0
  //     bg.play().then(() => setMode('background')).catch(() => {})
  //   }
  //   song.addEventListener('ended', onEnded)
  //   return () => song.removeEventListener('ended', onEnded)
  // }, [])

  useEffect(() => {
    const unlockAudio = () => {
      // backgroundRef.current.play();
      backgroundRef.current.currentTime = 10; // empieza en 1:00
      backgroundRef.current.play();
      window.removeEventListener("pointerdown", unlockAudio);
    };

    window.addEventListener("pointerdown", unlockAudio);
  }, []);

  // useEffect(() => {
  //   const audio = backgroundRef.current;

  //   if (audio) {
  //     audio.currentTime = 10; // 90 segundos = 1:30
  //     audio.play();
  //   }
  // }, []);

  return (
    <>
      <audio
        ref={backgroundRef}
        src={BACKGROUND_SRC}
        loop
      />
      {/* <audio ref={buttonSongRef} src={BUTTON_SONG_SRC} /> */}
      {/* 
      <motion.button
        type="button"
        onClick={handleClick}
        className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-full shadow-lg flex items-center justify-center text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[var(--theme-accent)]"
        style={{ backgroundColor: 'var(--theme-primary)' }}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        aria-label={mode === 'button' ? 'Volver a música de fondo' : 'Poner nuestra canción'}
        title={mode === 'button' ? 'Volver a música de fondo' : 'Escuchar nuestra canción'}
      >
        {mode === 'button' ? (
          <Volume2 className="w-5 h-5" />
        ) : (
          <Music className="w-5 h-5" />
        )}
      </motion.button> */}
    </>
  )
}
