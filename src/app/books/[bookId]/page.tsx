import Menu from '@/presentation/components/menu';
import TopBar from '@/presentation/components/topbar';
import Link from 'next/link';

interface Book {
  id: string;
  title: string;
  description: string;
  cover: string;
  author: string;
  price: number;
}

// Получение данных книги
async function getBook(id: string): Promise<Book> {
  return {
    id,
    title: `Книга ${id}`,
    description: 'Подробное описание книги...',
    cover: `/book${id}.jpg`,
    author: 'Автор книги',
    price: 500 + Number(id) * 100,
  };
}

export default async function BookPage({
  params,
}: {
  params: { bookId: string };
}) {
  const book = await getBook(params.bookId);

  return (
    <>
      <TopBar />
      <div className="flex">
        <Menu />
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/3">
              <img src={book.cover} alt={book.title} className="w-full rounded-lg" />
            </div>
            <div className="md:w-2/3">
              <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
              <p className="text-xl text-gray-600 mb-4">{book.author}</p>
              <p className="text-2xl font-bold mb-6">{book.price} ₽</p>
              <p className="mb-8">{book.description}</p>
              {/* Ссылка на форум */}
              <div className="mt-8 p-4 bg-gray-50 rounded-lg">
                <h2 className="text-xl font-semibold mb-4">Обсуждение книги</h2>
                <Link
                  href={`/books/${book.id}/forum`}
                  className="text-blue-600 hover:underline"
                >
                  Перейти к обсуждению →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>);
}
