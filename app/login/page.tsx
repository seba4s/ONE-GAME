"use client"

/**
 * Login Page - Standalone login page
 * URL: /login
 * Ahora usa el mismo background (espiral + cartas + partículas) que la Home.
 */

import LoginScreen from "@/components/LoginScreen"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { useEffect } from "react"
import GalaxySpiral from "@/components/GalaxySpiral"
import ParticleCanvas from "@/components/ParticleCanvas"
import OneCardsBackground from "@/components/OneCardsBackground"

export default function LoginPage() {
  const router = useRouter()
  const { isAuthenticated } = useAuth()

  // Redirect to home if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      router.push('/')
    }
  }, [isAuthenticated, router])

  const handleLoginSuccess = () => {
    router.push('/') // Redirect to home after successful login
  }

  const handleBack = () => {
    router.push('/') // Go back to home
  }

  return (
    <main
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        background:
          'radial-gradient(circle at center, #ff8c00 0%, #ff4500 20%, #dc2626 40%, #8b0000 80%, #000000 100%)',
      }}
    >
      <div className="spiral-background"></div>
      <GalaxySpiral />
      <ParticleCanvas />
      <OneCardsBackground />

      <div className="relative z-10 w-full flex items-center justify-center px-4">
        <LoginScreen onLoginSuccess={handleLoginSuccess} onBack={handleBack} />
      </div>
    </main>
  )
}
