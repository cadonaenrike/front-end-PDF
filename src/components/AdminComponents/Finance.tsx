import { useState } from "react";

const Finance = () => {
  const [selectedPeriod, setSelectedPeriod] = useState("00/00/00 - 00/00/00");

  const handlePeriodChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedPeriod(event.target.value);
  };

  // Dados de exemplo
  const stats = {
    transactions: 200,
    averageTicket: "R$2.000,00",
    totalGross: "R$2.000,00",
  };

  const transactions = [
    {
      client: "Nome Cliente",
      order: "#9238129",
      value: "R$289,90",
      status: "Pago",
    },
    {
      client: "Nome Cliente",
      order: "#9238129",
      value: "R$289,90",
      status: "Pago",
    },
    {
      client: "Nome Cliente",
      order: "#9238129",
      value: "R$289,90",
      status: "Pago",
    },
    {
      client: "Nome Cliente",
      order: "#9238129",
      value: "R$289,90",
      status: "Pago",
    },
    {
      client: "Nome Cliente",
      order: "#9238129",
      value: "R$289,90",
      status: "Pago",
    },
    {
      client: "Nome Cliente",
      order: "#9238129",
      value: "R$289,90",
      status: "Pago",
    },
    {
      client: "Nome Cliente",
      order: "#9238129",
      value: "R$289,90",
      status: "Pago",
    },
    {
      client: "Nome Cliente",
      order: "#9238129",
      value: "R$289,90",
      status: "Pago",
    },
    {
      client: "Nome Cliente",
      order: "#9238129",
      value: "R$289,90",
      status: "Pago",
    },
    {
      client: "Nome Cliente",
      order: "#9238129",
      value: "R$289,90",
      status: "Pago",
    },
  ];

  return (
    <div className="p-6">
      <div className="flex justify-end mb-4">
        <div>
          <label
            htmlFor="period"
            className="block text-sm font-medium text-gray-700"
          >
            Selecionar período
          </label>
          <input
            type="text"
            id="period"
            value={selectedPeriod}
            onChange={handlePeriodChange}
            className="mt-1 p-2 border rounded-md w-full"
            placeholder="00/00/00 - 00/00/00"
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-200 p-4 rounded-md text-center">
          <h3 className="text-sm font-medium text-gray-500">
            Quantidade de transações
          </h3>
          <p className="mt-2 text-2xl font-semibold">{stats.transactions}</p>
        </div>
        <div className="bg-gray-200 p-4 rounded-md text-center">
          <h3 className="text-sm font-medium text-gray-500">Ticket Médio</h3>
          <p className="mt-2 text-2xl font-semibold">{stats.averageTicket}</p>
        </div>
        <div className="bg-gray-200 p-4 rounded-md text-center">
          <h3 className="text-sm font-medium text-gray-500">Total Bruto</h3>
          <p className="mt-2 text-2xl font-semibold">{stats.totalGross}</p>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-4">Transações</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border rounded-lg">
          <thead>
            <tr>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Cliente
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Pedido
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Valor
              </th>
              <th className="px-6 py-3 border-b text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap border-b">
                  <span className="text-sm font-medium text-gray-900">
                    {transaction.client}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b">
                  <span className="text-sm text-gray-500">
                    {transaction.order}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b">
                  <span className="text-sm text-gray-500">
                    {transaction.value}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap border-b">
                  <span className="text-sm text-gray-500">
                    {transaction.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Finance;
