import React from "react";

const NavBar = () => {
  return (
    <nav className="bg-white text-sm py-4 dark:bg-neutral-800 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-center w-full">
        {/* Links da NavBar */}
        <div className="flex flex-row items-center gap-x-4">
          <a
            className="font-normal text-black text-xl hover:text-blue-500 dark:text-white dark:hover:text-blue-300"
            href="#home"
            aria-current="page"
          >
            Home
          </a>
          <a
            className="font-normal text-black text-xl border-l-2 pl-3 hover:text-blue-500 dark:text-white dark:hover:text-blue-300"
            href="#disciplinas"
            aria-current="page"
          >
            Disciplinas
          </a>
          <a
            className="font-normal text-black text-xl border-l-2 pl-4 hover:text-blue-500 dark:text-white dark:hover:text-blue-300"
            href="#categorias"
            aria-current="page"
          >
            Categorias
          </a>
          <a
            className="font-normal text-black text-xl border-l-2 pl-4 hover:text-blue-500 dark:text-white dark:hover:text-blue-300"
            href="#sobre"
            aria-current="page"
          >
            Sobre
          </a>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
