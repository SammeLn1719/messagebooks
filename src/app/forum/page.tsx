'use client'

import Link from 'next/link';
import { motion } from 'framer-motion';
// Вынесем интерфейсы в отдельный файл types.ts при необходимости
interface Book {
  id: string;
  title: string;
  cover: string;
  latestComments: Comment[];
}

interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      when: "beforeChildren"
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 }
};
interface ForumPageProps {
  books: Book[];
}

// Серверная часть
async function getForumData(): Promise<Book[]> {
  return [
    {
      id: '1',
      title: 'Книга 1',
      cover: '/book1.jpg',
      latestComments: [
        { id: '1', author: 'User1', text: 'Отличная книга!', date: '2024-01-15' },
        { id: '2', author: 'User2', text: 'Рекомендую всем', date: '2024-01-14' }
      ]
    },
    {
      id: '2',
      title: 'Книга 2',
      cover: '/book2.jpg',
      latestComments: [
        { id: '3', author: 'User3', text: 'Интересный сюжет', date: '2024-01-13' }
      ]
    }
  ];
}


function ForumComponent({ books }: ForumPageProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-3xl font-bold mb-8"
      >
        Форум обсуждений
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
            className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <Link href={`/books/${book.id}/forum`} className="block">
              <motion.img
                src={book.cover}
                alt={book.title}
                className="w-full h-48 object-cover mb-4 rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              />
              <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
            </Link>

            <motion.div
              className="mt-4 space-y-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h3 className="font-medium text-gray-700">Последние отзывы:</h3>
              {book.latestComments.length > 0 ? (
                book.latestComments.map((comment) => (
                  <motion.div
                    key={comment.id}
                    className="text-sm p-2 bg-gray-50 rounded"
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1 }}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium">{comment.author}</span>
                      <span className="text-gray-500 text-xs">{comment.date}</span>
                    </div>
                    <p className="text-gray-600 line-clamp-2">{comment.text}</p>
                  </motion.div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">Пока нет отзывов</p>
              )}
            </motion.div>

            <Link
              href={`/books/${book.id}/forum`}
              className="mt-4 inline-block text-blue-600 hover:underline text-sm"
            >
              Все отзывы →
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}

export default async function ForumPage() {
  const books = await getForumData();
  return <ForumComponent books={books} />;
}
