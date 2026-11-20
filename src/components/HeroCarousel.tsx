import { motion, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react'
import { Link } from 'react-router'

import { heroOrder, home, products, type Product } from '../content'
import { CurvedText, Hill } from './Brand'
import { Jar } from './Cards'

// The hero: jars drifting over the maroon hillside, a ring of curved type
// behind them. Click a jar (or use the arrow keys) to bring it forward; the
// featured jar links to its product page. Positions are measured in a
// 1440x900 design frame and scaled to the viewport.

type Slot = { cx: number; cy: number; h: number; rot: number; o: number; z: number }
// Desktop slots, design-frame pixels. Index 0 is the featured jar.
const WIDE: Record<number, Slot> = {
  [-2]: { cx: -260, cy: 300, h: 360, rot: 22, o: 0, z: 1 },
  [-1]: { cx: 112, cy: 382, h: 385, rot: 18, o: 1, z: 2 },
  0: { cx: 566, cy: 474, h: 470, rot: 9, o: 1, z: 4 },
  1: { cx: 1111, cy: 546, h: 440, rot: -7, o: 1, z: 3 },
  2: { cx: 1404, cy: 626, h: 270, rot: 13, o: 1, z: 2 },
  3: { cx: 1700, cy: 700, h: 220, rot: 16, o: 0, z: 1 },
}
// Phone slots, in a 390x760 frame.
const NARROW: Record<number, Slot> = {
  [-2]: { cx: -200, cy: 420, h: 220, rot: 18, o: 0, z: 1 },
  [-1]: { cx: 10, cy: 380, h: 240, rot: 14, o: 1, z: 2 },
  0: { cx: 192, cy: 420, h: 370, rot: 6, o: 1, z: 4 },
  1: { cx: 378, cy: 455, h: 240, rot: -8, o: 1, z: 3 },
  2: { cx: 560, cy: 560, h: 200, rot: 12, o: 0, z: 2 },
  3: { cx: 700, cy: 600, h: 180, rot: 14, o: 0, z: 1 },
}

const jars = heroOrder.map((s) => products.find((p) => p.slug === s)).filter((p): p is Product => !!p)

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
  const [ref, { w, h }] = useSize<HTMLElement>()
  const [active, setActive] = useState(0)
  const [turn, setTurn] = useState(0)
  const [paused, setPaused] = useState(false)
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
      setActive((a) => (a + delta + n) % n)
      setTurn((t) => t - delta * 38)
    },
    [n],
  )

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
  const pill = frame.slots[0]

  return (
    <section
      ref={ref}
      aria-roledescription="carousel"
      aria-label="Featured jars"
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
          <CurvedText text={`${featured.ring}CEDRINA · `} radius={ringR} size={ringSize} rotate={turn - 90} />
        </motion.div>
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {featured.name}, {featured.kind}. {active + 1} of {n}.
      </p>

      {jars.map((p, i) => {
        let rel = (i - active + n) % n
        if (rel > n / 2) rel -= n
        const slot = frame.slots[Math.max(-2, Math.min(3, rel))]
        const hidden = slot.o === 0
        const height = slot.h * u
        const isFeatured = rel === 0
        const style = { left: px(slot.cx), top: py(slot.cy), height, rotate: slot.rot, opacity: slot.o, zIndex: slot.z }
        const jar = (
          <span className="block h-full w-full animate-bob" style={{ animationDelay: `${-i * 1.3}s` }}>
            <Jar product={p} eager={Math.abs(rel) <= 1} className="h-full drop-shadow-[0_34px_30px_rgb(30_6_10/0.4)]" alt="" speak={!!p.label} />
          </span>
        )
        return (
          <motion.div
            key={p.slug}
            className="absolute -translate-x-1/2 -translate-y-1/2"
            initial={false}
            animate={style}
            transition={reduce ? { duration: 0 } : { type: 'spring', stiffness: 70, damping: 18, mass: 0.9 }}
            style={{ height, aspectRatio: p.aspect }}
          >
            {isFeatured ? (
              <Link to={`/shop/${p.slug}`} className="block size-full rounded-[24px]">
                {jar}
                <span className="sr-only">{p.label ? '' : `${p.name} ${p.kind}`} View product</span>
              </Link>
            ) : (
              <button type="button" tabIndex={hidden ? -1 : 0} aria-hidden={hidden || undefined} onClick={() => go(rel)} className="block size-full rounded-[24px] transition-[filter] hover:brightness-105">
                <span className="sr-only">Show {p.label ? '' : `${p.name} ${p.kind}`}</span>
                {jar}
              </button>
            )}
          </motion.div>
        )
      })}

      {/* "Discover the product", pinned beside the featured jar. */}
      <motion.div key={`pill-${featured.slug}`} className="absolute z-10" style={{ left: px(pill.cx + (narrow ? -64 : 100)), top: py(pill.cy + (narrow ? 205 : 162)) }} initial={reduce ? false : { opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }}>
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
