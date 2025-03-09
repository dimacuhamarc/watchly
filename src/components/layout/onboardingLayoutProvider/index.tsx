import React from 'react'
import Footer from '~/components/global/footer'
import Navbar from '~/components/global/navbar'

function OnboardingLayoutProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50">
        <Navbar options={{ logoOnly: true, mainLinks: false, onboardingLinks: true }} />
      </div>
      <div className="bg-gradient-to-br from-slate-700 to-slate-950 text-white">
        {children}
      </div>
      <Footer />
    </>
  )
}

export default OnboardingLayoutProvider
