"use client"

import React, { useEffect, useRef } from 'react'

function TransitionProvider({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [])

  return (
    <div 
      ref={ref} 
      className="opacity-0 transition-opacity duration-700"
      style={{ willChange: 'opacity' }}
    >
      {children}
    </div>
  )
}

export default TransitionProvider