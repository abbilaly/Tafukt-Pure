import type { Lang } from '../content.i18n'

export type ApiResult<T = Record<string, unknown>> = { ok: true; data: T } | { ok: false; error: string; fields?: Record<string, string> }

const fallback = {
  en: { failed: 'Something went wrong. Try again.', offline: 'You appear to be offline. Check your connection and try again.' },
  ar: { failed: 'حدث خطأ ما. جرّب مرة أخرى.', offline: 'تبدو غير متصل. تحقّق من الشبكة وحاول مجددًا.' },
}

/** POST JSON to a Worker route and normalise the answer. */
export async function post<T = Record<string, unknown>>(path: string, body: unknown, lang: Lang = 'en'): Promise<ApiResult<T>> {
  try {
    const res = await fetch(path, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ ...(body as object), lang }) })
    const data = (await res.json().catch(() => ({}))) as T & { error?: string; fields?: Record<string, string> }
    if (res.ok) return { ok: true, data }
    return { ok: false, error: data.error ?? fallback[lang].failed, fields: data.fields }
  } catch {
    return { ok: false, error: fallback[lang].offline }
  }
}
