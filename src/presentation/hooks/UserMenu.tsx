'use client';

import { useSession, signIn, signOut } from 'next-auth/react';

export default function UserMenu() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <button
        onClick={() => signIn()}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Войти
      </button>
    );
  }

  const user = session.user;

  return (
    <div className="flex items-center gap-2">
      <img
        src={user?.image || '/default-avatar.png'}
        alt="Аватар"
        className="w-8 h-8 rounded-full"
      />
      <span>{user?.name}</span>
      <button
        onClick={() => signOut()}
        className="text-sm text-red-500 ml-2"
      >
        Выйти
      </button>
    </div>
  );
}
