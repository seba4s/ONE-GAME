# 🎮 GamePlay Component Documentation

## Overview
The `GamePlay` component is the core game interface for the UNO card game. It displays the 3D game board with four players positioned around a central play area and implements the core game mechanics.

## Features

### 1. **Game Initialization**
- Initializes a shuffled deck of 108 UNO cards
- Creates player hands (7 cards each by default)
- Sets up draw and discard piles
- Distributes cards evenly among 4 players

### 2. **Card System**
The deck consists of:
- **Number Cards (0-9)**: 4 colors × 10 values = 40 cards
- **Action Cards**: 
  - Draw Two (D2): 8 cards
  - Skip (S): 8 cards
  - Reverse (R): 8 cards
- **Wild Cards**: 4 cards
- **Wild +4**: 4 cards

### 3. **Player Layout**
The game uses a 3×3 CSS Grid with perspective transform:
```
┌─────────────────────────┐
│     PLAYER TOP (2)      │
├─────────────────────────┤
│ PLAYER │    PILES    │ PLAYER
│ LEFT(1)│   (Draw/Discard)  │ RIGHT(3)
├─────────────────────────┤
│   YOUR HAND (0)         │
└─────────────────────────┘
```

### 4. **Game Mechanics**

#### Drawing Cards
- Click on the draw pile (dark card back) to draw a card
- Drawn card is added to current player's hand
- Turn advances to next player automatically

#### Playing Cards
- Click on any card in your hand to play it
- Card is removed from hand and placed on discard pile
- Played card's color becomes the current game color
- Turn passes to the next player (in order: 0→1→2→3→0)

#### Visual Feedback
- Selected cards show hover animation
- Card colors are displayed correctly
- Opponents' cards are shown face-down (dark background)
- Current game color is visible in the center area

### 5. **Game Colors**
- **Red** (#dc251c): "r" suffix
- **Yellow** (#fcf604): "y" suffix  
- **Blue** (#0493de): "b" suffix
- **Green** (#018d41): "g" suffix
- **Black** (no color): wild cards

## Component Structure

### State Management
```typescript
interface GamePlay {
  gameColor: string              // Current active color
  drawPile: string[]             // Available cards to draw
  discardPile: string[]          // Played cards
  currentPlayer: number          // Active player (0-3)
  players: string[][]            // Each player's hand
  selectedCard: number | null    // Currently hovered card
}
```

### Key Functions

#### `createHand(handSize, availableCards)`
- Creates a player's initial hand
- Randomly selects cards from available deck
- Removes selected cards from available pool
- Returns array of card codes (e.g., ["1r", "2y", "w"])

#### `getCardColor(card: string): string`
- Extracts color from card code
- Maps: r→red, y→yellow, b→blue, g→green, default→black
- Used for visual rendering

#### `drawCard()`
- Removes top card from draw pile
- Adds to current player's hand
- Advances to next turn

#### `playCard(cardIndex: number)`
- Validates card can be played (currently simplified)
- Removes card from player's hand
- Adds card to discard pile
- Updates game color
- Passes turn to next player

## Styling

### 3D Perspective
- Applied via CSS `transform: rotateX(30deg)`
- Creates elevated game board view
- Grid spacing: 0.5em

### Card Rendering
- Base size: 5em × 7.7em (aspect ratio 1.5357)
- Color-coded backgrounds
- Subtle box-shadows for depth
- Border-radius: 0.5em

### Player Hand Positioning
- **Bottom (You)**: Horizontal layout, selectable
- **Left**: Vertical stack, rotated 90°, face-down
- **Top**: Horizontal row, face-down
- **Right**: Vertical stack, rotated 90°, face-down

## Integration Points

### In `app/page.tsx`:
```typescript
{currentScreen === 'gameplay' && (
  <div className="fixed inset-0 z-50 animate-fade-in">
    <GamePlay />
  </div>
)}
```

### Navigation Flow:
LoginScreen → RoomSelectionScreen → GameRoomMenu → **GamePlay** (after clicking INICIAR)

## Usage Example

```typescript
import GamePlay from "@/components/GamePlay"

export default function GameScreen() {
  return (
    <div className="game-container">
      <GamePlay />
    </div>
  )
}
```

## Future Enhancements

1. **Card Validation**
   - Validate card matches discard pile color or number
   - Implement action card effects (Draw 2, Skip, Reverse)
   - Handle Wild card color selection

2. **Turn Management**
   - Implement turn timer
   - Auto-draw if can't play
   - Implement skip/reverse logic

3. **Win Conditions**
   - Detect when player has 1 card (UNO!)
   - Implement win/lose screens
   - Score calculation

4. **Multiplayer Synchronization**
   - Backend API integration
   - Real-time updates via WebSocket
   - Player disconnect handling

5. **UI Improvements**
   - Chat system between players
   - Player avatars and names
   - Card animations and sounds
   - Game statistics and history

6. **Accessibility**
   - Keyboard navigation support
   - Screen reader compatibility
   - High contrast mode

## Performance Considerations

- Uses `useState` hooks for efficient re-renders
- Grid layout optimized for 3D transforms
- Card arrays managed efficiently
- No unnecessary component re-renders

## Testing Checklist

- [ ] Game initializes with correct card distribution
- [ ] Cards can be drawn from pile
- [ ] Cards can be played to discard pile
- [ ] Turn advances correctly between players
- [ ] Opponent cards show face-down
- [ ] Your cards are selectable and interactive
- [ ] Game color updates when card is played
- [ ] 3D perspective renders correctly
- [ ] Responsive scaling on different screen sizes
- [ ] Card animations work smoothly

## Browser Compatibility

- Requires CSS Grid support
- Requires CSS 3D Transforms
- Tested on: Chrome, Firefox, Safari (latest versions)
- Node 18+, Next.js 15.5.4+
