import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

const START_DATE = new Date('2025-11-27T00:00:00')

function useTimeTogether() {
  const [diff, setDiff] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const tick = () => {
      const now = new Date()
      const total = Math.max(0, Math.floor((now - START_DATE) / 1000))
      const seconds = total % 60
      const minutes = Math.floor(total / 60) % 60
      const hours = Math.floor(total / 3600) % 24
      const days = Math.floor(total / 86400)
      setDiff({ days, hours, minutes, seconds })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  return diff
}

function Block({ value, label }) {
  return (
    <div className="flex flex-col items-center rounded-2xl px-4 py-5 min-w-[4.5rem] shadow-lg" style={{ backgroundColor: 'var(--theme-primary)', color: 'white' }}>
      <span className="text-2xl md:text-3xl font-bold tabular-nums">{String(value).padStart(2, '0')}</span>
      <span className="text-xs mt-1 opacity-90">{label}</span>
    </div>
  )
}

export default function TimeTogether() {
  const { days, hours, minutes, seconds } = useTimeTogether()

  return (
    <section className="relative z-10 py-16 px-4">
      <motion.div
        className="max-w-2xl mx-auto text-center"
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--theme-text)] mb-2">
          Tiempo juntos
        </h2>
        <p className="text-[var(--theme-text-muted)] mb-8">
          Desde el día que nos conocimos — 27 de noviembre de 2025
        </p>
        <div className="flex flex-wrap justify-center gap-3 md:gap-4">
          <Block value={days} label="días" />
          <Block value={hours} label="horas" />
          <Block value={minutes} label="min" />
          <Block value={seconds} label="seg" />
        </div>
      </motion.div>
    </section>
  )
}
