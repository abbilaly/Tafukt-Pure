import { motion } from 'motion/react'

import { Button, Container, Eyebrow, SectionHeading, Sprig } from '../components/ui'
import { brand, farm, img } from '../content'
import { useTitle } from '../lib/title'

const rise = { initial: { opacity: 0, y: 28 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-60px' }, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } }

export function Farm() {
  useTitle('Our farm')
  return (
    <>
      <Container className="grid gap-12 pb-20 pt-12 md:pt-16 lg:grid-cols-[1fr_0.8fr] lg:items-end">
        <SectionHeading as="h1" eyebrow={farm.eyebrow} title={farm.title}>
          <p>{farm.intro}</p>
        </SectionHeading>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-card bg-line">
          {farm.stats.map((s) => (
            <div key={s.label} className="bg-cream px-6 py-6">
              <dt className="sr-only">{s.label}</dt>
              <dd>
                <span className="block font-serif text-[48px] leading-none text-flame-text">{s.value}</span>
                <span className="mt-2 block text-[14px] text-muted">{s.label}</span>
              </dd>
            </div>
          ))}
        </dl>
      </Container>

      <div className="relative">
        <img src={img('farm-hill')} alt="The farmhouse and its stone terraces of citrus and olive above the sea" className="h-[60vh] min-h-[360px] w-full object-cover" />
      </div>

      <section className="py-24 md:py-32">
        <Container className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-10 lg:self-start">
            <img src={img('harvest')} alt="Hands picking a lemon into a wicker basket" loading="lazy" className="aspect-[3/4] w-full rounded-[999px_999px_22px_22px] object-cover" />
          </div>
          <ol className="relative border-l-[1.5px] border-line-strong pl-8 md:pl-12">
            {farm.timeline.map((t) => (
              <motion.li key={t.year} {...rise} className="relative pb-14 last:pb-0">
                <span aria-hidden className="absolute -left-[39px] top-2 size-3.5 rounded-full bg-flame-ink ring-4 ring-cream md:-left-[55px]" />
                <p className="font-serif text-[20px] italic text-flame-text">{t.year}</p>
                <h2 className="mt-1 font-serif text-[34px] leading-tight text-wine md:text-[44px]">{t.title}</h2>
                <p className="mt-3 max-w-xl text-[17px] leading-relaxed text-muted">{t.body}</p>
              </motion.li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="on-dark bg-maroon py-24 text-on-dark md:py-32">
        <Container>
          <SectionHeading eyebrow="The year on the hill" title={farm.seasonsTitle} dark />
          <ul className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4 lg:grid-cols-7">
            {farm.seasons.map((s) => (
              <li key={s.month} className="rounded-[999px_999px_22px_22px] bg-maroon-deep/50 px-4 pb-6 pt-10 text-center">
                <Sprig className="mx-auto h-8 text-flame" />
                <p className="mt-4 font-serif text-[30px]">{s.month}</p>
                <p className="mt-2 text-[14px] text-on-dark-muted">{s.crop}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section id="visit" className="scroll-mt-6 py-24 md:py-32">
        <Container className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <img src={img('kitchen')} alt="Rows of freshly filled jars cooling on the farmhouse kitchen table" loading="lazy" className="aspect-[3/2] w-full rounded-card object-cover" />
          <div>
            <Eyebrow>Visit</Eyebrow>
            <h2 className="mt-4 font-serif text-[40px] leading-tight text-wine md:text-[52px]">{farm.kitchenTitle}</h2>
            <p className="mt-5 text-[17px] leading-relaxed text-muted">{farm.kitchenBody}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${brand.email}?subject=Visiting%20the%20farm`} className="inline-flex h-11 items-center rounded-control bg-flame-ink px-6 text-[14px] font-semibold text-white transition-colors hover:bg-wine">
                {farm.visitCta}
              </a>
              <Button to="/shop" variant="outline">
                Shop the larder
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
