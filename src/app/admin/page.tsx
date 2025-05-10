import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function AdminPage() {
  // Правильное использование cookies() с await
  const cookieStore = cookies()
  const sessionCookie = cookieStore.get('session_token')?.value || ''

  try {
    const res = await fetch(`http://localhost:8080/profile`, {
      headers: {
        Cookie: `session_token=${sessionCookie}`
      },
      next: { revalidate: 0 } // Отключаем кэш
    })

    if (!res.ok) throw new Error('Unauthorized')

    const user = await res.json()
    if (!user.isAdmin) {
      redirect('/')
    }

    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Админ-панель</h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Админ-виджеты */}
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">Пользователи</h3>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">Книги</h3>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h3 className="font-semibold">Статистика</h3>
          </div>
        </div>
      </div>
    )
  } catch (err) {
    redirect('/login')
  }
}
