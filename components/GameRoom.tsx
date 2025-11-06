'use client'

import { GameState } from '@/lib/gameTypes'

interface GameRoomProps {
  gameState: GameState
  onPlayCard: (playerIndex: number, cardIndex: number) => void
  onDrawCard: () => void
}

export default function GameRoom({
  gameState,
  onPlayCard,
  onDrawCard
}: GameRoomProps) {
  
  // Convertir card string a color class
  const getCardColor = (cardStr: string) => {
    if (cardStr.includes('r')) return 'red'
    if (cardStr.includes('y')) return 'yellow' 
    if (cardStr.includes('b')) return 'blue'
    if (cardStr.includes('g')) return 'green'
    if (cardStr.includes('w')) return 'black'
    return 'black'
  }

  // Obtener número/símbolo de la carta
  const getCardDisplay = (cardStr: string) => {
    if (cardStr.includes('d2')) return '+2'
    if (cardStr.includes('s')) return 'SKIP'
    if (cardStr.includes('r') && cardStr.length > 2) return 'REV'
    if (cardStr.includes('w+4')) return 'W+4'
    if (cardStr === 'w') return 'W'
    return cardStr.replace(/[rgby]/g, '')
  }

  const topDiscard = gameState.discardPile[gameState.discardPile.length - 1]
  const gameColor = getCardColor(topDiscard.display)

  return (
    <>
      {/* CSS Styles */}
      <style jsx>{`
        body {
          margin: 0;
          padding: 0;
        }

        .game-field {
          height: 100vh;
          display: grid;
          justify-content: center;
          align-content: center;
          grid-gap: 1em;
          grid-template-columns: 150px 350px 150px;
          grid-template-rows: 150px 350px 150px;
          background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
          font-family: Arial, sans-serif;
          position: relative;
        }

        .card {
          width: 80px;
          height: 123px;
          border: 2px solid #444;
          border-radius: 8px;
          background: linear-gradient(135deg, #f5f5f5 0%, #ffffff 100%);
          box-shadow: 0 4px 12px rgba(0,0,0,0.4);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.2s ease;
          overflow: hidden;
        }

        .card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 16px rgba(0,0,0,0.6);
        }

        .card.turned {
          background: linear-gradient(135deg, #1a1a3e 0%, #0d0d26 100%);
          border: 2px solid #2a2a5a;
        }

        .card.turned::before {
          content: '';
          position: absolute;
          width: 70%;
          height: 70%;
          border: 2px solid #dc251c;
          border-radius: 4px;
          opacity: 0.5;
        }

        .card.red {
          background: linear-gradient(135deg, #ff6b5b 0%, #dc251c 100%);
          color: #fff;
        }

        .card.yellow {
          background: linear-gradient(135deg, #ffff5f 0%, #fcf604 100%);
          color: #000;
        }

        .card.blue {
          background: linear-gradient(135deg, #5db3ff 0%, #0493de 100%);
          color: #fff;
        }

        .card.green {
          background: linear-gradient(135deg, #5abf7e 0%, #018d41 100%);
          color: #fff;
        }

        .card.black {
          background: linear-gradient(135deg, #333 0%, #1f1b18 100%);
          color: #fff;
        }

        .card-icon {
          font-size: 24px;
          font-weight: bold;
          line-height: 1;
          text-shadow: 0 1px 2px rgba(0,0,0,0.2);
          z-index: 10;
        }

        #piles_area {
          grid-area: 2/2;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 40px;
          background: rgba(0,0,0,0.3);
          border-radius: 20px;
          padding: 20px;
        }

        #draw_pile {
          position: relative;
        }

        #draw_pile .card {
          cursor: pointer;
        }

        #draw_pile .card:hover {
          transform: translateY(-4px) scale(1.05);
        }

        #discard_pile {
          position: relative;
        }

        #player {
          grid-area: 3/2;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          gap: 10px;
        }

        #player_left {
          grid-area: 2/1;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        #player_top {
          grid-area: 1/2;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        #player_right {
          grid-area: 2/3;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }

        .player_hand {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          justify-content: center;
          align-items: flex-start;
        }

        #player .player_hand .card {
          cursor: pointer;
          transition: all 0.2s ease;
        }

        #player .player_hand .card:hover {
          transform: translateY(-8px) scale(1.1);
        }

        .player-label {
          color: #aaa;
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .turn-indicator {
          position: absolute;
          top: 20px;
          left: 20px;
          background: rgba(255,107,91,0.9);
          color: white;
          padding: 10px 16px;
          border-radius: 20px;
          font-size: 13px;
          font-weight: bold;
          z-index: 1000;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .turn-indicator.idle {
          background: rgba(100,100,100,0.7);
        }
      `}</style>

      {/* Turn Indicator */}
      <div className={`turn-indicator ${gameState.currentPlayerIndex !== 0 ? 'idle' : ''}`}>
        {gameState.currentPlayerIndex === 0 ? '🔥 YOUR TURN' : '⏱️ WAITING'}
      </div>

      {/* Game Field */}
      <div className={`game-field ${gameColor}`}>
        
        {/* Player (You) - Bottom */}
        <div id="player">
          <span className="player-label">(You)</span>
          <div className="player_hand">
            {gameState.players[0].hand.map((card, idx) => (
              <div 
                key={card.id} 
                className={`card ${getCardColor(card.display)}`}
                onClick={() => onPlayCard(0, idx)}
                title={card.display}
              >
                <span className="card-icon">
                  {getCardDisplay(card.display)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Left Player */}
        <div id="player_left">
          <span className="player-label">Left Player</span>
          <div className="player_hand">
            {gameState.players[2] && gameState.players[2].hand.map((_, idx) => (
              <div key={idx} className="card turned">
                <span className="card-icon"></span>
              </div>
            ))}
          </div>
        </div>

        {/* Top Player */}
        <div id="player_top">
          <span className="player-label">Top Player</span>
          <div className="player_hand">
            {gameState.players[1] && gameState.players[1].hand.map((_, idx) => (
              <div key={idx} className="card turned">
                <span className="card-icon"></span>
              </div>
            ))}
          </div>
        </div>

        {/* Right Player */}
        <div id="player_right">
          <span className="player-label">Right Player</span>
          <div className="player_hand">
            {gameState.players[3] && gameState.players[3].hand.map((_, idx) => (
              <div key={idx} className="card turned">
                <span className="card-icon"></span>
              </div>
            ))}
          </div>
        </div>

        {/* Piles Area - Center */}
        <div id="piles_area">
          {/* Draw Pile */}
          <div id="draw_pile" onClick={onDrawCard} title="Draw a card">
            <div className="card turned">
              <span className="card-icon">+</span>
            </div>
          </div>

          {/* Discard Pile */}
          <div id="discard_pile">
            {topDiscard && (
              <div className={`card ${getCardColor(topDiscard.display)}`} title={topDiscard.display}>
                <span className="card-icon">
                  {getCardDisplay(topDiscard.display)}
                </span>
              </div>
            )}
          </div>
        </div>

      </div>
    </>
  )
}
