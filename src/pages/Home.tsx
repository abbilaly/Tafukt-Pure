import { ArrowRight } from 'lucide-react'
import { motion } from 'motion/react'
import { useRef } from 'react'
import { Link } from 'react-router'

import { JarTile, ProductRail, RecipeCard } from '../components/Cards'
import { HeroCarousel } from '../components/HeroCarousel'
import { Button, Container, Eyebrow, SectionHeading, Sprig } from '../components/ui'
import { img } from '../content'
import { useContent } from '../lib/lang'
import { useStock } from '../lib/stock'
import { useTitle } from '../lib/title'

const rise = { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-60px' }, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } }

export function Home() {
  useTitle()
  const { home, categories, products, recipes, ui } = useContent()
  const stock = useStock()
  const next = useRef<HTMLDivElement>(null)
  const best = ['amlou-beldi', 'amlou-cashew', 'amlou-chocolate', 'amlou-peanut', 'zammita', 'chebakia', 'argan-oil'].map((s) => products.find((p) => p.slug === s)!)
  return (
    <>
      <HeroCarousel onScroll={() => next.current?.scrollIntoView({ behavior: 'smooth' })} />

      <div ref={next} className="scroll-mt-0 bg-maroon text-on-dark">
        <Container className="grid gap-10 py-24 md:grid-cols-[auto_1fr] md:gap-20 md:py-32">
          <motion.div {...rise}>
            <Eyebrow dark>{home.statement.eyebrow}</Eyebrow>
            <Sprig className="mt-8 hidden h-20 text-flame md:block" />
          </motion.div>
          <motion.div {...rise}>
            <p className="text-balance font-serif text-[34px] leading-[1.12] md:text-[56px]">
              {home.statement.lead} <em className="text-flame-light">{home.statement.accent}</em>
            </p>
            <p className="mt-8 max-w-2xl text-[17px] leading-relaxed text-on-dark-muted">{home.statement.body}</p>
          </motion.div>
        </Container>
      </div>

      <section className="py-24 md:py-32">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow={home.bestsellers.eyebrow} title={home.bestsellers.title} />
            <Button to="/shop" variant="outline">
              {home.bestsellers.cta} <ArrowRight className="size-4 rtl:-scale-x-100" aria-hidden />
            </Button>
          </div>
          <div className="mt-14">
            <ProductRail items={best} stock={stock} labels={{ label: ui.productsCarousel, prev: ui.previousProducts, next: ui.nextProducts }} />
          </div>
        </Container>
      </section>

      <section className="bg-cream-2 py-24 md:py-32">
        <Container>
          <SectionHeading eyebrow={home.categories.eyebrow} title={home.categories.title} align="center" />
          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {categories.map((c) => {
              const p = products.find((x) => x.image === c.image)!
              return (
                <motion.div key={c.id} {...rise}>
                  <Link to={`/shop?c=${c.id}`} className="group block rounded-card">
                    <JarTile product={p} className="aspect-[4/5] rounded-[999px_999px_22px_22px] [&_.jar]:group-hover:-translate-y-3 [&_.jar]:group-hover:rotate-[4deg]" />
                    <div className="mt-5 flex items-center justify-between gap-4">
                      <div>
                        <h3 className="font-serif text-[30px] text-wine">{c.title}</h3>
                        <p className="text-muted">{c.blurb}</p>
                      </div>
                      <span aria-hidden className="grid size-12 shrink-0 place-items-center rounded-full border-[1.5px] border-wine text-wine transition-colors group-hover:bg-wine group-hover:text-on-dark">
                        <ArrowRight className="size-5 rtl:-scale-x-100" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              )
            })}
          </div>
        </Container>
      </section>

      <section className="on-dark bg-maroon-deep text-on-dark">
        <div className="grid md:grid-cols-2">
          <img src={img('farm-hill')} alt="Stone terraces and olive trees on a Moroccan hillside at sunset" loading="lazy" className="h-[420px] w-full object-cover md:h-full md:min-h-[640px]" />
          <div className="flex flex-col justify-center px-4 py-20 md:px-16 lg:px-24">
            <SectionHeading eyebrow={home.story.eyebrow} title={home.story.title} dark>
              <p>{home.story.body}</p>
            </SectionHeading>
            <div className="mt-10">
              <Button to="/farm" variant="ghost">
                {home.story.cta} <ArrowRight className="size-4 rtl:-scale-x-100" aria-hidden />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32">
        <Container>
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <SectionHeading eyebrow={home.recipes.eyebrow} title={home.recipes.title} />
            <Button to="/recipes" variant="outline">
              {home.recipes.cta} <ArrowRight className="size-4 rtl:-scale-x-100" aria-hidden />
            </Button>
          </div>
          <div className="mt-14 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {recipes.slice(0, 3).map((r) => (
              <motion.div key={r.slug} {...rise}>
                <RecipeCard recipe={r} />
              </motion.div>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-line">
        <Container className="grid grid-cols-1 gap-8 py-16 sm:grid-cols-2 lg:grid-cols-4">
          {home.promises.map((p) => (
            <div key={p.title} className="flex gap-4">
              <Sprig className="h-8 w-8 shrink-0 text-flame-ink" />
              <div>
                <h3 className="font-serif text-[21px] text-wine">{p.title}</h3>
                <p className="mt-1 text-[15px] text-muted">{p.body}</p>
              </div>
            </div>
          ))}
        </Container>
      </section>
    </>
  )
}
