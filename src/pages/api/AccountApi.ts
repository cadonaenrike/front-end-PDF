// src/services/accountService.ts
import { AccountData } from "@/interfaces/AccountData";

export const fetchAccountData = async (): Promise<AccountData> => {
  // Simulação de uma chamada de API com dados falsos
  const fakeData: AccountData = {
    nome: "João Silva",
    sexo: "Masculino",
    dataNascimento: "01/01/1990",
    email: "joao.silva@example.com",
    telefoneCelular: "(11) 98765-4321",
    endereco: {
      endereco: "Rua Exemplo, 123",
      bairro: "Centro",
      cidadeUF: "São Paulo/SP",
      cep: "01000-000",
      pais: "Brasil",
    },
  };

  // Simular um atraso de rede
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return fakeData;
};
