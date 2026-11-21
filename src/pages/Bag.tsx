import { Lock, Tag, Trash2, X } from 'lucide-react'
import { useRef, useState, type FormEvent } from 'react'
import { flushSync } from 'react-dom'
import { Link, useNavigate, useParams } from 'react-router'

import { JarTile } from '../components/Cards'
import { Button, Container, Crumb, EmptyState, IconButton, Input, Notice, OptionCard, QtyStepper, Select, Textarea } from '../components/ui'
import { countryNamesAr, promoLabelsAr } from '../content.i18n'
import { post } from '../lib/api'
import { useContent } from '../lib/lang'
import { PROMOS } from '../lib/pricing'
import { useStore } from '../lib/store'
import { useTitle } from '../lib/title'

type Contact = { name: string; email: string; address: string; city: string; postcode: string; country: string; note: string }
const blank: Contact = { name: '', email: '', address: '', city: '', postcode: '', country: 'Italy', note: '' }

export function Bag() {
  const store = useStore()
  const { bag: copy, ui, lang, product: productOf } = useContent()
  useTitle(copy.title)
  const { summary, setQty, remove, format, shipping, setShipping, promo, setPromo, lines } = store
  const navigate = useNavigate()
  const [contact, setContact] = useState<Contact>(blank)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [formError, setFormError] = useState('')
  const [sending, setSending] = useState(false)
  const [code, setCode] = useState('')
  const [promoState, setPromoState] = useState<{ s: 'idle' | 'loading' } | { s: 'error'; msg: string }>({ s: 'idle' })
  const errorRef = useRef<HTMLDivElement>(null)

  const field = (k: keyof Contact) => ({
    value: contact[k],
    error: errors[k],
    onChange: (e: { target: { value: string } }) => {
      setContact((c) => ({ ...c, [k]: e.target.value }))
      if (errors[k]) setErrors(({ [k]: _drop, ...rest }) => rest)
    },
  })

  const applyPromo = async () => {
    setPromoState({ s: 'loading' })
    const r = await post<{ code: string }>('/api/promo', { code }, lang)
    if (r.ok) {
      setPromo(r.data.code)
      setCode('')
      setPromoState({ s: 'idle' })
    } else setPromoState({ s: 'error', msg: r.error })
  }

  const placeOrder = async (e: FormEvent) => {
    e.preventDefault()
    setSending(true)
    setFormError('')
    const r = await post<{ reference: string; total: number }>('/api/order', { items: lines, shipping, promo, contact }, lang)
    setSending(false)
    if (!r.ok) {
      flushSync(() => {
        setErrors(r.fields ?? {})
        setFormError(r.error)
      })
      const first = document.querySelector<HTMLElement>('main [aria-invalid="true"]')
      ;(first ?? errorRef.current)?.focus()
      return
    }
    store.addOrder({
      reference: r.data.reference,
      createdAt: new Date().toISOString(),
      name: contact.name,
      email: contact.email,
      address: shipping === 'pickup' ? copy.shippingOptions.find((o) => o.id === 'pickup')?.label ?? '' : `${contact.address}, ${contact.postcode} ${contact.city}, ${countryLabel(contact.country, lang)}`,
      shipping: copy.shippingOptions.find((o) => o.id === shipping)?.label ?? '',
      total: summary.total,
      currency: store.currency,
      items: summary.items.map((i) => {
        const p = productOf(i.slug) ?? i.product
        return { name: p.name, size: p.sizes.find((s) => s.id === i.size)?.label ?? i.sizeInfo.label, qty: i.qty }
      }),
    })
    store.clear()
    setPromo(null)
    navigate(`/order/${r.data.reference}`)
  }

  if (summary.items.length === 0) {
    return (
      <Container className="pb-28 pt-12 md:pt-16">
        <h1 className="font-serif text-[52px] text-wine md:text-[68px]">{copy.title}</h1>
        <div className="mt-10">
          <EmptyState title={copy.empty.title} body={copy.empty.body} action={<Button to="/shop">{copy.empty.cta}</Button>} />
        </div>
        <OrderHistory />
      </Container>
    )
  }

  const pickup = shipping === 'pickup'
  const left = copy.freeOver - (summary.subtotal - summary.discount)
  const promoLabel = promo ? (lang === 'ar' ? promoLabelsAr[promo] ?? PROMOS[promo]?.label : PROMOS[promo]?.label) : undefined

  return (
    <Container className="pb-28 pt-8">
      <Crumb to="/shop">{ui.keepShopping}</Crumb>
      <h1 className="mt-4 font-serif text-[52px] leading-none text-wine md:text-[68px]">{copy.title}</h1>
      <form onSubmit={placeOrder} noValidate className="mt-10 grid gap-12 lg:grid-cols-[1.3fr_1fr] lg:gap-16">
        <div className="flex flex-col gap-12">
          <section aria-labelledby="lines-h">
            <h2 id="lines-h" className="sr-only">
              {ui.itemsHeading}
            </h2>
            <ul className="divide-y divide-line border-y border-line">
              {summary.items.map((i) => {
                const p = productOf(i.slug) ?? i.product
                const sizeLabel = p.sizes.find((s) => s.id === i.size)?.label ?? i.sizeInfo.label
                return (
                  <li key={i.slug + i.size} className="flex gap-4 py-5 sm:gap-6">
                    <Link to={`/shop/${i.slug}`} className="shrink-0 rounded-field">
                      <JarTile product={i.product} className="size-24 rounded-field sm:size-28" />
                    </Link>
                    <div className="flex flex-1 flex-col justify-between gap-3 sm:flex-row sm:items-center">
                      <div>
                        <p className="font-serif text-[24px] leading-tight text-wine">{p.name}</p>
                        <p className="text-[14px] text-muted">
                          {p.kind} · {sizeLabel} · {format(i.sizeInfo.price)}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <QtyStepper size="sm" label={ui.quantityOf(p.name)} value={i.qty} onChange={(n) => setQty(i.slug, i.size, n)} />
                        <p className="w-20 text-end font-semibold tabular-nums text-wine">{format(i.lineTotal)}</p>
                        <IconButton label={ui.removeItem(p.name)} tone="cream" onClick={() => remove(i.slug, i.size)}>
                          <Trash2 className="size-4" aria-hidden />
                        </IconButton>
                      </div>
                    </div>
                  </li>
                )
              })}
            </ul>
          </section>

          <fieldset>
            <legend className="font-serif text-[30px] text-wine">{copy.shipping}</legend>
            <div className="mt-4 flex flex-col gap-2">
              {copy.shippingOptions.map((o) => (
                <OptionCard
                  key={o.id}
                  name="shipping"
                  value={o.id}
                  checked={shipping === o.id}
                  onChange={setShipping}
                  title={o.label}
                  detail={o.id === 'standard' && summary.free ? copy.free : o.price === 0 ? copy.free : format(o.price)}
                />
              ))}
            </div>
            {errors.shipping && <p className="mt-2 text-[13px] font-medium text-danger">{errors.shipping}</p>}
          </fieldset>

          <fieldset className="flex flex-col gap-4">
            <legend className="font-serif text-[30px] text-wine">{copy.detailsTitle}</legend>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <Input label={copy.fields.name} autoComplete="name" {...field('name')} />
              <Input label={copy.fields.email} type="email" autoComplete="email" {...field('email')} />
            </div>
            {!pickup && (
              <>
                <Input label={copy.fields.address} autoComplete="street-address" {...field('address')} />
                <div className="grid gap-4 sm:grid-cols-3">
                  <Input label={copy.fields.city} autoComplete="address-level2" {...field('city')} />
                  <Input label={copy.fields.postcode} autoComplete="postal-code" {...field('postcode')} />
                  <Select label={copy.fields.country} autoComplete="country-name" {...field('country')}>
                    {copy.countries.map((c) => (
                      <option key={c} value={c}>
                        {countryLabel(c, lang)}
                      </option>
                    ))}
                  </Select>
                </div>
              </>
            )}
            {pickup && (
              <Select label={copy.fields.country} {...field('country')}>
                {copy.countries.map((c) => (
                  <option key={c} value={c}>
                    {countryLabel(c, lang)}
                  </option>
                ))}
              </Select>
            )}
            <Textarea label={copy.fields.note} maxLength={200} {...field('note')} />
          </fieldset>
        </div>

        <aside aria-labelledby="sum-h" className="lg:sticky lg:top-6 lg:self-start">
          <div className="rounded-panel bg-wine p-6 text-on-dark on-dark md:p-8">
            <h2 id="sum-h" className="font-serif text-[30px]">
              {copy.summary}
            </h2>
            <p className="mt-4 text-[14px] text-on-dark-muted">{pickup ? ui.collectNote : left > 0 ? copy.freeNote(format(left)) : copy.freeDone}</p>
            <dl className="mt-6 flex flex-col gap-3 border-t border-on-dark/20 pt-6 text-[15px]">
              <div className="flex justify-between">
                <dt className="text-on-dark-muted">
                  {copy.subtotal} ({summary.count})
                </dt>
                <dd className="tabular-nums">{format(summary.subtotal)}</dd>
              </div>
              {summary.discount > 0 && (
                <div className="flex justify-between">
                  <dt className="text-on-dark-muted">
                    {copy.discount} ({promo})
                  </dt>
                  <dd className="tabular-nums">−{format(summary.discount)}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-on-dark-muted">{copy.shipping}</dt>
                <dd className="tabular-nums">{summary.shipping === 0 ? copy.free : format(summary.shipping)}</dd>
              </div>
              <div className="mt-2 flex items-baseline justify-between border-t border-on-dark/20 pt-4">
                <dt className="font-serif text-[22px]">{copy.total}</dt>
                <dd className="font-serif text-[34px] tabular-nums">{format(summary.total)}</dd>
              </div>
            </dl>

            <div className="mt-6">
              {promo ? (
                <div className="flex items-center justify-between rounded-control bg-maroon-deep/40 py-1 ps-4 pe-1">
                  <span className="flex items-center gap-2 text-[14px] font-semibold">
                    <Tag className="size-4 text-flame" aria-hidden /> {promo}: {promoLabel}
                  </span>
                  <IconButton label={ui.removePromo} tone="dark" onClick={() => setPromo(null)}>
                    <X className="size-4" aria-hidden />
                  </IconButton>
                </div>
              ) : (
                <PromoForm code={code} setCode={setCode} state={promoState} onApply={applyPromo} />
              )}
            </div>

            <div ref={errorRef} tabIndex={-1} className="mt-6 outline-none">
              {formError && <Notice tone="error">{formError}</Notice>}
            </div>
            <Button type="submit" size="lg" variant="cream" loading={sending} className="mt-4 w-full">
              <Lock className="size-4" aria-hidden /> {copy.place} · {format(summary.total)}
            </Button>
            <p className="mt-3 text-center text-[13px] text-on-dark-muted">{copy.demo}</p>
          </div>
        </aside>
      </form>
    </Container>
  )
}

function countryLabel(name: string, lang: string) {
  return lang === 'ar' ? countryNamesAr[name] ?? name : name
}

// The promo field lives inside the checkout form, so it submits on its own
// button rather than nesting a form.
function PromoForm({ code, setCode, state, onApply }: { code: string; setCode: (v: string) => void; state: { s: string; msg?: string }; onApply: () => void }) {
  const { bag: copy } = useContent()
  return (
    <div>
      <label htmlFor="promo" className="text-[13px] font-semibold">
        {copy.promoLabel}
      </label>
      <div className="mt-1.5 flex gap-2">
        <input
          id="promo"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              e.preventDefault()
              onApply()
            }
          }}
          placeholder={copy.promoHint}
          aria-invalid={state.s === 'error' || undefined}
          aria-describedby={state.s === 'error' ? 'promo-err' : undefined}
          className="h-11 min-w-0 flex-1 rounded-control border-[1.5px] border-on-dark/40 bg-transparent px-4 text-[15px] uppercase text-on-dark placeholder:normal-case placeholder:text-on-dark-muted focus-visible:border-on-dark"
        />
        <Button variant="ghost" loading={state.s === 'loading'} onClick={() => onApply()}>
          {copy.promoApply}
        </Button>
      </div>
      {state.s === 'error' && (
        <p id="promo-err" role="alert" className="mt-2 text-[13px] font-semibold text-[#ffc2ab]">
          {state.msg}
        </p>
      )}
    </div>
  )
}

function OrderHistory() {
  const { orders, format } = useStore()
  const { order: orderCopy, ui, lang } = useContent()
  if (!orders.length) return null
  return (
    <section className="mt-16">
      <h2 className="font-serif text-[30px] text-wine">{orderCopy.history}</h2>
      <ul className="mt-4 divide-y divide-line border-y border-line">
        {orders.map((o) => (
          <li key={o.reference}>
            <Link to={`/order/${o.reference}`} className="flex min-h-14 flex-wrap items-center justify-between gap-2 py-3 hover:text-flame-text">
              <span className="font-semibold text-wine">{o.reference}</span>
              <span className="text-[14px] text-muted">
                {new Date(o.createdAt).toLocaleDateString(lang === 'ar' ? 'ar-EG-u-nu-latn' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric' })} · {ui.productsCount(o.items.reduce((n, i) => n + i.qty, 0))} · {format(o.total)}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}

export function OrderConfirmed() {
  const { reference } = useParams()
  const { orders } = useStore()
  const { order: orderCopy, ui } = useContent()
  const o = orders.find((x) => x.reference === reference)
  useTitle(o ? `${ui.orderWord} ${o.reference}` : ui.orderNotFound)
  return (
    <Container className="flex min-h-[70vh] flex-col items-center justify-center py-24 text-center">
      {o ? (
        <>
          <p className="font-serif text-[96px] italic leading-none text-flame-text md:text-[140px]">{orderCopy.title}</p>
          <p className="mt-6 max-w-lg text-[17px] text-muted">{orderCopy.body}</p>
          <div className="mt-10 w-full max-w-md rounded-card bg-paper p-6 text-start shadow-card">
            <p className="text-[12px] font-bold uppercase tracking-[0.2em] text-flame-text">{orderCopy.reference}</p>
            <p className="mt-1 font-serif text-[30px] text-wine">{o.reference}</p>
            <ul className="mt-4 divide-y divide-line border-y border-line text-[15px]">
              {o.items.map((i) => (
                <li key={i.name + i.size} className="flex justify-between gap-3 py-2">
                  <span>
                    {i.qty} × {i.name}
                  </span>
                  <span className="text-muted">{i.size}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-[14px] text-muted">
              {o.shipping} · {o.address}
            </p>
            <p className="mt-1 text-[14px] text-muted">{ui.confirmationTo(o.email)}</p>
          </div>
        </>
      ) : (
        <h1 className="font-serif text-[40px] text-wine">{orderCopy.missing}</h1>
      )}
      {o && <h1 className="sr-only">{ui.confirmed(o.reference)}</h1>}
      <div className="mt-10">
        <Button to="/shop">{orderCopy.again}</Button>
      </div>
    </Container>
  )
}
