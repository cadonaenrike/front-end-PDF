"use client";
import { useEffect, useState } from "react";
import { ProductData } from "@/interfaces/ProductData";
import { toast } from "react-toastify";
import decryptJwt from "../decripted/decript";
import { GetAbout } from "@/pages/api/about";
import { getProductById } from "@/pages/api/LIbraryApi";
import CardComponent from "../card/card";
import PdfCardComponent from "../card/PdfCardComponent";

const Library = () => {
  const [cards, setCards] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);
  const [nameUser, setNameUser] = useState<string>("");
  const [cpfUser, setCpfUser] = useState<string>("");

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        // Obtem o token decodificado (ou os dados do usuário) usando decryptJwt
        const data = decryptJwt();
        // Chama GetAbout para obter os dados da conta, que incluem o array de compras
        const response = await GetAbout(data!.usuario.id);
        const compras: string[] = response.data.usuario.compras;
        setNameUser(response.data.usuario.nome);
        setCpfUser(response.data.usuario.cpf);
        // Para cada ID de compra, chama getProductById para obter os detalhes do produto
        const productPromises = compras.map((id) =>
          getProductById(parseInt(id))
        );
        const products = await Promise.all(productPromises);
        // Mapeia os dados recebidos para o formato esperado pelo ProductData
        const mappedProducts: ProductData[] = products.map((product: any) => ({
          id: product.id.toString(),
          title: product.nome_produto,
          description: product.descricao,
          price: parseFloat(product.valor),
          link: product.link || "/categories",
          imageSrc:
            product.fotos && product.fotos.length > 0
              ? `data:image/png;base64,${product.fotos[0]}`
              : "/path/to/default-image.png",
          imageAlt: product.nome_produto,
          category: product.categoria,
          nivelEnsino: product.nivel_ensino,
          url: product.url || "",
        }));
        setCards(mappedProducts);
        setLoading(false);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
        toast.error("Erro ao carregar suas compras.");
        setLoading(false);
      }
    };

    fetchPurchases();
  }, []);
  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Minha Biblioteca</h2>
      <div className="bg-white p-6 ">
        {loading ? (
          <div className="text-center p-6">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
            <p className="mt-2 text-gray-500">Carregando...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {cards.map((card, index) => (
              <PdfCardComponent
                userCPF={cpfUser}
                key={index}
                category={card.category}
                description={card.description}
                link={card.link}
                nivelEnsino={card.nivelEnsino}
                price={card.price}
                url={card.url}
                id={card.id}
                title={card.title}
                imageSrc={card.imageSrc}
                imageAlt={card.imageAlt}
                userName={nameUser}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Library;
