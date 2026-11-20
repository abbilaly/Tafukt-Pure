import { Search, X } from 'lucide-react'
import { useMemo } from 'react'
import { useSearchParams } from 'react-router'

import { ProductCard } from '../components/Cards'
import { Button, Chip, Container, EmptyState, Notice, SectionHeading, Select, Skeleton } from '../components/ui'
import { categories, products, shop, type Category } from '../content'
import { useStock } from '../lib/stock'
import { useTitle } from '../lib/title'

export function Shop() {
  useTitle('The larder')
  const [params, setParams] = useSearchParams()
  const stock = useStock()
  const cat = (categories.some((c) => c.id === params.get('c')) ? params.get('c') : null) as Category | null
  const q = params.get('q') ?? ''
  const sort = params.get('sort') ?? 'featured'

  const set = (key: string, value: string | null) => {
    const next = new URLSearchParams(params)
    if (value) next.set(key, value)
    else next.delete(key)
    setParams(next, { replace: true })
  }

  const list = useMemo(() => {
    const needle = q.trim().toLowerCase()
    const out = products.filter((p) => (!cat || p.category === cat) && (!needle || `${p.name} ${p.kind} ${p.short} ${p.category}`.toLowerCase().includes(needle)))
    if (sort === 'price-asc') out.sort((a, b) => a.sizes[0].price - b.sizes[0].price)
    if (sort === 'price-desc') out.sort((a, b) => b.sizes[0].price - a.sizes[0].price)
    if (sort === 'name') out.sort((a, b) => a.name.localeCompare(b.name))
    return out
  }, [cat, q, sort])

  return (
    <Container className="pb-28 pt-12 md:pt-16">
      <SectionHeading as="h1" eyebrow={shop.eyebrow} title={shop.title}>
        <p>{shop.intro}</p>
      </SectionHeading>

      <div className="mt-12 flex flex-col gap-4 border-y border-line py-5 lg:flex-row lg:items-end lg:justify-between">
        <div role="group" aria-label="Shelf" className="flex flex-wrap gap-2">
          <Chip active={!cat} onClick={() => set('c', null)}>
            {shop.all}
          </Chip>
          {categories.map((c) => (
            <Chip key={c.id} active={cat === c.id} onClick={() => set('c', c.id)}>
              {c.title}
            </Chip>
          ))}
        </div>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
          <div className="relative sm:w-72">
            <label htmlFor="shop-q" className="sr-only">
              {shop.searchLabel}
            </label>
            <Search aria-hidden className="pointer-events-none absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted" />
            <input
              id="shop-q"
              type="search"
              value={q}
              onChange={(e) => set('q', e.target.value || null)}
              placeholder={shop.searchPlaceholder}
              className="h-12 w-full rounded-control border-[1.5px] border-line-strong bg-paper pl-11 pr-11 text-[15px] text-ink placeholder:text-muted/80 hover:border-wine focus-visible:border-wine [&::-webkit-search-cancel-button]:hidden"
            />
            {q && (
              <button type="button" aria-label="Clear search" onClick={() => set('q', null)} className="absolute right-1 top-1/2 grid size-10 -translate-y-1/2 place-items-center rounded-full text-wine hover:bg-cream-2">
                <X className="size-4" aria-hidden />
              </button>
            )}
          </div>
          <Select label={shop.sortLabel} value={sort} onChange={(e) => set('sort', e.target.value === 'featured' ? null : e.target.value)} className="sm:w-56 [&_label]:sr-only">
            {shop.sorts.map((s) => (
              <option key={s.id} value={s.id}>
                {s.label}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <p className="mt-6 text-[14px] text-muted" aria-live="polite">
        {list.length} {list.length === 1 ? 'product' : 'products'}
        {stock.status === 'loading' && <span className="ml-2">· checking stock…</span>}
      </p>
      {stock.status === 'error' && (
        <div className="mt-4">
          <Notice tone="error">{shop.stockError}</Notice>
        </div>
      )}

      {list.length === 0 ? (
        <div className="mt-10">
          <EmptyState
            title={shop.empty.title}
            body={shop.empty.body}
            action={
              <Button variant="outline" onClick={() => setParams({}, { replace: true })}>
                {shop.empty.cta}
              </Button>
            }
          />
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.slug} product={p} stock={stock} />
          ))}
        </div>
      )}
    </Container>
  )
}

/** Placeholder grid shown in the style guide's loading state. */
export function ShopSkeleton() {
  return (
    <div className="grid grid-cols-2 gap-6">
      {[0, 1].map((i) => (
        <div key={i}>
          <Skeleton className="aspect-[4/5] !rounded-card" />
          <Skeleton className="mt-4 h-6 w-2/3" />
          <Skeleton className="mt-2 h-4 w-1/3" />
        </div>
      ))}
    </div>
  )
}
