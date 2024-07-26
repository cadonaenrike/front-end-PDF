import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ProductData } from "@/interfaces/ProductData";
import Filters from "@/components/Sidebar/SideBarFilter";
import CardComponent from "@/components/card/card";
import productsData from "@/components/data/productsData";

const CategoriesAllPage: React.FC = () => {
  const router = useRouter();
  const { category } = router.query;

  const [products, setProducts] = useState<ProductData[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<ProductData[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedPriceRange, setSelectedPriceRange] = useState<string>("");

  useEffect(() => {
    // Fetch products from an API or define them statically
    const fetchedProducts: ProductData[] = productsData;

    setProducts(fetchedProducts);
    setFilteredProducts(fetchedProducts);
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
