import type { PageConfig } from '../schemas'
import { ActionsBar } from './ActionsBar'
import { CardList } from './CardList'
import { FiltersBar } from './FiltersBar'

export type EntityRecord = Record<string, string | number | boolean | null>

interface PageRendererProps<T extends Record<string, unknown> = Record<string, unknown>> {
  config: PageConfig
  data: T[]
}

export function PageRenderer<T extends Record<string, unknown>>({ config, data }: PageRendererProps<T >) {
  const { pageName, layout, filters, fields, actions } = config
  console.log('🚀 ~ PageRenderer ~ layout:', layout)

  return (
    <div className="p-4 flex flex-col gap-4">
      {/* Заголовок */}
      <header className="flex items-center justify-between">
        <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">{pageName}</h1>

        {/* Панель действий */}
        {actions && actions.length > 0 && <ActionsBar actions={actions} />}
      </header>

      {/* Панель фильтров */}
      {filters && filters.length > 0 && (
        <FiltersBar filters={filters} fields={fields} />
      )}

      {/* Основной контент */}
      <main>
        <CardList fields={fields} data={data} />
      </main>
    </div>
  )
}
