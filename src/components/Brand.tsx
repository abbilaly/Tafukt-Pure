import { useId } from 'react'

import { cx } from '../lib/cx'
import { useContent } from '../lib/lang'

/**
 * The TAFUKT PURE emblem: an Amazigh sun. A gold disc carries a lozenge of
 * carved geometry, and eight short rays echo the sun of the name (tafukt).
 */
export function Emblem({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className}>
      <g stroke="var(--color-flame)" strokeWidth="1.7" strokeLinecap="round">
        <path d="M32 5.5v5M32 53.5v5M5.5 32h5M53.5 32h5" />
        <path d="M13.5 13.5l3.5 3.5M47 47l3.5 3.5M50.5 13.5L47 17M17 47l-3.5 3.5" />
      </g>
      <circle cx="32" cy="32" r="15" fill="var(--color-flame-ink)" />
      <path d="M32 21 43 32 32 43 21 32Z" fill="none" stroke="var(--color-cream)" strokeWidth="1.5" />
      <path d="M32 26.5 37.5 32 32 37.5 26.5 32Z" fill="none" stroke="var(--color-cream)" strokeWidth="1.1" opacity=".7" />
      <circle cx="32" cy="32" r="1.9" fill="var(--color-cream)" />
    </svg>
  )
}

export function Wordmark({ className, dark }: { className?: string; dark?: boolean }) {
  const { brand } = useContent()
  return (
    <span className={cx('flex flex-col items-center leading-none', className)}>
      <span className={cx('font-serif text-[24px] font-semibold uppercase tracking-[0.16em]', dark ? 'text-on-dark' : 'text-wine')}>{brand.word}</span>{' '}
      <span className={cx('mt-1 text-[10px] font-semibold uppercase tracking-[0.52em]', dark ? 'text-flame' : 'text-flame-text')}>{brand.sub}</span>
    </span>
  )
}

export function Logo({ className, dark, compact }: { className?: string; dark?: boolean; compact?: boolean }) {
  const { ui } = useContent()
  return (
    <span className={cx('flex flex-col items-center gap-1', className)}>
      <Emblem className={cx(compact ? 'h-9' : 'h-12 md:h-[60px]', 'w-auto')} />
      <Wordmark dark={dark} />
      <span className="sr-only">, {ui.home}</span>
    </span>
  )
}

/**
 * Text set on a circle, the hero's ring. `rotate` turns the whole ring so the
 * carousel can spin it between products.
 */
export function CurvedText({ text, radius = 440, size = 96, rotate = 0, className }: { text: string; radius?: number; size?: number; rotate?: number; className?: string }) {
  const id = useId().replace(/:/g, '')
  const d = radius * 2 + size * 2
  const c = d / 2
  return (
    <svg viewBox={`0 0 ${d} ${d}`} aria-hidden className={className} style={{ width: d, height: d }}>
      <defs>
        <path id={id} d={`M ${c - radius} ${c} a ${radius} ${radius} 0 1 1 ${radius * 2} 0 a ${radius} ${radius} 0 1 1 ${-radius * 2} 0`} />
      </defs>
      <g style={{ transform: `rotate(${rotate}deg)`, transformOrigin: 'center', transition: 'transform 1.1s var(--ease-out-soft)' }}>
        <text fill="var(--color-flame)" fontFamily="var(--font-serif)" fontSize={size} letterSpacing={size * 0.04}>
          <textPath href={`#${id}`} textLength={Math.PI * 2 * radius - size * 0.3} lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </g>
    </svg>
  )
}

/** The olive hillside behind the hero jars. */
export function Hill({ className, height }: { className?: string; height?: number }) {
  return (
    <svg viewBox="0 0 1440 640" preserveAspectRatio="none" aria-hidden className={className} style={{ height }}>
      <path
        d="M70 640 C 92 540, 140 430, 250 352 L 640 78 C 712 26, 790 24, 860 72 L 1240 340 C 1312 392, 1350 520, 1372 640 Z"
        fill="var(--color-maroon)"
      />
    </svg>
  )
}
