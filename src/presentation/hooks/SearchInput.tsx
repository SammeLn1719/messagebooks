'use client';
import { useState } from 'react';

export default function SearchInput() {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    // тут можно вызвать роутинг или API
    console.log('Ищем:', query);
  };

  return (
    <div className="flex items-center border rounded px-2">
      <input
        type="text"
        placeholder="Поиск..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="px-2 py-1 outline-none"
      />
      <button onClick={handleSearch} className="text-sm text-blue-600 ml-2">
        Найти
      </button>
    </div>
  );
}
