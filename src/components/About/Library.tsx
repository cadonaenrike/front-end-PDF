// src/pages/about/library.tsx
import { useEffect, useState } from "react";
import CardComponent from "@/components/card/card";
import { ProductData } from "@/interfaces/ProductData";

const Library = () => {
  const [cards, setCards] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const data: ProductData[] = await fetchCardData();
        // setCards(data);
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
          <div className=" text-center p-6">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
            <p className="mt-2 text-gray-500">Carregando...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cards.map((card, index) => (
              <CardComponent
                key={index}
                category={card.category}
                description={card.category}
                id={card.id}
                imageAlt={card.imageAlt}
                imageSrc={card.imageSrc}
                link={card.link}
                nivelEnsino={card.nivelEnsino}
                price={card.price}
                title={card.title}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
