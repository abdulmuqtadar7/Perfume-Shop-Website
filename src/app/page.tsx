import AnnouncementBar from "@/components/AnnouncementBar";
import Header from "@/components/Header";
import MobileNav from "@/components/MobileNav";
import Hero from "@/components/Hero";
import ValueProps from "@/components/ValueProps";
import ProductGrid from "@/components/ProductGrid";
import CategoryHighlights from "@/components/CategoryHighlights";
import Testimonials from "@/components/Testimonials";
import StoreCallout from "@/components/StoreCallout";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import WishlistDrawer from "@/components/WishlistDrawer";
import QuickViewModal from "@/components/QuickViewModal";
import ChatWidget from "@/components/ChatWidget";
import Toast from "@/components/Toast";

export default function Home() {
  return (
    <>
      <AnnouncementBar />
      <Header />
      <MobileNav />

      <main id="shop">
        <Hero />
        <ValueProps />
        <ProductGrid title="Trending Now" section="trending" id="trending" />
        <div className="bg-cream/50 border-y border-ink/10">
          <ProductGrid title="Best Sellers" section="bestsellers" id="best" />
        </div>
        <CategoryHighlights />
        <ProductGrid title="New Arrivals" section="new" id="new" />
        <Testimonials />
        <StoreCallout />
      </main>

      <Footer />
      <CartDrawer />
      <WishlistDrawer />
      <QuickViewModal />
      <ChatWidget />
      <Toast />
    </>
  );
}
