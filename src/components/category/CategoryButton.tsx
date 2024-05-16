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
      <a className="flex items-center  h-[5rem] flex-shrink-0 border-2 border-[#C5C5C5] rounded-lg bg-white transition hover:bg-gray-100">
        <div className="ml-4">
          <Image src={imageSrc} alt={name} width={80} height={60} />
        </div>
        <span className="ml-4 text-black font-jost text-sm font-medium leading-normal">
          {name}
        </span>
      </a>
    </Link>
  );
};

export default CategoryButton;
