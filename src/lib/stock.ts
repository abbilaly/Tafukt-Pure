import { useEffect, useState } from 'react'

// Live stock from the Worker (GET /api/stock). Loading, error and ready are
// all real states the pages render.
export type StockState = { status: 'loading' } | { status: 'error' } | { status: 'ready'; stock: Record<string, number> }

let cache: Promise<Record<string, number>> | null = null
function load() {
  cache ??= fetch('/api/stock')
    .then((r) => (r.ok ? (r.json() as Promise<{ stock: Record<string, number> }>) : Promise.reject(new Error(String(r.status)))))
    .then((d) => d.stock)
    .catch((e) => {
      cache = null
      throw e
    })
  return cache
}

export function useStock(): StockState {
  const [state, setState] = useState<StockState>({ status: 'loading' })
  useEffect(() => {
    let live = true
    load().then(
      (stock) => live && setState({ status: 'ready', stock }),
      () => live && setState({ status: 'error' }),
    )
    return () => {
      live = false
    }
  }, [])
  return state
}
