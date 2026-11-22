import { Hono } from 'hono'

import { bag, products } from '../content'
import { PROMOS, resolve, totals, type Line } from '../lib/pricing'

// The Worker in front of the shop. Stock, promo codes, orders and the
// newsletter answer JSON here. Nothing is stored: wire /api/order to your
// payment provider and /api/subscribe to your email tool.
type Env = { ASSETS: Fetcher }

const app = new Hono<{ Bindings: Env }>()

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/
type Body = Record<string, unknown>
const read = async (req: Request): Promise<Body> => {
  try {
    const v: unknown = await req.json()
    return v && typeof v === 'object' && !Array.isArray(v) ? (v as Body) : {}
  } catch {
    return {}
  }
}
const str = (b: Body, key: string, max = 200) => (typeof b[key] === 'string' ? (b[key] as string).trim().slice(0, max) : '')

// Customer-facing messages, in both storefront languages.
const MSG = {
  en: {
    codeMissing: 'Enter a code.',
    codeInvalid: 'That code is not valid.',
    name: 'Tell us your name.',
    email: 'Enter a valid email address.',
    address: 'Enter a street address.',
    city: 'Enter a town or city.',
    postcode: 'Enter a valid postcode.',
    country: 'Choose a country we ship to.',
    shipping: 'Choose a delivery option.',
    bagEmpty: 'Your bag is empty.',
    downTo: (name: string, left: number) => `Sorry, ${name} is down to ${left}.`,
    soldOut: (name: string) => `Sorry, ${name} is sold out.`,
    checkFields: 'Check the highlighted fields.',
    notFound: 'Not found',
  },
  ar: {
    codeMissing: 'أدخل رمزًا.',
    codeInvalid: 'هذا الرمز غير صالح.',
    name: 'أخبرنا باسمك.',
    email: 'أدخل بريدًا إلكترونيًا صالحًا.',
    address: 'أدخل عنوان الشارع.',
    city: 'أدخل المدينة أو البلدة.',
    postcode: 'أدخل رمزًا بريديًا صالحًا.',
    country: 'اختر دولة نشحن إليها.',
    shipping: 'اختر طريقة توصيل.',
    bagEmpty: 'سلّتك فارغة.',
    downTo: (name: string, left: number) => `عذرًا، بقي من ${name} ${left} فقط.`,
    soldOut: (name: string) => `عذرًا، ${name} نفدت كميته.`,
    checkFields: 'راجع الحقول المحدّدة.',
    notFound: 'غير موجود',
  },
}
type Lang = keyof typeof MSG

// Seed stock levels per product. 0 = sold out, below 6 = "only N left".
const STOCK: Record<string, number> = Object.fromEntries(products.map((p) => [p.slug, 40]))
STOCK['argan-oil'] = 4

app.get('/api/health', (c) => c.json({ ok: true }))

app.get('/api/stock', (c) => c.json({ stock: STOCK }))

app.post('/api/promo', async (c) => {
  const b = await read(c.req.raw)
  const m = MSG[str(b, 'lang', 2) as Lang] ?? MSG.en
  const code = str(b, 'code', 40).toUpperCase()
  if (!code) return c.json({ error: m.codeMissing }, 400)
  const promo = PROMOS[code]
  if (!promo) return c.json({ error: m.codeInvalid }, 400)
  return c.json({ code, ...promo })
})

app.post('/api/order', async (c) => {
  const b = await read(c.req.raw)
  const m = MSG[str(b, 'lang', 2) as Lang] ?? MSG.en
  const contact = (b.contact && typeof b.contact === 'object' ? b.contact : {}) as Body
  const fields: Record<string, string> = {}
  if (str(contact, 'name').length < 2) fields.name = m.name
  if (!EMAIL.test(str(contact, 'email'))) fields.email = m.email
  const shipping = str(b, 'shipping')
  const pickup = shipping === 'pickup'
  if (!pickup && str(contact, 'address').length < 4) fields.address = m.address
  if (!pickup && str(contact, 'city').length < 2) fields.city = m.city
  if (!pickup && !/^[A-Za-z0-9 -]{3,10}$/.test(str(contact, 'postcode'))) fields.postcode = m.postcode
  if (!bag.countries.includes(str(contact, 'country'))) fields.country = m.country
  if (!bag.shippingOptions.some((o) => o.id === shipping)) fields.shipping = m.shipping

  const raw = Array.isArray(b.items) ? b.items : []
  const lines: Line[] = raw
    .filter((l): l is Line => !!l && typeof l === 'object' && typeof l.slug === 'string' && typeof l.size === 'string' && typeof l.qty === 'number')
    .slice(0, 40)
  const items = resolve(lines)
  if (!items.length) return c.json({ error: m.bagEmpty }, 400)
  const short = items.find((i) => (STOCK[i.slug] ?? 0) < i.qty)
  if (short) return c.json({ error: STOCK[short.slug] ? m.downTo(short.product.name, STOCK[short.slug]) : m.soldOut(short.product.name) }, 409)
  if (Object.keys(fields).length) return c.json({ error: m.checkFields, fields }, 400)

  const promo = str(b, 'promo', 40).toUpperCase() || null
  const t = totals(lines, shipping, promo && PROMOS[promo] ? promo : null)
  const reference = `CF-${Math.random().toString(36).slice(2, 7).toUpperCase()}`
  return c.json({ reference, total: t.total })
})

app.post('/api/subscribe', async (c) => {
  const b = await read(c.req.raw)
  const m = MSG[str(b, 'lang', 2) as Lang] ?? MSG.en
  const email = str(b, 'email')
  if (!EMAIL.test(email)) return c.json({ error: m.email }, 400)
  return c.json({ ok: true })
})

app.all('/api/*', (c) => c.json({ error: MSG.en.notFound }, 404))

app.all('*', (c) => c.env.ASSETS.fetch(c.req.raw))

export default app
