import {
  Brands,
  Categories,
  Hero,
  NewArrivals,
  Testimonials,
} from "@/components/sections/home";
import { Features } from "@/components/sections/home/features";

export const HomePage = () => {
  return (
    <div>
      <Hero />
      <Testimonials />
      <Brands />
      <Categories />
      <Features />
      <NewArrivals />
    </div>
  );
};
