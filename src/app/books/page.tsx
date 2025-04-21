'use client'

import Menu from "@/presentation/components/menu";
import TopBar from "@/presentation/components/topbar";
import Link from "next/link";


interface Book {
  id: string;
  title: string;
  cover: string;
  author: string;
  price: number;
}

async function getBooks(): Promise<Book[]> {
  return [
    { id: '1', title: 'Книга 1', cover: '/book1.jpg', author: 'Автор 1', price: 500 },
    { id: '2', title: 'Книга 2', cover: '/book2.jpg', author: 'Автор 2', price: 600 },
  ];
}

export default async function CatalogPage() {
  const books = await getBooks();
  return (
    <>
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
    </>
  );
}
