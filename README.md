# Cedrina Farm: farm produce shop

A storefront for a Mediterranean family farm selling jarred pestos, preserves
and fresh citrus. The home page opens on a carousel of jars drifting over a
maroon hillside, with a ring of curved serif type behind them. Below it: the
farm's statement, bestsellers, shop shelves, the farm story, recipes and
promises.

Screens:

- `/`: hero carousel (click a jar, arrow keys or swipe; it auto-advances and pauses on hover or focus)
- `/shop`: catalogue with shelf filters, search and sort (all in the URL), live stock badges
- `/shop/:slug`: product page with sizes, quantity, stock check, ingredients, pairings, recipes and related jars
- `/farm`: farm story with timeline, stats, harvest calendar and visits
- `/recipes`, `/recipes/:slug`: recipes by course, with a tick-off method and "add the jar" buttons
- `/bag`: cart and checkout summary (delivery choice, promo code, delivery details, order placed through the Worker)
- `/order/:reference`: order confirmation, kept on this device
- `/styleguide`: tokens and every component in every state
- anything else: 404

The header has a euro / dollar switch, a full-screen menu and a bag drawer.
Bag, currency, delivery choice, promo code and past orders persist in
localStorage.

## Run it

```sh
bun install
bun run dev        # Vite + the Worker in workerd
bun run build      # dist/client (assets) + dist/farm_produce/index.js (Worker)
```

## Edit it

- `src/content.ts` holds every string, product, price, recipe and the farm story. Start there.
- Images: every photo goes through `img()` in `src/content.ts`, which reads
  `public/images/<name>.webp`. They are generated placeholders: replace each
  file with your own photography under the same name, or point `IMAGE_BASE`
  at a CDN. Jar and crate shots are transparent cut-outs; product names are
  printed on the jar labels in CSS (`Jar` in `src/components/Cards.tsx`,
  positioned by each product's `label.y`), so a new product needs a wordless
  label photo and a `label` entry.
- `src/styles.css` holds the design tokens (colours, radii, shadows, motion).
  `flame` is the bright display orange; `flame-ink` and `flame-text` are the
  darker versions used behind and as small text so they pass WCAG AA.
- `src/components/ui.tsx` is the design system; `Chrome.tsx` the header,
  menu, bag drawer and footer; `HeroCarousel.tsx` the hero; `Brand.tsx` the
  emblem, wordmark, hill and curved ring text.
- `src/lib/pricing.ts` computes totals and holds the promo codes; the page and
  the Worker share it.
- `src/worker/index.ts` is the Cloudflare Worker: `GET /api/stock`,
  `POST /api/promo`, `POST /api/order` (validates, checks stock, returns a
  reference; no payment is taken), `POST /api/subscribe`, `GET /api/health`.
  Connect `/api/order` to your payment provider and `/api/subscribe` to your
  email tool.

See the [style guide](/styleguide) (linked from the footer) for every token
and component.

## Deploy with Freebuff Sites

`deploy.json` already points at the build output. After `bun run build`,
deploy it with the `sites_deploy` tool (or the Sites API) from this directory.
