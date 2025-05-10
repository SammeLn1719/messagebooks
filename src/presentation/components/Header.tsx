'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import AuthModal from './AuthModal'

type User = {
  id: number
  username: string
  email: string
  isAdmin?: boolean
}

export default function Header() {
  const [isAuthOpen, setIsAuthOpen] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch('http://localhost:8080/profile', {
          credentials: 'include'
        })
        if (res.ok) {
          setUser(await res.json())
        }
      } catch (err) {
        console.error('Failed to fetch user', err)
      }
    }
    fetchUser()
  }, [pathname])

  const handleLogout = async () => {
    try {
      await fetch('http://localhost:8080/logout', {
        method: 'POST',
        credentials: 'include'
      })
      setUser(null)
      router.push('/')
    } catch (err) {
      console.error('Logout failed', err)
    }
  }

  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex justify-between items-center">
        <Link href="/" className="text-xl font-bold">
          BookForum
        </Link>

        <nav className="flex items-center space-x-6">
          <Link href="/books" className="hover:text-blue-500">
            Книги
          </Link>

          {user ? (
            <div className="relative">
              <button
                className="flex items-center space-x-2"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                {user.isAdmin && (
                  <span className="text-xs bg-red-500 text-white px-2 py-1 rounded">
                    ADMIN
                  </span>
                )}
                <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                  {user.username.charAt(0).toUpperCase()}
                </div>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                  {user.isAdmin && (
                    <Link
                      href="/admin"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Админ-панель
                    </Link>
                  )}
                  <Link
                    href={`/profile/${user.id}`}
                    className="block px-4 py-2 text-sm hover:bg-gray-100"
                    onClick={() => setIsDropdownOpen(false)}
                  >
                    Профиль
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    Выйти
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setIsAuthOpen(true)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Войти
            </button>
          )}
        </nav>

        {isAuthOpen && <AuthModal onClose={() => setIsAuthOpen(false)} />}
      </div>
    </header>
  )
}
