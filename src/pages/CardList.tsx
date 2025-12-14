/* eslint-disable @typescript-eslint/no-explicit-any */
import type { Field } from '../schemas';

interface CardListProps {
  data: Record<string, unknown>[]
  fields: Field[]
}
export function CardList({ data, fields }: CardListProps) {
  const visibleFields = fields.filter(f => f.visible);
  const sortedFields = [...visibleFields].sort((a: any, b: any) => a.order - b.order);
  const titleField = sortedFields[0];
  const detailFields = sortedFields.slice(1);

  const formatValue = (value: unknown, field: Field): string => {
    if (value === null || value === undefined) return '—';
    const strValue = String(value);
    
    switch (field.fieldType) {
      case 'date':
        return new Date(strValue).toLocaleDateString('ru-RU', {
          day: '2-digit',
          month: '2-digit',
          year: 'numeric'
        });
      case 'number':
        return Number(value).toLocaleString('ru-RU');
      case 'select':
        return strValue;
      default:
        return strValue;
    }
  };

  const badgeColors = [
    'bg-blue-100 text-blue-700 border-blue-200',
    'bg-purple-100 text-purple-700 border-purple-200',
    'bg-green-100 text-green-700 border-green-200',
    'bg-orange-100 text-orange-700 border-orange-200',
    'bg-pink-100 text-pink-700 border-pink-200',
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      {data.map((item, idx) => {
        const accentColor = badgeColors[idx % badgeColors.length];
        
        return (
          <div 
            key={idx} 
            className="bg-white rounded-xl p-4 border border-gray-200 hover:border-blue-400 hover:shadow-lg transition-all duration-200 active:scale-[0.98] cursor-pointer"
          >
            {/* Заголовок карточки */}
            {titleField && (
              <div className="mb-3 pb-3 border-b border-gray-100">
                <h3 className="text-base font-bold text-gray-900 leading-tight mb-1.5">
                  {formatValue(item[titleField.fieldName], titleField)}
                </h3>
                <div className="w-10 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              </div>
            )}

            {/* Остальные поля */}
            <div className="space-y-2.5">
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
                      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${accentColor}`}>
                        {value}
                      </span>
                    ) : (
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