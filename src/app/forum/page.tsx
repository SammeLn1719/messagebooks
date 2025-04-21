
import Link from 'next/link';

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

// Серверная функция для получения данных
async function getForumData(): Promise<Book[]> {
  // В реальном приложении замените на запрос к API
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

export default async function ForumPage() {
  const books = await getForumData();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Форум обсуждений</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <div
            key={book.id}
            className="border rounded-lg p-4 hover:shadow-lg transition-shadow"
          >
            <Link href={`/books/${book.id}/forum`} className="block">
              <img
                src={book.cover}
                alt={book.title}
                className="w-full h-48 object-cover mb-4 rounded-lg"
              />
              <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
            </Link>

            <div className="mt-4 space-y-3">
              <h3 className="font-medium text-gray-700">Последние отзывы:</h3>
              {book.latestComments.length > 0 ? (
                book.latestComments.map((comment) => (
                  <div
                    key={comment.id}
                    className="text-sm p-2 bg-gray-50 rounded"
                  >
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-medium">{comment.author}</span>
                      <span className="text-gray-500 text-xs">{comment.date}</span>
                    </div>
                    <p className="text-gray-600 line-clamp-2">{comment.text}</p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-sm">Пока нет отзывов</p>
              )}
            </div>

            <Link
              href={`/books/${book.id}/forum`} // Исправленная ссылка
              className="mt-4 inline-block text-blue-600 hover:underline text-sm"
            >
              Все отзывы →
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
