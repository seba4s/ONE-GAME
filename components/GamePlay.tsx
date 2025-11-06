"use client"

import { useState, useEffect } from "react"
import GameBoard from "./GameBoard"
import { 
  initializeGame, 
  playCardAction, 
  drawCardAction, 
  getNextPlayer 
} from "@/lib/GameLogic"

interface GameState {
  playerHands: string[][]
  drawPile: string[]
  discardPile: string[]
  currentPlayer: number
}

export default function GamePlay() {
  const [gameState, setGameState] = useState<GameState | null>(null)

  // Inicializar juego
  useEffect(() => {
    const initialState = initializeGame()
    setGameState(initialState)
  }, [])

  const handleDrawCard = () => {
    if (!gameState) return

    const { playerHands, drawPile } = drawCardAction(
      gameState.playerHands,
      gameState.drawPile,
      gameState.currentPlayer
    )

    const nextPlayer = getNextPlayer(gameState.currentPlayer)

    setGameState({
      playerHands,
      drawPile,
      discardPile: gameState.discardPile,
      currentPlayer: nextPlayer,
    })
  }

  const handlePlayCard = (playerIndex: number, cardIndex: number) => {
    if (!gameState || playerIndex !== gameState.currentPlayer) return

    const { playerHands, discardPile } = playCardAction(
      gameState.playerHands,
      gameState.discardPile,
      playerIndex,
      cardIndex
    )

    const nextPlayer = getNextPlayer(gameState.currentPlayer)

    setGameState({
      playerHands,
      drawPile: gameState.drawPile,
      discardPile,
      currentPlayer: nextPlayer,
    })
  }

  if (!gameState) {
    return <div>Cargando juego...</div>
  }

  return (
    <GameBoard
      playerHands={gameState.playerHands}
      drawPile={gameState.drawPile}
      discardPile={gameState.discardPile}
      currentPlayer={gameState.currentPlayer}
      onDrawCard={handleDrawCard}
      onPlayCard={handlePlayCard}
    />
  )
}
