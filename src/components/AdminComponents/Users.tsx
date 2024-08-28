import { FaEdit, FaTrash } from "react-icons/fa";
import { useState } from "react";

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  // Dados de exemplo
  const users = [
    { name: "Nome Cliente", email: "email@email.com", cpf: "999.999.999-99" },
    { name: "Nome Cliente", email: "email@email.com", cpf: "999.999.999-99" },
    { name: "Nome Cliente", email: "email@email.com", cpf: "999.999.999-99" },
    { name: "Nome Cliente", email: "email@email.com", cpf: "999.999.999-99" },
    { name: "Nome Cliente", email: "email@email.com", cpf: "999.999.999-99" },
    { name: "Nome Cliente", email: "email@email.com", cpf: "999.999.999-99" },
    { name: "Nome Cliente", email: "email@email.com", cpf: "999.999.999-99" },
    { name: "Nome Cliente", email: "email@email.com", cpf: "999.999.999-99" },
  ];

  return (
    <div className="p-6">
      <div className="w-full my-4 flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Usuários</h1>
        <input
          type="text"
          placeholder="Buscar Cliente por nome, CPF ou email "
          value={searchTerm}
          onChange={handleSearch}
          className="border rounded-md bg-gray-200 text-black p-2 w-1/3"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                E-mail
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                CPF
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Ações
              </th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap border-b">
                  <span className="text-sm font-medium text-gray-900">
                    {user.name}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b">
                  <span className="text-sm text-gray-500">{user.email}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b">
                  <span className="text-sm text-gray-500">{user.cpf}</span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b">
                  <div className="flex space-x-4">
                    <button className="text-gray-800 hover:text-gray-400">
                      <FaEdit />
                    </button>
                    <button className="text-gray-800 hover:text-gray-400">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;
