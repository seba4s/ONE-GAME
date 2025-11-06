"use client"

import React from "react"

interface GameBoardProps {
  playerHands: string[][]
  drawPile: string[]
  discardPile: string[]
  currentPlayer: number
  onDrawCard: () => void
  onPlayCard: (playerIndex: number, cardIndex: number) => void
}

export default function GameBoard({
  playerHands,
  drawPile,
  discardPile,
  currentPlayer,
  onDrawCard,
  onPlayCard,
}: GameBoardProps) {
  return (
    <div
      className="game-board"
      style={{
        background: "radial-gradient(circle at center, #ff8c00 0%, #ff4500 20%, #dc2626 40%, #8b0000 80%, #000000 100%)",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        overflow: "hidden",
        position: "fixed",
        top: 0,
        left: 0,
      }}
    >
      <div
        className="game-container"
        style={{
          width: "90vw",
          height: "90vh",
          maxWidth: "1200px",
          maxHeight: "800px",
          display: "grid",
          gridTemplateColumns: "1fr 2fr 1fr",
          gridTemplateRows: "1fr 2fr 1fr",
          gap: "1rem",
          padding: "2rem",
        }}
      >
        {/* PLAYER TOP (CPU - Index 2) */}
        <div
          style={{
            gridColumn: "2",
            gridRow: "1",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-end",
            gap: "0.5rem",
          }}
        >
          {playerHands[2]?.map((card, idx) => (
            <div
              key={`top-${idx}`}
              style={{
                width: "60px",
                height: "92px",
                backgroundColor: "#1f1b18",
                border: "2px solid #ccc",
                borderRadius: "8px",
                cursor: "default",
              }}
            />
          ))}
        </div>

        {/* PLAYER LEFT (CPU - Index 1) */}
        <div
          style={{
            gridColumn: "1",
            gridRow: "2",
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: "0.3rem",
          }}
        >
          {playerHands[1]?.map((card, idx) => (
            <div
              key={`left-${idx}`}
              style={{
                width: "60px",
                height: "92px",
                backgroundColor: "#1f1b18",
                border: "2px solid #ccc",
                borderRadius: "8px",
                cursor: "default",
              }}
            />
          ))}
        </div>

        {/* CENTER - PILES AREA */}
        <div
          style={{
            gridColumn: "2",
            gridRow: "2",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            gap: "3rem",
          }}
        >
          {/* Draw Pile */}
          <div
            onClick={onDrawCard}
            style={{
              cursor: "pointer",
            }}
          >
            <div
              style={{
                width: "60px",
                height: "92px",
                backgroundColor: "#1f1b18",
                border: "2px solid #ccc",
                borderRadius: "8px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "12px",
                color: "#999",
              }}
            >
              {drawPile.length}
            </div>
          </div>

          {/* Discard Pile */}
          <div>
            {discardPile.length > 0 ? (
              <div
                style={{
                  width: "60px",
                  height: "92px",
                  backgroundColor: getCardColor(discardPile[discardPile.length - 1]),
                  border: "2px solid #fff",
                  borderRadius: "8px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  fontSize: "14px",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                {discardPile[discardPile.length - 1]}
              </div>
            ) : (
              <div
                style={{
                  width: "60px",
                  height: "92px",
                  backgroundColor: "#333",
                  border: "2px dashed #ccc",
                  borderRadius: "8px",
                }}
              />
            )}
          </div>
        </div>

        {/* PLAYER RIGHT (CPU - Index 3) */}
        <div
          style={{
            gridColumn: "3",
            gridRow: "2",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            gap: "0.3rem",
          }}
        >
          {playerHands[3]?.map((card, idx) => (
            <div
              key={`right-${idx}`}
              style={{
                width: "60px",
                height: "92px",
                backgroundColor: "#1f1b18",
                border: "2px solid #ccc",
                borderRadius: "8px",
                cursor: "default",
              }}
            />
          ))}
        </div>

        {/* PLAYER BOTTOM - YOU (Index 0) */}
        <div
          style={{
            gridColumn: "2",
            gridRow: "3",
            display: "flex",
            justifyContent: "center",
            alignItems: "flex-start",
            gap: "0.5rem",
          }}
        >
          {playerHands[0]?.map((card, idx) => (
            <div
              key={`your-${idx}`}
              onClick={() => onPlayCard(0, idx)}
              style={{
                width: "60px",
                height: "92px",
                backgroundColor: getCardColor(card),
                border: "2px solid #fff",
                borderRadius: "8px",
                cursor: "pointer",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontSize: "12px",
                color: "#fff",
                fontWeight: "bold",
                transition: "all 200ms",
                opacity: currentPlayer === 0 ? 1 : 0.7,
              }}
              onMouseEnter={(e) => {
                if (currentPlayer === 0) {
                  e.currentTarget.style.transform = "translateY(-10px)"
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)"
              }}
            >
              {card}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function getCardColor(card: string): string {
  const colors: Record<string, string> = {
    r: "#dc251c",
    y: "#fcf604",
    b: "#0493de",
    g: "#018d41",
  }

  for (const [key, color] of Object.entries(colors)) {
    if (card.includes(key)) {
      return color
    }
  }

  return "#2a2a2a" // Default para wild cards sin color
}
