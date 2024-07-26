// src/pages/about/account.tsx
import { useEffect, useState } from "react";
import { AccountData } from "@/interfaces/AccountData";
import { fetchAccountData } from "@/pages/api/AccountApi";

const Account = () => {
  const [accountData, setAccountData] = useState<AccountData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAccountData();
        setAccountData(data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Minha Conta</h2>
      <div className="border-2 rounded-xl py-5">
        {loading ? (
          <div className="text-center text-2xl text-black font-bold">
            Loading...
          </div>
        ) : (
          <>
            <div className="bg-white rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <path d="M2.5 6.25H5.01125V8.75H2.5V6.25Z" fill="#004AAD" />
                    <path d="M7.5 6.25H27.5V8.75H7.5V6.25Z" fill="#004AAD" />
                    <path
                      d="M2.5 13.75H5.01125V16.25H2.5V13.75Z"
                      fill="#004AAD"
                    />
                    <path d="M7.5 13.75H27.5V16.25H7.5V13.75Z" fill="#004AAD" />
                    <path
                      d="M2.5 21.25H5.01125V23.75H2.5V21.25Z"
                      fill="#004AAD"
                    />
                    <path d="M7.5 21.25H27.5V23.75H7.5V21.25Z" fill="#004AAD" />
                  </svg>
                </span>
                Dados Cadastrais
              </h3>
              <p>
                <strong>Nome:</strong> {accountData?.nome}
              </p>
              <p>
                <strong>Sexo:</strong> {accountData?.sexo}
              </p>
              <p>
                <strong>Data de nascimento:</strong>{" "}
                {accountData?.dataNascimento}
              </p>
              <p>
                <strong>Email:</strong> {accountData?.email}
              </p>
              <p>
                <strong>Telefone celular:</strong>{" "}
                {accountData?.telefoneCelular}
              </p>
              <div className="mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                  Alterar Senha
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                  Editar Dados
                </button>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 mt-6">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <span className="mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 30 30"
                    fill="none"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M10 12.5C10 9.73858 12.2386 7.5 15 7.5C17.7614 7.5 20 9.73858 20 12.5C20 15.2614 17.7614 17.5 15 17.5C12.2386 17.5 10 15.2614 10 12.5ZM15 10C13.6193 10 12.5 11.1193 12.5 12.5C12.5 13.8807 13.6193 15 15 15C16.3807 15 17.5 13.8807 17.5 12.5C17.5 11.1193 16.3807 10 15 10Z"
                      fill="#004AAD"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M3.75 12.5C3.75 6.2868 8.7868 1.25 15 1.25C21.2132 1.25 26.25 6.2868 26.25 12.5C26.25 15.6577 24.8165 18.4253 22.8653 20.9588C21.2349 23.0758 19.1482 25.1445 17.0635 27.2111C16.6692 27.602 16.275 27.9928 15.8839 28.3839L15 29.2678L14.1161 28.3839C13.725 27.9928 13.3308 27.602 12.9365 27.2111C10.8518 25.1445 8.76506 23.0758 7.13465 20.9588C5.18354 18.4253 3.75 15.6577 3.75 12.5ZM15 3.75C10.1675 3.75 6.25 7.66751 6.25 12.5C6.25 14.8651 7.31646 17.0976 9.11535 19.4334C10.6343 21.4056 12.5784 23.3341 14.6653 25.4041C14.7765 25.5144 14.8881 25.625 15 25.7361C15.1119 25.625 15.2235 25.5144 15.3347 25.4041C17.4216 23.3341 19.3657 21.4056 20.8847 19.4334C22.6835 17.0976 23.75 14.8651 23.75 12.5C23.75 7.66751 19.8325 3.75 15 3.75Z"
                      fill="#004AAD"
                    />
                  </svg>
                </span>
                Endereço Principal
              </h3>
              <p>
                <strong>Endereço:</strong> {accountData?.endereco.endereco}
              </p>
              <p>
                <strong>Bairro:</strong> {accountData?.endereco.bairro}
              </p>
              <p>
                <strong>Cidade/UF:</strong> {accountData?.endereco.cidadeUF}
              </p>
              <p>
                <strong>CEP:</strong> {accountData?.endereco.cep}
              </p>
              <p>
                <strong>País:</strong> {accountData?.endereco.pais}
              </p>
              <div className="mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded mr-2">
                  Editar Endereço Principal
                </button>
                <button className="bg-blue-500 text-white px-4 py-2 rounded">
                  Cadastrar Novo Endereço
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Account;
