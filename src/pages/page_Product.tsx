import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { ProductData } from "@/interfaces/ProductData";
import { getAllProducts, getProductById } from "./api/LIbraryApi";
import { FaStar } from "react-icons/fa";
import Carousel from "@/components/carrosel/carrosel";

const ProductPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [product, setProduct] = useState<ProductData | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [cards, setCards] = useState<ProductData[]>([]);

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
          imageSrc: `data:image/png;base64,${product.fotos[0]}`,
          imageAlt: product.nome_produto,
          category: product.categoria,
        }));
        setCards(mappedProducts);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (id) {
      const numericId = Array.isArray(id)
        ? parseInt(id[0], 10)
        : parseInt(id, 10);

      const fetchProduct = async () => {
        try {
          const fetchedProduct = await getProductById(numericId);
          const mappedProduct: ProductData = {
            id: fetchedProduct.id.toString(),
            title: fetchedProduct.nome_produto,
            description: fetchedProduct.descricao,
            price: parseFloat(fetchedProduct.valor),
            link: "/categories",
            imageSrc: fetchedProduct.fotos
              ? `data:image/png;base64,${fetchedProduct.fotos[0]}`
              : "/path/to/default-image.png", // Imagem padrão se fotos for null
            imageAlt: fetchedProduct.nome_produto,
            category: fetchedProduct.categoria,
          };
          setProduct(mappedProduct);
        } catch (error) {
          console.error("Erro ao carregar o produto:", error);
        }
      };

      fetchProduct();
    }
  }, [id]);

  if (!product) {
    return (
      <div className="text-center p-6">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
        <p className="mt-2 text-gray-500">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 mt-4">
      {/* Detalhes do Produto */}
      <div className="flex flex-col md:flex-row mt-8 items-start">
        <div className="w-full md:w-[65%] lg:w-[60%]">
          <div className="w-full h-full flex items-center justify-center bg-gray-100 rounded overflow-hidden">
            <Image
              src={product.imageSrc}
              alt={product.imageAlt}
              width={300}
              height={300}
              layout="responsive"
              objectFit="contain"
              quality={100}
              className="object-contain max-h-[50vh]"
            />
          </div>
        </div>
        <div className="w-full md:w-[35%] lg:w-[40%] md:ml-8 mt-4 md:mt-0">
          <h1 className="text-2xl font-semibold">{product.title}</h1>
          <p className="text-gray-600 mt-2">Código: {product.id}</p>
          <div className="flex items-center mt-2">
            <div className="flex space-x-1">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-amber-500" />
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
              className="mt-1 block w-20 p-2 border-gray-300 rounded"
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
      <div className="w-full flex flex-col my-12">
        <h2 className="text-center font-jost text-4xl md:text-5xl mb-12 font-semibold">
          Descrição
        </h2>
        <p className="text-gray-700 text-lg md:text-2xl mt-4">
          {product.description}
        </p>
      </div>

      {/* Produtos Relacionados */}
      <div className="p-4 mt-20">
        <h2 className="text-black text-center font-jost text-4xl md:text-5xl font-semibold mb-6">
          Produtos Relacionados
        </h2>
        <div className="mx-auto px-4 sm:px-2 md:px-8 lg:px-20 xl:px-40">
          <Carousel cards={cards} />
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
