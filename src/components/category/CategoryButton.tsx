// src/components/CategoryButton.tsx
import Link from "next/link";
import Image, { StaticImageData } from "next/image";

interface CategoryButtonProps {
  name: string;
  path: string;
  imageSrc: StaticImageData;
}

const CategoryButton: React.FC<CategoryButtonProps> = ({
  name,
  path,
  imageSrc,
}) => {
  return (
    <Link href={path} legacyBehavior>
      <div className="flex items-center justify-center gap-2 md:gap-8  h-[5rem] flex-shrink-0 border-2 border-[#C5C5C5] rounded-lg bg-white transition hover:bg-gray-100">
        <div className="">
          <Image src={imageSrc} alt={name} width={80} height={60} />
        </div>
        <span className=" text-black font-jost text-sm font-medium leading-normal">
          {name}
        </span>
      </div>
    </Link>
  );
};

export default CategoryButton;
