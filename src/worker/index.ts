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

// Seed stock levels per product. 0 = sold out, below 6 = "only N left".
const STOCK: Record<string, number> = Object.fromEntries(products.map((p) => [p.slug, 40]))
STOCK['sanguinelle'] = 4
STOCK['caponata'] = 0
STOCK['gelsi-neri'] = 5

app.get('/api/health', (c) => c.json({ ok: true }))

app.get('/api/stock', (c) => c.json({ stock: STOCK }))

app.post('/api/promo', async (c) => {
  const code = str(await read(c.req.raw), 'code', 40).toUpperCase()
  if (!code) return c.json({ error: 'Enter a code.' }, 400)
  const promo = PROMOS[code]
  if (!promo) return c.json({ error: 'That code is not valid.' }, 400)
  return c.json({ code, ...promo })
})

app.post('/api/order', async (c) => {
  const b = await read(c.req.raw)
  const contact = (b.contact && typeof b.contact === 'object' ? b.contact : {}) as Body
  const fields: Record<string, string> = {}
  if (str(contact, 'name').length < 2) fields.name = 'Tell us your name.'
  if (!EMAIL.test(str(contact, 'email'))) fields.email = 'Enter a valid email address.'
  const shipping = str(b, 'shipping')
  const pickup = shipping === 'pickup'
  if (!pickup && str(contact, 'address').length < 4) fields.address = 'Enter a street address.'
  if (!pickup && str(contact, 'city').length < 2) fields.city = 'Enter a town or city.'
  if (!pickup && !/^[A-Za-z0-9 -]{3,10}$/.test(str(contact, 'postcode'))) fields.postcode = 'Enter a valid postcode.'
  if (!bag.countries.includes(str(contact, 'country'))) fields.country = 'Choose a country we ship to.'
  if (!bag.shippingOptions.some((o) => o.id === shipping)) fields.shipping = 'Choose a delivery option.'

  const raw = Array.isArray(b.items) ? b.items : []
  const lines: Line[] = raw
    .filter((l): l is Line => !!l && typeof l === 'object' && typeof l.slug === 'string' && typeof l.size === 'string' && typeof l.qty === 'number')
    .slice(0, 40)
  const items = resolve(lines)
  if (!items.length) return c.json({ error: 'Your bag is empty.' }, 400)
  const soldOut = items.find((i) => (STOCK[i.slug] ?? 0) < i.qty)
  if (soldOut) return c.json({ error: `Sorry, ${soldOut.product.name} is ${STOCK[soldOut.slug] ? `down to ${STOCK[soldOut.slug]}` : 'sold out'}.` }, 409)
  if (Object.keys(fields).length) return c.json({ error: 'Check the highlighted fields.', fields }, 400)

  const promo = str(b, 'promo', 40).toUpperCase() || null
  const t = totals(lines, shipping, promo && PROMOS[promo] ? promo : null)
  const reference = `CF-${Math.random().toString(36).slice(2, 7).toUpperCase()}`
  return c.json({ reference, total: t.total })
})

app.post('/api/subscribe', async (c) => {
  const email = str(await read(c.req.raw), 'email')
  if (!EMAIL.test(email)) return c.json({ error: 'Enter a valid email address.' }, 400)
  return c.json({ ok: true })
})

app.all('/api/*', (c) => c.json({ error: 'Not found' }, 404))

app.all('*', (c) => c.env.ASSETS.fetch(c.req.raw))

export default app
