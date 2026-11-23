import { ChevronLeft, ChevronRight, Clock, Plus, Users } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Link } from 'react-router'

import type { Product, Recipe } from '../content'
import { cx } from '../lib/cx'
import { useContent } from '../lib/lang'
import { useStore } from '../lib/store'
import type { StockState } from '../lib/stock'
import { Img } from './Img'
import { Badge, IconButton } from './ui'

/**
 * A product cut-out. Jars get their name printed on the label in CSS, so the
 * imagery stays wordless and the owner can rename products freely. Size it
 * with a height (or width for crates) on `className`.
 */
export function Jar({ product, className, eager, priority, sizes, alt, speak }: { product: Product; className?: string; eager?: boolean; priority?: boolean; sizes?: string; alt?: string; speak?: boolean }) {
  return (
    <span className={cx('relative block [container-type:size]', className)} style={{ aspectRatio: product.aspect }}>
      {/* `zoom` enlarges a cut-out with wide transparent margins as a whole, never cropping it. */}
      <Img
        name={product.image}
        sizes={sizes ?? '(min-width: 1280px) 25vw, (min-width: 640px) 45vw, 78vw'}
        alt={alt ?? `${product.name}, ${product.kind}`}
        eager={eager}
        priority={priority}
        className={cx('absolute inset-0 size-full', product.fit === 'cover' ? 'object-cover' : 'object-contain')}
        style={product.zoom ? { transform: `scale(${product.zoom})` } : undefined}
      />
      {product.label && (
        <span
          aria-hidden={!speak}
          className="absolute inset-x-[6%] flex -translate-y-1/2 flex-col items-center text-center font-serif leading-[0.95] [text-shadow:0_1px_6px_rgb(0_0_0/0.22)]"
          style={{ top: `${product.label.y}%`, color: product.label.color }}
        >
          <span className={cx("font-semibold tracking-[-0.01em]", product.name.length > 11 ? "text-[12cqw]" : "text-[15cqw]")}>{product.name}</span>{' '}
          <span className="mt-[2cqw] text-[7.5cqw] italic">{product.kindLatin ?? product.kind}</span>
        </span>
      )}
    </span>
  )
}

/** A jar standing on its label-coloured tile. */
export function JarTile({ product, className, tilt = 0, eager, sizes }: { product: Product; className?: string; tilt?: number; eager?: boolean; sizes?: string }) {
  return (
    <div className={cx('relative grid place-items-center overflow-hidden [container-type:size]', className)} style={{ background: product.tint }}>
      <span aria-hidden className="absolute inset-x-[12%] bottom-[-30%] aspect-square rounded-full bg-white/25" />
      <span className="jar relative transition-transform duration-500 ease-out drop-shadow-[0_24px_24px_rgb(35_43_24/0.28)]" style={{ rotate: `${tilt}deg` }}>
        <Jar product={product} eager={eager} sizes={sizes} className="h-[72cqh]" />
      </span>
    </div>
  )
}

export function stockFor(state: StockState | undefined, slug: string): number | null {
  return state?.status === 'ready' ? (state.stock[slug] ?? 0) : null
}

export function ProductCard({ product, stock }: { product: Product; stock?: StockState }) {
  const { add, format, toast } = useStore()
  const { ui } = useContent()
  const n = stockFor(stock, product.slug)
  const coming = !!product.priceTbc
  const soldOut = !coming && n === 0
  const from = product.sizes[0]
  return (
    <article className="group relative flex flex-col">
      <div className="relative overflow-hidden rounded-card">
        <JarTile product={product} className="aspect-[4/5] [&_.jar]:group-hover:-translate-y-2 [&_.jar]:group-hover:rotate-[-3deg]" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
          {soldOut ? <Badge tone="wine">{ui.soldOut}</Badge> : !coming && n !== null && n < 6 ? <Badge tone="cream">{ui.onlyLeft(n)}</Badge> : product.badges[0] ? <Badge tone="cream">{product.badges[0]}</Badge> : null}
        </div>
        {!coming && from.price === undefined ? (
          // No price yet: the size has to be chosen on the product page first.
          <Link to={`/shop/${product.slug}`} aria-label={ui.chooseSize(product.name)} className="absolute bottom-4 end-4 z-10 grid size-11 place-items-center rounded-full bg-white text-wine shadow-pill transition-colors hover:bg-wine hover:text-on-dark">
            <Plus className="size-5" aria-hidden />
          </Link>
        ) : (
          <IconButton
            label={coming ? ui.comingSoon : soldOut ? ui.soldOutToast(product.name) : ui.addToBag(product.name)}
            size="md"
            disabled={coming || soldOut}
            className="!absolute bottom-4 end-4 z-10 shadow-pill"
            onClick={() => {
              add(product, from.id)
              toast(ui.addedToast(product.name), 'success')
            }}
          >
            <Plus className="size-5" aria-hidden />
          </IconButton>
        )}
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-serif text-[24px] leading-tight text-wine">
            <Link to={`/shop/${product.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none [&:focus-visible]:after:rounded-card [&:focus-visible]:after:outline-2 [&:focus-visible]:after:outline-offset-4 [&:focus-visible]:after:outline-flame-ink">
              {product.name}
            </Link>
          </h3>
          <p className="font-serif text-[15px] italic text-muted">{product.kind}</p>
        </div>
        {coming ? (
          <p className="shrink-0 whitespace-nowrap pt-1 text-[12px] font-bold uppercase tracking-[0.08em] text-flame-text">{ui.comingSoon}</p>
        ) : from.price === undefined ? (
          <p className="shrink-0 whitespace-nowrap pt-1 text-[12px] font-bold uppercase tracking-[0.08em] text-flame-text">{ui.pricePending}</p>
        ) : (
          <p className="pt-1 text-[15px] font-semibold tabular-nums text-wine">{format(from.price)}</p>
        )}
      </div>
    </article>
  )
}

/**
 * The product shelf: a single horizontally scrolling row. Touch screens swipe
 * it natively (with snap points), wider screens get arrow buttons. Cards keep
 * one width and one 4:5 tile so the row reads evenly at every breakpoint.
 */
export function ProductRail({ items, stock, labels }: { items: Product[]; stock?: StockState; labels: { label: string; prev: string; next: string } }) {
  const ref = useRef<HTMLUListElement>(null)
  const [edges, setEdges] = useState({ start: true, end: false })

  const measure = useCallback(() => {
    const el = ref.current
    if (!el) return
    const at = Math.abs(el.scrollLeft)
    const max = el.scrollWidth - el.clientWidth
    setEdges({ start: at < 4, end: at > max - 4 })
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!el) return
    measure()
    el.addEventListener('scroll', measure, { passive: true })
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    return () => {
      el.removeEventListener('scroll', measure)
      ro.disconnect()
    }
  }, [measure])

  // One card per press, in the direction the language reads.
  const nudge = (dir: 1 | -1) => {
    const el = ref.current
    if (!el) return
    const card = el.firstElementChild as HTMLElement | null
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0
    const step = card ? card.getBoundingClientRect().width + gap : el.clientWidth * 0.8
    const rtl = getComputedStyle(el).direction === 'rtl'
    el.scrollBy({ left: dir * step * (rtl ? -1 : 1), behavior: 'smooth' })
  }

  return (
    <div>
      <ul
        ref={ref}
        aria-label={labels.label}
        className="-mx-4 flex snap-x snap-mandatory scroll-ps-4 gap-6 overflow-x-auto scroll-smooth px-4 pb-6 [scrollbar-width:none] md:mx-0 md:scroll-ps-0 md:px-0 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((p) => (
          <li key={p.slug} className="w-[78%] shrink-0 snap-start sm:w-[45%] lg:w-[calc(25%-1.125rem)]">
            <ProductCard product={p} stock={stock} />
          </li>
        ))}
      </ul>
      <div aria-hidden={edges.start && edges.end} className="mt-1 hidden items-center justify-end gap-2 md:flex">
        <button
          type="button"
          aria-label={labels.prev}
          disabled={edges.start}
          onClick={() => nudge(-1)}
          className="grid size-11 place-items-center rounded-full border-[1.5px] border-wine text-wine transition-colors hover:enabled:bg-wine hover:enabled:text-on-dark disabled:opacity-30"
        >
          <ChevronLeft className="size-5 rtl:-scale-x-100" aria-hidden />
        </button>
        <button
          type="button"
          aria-label={labels.next}
          disabled={edges.end}
          onClick={() => nudge(1)}
          className="grid size-11 place-items-center rounded-full border-[1.5px] border-wine text-wine transition-colors hover:enabled:bg-wine hover:enabled:text-on-dark disabled:opacity-30"
        >
          <ChevronRight className="size-5 rtl:-scale-x-100" aria-hidden />
        </button>
      </div>
    </div>
  )
}

export function RecipeCard({ recipe, className }: { recipe: Recipe; className?: string }) {
  const { ui } = useContent()
  return (
    <article className={cx('group relative flex flex-col', className)}>
      <div className="overflow-hidden rounded-[999px_999px_22px_22px]">
        <Img name={recipe.image} sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw" className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
      </div>
      <div className="mt-4 flex items-center gap-4 text-[13px] font-semibold text-flame-text">
        <span>{ui.courses[recipe.course]}</span>
        <span className="flex items-center gap-1">
          <Clock className="size-3.5" aria-hidden /> {ui.minutes(recipe.minutes)}
        </span>
        <span className="flex items-center gap-1">
          <Users className="size-3.5" aria-hidden /> {ui.serves(recipe.serves)}
        </span>
      </div>
      <h3 className="mt-2 font-serif text-[24px] leading-tight text-wine">
        <Link to={`/recipes/${recipe.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:outline-none [&:focus-visible]:after:rounded-card [&:focus-visible]:after:outline-2 [&:focus-visible]:after:outline-offset-4 [&:focus-visible]:after:outline-flame-ink">
          {recipe.title}
        </Link>
      </h3>
    </article>
  )
}
