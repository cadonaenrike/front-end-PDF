// src/services/cardService.ts

export const fetchCardData = async () => {
  // Simulação de uma chamada de API com dados falsos
  const fakeData = [
    {
      id: "23",
      title: "Produto 1",
      description: "Descrição do produto 1",
      price: 19.9,
      category: "alfabetização ",
      imageSrc:
        "https://media.gettyimages.com/id/157482029/pt/foto/pilha-de-livros.jpg?s=612x612&w=0&k=20&c=myOJb6QEPe3OX7IO_youGJY_qc9KF699encUvHRP1E0=",
      imageAlt: "Produto 1",
      link: "/produto1",
    },
    {
      id: "28",
      title: "Produto 2",
      description: "Descrição do produto 2",
      price: 29.9,
      category: "alfabetização ",
      imageSrc:
        "https://media.gettyimages.com/id/157482029/pt/foto/pilha-de-livros.jpg?s=612x612&w=0&k=20&c=myOJb6QEPe3OX7IO_youGJY_qc9KF699encUvHRP1E0=",
      imageAlt: "Produto 2",
      link: "/produto2",
    },
    {
      id: "27",
      title: "Produto 3",
      category: "alfabetização ",
      description: "Descrição do produto 3",
      price: 39.9,
      imageSrc:
        "https://media.gettyimages.com/id/157482029/pt/foto/pilha-de-livros.jpg?s=612x612&w=0&k=20&c=myOJb6QEPe3OX7IO_youGJY_qc9KF699encUvHRP1E0=",
      imageAlt: "Produto 3",
      link: "/produto3",
    },
    {
      id: "279",
      title: "Produto 4",
      description: "Descrição do produto 4",
      price: 49.9,
      category: "alfabetização ",
      imageSrc:
        "https://media.gettyimages.com/id/157482029/pt/foto/pilha-de-livros.jpg?s=612x612&w=0&k=20&c=myOJb6QEPe3OX7IO_youGJY_qc9KF699encUvHRP1E0=",
      imageAlt: "Produto 4",
      link: "/produto4",
    },
  ];

  // Simular um atraso de rede
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return fakeData;
};
