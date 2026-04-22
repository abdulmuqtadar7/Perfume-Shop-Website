import Link from "next/link";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { ProductActions } from "@/components/product-actions";
import { products } from "@/data/products";

function currency(value: number) {
  return new Intl.NumberFormat("en-PK", { style: "currency", currency: "PKR", maximumFractionDigits: 0 }).format(value);
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((item) => item.slug === slug);
  if (!product) return notFound();

  const related = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-10">
      <div className="grid lg:grid-cols-2 gap-7">
        <div className="grid grid-cols-2 gap-3">
          <img src={product.image} alt={product.name} className="w-full aspect-square object-cover rounded-2xl" />
          <img src={product.hoverImage} alt={`${product.name} secondary`} className="w-full aspect-square object-cover rounded-2xl" />
        </div>
        <div>
          <p className="text-sm uppercase tracking-[0.25em] text-[#B48A54]">{product.category}</p>
          <h1 className="text-4xl mt-2 font-semibold">{product.name}</h1>
          <p className="mt-4 text-neutral-600">{product.description}</p>
          <div className="mt-5 flex items-center gap-3">
            <span className="line-through text-neutral-400">{currency(product.originalPrice)}</span>
            <span className="text-2xl font-bold">{currency(product.price)}</span>
            <span className="text-sm bg-neutral-900 text-white px-2 py-1 rounded">-{product.discountPercent}%</span>
          </div>
          <ProductActions productId={product.id} />
          <div className="mt-8 border rounded-xl p-4">
            <p className="font-semibold">Notes Breakdown</p>
            <ul className="list-disc pl-5 mt-2 text-neutral-600 text-sm space-y-1">
              {product.notes.map((note) => (
                <li key={note}>{note}</li>
              ))}
            </ul>
          </div>
          <Link href="/shop" className="inline-block mt-6 text-[#B48A54]">← Continue Shopping</Link>
        </div>
      </div>

      <div className="mt-14">
        <h2 className="text-3xl font-semibold mb-5">You May Also Like</h2>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
