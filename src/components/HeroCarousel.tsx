import { motion, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router'

import { heroOrder, type Product } from '../content'
import { useContent } from '../lib/lang'
import { CurvedText, Hill } from './Brand'
import { Jar } from './Cards'

// The hero: exactly three jars at a time over the maroon hillside, a ring of
// curved type behind them. The middle jar is the featured one: it drifts out to
// the left and shrinks as the right-hand jar takes its place, while the next jar
// slides in from beyond the right edge. Click a jar (or use the arrow keys) to
// bring it forward; the featured jar links to its product page. Positions are
// measured in a 1440x900 design frame and scaled to the viewport.

type Role = 'out' | 'exit' | 'left' | 'center' | 'right' | 'wait'
type Slot = { cx: number; cy: number; h: number; rot: number; z: number }
// Desktop slots, design-frame pixels. `out`, `exit` and `wait` sit beyond the
// edges of the frame, where the section's overflow clips them, so the products
// that are not on stage are never on screen.
const WIDE: Record<Role, Slot> = {
  out: { cx: -535, cy: 340, h: 300, rot: 14, z: 1 },
  exit: { cx: 2065, cy: 330, h: 300, rot: -12, z: 1 },
  left: { cx: 200, cy: 360, h: 336, rot: 16, z: 2 },
  center: { cx: 700, cy: 462, h: 444, rot: 8, z: 4 },
  right: { cx: 1150, cy: 520, h: 352, rot: -7, z: 3 },
  wait: { cx: 2100, cy: 330, h: 300, rot: 12, z: 2 },
}
// Phone slots, in a 390x760 frame. The featured jar is more than twice the
// height of the side jars, which tuck in behind it without being clipped.
const NARROW: Record<Role, Slot> = {
  out: { cx: -295, cy: 372, h: 150, rot: 16, z: 1 },
  exit: { cx: 500, cy: 372, h: 150, rot: -12, z: 1 },
  left: { cx: 82, cy: 366, h: 130, rot: 14, z: 2 },
  center: { cx: 195, cy: 448, h: 282, rot: 6, z: 4 },
  right: { cx: 308, cy: 366, h: 130, rot: -10, z: 3 },
  wait: { cx: 529, cy: 372, h: 150, rot: 12, z: 2 },
}

function useSize<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [size, setSize] = useState({ w: 1440, h: 900 })
  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => setSize({ w: e.contentRect.width, h: e.contentRect.height }))
    ro.observe(el)
    return () => ro.disconnect()
  }, [])
  return [ref, size] as const
}

export function HeroCarousel({ onScroll }: { onScroll: () => void }) {
  const { products, home, ui } = useContent()
  const jars = heroOrder.map((s) => products.find((p) => p.slug === s)).filter((p): p is Product => !!p)
  const [ref, { w, h }] = useSize<HTMLElement>()
  const [active, setActive] = useState(0)
  const [dir, setDir] = useState<1 | -1>(1)
  const [turn, setTurn] = useState(0)
  const [paused, setPaused] = useState(false)
  // False while a jar is on its way off the left edge; see the effect below.
  const [settled, setSettled] = useState(true)
  const reduce = useReducedMotion()
  const n = jars.length
  const narrow = w < 768
  const frame = narrow ? { W: 390, H: 760, slots: NARROW } : { W: 1440, H: 900, slots: WIDE }
  const u = Math.min(w / frame.W, h / frame.H)
  const sx = w / frame.W
  // Map a design-frame point to the viewport: x spreads with the width, y is anchored to the bottom.
  const px = (cx: number) => w / 2 + (cx - frame.W / 2) * sx
  // Spare height (portrait tablets) lifts the scene off the bottom edge.
  const spare = Math.max(0, h - frame.H * u)
  const py = (cy: number) => (narrow ? spare * 0.35 + cy * u : h - (frame.H - cy) * u - spare * 0.4)

  const go = useCallback(
    (delta: number) => {
      if (!settled) return
      // Take the shorter way round the ring, so clicking the left-hand jar is one
      // step back rather than six steps forward.
      let step = ((delta % n) + n) % n
      if (step > n / 2) step -= n
      if (step === 0) return
      setDir(step > 0 ? 1 : -1)
      setActive((a) => (a + step + n) % n)
      setTurn((t) => t - step * 38)
      setSettled(false)
    },
    [n, settled],
  )

  // Once a turn is over, the jar that left — still parked outside the left edge —
  // is moved to the waiting spot outside the right edge, ready to come back in
  // on a later turn. Both places are out of sight, so the switch is invisible.
  useEffect(() => {
    if (settled) return
    const t = window.setTimeout(() => setSettled(true), 900)
    return () => window.clearTimeout(t)
  }, [settled])

  useEffect(() => {
    if (paused || reduce) return
    const t = window.setInterval(() => go(1), 6500)
    return () => window.clearInterval(t)
  }, [paused, reduce, go])

  // Swipe on touch screens.
  const touch = useRef<number | null>(null)

  const featured = jars[active]
  const ringR = narrow ? 170 : 430
  const ringSize = narrow ? 40 : 88
  const ringCy = narrow ? 640 : 856
  const pill = frame.slots.center

  return (
    <section
      ref={ref}
      aria-roledescription="carousel"
      aria-label={ui.featuredJars}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
      onKeyDown={(e) => {
        if (e.key === 'ArrowRight') go(1)
        if (e.key === 'ArrowLeft') go(-1)
      }}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        if (touch.current === null) return
        const dx = e.changedTouches[0].clientX - touch.current
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1)
        touch.current = null
      }}
      className="relative h-[100svh] min-h-[640px] overflow-hidden bg-cream md:max-h-[1000px] md:min-h-[700px]"
    >
      <Hill className="absolute inset-x-0 bottom-0 w-full" height={Math.round(h - py(narrow ? 250 : 260))} />

      {/* The ring of curved type, centred below the hill's peak. */}
      <div aria-hidden className="pointer-events-none absolute" style={{ left: px(frame.W / 2 - (narrow ? 0 : 43)), top: py(ringCy), transform: `translate(-50%, -50%) scale(${u})` }}>
        <motion.div key={featured.slug} initial={reduce ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8 }}>
          <CurvedText text={`${featured.ring}TAFUKT PURE · `} radius={ringR} size={ringSize} rotate={turn - 90} />
        </motion.div>
      </div>

      <p className="sr-only" aria-live="polite">
        {ui.showing(featured.name, featured.kind, active + 1, n)}
      </p>

      {jars.map((p, i) => {
        const rel = (i - active + n) % n
        // Three roles hold the stage; the rest of the ring is parked outside the
        // frame. A jar that has just left keeps its off-stage spot until the turn
        // ends — on the left when the ring turns forward, on the right when it
        // turns back — and only then waits out of sight for its next entrance.
        const leaving = dir > 0 ? n - 2 : 2
        const role: Role =
          rel === 0 ? 'center' : rel === 1 ? 'right' : rel === n - 1 ? 'left' : rel === leaving && !settled ? (dir > 0 ? 'out' : 'exit') : 'wait'
        const slot = frame.slots[role]
        const hidden = role === 'out' || role === 'exit' || role === 'wait'
        const height = slot.h * u
        const isFeatured = role === 'center'
        const style = { left: px(slot.cx), top: py(slot.cy), height, rotate: slot.rot, zIndex: slot.z }
        const jar = (
          <span className="block h-full w-full animate-bob" style={{ animationDelay: `${-i * 1.3}s` }}>
            <Jar product={p} eager priority={isFeatured} sizes="(min-width: 768px) 34vw, 62vw" className="h-full drop-shadow-[0_34px_30px_rgb(30_6_10/0.4)]" alt="" speak={!!p.label} />
          </span>
        )
        return (
          <motion.div
            key={p.slug}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            initial={false}
            animate={style}
            // The waiting spot is reached only while the jar is out of sight, so
            // it is a jump rather than a journey across the hero.
            transition={reduce || role === 'wait' ? { duration: 0 } : { type: 'spring', stiffness: 58, damping: 20, mass: 1 }}
            style={{ height, aspectRatio: p.aspect }}
          >
            {isFeatured ? (
              <Link to={`/shop/${p.slug}`} className="block size-full rounded-[24px]">
                {jar}
                <span className="sr-only">{p.label ? '' : `${p.name} ${p.kind}`} {ui.viewProduct}</span>
              </Link>
            ) : (
              <button type="button" tabIndex={hidden ? -1 : 0} aria-hidden={hidden || undefined} onClick={() => go(rel)} className="block size-full rounded-[24px] transition-[filter] hover:brightness-105">
                <span className="sr-only">{ui.showProduct(p.label ? p.name : `${p.name} ${p.kind}`)}</span>
                {jar}
              </button>
            )}
          </motion.div>
        )
      })}

      {/* "Discover the product", pinned beside the featured jar. */}
      <motion.div key={`pill-${featured.slug}`} className="absolute z-10" style={{ left: px(pill.cx + (narrow ? -64 : 100)), top: py(pill.cy + (narrow ? 205 : 190)) }} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }}>
        <Link
          to={`/shop/${featured.slug}`}
          className="inline-flex h-10 items-center gap-2 rounded-control bg-white px-3.5 text-[10.5px] font-bold uppercase tracking-[0.1em] text-flame-text shadow-pill transition-colors duration-200 hover:bg-flame-ink hover:text-white md:h-[30px]"
        >
          <span aria-hidden className="size-1.5 rounded-full bg-flame-ink" />
          {home.discover}
          <span className="sr-only">: {featured.name}</span>
        </Link>
      </motion.div>

      <button type="button" onClick={onScroll} className="absolute bottom-3 left-1/2 z-10 inline-flex min-h-10 -translate-x-1/2 items-center px-3 font-serif text-[12px] uppercase tracking-[0.06em] text-on-dark md:bottom-[24px]">
        {home.scroll}
      </button>
    </section>
  )
}
