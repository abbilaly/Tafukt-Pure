import { MotionConfig } from 'motion/react'
import { lazy, Suspense, useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router'

import { BagDrawer, Footer, Header, MenuOverlay, Toaster } from './components/Chrome'
import { LangProvider, useContent } from './lib/lang'
import { StoreProvider } from './lib/store'
import { Bag, OrderConfirmed } from './pages/Bag'
import { Farm } from './pages/Farm'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'
import { ProductPage } from './pages/Product'
import { RecipePage, Recipes } from './pages/Recipes'
import { Shop } from './pages/Shop'

// The style guide is split out of the main bundle.
const StyleGuide = lazy(() => import('./pages/StyleGuide').then((m) => ({ default: m.StyleGuide })))

function ScrollToTop() {
  const { pathname, hash } = useLocation()
  useEffect(() => {
    if (hash) {
      document.getElementById(hash.slice(1))?.scrollIntoView()
      return
    }
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname, hash])
  return null
}

function Shell() {
  const { pathname } = useLocation()
  const { ui } = useContent()
  return (
    <>
      <ScrollToTop />
      <a href="#main" className="sr-only z-[70] rounded-control bg-wine px-5 py-3 text-on-dark focus:not-sr-only focus:fixed focus:start-4 focus:top-4">
        {ui.skip}
      </a>
      <Header overlay={pathname === '/'} />
      <main id="main" tabIndex={-1} className="outline-none">
        <Routes>
          <Route index element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="shop/:slug" element={<ProductPage />} />
          <Route path="farm" element={<Farm />} />
          <Route path="recipes" element={<Recipes />} />
          <Route path="recipes/:slug" element={<RecipePage />} />
          <Route path="bag" element={<Bag />} />
          <Route path="order/:reference" element={<OrderConfirmed />} />
          <Route path="styleguide" element={<Suspense fallback={<div className="min-h-[70vh]" />}><StyleGuide /></Suspense>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
      <MenuOverlay />
      <BagDrawer />
      <Toaster />
    </>
  )
}

export function App() {
  return (
    <BrowserRouter>
      <MotionConfig reducedMotion="user">
        <LangProvider>
          <StoreProvider>
            <Shell />
          </StoreProvider>
        </LangProvider>
      </MotionConfig>
    </BrowserRouter>
  )
}
