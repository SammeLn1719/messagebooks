// types/book.ts
export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  price: number;
  cover?: string;
}

export type User = {
  id: number
  username: string
  email: string
  isAdmin?: boolean
  createdAt?: string
}
