import type { Field } from '../schemas'

interface CardListProps {
  data: Record<string, unknown>[]
  fields: Field[]
}

export function CardList({ data, fields }: CardListProps) {
  return (
    <div className="flex flex-col gap-3">
      {data.map((item, idx) => (
        <div key={idx} className="border rounded-xl p-3 shadow-sm bg-white">
          {fields
            .filter(f => f.visible)
            .map(f => (
              <div key={f.fieldName} className="flex justify-between text-sm">
                <span>{f.title}</span>
                <span>{item[f.fieldName] as string}</span>
              </div>
            ))}
        </div>
      ))}
    </div>
  )
}
