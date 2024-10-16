// src/pages/about/orders.tsx
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import { OrderData } from "@/interfaces/OrderData";
import { fetchOrderData } from "@/pages/api/OrderApi";

const Orders = () => {
  const [orders, setOrders] = useState<OrderData[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Função para traduzir o tipo de pagamento
  const translatePaymentType = (billingType: string) => {
    switch (billingType) {
      case "CREDIT_CARD":
        return "Cartão de Crédito";
      case "PIX":
        return "PIX";
      case "BOLETO":
        return "Boleto";
      default:
        return "Outro";
    }
  };

  // Função para traduzir o status
  const translateStatus = (status: string) => {
    switch (status) {
      case "CONFIRMED":
        return "Confirmado";
      case "PENDING":
        return "Pendente";
      case "CANCELLED":
        return "Cancelado";
      default:
        return "Outro";
    }
  };

  // Função para formatar data no formato dia/mês/ano
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-BR");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchOrderData();

        const formattedData = response.map((order: any) => ({
          id: order.id,
          dataHora: formatDate(order.clientPaymentDate || order.confirmedDate),
          pagamento: translatePaymentType(order.billingType),
          status: translateStatus(order.status),
          valor: `R$ ${order.value.toFixed(2)}`,
        }));

        setOrders(formattedData);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const columns = [
    {
      name: "Pedido",
      selector: (row: OrderData) => row.id,
      sortable: true,
    },
    {
      name: "Data/Hora",
      selector: (row: OrderData) => row.dataHora,
      sortable: true,
    },
    {
      name: "Pagamento",
      selector: (row: OrderData) => row.pagamento,
      sortable: true,
    },
    {
      name: "Status",
      selector: (row: OrderData) => row.status,
      sortable: true,
    },
    {
      name: "Valor",
      selector: (row: OrderData) => row.valor,
      sortable: true,
    },
  ];
  const paginationComponentOptions = {
    rowsPerPageText: "Pedidos por página",
    rangeSeparatorText: "de",
    selectAllRowsItem: true,
    selectAllRowsItemText: "Todos",
  };
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Meus Pedidos</h2>
      <div className="bg-white p-6 border-2 rounded-xl">
        <DataTable
          columns={columns}
          data={orders}
          progressPending={loading}
          noDataComponent="Nenhum pedido encontrado"
          paginationComponentOptions={paginationComponentOptions}
          paginationRowsPerPageOptions={[6, 10, 16, 20]}
          paginationPerPage={6}
          pagination
        />
      </div>
    </div>
  );
};

export default Orders;
