// src/interfaces/AccountData.ts
export interface AccountData {
  nome: string;
  sexo: string;
  dataNascimento: string;
  email: string;
  telefoneCelular: string;
  endereco: {
    endereco: string;
    bairro: string;
    cidadeUF: string;
    cep: string;
    pais: string;
  };
}
