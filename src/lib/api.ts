export type ApiResult<T = Record<string, unknown>> = { ok: true; data: T } | { ok: false; error: string; fields?: Record<string, string> }

/** POST JSON to a Worker route and normalise the answer. */
export async function post<T = Record<string, unknown>>(path: string, body: unknown): Promise<ApiResult<T>> {
  try {
    const res = await fetch(path, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(body) })
    const data = (await res.json().catch(() => ({}))) as T & { error?: string; fields?: Record<string, string> }
    if (res.ok) return { ok: true, data }
    return { ok: false, error: data.error ?? 'Something went wrong. Try again.', fields: data.fields }
  } catch {
    return { ok: false, error: 'You appear to be offline. Check your connection and try again.' }
  }
}
