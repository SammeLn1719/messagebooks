'use client';

import { useState } from 'react';
import SearchInput from '../hooks/SearchInput';

export default function Topbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 w-full shadow-sm z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          className="p-2 lg:hidden"
        >
          ☰
        </button><h1 className="text-xl font-bold">My App</h1>
        <SearchInput />
      </div>
    </header>
  );
}
