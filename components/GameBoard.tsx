"use client"

import React, { useState } from "react"

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
  const [gameColor, setGameColor] = useState("red")

  const getCardColorClass = (card: string): string => {
    if (card.includes("r")) return "red"
    if (card.includes("y")) return "yellow"
    if (card.includes("b")) return "blue"
    if (card.includes("g")) return "green"
    return "black"
  }

  return (
    <>
      <div
        className={`game-field perspective ${gameColor}`}
        style={{
          background: "radial-gradient(circle at center, #ff8c00 0%, #ff4500 20%, #dc2626 40%, #8b0000 80%, #000000 100%)",
          width: "100vw",
          height: "100vh",
          display: "grid",
          justifyContent: "center",
          alignContent: "center",
          gridGap: "0.5em",
          gridTemplateColumns: "12em 24em 12em",
          gridTemplateRows: "12em 24em 12em",
          overflow: "hidden",
          position: "fixed",
          top: 0,
          left: 0,
        }}
      >
        {/* PLAYER YOU - BOTTOM */}
        <div id="player">
          <div className="player_hand">
            {playerHands[0]?.map((card, idx) => (
              <div
                key={`you-${idx}`}
                className={`card ${getCardColorClass(card)}`}
                data-key={idx}
                onClick={() => onPlayCard(0, idx)}
              >
                <div className="bckg" />
              </div>
            ))}
          </div>
        </div>

        {/* PLAYER LEFT */}
        <div id="player_left">
          <div className="player_hand">
            {playerHands[1]?.map((card, idx) => (
              <div key={`left-${idx}`} className="card turned" data-index={idx}>
                <div className="bckg" />
              </div>
            ))}
          </div>
        </div>

        {/* PLAYER TOP */}
        <div id="player_top">
          <div className="player_hand">
            {playerHands[2]?.map((card, idx) => (
              <div key={`top-${idx}`} className="card turned" data-index={idx}>
                <div className="bckg" />
              </div>
            ))}
          </div>
        </div>

        {/* PLAYER RIGHT */}
        <div id="player_right">
          <div className="player_hand">
            {playerHands[3]?.map((card, idx) => (
              <div key={`right-${idx}`} className="card turned" data-index={idx}>
                <div className="bckg" />
              </div>
            ))}
          </div>
        </div>

        {/* PILES AREA - CENTER */}
        <div id="piles_area">
          {/* Draw Pile */}
          <div id="draw_pile" onClick={onDrawCard}>
            <div className="card turned top-card">
              <div className="bckg" />
            </div>
            <div className="card turned pile">
              <div className="bckg" />
            </div>
          </div>

          {/* Discard Pile */}
          <div id="discard_pile">
            <div className={`card top-card ${gameColor}`}>
              <div className="bckg" />
            </div>
            <div className="card pile">
              <div className="bckg" />
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        /* VARIABLES */
        :root {
          --card-size: 5em;
          --red-card: #dc251c;
          --yellow-card: #fcf604;
          --blue-card: #0493de;
          --green-card: #018d41;
          --black-card: #1f1b18;
          --low-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
          --low-shadow-hover: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
        }

        html,
        body {
          height: 100%;
          margin: 0;
          padding: 0;
        }

        body {
          font-family: Arial, sans-serif;
          perspective: 100em;
        }

        /* CARDS STYLES */
        .card {
          display: inline-block;
          background-color: white;
          border: 1px solid #ccc;
          border-radius: 0.8em;
          padding: 0.3em;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
          transition: 200ms;
          position: relative;
        }

        .card .bckg {
          width: 5em;
          height: 7.7em;
          border-radius: 0.5em;
          overflow: hidden;
          position: relative;
        }

        .card .bckg::before {
          content: "";
          width: 5em;
          height: 6.5em;
          background-color: white;
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) rotate(10deg);
          transform-origin: center center;
          border-radius: 90% 40%;
        }

        .card.center-icon {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 3em;
        }

        /* Color Classes */
        .card.red {
          color: #dc251c;
        }

        .card.red .bckg {
          background-color: #dc251c;
        }

        .card.yellow {
          color: #fcf604;
        }

        .card.yellow .bckg {
          background-color: #fcf604;
        }

        .card.blue {
          color: #0493de;
        }

        .card.blue .bckg {
          background-color: #0493de;
        }

        .card.green {
          color: #018d41;
        }

        .card.green .bckg {
          background-color: #018d41;
        }

        .card.black {
          color: #1f1b18;
        }

        .card.black .bckg {
          background-color: #1f1b18;
        }

        .card.turned {
          cursor: default;
        }

        .card.turned .bckg {
          background-color: #1f1b18;
        }

        .card.turned .bckg::before {
          background-color: #dc251c;
        }

        /* GAME FIELD */
        .game-field #piles_area {
          position: relative;
          border-radius: 4em;
          transition: 200ms;
          grid-area: 2 / 2;
        }

        .game-field.yellow #piles_area {
          background-color: rgba(252, 246, 4, 0.4);
        }

        .game-field.blue #piles_area {
          background-color: rgba(4, 147, 222, 0.4);
        }

        .game-field.red #piles_area {
          background-color: rgba(220, 37, 28, 0.4);
        }

        .game-field.green #piles_area {
          background-color: rgba(1, 141, 65, 0.4);
        }

        /* PILES POSITIONING */
        #draw_pile {
          position: absolute;
          left: 5em;
          top: 5em;
        }

        #draw_pile .card.top-card,
        #draw_pile .card.pile {
          position: absolute;
        }

        #draw_pile .card.pile {
          box-shadow: 0px 2px white, 0px 4px rgba(0, 0, 0, 0.16), 0px 6px white, 0px 8px rgba(0, 0, 0, 0.16),
            0px 10px white, 0px 12px rgba(0, 0, 0, 0.16), 0px 14px white, 0px 16px rgba(0, 0, 0, 0.16),
            0px 18px white, 0px 20px rgba(0, 0, 0, 0.16);
        }

        #draw_pile .card.pile:hover {
          transform: none;
        }

        #draw_pile .card.top-card {
          z-index: 100;
          box-shadow: none;
          cursor: pointer;
        }

        #draw_pile .card.top-card:hover {
          box-shadow: 0px 4px rgba(0, 0, 0, 0.16);
          transform: translateY(1em);
        }

        #discard_pile {
          position: absolute;
          left: 12em;
          top: 5.7em;
        }

        #discard_pile .card.top-card,
        #discard_pile .card.pile {
          position: absolute;
        }

        #discard_pile .card.pile {
          box-shadow: 0px 2px white, 0px 4px rgba(0, 0, 0, 0.16), 0px 6px white, 0px 8px rgba(0, 0, 0, 0.16);
        }

        #discard_pile .card.pile:hover {
          transform: none;
        }

        #discard_pile .card.top-card {
          z-index: 100;
          box-shadow: none;
        }

        /* PLAYERS POSITIONING */
        #player {
          grid-area: 3 / 2;
        }

        #player_left {
          grid-area: 2 / 1;
        }

        #player_top {
          grid-area: 1 / 2;
        }

        #player_right {
          grid-area: 2 / 3;
        }

        /* PLAYER HANDS */
        .player_hand {
          position: relative;
        }

        .player_hand .card {
          position: absolute;
        }

        .player_hand .card:nth-child(1) {
          left: 2.2em;
        }
        .player_hand .card:nth-child(2) {
          left: 4.4em;
        }
        .player_hand .card:nth-child(3) {
          left: 6.6em;
        }
        .player_hand .card:nth-child(4) {
          left: 8.8em;
        }
        .player_hand .card:nth-child(5) {
          left: 11em;
        }
        .player_hand .card:nth-child(6) {
          left: 13.2em;
        }
        .player_hand .card:nth-child(7) {
          left: 15.4em;
        }

        /* PLAYER YOU INTERACTIONS */
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

        /* PLAYER LEFT TRANSFORM */
        #player_left .player_hand {
          transform-origin: left bottom;
          transform: rotate(90deg) translateY(-10em);
        }

        /* PLAYER TOP TRANSFORM */
        #player_top .player_hand {
          transform: translateY(1em);
        }

        /* PLAYER RIGHT TRANSFORM */
        #player_right .player_hand {
          transform-origin: left bottom;
          transform: rotate(-90deg) translate(-24em, 1em);
        }

        /* PERSPECTIVE */
        .game-field.perspective {
          transform: rotateX(30deg);
        }
      `}</style>
    </>
  )
}
