import Link from "next/link";
import Image from "next/image";
import PropTypes from "prop-types";

interface CardComponentProps {
  title: string;
  description: string;
  price: string;
  imageSrc: string;
  imageAlt?: string;
  link: string;
}

// Seu componente CardComponent
const CardComponent: React.FC<CardComponentProps> = ({
  title,
  description,
  price,
  link,
  imageSrc,
  imageAlt,
}) => {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg p-3 m-3">
      {imageSrc && (
        <Image
          className="w-full object-cover"
          src={imageSrc}
          alt={imageAlt || "Product Image"}
          width={384}
          height={256}
          layout="responsive"
        />
      )}
      <div className="px-6 py-4">
        <p className="text-black font-jost text-lg font-bold leading-5">
          {title}: {description}
        </p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <div className="flex items-center mt-2">
          <span className="text-gray-600">⭐⭐⭐⭐⭐</span>
        </div>
        <div className="flex items-center mt-3">
          <Link href={link} className=" text-blue-800 font-bold text-3xl py-2 ">
            {price}
          </Link>
          <span className="text-gray-900 text-sm ml-2">no pix</span>
        </div>
      </div>
    </div>
  );
};

CardComponent.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  imageSrc: PropTypes.string.isRequired,
  imageAlt: PropTypes.string,
};

export default CardComponent;
