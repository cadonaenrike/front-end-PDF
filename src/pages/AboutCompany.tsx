import { NextPage } from "next";
import Head from "next/head";

const AboutCompany: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-2">
      <Head>
        <title>Sobre</title>
        <meta name="description" content="" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">Sobre a Empresa</h1>
        <p className="mt-4 text-xl">
          Aqui será uma tela sobre a empresa que nao recebi da UX/UI ainda!!!
        </p>
      </main>
    </div>
  );
};

export default AboutCompany;
