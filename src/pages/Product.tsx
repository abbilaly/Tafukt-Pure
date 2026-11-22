import { Check, Leaf, Truck } from 'lucide-react'
import { useState } from 'react'
import { useParams } from 'react-router'

import { JarTile, ProductCard, RecipeCard, stockFor } from '../components/Cards'
import { Badge, Button, Container, Crumb, OptionCard, QtyStepper, Skeleton } from '../components/ui'
import { useContent } from '../lib/lang'
import { useStock } from '../lib/stock'
import { useStore } from '../lib/store'
import { useTitle } from '../lib/title'
import { NotFound } from './NotFound'

export function ProductPage() {
  const { slug = '' } = useParams()
  const { productPage: copy, product: productOf } = useContent()
  const product = productOf(slug)
  useTitle(product?.name ?? copy.notFound)
  if (!product) return <NotFound message={copy.notFound} />
  return <ProductView key={product.slug} slug={product.slug} />
}

function ProductView({ slug }: { slug: string }) {
  const { productPage: copy, product: productOf, products, recipes, ui } = useContent()
  const product = productOf(slug)!
  const { add, format, toast, setBagOpen } = useStore()
  const stock = useStock()
  const [size, setSize] = useState(product.sizes[0].id)
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const n = stockFor(stock, product.slug)
  const soldOut = n === 0
  const price = product.sizes.find((s) => s.id === size)!.price
  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4)
  const cook = recipes.filter((r) => r.products.includes(product.slug))

  const onAdd = () => {
    add(product, size, qty)
    setAdded(true)
    toast(`${qty} × ${ui.addedToast(product.name)}`, 'success')
    window.setTimeout(() => setAdded(false), 2200)
  }

  return (
    <>
      <Container className="pt-8">
        <Crumb to="/shop">{ui.theLarder}</Crumb>
      </Container>
      <Container className="grid gap-10 pb-24 pt-6 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div className="lg:sticky lg:top-6 lg:self-start">
          <JarTile product={product} eager tilt={-4} className="aspect-square rounded-panel md:aspect-[5/5]" />
        </div>
        <div className="flex flex-col">
          <div className="flex flex-wrap gap-2">
            {product.badges.map((b) => (
              <Badge key={b}>{b}</Badge>
            ))}
          </div>
          <h1 className="mt-5 font-serif text-[52px] leading-none text-wine md:text-[76px]">{product.name}</h1>
          <p className="mt-3 font-serif text-[24px] italic text-flame-text">{product.kind}</p>
          <p className={product.priceTbc ? 'mt-6 font-serif text-[24px] italic text-flame-text' : 'mt-6 font-serif text-[34px] tabular-nums text-wine'}>{product.priceTbc ? ui.priceTbc : format(price)}</p>
          <p className="mt-6 text-[17px] leading-relaxed text-muted">{product.description}</p>

          {!product.priceTbc && (
            <fieldset className="mt-8">
              <legend className="text-[13px] font-semibold text-wine">{copy.sizes}</legend>
              <div className="mt-2 grid gap-2 sm:grid-cols-2">
                {product.sizes.map((s) => (
                  <OptionCard key={s.id} name="size" value={s.id} checked={size === s.id} onChange={setSize} title={s.label} detail={format(s.price)} />
                ))}
              </div>
            </fieldset>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-3">
            {!product.priceTbc && <QtyStepper label={copy.quantity} value={qty} onChange={setQty} max={n !== null && n > 0 ? Math.min(12, n) : 12} />}
            <Button size="lg" className="min-w-56 flex-1" disabled={product.priceTbc || soldOut} onClick={onAdd}>
              {product.priceTbc ? ui.comingSoon : soldOut ? copy.soldOut : added ? (
                <>
                  <Check className="size-4" aria-hidden /> {copy.added}
                </>
              ) : (
                `${copy.add} · ${format(price * qty)}`
              )}
            </Button>
          </div>
          {added && (
            <button type="button" onClick={() => setBagOpen(true)} className="mt-3 inline-flex min-h-10 items-center self-start text-[14px] font-semibold text-flame-text underline underline-offset-4">
              {ui.viewBag}
            </button>
          )}

          <p hidden={product.priceTbc} className="mt-4 flex min-h-6 items-center gap-2 text-[14px] font-medium" aria-live="polite">
            {stock.status === 'loading' ? (
              <>
                <Skeleton className="h-4 w-44 !rounded-full" />
                <span className="sr-only">{copy.checking}</span>
              </>
            ) : stock.status === 'error' ? (
              <span className="text-muted">{copy.inStock}</span>
            ) : soldOut ? (
              <span className="text-danger">
                {copy.soldOut}. {ui.nextBatch}
              </span>
            ) : n !== null && n < 6 ? (
              <span className="text-flame-text">{copy.lowStock(n)}</span>
            ) : (
              <span className="flex items-center gap-2 text-success">
                <Truck className="size-4" aria-hidden /> {copy.inStock}
              </span>
            )}
          </p>

          <dl className="mt-10 divide-y divide-line border-y border-line">
            <div className="grid gap-2 py-5 sm:grid-cols-[160px_1fr]">
              <dt className="text-[13px] font-bold uppercase tracking-[0.14em] text-wine">{copy.ingredients}</dt>
              <dd className="text-[15px] text-muted">{product.ingredients}</dd>
            </div>
            <div hidden={product.pairings.length === 0} className="grid gap-2 py-5 sm:grid-cols-[160px_1fr]">
              <dt className="text-[13px] font-bold uppercase tracking-[0.14em] text-wine">{copy.pairings}</dt>
              <dd className="flex flex-wrap gap-2">
                {product.pairings.map((p) => (
                  <Badge key={p} tone="olive">
                    {p}
                  </Badge>
                ))}
              </dd>
            </div>
            <div className="grid gap-2 py-5 sm:grid-cols-[160px_1fr]">
              <dt className="text-[13px] font-bold uppercase tracking-[0.14em] text-wine">{ui.season}</dt>
              <dd className="flex items-center gap-2 text-[15px] text-muted">
                <Leaf className="size-4 text-olive" aria-hidden /> {product.season}
              </dd>
            </div>
          </dl>
        </div>
      </Container>

      {cook.length > 0 && (
        <section className="bg-cream-2 py-20">
          <Container>
            <h2 className="font-serif text-[40px] text-wine">{copy.recipes}</h2>
            <div className="mt-10 grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {cook.map((r) => (
                <RecipeCard key={r.slug} recipe={r} />
              ))}
            </div>
          </Container>
        </section>
      )}

      <section className="py-20">
        <Container>
          <h2 className="font-serif text-[40px] text-wine">{copy.related}</h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.slug} product={p} stock={stock} />
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
