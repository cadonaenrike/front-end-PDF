// pages/subscribe.tsx

import Link from "next/link";

const Subscribe = () => {
  return (
    <div className=" m-4 flex flex-col justify-center px-28">
      <div className=" w-full mx-auto">
        <div className="bg-white p-8">
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">Seus dados para acesso</h2>
            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  className=" form-input py-2 px-1 bg-gray-200 w-full"
                />
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label className="block text-sm font-medium mb-1">
                  Confirmar Email
                </label>
                <input
                  type="email"
                  className=" form-input py-2 px-1 bg-gray-200 w-full"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label className="block text-sm font-medium mb-1">
                  Criar Senha
                </label>
                <input
                  type="password"
                  className=" form-input py-2 px-1 bg-gray-200 w-full"
                />
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label className="block text-sm font-medium mb-1">
                  Confirmar Senha
                </label>
                <input
                  type="password"
                  className=" form-input py-2 px-1 bg-gray-200 w-full"
                />
              </div>
            </div>
          </div>

          <div className="mb-4 mt-6">
            <h2 className="text-2xl font-bold mb-2">Tipo de cadastro</h2>
            <div className="flex gap-8">
              <div className="flex items-center">
                <input
                  id="individual"
                  type="radio"
                  name="type"
                  className="form-radio"
                />
                <label htmlFor="individual" className="ml-2">
                  Pessoa Física
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="company"
                  type="radio"
                  name="type"
                  className="form-radio"
                />
                <label htmlFor="company" className="ml-2">
                  Pessoa Jurídica
                </label>
              </div>
            </div>
          </div>

          <div className="mb-4 mt-6">
            <h2 className="text-2xl font-bold mb-2">Dados Pessoais</h2>
            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label className="block text-sm font-medium mb-1">
                  Nome Completo
                </label>
                <input
                  type="text"
                  className=" form-input py-2 px-1 bg-gray-200 w-full"
                />
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label className="block text-sm font-medium mb-1">CPF</label>
                <input
                  type="text"
                  className=" form-input py-2 px-1 bg-gray-200 w-full"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label className="block text-sm font-medium mb-1">
                  Telefone
                </label>
                <input
                  type="tel"
                  className=" form-input py-2 px-1 bg-gray-200 w-full"
                />
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label className="block text-sm font-medium mb-1">
                  Whatsapp
                </label>
                <input
                  type="tel"
                  className=" form-input py-2 px-1 bg-gray-200 w-full"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label className="block text-sm font-medium mb-1">Sexo</label>
                <select className="form-select w-full bg-gray-200 py-2 px-1">
                  <option>Selecione</option>
                  <option>Masculino</option>
                  <option>Feminino</option>
                </select>
              </div>
              <div className="w-full md:w-1/2 px-2 mb-4">
                <label className="block text-sm font-medium mb-1">
                  Data de Nascimento
                </label>
                <input
                  type="date"
                  className=" form-input py-2 px-1 bg-gray-200 w-full"
                />
              </div>
            </div>
          </div>

          <div className="flex items-center mb-6">
            <input
              id="agreement"
              type="checkbox"
              className="form-checkbox bg-gray-200"
            />
            <label htmlFor="agreement" className="ml-2 ">
              Li e concordo com os termos de uso.
            </label>
          </div>

          <div className="flex items-center justify-center flex-col">
            <button className="w-1/3 py-2 px-4 min-h-9 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center font-inter text-lg font-semibold capitalize">
              Cadastrar
            </button>

            <button className="w-1/3 mt-2 py-2 px-4 min-h-9 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors text-center font-inter text-lg font-semibold capitalize">
              <Link href="/Login">Cancelar</Link>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Subscribe;
