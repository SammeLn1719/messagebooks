import { headers } from 'next/headers'

export default async function ProfilePage({ params }: { params: { id: string } }) {
  // Получаем user из headers, установленных middleware
  const userJson = headers().get('x-user')
  const user = userJson ? JSON.parse(userJson) : null

  if (!user || user.id.toString() !== params.id) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Доступ запрещен</h1>
        <p>У вас нет прав для просмотра этой страницы</p>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Профиль пользователя</h1>
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 rounded-full bg-blue-500 flex items-center justify-center text-white text-2xl">
          {user.username.charAt(0).toUpperCase()}
        </div>
        <div>
          <h2 className="text-xl font-semibold">{user.username}</h2>
          <p className="text-gray-600">{user.email}</p>
          {user.isAdmin && (
            <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
              Администратор
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
