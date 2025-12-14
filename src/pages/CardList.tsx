/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Field } from '../schemas';

interface CardListProps {
  data: Record<string, unknown>[]
  fields: Field[]
}

export function CardList({ data, fields }: CardListProps) {
  const visibleFields = fields.filter(f => f.visible);
  
  // Сортируем поля по order
  const sortedFields = [...visibleFields].sort((a: any, b: any) => a.order - b.order);
  
  // Первое поле = заголовок
  const titleField = sortedFields[0];
  const detailFields = sortedFields.slice(1);

  // Функция для форматирования значения в зависимости от типа
  const formatValue = (value: unknown, field: Field): string => {
    if (value === null || value === undefined) return '—';
    
    const strValue = String(value);
    
    // Форматирование по типу поля
    switch (field.fieldType) {
      case 'date':
        // Форматируем дату
        return new Date(strValue).toLocaleDateString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
      
      case 'number':
        // Форматируем число
        return Number(value).toLocaleString('ru-RU');
      
      case 'select':
        // Можно добавить бейдж
        return strValue;
      
      default:
        return strValue;
    }
  };

  // Цвета для бейджей (циклически)
  const badgeColors = [
    'bg-blue-100 text-blue-700 border-blue-200',
    'bg-purple-100 text-purple-700 border-purple-200',
    'bg-green-100 text-green-700 border-green-200',
    'bg-orange-100 text-orange-700 border-orange-200',
    'bg-pink-100 text-pink-700 border-pink-200',
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {data.map((item, idx) => {
        const accentColor = badgeColors[idx % badgeColors.length];
        
        return (
          <div 
            key={idx} 
            className="bg-white rounded-xl p-5 border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200 active:scale-[0.98] cursor-pointer"
          >
            {/* Заголовок карточки */}
            {titleField && (
              <div className="mb-4 pb-4 border-b border-gray-100">
                <h3 className="text-lg font-bold text-gray-900 leading-tight mb-2">
                  {formatValue(item[titleField.fieldName], titleField)}
                </h3>
                <div className="w-12 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </div>
            )}

            {/* Остальные поля */}
            <div className="space-y-3">
              {detailFields.map((field) => {
                const value = formatValue(item[field.fieldName], field);
                const isSelectField = field.fieldType === 'select';
                
                return (
                  <div 
                    key={field.fieldName} 
                    className="flex items-center justify-between gap-3"
                  >
                    <span className="text-sm text-gray-500 font-medium flex-shrink-0">
                      {field.title}
                    </span>
                    
                    {isSelectField ? (
                      // Поля типа select отображаем как бейджи
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${accentColor}`}>
                        {value}
                      </span>
                    ) : (
                      // Остальные поля - обычный текст
                      <span className="text-sm font-semibold text-gray-900 text-right break-words">
                        {value}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}