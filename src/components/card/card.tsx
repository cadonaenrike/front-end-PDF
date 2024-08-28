import Link from "next/link";
import Image from "next/image";
import React from "react";
import { ProductData } from "@/interfaces/ProductData";

const CardComponent: React.FC<ProductData> = ({
  id,
  title,
  description,
  price,
  category,
  imageSrc,
  imageAlt,
}) => {
  return (
    <Link href={`/page_Product?id=${id}`} passHref>
      <div className="flex max-h-[500px] flex-col border items-center justify-center rounded shadow-lg p-3 m-3 cursor-pointer">
        {imageSrc && (
          <Image
            objectFit="contain"
            quality={100}
            src={imageSrc}
            alt={imageAlt || "Product Image"}
            width={300}
            height={300}
            className="w-60 h-52 object-contain"
          />
        )}
        <div className="flex py-1 flex-col px-3">
          <div className="flex flex-col overflow-y-auto max-h-24 my-1">
            <p className="text-black font-jost text-lg font-extrabold leading-5">
              {title}
            </p>
            <p className="text-black mt-2 font-jost text-base">{description}</p>
            <p className="text-base mt-2">{category}</p>
          </div>
          <div className="flex items-center">
            <span className="text-gray-600">⭐⭐⭐⭐⭐</span>
          </div>

          <div className="flex items-center mt-3">
            <div className="text-blue-800 font-bold text-3xl py-2">
              R$ {price.toFixed(2)}
            </div>
            <span className="text-gray-900 text-sm ml-2">no pix</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CardComponent;
