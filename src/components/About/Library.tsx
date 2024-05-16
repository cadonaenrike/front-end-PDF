// src/pages/about/library.tsx
import { useEffect, useState } from "react";
import CardComponent from "@/components/card/card";
import { CardData } from "@/interfaces/CardData";
import { fetchCardData } from "@/pages/api/LIbraryApi";

const Library = () => {
  const [cards, setCards] = useState<CardData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchCardData();
        setCards(data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Minha Biblioteca</h2>
      <div className="bg-white p-6 rounded-lg border-2">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {cards.map((card, index) => (
            <CardComponent
              key={index}
              title={card.title}
              description={card.description}
              price={card.price}
              imageSrc={card.imageSrc}
              imageAlt={card.imageAlt}
              link={card.link}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Library;
