import { useState, useEffect } from 'react'

interface UseTextRotationProps {
  words: string[]
  intervalDuration?: number
  fadeDuration?: number
}

export function useTextRotation({
  words,
  intervalDuration = 3000,
  fadeDuration = 700,
}: UseTextRotationProps) {
  const [currentWordIndex, setCurrentWordIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false)
      setTimeout(() => {
        setCurrentWordIndex((prev) => (prev + 1) % words.length)
        setIsVisible(true)
      }, fadeDuration)
    }, intervalDuration)

    return () => clearInterval(interval)
  }, [words, intervalDuration, fadeDuration])

  return {
    currentWord: words[currentWordIndex],
    isVisible,
  }
}
