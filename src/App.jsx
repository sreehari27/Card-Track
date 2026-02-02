import { useState, useEffect } from 'react'
import reactLogo from './assets/logo.png'
import PWABadge from './PWABadge.jsx'
import Home from './screens/Home.jsx'

function App() {

  useEffect(() => {
    // App opened
    if (window.gtag) {
      window.gtag("event", "app_open");
    }

    // PWA installed
    window.addEventListener("appinstalled", () => {
      if (window.gtag) {
        window.gtag("event", "pwa_installed");
      }
    });
  }, []);

  return (
    <>
      <div>
         <Home />
      </div>
      <PWABadge />
    </>
  )
}

export default App
