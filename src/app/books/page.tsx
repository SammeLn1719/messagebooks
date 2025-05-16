// src/app/book/page.tsx
'use client'

import Link from "next/link";
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Book {
  id: string;
  title: string;
  cover: string;
  author: string;
  price: number;
}

// Анимации
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  hidden: { 
    opacity: 0, 
    x: -100,
    scale: 0.95 
  },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 20
    }
  }
};

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
    <div className="relative h-auto container mx-auto px-4">
      <motion.h1 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8 text-center"
      >
        Каталог книг
      </motion.h1>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {books.map((book) => (
          <motion.div
            key={book.id}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href={`/books/${book.id}`}>
              <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer bg-white">
                <motion.img
                  src={book.cover}
                  alt={book.title}
                  className="w-full h-64 object-cover mb-4 rounded-lg"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = '/default-cover.jpg'
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
                <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
                <p className="text-gray-600 mb-2">{book.author}</p>
                <p className="text-lg font-bold text-blue-600">{book.price} ₽</p>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>  )
}
