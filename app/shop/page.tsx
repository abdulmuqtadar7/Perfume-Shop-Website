import { ShopClient } from "@/components/shop-client";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string }>;
}) {
  const params = await searchParams;
  return <ShopClient initialQuery={params.q ?? ""} />;
}
