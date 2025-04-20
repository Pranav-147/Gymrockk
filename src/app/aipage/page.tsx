import { Header } from '@/sections/Header'
import React from 'react'
import Hero from "./Hero"
import { Footer } from '@/sections/Footer'
import Title from './Title'
import SampleQ from '@/sections/SampleQ'

export default function Page() {
  return (
    <div className="flex flex-col min-h-screen">
      <Title/>
      <Header/>
      <Hero/>
      <SampleQ />
      {/* Footer will push to the bottom */}
      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  )
}
