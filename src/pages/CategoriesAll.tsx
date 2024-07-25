import React, { useState, useEffect } from "react";
import Image from "next/image";
import { ProductData } from "@/interfaces/ProductData";
import Filters from "@/components/Sidebar/SideBarFilter";
import CardComponent from "@/components/card/card";

const HomePage: React.FC = () => {
  const [products, setProducts] = useState<ProductData[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("");

  useEffect(() => {
    // Fetch products from an API or define them statically
    const fetchedProducts: ProductData[] = [
      {
        id: '1',
        title: "ALFABETIZAÇÃO",
        description: "PRINCÍPIO ALFABÉTICO, CONSCIÊNCIA FONOLÓGICA, MATERIAL DE APOIO",
        price: 19.9,
        link: "/Login",
        imageSrc: "https://media.gettyimages.com/id/157482029/pt/foto/pilha-de-livros.jpg?s=612x612&w=0&k=20&c=myOJb6QEPe3OX7IO_youGJY_qc9KF699encUvHRP1E0=",
        imageAlt: "Capa da Apostila",
        category: "Alfabetização",
      },
      // Add more products here
    ];

    setProducts(fetchedProducts);
    setFilteredProducts(fetchedProducts);
  }, []);

  useEffect(() => {
    let tempProducts = products;

    if (selectedCategories.length > 0) {
      tempProducts = tempProducts.filter((product) =>
        selectedCategories.includes(product.category)
      );
    }

    if (selectedPriceRange) {
      const [minPrice, maxPrice] = selectedPriceRange.split("-").map((price) => parseFloat(price));
      tempProducts = tempProducts.filter(
        (product) => product.price >= minPrice && product.price <= maxPrice
      );
    }

    setFilteredProducts(tempProducts);
  }, [selectedCategories, selectedPriceRange, products]);

  return (
    <div className="w-full h-auto bg-white">
      <div className="flex">
        <Filters
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          selectedPriceRange={selectedPriceRange}
          setSelectedPriceRange={setSelectedPriceRange}
        />
        <div className="flex flex-wrap">
          {filteredProducts.map((product) => (
           <CardComponent key={product.id} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
