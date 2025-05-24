import React from 'react'
import Footer from '~/components/global/footer'
import Navbar from '~/components/global/navbar'

function OnboardingLayoutProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed left-0 top-0 z-50 w-full">
        <Navbar
          options={{ logoOnly: true, mainLinks: false, onboardingLinks: true }}
        />
      </div>
      <div className="bg-gradient-to-br from-slate-700 to-slate-950 text-white">
        {children}
      </div>
      <Footer />
    </>
  )
}

export default OnboardingLayoutProvider
