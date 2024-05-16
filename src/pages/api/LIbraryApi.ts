// src/services/cardService.ts
import { CardData } from "@/interfaces/CardData";

export const fetchCardData = async (): Promise<CardData[]> => {
  // Simulação de uma chamada de API com dados falsos
  const fakeData: CardData[] = [
    {
      title: "Produto 1",
      description: "Descrição do produto 1",
      price: "R$19,90",
      imageSrc:
        "https://media.gettyimages.com/id/157482029/pt/foto/pilha-de-livros.jpg?s=612x612&w=0&k=20&c=myOJb6QEPe3OX7IO_youGJY_qc9KF699encUvHRP1E0=",
      imageAlt: "Produto 1",
      link: "/produto1",
    },
    {
      title: "Produto 2",
      description: "Descrição do produto 2",
      price: "R$29,90",
      imageSrc:
        "https://media.gettyimages.com/id/157482029/pt/foto/pilha-de-livros.jpg?s=612x612&w=0&k=20&c=myOJb6QEPe3OX7IO_youGJY_qc9KF699encUvHRP1E0=",
      imageAlt: "Produto 2",
      link: "/produto2",
    },
    // Adicione mais dados conforme necessário
  ];

  // Simular um atraso de rede
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return fakeData;
};
