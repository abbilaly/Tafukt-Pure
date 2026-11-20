import { Clock, Plus, Users } from 'lucide-react'
import { Link } from 'react-router'

import { img, type Product, type Recipe } from '../content'
import { cx } from '../lib/cx'
import { useStore } from '../lib/store'
import type { StockState } from '../lib/stock'
import { Badge, IconButton } from './ui'

/**
 * A product cut-out. Jars get their name printed on the label in CSS, so the
 * imagery stays wordless and the owner can rename products freely. Size it
 * with a height (or width for crates) on `className`.
 */
export function Jar({ product, className, eager, alt, speak }: { product: Product; className?: string; eager?: boolean; alt?: string; speak?: boolean }) {
  return (
    <span className={cx('relative block [container-type:size]', className)} style={{ aspectRatio: product.aspect }}>
      <img src={img(product.image)} alt={alt ?? `${product.name}, ${product.kind}`} loading={eager ? 'eager' : 'lazy'} draggable={false} className="absolute inset-0 size-full object-contain" />
      {product.label && (
        <span
          aria-hidden={!speak}
          className="absolute inset-x-[6%] flex -translate-y-1/2 flex-col items-center text-center font-serif leading-[0.95] [text-shadow:0_1px_6px_rgb(0_0_0/0.22)]"
          style={{ top: `${product.label.y}%`, color: product.label.color }}
        >
          <span className={cx("font-semibold tracking-[-0.01em]", product.name.length > 11 ? "text-[12cqw]" : "text-[15cqw]")}>{product.name}</span>{' '}
          <span className="mt-[2cqw] text-[7.5cqw] italic">{product.kind}</span>
        </span>
      )}
    </span>
  )
}

/** A jar standing on its label-coloured tile. */
export function JarTile({ product, className, tilt = 0, eager }: { product: Product; className?: string; tilt?: number; eager?: boolean }) {
  const box = product.category === 'Citrus'
  return (
    <div className={cx('relative grid place-items-center overflow-hidden [container-type:size]', className)} style={{ background: product.tint }}>
      <span aria-hidden className="absolute inset-x-[12%] bottom-[-30%] aspect-square rounded-full bg-white/25" />
      <span className="jar relative transition-transform duration-500 ease-out drop-shadow-[0_24px_24px_rgb(40_8_14/0.28)]" style={{ rotate: `${tilt}deg` }}>
        <Jar product={product} eager={eager} className={box ? 'w-[78cqw]' : 'h-[72cqh]'} />
      </span>
    </div>
  )
}

export function stockFor(state: StockState | undefined, slug: string): number | null {
  return state?.status === 'ready' ? (state.stock[slug] ?? 0) : null
}

export function ProductCard({ product, stock }: { product: Product; stock?: StockState }) {
  const { add, format, toast } = useStore()
  const n = stockFor(stock, product.slug)
  const soldOut = n === 0
  const from = product.sizes[0]
  return (
    <article className="group relative flex flex-col">
      <div className="relative overflow-hidden rounded-card">
        <JarTile product={product} className="aspect-[4/5] [&_.jar]:group-hover:-translate-y-2 [&_.jar]:group-hover:rotate-[-3deg]" />
        <div className="absolute left-4 top-4 flex flex-wrap gap-1.5">
          {soldOut ? <Badge tone="wine">Sold out</Badge> : n !== null && n < 6 ? <Badge tone="cream">Only {n} left</Badge> : product.badges[0] ? <Badge tone="cream">{product.badges[0]}</Badge> : null}
        </div>
        <IconButton
          label={soldOut ? `${product.name} is sold out` : `Add ${product.name} to bag`}
          size="md"
          disabled={soldOut}
          className="!absolute bottom-4 right-4 z-10 shadow-pill"
          onClick={() => {
            add(product, from.id)
            toast(`${product.name} added to your bag`, 'success')
          }}
        >
          <Plus className="size-5" aria-hidden />
        </IconButton>
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
        <p className="pt-1 text-[15px] font-semibold tabular-nums text-wine">{format(from.price)}</p>
      </div>
    </article>
  )
}

export function RecipeCard({ recipe, className }: { recipe: Recipe; className?: string }) {
  return (
    <article className={cx('group relative flex flex-col', className)}>
      <div className="overflow-hidden rounded-[999px_999px_22px_22px]">
        <img src={img(recipe.image)} alt="" loading="lazy" className="aspect-[4/5] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" />
      </div>
      <div className="mt-4 flex items-center gap-4 text-[13px] font-semibold text-flame-text">
        <span>{recipe.course}</span>
        <span className="flex items-center gap-1">
          <Clock className="size-3.5" aria-hidden /> {recipe.minutes} min
        </span>
        <span className="flex items-center gap-1">
          <Users className="size-3.5" aria-hidden /> Serves {recipe.serves}
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
