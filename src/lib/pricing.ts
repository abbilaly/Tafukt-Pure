import { bag, products, type Product, type Size } from '../content'

// Shared by the page and the Worker, so the totals the customer sees are the
// totals the server checks. Prices are in euro; currency only changes display.

export type Line = { slug: string; size: string; qty: number }
export const MAX_QTY = 12

/** Promo codes the Worker accepts. Replace with your commerce backend. */
export const PROMOS: Record<string, { percent: number; label: string }> = {
  CEDRINA10: { percent: 10, label: '10% off your order' },
  BENVENUTO: { percent: 15, label: '15% off your first order' },
}

export const productBySlug = (slug: string): Product | undefined => products.find((p) => p.slug === slug)
export const sizeOf = (p: Product, id: string): Size | undefined => p.sizes.find((s) => s.id === id)

export function resolve(lines: Line[]) {
  return lines.flatMap((l) => {
    const product = productBySlug(l.slug)
    const size = product && sizeOf(product, l.size)
    if (!product || !size) return []
    const qty = Math.max(1, Math.min(MAX_QTY, Math.round(l.qty)))
    return [{ ...l, qty, product, sizeInfo: size, lineTotal: size.price * qty }]
  })
}

export function totals(lines: Line[], shippingId: string, promoCode: string | null) {
  const items = resolve(lines)
  const subtotal = round(items.reduce((n, i) => n + i.lineTotal, 0))
  const promo = promoCode ? PROMOS[promoCode] : undefined
  const discount = promo ? round((subtotal * promo.percent) / 100) : 0
  const option = bag.shippingOptions.find((o) => o.id === shippingId) ?? bag.shippingOptions[0]
  const free = option.id === 'standard' && subtotal - discount >= bag.freeOver
  const shipping = items.length === 0 || free ? 0 : option.price
  return { items, subtotal, discount, shipping, free, option, total: round(subtotal - discount + shipping), count: items.reduce((n, i) => n + i.qty, 0) }
}

const round = (n: number) => Math.round(n * 100) / 100
