import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { MarqueeTicker } from './components/MarqueeTicker';
import { WhyDopamint } from './components/WhyDopamint';
import { Pipeline } from './components/Pipeline';
import { Ecosystem } from './components/Ecosystem';
import { WhoSection } from './components/WhoSection';
import { Developers } from './components/Developers';
import { Pricing } from './components/Pricing';
import { CTASection } from './components/CTASection';
import { WhatIsDopamint } from './components/WhatIsDopamint';
import { FinalCTA } from './components/FinalCTA';
import { Footer } from './components/Footer';
import { useEffect } from 'react';

export default function App() {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MarqueeTicker />
        <Ecosystem />
        <WhatIsDopamint />
        <WhyDopamint />
        <Pipeline />
        <WhoSection />
        <CTASection />
        <Developers />
        <Pricing />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
