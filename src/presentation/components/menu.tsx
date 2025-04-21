'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function Menu() {
  const [isOpen, setIsOpen] = useState(false);
  const links = [
    { href: '/', label: 'Home' },
    { href: '/books', label: 'Books' },
    { href: '/forum', label: 'Forum' },
  ];

  return (
    <>
      {/* Mobile Menu */}
      <div className={`fixed top-16 left-0 w-full bg-white shadow-lg lg:hidden 
        transform transition-transform duration-300 ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}
      >
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block px-6 py-3 hover:bg-gray-100"
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Desktop Menu */}
      <nav className="hidden lg:block fixed left-0 top-16 h-full w-64 shadow-lg">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="block px-6 py-3 hover:bg-gray-100"
          >
            {link.label}
          </Link>
        ))}
      </nav>
    </>
  );
}
