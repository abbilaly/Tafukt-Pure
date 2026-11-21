import { createContext, useCallback, useContext, useMemo, useRef, useState, type ReactNode } from 'react'

import { currencies, type Currency, type Product } from '../content'
import type { Lang } from '../content.i18n'
import { useLang } from './lang'
import { usePersistent } from './persist'
import { MAX_QTY, totals, type Line } from './pricing'

// Bag, currency, orders, overlays and toasts. Bag, currency, delivery choice,
// promo and order history persist in localStorage.

export interface Order {
  reference: string
  createdAt: string
  name: string
  email: string
  address: string
  shipping: string
  total: number
  currency: Currency
  items: { name: string; size: string; qty: number }[]
}
export interface Toast {
  id: number
  message: string
  tone: 'default' | 'success' | 'error'
}

interface Store {
  lines: Line[]
  add: (p: Product, size: string, qty?: number) => void
  setQty: (slug: string, size: string, qty: number) => void
  remove: (slug: string, size: string) => void
  clear: () => void
  shipping: string
  setShipping: (id: string) => void
  promo: string | null
  setPromo: (code: string | null) => void
  summary: ReturnType<typeof totals>
  currency: Currency
  setCurrency: (c: Currency) => void
  format: (eur: number) => string
  orders: Order[]
  addOrder: (o: Order) => void
  bagOpen: boolean
  setBagOpen: (v: boolean) => void
  menuOpen: boolean
  setMenuOpen: (v: boolean) => void
  toasts: Toast[]
  toast: (message: string, tone?: Toast['tone']) => void
  dismiss: (id: number) => void
}

const Ctx = createContext<Store | null>(null)
const isLines = (v: unknown): v is Line[] =>
  Array.isArray(v) && v.every((l) => l && typeof l.slug === 'string' && typeof l.size === 'string' && typeof l.qty === 'number')
const isArray = (v: unknown): v is Order[] => Array.isArray(v)
const isCurrency = (v: unknown): v is Currency => v === 'EUR' || v === 'USD'
const isString = (v: unknown): v is string => typeof v === 'string'
const isPromo = (v: unknown): v is string | null => v === null || typeof v === 'string'

export function formatPrice(eur: number, currency: Currency, lang: Lang = 'en') {
  const c = currencies.find((x) => x.id === currency) ?? currencies[0]
  const locale = lang === 'ar' ? 'ar-EG-u-nu-latn' : currency === 'EUR' ? 'en-IE' : 'en-US'
  return new Intl.NumberFormat(locale, { style: 'currency', currency }).format(eur * c.rate)
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const { lang } = useLang()
  const [lines, setLines] = usePersistent<Line[]>('tafukt-bag', [], isLines)
  const [currency, setCurrency] = usePersistent<Currency>('tafukt-currency', 'EUR', isCurrency)
  const [shipping, setShipping] = usePersistent<string>('tafukt-shipping', 'standard', isString)
  const [promo, setPromo] = usePersistent<string | null>('tafukt-promo', null, isPromo)
  const [orders, setOrders] = usePersistent<Order[]>('tafukt-orders', [], isArray)
  const [bagOpen, setBagOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [toasts, setToasts] = useState<Toast[]>([])
  const next = useRef(1)

  const dismiss = useCallback((id: number) => setToasts((t) => t.filter((x) => x.id !== id)), [])
  const toast = useCallback(
    (message: string, tone: Toast['tone'] = 'default') => {
      const id = next.current++
      setToasts((t) => [...t.slice(-2), { id, message, tone }])
      window.setTimeout(() => dismiss(id), 3600)
    },
    [dismiss],
  )

  const add = useCallback(
    (p: Product, size: string, qty = 1) =>
      setLines((ls) => {
        const hit = ls.find((l) => l.slug === p.slug && l.size === size)
        if (hit) return ls.map((l) => (l === hit ? { ...l, qty: Math.min(MAX_QTY, l.qty + qty) } : l))
        return [...ls, { slug: p.slug, size, qty: Math.min(MAX_QTY, qty) }]
      }),
    [setLines],
  )
  const setQty = useCallback(
    (slug: string, size: string, qty: number) =>
      setLines((ls) => ls.map((l) => (l.slug === slug && l.size === size ? { ...l, qty: Math.max(1, Math.min(MAX_QTY, qty)) } : l))),
    [setLines],
  )
  const remove = useCallback((slug: string, size: string) => setLines((ls) => ls.filter((l) => !(l.slug === slug && l.size === size))), [setLines])
  const clear = useCallback(() => setLines([]), [setLines])
  const addOrder = useCallback((o: Order) => setOrders((os) => [o, ...os].slice(0, 20)), [setOrders])
  const format = useCallback((eur: number) => formatPrice(eur, currency, lang), [currency, lang])
  const summary = useMemo(() => totals(lines, shipping, promo), [lines, shipping, promo])

  const value = useMemo<Store>(
    () => ({ lines, add, setQty, remove, clear, shipping, setShipping, promo, setPromo, summary, currency, setCurrency, format, orders, addOrder, bagOpen, setBagOpen, menuOpen, setMenuOpen, toasts, toast, dismiss }),
    [lines, add, setQty, remove, clear, shipping, setShipping, promo, setPromo, summary, currency, setCurrency, format, orders, addOrder, bagOpen, menuOpen, toasts, toast, dismiss],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useStore() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useStore outside StoreProvider')
  return v
}
