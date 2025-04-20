import Menu from '@/presentation/components/menu';
import TopBar from '@/presentation/components/topbar';
import Link from 'next/link';

interface Comment {
  id: string;
  author: string;
  text: string;
  date: string;
}

// Получение данных книги и комментариев
async function getBook(id: string) {
  return {
    id,
    title: `Книга ${id}`,
  };
}

async function getComments(bookId: string): Promise<Comment[]> {
  return [
    { id: '1', author: 'Пользователь 1', text: 'Отличная книга!', date: '2023-01-01' },
    { id: '2', author: 'Пользователь 2', text: 'Рекомендую к прочтению', date: '2023-01-02' },
  ];
}

export default async function ForumPage({
  params,
}: {
  params: { bookId: string };
}) {
  const book = await getBook(params.bookId);
  const comments = await getComments(params.bookId);

  return (
    <>
      <TopBar />
      <div className="flex">
        <Menu />
        <div className="container mx-auto px-4 py-8">
          <Link
            href={`/books/${book.id}`}
            className="text-blue-600 hover:underline mb-4 inline-block"
          >
            ← Назад к книге
          </Link>
          <h1 className="text-3xl font-bold mb-2">Обсуждение: {book.title}</h1>

          <div className="mt-8 space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="border-b pb-4">
                <div className="flex justify-between items-start">
                  <span className="font-semibold">{comment.author}</span>
                  <span className="text-gray-500 text-sm">{comment.date}</span>
                </div>
                <p className="mt-2">{comment.text}</p>
              </div>
            ))}
          </div>

          {/* Форма для нового комментария */}
          <div className="mt-8">
            <h2 className="text-xl font-semibold mb-4">Оставить комментарий</h2>
            <textarea
              className="w-full border rounded-lg p-3 mb-3"
              rows={4}
              placeholder="Ваш комментарий..."
            />
            <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
              Отправить
            </button>
          </div>
        </div>
      </div>
    </>);
}
