import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "@/components/providers";
import { StoreLayout } from "@/components/store-layout";

export const metadata: Metadata = {
  title: "Usman Baig Fragrance | Premium Storefront",
  description: "Premium responsive fragrance storefront built with Next.js, Tailwind CSS, and Framer Motion.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="bg-white text-neutral-900 font-sans">
        <Providers>
          <StoreLayout>{children}</StoreLayout>
        </Providers>
      </body>
    </html>
  );
}
