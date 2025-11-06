import { Card, CardColor, CardNumber, GameState } from './gameTypes'

const createDeck = (): Card[] => {
  const deck: Card[] = []
  const colors: CardColor[] = ['red', 'yellow', 'blue', 'green']
  let id = 0

  colors.forEach(color => {
    deck.push({ id: `${id++}`, color, type: '0' as CardNumber, display: '0' })
    for (let num = 1; num <= 9; num++) {
      for (let i = 0; i < 2; i++) {
        deck.push({
          id: `${id++}`,
          color,
          type: num.toString() as CardNumber,
          display: num.toString()
        })
      }
    }
  })

  colors.forEach(color => {
    for (let i = 0; i < 2; i++) {
      deck.push({ id: `${id++}`, color, type: 'skip', display: 'SKIP' })
      deck.push({ id: `${id++}`, color, type: 'reverse', display: 'REV' })
      deck.push({ id: `${id++}`, color, type: 'draw2', display: '+2' })
    }
  })

  for (let i = 0; i < 4; i++) {
    deck.push({ id: `${id++}`, color: 'black', type: 'wild', display: 'W' })
    deck.push({ id: `${id++}`, color: 'black', type: 'wild_draw4', display: 'W+4' })
  }

  return deck.sort(() => Math.random() - 0.5)
}

export const initializeGame = (numPlayers: number = 4): GameState => {
  const deck = createDeck()
  const players = []

  for (let i = 0; i < numPlayers; i++) {
    const hand = deck.splice(0, 7)
    players.push({
      id: i,
      name: i === 0 ? 'You' : `CPU ${i}`,
      hand
    })
  }

  const firstCard = deck.splice(0, 1)[0]

  return {
    players,
    drawPile: deck,
    discardPile: [firstCard],
    currentPlayerIndex: 0,
    gameStatus: 'playing'
  }
}

export const getTopDiscard = (gameState: GameState): Card | null => {
  return gameState.discardPile.length > 0
    ? gameState.discardPile[gameState.discardPile.length - 1]
    : null
}

export const canPlayCard = (card: Card, topDiscard: Card | null): boolean => {
  if (!topDiscard) return true
  if (card.color === 'black') return true
  if (card.color === topDiscard.color) return true
  if (card.type === topDiscard.type) return true
  return false
}

export const playCard = (
  gameState: GameState,
  playerIndex: number,
  cardIndex: number
): GameState => {
  const newState = JSON.parse(JSON.stringify(gameState)) as GameState
  const player = newState.players[playerIndex]

  if (cardIndex < 0 || cardIndex >= player.hand.length) {
    return gameState
  }

  const card = player.hand[cardIndex]
  player.hand.splice(cardIndex, 1)
  newState.discardPile.push(card)
  newState.currentPlayerIndex = (newState.currentPlayerIndex + 1) % newState.players.length

  if (player.hand.length === 0) {
    newState.gameStatus = 'finished'
    newState.winner = playerIndex
  }

  return newState
}

export const drawCard = (gameState: GameState, playerIndex: number): GameState => {
  const newState = JSON.parse(JSON.stringify(gameState)) as GameState
  const player = newState.players[playerIndex]

  if (newState.drawPile.length === 0 && newState.discardPile.length > 1) {
    const topCard = newState.discardPile.pop()!
    newState.drawPile = newState.discardPile.sort(() => Math.random() - 0.5)
    newState.discardPile = [topCard]
  }

  if (newState.drawPile.length > 0) {
    const card = newState.drawPile.pop()!
    player.hand.push(card)
  }

  newState.currentPlayerIndex = (newState.currentPlayerIndex + 1) % newState.players.length
  return newState
}
