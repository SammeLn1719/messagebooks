// app/api/books.ts
import { NextResponse } from 'next/server'

export async function GET() {
  const mockBooks = [
    { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },
    { id: 2, title: '1984', author: 'George Orwell' },
  ]

  // Имитация задержки сервера
  await new Promise(resolve => setTimeout(resolve, 1000))

  return NextResponse.json(mockBooks)
}
