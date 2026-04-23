import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/context/StoreContext";
import CartDrawer from "@/components/CartDrawer";
import FloatingChatWidget from "@/components/FloatingChatWidget";
import QuickViewModal from "@/components/QuickViewModal";

export const metadata: Metadata = {
  title: "Usman Baig Fragrance",
  description: "Premium Perfumes & Attars — Discover Your Signature Scent",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-inter">
        <StoreProvider>
          {children}
          <CartDrawer />
          <FloatingChatWidget />
          <QuickViewModal />
        </StoreProvider>
      </body>
    </html>
  );
}
