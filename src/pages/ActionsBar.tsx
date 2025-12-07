import type { PageConfig } from '../schemas'

type Action = NonNullable<PageConfig['actions']>[number]

interface ActionsBarProps {
  actions: Action[]
}

export function ActionsBar({ actions }: ActionsBarProps) {
  // Определяем стиль для каждого типа действия (можно расширить)
  const getActionStyle = (action: Action) => {
    // Если есть определенный тип, можно применить разные стили
    // Для примера используем вариации на основе позиции
    const styles = [
      'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 shadow-blue-500/30',
      'bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 shadow-purple-500/30',
      'bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 shadow-green-500/30',
      'bg-gradient-to-r from-orange-600 to-orange-700 hover:from-orange-700 hover:to-orange-800 shadow-orange-500/30',
      'bg-gradient-to-r from-pink-600 to-pink-700 hover:from-pink-700 hover:to-pink-800 shadow-pink-500/30',
    ]
    
    const index = actions.indexOf(action) % styles.length
    return styles[index]
  }

  if (actions.length === 0) return null

  return (
    <div className="flex flex-wrap gap-2 md:gap-3 items-center justify-end">
      {actions.map(action => (
        <button
          key={action.id}
          className={`
            group relative px-3 md:px-5 py-2 md:py-2.5 rounded-xl text-white text-xs md:text-sm font-semibold
            shadow-lg hover:shadow-xl transition-all duration-200
            hover:scale-105 active:scale-95
            flex items-center gap-1.5 md:gap-2
            ${getActionStyle(action)}
          `}
        >
          {/* Эффект блеска при hover */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform -skew-x-12"></div>
          
          {/* Лейбл */}
          <span className="relative z-10 whitespace-nowrap">
            {action.label}
          </span>
        </button>
      ))}
      
      {/* Дополнительная кнопка "Еще" если действий много - показываем только на desktop */}
      {actions.length > 3 && (
        <button
          className="hidden lg:flex px-4 py-2.5 rounded-xl border-2 border-gray-300 bg-white text-gray-700 text-sm font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-200 items-center gap-2 group"
        >
          <span className="text-gray-500 group-hover:text-gray-700 transition-colors">
            Еще
          </span>
        </button>
      )}
    </div>
  )
}