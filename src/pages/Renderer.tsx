import type { PageConfig } from '../schemas'
import { ActionsBar } from './ActionsBar'
import { FiltersBar } from './FiltersBar'
import { CardList } from './CardList'

interface PageRendererProps<T extends Record<string, unknown>> {
  config: PageConfig
  data: T[]
}

export function PageRenderer<T extends Record<string, unknown>>({ config, data }: PageRendererProps<T>) {
  const { pageName, filters, fields, actions } = config
  
  return (
    <div className="flex flex-col gap-4 md:gap-6">
      {/* Заголовок и Actions - адаптивный layout */}
      <header className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Заголовок */}
        <div className="flex items-center gap-3">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-blue-800 truncate">
            {pageName}
          </h1>
          {/* Бейдж с количеством (опционально) */}
          {data.length > 0 && (
            <span className="hidden sm:inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
              {data.length}
            </span>
          )}
        </div>
        
        {/* Панель действий */}
        {actions && actions.length > 0 && (
          <div className="w-full sm:w-auto">
            <ActionsBar actions={actions} />
          </div>
        )}
      </header>

      {/* Панель фильтров */}
      {filters && filters.length > 0 && (
        <FiltersBar filters={filters} fields={fields} />
      )}

      {/* Основной контент */}
      <main>
        {data.length > 0 ? (
          <CardList fields={fields} data={data} />
        ) : (
          // Empty state
          <div className="flex flex-col items-center justify-center py-12 md:py-20">
            <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <svg className="w-10 h-10 md:w-12 md:h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4" />
              </svg>
            </div>
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 mb-2">Нет данных</h3>
            <p className="text-sm md:text-base text-gray-500 text-center max-w-sm px-4">
              Начните добавлять записи, чтобы увидеть их здесь
            </p>
          </div>
        )}
      </main>
    </div>
  )
}