import { Loader2, Minus, Plus } from 'lucide-react'
import { forwardRef, useId, type ButtonHTMLAttributes, type InputHTMLAttributes, type ReactNode, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { Link } from 'react-router'

import { cx } from '../lib/cx'

// Design-system primitives. Every page builds from these; the style guide
// renders each variant and state. `data-force="hover|pressed|focus"` pins a
// state for the style guide.

export type ButtonVariant = 'solid' | 'wine' | 'outline' | 'light' | 'cream' | 'ghost'
export type ButtonSize = 'sm' | 'md' | 'lg'

const base =
  'relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-control font-sans font-semibold transition-[background-color,color,border-color,transform,box-shadow] duration-200 press:scale-[0.97] disabled:opacity-45'
const variants: Record<ButtonVariant, string> = {
  solid: 'bg-flame-ink text-white hov:bg-wine',
  wine: 'bg-wine text-on-dark hov:bg-maroon-deep',
  outline: 'border-[1.5px] border-wine text-wine hov:bg-wine hov:text-on-dark',
  light: 'bg-white text-flame-text shadow-pill hov:bg-flame-ink hov:text-white',
  cream: 'bg-cream text-wine hov:bg-white',
  ghost: 'border-[1.5px] border-on-dark/60 text-on-dark hov:border-on-dark hov:bg-on-dark hov:text-wine',
}
const sizes: Record<ButtonSize, string> = {
  sm: 'h-10 px-4 text-[11px] uppercase tracking-[0.14em] md:h-8 md:px-3.5',
  md: 'h-11 px-6 text-[14px]',
  lg: 'h-14 px-8 text-[15px]',
}

type Common = { variant?: ButtonVariant; size?: ButtonSize; loading?: boolean; dot?: boolean; children: ReactNode; className?: string; force?: string }
type AsButton = Common & Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & { to?: undefined }
type AsLink = Common & { to: string; onClick?: () => void; 'aria-label'?: string }

export function buttonClass(variant: ButtonVariant = 'solid', size: ButtonSize = 'md', className?: string) {
  return cx(base, variants[variant], sizes[size], className)
}

function Inner({ loading, dot, children }: { loading?: boolean; dot?: boolean; children: ReactNode }) {
  return (
    <>
      {dot && <span aria-hidden className="size-1.5 rounded-full bg-flame" />}
      {loading && <Loader2 aria-hidden className="size-4 animate-spin" />}
      {children}
    </>
  )
}

export function Button(props: AsButton | AsLink) {
  const { variant, size, loading, dot, children, className, force } = props
  const cls = buttonClass(variant, size, className)
  if (props.to !== undefined) {
    return (
      <Link to={props.to} onClick={props.onClick} aria-label={props['aria-label']} className={cls} data-force={force}>
        <Inner dot={dot}>{children}</Inner>
      </Link>
    )
  }
  const { variant: _v, size: _s, loading: _l, dot: _d, children: _c, className: _cn, force: _f, type, disabled, ...rest } = props
  return (
    <button {...rest} type={type ?? 'button'} disabled={disabled || loading} aria-busy={loading || undefined} className={cls} data-force={force}>
      <Inner loading={loading} dot={dot}>
        {children}
      </Inner>
    </button>
  )
}

/** Round icon button: the bag button, currency pills, close buttons. */
export const IconButton = forwardRef<
  HTMLButtonElement,
  ButtonHTMLAttributes<HTMLButtonElement> & { label: string; tone?: 'flame' | 'outline' | 'cream' | 'dark'; force?: string; size?: 'sm' | 'md' }
>(function IconButton({ label, tone = 'flame', force, size = 'sm', className, children, ...rest }, ref) {
  const tones = {
    flame: 'bg-flame-ink text-white hov:bg-wine',
    outline: 'border-[1.5px] border-wine text-wine hov:bg-wine hov:text-on-dark',
    cream: 'bg-cream text-wine hov:bg-white',
    dark: 'border-[1.5px] border-on-dark/50 text-on-dark hov:bg-on-dark hov:text-wine',
  }
  return (
    <button
      ref={ref}
      type="button"
      aria-label={label}
      data-force={force}
      className={cx(
        'relative inline-grid shrink-0 place-items-center rounded-full transition-[background-color,color,transform] duration-200 press:scale-95 disabled:opacity-45',
        size === 'sm' ? 'size-10 md:size-8' : 'size-12',
        tones[tone],
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
})

/** Filter chip / segmented choice. */
export function Chip({ active, children, className, force, ...rest }: ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean; force?: string }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      data-force={force}
      className={cx(
        'inline-flex h-10 items-center gap-2 rounded-control border-[1.5px] px-4 text-[13px] font-semibold transition-colors duration-200 press:scale-[0.97] disabled:opacity-45',
        active ? 'border-wine bg-wine text-on-dark' : 'border-line-strong text-wine hov:border-wine',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  )
}

export function Badge({ children, tone = 'flame', className }: { children: ReactNode; tone?: 'flame' | 'wine' | 'olive' | 'cream'; className?: string }) {
  const tones = {
    flame: 'bg-flame-soft text-flame-text',
    wine: 'bg-wine text-on-dark',
    olive: 'bg-[#dfe7cf] text-olive',
    cream: 'bg-paper/90 text-wine',
  }
  return <span className={cx('inline-flex h-6 items-center rounded-control px-2.5 text-[11px] font-bold uppercase tracking-[0.08em]', tones[tone], className)}>{children}</span>
}

export function Eyebrow({ children, className, dark }: { children: ReactNode; className?: string; dark?: boolean }) {
  return (
    <p className={cx('flex items-center gap-2 text-[12px] font-bold uppercase tracking-[0.2em]', dark ? 'text-on-dark-muted' : 'text-flame-text', className)}>
      <span aria-hidden className={cx('size-1.5 rounded-full', dark ? 'bg-flame' : 'bg-flame-ink')} />
      {children}
    </p>
  )
}

export function SectionHeading({ eyebrow, title, children, dark, align = 'left', as: Tag = 'h2' }: { eyebrow?: string; title: ReactNode; children?: ReactNode; dark?: boolean; align?: 'left' | 'center'; as?: 'h1' | 'h2' }) {
  return (
    <div className={cx('max-w-2xl', align === 'center' && 'mx-auto text-center [&>p:first-child]:justify-center')}>
      {eyebrow && <Eyebrow dark={dark}>{eyebrow}</Eyebrow>}
      <Tag className={cx('mt-4 text-balance font-serif leading-[1.05]', Tag === 'h1' ? 'text-[44px] md:text-[68px]' : 'text-[36px] md:text-[52px]', dark ? 'text-on-dark' : 'text-wine')}>{title}</Tag>
      {children && <div className={cx('mt-5 text-[17px] leading-relaxed', dark ? 'text-on-dark-muted' : 'text-muted')}>{children}</div>}
    </div>
  )
}

type FieldShell = { label: string; error?: string; hint?: string; className?: string }
function Shell({ id, label, error, hint, className, children }: FieldShell & { id: string; children: ReactNode }) {
  return (
    <div className={cx('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-[13px] font-semibold text-wine">
        {label}
      </label>
      {children}
      {error ? (
        <p id={`${id}-msg`} className="text-[13px] font-medium text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={`${id}-msg`} className="text-[13px] text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  )
}
const fieldCls = (error?: string) =>
  cx(
    'h-12 w-full rounded-field border-[1.5px] bg-paper px-4 text-[15px] text-ink placeholder:text-muted/80 transition-colors duration-200 focus-visible:border-wine focus-visible:outline-offset-2 disabled:opacity-50 hov:border-wine',
    error ? 'border-danger' : 'border-line-strong',
  )

export function Input({ label, error, hint, className, force, ...rest }: FieldShell & InputHTMLAttributes<HTMLInputElement> & { force?: string }) {
  const id = useId()
  return (
    <Shell id={id} label={label} error={error} hint={hint} className={className}>
      <input id={id} aria-invalid={!!error || undefined} aria-describedby={error || hint ? `${id}-msg` : undefined} data-force={force} className={fieldCls(error)} {...rest} />
    </Shell>
  )
}

export function Select({ label, error, hint, className, children, ...rest }: FieldShell & SelectHTMLAttributes<HTMLSelectElement>) {
  const id = useId()
  return (
    <Shell id={id} label={label} error={error} hint={hint} className={className}>
      <select id={id} aria-invalid={!!error || undefined} aria-describedby={error || hint ? `${id}-msg` : undefined} className={cx(fieldCls(error), 'appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2712%27 height=%278%27%3E%3Cpath d=%27M1 1l5 5 5-5%27 fill=%27none%27 stroke=%27%235c1724%27 stroke-width=%271.6%27/%3E%3C/svg%3E")] bg-[position:right_16px_center] bg-no-repeat pr-10')} {...rest}>
        {children}
      </select>
    </Shell>
  )
}

export function Textarea({ label, error, hint, className, ...rest }: FieldShell & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const id = useId()
  return (
    <Shell id={id} label={label} error={error} hint={hint} className={className}>
      <textarea id={id} aria-invalid={!!error || undefined} aria-describedby={error || hint ? `${id}-msg` : undefined} className={cx(fieldCls(error), 'h-24 resize-none py-3')} {...rest} />
    </Shell>
  )
}

export function QtyStepper({ value, onChange, min = 1, max = 12, label, size = 'md' }: { value: number; onChange: (n: number) => void; min?: number; max?: number; label: string; size?: 'sm' | 'md' }) {
  const h = size === 'sm' ? 'h-10' : 'h-12'
  return (
    <div role="group" aria-label={label} className={cx('inline-flex items-center rounded-control border-[1.5px] border-line-strong bg-paper', h)}>
      <button type="button" aria-label="Decrease quantity" disabled={value <= min} onClick={() => onChange(value - 1)} className={cx('grid aspect-square place-items-center rounded-full text-wine transition-colors hov:bg-cream-2 disabled:opacity-35', h)}>
        <Minus className="size-4" aria-hidden />
      </button>
      <output aria-live="polite" className="w-8 text-center text-[15px] font-semibold tabular-nums text-wine">
        {value}
      </output>
      <button type="button" aria-label="Increase quantity" disabled={value >= max} onClick={() => onChange(value + 1)} className={cx('grid aspect-square place-items-center rounded-full text-wine transition-colors hov:bg-cream-2 disabled:opacity-35', h)}>
        <Plus className="size-4" aria-hidden />
      </button>
    </div>
  )
}

/** Radio card, used for sizes and delivery options. */
export function OptionCard({ name, value, checked, onChange, title, detail, disabled }: { name: string; value: string; checked: boolean; onChange: (v: string) => void; title: string; detail?: ReactNode; disabled?: boolean }) {
  return (
    <label
      className={cx(
        'flex min-h-12 cursor-pointer items-center justify-between gap-4 rounded-field border-[1.5px] px-4 py-3 transition-colors duration-200 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-flame-ink',
        checked ? 'border-wine bg-paper' : 'border-line-strong hover:border-wine',
        disabled && 'cursor-not-allowed opacity-50',
      )}
    >
      <span className="flex items-center gap-3">
        <input type="radio" name={name} value={value} checked={checked} disabled={disabled} onChange={() => onChange(value)} className="peer sr-only" />
        <span aria-hidden className={cx('grid size-5 place-items-center rounded-full border-[1.5px]', checked ? 'border-wine' : 'border-line-strong')}>
          {checked && <span className="size-2.5 rounded-full bg-flame-ink" />}
        </span>
        <span className="text-[15px] font-semibold text-wine">{title}</span>
      </span>
      {detail && <span className="text-[14px] text-muted">{detail}</span>}
    </label>
  )
}

export function Skeleton({ className }: { className?: string }) {
  return <span aria-hidden className={cx('skeleton block rounded-field', className)} />
}

export function EmptyState({ title, body, action }: { title: string; body: string; action?: ReactNode }) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-card border-[1.5px] border-dashed border-line-strong px-6 py-16 text-center">
      <Sprig className="h-12 text-flame-ink" />
      <h3 className="font-serif text-[28px] text-wine">{title}</h3>
      <p className="max-w-sm text-[15px] text-muted">{body}</p>
      {action}
    </div>
  )
}

export function Notice({ tone = 'info', children }: { tone?: 'info' | 'error' | 'success'; children: ReactNode }) {
  const tones = { info: 'bg-cream-2 text-wine', error: 'bg-[#f8dcd8] text-danger', success: 'bg-[#dde8d3] text-success' }
  return (
    <p role={tone === 'error' ? 'alert' : 'status'} className={cx('rounded-field px-4 py-3 text-[14px] font-medium', tones[tone])}>
      {children}
    </p>
  )
}

/** A small leafy sprig, the brand's ornament. */
export function Sprig({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden className={className} fill="none">
      <path d="M24 44V14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M24 30c-8 0-12-5-12-11 7 0 12 4 12 11Z" fill="currentColor" />
      <path d="M24 24c8 0 12-5 12-11-7 0-12 4-12 11Z" fill="currentColor" opacity=".7" />
      <circle cx="24" cy="9" r="5" fill="currentColor" />
    </svg>
  )
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cx('mx-auto w-full max-w-[1440px] px-4 md:px-[34px]', className)}>{children}</div>
}

/** Small "back to" link with a leading arrow. */
export function Crumb({ to, children }: { to: string; children: ReactNode }) {
  return (
    <Link to={to} className="inline-flex min-h-10 items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.14em] text-flame-text hover:text-wine">
      <span aria-hidden>←</span> {children}
    </Link>
  )
}
