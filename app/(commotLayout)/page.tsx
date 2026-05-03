import Categories from "@/components/Home/Categories";
import FAQ from "@/components/Home/Faq";
import Hero from "@/components/Home/Hero";
import SubscriptionCTA from "@/components/Home/SubscriptionCTA";
import Testimonials from "@/components/Home/Testimonials";
import Treending from "@/components/Home/Treending";

const Home = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Hero />

      <Treending />

      <Categories />

      <Testimonials />

      <SubscriptionCTA />

      <FAQ />
    </div>
  );
};

export default Home;
