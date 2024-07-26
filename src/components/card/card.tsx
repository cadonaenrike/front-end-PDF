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
    <div className="flex max-h-[500px] flex-col border items-center justify-center  rounded shadow-lg p-3 m-3">
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
      <div className="flex pt-4  flex-col  px-3">
        <div className="flex flex-col my-2">
          <p className="text-black  font-jost text-lg font-extrabold leading-5">
            {title}
          </p>
          <p className="text-black mt-2 font-jost text-base  ">{description}</p>
          <p className="text-base mt-2  ">{category}</p>
        </div>
        <div className="flex items-center">
          <span className="text-gray-600">⭐⭐⭐⭐⭐</span>
        </div>

        <div className="flex items-center mt-3">
          <Link href={link} legacyBehavior>
            <div className="text-blue-800 font-bold text-3xl py-2">
              R$ {price.toFixed(2)}
            </div>
          </Link>
          <span className="text-gray-900 text-sm ml-2">no pix</span>
        </div>
      </div>
    </div>
  );
};

export default CardComponent;
