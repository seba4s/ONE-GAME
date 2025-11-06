'use client'

import { GameState } from '@/lib/gameTypes'
import CardComp from './CardComp'

interface GameBoardProps {
  gameState: GameState
  onPlayCard: (playerIndex: number, cardIndex: number) => void
  onDrawCard: () => void
}

export default function GameBoard({
  gameState,
  onPlayCard,
  onDrawCard
}: GameBoardProps) {
  const topDiscard = gameState.discardPile[gameState.discardPile.length - 1]
  const myHand = gameState.players[0].hand
  const topPlayer = gameState.players[1]
  const leftPlayer = gameState.players[2]
  const rightPlayer = gameState.players[3]

  return (
    <div className="w-full h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 flex flex-col items-center justify-center overflow-hidden relative">
      
      {/* TOP PLAYER */}
      <div className="absolute top-8 flex gap-1">
        {topPlayer.hand.map((_, idx) => (
          <div key={`top-${idx}`} style={{ transform: `rotateY(${Math.random() * 20}deg)` }}>
            <CardComp card={topPlayer.hand[idx]} faceDown={true} />
          </div>
        ))}
      </div>

      {/* LEFT PLAYER */}
      <div className="absolute left-8 flex flex-col gap-1">
        {leftPlayer.hand.map((_, idx) => (
          <div key={`left-${idx}`} style={{ transform: `rotateZ(90deg)` }}>
            <CardComp card={leftPlayer.hand[idx]} faceDown={true} />
          </div>
        ))}
      </div>

      {/* RIGHT PLAYER */}
      <div className="absolute right-8 flex flex-col gap-1">
        {rightPlayer.hand.map((_, idx) => (
          <div key={`right-${idx}`} style={{ transform: `rotateZ(-90deg)` }}>
            <CardComp card={rightPlayer.hand[idx]} faceDown={true} />
          </div>
        ))}
      </div>

      {/* CENTER PILES */}
      <div className="flex gap-16 items-center justify-center">
        {/* DRAW PILE */}
        <div className="cursor-pointer relative" onClick={onDrawCard}>
          <div className="absolute -bottom-6 -right-6 bg-blue-500 text-white text-xs font-bold px-2 py-1 rounded">
            {gameState.drawPile.length}
          </div>
          <CardComp card={{ id: 'draw', color: 'black', type: 'wild', display: 'DRAW' }} faceDown={true} />
        </div>

        {/* DISCARD PILE */}
        <div className="relative">
          {topDiscard && <CardComp card={topDiscard} />}
          <div className="absolute -bottom-6 -right-6 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded">
            {gameState.discardPile.length}
          </div>
        </div>
      </div>

      {/* MY HAND */}
      <div className="absolute bottom-8 flex gap-2 px-4 justify-center flex-wrap max-w-full">
        {myHand.map((card, idx) => (
          <div 
            key={card.id}
            style={{ transform: `rotateZ(${(idx - myHand.length/2) * 8}deg)` }}
            className="hover:translate-y-(-2)"
          >
            <CardComp
              card={card}
              onClick={() => onPlayCard(0, idx)}
              isClickable={gameState.currentPlayerIndex === 0}
            />
          </div>
        ))}
      </div>

      {/* TURN INDICATOR */}
      <div className="absolute top-4 left-4 bg-white/20 text-white px-4 py-2 rounded-lg backdrop-blur">
        {gameState.currentPlayerIndex === 0 ? '🔥 YOUR TURN' : `CPU ${gameState.currentPlayerIndex} playing...`}
      </div>
    </div>
  )
}
