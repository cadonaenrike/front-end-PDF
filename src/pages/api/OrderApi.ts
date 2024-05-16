// src/services/orderService.ts
import { OrderData } from "@/interfaces/OrderData";

export const fetchOrderData = async (): Promise<OrderData[]> => {
  // Simulação de uma chamada de API com dados falsos
  const fakeData: OrderData[] = [
    {
      id: "#23454",
      dataHora: "02/05/2024",
      pagamento: "Cartão de Crédito",
      status: "Entregue",
      valor: "R$344,90",
    },
    {
      id: "#23455",
      dataHora: "03/05/2024",
      pagamento: "Boleto",
      status: "Pendente",
      valor: "R$500,00",
    },
    {
      id: "#23456",
      dataHora: "04/05/2024",
      pagamento: "Cartão de Débito",
      status: "Processando",
      valor: "R$150,00",
    },
    {
      id: "#23457",
      dataHora: "05/05/2024",
      pagamento: "Pix",
      status: "Cancelado",
      valor: "R$200,00",
    },
    {
      id: "#23458",
      dataHora: "06/05/2024",
      pagamento: "Cartão de Crédito",
      status: "Entregue",
      valor: "R$99,90",
    },
    {
      id: "#23459",
      dataHora: "07/05/2024",
      pagamento: "Boleto",
      status: "Pendente",
      valor: "R$450,00",
    },
    {
      id: "#23460",
      dataHora: "08/05/2024",
      pagamento: "Cartão de Débito",
      status: "Processando",
      valor: "R$300,00",
    },
    {
      id: "#23461",
      dataHora: "09/05/2024",
      pagamento: "Pix",
      status: "Entregue",
      valor: "R$50,00",
    },
    {
      id: "#23462",
      dataHora: "10/05/2024",
      pagamento: "Cartão de Crédito",
      status: "Pendente",
      valor: "R$600,00",
    },
    {
      id: "#23463",
      dataHora: "11/05/2024",
      pagamento: "Boleto",
      status: "Entregue",
      valor: "R$250,00",
    },
    {
      id: "#23464",
      dataHora: "12/05/2024",
      pagamento: "Cartão de Débito",
      status: "Cancelado",
      valor: "R$120,00",
    },
    {
      id: "#23465",
      dataHora: "13/05/2024",
      pagamento: "Pix",
      status: "Processando",
      valor: "R$180,00",
    },
  ];

  // Simular um atraso de rede
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return fakeData;
};
