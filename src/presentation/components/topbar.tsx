'use client';

import SearchInput from "../hooks/SearchInput";
import UserMenu from "../hooks/UserMenu";
import Logo from "./logo";

export default function TopBar() {
  return (
    <header className="w-full fixed bg-black-100 h-12 shadow-md px-6 py-3 flex justify-between items-center">
      <Logo />
      <SearchInput />
      {/*<UserMenu />*/}
    </header>
  );
}
