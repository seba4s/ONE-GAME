// GameLogic.ts - Lógica pura del juego (sin React)

export const DECK = [
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

/**
 * Crea una mano de cartas aleatorias del mazo disponible
 * @param handSize - Cantidad de cartas a distribuir (default: 7)
 * @param availableCards - Array de cartas disponibles (se modifica in-place)
 * @returns Array de cartas para la mano del jugador
 */
export function createHand(handSize: number = 7, availableCards: string[]): string[] {
  const hand: string[] = []
  
  for (let i = 0; i < handSize; i++) {
    if (availableCards.length === 0) break
    
    const cardIndex = Math.floor(Math.random() * availableCards.length)
    const card = availableCards.splice(cardIndex, 1)[0]
    hand.push(card)
  }
  
  return hand
}

/**
 * Inicializa el juego: reparte cartas y configura piles
 * @returns Objeto con estado inicial del juego
 */
export function initializeGame() {
  let availableCards = [...DECK]
  
  const playerHands: string[][] = []
  
  // Repartir 7 cartas a cada uno de los 4 jugadores
  for (let i = 0; i < 4; i++) {
    playerHands.push(createHand(7, availableCards))
  }
  
  // Primera carta en pila de descarte
  const firstCard = availableCards.length > 0 ? availableCards.pop() : null
  const discardPile = firstCard ? [firstCard] : []
  
  return {
    playerHands,
    drawPile: availableCards,
    discardPile,
    currentPlayer: 0,
  }
}

/**
 * Dibuja una carta del mazo para el jugador actual
 */
export function drawCardAction(
  playerHands: string[][],
  drawPile: string[],
  currentPlayer: number
): { playerHands: string[][]; drawPile: string[] } {
  if (drawPile.length === 0) {
    return { playerHands, drawPile }
  }
  
  const newDrawPile = [...drawPile]
  const card = newDrawPile.pop()
  
  if (!card) {
    return { playerHands, drawPile }
  }
  
  const newPlayerHands = playerHands.map((hand, idx) => 
    idx === currentPlayer ? [...hand, card] : hand
  )
  
  return {
    playerHands: newPlayerHands,
    drawPile: newDrawPile,
  }
}

/**
 * Juega una carta del jugador actual
 */
export function playCardAction(
  playerHands: string[][],
  discardPile: string[],
  currentPlayer: number,
  cardIndex: number
): { playerHands: string[][]; discardPile: string[] } {
  const playerHand = playerHands[currentPlayer]
  
  if (cardIndex < 0 || cardIndex >= playerHand.length) {
    return { playerHands, discardPile }
  }
  
  const card = playerHand[cardIndex]
  
  // Remover carta de la mano del jugador
  const newPlayerHands = playerHands.map((hand, idx) => 
    idx === currentPlayer 
      ? hand.filter((_, i) => i !== cardIndex)
      : hand
  )
  
  // Agregar a pila de descarte
  const newDiscardPile = [...discardPile, card]
  
  return {
    playerHands: newPlayerHands,
    discardPile: newDiscardPile,
  }
}

/**
 * Obtiene el siguiente jugador
 */
export function getNextPlayer(currentPlayer: number, totalPlayers: number = 4): number {
  return (currentPlayer + 1) % totalPlayers
}

/**
 * Extrae el color de una carta
 */
export function getCardColor(card: string): string {
  if (card.includes("r")) return "red"
  if (card.includes("y")) return "yellow"
  if (card.includes("b")) return "blue"
  if (card.includes("g")) return "green"
  return "wild"
}

/**
 * Extrae el tipo de carta (número, acción, wild)
 */
export function getCardType(card: string): string {
  if (card.includes("d2")) return "draw2"
  if (card.includes("s")) return "skip"
  if (card.includes("r")) return "reverse"
  if (card.includes("w+4")) return "wild+4"
  if (card.includes("w")) return "wild"
  return "number"
}
