import { NextPage } from "next";
import Head from "next/head";

const AmostraGratis: NextPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center py-2">
      <Head>
        <title>Amostra Gratis</title>
        <meta
          name="description"
          content="Amostra gratis do site Caça Atividades Escolares"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center mt-40 w-full flex-1 px-8 text-left">
        <h1 className="text-3xl font-bold mb-6 text-start">Amostra gratis</h1>

        {/* <p className="text-lg leading-relaxed mb-4">Virou Remedio?</p> */}
      </main>
    </div>
  );
};

export default AmostraGratis;
