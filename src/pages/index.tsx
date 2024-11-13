import { useState, useEffect } from "react";
import Image from "next/image";
import Banner from "@/images/banner.png";
import Carousel from "@/components/carrosel/carrosel";
import CategoryButton from "@/components/category/CategoryButton";
import { categories } from "@/components/data/CategoryesImagesArray";
import { ProductData } from "@/interfaces/ProductData";
import Link from "next/link";
import { getAllProducts } from "./api/LIbraryApi";

const Home = () => {
  const [cards, setCards] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getAllProducts();

        const mappedProducts: ProductData[] = products.map((product: any) => ({
          id: product.id.toString(),
          title: product.nome_produto,
          description: product.descricao,
          price: parseFloat(product.valor),
          link: "/categories",
          // Junte as partes do array `fotos` em uma única string Base64
          imageSrc: `data:image/png;base64,${product.fotos.join("")}`,
          imageAlt: product.nome_produto,
          category: product.categoria,
        }));

        setCards(mappedProducts);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-center p-6">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
        <p className="mt-2 text-gray-500">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-hidden">
      {/* Header */}
      <div className="w-full">
        <Image
          className="w-full h-auto"
          src={Banner}
          alt="Banner"
          layout="responsive"
        />
      </div>

      {/* Card Section */}
      <div className=" lg:mx-48 mt-20">
        <h2 className="text-black text-center font-jost text-5xl font-semibold mb-6">
          Categorias
        </h2>
        <div className="mx-auto px-2 sm:px-2 md:px-8 lg:px-20 xl:px-40 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link key={index} href={category.path}>
              <CategoryButton
                name={category.name}
                path={category.path}
                imageSrc={category.image}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Best Sellers */}
      <div className="p-4 mt-40">
        <h2 className="text-black text-center font-jost text-5xl font-semibold mb-6">
          Mais Vendidos
        </h2>
        <div className="mx-auto px-4 sm:px-2 md:px-8 lg:px-20 xl:px-40">
          <Carousel cards={cards} />
        </div>
      </div>
    </div>
  );
};

export default Home;
