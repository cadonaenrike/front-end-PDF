// pages/index.tsx

import Footer from "@/components/foooter/footer";
import Header from "@/components/header/header";

import NavBar from "@/components/navbar/navbar";
const Home = () => {
  return (
    <>
      <Header />
      <NavBar />
      <div className="h-screen">teste</div>

      <Footer />
    </>
  );
};

export default Home;
