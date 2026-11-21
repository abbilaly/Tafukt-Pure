import { ArrowUpRight, ShoppingBag, Trash2, X } from 'lucide-react'
import { AnimatePresence, motion } from 'motion/react'
import { useState, type FormEvent } from 'react'
import { Link, NavLink, useLocation } from 'react-router'

import { currencies, img } from '../content'
import { LANGS, currencyLabelsAr } from '../content.i18n'
import { post } from '../lib/api'
import { cx } from '../lib/cx'
import { useFocusTrap } from '../lib/focus'
import { useContent } from '../lib/lang'
import { useStore } from '../lib/store'
import { Logo } from './Brand'
import { Button, IconButton, QtyStepper } from './ui'

export function CurrencySwitch({ dark }: { dark?: boolean }) {
  const { currency, setCurrency } = useStore()
  const { ui, lang } = useContent()
  return (
    <div role="group" aria-label={ui.currency} className="flex items-center gap-1">
      {currencies.map((c) => {
        const active = c.id === currency
        return (
          <button
            key={c.id}
            type="button"
            aria-pressed={active}
            aria-label={lang === 'ar' ? currencyLabelsAr[c.id] : c.label}
            onClick={() => setCurrency(c.id)}
            className={cx(
              'grid size-10 place-items-center rounded-full text-[12px] font-bold transition-colors duration-200 md:size-8',
              active ? 'bg-flame-ink text-white' : dark ? 'border-[1.5px] border-on-dark/60 text-on-dark hover:border-on-dark' : 'border-[1.5px] border-wine/70 text-wine hover:border-wine',
            )}
          >
            {c.symbol}
          </button>
        )
      })}
    </div>
  )
}

/** English / Arabic. Flipping this also flips the document to rtl. */
export function LangSwitch({ dark }: { dark?: boolean }) {
  const { lang, setLang, ui } = useContent()
  return (
    <div role="group" aria-label={ui.language} className="flex items-center gap-1">
      {LANGS.map((l) => {
        const active = l.id === lang
        return (
          <button
            key={l.id}
            type="button"
            aria-pressed={active}
            aria-label={l.label}
            lang={l.id}
            onClick={() => setLang(l.id)}
            className={cx(
              'grid h-10 min-w-10 place-items-center rounded-full px-2 text-[12px] font-bold transition-colors duration-200 md:h-8 md:min-w-8',
              active ? 'bg-wine text-on-dark' : dark ? 'border-[1.5px] border-on-dark/60 text-on-dark hover:border-on-dark' : 'border-[1.5px] border-wine/70 text-wine hover:border-wine',
            )}
          >
            {l.short}
          </button>
        )
      })}
    </div>
  )
}

function BagButton() {
  const { summary, setBagOpen } = useStore()
  const { ui } = useContent()
  return (
    <IconButton label={ui.openBag(summary.count)} onClick={() => setBagOpen(true)}>
      {summary.count > 0 ? (
        <span className="text-[12px] font-bold tabular-nums">{summary.count}</span>
      ) : (
        <span aria-hidden className="size-1.5 rounded-full bg-white" />
      )}
    </IconButton>
  )
}

export function Header({ overlay }: { overlay?: boolean }) {
  const { setMenuOpen, menuOpen } = useStore()
  const { ui } = useContent()
  return (
    <header className={cx('z-30 w-full', overlay ? 'absolute inset-x-0 top-0' : 'relative bg-cream')}>
      <div className="mx-auto grid grid-cols-[1fr_auto_1fr] items-start px-4 pt-5 md:px-[34px] md:pt-[30px]">
        <div className="flex flex-wrap items-center gap-2">
          <span className="hidden sm:flex">
            <CurrencySwitch />
          </span>
          <LangSwitch />
        </div>
        <Link to="/" className="rounded-field">
          <Logo />
        </Link>
        <div className="flex items-center justify-end gap-2">
          <Button variant="outline" size="sm" className="!tracking-[0.06em]" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>
            {ui.menu}
          </Button>
          <BagButton />
        </div>
      </div>
    </header>
  )
}

export function MenuOverlay() {
  const { menuOpen, setMenuOpen } = useStore()
  const { ui, nav, brand } = useContent()
  const ref = useFocusTrap<HTMLDivElement>(menuOpen, () => setMenuOpen(false))
  return (
    <AnimatePresence>
      {menuOpen && (
        <motion.div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-label={ui.menuLabel}
          initial={{ clipPath: 'inset(0 0 100% 0)' }}
          animate={{ clipPath: 'inset(0 0 0% 0)' }}
          exit={{ clipPath: 'inset(0 0 100% 0)' }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="on-dark fixed inset-0 z-50 overflow-y-auto bg-maroon-deep text-on-dark"
        >
          <div className="mx-auto flex min-h-full max-w-[1440px] flex-col px-4 py-5 md:px-[34px] md:py-[30px]">
            <div className="flex items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2">
                <CurrencySwitch dark />
                <LangSwitch dark />
              </div>
              <IconButton label={ui.closeMenu} tone="dark" size="md" data-autofocus onClick={() => setMenuOpen(false)}>
                <X className="size-5" aria-hidden />
              </IconButton>
            </div>
            <nav aria-label={ui.mainNav} className="mt-10 flex-1 md:mt-16">
              <ul className="flex flex-col">
                {[{ to: '/', label: ui.home, note: ui.homeNote }, ...nav].map((n, i) => (
                  <motion.li key={n.to} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.06 }} className="border-b border-on-dark/15">
                    <NavLink
                      to={n.to}
                      end
                      onClick={() => setMenuOpen(false)}
                      className={({ isActive }) => cx('group flex items-baseline justify-between gap-6 py-4 md:py-5', isActive && '[&_.label]:text-flame [&_.label]:italic')}
                    >
                      <span className="label font-serif text-[40px] leading-none transition-colors group-hover:text-flame md:text-[72px]">{n.label}</span>
                      <span className="hidden text-[14px] text-on-dark-muted md:block">{n.note}</span>
                    </NavLink>
                  </motion.li>
                ))}
              </ul>
            </nav>
            <div className="mt-10 flex flex-col gap-2 text-[14px] text-on-dark-muted md:flex-row md:justify-between">
              <span>{brand.place}</span>
              <a className="underline-offset-4 hover:text-on-dark hover:underline" href={`mailto:${brand.email}`}>
                {brand.email}
              </a>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function BagDrawer() {
  const { bagOpen, setBagOpen, summary, setQty, remove, format } = useStore()
  const { ui, bag: bagCopy, dir, product: productOf } = useContent()
  const ref = useFocusTrap<HTMLDivElement>(bagOpen, () => setBagOpen(false))
  const left = bagCopy.freeOver - (summary.subtotal - summary.discount)
  const slide = dir === 'rtl' ? '-100%' : '100%'
  return (
    <AnimatePresence>
      {bagOpen && (
        <motion.div className="fixed inset-0 z-50" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
          <button type="button" aria-label={ui.closeBag} tabIndex={-1} className="absolute inset-0 bg-maroon-deep/55 backdrop-blur-[2px]" onClick={() => setBagOpen(false)} />
          <motion.div
            ref={ref}
            role="dialog"
            aria-modal="true"
            aria-labelledby="bag-title"
            initial={{ x: slide }}
            animate={{ x: 0 }}
            exit={{ x: slide }}
            transition={{ type: 'spring', damping: 32, stiffness: 300 }}
            className="absolute inset-y-0 end-0 flex w-full max-w-[440px] flex-col bg-cream shadow-drawer"
          >
            <div className="flex items-center justify-between border-b border-line px-6 py-5">
              <h2 id="bag-title" className="font-serif text-[30px] text-wine">
                {bagCopy.title}
              </h2>
              <IconButton label={ui.closeBag} tone="outline" size="md" data-autofocus onClick={() => setBagOpen(false)}>
                <X className="size-5" aria-hidden />
              </IconButton>
            </div>
            {summary.items.length === 0 ? (
              <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
                <ShoppingBag className="size-10 text-flame-ink" aria-hidden />
                <p className="font-serif text-[26px] text-wine">{bagCopy.empty.title}</p>
                <p className="text-muted">{bagCopy.empty.body}</p>
                <Button to="/shop" onClick={() => setBagOpen(false)}>
                  {bagCopy.empty.cta}
                </Button>
              </div>
            ) : (
              <>
                <div className="border-b border-line px-6 py-4">
                  <p className="text-[13px] font-semibold text-wine">{left > 0 ? bagCopy.freeNote(format(left)) : bagCopy.freeDone}</p>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-cream-2">
                    <div className="h-full rounded-full bg-flame-ink transition-[width] duration-500" style={{ width: `${Math.min(100, ((summary.subtotal - summary.discount) / bagCopy.freeOver) * 100)}%` }} />
                  </div>
                </div>
                <ul className="flex-1 divide-y divide-line overflow-y-auto px-6">
                  {summary.items.map((i) => {
                    const p = productOf(i.slug) ?? i.product
                    const sizeLabel = p.sizes.find((s) => s.id === i.size)?.label ?? i.sizeInfo.label
                    return (
                      <li key={i.slug + i.size} className="flex gap-4 py-5">
                        <Link to={`/shop/${i.slug}`} onClick={() => setBagOpen(false)} className="grid size-20 shrink-0 place-items-center rounded-field" style={{ background: i.product.tint }}>
                          <img src={img(i.product.image)} alt="" className="h-16 w-auto object-contain" />
                        </Link>
                        <div className="flex min-w-0 flex-1 flex-col gap-2">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <p className="font-serif text-[19px] leading-tight text-wine">{p.name}</p>
                              <p className="text-[13px] text-muted">
                                {p.kind}, {sizeLabel}
                              </p>
                            </div>
                            <p className="font-semibold tabular-nums text-wine">{format(i.lineTotal)}</p>
                          </div>
                          <div className="flex items-center justify-between">
                            <QtyStepper size="sm" label={ui.quantityOf(p.name)} value={i.qty} onChange={(n) => setQty(i.slug, i.size, n)} />
                            <IconButton label={ui.removeItem(p.name)} tone="cream" onClick={() => remove(i.slug, i.size)}>
                              <Trash2 className="size-4" aria-hidden />
                            </IconButton>
                          </div>
                        </div>
                      </li>
                    )
                  })}
                </ul>
                <div className="border-t border-line px-6 py-5">
                  <div className="flex items-baseline justify-between">
                    <span className="text-muted">{bagCopy.subtotal}</span>
                    <span className="font-serif text-[26px] tabular-nums text-wine">{format(summary.subtotal)}</span>
                  </div>
                  <Button to="/bag" size="lg" className="mt-4 w-full" onClick={() => setBagOpen(false)}>
                    {ui.reviewCheckout}
                  </Button>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export function Toaster() {
  const { toasts, dismiss } = useStore()
  const { ui } = useContent()
  return (
    <div aria-live="polite" className="pointer-events-none fixed inset-x-0 bottom-4 z-[60] flex flex-col items-center gap-2 px-4">
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            layout
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            className={cx('pointer-events-auto flex items-center gap-3 rounded-control py-2 ps-5 pe-2 text-[14px] font-semibold shadow-card', t.tone === 'error' ? 'bg-danger text-white' : 'bg-wine text-on-dark')}
          >
            <span>{t.message}</span>
            <button type="button" aria-label={ui.dismiss} onClick={() => dismiss(t.id)} className="grid size-10 place-items-center rounded-full hover:bg-white/10">
              <X className="size-4" aria-hidden />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}

export function Newsletter() {
  const { lang, footer } = useContent()
  const [email, setEmail] = useState('')
  const [state, setState] = useState<{ s: 'idle' | 'loading' | 'done' } | { s: 'error'; msg: string }>({ s: 'idle' })
  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setState({ s: 'loading' })
    const r = await post('/api/subscribe', { email }, lang)
    setState(r.ok ? { s: 'done' } : { s: 'error', msg: r.error })
  }
  if (state.s === 'done')
    return (
      <p role="status" className="max-w-md font-serif text-[22px] italic text-on-dark">
        {footer.newsletterDone}
      </p>
    )
  return (
    <form onSubmit={submit} noValidate className="w-full max-w-md">
      <label htmlFor="nl-email" className="sr-only">
        {footer.newsletterPlaceholder}
      </label>
      <div className={cx('flex h-14 items-center rounded-control border-[1.5px] bg-maroon-deep/40 p-1.5 ps-5', state.s === 'error' ? 'border-flame' : 'border-on-dark/40 focus-within:border-on-dark', 'has-[input:focus-visible]:outline-2 has-[input:focus-visible]:outline-offset-3 has-[input:focus-visible]:outline-on-dark')}>
        <input
          id="nl-email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder={footer.newsletterPlaceholder}
          aria-invalid={state.s === 'error' || undefined}
          aria-describedby={state.s === 'error' ? 'nl-err' : undefined}
          className="h-full min-w-0 flex-1 bg-transparent text-[15px] text-on-dark focus-visible:outline-none placeholder:text-on-dark-muted"
        />
        <Button type="submit" variant="cream" loading={state.s === 'loading'}>
          {footer.newsletterCta}
        </Button>
      </div>
      {state.s === 'error' && (
        <p id="nl-err" role="alert" className="mt-2 ps-5 text-[13px] font-semibold text-[#ffb79c]">
          {state.msg}
        </p>
      )}
    </form>
  )
}

export function Footer() {
  const { pathname } = useLocation()
  const { footer, brand } = useContent()
  return (
    <footer className="on-dark bg-maroon-deep text-on-dark">
      <div className="mx-auto max-w-[1440px] px-4 pb-10 pt-20 md:px-[34px]">
        <div className="grid gap-12 md:grid-cols-[1.2fr_1fr]">
          <div>
            <h2 className="font-serif text-[40px] leading-tight md:text-[56px]">{footer.newsletterTitle}</h2>
            <p className="mt-3 max-w-md text-on-dark-muted">{footer.newsletterBody}</p>
            <div className="mt-8">
              <Newsletter key={pathname} />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footer.columns.map((col) => (
              <div key={col.title}>
                <h3 className="text-[12px] font-bold uppercase tracking-[0.2em] text-on-dark-muted">{col.title}</h3>
                <ul className="mt-4 flex flex-col gap-1">
                  {col.links.map((l) => (
                    <li key={l.label}>
                      <Link to={l.to} className="inline-flex min-h-10 min-w-10 items-center gap-1 text-[15px] hover:text-flame">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-20 flex flex-col items-center gap-6 border-t border-on-dark/15 pt-10 md:flex-row md:justify-between">
          <Link to="/" className="rounded-field">
            <Logo dark compact />
          </Link>
          <p className="text-center text-[13px] text-on-dark-muted md:text-end">
            {footer.legal}
            <br />
            <a href={`mailto:${brand.email}`} className="inline-flex min-h-10 items-center gap-1 hover:text-on-dark">
              {brand.email} <ArrowUpRight className="size-3.5 rtl:-scale-x-100" aria-hidden />
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
