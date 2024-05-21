// src/components/Sidebar/Sidebar.tsx
import { useState } from "react";
import Link from "next/link";
import { FaUser, FaList, FaBook, FaSignOutAlt } from "react-icons/fa";
import { categories } from "../data/CategoryesImagesArray";

interface SidebarProps {
  setActiveComponent: (component: string) => void;
  activeComponent: string;
}

const Sidebar: React.FC<SidebarProps> = ({
  setActiveComponent,
  activeComponent,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
    setActiveComponent(category);
  };

  return (
    <div className="w-1/5 h-screen mt-8 bg-white border-r-2 border-black p-4">
      <nav className="mb-8">
        <ul className="flex flex-col gap-4">
          <li className="flex items-center justify-between">
            <span className="font-bold">Categorias</span>
            <button className="text-blue-500">▼</button>
          </li>
          {categories.map((category) => (
            <li
              key={category.name}
              className={`ml-4 p-2 hover:underline cursor-pointer ${
                selectedCategory === category.name
                  ? "bg-blue-500 text-white rounded-lg"
                  : "text-black"
              }`}
              onClick={() => handleCategoryClick(category.name)}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </nav>
      <nav>
        <ul className="flex flex-col gap-4">
          <li className="font-bold">Filtrar por Preço</li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              de R$25,00 a R$250,00
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              de R$250,00 a R$500,00
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              de R$500,00 a R$750,00
            </label>
          </li>
          <li>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              de R$750,00 a R$1000,00
            </label>
          </li>
        </ul>
      </nav>
      <nav className="mt-8">
        <ul className="flex flex-col gap-4">
          <li
            className={`flex items-center p-4 hover:bg-blue-200 transition ${
              activeComponent === "Account"
                ? "bg-blue-500 rounded-lg text-white"
                : "text-black"
            }`}
            onClick={() => setActiveComponent("Account")}
          >
            <FaUser className="mr-2" />
            <span>Minha Conta</span>
          </li>
          <li
            className={`flex items-center p-4 hover:bg-blue-200 transition ${
              activeComponent === "Orders"
                ? "bg-blue-500 rounded-lg text-white"
                : "text-black"
            }`}
            onClick={() => setActiveComponent("Orders")}
          >
            <FaList className="mr-2" />
            <span>Meus Pedidos</span>
          </li>
          <li
            className={`flex items-center p-4 hover:bg-blue-200 transition ${
              activeComponent === "Library"
                ? "bg-blue-500 rounded-lg text-white"
                : "text-black"
            }`}
            onClick={() => setActiveComponent("Library")}
          >
            <FaBook className="mr-2" />
            <span>Minha Biblioteca</span>
          </li>
          <li className="flex items-center p-4 hover:bg-blue-200 transition">
            <FaSignOutAlt className="mr-2" />
            <Link href="/Login">
              <a>Sair</a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
