import React from "react";
import {
  FaCheck,
  FaDollarSign,
  FaBook,
  FaPaintBrush,
  FaLeaf,
  FaFlask,
  FaDumbbell,
  FaCross,
  FaBalanceScale,
  FaMapMarkedAlt,
} from "react-icons/fa";

interface FiltersProps {
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  selectedPriceRange: string;
  setSelectedPriceRange: React.Dispatch<React.SetStateAction<string>>;
}

const Filters: React.FC<FiltersProps> = ({
  selectedCategories,
  setSelectedCategories,
  selectedPriceRange,
  setSelectedPriceRange,
}) => {
  const categories = [
    { name: "Alfabetização", icon: FaBook },
    { name: "Arte", icon: FaPaintBrush },
    { name: "Biologia", icon: FaLeaf },
    { name: "Ciências", icon: FaFlask },
    { name: "Educação Física", icon: FaDumbbell },
    { name: "Ensino Religioso", icon: FaCross },
    { name: "Filosofia", icon: FaBalanceScale },
    { name: "Geografia", icon: FaMapMarkedAlt },
  ];
  const priceRanges = [
    { range: "0-25", label: "de R$0,00 a R$25,00" },
    { range: "25-50", label: "de R$25,00 a R$50,00" },
    { range: "50-100", label: "de R$50,00 a R$100,00" },
    { range: "100-250", label: "de R$100,00 a R$250,00" },
  ];

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handlePriceRangeChange = (priceRange: string) => {
    setSelectedPriceRange(priceRange);
  };

  return (
    <div className="w-1/5 h-screen mt-8 bg-white ">
      <nav className="mt-4 mx-4">
        <h3 className="text-lg font-bold mb-4">Categorias</h3>
        <ul className="flex flex-col gap-4 mb-8">
          {categories.map(({ name, icon: Icon }) => (
            <li
              key={name}
              className={`flex items-center p-4 border-b-2 border-black hover:bg-blue-200 transition cursor-pointer ${
                selectedCategories.includes(name)
                  ? "bg-blue-500 rounded-lg border-white text-white"
                  : "text-black"
              }`}
              onClick={() => handleCategoryChange(name)}
            >
              <Icon className="mr-2" />
              <span>{name}</span>
            </li>
          ))}
        </ul>

        <h3 className="text-lg font-bold mb-4">Filtrar por Preço</h3>
        <ul className="flex flex-col gap-4">
          {priceRanges.map(({ range, label }) => (
            <li
              key={range}
              className={`flex items-center p-4 border-b-2 border-black hover:bg-blue-200 transition cursor-pointer ${
                selectedPriceRange === range
                  ? "bg-blue-500 rounded-lg border-white text-white"
                  : "text-black"
              }`}
              onClick={() => handlePriceRangeChange(range)}
            >
              <FaDollarSign className="mr-2" />
              <span>{label}</span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Filters;
