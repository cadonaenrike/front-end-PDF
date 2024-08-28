import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { FetchedProduct, ProductData } from "@/interfaces/ProductData";
import Filters from "@/components/Sidebar/SideBarFilter";
import CardComponent from "@/components/card/card";
import { getAllProducts } from "./api/LIbraryApi";

const CategoriesAllPage: React.FC = () => {
  const router = useRouter();
  const { category } = router.query;

  const [products, setProducts] = useState<ProductData[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProducts: FetchedProduct[] = await getAllProducts();

        const mappedProducts: ProductData[] = fetchedProducts.map(
          (product: FetchedProduct) => ({
            id: product.id.toString(),
            title: product.nome_produto,
            description: product.descricao,
            price: parseFloat(product.valor),
            link: "/Login",
            imageSrc: `data:image/png;base64,${product.fotos[0]}`,
            imageAlt: product.nome_produto,
            category: product.categoria,
          })
        );

        setProducts(mappedProducts);
        setFilteredProducts(mappedProducts);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    if (category) {
      setSelectedCategories([decodeURIComponent(category as string)]);
    }
  }, [category]);

  useEffect(() => {
    let tempProducts = products;

    if (selectedCategories.length > 0) {
      tempProducts = tempProducts.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    if (selectedPriceRange) {
      const [minPrice, maxPrice] = selectedPriceRange
        .split("-")
        .map((price) => parseFloat(price));
      tempProducts = tempProducts.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );
    }

    setFilteredProducts(tempProducts);
  }, [selectedCategories, selectedPriceRange, products]);

  if (loading) {
    return (
      <div className="text-center p-6">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
        <p className="mt-2 text-gray-500">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-auto bg-white">
      <div className="w-full gap-2 flex m-0 p-0">
        <div className="flex min-w-[15%] ">
          <Filters
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedPriceRange={selectedPriceRange}
            setSelectedPriceRange={setSelectedPriceRange}
          />
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6  ">
          {filteredProducts.map((product) => (
            <CardComponent key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesAllPage;
