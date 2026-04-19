import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger);

// Global GSAP performance config — reduces layout recalcs with Spline on page
ScrollTrigger.config({
  ignoreMobileResize: true,   // prevents scroll reset on mobile keyboard open
  limitCallbacks: true,       // skips redundant callbacks between frames
});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
