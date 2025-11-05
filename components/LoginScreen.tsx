"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Facebook, Apple } from "lucide-react"
import Image from "next/image"

interface LoginScreenProps {
  onLoginSuccess: (userData: { username?: string; isGuest: boolean }) => void
}

export default function LoginScreen({ onLoginSuccess }: LoginScreenProps) {
  const [activeTab, setActiveTab] = useState<"login" | "guest">("login")
  const [guestNickname, setGuestNickname] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  // Handle Guest Login
  const handleGuestLogin = () => {
    if (guestNickname.trim().length < 3) {
      alert("El nickname debe tener al menos 3 caracteres")
      return
    }
    onLoginSuccess({ username: guestNickname, isGuest: true })
  }

  // Handle Email Login
  const handleEmailLogin = async () => {
    setIsLoading(true)
    try {
      // Aquí irá tu código de autenticación con email
      console.log("Email login clicked")
      // Placeholder para tu código
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle Google Login
  const handleGoogleLogin = async () => {
    setIsLoading(true)
    try {
      // Aquí irá tu código de autenticación con Google
      console.log("Google login clicked")
      // Placeholder para tu código
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle Facebook Login
  const handleFacebookLogin = async () => {
    setIsLoading(true)
    try {
      // Aquí irá tu código de autenticación con Facebook
      console.log("Facebook login clicked")
      // Placeholder para tu código
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Handle Apple Login
  const handleAppleLogin = async () => {
    setIsLoading(true)
    try {
      // Aquí irá tu código de autenticación con Apple
      console.log("Apple login clicked")
      // Placeholder para tu código
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="glass-login-container">
      <span className="shine shine-top"></span>
      <span className="shine shine-bottom"></span>
      <span className="glow glow-top"></span>
      <span className="glow glow-bottom"></span>
      <span className="glow glow-bright glow-top"></span>
      <span className="glow glow-bright glow-bottom"></span>

      <div className="inner">
        {/* Logo Section */}
        <div className="logo-section">
          <Image 
            src="/uno-logo.png" 
            alt="UNO Logo" 
            width={200}
            height={100}
            className="uno-logo"
          />
          <h1 className="welcome-title">¡BIENVENIDO A UNO!</h1>
        </div>

        {/* Tab Buttons */}
        <div className="tab-buttons">
          <button
            className={`tab-button ${activeTab === "login" ? "active" : ""}`}
            onClick={() => setActiveTab("login")}
          >
            INICIAR SESIÓN
          </button>
          <button
            className={`tab-button ${activeTab === "guest" ? "active" : ""}`}
            onClick={() => setActiveTab("guest")}
          >
            INVITADO
          </button>
        </div>

        {/* Content Sections */}
        <div className="tab-content">
          {/* Login Tab */}
          {activeTab === "login" && (
            <div className="login-section">
              <h2 className="section-title">Elige tu método de acceso</h2>

              {/* Email Button */}
              <Button
                className="auth-button email-button glass-button"
                onClick={handleEmailLogin}
                disabled={isLoading}
              >
                <Mail className="w-5 h-5 mr-3" />
                <span>Continuar con Email</span>
              </Button>

              {/* Google Button */}
              <Button
                className="auth-button google-button glass-button"
                onClick={handleGoogleLogin}
                disabled={isLoading}
              >
                <svg className="w-5 h-5 mr-3" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Continuar con Google</span>
              </Button>

              {/* Facebook Button */}
              <Button
                className="auth-button facebook-button glass-button"
                onClick={handleFacebookLogin}
                disabled={isLoading}
              >
                <Facebook className="w-5 h-5 mr-3" />
                <span>Continuar con Facebook</span>
              </Button>

              {/* Apple Button */}
              <Button
                className="auth-button apple-button glass-button"
                onClick={handleAppleLogin}
                disabled={isLoading}
              >
                <Apple className="w-5 h-5 mr-3" />
                <span>Continuar con Apple</span>
              </Button>
            </div>
          )}

          {/* Guest Tab */}
          {activeTab === "guest" && (
            <div className="guest-section">
              <h2 className="section-title">Ingresa tu Nickname</h2>

              <div className="nickname-input-group">
                <Input
                  type="text"
                  placeholder="Tu Nickname"
                  value={guestNickname}
                  onChange={(e) => setGuestNickname(e.target.value)}
                  className="glass-input nickname-input"
                  maxLength={20}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleGuestLogin()
                    }
                  }}
                />
                <div className="character-count">
                  {guestNickname.length}/20
                </div>
              </div>

              <div className="nickname-info">
                <p>Mínimo 3 caracteres</p>
                <p>Máximo 20 caracteres</p>
              </div>

              <Button
                className="guest-submit-button glass-button bg-emerald-600 hover:bg-emerald-700"
                onClick={handleGuestLogin}
                disabled={isLoading || guestNickname.trim().length < 3}
              >
                <span className="text-lg font-bold">CONTINUAR COMO INVITADO</span>
              </Button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        .glass-login-container {
          --hue1: 45;
          --hue2: 0;
          --border: 1px;
          --border-color: hsl(var(--hue2), 12%, 20%);
          --radius: 22px;
          --ease: cubic-bezier(0.5, 1, 0.89, 1);
          
          position: relative;
          width: 90vw;
          max-width: 500px;
          min-height: 600px;
          display: flex;
          flex-direction: column;
          border-radius: var(--radius);
          border: var(--border) solid var(--border-color);
          padding: 2em;
          background: linear-gradient(235deg, hsl(var(--hue1) 50% 10% / 0.8), hsl(var(--hue1) 50% 10% / 0) 33%), 
                      linear-gradient(45deg , hsl(var(--hue2) 50% 10% / 0.8), hsl(var(--hue2) 50% 10% / 0) 33%), 
                      linear-gradient(hsl(220deg 25% 4.8% / 0.66));
          backdrop-filter: blur(12px);
          box-shadow: hsl(var(--hue2) 50% 2%) 0px 10px 16px -8px, hsl(var(--hue2) 50% 4%) 0px 20px 36px -14px;
        }

        .shine,
        .glow {
          --hue: var(--hue1);
        }

        .shine-bottom,
        .glow-bottom {
          --hue: var(--hue2);
          --conic: 135deg;
        }

        .shine,
        .shine::before,
        .shine::after {
          pointer-events: none;
          border-radius: 0;
          border-top-right-radius: inherit;
          border-bottom-left-radius: inherit;
          border: 1px solid transparent;
          width: 75%;
          height: auto;
          min-height: 0px;
          aspect-ratio: 1;
          display: block;
          position: absolute;
          right: calc(var(--border) * -1);
          top: calc(var(--border) * -1);
          left: auto;
          z-index: 1;
          --start: 12%;
          background: conic-gradient(
            from var(--conic, -45deg) at center in oklch,
            transparent var(--start,0%), hsl( var(--hue), var(--sat,80%), var(--lit,60%)), transparent  var(--end,50%) 
          ) border-box;
          mask: linear-gradient(transparent), linear-gradient(black);
          mask-repeat: no-repeat;
          mask-clip: padding-box, border-box;
          mask-composite: subtract;
          animation: glow 1s var(--ease) both;
        }

        .shine::before,
        .shine::after {
          content: "";
          width: auto;
          inset: -2px;
          mask: none;
        }
            
        .shine::after { 
          z-index: 2;
          --start: 17%;
          --end: 33%;
          background: conic-gradient(
            from var(--conic, -45deg) at center in oklch,
            transparent var(--start,0%), hsl( var(--hue), var(--sat,80%), var(--lit,85%)), transparent var(--end,50%) 
          );
        }

        .shine-bottom {
          top: auto;
          bottom: calc(var(--border) * -1);
          left: calc(var(--border) * -1);
          right: auto;
          animation-delay: 0.1s;
          animation-duration: 1.8s;
        }

        .glow {
          pointer-events: none;
          border-top-right-radius: calc(var(--radius) * 2.5);
          border-bottom-left-radius: calc(var(--radius) * 2.5);
          border: calc(var(--radius) * 1.25) solid transparent;
          inset: calc(var(--radius) * -2);
          width: 75%;
          height: auto;
          min-height: 0px;
          aspect-ratio: 1;
          display: block;
          position: absolute;
          left: auto;
          bottom: auto;
          opacity: 1;
          filter: blur(12px) saturate(1.25) brightness(0.5);
          mix-blend-mode: plus-lighter;
          z-index: 3;
          animation: glow 1s var(--ease) both;
          animation-delay: 0.2s;
        }

        .glow.glow-bottom {
          inset: calc(var(--radius) * -2);
          top: auto;
          right: auto;
          animation-delay: 0.3s;
        }

        .glow::before, 
        .glow::after {
          content: "";
          position: absolute;
          inset: 0;
          border: inherit;
          border-radius: inherit;
          background: conic-gradient(
            from var(--conic, -45deg) at center in oklch,
            transparent var(--start,0%), hsl( var(--hue), var(--sat,95%), var(--lit,60%)), transparent  var(--end,50%) 
          ) border-box;
          mask: linear-gradient(transparent), linear-gradient(black);
          mask-repeat: no-repeat;
          mask-clip: padding-box, border-box;
          mask-composite: subtract;
          filter: saturate(2) brightness(1);
        }

        .glow::after {
          --lit: 70%;
          --sat: 100%;
          --start: 15%;
          --end: 35%;
          border-width: calc(var(--radius) * 1.75);
          border-radius: calc(var(--radius) * 2.75);
          inset: calc(var(--radius) * -0.25);
          z-index: 4;
          opacity: 0.75;
        }

        .glow-bright {
          --lit: 80%;
          --sat: 100%;
          --start: 13%;
          --end: 37%;
          border-width: 5px;
          border-radius: calc(var(--radius) + 2px);
          inset: -7px;
          left: auto;
          filter: blur(2px) brightness(0.66);
          animation-delay: 0.1s;
          animation-duration: 1.5s;
        }

        .glow-bright::after {
          content: none;
        }

        .glow-bright.glow-bottom {
          inset: -7px;
          right: auto;
          top: auto;
          animation-delay: 0.3s;
          animation-duration: 1.1s;
        }

        @keyframes glow {
          0% { opacity: 0; }
          3% { opacity: 1; }
          10% { opacity: 0; }
          12% { opacity: 0.7; }
          16% {
            opacity: 0.3;
            animation-timing-function: var(--ease);
          }
          100% {
            opacity: 1;
            animation-timing-function: var(--ease);
          }
        }

        .inner {
          position: relative;
          z-index: 10;
          display: flex;
          flex-direction: column;
          gap: 2rem;
        }

        .logo-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
          text-align: center;
        }

        .uno-logo {
          object-fit: contain;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
        }

        .welcome-title {
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
          letter-spacing: 0.1em;
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }

        .tab-buttons {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 0.75rem;
          background: rgba(0, 0, 0, 0.3);
          padding: 0.5rem;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .tab-button {
          padding: 0.75rem 1rem;
          border: none;
          border-radius: 8px;
          background: transparent;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 600;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 0.05em;
        }

        .tab-button:hover {
          color: white;
          background: rgba(255, 255, 255, 0.05);
        }

        .tab-button.active {
          background: linear-gradient(90deg, rgba(239, 68, 68, 0.8), rgba(220, 38, 38, 0.8));
          color: white;
          border: 1px solid rgba(239, 68, 68, 0.5);
          box-shadow: 0 0 15px rgba(239, 68, 68, 0.3);
        }

        .tab-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
          min-height: 300px;
        }

        .login-section,
        .guest-section {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .section-title {
          font-size: 1.125rem;
          font-weight: 600;
          color: white;
          text-align: center;
          letter-spacing: 0.05em;
        }

        .auth-button {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          padding: 1rem;
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          background: rgba(0, 0, 0, 0.3);
          color: white;
          font-weight: 600;
          font-size: 0.95rem;
          cursor: pointer;
          transition: all 0.3s ease;
          letter-spacing: 0.03em;
        }

        .auth-button:hover:not(:disabled) {
          background: rgba(0, 0, 0, 0.5);
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
          box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
        }

        .auth-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .email-button {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.3), rgba(79, 70, 229, 0.3));
          border-color: rgba(99, 102, 241, 0.5);
        }

        .email-button:hover:not(:disabled) {
          background: linear-gradient(135deg, rgba(99, 102, 241, 0.5), rgba(79, 70, 229, 0.5));
          border-color: rgba(99, 102, 241, 0.7);
        }

        .google-button {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.3), rgba(37, 99, 235, 0.3));
          border-color: rgba(59, 130, 246, 0.5);
        }

        .google-button:hover:not(:disabled) {
          background: linear-gradient(135deg, rgba(59, 130, 246, 0.5), rgba(37, 99, 235, 0.5));
          border-color: rgba(59, 130, 246, 0.7);
        }

        .facebook-button {
          background: linear-gradient(135deg, rgba(30, 144, 255, 0.3), rgba(65, 105, 225, 0.3));
          border-color: rgba(30, 144, 255, 0.5);
        }

        .facebook-button:hover:not(:disabled) {
          background: linear-gradient(135deg, rgba(30, 144, 255, 0.5), rgba(65, 105, 225, 0.5));
          border-color: rgba(30, 144, 255, 0.7);
        }

        .apple-button {
          background: linear-gradient(135deg, rgba(156, 163, 175, 0.3), rgba(107, 114, 128, 0.3));
          border-color: rgba(156, 163, 175, 0.5);
        }

        .apple-button:hover:not(:disabled) {
          background: linear-gradient(135deg, rgba(156, 163, 175, 0.5), rgba(107, 114, 128, 0.5));
          border-color: rgba(156, 163, 175, 0.7);
        }

        .nickname-input-group {
          position: relative;
          width: 100%;
        }

        .nickname-input {
          width: 100%;
          padding: 1rem;
          font-size: 1.125rem;
          text-align: center;
          letter-spacing: 0.05em;
          background: linear-gradient(to bottom, hsl(45 20% 20% / 0.2) 50%, hsl(45 50% 50% / 0.1) 180%);
          border: 1px solid hsl(0 13% 18.5% / 0.5);
          border-radius: 10px;
          color: white;
        }

        .nickname-input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .nickname-input:focus {
          outline: none;
          border-color: rgba(239, 68, 68, 0.7);
          box-shadow: 0 0 15px rgba(239, 68, 68, 0.3);
          background: linear-gradient(to bottom, hsl(45 20% 25% / 0.3) 50%, hsl(45 50% 50% / 0.15) 180%);
        }

        .character-count {
          position: absolute;
          bottom: 0.5rem;
          right: 1rem;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 600;
        }

        .nickname-info {
          text-align: center;
          font-size: 0.875rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .nickname-info p {
          margin: 0.25rem 0;
        }

        .guest-submit-button {
          width: 100%;
          padding: 1.25rem;
          font-size: 1.125rem;
          font-weight: 700;
          letter-spacing: 0.08em;
          border-radius: 10px;
          margin-top: 1rem;
          transition: all 0.3s ease;
        }

        .guest-submit-button:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 24px rgba(16, 185, 129, 0.4);
        }

        .guest-submit-button:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        :global(.glass-input) {
          background: linear-gradient(to bottom, hsl(var(--hue1) 20% 20% / 0.2) 50%, hsl(var(--hue1) 50% 50% / 0.1) 180%);
          border: 1px solid hsl(var(--hue2) 13% 18.5% / 0.5);
          color: white;
        }

        :global(.glass-button) {
          background: linear-gradient(90deg, hsl(var(--hue1) 29% 13% / 0.5), hsl(var(--hue1) 30% 15% / 0.5) 24% 32%, hsl(var(--hue1) 5% 7% / 0) 95%);
          border: 1px solid hsl(var(--hue2) 13% 18.5% / 0.3);
          color: #d1d5db;
          transition: all 0.3s ease;
        }

        :global(.glass-button:hover:not(:disabled)) {
          color: white;
          background: linear-gradient(90deg, hsl(var(--hue1) 29% 20% / 0.7), hsl(var(--hue1) 30% 22% / 0.7) 24% 32%, hsl(var(--hue1) 5% 10% / 0.2) 95%);
        }
      `}</style>
    </div>
  )
}
