import { useState, useEffect } from "react";
import Image from "next/image";
import Banner from "@/images/banner.png";
import Carousel from "@/components/carrosel/carrosel";
import CategoryButton from "@/components/category/CategoryButton";
import { categories } from "@/components/data/CategoryesImagesArray";
import { ProductData } from "@/interfaces/ProductData";
import Link from "next/link";
import { getAllProducts } from "./api/LIbraryApi";

const Home = () => {
  const [cards, setCards] = useState<ProductData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const products = await getAllProducts();
        const mappedProducts: ProductData[] = products.map((product: any) => ({
          id: product.id.toString(),
          title: product.nome_produto,
          description: product.descricao,
          price: parseFloat(product.valor),
          link: "/categories",
          imageSrc: `data:image/png;base64,${product.fotos[0]}`,
          imageAlt: product.nome_produto,
          category: product.categoria,
        }));
        setCards(mappedProducts);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="text-center p-6">
        <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full text-blue-500"></div>
        <p className="mt-2 text-gray-500">Carregando...</p>
      </div>
    );
  }

  return (
    <div className="w-full h-full overflow-hidden">
      {/* Header */}
      <div className="w-full">
        <Image
          className="w-full h-auto"
          src={Banner}
          alt="Banner"
          layout="responsive"
        />
      </div>

      {/* Card Section */}
      <div className=" lg:mx-48 mt-20">
        <h2 className="text-black text-center font-jost text-5xl font-semibold mb-6">
          Categorias
        </h2>
        <div className="mx-auto px-2 sm:px-2 md:px-8 lg:px-20 xl:px-40 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <Link key={index} href={category.path}>
              <CategoryButton
                name={category.name}
                path={category.path}
                imageSrc={category.image}
              />
            </Link>
          ))}
        </div>
      </div>

      {/* Differentiator Section */}
      <div className="flex flex-col items-center mt-20 space-y-4">
        <h2 className="text-black text-center font-jost text-5xl font-semibold mb-6">
          Diferencial
        </h2>
        <p className="text-center md:text-start text-xl pb-12 font-medium text-gray-500">
          Conheça o nosso diferencial das outras plataformas
        </p>

        {/* Differentiator Cards */}
        <div className="flex flex-wrap justify-center items-center gap-10 mt-6">
          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="97"
              height="96"
              viewBox="0 0 97 96"
              fill="none"
            >
              <circle cx="48.5" cy="48" r="48" fill="#004AAD" />
              <path
                d="M62.1009 51.0771H46.7604L47.2304 50.6252L51.2425 46.7676C52.863 47.5522 54.6485 47.9706 56.4627 47.9906C58.2888 47.9953 60.0808 47.5148 61.6409 46.6022C66.385 43.8407 68.9271 37.4485 68.4411 29.5024C68.4182 29.126 68.2524 28.7708 67.9751 28.5043C67.6979 28.2377 67.3285 28.0783 66.937 28.0563C58.6728 27.5909 52.0245 30.0332 49.1525 34.5946C47.2804 37.5658 47.2324 41.1542 48.9785 44.5945L46.1004 47.3618L43.6583 45.0137C44.8583 42.4657 44.7723 39.8215 43.3803 37.6138C41.2062 34.1543 36.2221 32.3101 30.0459 32.6581C29.6551 32.6805 29.2864 32.8399 29.0096 33.106C28.7328 33.3722 28.5671 33.7266 28.5438 34.1023C28.1798 40.0388 30.0999 44.8311 33.7 46.9233C34.9044 47.6304 36.2889 48.0032 37.7001 48.0002C38.9804 47.988 40.2432 47.7133 41.4042 47.1945L43.8363 49.5387L42.2362 51.0771H33.3C32.8756 51.0771 32.4686 51.2392 32.1686 51.5277C31.8685 51.8162 31.6999 52.2075 31.6999 52.6156C31.6999 53.0236 31.8685 53.4149 32.1686 53.7034C32.4686 53.9919 32.8756 54.154 33.3 54.154H35.218L37.8601 65.5904C38.015 66.2753 38.4098 66.8884 38.9784 67.327C39.5471 67.7656 40.2552 68.0032 40.9842 68H54.4186C55.1476 68.0032 55.8557 67.7656 56.4244 67.327C56.9931 66.8884 57.3879 66.2753 57.5427 65.5904L60.1848 54.154H62.1009C62.5252 54.154 62.9322 53.9919 63.2323 53.7034C63.5323 53.4149 63.7009 53.0236 63.7009 52.6156C63.7009 52.2075 63.5323 51.8162 63.2323 51.5277C62.9322 51.2392 62.5252 51.0771 62.1009 51.0771ZM51.9005 36.1889C53.9926 32.8697 58.9488 30.9966 65.301 31.0793C65.383 37.1965 63.4389 41.9599 59.9868 43.9638C57.6847 45.3099 54.9066 45.2214 52.1306 43.7368C50.5845 41.0773 50.5005 38.4023 51.9005 36.1889ZM40.5222 44.1753C38.6821 45.1234 36.8601 45.1676 35.356 44.2907C33.056 42.9503 31.7299 39.7907 31.6999 35.6927C35.9621 35.7216 39.2502 36.9965 40.6422 39.208C41.5542 40.6542 41.5002 42.4061 40.5222 44.1753ZM54.4186 64.9231H40.9842L38.5001 54.154H56.9007L54.4186 64.9231Z"
                fill="white"
              />
            </svg>
            <p className="text-black mt-6 text-lg font-semibold leading-normal">
              Entrega Digital
            </p>
          </div>

          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="97"
              height="96"
              viewBox="0 0 97 96"
              fill="none"
            >
              <circle cx="48.5" cy="48" r="48" fill="#004AAD" />
              <path
                d="M48.965 30.5906C48.6665 30.471 48.3335 30.471 48.035 30.5906L33.115 36.5581L39.125 38.9606L54.51 32.8081L48.965 30.5906ZM57.875 34.1556L42.49 40.3081L48.5 42.7106L63.885 36.5581L57.875 34.1556ZM66 38.4056L49.75 44.9056V64.7106L66 58.2106V38.4056ZM47.25 64.7131V44.9031L31 38.4056V58.2131L47.25 64.7131ZM47.1075 28.2681C48.0014 27.9106 48.9986 27.9106 49.8925 28.2681L67.715 35.3981C67.9467 35.491 68.1453 35.6511 68.2852 35.8579C68.4251 36.0646 68.4999 36.3085 68.5 36.5581V58.2131C68.4997 58.7127 68.3497 59.2007 68.0694 59.6142C67.7891 60.0277 67.3914 60.3478 66.9275 60.5331L48.965 67.7181C48.6665 67.8377 48.3335 67.8377 48.035 67.7181L30.075 60.5331C29.6106 60.3482 29.2124 60.0283 28.9316 59.6147C28.6509 59.2012 28.5005 58.713 28.5 58.2131V36.5581C28.5001 36.3085 28.5749 36.0646 28.7148 35.8579C28.8547 35.6511 29.0533 35.491 29.285 35.3981L47.1075 28.2681Z"
                fill="white"
              />
            </svg>
            <p className="text-black mt-6 text-lg font-semibold leading-normal">
              Após aprovação entrega imediata
            </p>
          </div>

          <div className="flex flex-col items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="97"
              height="96"
              viewBox="0 0 97 96"
              fill="none"
            >
              <circle cx="48.5" cy="48" r="48" fill="#004AAD" />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="90"
                height="90"
                viewBox="-20 0 81 30"
                fill="none"
              >
                <g clip-path="url(#clip0_11_6377)">
                  <path
                    d="M9.63477 3.31988C9.48719 3.13004 9.3009 2.97376 9.08828 2.86145C8.87566 2.74913 8.64157 2.68333 8.40157 2.66844C8.16157 2.65354 7.92114 2.68988 7.69626 2.77504C7.47139 2.86021 7.2672 2.99224 7.09727 3.16238L4.51227 5.74988C3.30477 6.95988 2.85977 8.67238 3.38727 10.1749C5.57662 16.3939 9.13801 22.0401 13.8073 26.6949C18.4621 31.3641 24.1083 34.9255 30.3273 37.1149C31.8298 37.6424 33.5423 37.1974 34.7523 35.9899L37.3373 33.4049C37.5074 33.235 37.6395 33.0308 37.7246 32.8059C37.8098 32.581 37.8461 32.3406 37.8312 32.1006C37.8163 31.8606 37.7505 31.6265 37.6382 31.4139C37.5259 31.2013 37.3696 31.015 37.1798 30.8674L31.4123 26.3824C31.2094 26.2251 30.9735 26.1159 30.7224 26.063C30.4712 26.0102 30.2113 26.0151 29.9623 26.0774L24.4873 27.4449C23.7565 27.6275 22.9908 27.6178 22.2649 27.4168C21.5389 27.2157 20.8774 26.83 20.3448 26.2974L14.2048 20.1549C13.6717 19.6225 13.2856 18.9611 13.0841 18.2351C12.8825 17.5092 12.8724 16.7434 13.0548 16.0124L14.4248 10.5374C14.487 10.2884 14.4919 10.0285 14.4391 9.77729C14.3863 9.52611 14.2771 9.29021 14.1198 9.08738L9.63477 3.31988ZM5.20977 1.27738C5.64726 0.839757 6.17284 0.500209 6.75162 0.281286C7.3304 0.0623632 7.94913 -0.0309251 8.56673 0.0076156C9.18432 0.0461563 9.78666 0.215644 10.3337 0.504825C10.8808 0.794005 11.3601 1.19626 11.7398 1.68488L16.2248 7.44988C17.0473 8.50738 17.3373 9.88488 17.0123 11.1849L15.6448 16.6599C15.5741 16.9435 15.5779 17.2405 15.6559 17.5222C15.7338 17.8038 15.8833 18.0605 16.0898 18.2674L22.2323 24.4099C22.4394 24.6168 22.6965 24.7665 22.9787 24.8445C23.2608 24.9225 23.5583 24.926 23.8423 24.8549L29.3148 23.4874C29.9563 23.327 30.6259 23.3145 31.273 23.4509C31.92 23.5874 32.5276 23.8691 33.0498 24.2749L38.8148 28.7599C40.8873 30.3724 41.0773 33.4349 39.2223 35.2874L36.6373 37.8724C34.7873 39.7224 32.0223 40.5349 29.4448 39.6274C22.8477 37.3062 16.858 33.5295 11.9198 28.5774C6.968 23.6399 3.19129 17.651 0.869774 11.0549C-0.0352265 8.47988 0.777274 5.71238 2.62727 3.86238L5.21227 1.27738H5.20977ZM27.9998 1.24988C27.9998 0.918362 28.1315 0.60042 28.3659 0.365999C28.6003 0.131579 28.9183 -0.000117053 29.2498 -0.000117053H39.2498C39.5813 -0.000117053 39.8992 0.131579 40.1337 0.365999C40.3681 0.60042 40.4998 0.918362 40.4998 1.24988V11.2499C40.4998 11.5814 40.3681 11.8993 40.1337 12.1338C39.8992 12.3682 39.5813 12.4999 39.2498 12.4999C38.9183 12.4999 38.6003 12.3682 38.3659 12.1338C38.1315 11.8993 37.9998 11.5814 37.9998 11.2499V4.26738L27.6348 14.6349C27.4001 14.8696 27.0817 15.0015 26.7498 15.0015C26.4178 15.0015 26.0995 14.8696 25.8648 14.6349C25.6301 14.4002 25.4982 14.0818 25.4982 13.7499C25.4982 13.4179 25.6301 13.0996 25.8648 12.8649L36.2323 2.49988H29.2498C28.9183 2.49988 28.6003 2.36819 28.3659 2.13377C28.1315 1.89935 27.9998 1.5814 27.9998 1.24988Z"
                    fill="white"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_11_6377">
                    <rect width="40" height="40" fill="white" />
                  </clipPath>
                </defs>
              </svg>
            </svg>

            <p className="text-black mt-6 text-lg font-semibold leading-normal">
              Suporte Completo
            </p>
          </div>
        </div>
      </div>

      {/* Best Sellers */}
      <div className="p-4 mt-40">
        <h2 className="text-black text-center font-jost text-5xl font-semibold mb-6">
          Mais Vendidos
        </h2>
        <div className="mx-auto px-4 sm:px-2 md:px-8 lg:px-20 xl:px-40">
          <Carousel cards={cards} />
        </div>
      </div>
    </div>
  );
};

export default Home;
