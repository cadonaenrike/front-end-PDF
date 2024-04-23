import CardComponent from "@/components/card/card";
import Link from "next/link";

const Home = () => {
  const cardData = {
    title: "ALFABETIZAÇÃO",
    description:
      "PRINCÍPIO ALFABÉTICO, CONSCIÊNCIA FONOLÓGICA, MATERIAL DE APOIO",
    price: "R$ 19,90",
    link: "/Login",
    imageSrc:
      "https://media.gettyimages.com/id/157482029/pt/foto/pilha-de-livros.jpg?s=612x612&w=0&k=20&c=myOJb6QEPe3OX7IO_youGJY_qc9KF699encUvHRP1E0=",
    imageAlt: "Capa da Apostila",
  };

  return (
    <div className="bg-blue-100 min-h-screen">
      {/* Header */}
      <div className="text-center p-8">
        <h1 className="text-4xl text-blue-800 font-bold mb-4">
          Descubra Mundos em Páginas: Uma Biblioteca ao Seu Alcance!
        </h1>
        <p className="text-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
      </div>

      {/* Card Section */}
      <div className="p-4">
        <h2 className="text-3xl text-center font-semibold mb-6">Categorias</h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <CardComponent {...cardData} />
          <CardComponent {...cardData} />
          <CardComponent {...cardData} />
        </div>
      </div>

      {/* Differentiator Section */}
      <div className="flex justify-center items-center my-8">
        {/* Icons and text here */}
      </div>

      {/* Best Sellers */}
      <div className="p-4">
        <h2 className="text-3xl text-center font-semibold mb-6">
          Mais Vendidos
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <CardComponent {...cardData} />
          <CardComponent {...cardData} />
          <CardComponent {...cardData} />
        </div>
      </div>

      {/* Footer */}
      <div className="bg-blue-800 text-white text-center p-4">
        <Link href="/" className="text-sm">
          Voltar ao Início
        </Link>
      </div>
    </div>
  );
};

export default Home;
