// components/Catalog.tsx (Client Component)
'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  price: number;
  cover?: string;
}

interface CatalogProps {
  initialBooks: Book[];
}

export default function Catalog({ initialBooks }: CatalogProps) {
  const [books, setBooks] = useState<Book[]>(initialBooks);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Для ревалидации данных на клиенте
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await fetch('/api/books');
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        setError('Error updating data');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return <div>Updating...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="top-12 relative h-auto container mx-auto px-4 py-i8">
      <h1 className="text-3xl font-bold mb-8">Каталог книг</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <Link key={book.id} href={`/books/${book.id}`}>
            <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow cursor-pointer">
              <img src={book.cover} alt={book.title} className="w-full h-64 object-cover mb-4" />
              <h2 className="text-xl font-semibold">{book.title}</h2>
              <p className="text-gray-600">{book.author}</p>
              <p className="text-lg font-bold mt-2">{book.price} ₽</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

