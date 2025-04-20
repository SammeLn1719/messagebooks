'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

type MenuItem = {
  path: string;
  label: string;
  icon?: string; // опциональное поле для иконок
};

interface LayoutProps {
  children?: React.ReactNode;
  menuItems?: MenuItem[]; // Опциональные данные меню
}

const defaultMenuItems: MenuItem[] = [
  { path: '/', label: 'Главная' },
  { path: '/books', label: 'Книги' },
  { path: '/forum', label: 'Обсуждения' }, // Fixed typo
];

const Menu: React.FC<LayoutProps> = ({ menuItems = defaultMenuItems }) => {
  const currentPath = usePathname();

  return (
    <div className="flex min-h-screen">
      {/* Боковое меню */}
      <nav className="w-64 top-12 bg-black-100 p-4 fixed h-full">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <Link
                href={item.path}
                className={`block px-4 py-2 rounded transition-colors
                 ${currentPath === item.path
                    ? 'bg-blue-500 text-white'
                    : 'text-black-700 hover:bg-gray-200'
                  }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Menu;
