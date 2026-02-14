import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { activeTheme } from './theme/useTheme'
import FloatingHearts from './components/FloatingHearts'
import BackgroundMusic from './components/BackgroundMusic'
import GiftBoxScreen from './components/GiftBoxScreen'
import PasswordScreen from './components/PasswordScreen'
import TransitionOpen from './components/TransitionOpen'
import StoryScreen from './components/StoryScreen'

const SCREENS = {
  GIFT_BOX: 'giftBox',
  PASSWORD: 'password',
  TRANSITION: 'transition',
  STORY: 'story',
}

function applyTheme(theme) {
  if (!theme) return
  document.documentElement.style.setProperty('--theme-background', theme.background)
  document.documentElement.style.setProperty('--theme-primary', theme.primary)
  document.documentElement.style.setProperty('--theme-secondary', theme.secondary)
  document.documentElement.style.setProperty('--theme-accent', theme.accent)
  document.documentElement.style.setProperty('--theme-text', theme.text)
  document.documentElement.style.setProperty('--theme-text-muted', theme.textMuted)
}

export default function App() {
  const [screen, setScreen] = useState(SCREENS.GIFT_BOX)
  // const [startMusic, setStartMusic] = useState(false)
  // const [screen, setScreen] = useState(SCREENS.STORY)
  const backgroundRef = useRef(null)

  useEffect(() => {
    applyTheme(activeTheme)
  }, [])

  return (
    <div className="min-h-screen relative">
      <FloatingHearts />
      <BackgroundMusic   backgroundRef={backgroundRef} />

      <AnimatePresence mode="wait">
        {screen === SCREENS.GIFT_BOX && (
          <GiftBoxScreen key="gift" onOpen={() => setScreen(SCREENS.PASSWORD)} />
        )}

        {screen === SCREENS.PASSWORD && (
          <PasswordScreen
            key="password"
            onSuccess={() => setScreen(SCREENS.TRANSITION)}
          />
        )}

        {screen === SCREENS.TRANSITION && (
          <TransitionOpen
            key="transition"
            onComplete={() => setScreen(SCREENS.STORY)}
          />
        )}

        {screen === SCREENS.STORY && (
          <motion.main
            key="story"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <StoryScreen backgroundRef={backgroundRef}/>
          </motion.main>
        )}
      </AnimatePresence>
    </div>
  )
}
