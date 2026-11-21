import { createContext, useContext, useEffect, useMemo, type ReactNode } from 'react'

import type { Product, Recipe } from '../content'
import { copy, localizeProducts, localizeRecipes, type Copy, type Lang } from '../content.i18n'
import { usePersistent } from './persist'

// Language state for the whole shop. Arabic flips the document to rtl and
// swaps in the Arabic copy, product and recipe text.

type Direction = 'ltr' | 'rtl'

interface Content extends Copy {
  lang: Lang
  setLang: (lang: Lang) => void
  dir: Direction
  /** Shorthand for the current language's copy. */
  t: Copy
  products: Product[]
  recipes: Recipe[]
  product: (slug: string) => Product | undefined
  recipe: (slug: string) => Recipe | undefined
}

const Ctx = createContext<Content | null>(null)

const isLang = (v: unknown): v is Lang => v === 'en' || v === 'ar'

/** Arabic browsers start in Arabic; everyone else in English. */
function initialLang(): Lang {
  if (typeof navigator === 'undefined') return 'en'
  return navigator.language?.toLowerCase().startsWith('ar') ? 'ar' : 'en'
}

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = usePersistent<Lang>('cedrina-lang', initialLang(), isLang)
  const dir: Direction = lang === 'ar' ? 'rtl' : 'ltr'

  useEffect(() => {
    const html = document.documentElement
    html.lang = lang
    html.dir = dir
  }, [lang, dir])

  const value = useMemo<Content>(() => {
    const products = localizeProducts(lang)
    const recipes = localizeRecipes(lang)
    const t = copy[lang]
    return {
      ...t,
      lang,
      setLang,
      dir,
      t,
      products,
      recipes,
      product: (slug) => products.find((p) => p.slug === slug),
      recipe: (slug) => recipes.find((r) => r.slug === slug),
    }
  }, [lang, setLang, dir])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useContent() {
  const v = useContext(Ctx)
  if (!v) throw new Error('useContent outside LangProvider')
  return v
}

export const useLang = () => {
  const { lang, setLang, dir } = useContent()
  return { lang, setLang, dir }
}
