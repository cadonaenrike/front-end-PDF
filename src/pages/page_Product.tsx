import Image from "next/image";
import Carousel from "@/components/carrosel/carrosel";
import { ProductData } from "@/interfaces/ProductData";
import { useState } from "react";

const ProductPage = () => {
  const [quantity, setQuantity] = useState(1);

  const product: ProductData = {
    id: "1",
    title:
      "APOSTILA DE ALFABETIZAÇÃO – PRINCÍPIO ALFABÉTICO, CONSCIÊNCIA FONOLÓGICA E MATERIAL DE APOIO",
    description:
      "Este COMBO compreende 3 apostilas para o componente curricular de QUÍMICA para o Ensino Médio. As apostilas abordam todos os principais conteúdos do componente curricular, de acordo com as habilidades da BNCC, para cada ano de ensino.",
    price: 19.9,
    link: "/Login",
    imageSrc:
      "https://media.gettyimages.com/id/157482029/pt/foto/pilha-de-livros.jpg?s=612x612&w=0&k=20&c=myOJb6QEPe3OX7IO_youGJY_qc9KF699encUvHRP1E0=",
    imageAlt: "Capa da Apostila",
    category: "Alfabetização",
  };

  const relatedProducts = Array(3).fill(product);

  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 mt-4">
    
   

      {/* Detalhes do Produto */}
      <div className="flex flex-col md:flex-row mt-8">
        <div className="flex-1">
          <Image
            src={product.imageSrc}
            alt={product.imageAlt}
            width={500}
            height={500}
            layout="responsive"
            className="rounded"
          />
        </div>
        <div className="flex-1 md:ml-8 mt-4 md:mt-0">
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <p className="text-gray-600 mt-2">Código: AP4545</p>
          <div className="flex items-center mt-2">
            {/* Estrelas */}
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <Image
                  key={i}
                  src="/icons/star-outline.svg"
                  alt="Star"
                  width={20}
                  height={20}
                />
              ))}
            </div>
          </div>
          <div className="mt-4">
            <label htmlFor="quantity" className="block text-sm font-medium">
              Quantidade
            </label>
            <select
              id="quantity"
              name="quantity"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value))}
              className="mt-1 block w-16 p-2 border-gray-300 rounded"
            >
              {[1, 2, 3, 4, 5].map((q) => (
                <option key={q} value={q}>
                  {q}
                </option>
              ))}
            </select>
          </div>
          <p className="text-gray-500 mt-4">
            <strong>Estoque:</strong> Disponível
          </p>
          <div className="mt-6 space-y-4">
            <button className="w-full bg-blue-500 text-white py-2 px-4 rounded">
              Comprar
            </button>
            <button className="w-full bg-white text-blue-500 border border-blue-500 py-2 px-4 rounded">
              Adicionar ao Carrinho
            </button>
          </div>
        </div>
      </div>

      {/* Descrição */}
      <div className="mt-12">
        <h2 className="text-2xl font-semibold">Descrição</h2>
        <p className="text-gray-700 mt-4">{product.description}</p>
      </div>

      {/* Produtos Relacionados */}
      <div className="mt-16">
        <h2 className="text-2xl font-semibold mb-6">Produtos Relacionados</h2>
        <Carousel cards={relatedProducts} />
      </div>

      
    </div>
  );
};

export default ProductPage;
