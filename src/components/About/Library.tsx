// src/pages/about/library.tsx
import { useEffect, useState } from "react";
import CardComponent from "@/components/card/card";
import { ProductData } from "@/interfaces/ProductData";
import { fetchCardData } from "@/pages/api/LIbraryApi";

const Library = () => {
  const [cards, setCards] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data: ProductData[] = await fetchCardData();
        setCards(data);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Minha Biblioteca</h2>
      <div className="bg-white p-6 rounded-lg border-2">
        {loading ? (
          <h1 className="text-center text-2xl text-black font-bold">Loading...</h1>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cards.map((card, index) => (
              <CardComponent
                key={index}
                category={card.category}
                description={card.description}
                id={card.id}
                imageAlt={card.imageAlt}
                imageSrc={card.imageSrc}
                link={card.link}
                title={card.title}
                price={card.price}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
