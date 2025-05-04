// src/app/book/page.tsx
'use client'

import Link from "next/link";
import { useEffect, useState } from 'react';

interface Book {
  id: string;
  title: string;
  cover: string;
  author: string;
  price: number;
}

export default function CatalogPage() {
  const [books, setBooks] = useState<Book[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await fetch('http://localhost:8080/books', {
          headers: {
            'Content-Type': 'application/json',
          }
        })

        if (!response.ok) {
          const errorData = await response.json()
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`)
        }

        const data: Book[] = await response.json()
        setBooks(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch books')
      } finally {
        setLoading(false)
      }
    }

    fetchBooks()
  }, []);

  if (loading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="top-12 relative h-auto container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Каталог книг</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <Link key={book.id} href={`/books/${book.id}`}>
            <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-64 object-cover mb-4"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/default-cover.jpg'
                }}
              />
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p className="text-gray-600">{book.author}</p>
              <p className="text-lg font-bold mt-2">{book.price} ₽</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
