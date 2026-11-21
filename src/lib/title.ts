import { useEffect } from 'react'

import { useContent } from './lang'

export function useTitle(title?: string) {
  const { brand } = useContent()
  useEffect(() => {
    document.title = title ? `${title} | ${brand.name}` : `${brand.name} | ${brand.tagline}`
  }, [title, brand.name, brand.tagline])
}
