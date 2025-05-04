'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

interface Book {
  id: string
  title: string
  description: string
  cover: string
  author: string
  price: number
}

export default function BookPage({ params }: { params: { bookId: string } }) {
  const [book, setBook] = useState<Book | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBook = async () => {
      try {
        const response = await fetch(`http://localhost:8080/books/${params.bookId}`)

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }

        const data: Book = await response.json()
        setBook(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch book')
      } finally {
        setLoading(false)
      }
    }

    fetchBook()
  }, [params.bookId])

  if (loading) return <div className="text-center py-8">Загрузка книги...</div>
  if (error) return <div className="text-red-500 text-center py-8">Ошибка: {error}</div>
  if (!book) return <div className="text-center py-8">Книга не найдена</div>

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/3">
          <img
            src={book.cover}
            alt={book.title}
            className="w-full rounded-lg shadow-lg"
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/default-cover.jpg'
            }}
          />
        </div>

        <div className="md:w-2/3">
          <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
          <p className="text-xl text-gray-600 mb-4">{book.author}</p>
          <p className="text-2xl font-bold mb-6">{book.price.toLocaleString('ru-RU')} ₽</p>
          <p className="mb-8 text-gray-700 leading-relaxed">{book.description}</p>

          <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Обсуждение книги</h2>
            <Link
              href={`/books/${book.id}/forum`}
              className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors"
            >
              Перейти к обсуждению
              <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
