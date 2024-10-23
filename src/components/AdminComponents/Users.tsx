import { GetUsers } from "@/pages/api/users";
import { useState, useEffect } from "react";
import ConfirmDeleteUserModal from "./modals/DeleteUserModal";


const Users = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await GetUsers();
        if (response.status === 200) {
          setUsers(response.data);
        }
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.cpf.includes(searchTerm)
  );

  const triggerUpdate = () => {
    setLoading(true);
    GetUsers().then(response => {
      if (response.status === 200) {
        setUsers(response.data);
      }
      setLoading(false);
    });
  };

  return (
    <div className="p-6">
      <div className="w-full my-4 flex justify-between">
        <h1 className="text-2xl font-bold mb-4">Usuários</h1>
        <input
          type="text"
          placeholder="Buscar Cliente por nome, CPF ou email"
          value={searchTerm}
          onChange={handleSearch}
          className="border rounded-md bg-gray-200 text-black p-2 w-1/3"
        />
      </div>

      {loading ? (
        <div className="text-center">Carregando...</div>
      ) : (
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
              {filteredUsers.length > 0 ? (
                filteredUsers.map(user => (
                  <tr key={user.id}>
                    <td className="px-6 py-4 whitespace-nowrap border-b">
                      <span className="text-sm font-medium text-gray-900">{user.name}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b">
                      <span className="text-sm text-gray-500">{user.email}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b">
                      <span className="text-sm text-gray-500">{user.cpf}</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border-b">
                      <div className="flex space-x-4">
                        {/* Modal de confirmação de exclusão */}
                        <ConfirmDeleteUserModal
                          userId={user.id}
                          userName={user.name}
                          triggerUpdate={triggerUpdate}
                        />
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center py-4">
                    Nenhum usuário encontrado
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Users;
