import type { PageConfig } from '../schemas'

type Action = NonNullable<PageConfig['actions']>[number]

interface ActionsBarProps {
  actions: Action[]
}

export function ActionsBar({ actions }: ActionsBarProps) {
  return (
    <div className="flex gap-2">
      {actions.map(action => (
        <button
          key={action.id}
          className="bg-blue-600 text-white px-3 py-1 rounded text-sm"
        >
          {action.icon && <span className="mr-1">{action.icon}</span>}
          {action.label}
        </button>
      ))}
    </div>
  )
}
