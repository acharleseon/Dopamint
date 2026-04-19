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
import { Footer } from './components/Footer';

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MarqueeTicker />
        <WhyDopamint />
        <Pipeline />
        <Ecosystem />
        <WhoSection />
        <Developers />
        <Pricing />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
