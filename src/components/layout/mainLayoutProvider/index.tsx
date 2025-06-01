import React from 'react'
import Footer from '~/components/global/footer'
import Navbar from '~/components/global/navbar'

function MainLayoutProvider({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="fixed left-0 top-0 z-50 w-full">
        <Navbar />
      </div>
      <div className="bg-gradient-to-t from-slate-950 via-slate-900/80 to-transparent text-white bg-opacity-0 min-h-screen">
        {children}
      </div>
      <Footer />
    </>
  )
}

export default MainLayoutProvider
