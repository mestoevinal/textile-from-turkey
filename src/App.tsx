export function App() {
  const client = {
    name: 'Иван Петров',
    email: 'ivan.petrov@example.com',
    status: 'Активен',
    createdAt: '15 октября 2024',
  }

  return (
    <div className="min-h-screen bg-[#f5f6fa] flex items-center justify-center p-6">
      <div className="w-full max-w-sm bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 transition hover:-translate-y-1 hover:shadow-xl duration-300">
        {/* Верхний блок с аватаркой и именем */}
        <div className="flex items-center gap-4 p-6 border-b border-gray-100">
          <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-lg font-semibold">
            {client.name[0]}
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800">{client.name}</h2>
            <p className="text-sm text-gray-500">{client.email}</p>
          </div>
        </div>

        {/* Основная информация */}
        <div className="p-6 space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-500">Статус</span>
            <span className="text-green-600 font-medium">{client.status}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500">Дата регистрации</span>
            <span className="text-gray-800">{client.createdAt}</span>
          </div>
        </div>

        {/* Нижний блок с действиями */}
        <div className="bg-gray-50 px-6 py-3 flex justify-end gap-3 border-t border-gray-100">
          <button className="px-3 py-1.5 rounded-md text-sm font-medium bg-blue-600 text-white hover:bg-blue-700 transition">
            Редактировать
          </button>
          <button className="px-3 py-1.5 rounded-md text-sm font-medium text-red-600 hover:bg-red-50 transition">
            Удалить
          </button>
        </div>
      </div>
    </div>
  )
}
