import type { PageConfig } from '../schemas'

type Filter = NonNullable<PageConfig['filters']>[number]
type Field = PageConfig['fields'][number]

interface FiltersBarProps {
  filters: Filter[]
  fields: Field[]
}

export function FiltersBar({ filters, fields }: FiltersBarProps) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
      {/* Заголовок */}
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 shadow-lg shadow-blue-500/30">
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
          </svg>
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Фильтры</h2>
          <p className="text-sm text-gray-500">Настройте параметры поиска</p>
        </div>
      </div>

      {/* Фильтры */}
      <div className="flex flex-wrap gap-3">
        {filters.map(filter => {
          const field = fields.find(f => f.fieldName === filter.field)
          if (!field) return null

          const label = filter.label || field.title

          switch (filter.type) {
            case 'text':
              return (
                <div key={filter.field} className="group relative">
                  <label className="block text-xs font-medium text-gray-600 mb-1.5 transition-colors group-focus-within:text-blue-600">
                    {label}
                  </label>
                  <div className="relative">
                    <input
                      placeholder={`Введите ${label?.toLowerCase()}`}
                      className="w-full min-w-[200px] px-4 py-2.5 rounded-xl border-2 border-gray-200 bg-gray-50 text-sm font-medium text-gray-900 placeholder:text-gray-400 transition-all duration-200 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 hover:border-gray-300"
                    />
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </div>
                  </div>
                </div>
              )

            case 'select':
              return (
                <div key={filter.field} className="group relative">
                  <label className="block text-xs font-medium text-gray-600 mb-1.5 transition-colors group-focus-within:text-blue-600">
                    {label}
                  </label>
                  <div className="relative">
                    <select
                      className="w-full min-w-[200px] px-4 py-2.5 pr-10 rounded-xl border-2 border-gray-200 bg-gray-50 text-sm font-medium text-gray-900 appearance-none transition-all duration-200 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 hover:border-gray-300 cursor-pointer"
                    >
                      <option value="">Все варианты</option>
                      {filter.options?.map(opt => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none group-focus-within:text-blue-500 transition-colors">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              )

            case 'date':
              return (
                <div key={filter.field} className="group relative">
                  <label className="block text-xs font-medium text-gray-600 mb-1.5 transition-colors group-focus-within:text-blue-600">
                    {label}
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full min-w-[200px] px-4 py-2.5 rounded-xl border-2 border-gray-200 bg-gray-50 text-sm font-medium text-gray-900 transition-all duration-200 focus:outline-none focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10 hover:border-gray-300 cursor-pointer"
                    />
                  </div>
                </div>
              )

            default:
              return null
          }
        })}

        {/* Кнопка применить */}
        {filters.length > 0 && (
          <div className="flex items-end">
            <button className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm font-semibold shadow-lg shadow-blue-500/30 hover:shadow-xl hover:shadow-blue-500/40 hover:scale-105 active:scale-95 transition-all duration-200 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Применить
            </button>
          </div>
        )}
      </div>
    </div>
  )
}