// types/book.ts
export interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
  price: number;
  cover?: string;
}
