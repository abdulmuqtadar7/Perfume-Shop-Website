export function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-200 mt-16">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-14 space-y-12">
        <div className="rounded-2xl border border-neutral-700/60 bg-neutral-900/50 p-6 md:p-8 flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#B48A54]">Member&apos;s Benefit</p>
            <h3 className="text-xl mt-2">Receive our latest updates, offers & launches</h3>
          </div>
          <form className="flex w-full md:w-auto gap-2">
            <input type="email" required placeholder="Enter email" className="h-11 px-4 rounded-md bg-white text-neutral-900 min-w-[240px]" />
            <button className="h-11 px-6 rounded-md bg-[#B48A54] text-white">SIGN UP</button>
          </form>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-sm">
          <div>
            <h4 className="font-semibold text-white mb-3">Contact Details</h4>
            <p>Bahria Orchard, Lahore</p>
            <p className="mt-1">+92 300 0000000</p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Shop By</h4>
            {"Affordable,Premium,Summer,Men,Women".split(",").map((item) => (
              <p key={item} className="mt-1">{item}</p>
            ))}
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Customer Service</h4>
            {"Blogs,Contact Us,Shipping Policy,Privacy Policy,Terms,Refund Policy".split(",").map((item) => (
              <p key={item} className="mt-1">{item}</p>
            ))}
          </div>
          <div>
            <h4 className="font-semibold text-white mb-3">Socials</h4>
            <div className="flex items-center gap-3">
              {[
                ["F", "Facebook"],
                ["Y", "YouTube"],
                ["X", "Twitter"],
              ].map(([initial, label]) => (
                <span key={label} className="h-8 w-8 rounded-full border border-neutral-600 grid place-items-center text-xs" aria-label={label} title={label}>
                  {initial}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-neutral-800 py-4 px-4 md:px-6 max-w-7xl mx-auto flex flex-col md:flex-row gap-2 md:items-center md:justify-between text-xs">
        <p>© 2026 Usman Baig Fragrance. All Rights Reserved.</p>
        <p>Accepted Payments: VISA · MasterCard · Apple Pay · COD</p>
      </div>
    </footer>
  );
}
