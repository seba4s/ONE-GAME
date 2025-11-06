"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

interface Card {
  id: string
  value: string
  color: string
}

interface Player {
  name: string
  hand: Card[]
}

const DECK = [
  "0r", "0y", "0b", "0g",
  "1r", "1r", "1y", "1y", "1b", "1b", "1g", "1g",
  "2r", "2r", "2y", "2y", "2b", "2b", "2g", "2g",
  "3r", "3r", "3y", "3y", "3b", "3b", "3g", "3g",
  "4r", "4r", "4y", "4y", "4b", "4b", "4g", "4g",
  "5r", "5r", "5y", "5y", "5b", "5b", "5g", "5g",
  "6r", "6r", "6y", "6y", "6b", "6b", "6g", "6g",
  "7r", "7r", "7y", "7y", "7b", "7b", "7g", "7g",
  "8r", "8r", "8y", "8y", "8b", "8b", "8g", "8g",
  "9r", "9r", "9y", "9y", "9b", "9b", "9g", "9g",
  "d2r", "d2r", "d2y", "d2y", "d2b", "d2b", "d2g", "d2g",
  "sr", "sr", "sy", "sy", "sb", "sb", "sg", "sg",
  "rr", "rr", "ry", "ry", "rb", "rb", "rg", "rg",
  "w", "w", "w", "w",
  "w+4", "w+4", "w+4", "w+4"
]

function createHand(handSize = 7, availableCards: string[]) {
  let hand = []
  for (let i = 0; i < handSize; i++) {
    if (availableCards.length === 0) break
    let cardIndex = Math.floor(Math.random() * availableCards.length)
    let card = availableCards.splice(cardIndex, 1)[0]
    hand.push(card)
  }
  return hand
}

function getCardColor(card: string): string {
  if (card.includes('r')) return 'red'
  if (card.includes('y')) return 'yellow'
  if (card.includes('b')) return 'blue'
  if (card.includes('g')) return 'green'
  return 'black'
}

export default function GamePlay() {
  const [gameColor, setGameColor] = useState("red")
  const [drawPile, setDrawPile] = useState<string[]>([])
  const [discardPile, setDiscardPile] = useState<string[]>([])
  const [currentPlayer, setCurrentPlayer] = useState(0)
  const [players, setPlayers] = useState<string[][]>([])
  const [selectedCard, setSelectedCard] = useState<number | null>(null)

  // Inicializar juego
  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    let availableCards = [...DECK]
    const playerHands = [
      createHand(7, availableCards),
      createHand(7, availableCards),
      createHand(7, availableCards),
      createHand(7, availableCards),
    ]
    setPlayers(playerHands)
    setDrawPile(availableCards)
    // Iniciar pila de descartes con una carta
    if (availableCards.length > 0) {
      const firstCard = availableCards.pop()
      setDiscardPile(firstCard ? [firstCard] : [])
    }
  }

  const drawCard = () => {
    if (drawPile.length === 0) return
    const newDrawPile = [...drawPile]
    const card = newDrawPile.pop()
    if (card) {
      const newPlayers = [...players]
      newPlayers[currentPlayer] = [...newPlayers[currentPlayer], card]
      setPlayers(newPlayers)
      setDrawPile(newDrawPile)
    }
  }

  const playCard = (cardIndex: number) => {
    const newPlayers = [...players]
    const card = newPlayers[currentPlayer][cardIndex]
    
    // Validar si la carta es jugable (simplificado)
    const topCard = discardPile[discardPile.length - 1]
    
    newPlayers[currentPlayer].splice(cardIndex, 1)
    setPlayers(newPlayers)
    
    const newDiscardPile = [...discardPile, card]
    setDiscardPile(newDiscardPile)
    setGameColor(getCardColor(card))
    
    // Cambiar turno
    setCurrentPlayer((currentPlayer + 1) % players.length)
    setSelectedCard(null)
  }

  return (
    <div 
      className="game-field perspective"
      style={{
        background: 'radial-gradient(circle at center, #ff8c00 0%, #ff4500 20%, #dc2626 40%, #8b0000 80%, #000000 100%)',
        height: '100vh',
        display: 'grid',
        justifyContent: 'center',
        alignContent: 'center',
        gridGap: '0.5em',
        gridTemplateColumns: '12em 24em 12em',
        gridTemplateRows: '12em 24em 12em',
        transform: 'rotateX(30deg)',
        perspective: '100em',
        padding: '2rem'
      }}
    >
      {/* PILES AREA */}
      <div
        id="piles_area"
        style={{
          gridArea: '2 / 2',
          position: 'relative',
          borderRadius: '4em',
          backgroundColor: `rgba(220, 37, 28, 0.4)`,
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
        }}
      >
        {/* Draw Pile */}
        <div
          id="draw_pile"
          style={{
            position: 'relative',
            width: '6em',
            height: '10em',
            cursor: 'pointer',
          }}
          onClick={drawCard}
        >
          <div className="card turned" style={{ cursor: 'pointer' }}>
            <div style={{
              width: '5em',
              height: '7.7em',
              backgroundColor: '#1f1b18',
              borderRadius: '0.5em',
              border: '1px solid #ccc',
              boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
            }} />
          </div>
        </div>

        {/* Discard Pile */}
        <div id="discard_pile" style={{ position: 'relative', width: '6em', height: '10em' }}>
          {discardPile.length > 0 && (
            <div
              className={`card ${getCardColor(discardPile[discardPile.length - 1])}`}
              style={{
                display: 'inline-block',
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '0.8em',
                padding: '0.3em',
                boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
              }}
            >
              <div style={{
                width: '5em',
                height: '7.7em',
                backgroundColor: getCardColor(discardPile[discardPile.length - 1]),
                borderRadius: '0.5em',
              }} />
            </div>
          )}
        </div>
      </div>

      {/* PLAYER BOTTOM (You) */}
      <div
        id="player"
        style={{ gridArea: '3 / 2', position: 'relative' }}
      >
        <div
          className="player_hand"
          style={{
            position: 'relative',
            height: '8em',
            display: 'flex',
            alignItems: 'flex-end',
          }}
        >
          {players[0]?.map((card, idx) => (
            <div
              key={idx}
              style={{
                position: 'absolute',
                left: `${idx * 2.2}em`,
                cursor: 'pointer',
                transform: selectedCard === idx ? 'rotate(-10deg) translateY(-0.5em)' : 'none',
                transformOrigin: 'left bottom',
                transition: '200ms',
              }}
              onClick={() => playCard(idx)}
              onMouseEnter={() => setSelectedCard(idx)}
              onMouseLeave={() => setSelectedCard(null)}
            >
              <div style={{
                display: 'inline-block',
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '0.8em',
                padding: '0.3em',
                boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
              }}>
                <div style={{
                  width: '5em',
                  height: '7.7em',
                  backgroundColor: getCardColor(card),
                  borderRadius: '0.5em',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: getCardColor(card),
                  fontSize: '1.5em',
                  fontWeight: 'bold',
                }}>
                  {card}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* PLAYER LEFT */}
      <div
        id="player_left"
        style={{ gridArea: '2 / 1', position: 'relative' }}
      >
        <div className="player_hand" style={{ position: 'relative', height: '7.7em' }}>
          {players[1]?.map((card, idx) => (
            <div
              key={idx}
              style={{
                position: 'absolute',
                left: `${idx * 0.5}em`,
                display: 'inline-block',
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '0.8em',
                padding: '0.3em',
                boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
              }}
            >
              <div style={{
                width: '5em',
                height: '7.7em',
                backgroundColor: '#1f1b18',
                borderRadius: '0.5em',
              }} />
            </div>
          ))}
        </div>
      </div>

      {/* PLAYER TOP */}
      <div
        id="player_top"
        style={{ gridArea: '1 / 2', position: 'relative' }}
      >
        <div className="player_hand" style={{ position: 'relative', display: 'flex', gap: '0.2em' }}>
          {players[2]?.map((card, idx) => (
            <div
              key={idx}
              style={{
                display: 'inline-block',
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '0.8em',
                padding: '0.3em',
                boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
              }}
            >
              <div style={{
                width: '5em',
                height: '7.7em',
                backgroundColor: '#1f1b18',
                borderRadius: '0.5em',
              }} />
            </div>
          ))}
        </div>
      </div>

      {/* PLAYER RIGHT */}
      <div
        id="player_right"
        style={{ gridArea: '2 / 3', position: 'relative' }}
      >
        <div className="player_hand" style={{ position: 'relative', height: '7.7em' }}>
          {players[3]?.map((card, idx) => (
            <div
              key={idx}
              style={{
                position: 'absolute',
                right: `${idx * 0.5}em`,
                display: 'inline-block',
                backgroundColor: 'white',
                border: '1px solid #ccc',
                borderRadius: '0.8em',
                padding: '0.3em',
                boxShadow: '0 1px 3px rgba(0,0,0,0.12)',
              }}
            >
              <div style={{
                width: '5em',
                height: '7.7em',
                backgroundColor: '#1f1b18',
                borderRadius: '0.5em',
              }} />
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .game-field.perspective {
          transform: rotateX(30deg);
        }

        .card {
          transition: 200ms;
        }

        .card.turned {
          cursor: default;
        }
      `}</style>
    </div>
  )
}
