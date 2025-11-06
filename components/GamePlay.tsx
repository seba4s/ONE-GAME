'use client'

import { useState, useEffect } from 'react'
import { GameState } from '@/lib/gameTypes'
import { initializeGame, playCard, drawCard, getTopDiscard, canPlayCard } from '@/lib/gameEngine'
import GameRoom from './GameRoom'

export default function GamePlay() {
  const [gameState, setGameState] = useState<GameState | null>(null)

  // Inicializar juego al montar
  useEffect(() => {
    const state = initializeGame(4)
    setGameState(state)
  }, [])

  const handlePlayCard = (playerIndex: number, cardIndex: number) => {
    if (!gameState || playerIndex !== gameState.currentPlayerIndex) return

    const topDiscard = getTopDiscard(gameState)
    const card = gameState.players[playerIndex].hand[cardIndex]

    if (!canPlayCard(card, topDiscard)) return

    const newState = playCard(gameState, playerIndex, cardIndex)
    setGameState(newState)
  }

  const handleDrawCard = () => {
    if (!gameState) return
    const newState = drawCard(gameState, gameState.currentPlayerIndex)
    setGameState(newState)
  }

  if (!gameState) {
    return (
      <div className="w-full h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-2xl">Inicializando juego...</div>
      </div>
    )
  }

  return (
    <GameRoom
      gameState={gameState}
      onPlayCard={handlePlayCard}
      onDrawCard={handleDrawCard}
    />
  )
}
