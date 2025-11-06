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
        .game-field {
          height: 100vh;
          display: grid;
          justify-content: center;
          align-content: center;
          grid-gap: 0.5em;
          grid-template-columns: 12em 24em 12em;
          grid-template-rows: 12em 24em 12em;
          background: #2a2a2a;
        }

        .card {
          display: inline-block;
          background-color: #fff;
          border: 1px solid #ccc;
          border-radius: 0.8em;
          padding: 0.3em;
          box-shadow: 0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24);
          transition: 200ms;
          position: relative;
        }

        .card .bckg {
          width: 5em;
          height: 7.678em;
          border-radius: 0.5em;
          overflow: hidden;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #fff;
        }

        .card .bckg::before {
          content: '';
          width: 5em;
          height: 6.5em;
          background-color: #fff;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) rotate(10deg);
          transform-origin: center center;
          border-radius: 90% 40%;
          z-index: 1;
        }

        .card .center-icon {
          position: relative;
          font-size: 2.5em;
          font-weight: bold;
          z-index: 10;
          line-height: 1;
        }

        .card.red { color: #dc251c; }
        .card.red .bckg { background-color: #dc251c; }
        
        .card.yellow { color: #fcf604; }
        .card.yellow .bckg { background-color: #fcf604; }
        
        .card.blue { color: #0493de; }
        .card.blue .bckg { background-color: #0493de; }
        
        .card.green { color: #018d41; }
        .card.green .bckg { background-color: #018d41; }
        
        .card.black { color: #1f1b18; }
        .card.black .bckg { background-color: #1f1b18; }

        .card.turned .bckg { background-color: #1f1b18; }
        .card.turned .bckg::before { background-color: #dc251c; }

        #piles_area {
          grid-area: 2/2;
          position: relative;
          border-radius: 4em;
          transition: 200ms;
        }

        .game-field.red #piles_area { background-color: rgba(220,37,28,0.4); }
        .game-field.yellow #piles_area { background-color: rgba(252,246,4,0.4); }
        .game-field.blue #piles_area { background-color: rgba(4,147,222,0.4); }
        .game-field.green #piles_area { background-color: rgba(1,141,65,0.4); }

        #draw_pile {
          position: absolute;
          left: 5em;
          top: 5em;
        }

        #draw_pile .card {
          position: absolute;
          cursor: pointer;
        }

        #draw_pile .card:hover {
          transform: translateY(-0.5em);
        }

        #discard_pile {
          position: absolute;
          left: 12em;
          top: 5.7em;
        }

        #discard_pile .card {
          position: absolute;
        }

        #player { grid-area: 3/2; }
        #player_left { grid-area: 2/1; }
        #player_top { grid-area: 1/2; }
        #player_right { grid-area: 2/3; }

        .player_hand {
          position: relative;
        }

        .player_hand .card {
          position: absolute;
        }

        .player_hand .card:nth-child(1) { left: 2.2em; }
        .player_hand .card:nth-child(2) { left: 4.4em; }
        .player_hand .card:nth-child(3) { left: 6.6em; }
        .player_hand .card:nth-child(4) { left: 8.8em; }
        .player_hand .card:nth-child(5) { left: 11em; }
        .player_hand .card:nth-child(6) { left: 13.2em; }
        .player_hand .card:nth-child(7) { left: 15.4em; }

        #player .player_hand .card {
          cursor: pointer;
        }

        #player .player_hand .card:hover {
          transform-origin: left bottom;
          transform: rotate(-10deg) translateY(-0.5em);
        }

        #player .player_hand .card:hover ~ .card {
          transform: translateX(2em);
        }

        #player_left .player_hand {
          transform-origin: left bottom;
          transform: rotate(90deg) translateY(-10em);
        }

        #player_top .player_hand {
          transform: translateY(1em);
        }

        #player_right .player_hand {
          transform-origin: left bottom;
          transform: rotate(-90deg) translate(-24em, 1em);
        }

        /* Turn indicator */
        .turn-indicator {
          position: absolute;
          top: 20px;
          left: 20px;
          background: rgba(0,0,0,0.7);
          color: white;
          padding: 10px 20px;
          border-radius: 10px;
          font-size: 14px;
          z-index: 1000;
        }
      `}</style>

      {/* Turn Indicator */}
      <div className="turn-indicator">
        {gameState.currentPlayerIndex === 0 ? '🔥 YOUR TURN' : `CPU ${gameState.currentPlayerIndex} turn`}
      </div>

      {/* Game Field */}
      <div className={`game-field ${gameColor}`}>
        
        {/* Player (You) - Bottom */}
        <div id="player">
          (You)
          <div className="player_hand">
            {gameState.players[0].hand.map((card, idx) => (
              <div 
                key={card.id} 
                className={`card ${getCardColor(card.display)}`}
                onClick={() => onPlayCard(0, idx)}
              >
                <div className="bckg">
                  <span className="center-icon">
                    {getCardDisplay(card.display)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Left Player */}
        <div id="player_left">
          Left Player
          <div className="player_hand">
            {gameState.players[2] && gameState.players[2].hand.map((_, idx) => (
              <div key={idx} className="card turned">
                <div className="bckg"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Player */}
        <div id="player_top">
          Top Player
          <div className="player_hand">
            {gameState.players[1] && gameState.players[1].hand.map((_, idx) => (
              <div key={idx} className="card turned">
                <div className="bckg"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Player */}
        <div id="player_right">
          Right Player
          <div className="player_hand">
            {gameState.players[3] && gameState.players[3].hand.map((_, idx) => (
              <div key={idx} className="card turned">
                <div className="bckg"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Piles Area - Center */}
        <div id="piles_area">
          {/* Draw Pile */}
          <div id="draw_pile" onClick={onDrawCard}>
            <div className="card turned">
              <div className="bckg"></div>
            </div>
          </div>

          {/* Discard Pile */}
          <div id="discard_pile">
            {topDiscard && (
              <div className={`card ${getCardColor(topDiscard.display)}`}>
                <div className="bckg">
                  <span className="center-icon">
                    {getCardDisplay(topDiscard.display)}
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>

      </div>
    </>
  )
}
