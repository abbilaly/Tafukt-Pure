import { useId } from 'react'

import { brand } from '../content'
import { cx } from '../lib/cx'

/** The Cedrina emblem: a basket of citrus under two leaves. */
export function Emblem({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden className={className}>
      <path d="M32 17c-1-6 2-11 9-13-1 7-4 11-9 13Z" fill="var(--color-wine)" />
      <path d="M31 17c-5-3-11-2-14 2 5 3 10 2 14-2Z" fill="var(--color-maroon-soft)" />
      <path d="M32 17v6" stroke="var(--color-wine)" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="21" cy="33" r="8" fill="var(--color-flame)" stroke="var(--color-cream)" strokeWidth="1.5" />
      <circle cx="43" cy="33" r="8" fill="var(--color-flame)" stroke="var(--color-cream)" strokeWidth="1.5" />
      <circle cx="32" cy="29" r="9" fill="var(--color-flame)" stroke="var(--color-cream)" strokeWidth="1.5" />
      <circle cx="29" cy="26" r="1.6" fill="var(--color-cream)" opacity=".7" />
      <path d="M8 36h48l-5.5 17a5 5 0 0 1-4.8 3.5H18.3a5 5 0 0 1-4.8-3.5Z" fill="var(--color-flame)" />
      <path d="M12 42h40M14.2 48h35.6M24 36l-2 20M40 36l2 20M32 36v20" stroke="var(--color-cream)" strokeWidth="1.4" opacity=".85" />
      <path d="M6 36h52" stroke="var(--color-wine)" strokeWidth="2.4" strokeLinecap="round" />
    </svg>
  )
}

export function Wordmark({ className, dark }: { className?: string; dark?: boolean }) {
  return (
    <span className={cx('flex flex-col items-center leading-none', className)}>
      <span className={cx('font-serif text-[25px] font-semibold uppercase tracking-[0.06em]', dark ? 'text-on-dark' : 'text-wine')}>{brand.word}</span>{' '}
      <span className={cx('-mt-0.5 font-serif text-[19px] italic', dark ? 'text-flame' : 'text-flame-text')}>{brand.sub}</span>
    </span>
  )
}

export function Logo({ className, dark, compact }: { className?: string; dark?: boolean; compact?: boolean }) {
  return (
    <span className={cx('flex flex-col items-center gap-1', className)}>
      <Emblem className={cx(compact ? 'h-9' : 'h-12 md:h-[60px]', 'w-auto')} />
      <Wordmark dark={dark} />
      <span className="sr-only">, home</span>
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

/** The maroon hillside behind the hero jars. */
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
