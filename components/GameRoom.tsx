'use client'

import { GameState } from '@/lib/gameTypes'
import ParticleCanvas from './ParticleCanvas'
import UnoCardsBackground from './UnoCardsBackground'
import GalaxySpiral from './GalaxySpiral'

export default function GameRoom({
  gameState,
  onPlayCard,
  onDrawCard
}: {
  gameState: GameState
  onPlayCard: (playerIndex: number, cardIndex: number) => void
  onDrawCard: () => void
}) {
  
  // Convertir card string a color
  const getCardColor = (cardStr: string) => {
    if (cardStr.includes('r')) return 'red'
    if (cardStr.includes('y')) return 'yellow' 
    if (cardStr.includes('b')) return 'blue'
    if (cardStr.includes('g')) return 'green'
    if (cardStr.includes('w')) return 'black'
    return 'black'
  }

  // Obtener display de la carta
  const getCardDisplay = (cardStr: string) => {
    if (cardStr.includes('d2')) return '+2'
    if (cardStr.includes('s')) return 'S'
    if (cardStr.includes('r') && cardStr.length > 2) return 'R'
    if (cardStr.includes('w+4')) return '+4'
    if (cardStr === 'w') return 'W'
    // Números
    const num = cardStr.match(/\d+/)
    return num ? num[0] : ''
  }

  const topDiscard = gameState.discardPile[gameState.discardPile.length - 1]

  return (
    <>
      <style jsx>{`
        * { box-sizing: border-box; }

        :global(body) {
          margin: 0;
          padding: 0;
          font-family: Arial, sans-serif;
          background: radial-gradient(circle at center, #ff8c00 0%, #ff4500 20%, #dc2626 40%, #8b0000 80%, #000000 100%);
          overflow: hidden;
        }

        .game-root {
          position: relative;
          width: 100vw;
          height: 100vh;
          overflow: hidden;
        }

        .background-layers {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 1;
        }

        .background-gradient {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, #ff8c00 0%, #ff4500 20%, #dc2626 40%, #8b0000 80%, #000000 100%);
          opacity: 0.85;
          z-index: 0;
        }

        .content-layer {
          position: relative;
          z-index: 10;
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .game-field {
          width: 1000px;
          height: 700px;
          position: relative;
          background: rgba(220, 122, 122, 0.22);
          border-radius: 40px;
          transform: rotateX(15deg);
          box-shadow: 0 40px 120px rgba(0, 0, 0, 0.45);
          backdrop-filter: blur(8px);
        }

        .card {
          width: 65px;
          height: 105px;
          border: 2px solid #333;
          border-radius: 6px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          font-size: 22px;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
          position: absolute;
        }

        .card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.6);
        }

        .card.red { background: #dc251c; color: white; }
        .card.yellow { background: #fcf604; color: #333; }
        .card.blue { background: #0493de; color: white; }
        .card.green { background: #018d41; color: white; }
        .card.black { background: #1f1b18; color: white; }
        .card.turned { background: linear-gradient(135deg, #1f1b18 0%, #333 100%); }

        /* Bottom Player (You) */
        .you-area {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          height: 140px;
          display: flex;
          justify-content: center;
          align-items: flex-end;
          gap: 3px;
          width: 600px;
        }

        .you-area .card {
          position: static;
          cursor: pointer;
        }

        .you-area .card:hover {
          transform: translateY(-15px);
        }

        /* Top Player */
        .top-area {
          position: absolute;
          top: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 3px;
          width: 600px;
          height: 120px;
        }

        .top-area .card {
          position: static;
        }

        /* Left Player */
        .left-area {
          position: absolute;
          left: 20px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 3px;
          height: 400px;
          width: 100px;
        }

        .left-area .card {
          position: static;
          width: 105px;
          height: 65px;
        }

        /* Right Player */
        .right-area {
          position: absolute;
          right: 20px;
          top: 50%;
          transform: translateY(-50%);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 3px;
          height: 400px;
          width: 100px;
        }

        .right-area .card {
          position: static;
          width: 105px;
          height: 65px;
        }

        /* Center Piles */
        .piles {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          display: flex;
          gap: 50px;
          align-items: center;
          justify-content: center;
        }

        .pile {
          position: relative;
          width: 100px;
          height: 150px;
        }

        .pile .card {
          width: 75px;
          height: 120px;
          top: 0;
          left: 0;
        }

        .pile .card:nth-child(2) {
          z-index: 1;
          top: 12px;
          left: 12px;
        }

        .pile .card:nth-child(1) {
          z-index: 2;
        }

        #draw_pile .card:hover {
          cursor: pointer;
        }

        .turn-indicator {
          position: absolute;
          top: 20px;
          left: 20px;
          background: rgba(0, 0, 0, 0.8);
          color: #fff;
          padding: 12px 24px;
          border-radius: 25px;
          font-size: 13px;
          font-weight: bold;
          text-transform: uppercase;
          z-index: 100;
          letter-spacing: 1px;
        }
      `}</style>

      <div className="game-root">
        <div className="background-layers">
          <div className="background-gradient"></div>
          <div className="spiral-background"></div>
          <GalaxySpiral />
          <ParticleCanvas />
          <UnoCardsBackground />
        </div>

        <div className="content-layer">
          <div className="turn-indicator">
            {gameState.currentPlayerIndex === 0
              ? '👤 Your Turn'
              : `🤖 ${gameState.players[gameState.currentPlayerIndex].name}`}
          </div>

          <div className="game-field">
            <div className="top-area">
              {gameState.players[1]?.hand.map((_, idx) => (
                <div key={idx} className="card turned"></div>
              ))}
            </div>

            <div className="left-area">
              {gameState.players[2]?.hand.map((_, idx) => (
                <div key={idx} className="card turned"></div>
              ))}
            </div>

            <div className="piles">
              <div className="pile" id="draw_pile" onClick={onDrawCard}>
                <div className="card turned"></div>
                <div className="card turned"></div>
              </div>

              <div className="pile">
                {topDiscard && (
                  <>
                    <div className={`card ${getCardColor(topDiscard.display)}`}>
                      {getCardDisplay(topDiscard.display)}
                    </div>
                    <div className="card turned"></div>
                  </>
                )}
              </div>
            </div>

            <div className="right-area">
              {gameState.players[3]?.hand.map((_, idx) => (
                <div key={idx} className="card turned"></div>
              ))}
            </div>

            <div className="you-area">
              {gameState.players[0].hand.map((card, idx) => (
                <div
                  key={card.id}
                  className={`card ${getCardColor(card.display)}`}
                  onClick={() => onPlayCard(0, idx)}
                  title={card.display}
                >
                  {getCardDisplay(card.display)}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
