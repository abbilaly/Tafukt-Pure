import { Button, Container, Eyebrow, SectionHeading, Sprig } from '../components/ui'
import { img } from '../content'
import { useContent } from '../lib/lang'
import { useTitle } from '../lib/title'

export function Farm() {
  const { farm, brand, ui } = useContent()
  useTitle(farm.eyebrow)
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
        <img src={img('farm-hill')} alt="A farmhouse and its stone terraces on a Moroccan hillside" className="h-[60vh] min-h-[360px] w-full object-cover" />
      </div>

      <section className="py-24 md:py-32">
        <Container className="grid gap-16 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="lg:sticky lg:top-10 lg:self-start">
            <img src={img('harvest')} alt="Hands picking fruit into a wicker basket" loading="lazy" className="aspect-[3/4] w-full rounded-[999px_999px_22px_22px] object-cover" />
          </div>
          <div className="flex flex-col justify-center">
            <Eyebrow>{farm.note.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-balance font-serif text-[34px] leading-tight text-wine md:text-[44px]">{farm.note.title}</h2>
            <p className="mt-3 max-w-xl text-[17px] leading-relaxed text-muted">{farm.note.body}</p>
          </div>
        </Container>
      </section>

      <section className="on-dark bg-maroon py-24 text-on-dark md:py-32">
        <Container>
          <SectionHeading eyebrow={ui.seasonsEyebrow} title={farm.seasonsTitle} dark />
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
          <img src={img('kitchen')} alt="Rows of freshly filled jars on the workshop table" loading="lazy" className="aspect-[3/2] w-full rounded-card object-cover" />
          <div>
            <Eyebrow>{ui.visitEyebrow}</Eyebrow>
            <h2 className="mt-4 font-serif text-[40px] leading-tight text-wine md:text-[52px]">{farm.kitchenTitle}</h2>
            <p className="mt-5 text-[17px] leading-relaxed text-muted">{farm.kitchenBody}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href={`mailto:${brand.email}?subject=TAFUKT%20PURE`} className="inline-flex h-11 items-center rounded-control bg-flame-ink px-6 text-[14px] font-semibold text-white transition-colors hover:bg-wine">
                {farm.visitCta}
              </a>
              <Button to="/shop" variant="outline">
                {ui.shopTheLarder}
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
