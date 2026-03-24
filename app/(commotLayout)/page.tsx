import Categories from "@/components/Home/Categories";
import Hero from "@/components/Home/Hero";
import SubscriptionCTA from "@/components/Home/SubscriptionCTA";
import Treending from "@/components/Home/Treending";

const Home = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Hero />

      <Treending />

      <Categories />

      <SubscriptionCTA />
    </div>
  );
};

export default Home;
