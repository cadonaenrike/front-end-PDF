// components/Header.tsx
import Image from "next/image";
import React from "react";
import logo from "@/images/logo.png"; // Substitua pelo caminho correto do seu logo

const Header = () => {
  return (
    <header className="sticky top-0 inset-x-0 flex flex-wrap md:flex-nowrap z-50 w-full bg-white border-b-4  border-blue-800 text-sm py-2.5 md:py-4">
      <nav className="flex flex-nowrap basis-full gap-x-10 items-center w-full mx-auto px-4 md:px-8 lg:max-w-[120rem]">
        <a className="flex-none rounded-md">
          <Image src={logo} alt="logo" />
        </a>

        <div className="flex items-center gap-3 ms-auto md:w-full md:gap-x-3 md:order-3 md:ms-0">
          <div className="relative group transition ms-auto">
            <form>
              <div className="relative ps-10">
                <input
                  type="text"
                  name="quick-search"
                  id="quick-search-orig"
                  className="hidden md:block p-2 ps-4 pe-16 min-h-14  lg:min-w-[45rem] w-full bg-gray-200 border-gray-200 shadow-sm rounded-lg text-sm placeholder:text-neutral-500 group-hover:border-gray-300"
                  placeholder="Faça sua pesquisa aqui.."
                />
                <div className="hidden md:block absolute inset-y-0 end-0 px-5">
                  <button
                    type="button"
                    className="group block rounded-lg p-[.6875rem] group-hover:border-gray-300 md:absolute md:inset-y-0 md:start-0 md:flex md:items-center md:pointer-events-none md:ps-3"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        fill-rule="evenodd"
                        clip-rule="evenodd"
                        d="M1 10C1 5.02944 5.02944 1 10 1C14.9706 1 19 5.02944 19 10C19 12.125 18.2635 14.078 17.0319 15.6177L23.4142 22L22 23.4142L15.6177 17.0319C14.078 18.2635 12.125 19 10 19C5.02944 19 1 14.9706 1 10ZM10 3C6.13401 3 3 6.13401 3 10C3 13.866 6.13401 17 10 17C13.866 17 17 13.866 17 10C17 6.13401 13.866 3 10 3Z"
                        fill="#737373"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>

          <div className="flex items-center relative z-10">
            <div className="lg:ms-1 flex">
              <div className="flex items-center md:p-2 min-h-14 ps-4 pe-10 lg:min-w-[12.5rem] w-full bg-gray-200 border-gray-200 shadow-sm rounded-lg text-sm placeholder:text-neutral-500 group-hover:border-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M7 6C7 3.23858 9.23858 1 12 1C14.7614 1 17 3.23858 17 6C17 8.76142 14.7614 11 12 11C9.23858 11 7 8.76142 7 6ZM12 3C10.3431 3 9 4.34315 9 6C9 7.65685 10.3431 9 12 9C13.6569 9 15 7.65685 15 6C15 4.34315 13.6569 3 12 3Z"
                    fill="black"
                  />
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M2 22C2 16.4772 6.47715 12 12 12C17.5228 12 22 16.4772 22 22V23H2V22ZM4.06189 21H19.9381C19.446 17.0537 16.0796 14 12 14C7.92038 14 4.55399 17.0537 4.06189 21Z"
                    fill="black"
                  />
                </svg>
                <div className="ps-3 text-neutral-700 font-normal">
                  Seja Bem-vindo
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center relative z-10">
            <div className="lg:ms-1 flex">
              <div className="flex items-center md:p-2 min-h-14 ps-4 pe-16 lg:min-w-[12.5rem] w-full bg-gray-200 border-gray-200 shadow-sm rounded-lg text-sm placeholder:text-neutral-500 group-hover:border-gray-300">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
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
                <div className="ps-2 text-neutral-700 font-normal">
                  Seu Carrinho
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Header;
