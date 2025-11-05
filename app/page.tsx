"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Play, Settings, Users } from "lucide-react"
import Image from "next/image"
import ParticleCanvas from "@/components/ParticleCanvas"
import UnoCardsBackground from "@/components/UnoCardsBackground"
import GalaxySpiral from "@/components/GalaxySpiral"
import SettingsModal from "@/components/SettingsModal"
import GameRoomMenu from "@/components/game-room-menu"
import HalftoneWaves from "@/components/halftone-waves"

export default function HomePage() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false)
  const [currentScreen, setCurrentScreen] = useState<'main' | 'game'>('main')

  return (
    <main className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{background: 'radial-gradient(circle at center, #ff8c00 0%, #ff4500 20%, #dc2626 40%, #8b0000 80%, #000000 100%)'}}>
      {/* Spiral gradient background */}
      <div className="spiral-background"></div>
      
      {/* Galaxy spiral background */}
      <GalaxySpiral />
      
      {/* Floating particles canvas */}
      <ParticleCanvas />

      {/* UNO Cards floating animation */}
      <UnoCardsBackground />

      <div className="absolute top-8 left-8 z-20 animate-float">
        <Image 
          src="/uno-logo.png" 
          alt="UNO Logo" 
          width={384}
          height={192}
          className="w-32 h-auto drop-shadow-2xl md:w-40 ml-0 lg:w-96" 
          priority
        />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-4">
        <div className="glass-menu-card animate-fade-in px-0 my-0 relative z-10">
          {/* Corner shine effects */}
          <span className="shine shine-top"></span>
          <span className="shine shine-bottom"></span>
          <span className="glow glow-top"></span>
          <span className="glow glow-bottom"></span>

          <div className="flex flex-col gap-4 min-w-[320px] relative z-10">
            {/* Play Button - Large and full width */}
            <Button size="lg" className="glass-button glass-button-primary glass-button-large group" onClick={() => setCurrentScreen('game')}>
              <Play className="mr-2 transition-transform group-hover:scale-110 h-10 w-10" />
              <span className="text-xl font-bold tracking-wide">JUGAR</span>
            </Button>

            {/* Settings and Developers - Side by side */}
            <div className="grid grid-cols-2 gap-3">
              <Button 
                size="lg" 
                className="glass-button glass-button-secondary group"
                onClick={() => setIsSettingsOpen(true)}
              >
                <Settings className="mr-1.5 h-5 w-5 transition-transform group-hover:rotate-90" />
                <span className="text-sm font-semibold">Configuración</span>
              </Button>

              <Button size="lg" className="glass-button glass-button-tertiary group">
                <Users className="mr-1.5 h-5 w-5 transition-transform group-hover:scale-110" />
                <span className="text-sm font-semibold">Desarrolladores</span>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {currentScreen === 'game' && (
  <div className="fixed inset-0 z-50">
    <HalftoneWaves />
    <div className="absolute inset-0 z-[60] flex items-center justify-center w-full h-full p-4">
      <GameRoomMenu onBack={() => setCurrentScreen('main')} />
    </div>
  </div>
)}

      {/* Settings Modal */}
      <SettingsModal 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
      />
    </main>
  )
}
