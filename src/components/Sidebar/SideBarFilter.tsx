import React from "react";
import { TbRectangle } from "react-icons/tb";
import EnsinoMedio from "@/images/imagesCategoryes/EnsinoMedio.png";
import Alfabetizacao from "@/images/imagesCategoryes/Alfabetizacao.png";
import Artes from "@/images/imagesCategoryes/Artes.png";
import Biologia from "@/images/imagesCategoryes/Biologia.png";
import Ciencias from "@/images/imagesCategoryes/Ciencias.png";
import DatasComemorativas from "@/images/imagesCategoryes/DatasComemorativas.png";
import EducacaoFisica from "@/images/imagesCategoryes/EducacaoFisica.png";
import EnsinoReligioso from "@/images/imagesCategoryes/EnsinoReligioso.png";
import Filosofia from "@/images/imagesCategoryes/Filosofia.png";
import Fisica from "@/images/imagesCategoryes/Fisica.png";
import Geografia from "@/images/imagesCategoryes/Geografia.png";
import Historia from "@/images/imagesCategoryes/Historia.png";
import Humanidade from "@/images/imagesCategoryes/Humanidade.png";
import Ingles from "@/images/imagesCategoryes/Ingles.png";
import LinguaPortuguesa from "@/images/imagesCategoryes/LinguaPortuguesa.png";
import Matematica from "@/images/imagesCategoryes/Matematica.png";
import MetodologiaAtivas from "@/images/imagesCategoryes/MetodologiaAtivas.png";
import ProjetoVida from "@/images/imagesCategoryes/ProjetoVida.png";
import Quimica from "@/images/imagesCategoryes/Quimica.png";
import Sociologia from "@/images/imagesCategoryes/Sociologia.png";

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
    { name: "Novo Ensino Médio", icon: EnsinoMedio },
    { name: "Alfabetização", icon: Alfabetizacao },
    { name: "Arte", icon: Artes },
    { name: "Biologia", icon: Biologia },
    { name: "Ciências", icon: Ciencias },
    {
      name: "Datas comemorativas e Apostila das cores",
      icon: DatasComemorativas,
    },
    { name: "Educação Física", icon: EducacaoFisica },
    { name: "Ensino Religioso", icon: EnsinoReligioso },
    { name: "Filosofia", icon: Filosofia },
    { name: "Física", icon: Fisica },
    { name: "Geografia", icon: Geografia },
    { name: "História", icon: Historia },
    { name: "Inglês", icon: Ingles },
    { name: "Língua Portuguesa", icon: LinguaPortuguesa },
    { name: "Matemática", icon: Matematica },
    { name: "Eletiva", icon: ProjetoVida },
    { name: "Química", icon: Quimica },
    { name: "Sociologia", icon: Sociologia },
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
    <div className=" px-4 bg-white">
      <nav className="flex flex-col gap-4">
        <div>
          <h3 className="text-lg px-2 font-bold border-b-2 border-black  mb-2">
            Categorias
          </h3>
          <ul className="flex flex-col gap-1">
            {categories.map(({ name, icon: Icon }) => (
              <li
                key={name}
                className={`flex items-center px-2 py-1  border-b   cursor-pointer transition-colors ${
                  selectedCategories.includes(name)
                    ? "bg-blue-500 text-white"
                    : "text-gray-900 hover:bg-blue-100"
                }`}
                onClick={() => handleCategoryChange(name)}
              >
                <span className="font-medium">{name}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex pb-4 flex-col gap-2">
          <h3 className="text-lg px-2 font-bold border-b-2 border-black  mb-2">
            Filtrar por Preço
          </h3>
          <ul className="flex flex-col gap-1">
            {priceRanges.map(({ range, label }) => (
              <li
                key={range}
                className={`flex items-center px-2 py-1  border-b   cursor-pointer transition-colors ${
                  selectedPriceRange === range
                    ? "bg-blue-500 text-white"
                    : "text-gray-900 hover:bg-blue-100"
                }`}
                onClick={() => handlePriceRangeChange(range)}
              >
                <TbRectangle className="mr-2 text-xl" />
                <span className="font-medium">{label}</span>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default Filters;
