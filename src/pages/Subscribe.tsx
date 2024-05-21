import { useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import Link from "next/link";
import { createAccount } from "./api/SubscribeApi";

interface AccountData {
  nome: string;
  senha: string;
  dataNascimento: string;
  email: string;
  cpf: string;
  telefoneCelular: string;
}

const Subscribe = () => {
  const [accountData, setAccountData] = useState<AccountData>({
    nome: "",
    senha: "",
    dataNascimento: "",
    email: "",
    cpf: "",
    telefoneCelular: "",
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccountData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log(accountData);
      const response = await createAccount(accountData);
      toast.success("Conta criada com sucesso!");
      router.push("/login");
    } catch (error) {
      console.error("Failed to create account:", error);
      toast.error("Falha ao criar a conta. Por favor, tente novamente.");
    }
  };

  return (
    <div className="m-4 flex flex-col justify-center px-28">
      <form onSubmit={handleSubmit} className="w-full mx-auto">
        <div className="bg-white p-8">
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">Seus dados para acesso</h2>
            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label className="block text-sm font-medium mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  name="nome"
                  required
                  value={accountData.nome}
                  onChange={handleChange}
                  className="form-input py-2 px-1 bg-gray-200 w-full"
                />
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  required
                  value={accountData.email}
                  onChange={handleChange}
                  className="form-input py-2 px-1 bg-gray-200 w-full"
                />
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label className="block text-sm font-medium mb-1">CPF</label>
                <input
                  type="text"
                  name="cpf"
                  required
                  value={accountData.cpf}
                  onChange={handleChange}
                  className="form-input py-2 px-1 bg-gray-200 w-full"
                />
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label className="block text-sm font-medium mb-1">Senha</label>
                <input
                  type="password"
                  name="senha"
                  required
                  value={accountData.senha}
                  onChange={handleChange}
                  className="form-input py-2 px-1 bg-gray-200 w-full"
                />
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label className="block text-sm font-medium mb-1">
                  Data de Nascimento
                </label>
                <input
                  type="date"
                  name="dataNascimento"
                  required
                  value={accountData.dataNascimento}
                  onChange={handleChange}
                  className="form-input py-2 px-1 bg-gray-200 w-full"
                />
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label className="block text-sm font-medium mb-1">
                  Telefone Celular
                </label>
                <input
                  type="text"
                  name="telefoneCelular"
                  required
                  value={accountData.telefoneCelular}
                  onChange={handleChange}
                  className="form-input py-2 px-1 bg-gray-200 w-full"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center mb-6">
            <input
              id="agreement"
              type="checkbox"
              required
              className="form-checkbox bg-gray-200"
            />
            <label htmlFor="agreement" className="ml-2">
              Li e concordo com os termos de uso.
            </label>
          </div>

          <div className="flex items-center justify-center flex-col">
            <button
              type="submit"
              className="w-1/3 py-2 px-4 min-h-9 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center font-inter text-lg font-semibold capitalize"
            >
              Cadastrar
            </button>

            <button className="w-1/3 mt-2 py-2 px-4 min-h-9 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-center font-inter text-lg font-semibold capitalize">
              <Link href="/Login">Cancelar</Link>
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Subscribe;
