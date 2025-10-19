import type { PageConfig } from '../schemas'

type Filter = NonNullable<PageConfig['filters']>[number]
type Field = PageConfig['fields'][number]

interface FiltersBarProps {
  filters: Filter[]
  fields: Field[]
}

export function FiltersBar({ filters, fields }: FiltersBarProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {filters.map(filter => {
        const field = fields.find(f => f.fieldName === filter.field)
        if (!field) return null

        switch (filter.type) {
          case 'text':
            return (
              <input
                key={filter.field}
                placeholder={filter.label || field.title}
                className="border px-2 py-1 rounded text-sm"
              />
            )

          case 'select':
            return (
              <select
                key={filter.field}
                className="border px-2 py-1 rounded text-sm"
              >
                <option value="">Все</option>
                {filter.options?.map(opt => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            )

          case 'date':
            return (
              <input
                key={filter.field}
                type="date"
                className="border px-2 py-1 rounded text-sm"
              />
            )

          default:
            return null
        }
      })}
    </div>
  )
}
