// src/components/Sidebar/SideBar.tsx
import Link from "next/link";
import { FaUser, FaList, FaBook, FaSignOutAlt } from "react-icons/fa";

interface SidebarProps {
  setActiveComponent: (component: string) => void;
  activeComponent: string;
}

const SidebarAbout: React.FC<SidebarProps> = ({
  setActiveComponent,
  activeComponent,
}) => {
  const handleLogout = () => {
    // Remove o token do sessionStorage
    sessionStorage.removeItem("jwt");
    // Redireciona para a página inicial
    window.location.href = "/";
  };

  return (
    <div className="md:w-1/5 md:h-screen mt-8 bg-white ">
      <nav className="mt-4 mx-4">
        <ul className="flex flex-col gap-4">
          <li
            className={`flex items-center p-4 border-b-2 border-black  hover:bg-blue-200 transition ${
              activeComponent === "Account"
                ? "bg-blue-500 rounded-lg border-white  text-white"
                : "text-black"
            }`}
            onClick={() => setActiveComponent("Account")}
          >
            <FaUser className="mr-2" />
            <span>Minha Conta</span>
          </li>
          <li
            className={`flex items-center p-4 border-b-2 border-black  hover:bg-blue-200 transition ${
              activeComponent === "Orders"
                ? "bg-blue-500 rounded-lg border-white text-white"
                : "text-black"
            }`}
            onClick={() => setActiveComponent("Orders")}
          >
            <FaList className="mr-2" />
            <span>Meus Pedidos</span>
          </li>
          <li
            className={`flex items-center p-4 border-b-2 border-black  hover:bg-blue-200 transition ${
              activeComponent === "Library"
                ? "bg-blue-500 rounded-lg border-white text-white"
                : "text-black"
            }`}
            onClick={() => setActiveComponent("Library")}
          >
            <FaBook className="mr-2" />
            <span>Minha Biblioteca</span>
          </li>
          <li className="flex items-center p-4 border-b-2 border-black  text-black hover:bg-blue-200 transition">
            <FaSignOutAlt className="mr-2" />
            <button onClick={handleLogout}>Sair</button>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SidebarAbout;
