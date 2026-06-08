import { FadeIn } from '@/components/FadeIn'
import { Link } from '@/components/Link'
import { PageHero } from '@/components/PageHero'

const RETAIL_PRODUCTS = Array.from({ length: 4 }, (_, index) => ({
  id: `retail-${index + 1}`,
}))

const PALM_OIL_PRODUCTS = Array.from({ length: 3 }, (_, index) => ({
  id: `palm-${index + 1}`,
}))

export function EcommercePage() {
  return (
    <>
      <PageHero
        eyebrow="Shop"
        title="Shop Atlantic Catering and Logistics Limited"
        description="Retail products and our palm oil line. E-commerce integration coming soon."
      />

      <section className="py-16 lg:py-24 bg-acll-gray">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <FadeIn>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-acll-green">Products</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-acll-navy tracking-tight mt-1 mb-6">Retail products</h2>
            <p className="text-acll-muted text-[14px] mb-10">
              A selection of quality products for retail. Catalog and online ordering will be available here soon.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {RETAIL_PRODUCTS.map((product) => (
              <FadeIn
                key={product.id}
                className="bg-white rounded-xl overflow-hidden border border-acll-navy/[0.08] hover:border-acll-navy/[0.12] transition-colors flex flex-col"
              >
                <div className="aspect-square bg-acll-navy/[0.04] flex items-center justify-center text-acll-muted text-[13px]">
                  Product image
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-acll-navy text-[15px]">Product placeholder</h3>
                  <p className="text-[13px] text-acll-muted mt-0.5">Coming soon</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <div className="max-w-6xl mx-auto px-5 sm:px-8">
          <FadeIn>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-acll-green">Palm oil</span>
            <h2 className="text-2xl sm:text-3xl font-bold text-acll-navy tracking-tight mt-1 mb-6">Palm oil line</h2>
            <p className="text-acll-muted text-[14px] mb-10">
              Our sustainable palm oil line, linked to the Palm Prosperity initiative. Available for bulk and future retail.
            </p>
          </FadeIn>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PALM_OIL_PRODUCTS.map((product) => (
              <FadeIn
                key={product.id}
                className="bg-acll-gray/80 rounded-xl overflow-hidden border border-acll-navy/[0.08] hover:border-acll-navy/[0.12] transition-colors flex flex-col"
              >
                <div className="aspect-[4/3] bg-acll-orange/10 flex items-center justify-center text-acll-muted text-[13px]">
                  Palm oil product image
                </div>
                <div className="p-4">
                  <h3 className="font-medium text-acll-navy text-[15px]">Palm Oil Line – Placeholder</h3>
                  <p className="text-[13px] text-acll-muted mt-0.5">Future integration</p>
                </div>
              </FadeIn>
            ))}
          </div>

          <p className="mt-6 text-acll-muted text-[13px]">
            For bulk or B2B enquiries, use our{' '}
            <Link to="/contact" className="text-acll-green hover:underline">
              Contact
            </Link>{' '}
            page.
          </p>
        </div>
      </section>
    </>
  )
}
