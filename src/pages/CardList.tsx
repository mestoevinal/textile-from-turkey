/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Field } from '../schemas';

interface CardListProps {
  data: Record<string, unknown>[]
  fields: Field[]
}

export function CardList({ data, fields }: CardListProps) {
  const visibleFields = fields.filter(f => f.visible);
  const firstField = visibleFields[0];
  const restFields = visibleFields.slice(1);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {data.map((item, idx) => (
        <div 
          key={idx} 
          className="group relative bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100 hover:border-blue-200"
        >
          {/* Декоративный градиент сверху */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"></div>
          
          {/* Фоновый эффект при hover */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 via-purple-50/0 to-pink-50/0 group-hover:from-blue-50/30 group-hover:via-purple-50/20 group-hover:to-pink-50/30 transition-all duration-500"></div>
          
          {/* Контент карточки */}
          <div className="relative p-6">
            {/* Первое поле - заголовок */}
            {firstField && (
              <div className="mb-5 pb-4 border-b border-gray-100">
                <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                  {String(item[firstField.fieldName] ?? '')}
                </h3>
                <p className="text-xs text-gray-500 mt-1.5 font-medium uppercase tracking-wider">
                  {firstField.title}
                </p>
              </div>
            )}
            
            {/* Остальные поля - таблица */}
            <div className="space-y-3">
              {restFields.map((f) => (
                <div 
                  key={f.fieldName} 
                  className="flex items-start justify-between gap-4 py-2.5 rounded-lg hover:bg-gray-50/70 transition-colors px-3 -mx-3"
                >
                  <span className="text-sm font-semibold text-gray-600 flex-shrink-0">
                    {f.title}
                  </span>
                  <span className="text-sm font-bold text-gray-900 text-right break-words">
                    {String(item[f.fieldName] ?? '')}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Декоративный уголок */}
          <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-blue-100/20 to-transparent rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        </div>
      ))}
    </div>
  )
}