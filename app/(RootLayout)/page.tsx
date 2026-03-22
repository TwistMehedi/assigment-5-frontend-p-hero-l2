import Hero from "@/components/Home/Hero";
import Treending from "./Treending";

const Home = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Hero />

      <Treending />
    </div>
  );
};

export default Home;
