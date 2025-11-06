import { Card } from '@/lib/gameTypes'

interface CardProps {
  card: Card
  onClick?: () => void
  isClickable?: boolean
  faceDown?: boolean
}

export default function CardComp({
  card,
  onClick,
  isClickable = false,
  faceDown = false
}: CardProps) {
  const colorMap: Record<string, string> = {
    red: 'bg-red-600',
    yellow: 'bg-yellow-300',
    blue: 'bg-blue-600',
    green: 'bg-green-600',
    black: 'bg-gray-900'
  }

  const textColorMap: Record<string, string> = {
    red: 'text-white',
    yellow: 'text-gray-900',
    blue: 'text-white',
    green: 'text-white',
    black: 'text-white'
  }

  return (
    <div
      onClick={onClick}
      className={`
        w-20 h-32 rounded-lg border-2 border-gray-300 shadow-lg
        transition-all duration-200 flex flex-col items-center justify-center
        ${isClickable ? 'hover:scale-110 hover:shadow-xl cursor-pointer' : ''}
        ${faceDown ? 'bg-gradient-to-br from-blue-900 to-blue-800' : colorMap[card.color]}
      `}
    >
      {!faceDown && (
        <>
          <div className={`text-xl font-bold ${textColorMap[card.color]}`}>
            {card.display}
          </div>
        </>
      )}
      {faceDown && (
        <div className="text-3xl">🃏</div>
      )}
    </div>
  )
}
