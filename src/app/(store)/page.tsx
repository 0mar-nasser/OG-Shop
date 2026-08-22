import { HeroSection } from '@/components/home/HeroSection';
// import { CategoryGrid } from '@/components/home/CategoryGrid';
import { FeaturedProducts } from '@/components/home/FeaturedProducts';
import { PromoBanner } from '@/components/home/PromoBanner';
import { NewArrivals } from '@/components/home/NewArrivals';
import { GenderSection } from '@/components/home/GenderSection';
import { WhyChooseUs } from '@/components/home/WhyChooseUs';
import { Newsletter } from '@/components/home/Newsletter';

export default function HomePage() {
  return (
    <div className="space-y-0">
      {/* 1. Hero Section */}
      <HeroSection />

      {/* 2. Shop by Gender / Category */}
      <GenderSection />
      {/* <CategoryGrid /> */}

      {/* 3. Featured Products (Best Sellers) */}
      <FeaturedProducts />

      {/* 4. Single Promotional Banner */}
      <PromoBanner />

      {/* 5. New Arrivals */}
      <NewArrivals />

      {/* 6. Why Choose Us (4 features) */}
      <WhyChooseUs />

      {/* 7. Newsletter (Clean & un-intrusive) */}
      <Newsletter />
    </div>
  );
}
