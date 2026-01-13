import React from 'react'
import Header from '../../Componenets/Header'
import HeroSection from './HeroSection'
import AboutSection from './AboutSection'
import TripsSection from './TripsSection'
import HotelsSection from './HotelsSection'
import CTASection from './CTASection'

const LandingPage = () => {
  return (
    <div>
      <Header />
      <HeroSection />
      <AboutSection />
      <TripsSection />
      <HotelsSection />
      <CTASection />
    </div>
  )
}

export default LandingPage