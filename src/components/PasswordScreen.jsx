import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Lock } from 'lucide-react'

const VALID_DATES = [
  { dd: '29', mm: '11', yyyy: '2024' },
  // { dd: '14', mm: '02', yyyy: '2025' },
]

function isValidDate(dd, mm, yyyy) {
  return VALID_DATES.some(
    (d) => d.dd === dd && d.mm === mm && d.yyyy === yyyy
  )
}

export default function PasswordScreen({ onSuccess }) {
  const [dd, setDd] = useState('')
  const [mm, setMm] = useState('')
  const [yyyy, setYyyy] = useState('')
  const [error, setError] = useState(false)

  const handleOpen = useCallback(
    (e) => {
      e.preventDefault()
      const d = dd.padStart(2, '0').slice(-2)
      const m = mm.padStart(2, '0').slice(-2)
      const y = yyyy.padStart(4, '0').slice(-4)
      if (isValidDate(d, m, y)) {
        setError(false)
        onSuccess()
      } else {
        setError(true)
      }
    },
    [dd, mm, yyyy, onSuccess]
  )

  const handleChange = (value, maxLen, setter) => {
    const digits = value.replace(/\D/g, '').slice(0, maxLen)
    setter(digits)
    setError(false)
  }

  return (
    <motion.div
      className="min-h-screen flex flex-col items-center justify-center relative z-10 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="w-full max-w-sm rounded-2xl shadow-xl p-6 md:p-8"
        style={{
          backgroundColor: 'var(--theme-background)',
          border: '1px solid var(--theme-accent)',
        }}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex justify-center mb-4">
          <Lock className="w-10 h-10 text-[var(--theme-primary)]" strokeWidth={1.5} />
        </div>
        <p className="text-center text-[var(--theme-text)] mb-6 leading-relaxed">
          Solo tú puedes abrir esto... ¿Recuerdas el día que nos conocimos?
        </p>

        <form onSubmit={handleOpen} className="space-y-4">
          <div className="flex gap-2 justify-center items-center flex-wrap">
            <input
              type="text"
              inputMode="numeric"
              placeholder="DD"
              value={dd}
              onChange={(e) => handleChange(e.target.value, 2, setDd)}
              maxLength={2}
              className="w-14 sm:w-16 px-2 py-3 rounded-xl border-2 text-center text-lg focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)]"
              style={{
                borderColor: error ? '#dc2626' : 'var(--theme-primary)',
                backgroundColor: 'white',
                color: 'var(--theme-text)',
              }}
              aria-label="Día"
            />
            <span className="text-[var(--theme-text-muted)] font-medium">/</span>
            <input
              type="text"
              inputMode="numeric"
              placeholder="MM"
              value={mm}
              onChange={(e) => handleChange(e.target.value, 2, setMm)}
              maxLength={2}
              className="w-14 sm:w-16 px-2 py-3 rounded-xl border-2 text-center text-lg focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)]"
              style={{
                borderColor: error ? '#dc2626' : 'var(--theme-primary)',
                backgroundColor: 'white',
                color: 'var(--theme-text)',
              }}
              aria-label="Mes"
            />
            <span className="text-[var(--theme-text-muted)] font-medium">/</span>
            <input
              type="text"
              inputMode="numeric"
              placeholder="AAAA"
              value={yyyy}
              onChange={(e) => handleChange(e.target.value, 4, setYyyy)}
              maxLength={4}
              className="w-20 sm:w-24 px-2 py-3 rounded-xl border-2 text-center text-lg focus:outline-none focus:ring-2 focus:ring-[var(--theme-accent)]"
              style={{
                borderColor: error ? '#dc2626' : 'var(--theme-primary)',
                backgroundColor: 'white',
                color: 'var(--theme-text)',
                minWidth: '4rem',
              }}
              aria-label="Año"
            />
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.p
                key="error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-center text-red-500 text-sm flex items-center justify-center gap-2"
              >
                <span role="img" aria-label="triste">😢</span>
                Esa no es nuestra fecha... intenta otra vez
              </motion.p>
            )}
          </AnimatePresence>

          <button
            type="submit"
            className="w-full py-3 rounded-xl font-medium text-white transition opacity-90 hover:opacity-100 flex items-center justify-center gap-2 mt-4"
            style={{ backgroundColor: 'var(--theme-primary)' }}
          >
            Abrir regalo
          </button>
        </form>
      </motion.div>
    </motion.div>
  )
}
