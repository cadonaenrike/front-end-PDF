"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import logo from "@/images/logoAtualizadaFotter.png";
import Link from "next/link";
import { FiMenu, FiX } from "react-icons/fi"; // Ícones do menu e de fechamento
import decryptJwt from "../decripted/decript";

const Header = () => {
  const [userData, setUserData] = useState<any>(null);
  const [admin, setAdmin] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Estado do menu sanduíche

  useEffect(() => {
    if (typeof window !== "undefined") {
      setTimeout(() => {
        const token = sessionStorage.getItem("jwt");
        if (token) {
          const decodedToken = decryptJwt();
          if (decodedToken) {
            setUserData(decodedToken);
            setAdmin(decodedToken.usuario.admin);
          }
        }
      }, 4000);
    }
  }, []);

  // Função para alternar o menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b-4 border-blue-800">
      <nav className="flex items-center justify-between w-full px-4 py-2.5 md:py-4 lg:px-8 mx-auto max-w-screen-2xl">
        {/* Logo */}
        <div className="flex-initial w-[30%]">
          <Link href={"/"} className="flex items-center">
            <Image src={logo} alt="Logo" width={200} height={100} />
          </Link>
        </div>

        {/* Ícone do menu sanduíche para dispositivos móveis */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-800 focus:outline-none"
          >
            {isMenuOpen ? <FiX size={30} /> : <FiMenu size={30} />}
          </button>
        </div>

        {/* Menu completo - esconde em dispositivos móveis */}
        <div
          className={`w-[70%] md:flex ${
            isMenuOpen ? "block" : "hidden"
          } md:flex items-center justify-end`}
        >
          <div className="flex flex-col md:flex-row items-center gap-4">
            {/* Search Form */}
            <div className="w-full min-w-96 md:flex items-center relative hidden">
              <form className="w-full">
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 text-gray-700"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10C19 12.125 18.2635 14.078 17.0319 15.6177L23.4142 22L22 23.4142L15.6177 17.0319C14.078 18.2635 12.125 19 10 19C5.02944 19 1 14.9706 1 10ZM10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3Z"
                      />
                    </svg>
                  </span>
                  <input
                    type="search"
                    name="search"
                    className="pl-10 py-3 w-full border border-gray-300 rounded-lg text-sm bg-gray-200 placeholder-gray-500 focus:outline-none focus:border-gray-400"
                    placeholder="Faça sua pesquisa aqui..."
                  />
                </div>
              </form>
            </div>

            {/* Welcome Message */}
            <Link href={"/About"}>
              <div className="min-w-36 flex items-center justify-center p-2 bg-gray-200 border border-gray-200 shadow-sm rounded-lg">
                <svg
                  className="mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M7 6C7 3.23858 9.23858 1 12 1C14.7614 1 17 3.23858 17 6C17 8.76142 14.7614 11 12 11C9.23858 11 7 8.76142 7 6ZM12 3C10.3431 3 9 4.34315 9 6C9 7.65685 10.3431 9 12 9C13.6569 9 15 7.65685 15 6C15 4.34315 13.6569 3 12 3Z"
                    fill="black"
                  />
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M2 22C2 16.4772 6.47715 12 12 12C17.5228 12 22 16.4772 22 22V23H2V22ZM4.06189 21H19.9381C19.446 17.0537 16.0796 14 12 14C7.92038 14 4.55399 17.0537 4.06189 21Z"
                    fill="black"
                  />
                </svg>
                {userData && userData.usuario.nome !== null ? (
                  <span className="text-neutral-700 text-sm whitespace-nowrap">
                    {userData.usuario.nome}
                  </span>
                ) : (
                  <span className="text-neutral-700 text-sm whitespace-nowrap">
                    Seja Bem-vindo
                  </span>
                )}
              </div>
            </Link>

            {/* Cart Icon */}
            <Link href={"/Cart"}>
              <div className=" min-w-36 flex items-center justify-center p-2 bg-gray-200 border border-gray-200 shadow-sm rounded-lg">
                <svg
                  className="mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M1 1H5.82993L6.57993 5H23.443L19.693 15H8.45493L8.82993 17H19V19H7.17007L4.17007 3H1V1ZM8.07993 13H18.307L20.557 7H6.95493L8.07993 13Z"
                    fill="black"
                  />
                  <path
                    d="M8 21.5C8 20.6716 8.67157 20 9.5 20C10.3284 20 11 20.6716 11 21.5C11 22.3284 10.3284 23 9.5 23C8.67157 23 8 22.3284 8 21.5Z"
                    fill="black"
                  />
                  <path
                    d="M15 21.5C15 20.6716 15.6716 20 16.5 20C17.3284 20 18 20.6716 18 21.5C18 22.3284 17.3284 23 16.5 23C15.6716 23 15 22.3284 15 21.5Z"
                    fill="black"
                  />
                </svg>
                <span className="text-neutral-700 text-sm whitespace-nowrap">
                  Seu Carrinho
                </span>
              </div>
            </Link>

            {/* Admin Icon */}
            {admin && (
              <Link href={"/Admin"}>
                <div className="min-w-36 flex items-center justify-center p-2 bg-gray-200 border border-gray-200 shadow-sm rounded-lg">
                  <svg
                    className="mr-2"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M7 6C7 3.23858 9.23858 1 12 1C14.7614 1 17 3.23858 17 6C17 8.76142 14.7614 11 12 11C9.23858 11 7 8.76142 7 6ZM12 3C10.3431 3 9 4.34315 9 6C9 7.65685 10.3431 9 12 9C13.6569 9 15 7.65685 15 6C15 4.34315 13.6569 3 12 3Z"
                      fill="black"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2 22C2 16.4772 6.47715 12 12 12C17.5228 12 22 16.4772 22 22V23H2V22ZM4.06189 21H19.9381C19.446 17.0537 16.0796 14 12 14C7.92038 14 4.55399 17.0537 4.06189 21Z"
                      fill="black"
                    />
                  </svg>
                  <span className="text-neutral-700 text-sm whitespace-nowrap">
                    Admin
                  </span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
