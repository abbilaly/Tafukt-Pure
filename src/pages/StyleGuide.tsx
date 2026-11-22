import { RotateCcw, ShoppingBag, X } from 'lucide-react'
import { useState, type ReactNode } from 'react'

import { CurvedText, Emblem, Hill, Logo } from '../components/Brand'
import { Jar, JarTile, ProductCard, RecipeCard } from '../components/Cards'
import { Badge, Button, Chip, Container, EmptyState, Eyebrow, IconButton, Input, Notice, OptionCard, QtyStepper, SectionHeading, Select, Skeleton, Textarea, type ButtonVariant } from '../components/ui'
import { products, recipes } from '../content'
import { colors, motionTokens, radii, shadows, spacing, typeScale } from '../lib/tokens'
import { useTitle } from '../lib/title'
import { ShopSkeleton } from './Shop'

function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-h`} className="scroll-mt-6 border-t border-line py-14">
      <h2 id={`${id}-h`} className="font-serif text-[36px] text-wine">
        {title}
      </h2>
      <div className="mt-8">{children}</div>
    </section>
  )
}
const states = ['default', 'hover', 'focus', 'pressed', 'disabled', 'loading'] as const
const variants: ButtonVariant[] = ['solid', 'wine', 'outline', 'light', 'cream', 'ghost']

export function StyleGuide() {
  useTitle('Style guide')
  const [replay, setReplay] = useState(0)
  const [qty, setQty] = useState(2)
  const [opt, setOpt] = useState('a')
  return (
    <Container className="pb-24 pt-12">
      <SectionHeading as="h1" eyebrow="Design system" title="TAFUKT PURE style guide">
        <p>Tokens and components, rendered by the same code the shop uses. Hover, focus and pressed states are pinned with data-force.</p>
      </SectionHeading>
      <nav aria-label="Style guide sections" className="mt-8 flex flex-wrap gap-2">
        {['colour', 'type', 'spacing', 'radii', 'shadows', 'motion', 'brand', 'buttons', 'controls', 'fields', 'feedback', 'cards'].map((s) => (
          <a key={s} href={`#${s}`} className="inline-flex h-10 items-center rounded-control border-[1.5px] border-line-strong px-4 text-[13px] font-semibold capitalize text-wine hover:border-wine">
            {s}
          </a>
        ))}
      </nav>

      <Block id="colour" title="Colour">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {colors.map((c) => (
            <li key={c.name} className="overflow-hidden rounded-card border border-line bg-paper">
              <span className="block h-20" style={{ background: c.hex }} />
              <span className="block p-3">
                <span className="block font-semibold text-wine">{c.name}</span>
                <span className="block font-mono text-[13px] text-muted">{c.hex}</span>
                <span className="mt-1 block text-[13px] text-muted">{c.use}</span>
              </span>
            </li>
          ))}
        </ul>
      </Block>

      <Block id="type" title="Type scale">
        <p className="mb-6 text-muted">Playfair Display for display and names, DM Sans for interface and body.</p>
        <ul className="flex flex-col divide-y divide-line">
          {typeScale.map((t) => (
            <li key={t.name} className="grid gap-2 py-4 md:grid-cols-[180px_1fr] md:items-baseline">
              <span className="text-[13px] text-muted">
                <b className="text-wine">{t.name}</b> · {t.size}
              </span>
              <span className={`${t.cls} break-words`}>{t.sample}</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block id="spacing" title="Spacing">
        <ul className="flex flex-wrap items-end gap-4">
          {spacing.map((s) => (
            <li key={s} className="flex flex-col items-center gap-2">
              <span className="block bg-flame-ink" style={{ width: s, height: s }} />
              <span className="text-[13px] text-muted">{s}</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block id="radii" title="Radii">
        <ul className="flex flex-wrap gap-6">
          {radii.map((r) => (
            <li key={r.name} className="flex flex-col items-center gap-2">
              <span className="block size-24 border-[1.5px] border-wine bg-cream-2" style={{ borderRadius: r.value }} />
              <span className="text-[13px] text-muted">
                <b className="text-wine">{r.name}</b> {r.value}
              </span>
            </li>
          ))}
        </ul>
      </Block>

      <Block id="shadows" title="Shadows">
        <ul className="flex flex-wrap gap-8">
          {shadows.map((s) => (
            <li key={s.name} className="flex flex-col items-center gap-3">
              <span className={`block size-28 rounded-card bg-paper ${s.cls}`} />
              <span className="text-[13px] font-semibold text-wine">{s.name}</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block id="motion" title="Motion">
        <Button variant="outline" onClick={() => setReplay((n) => n + 1)}>
          <RotateCcw className="size-4" aria-hidden /> Replay
        </Button>
        <p className="mt-3 text-[14px] text-muted">Every animation stops under prefers-reduced-motion.</p>
        <ul key={replay} className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {motionTokens.map((m) => (
            <li key={m.name} className="flex flex-col items-center gap-3 rounded-card bg-cream-2 p-6 text-center">
              <span className={`block size-12 rounded-full bg-flame-ink ${m.cls}`} />
              <span className="font-semibold text-wine">{m.name}</span>
              <span className="text-[13px] text-muted">{m.detail}</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block id="brand" title="Brand">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="grid place-items-center rounded-card bg-paper p-10">
            <Logo />
          </div>
          <div className="grid place-items-center rounded-card bg-maroon-deep p-10">
            <Logo dark />
          </div>
          <div className="grid place-items-center gap-4 rounded-card bg-cream-2 p-10">
            <Emblem className="h-16" />
            <Eyebrow>Eyebrow</Eyebrow>
          </div>
        </div>
        <div className="relative mt-6 h-72 overflow-hidden rounded-card bg-cream">
          <Hill className="absolute inset-x-0 bottom-0 w-full" height={200} />
          <div className="absolute left-1/2 top-[300px] -translate-x-1/2 -translate-y-1/2 scale-[0.4]">
            <CurvedText text="IN FORMA DI CONSERVA · IN FORMA DI " radius={430} size={100} rotate={-90} />
          </div>
          <Jar product={products[0]} className="absolute left-1/2 top-8 h-56 -translate-x-1/2 rotate-[8deg]" />
        </div>
        <p className="mt-3 text-[14px] text-muted">Hill, curved ring and a labelled jar: the hero's three layers.</p>
      </Block>

      <Block id="buttons" title="Buttons">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[760px] border-separate border-spacing-y-3 text-left">
            <thead>
              <tr>
                <th scope="col" className="text-[13px] font-semibold text-muted">
                  Variant
                </th>
                {states.map((s) => (
                  <th key={s} scope="col" className="text-[13px] font-semibold capitalize text-muted">
                    {s}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {variants.map((v) => {
                const dark = v === 'ghost' || v === 'cream'
                return (
                  <tr key={v} className={dark ? 'on-dark bg-wine' : ''}>
                    <th scope="row" className={`rounded-l-field px-3 text-[14px] font-semibold ${dark ? 'text-on-dark' : 'text-wine'}`}>
                      {v}
                    </th>
                    {states.map((s, i) => (
                      <td key={s} className={`py-3 ${i === states.length - 1 ? 'rounded-r-field' : ''}`}>
                        <Button variant={v} size="md" dot={v === 'light'} force={['hover', 'focus', 'pressed'].includes(s) ? s : undefined} disabled={s === 'disabled'} loading={s === 'loading'}>
                          {v === 'light' ? 'Discover' : 'Add to bag'}
                        </Button>
                      </td>
                    ))}
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-3">
          <Button size="sm" variant="outline">
            Menu
          </Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
        </div>
      </Block>

      <Block id="controls" title="Icon buttons, chips, steppers, options">
        <div className="flex flex-wrap items-center gap-3">
          {(['flame', 'outline', 'cream'] as const).map((t) =>
            ['default', 'hover', 'focus', 'pressed', 'disabled'].map((s) => (
              <IconButton key={t + s} label={`${t} ${s}`} tone={t} size="md" force={['hover', 'focus', 'pressed'].includes(s) ? s : undefined} disabled={s === 'disabled'}>
                {t === 'flame' ? <ShoppingBag className="size-4" aria-hidden /> : <X className="size-4" aria-hidden />}
              </IconButton>
            )),
          )}
          <span className="on-dark inline-flex gap-2 rounded-control bg-wine p-2">
            <IconButton label="dark" tone="dark" size="md">
              <X className="size-4" aria-hidden />
            </IconButton>
            <IconButton label="dark hover" tone="dark" size="md" force="hover">
              <X className="size-4" aria-hidden />
            </IconButton>
          </span>
        </div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Chip>Default</Chip>
          <Chip active>Active</Chip>
          <Chip force="hover">Hover</Chip>
          <Chip force="focus">Focus</Chip>
          <Chip force="pressed">Pressed</Chip>
          <Chip disabled>Disabled</Chip>
        </div>
        <div className="mt-6 flex flex-wrap items-center gap-4">
          <QtyStepper label="Quantity" value={qty} onChange={setQty} />
          <QtyStepper label="Quantity at minimum" value={1} onChange={() => {}} size="sm" />
          <QtyStepper label="Quantity at maximum" value={12} onChange={() => {}} size="sm" />
        </div>
        <fieldset className="mt-6 grid max-w-xl gap-2">
          <legend className="mb-2 text-[13px] font-semibold text-wine">Option cards</legend>
          <OptionCard name="sg" value="a" checked={opt === 'a'} onChange={setOpt} title="190 g jar" detail="€12.50" />
          <OptionCard name="sg" value="b" checked={opt === 'b'} onChange={setOpt} title="Three jars" detail="€33.00" />
          <OptionCard name="sg" value="c" checked={false} onChange={setOpt} title="Disabled option" detail="Sold out" disabled />
        </fieldset>
      </Block>

      <Block id="fields" title="Fields">
        <div className="grid max-w-3xl gap-4 sm:grid-cols-2">
          <Input label="Default" placeholder="Yasmine El Amrani" />
          <Input label="Hover" placeholder="Pinned hover" force="hover" />
          <Input label="Focus" placeholder="Pinned focus" force="focus" />
          <Input label="With hint" hint="We send tracking here." placeholder="you@example.com" />
          <Input label="Error" error="Enter a valid email address." defaultValue="yasmine@" />
          <Input label="Disabled" disabled defaultValue="Collect at the farm" />
          <Select label="Select" defaultValue="Morocco">
            <option>Morocco</option>
            <option>France</option>
          </Select>
          <Textarea label="Textarea" placeholder="A note for the gift card" />
        </div>
      </Block>

      <Block id="feedback" title="Badges, notices, loading and empty">
        <div className="flex flex-wrap gap-2">
          <Badge>Bestseller</Badge>
          <Badge tone="wine">Sold out</Badge>
          <Badge tone="olive">Argan</Badge>
          <Badge tone="cream">Only 4 left</Badge>
        </div>
        <div className="mt-6 grid max-w-2xl gap-3">
          <Notice>Prices shown in euro.</Notice>
          <Notice tone="success">You have free delivery.</Notice>
          <Notice tone="error">We could not check stock just now.</Notice>
        </div>
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          <div>
            <p className="mb-3 text-[13px] font-semibold text-muted">Loading</p>
            <ShopSkeleton />
          </div>
          <div>
            <p className="mb-3 text-[13px] font-semibold text-muted">Empty</p>
            <EmptyState title="Nothing on this shelf" body="Try another word or clear the filters." action={<Button variant="outline">Clear filters</Button>} />
          </div>
        </div>
        <div className="mt-6 flex items-center gap-3">
          <Skeleton className="h-4 w-44 !rounded-full" />
          <span className="text-[13px] text-muted">Inline stock check</span>
        </div>
      </Block>

      <Block id="cards" title="Cards and tiles">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <ProductCard product={products[0]} />
          <ProductCard product={products[1]} stock={{ status: 'ready', stock: { [products[1].slug]: 4 } }} />
          <ProductCard product={products[3]} stock={{ status: 'ready', stock: { [products[3].slug]: 0 } }} />
          <RecipeCard recipe={recipes[0]} />
        </div>
        <div className="mt-6 grid grid-cols-3 gap-4 sm:grid-cols-6">
          {products.slice(2, 7).map((p) => (
            <JarTile key={p.slug} product={p} className="aspect-square rounded-field" />
          ))}
        </div>
      </Block>
    </Container>
  )
}
