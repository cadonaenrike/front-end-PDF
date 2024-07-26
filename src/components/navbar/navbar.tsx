import Link from "next/link";
import React from "react";

const NavBar = () => {
  return (
    <nav className="bg-white text-sm py-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-center w-full">
        {/* Links da NavBar */}
        <div className="flex flex-row items-center gap-x-4">
          <Link
            className="font-normal text-black text-xl hover:text-blue-500"
            href="/"
            aria-current="page"
          >
            Home
          </Link>
          <Link
            className="font-normal text-black text-xl border-l-2 pl-3 hover:text-blue-500"
            href="/categories"
            aria-current="page"
          >
            Disciplinas
          </Link>
          <Link
            className="font-normal text-black text-xl border-l-2 pl-4 hover:text-blue-500"
            href="/categories"
            aria-current="page"
          >
            Categorias
          </Link>
          <Link
            className="font-normal text-black text-xl border-l-2 pl-4 hover:text-blue-500"
            href="/AboutCompany"
            aria-current="page"
          >
            Sobre
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
