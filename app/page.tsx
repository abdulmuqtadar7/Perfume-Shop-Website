import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ValuePropositionBar from "@/components/ValuePropositionBar";
import ProductGrid from "@/components/ProductGrid";
import CategoryHighlights from "@/components/CategoryHighlights";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import StoreCallout from "@/components/StoreCallout";
import Footer from "@/components/Footer";

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <ValuePropositionBar />
      <ProductGrid />
      <CategoryHighlights />
      <TestimonialCarousel />
      <StoreCallout />
      <Footer />
    </main>
  );
}
