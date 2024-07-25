import Link from "next/link";
import Image from "next/image";
import React from "react";
import { ProductData } from "@/interfaces/ProductData";

const CardComponent: React.FC<ProductData> = ({
  title,
  description,
  price,
  link,
  category,
  imageSrc,
  imageAlt,
}) => {
  return (
    <div className="max-h-96 max-w-60 flex flex-col border items-center justify-center  rounded shadow-lg p-3 m-3">
      {imageSrc && (
        <Image
          objectFit="cover"
          quality={100}
          src={imageSrc}
          alt={imageAlt || "Product Image"}
          width={150}
          height={100}
        />
      )}
      <div className="flex flex-col px-3">
        <p className="text-black font-jost text-sm font-bold leading-5">
          {title}: {description}
        </p>

        <div className="flex items-center mt-2">
          <span className="text-gray-600">⭐⭐⭐⭐⭐</span>
        </div>
        <p className="text-xs">{category}</p>
        <div className="flex items-center mt-3">
          <Link href={link} legacyBehavior>
            <a className="text-blue-800 font-bold text-3xl py-2">
              R$ {price.toFixed(2)}
            </a>
          </Link>
          <span className="text-gray-900 text-sm ml-2">no pix</span>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
