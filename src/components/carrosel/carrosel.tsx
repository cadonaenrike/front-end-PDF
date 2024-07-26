import React from "react";
import Slider, { Settings } from "react-slick";
import CardComponent from "../card/card";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import left from "@/images/arrowLeft.png";
import rigth from "@/images/arrowRigth.jpg";
import Image from "next/image";
import { ProductData } from "@/interfaces/ProductData";


interface CarouselProps {
  cards: ProductData[];
}

// Componentes de setas personalizadas utilizando Tailwind CSS
const NextArrow = ({ onClick }: { onClick?: () => void }) => (
  <div
    onClick={onClick}
    className="slick-next absolute z-10 right-0 mr-6 cursor-pointer"
  >
    {/* Ícone de seta para a direita (você pode substituir por um ícone SVG ou font icon) */}
    <Image
      className="min-h-14 min-w-16"
      src={rigth}
      alt="seta para direita"
    ></Image>
  </div>
);

const PrevArrow = ({ onClick }: { onClick?: () => void }) => (
  <div
    onClick={onClick}
    className="slick-prev absolute z-10 left-0 ml-1 cursor-pointer"
  >
    {/* Ícone de seta para a esquerda */}
    <Image
      className="min-h-14 min-w-16"
      src={left}
      alt="seta para esquerda"
    ></Image>
  </div>
);

const Carousel: React.FC<CarouselProps> = ({ cards }) => {
  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <Slider {...settings}>
        {cards.map((card, index) => (
          <div key={index} className="px-6 mx-2  mt-4">
            <CardComponent {...card} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
