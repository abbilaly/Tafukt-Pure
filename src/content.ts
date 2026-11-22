// Every string, price and piece of seed data for the TAFUKT PURE storefront.
// Edit here first; the pages only lay this out.
//
// BRAND COPY — NOT FINAL. The positioning, the meaning of TAFUKT PURE, the
// brand story, the cultural references, the category introductions and the
// homepage headlines are all still to be written. Until then the site uses the
// single `comingSoon` block below so no heritage, date, certification or
// production claim is invented. Replace, in this order:
//   1. `comingSoon` and `home.statement` / `home.story` — identity and story.
//   2. `categories[].blurb`, `farm.note`, `farm.seasons` — Moroccan context.
//   3. `products[].short` / `description` and `recipesPage.intro` — catalogue.
// Every field has an Arabic counterpart in content.i18n.ts; keep both in step.

/** All imagery routes through this one helper. Swap the files in
 *  public/images (same names) for real photography, or point IMAGE_BASE at a CDN. */
const IMAGE_BASE = '/images'
export const img = (name: string) => (`${IMAGE_BASE}/${name}`.match(/\.(png|jpe?g|webp|avif|svg)$/i) ? `${IMAGE_BASE}/${name}` : `${IMAGE_BASE}/${name}.webp`)

export const brand = {
  name: 'TAFUKT PURE',
  word: 'Tafukt',
  sub: 'Pure',
  tagline: 'Moroccan natural products',
  place: 'Morocco',
  email: 'hello@tafuktpure.example',
  phone: '+212 0000 00000',
}

/** Temporary brand voice. Kept in one place so the final copy can replace it
 *  without touching a page. No dates, origins or promises. */
export const comingSoon = {
  label: 'Coming soon',
  title: 'Something beautiful is coming soon.',
  line: 'Discover the spirit of Moroccan tradition.',
  note: 'The TAFUKT PURE story is being written. Until it is ready, the pantry is open.',
}

export type Currency = 'EUR' | 'USD'
export const currencies: { id: Currency; symbol: string; label: string; rate: number }[] = [
  { id: 'EUR', symbol: '€', label: 'Prices in euro', rate: 1 },
  { id: 'USD', symbol: '$', label: 'Prices in US dollars', rate: 1.09 },
]

export const nav = [
  { to: '/shop', label: 'The pantry', note: 'All products' },
  { to: '/farm', label: 'Our story', note: 'Rooted in Morocco' },
  { to: '/recipes', label: 'Recipes', note: 'From the Moroccan table' },
  { to: '/bag', label: 'Your bag', note: 'Cart and checkout' },
]

export type Category = 'Spreads' | 'Oils' | 'Sweets'
export const categories: { id: Category; title: string; blurb: string; image: string; tint: string }[] = [
  { id: 'Spreads', title: 'Amlou & spreads', blurb: 'Almonds and argan, ground slowly.', image: 'amlou-almond.png', tint: '#dcc9a0' },
  { id: 'Oils', title: 'Argan oil', blurb: 'Pressed in small lots, for the kitchen and the skin.', image: 'placeholder-argan-oil.svg', tint: '#e2d3a8' },
  { id: 'Sweets', title: 'Traditional sweets', blurb: 'Chebakia and the sweets of the Moroccan table.', image: 'placeholder-chebakia.svg', tint: '#e6d0a4' },
]

export type Size = { id: string; label: string; price: number }
export type Product = {
  slug: string
  name: string
  kind: string
  category: Category
  image: string
  /** Width / height of the cut-out image. */
  aspect: number
  /** How the file fills its box. Photographs with transparent margins around the
   *  product use 'cover' so the whole jar shows at a consistent size. */
  fit?: 'contain' | 'cover'
  /** Price not published yet: the card and the product page show "Coming soon"
   *  and the product cannot be added to the bag. Pair it with a placeholder
   *  image in public/images until the owner supplies the real photograph. */
  priceTbc?: boolean
  /** Where the printed name sits on the jar label (percent from the top). */
  label?: { y: number; color: string }
  /** Label colour, used for tiles behind the jar. */
  tint: string
  /** Text colour that passes AA on the tint. */
  tintInk: string
  /** The English kind, kept for the printed label when the page is in Arabic. */
  kindLatin?: string
  ring: string
  sizes: Size[]
  short: string
  description: string
  ingredients: string
  pairings: string[]
  badges: string[]
  season: string
  recipes: string[]
}

export const products: Product[] = [
  {
    slug: 'amlou-beldi',
    aspect: 0.742,
    fit: 'cover',
    name: 'Almond Amlou',
    kind: 'Almond & argan spread',
    category: 'Spreads',
    image: 'amlou-almond.png',
    tint: '#dcc9a0',
    tintInk: '#3d3320',
    ring: 'AMLOU · ALMOND & ARGAN · ',
    sizes: [
      { id: '190', label: '190 g jar', price: 12.5 },
      { id: '3x190', label: 'Three jars', price: 33 },
    ],
    short: 'Toasted almonds, argan oil and a little honey.',
    description:
      'Amlou as it is made at home: almonds toasted slowly and ground with argan oil and honey until they turn into a soft, pourable paste. Spread it on warm bread or msemen, stir it into yoghurt, or eat it from the spoon.',
    ingredients: 'Toasted almonds, argan oil, honey, sea salt.',
    pairings: ['Msemen or baghrir', 'Yoghurt and fresh fruit', 'Warm sourdough'],
    badges: ['Signature'],
    season: 'Made in small batches',
    recipes: ['msemen-amlou'],
  },
  {
    slug: 'amlou-cashew',
    aspect: 0.742,
    fit: 'cover',
    name: 'Cashew Amlou',
    kind: 'Cashew & argan spread',
    category: 'Spreads',
    image: 'amlou-cashew.png',
    tint: '#dfcba4',
    tintInk: '#3d3320',
    ring: 'AMLOU · CASHEW · ',
    sizes: [
      { id: '190', label: '190 g jar', price: 13.5 },
      { id: '3x190', label: 'Three jars', price: 35 },
    ],
    short: 'Toasted cashews, argan oil and a little honey.',
    description:
      'Cashews toasted until they smell of the oven, then ground with argan oil and honey into a soft, pourable paste. Spread it on warm bread, spoon it over yoghurt, or eat it straight from the jar.',
    ingredients: 'Toasted cashews, argan oil, honey, sea salt.',
    pairings: ['Msemen or baghrir', 'Yoghurt and fresh fruit', 'Warm sourdough'],
    badges: ['New'],
    season: 'Coming soon',
    recipes: [],
  },
  {
    slug: 'amlou-chocolate',
    aspect: 0.742,
    fit: 'cover',
    name: 'Chocolate Amlou',
    kind: 'Cocoa & almond spread',
    category: 'Spreads',
    image: 'amlou-chocolate.png',
    tint: '#c9b393',
    tintInk: '#3a2f1c',
    ring: 'AMLOU · CHOCOLATE · ',
    sizes: [
      { id: '190', label: '190 g jar', price: 14 },
      { id: '3x190', label: 'Three jars', price: 36 },
    ],
    short: 'Toasted almonds and cocoa, ground with argan oil and honey.',
    description:
      'The amlou we know, with cocoa ground through it. Almonds toasted slowly, cocoa, argan oil and a little honey, worked until the paste turns dark and glossy. Good on bread, on pancakes, or by the spoon.',
    ingredients: 'Toasted almonds, cocoa, argan oil, honey, sea salt.',
    pairings: ['Warm bread', 'Pancakes or msemen', 'Vanilla ice cream'],
    badges: ['New'],
    season: 'Coming soon',
    recipes: [],
  },
  {
    slug: 'amlou-peanut',
    aspect: 0.742,
    fit: 'cover',
    name: 'Peanut Amlou',
    kind: 'Peanut & argan spread',
    category: 'Spreads',
    image: 'amlou-peanut.png',
    tint: '#d8bd93',
    tintInk: '#3d3120',
    ring: 'AMLOU · PEANUT · ',
    sizes: [
      { id: '190', label: '190 g jar', price: 10.5 },
      { id: '3x190', label: 'Three jars', price: 27 },
    ],
    short: 'Toasted peanuts, argan oil and a little honey.',
    description:
      'Peanuts roasted until deep gold, ground with argan oil and honey to a paste that is fuller and a little more savoury than the almond jar. Spread it thin on warm bread, or use it in a sauce.',
    ingredients: 'Toasted peanuts, argan oil, honey, sea salt.',
    pairings: ['Warm bread', 'Banana and yoghurt', 'Satay-style sauces'],
    badges: ['New'],
    season: 'Coming soon',
    recipes: [],
  },
  // ── The three new products, in the order they should follow the amlou ──
  // PLACEHOLDERS. No price, ingredients or claims are published for these yet:
  // `priceTbc` shows "Coming soon" and blocks the bag, and each `image` is a
  // drawn placeholder (public/images/placeholder-*.svg).
  // To go live: drop the owner's cut-out photo in public/images (transparent
  // background, ~300×400), point `image` at it, set `aspect` to its width /
  // height, then replace `priceTbc` with real `sizes` and fill in the copy.
  {
    slug: 'zammita',
    aspect: 0.75,
    priceTbc: true,
    name: 'Zammita',
    kind: 'Traditional Moroccan blend',
    category: 'Spreads',
    image: 'placeholder-zammita.svg',
    tint: '#cbb894',
    tintInk: '#3a2f1c',
    ring: 'ZAMMITA · ',
    sizes: [{ id: 'tbc', label: 'Size to be confirmed', price: 0 }],
    short: 'A new addition to the pantry, arriving soon.',
    description:
      'The full description is still being written. This piece joins the pantry soon, and its photographs, ingredients and price will be published here as soon as they are ready.',
    ingredients: 'To be published with the launch.',
    pairings: [],
    badges: ['New'],
    season: 'Coming soon',
    recipes: [],
  },
  {
    slug: 'chebakia',
    aspect: 0.75,
    priceTbc: true,
    name: 'Chebakia',
    kind: 'Traditional Moroccan sweet',
    category: 'Sweets',
    image: 'placeholder-chebakia.svg',
    tint: '#d9a97f',
    tintInk: '#4d2410',
    ring: 'CHEBAKIA · ',
    sizes: [{ id: 'tbc', label: 'Size to be confirmed', price: 0 }],
    short: 'A new addition to the pantry, arriving soon.',
    description:
      'The full description is still being written. This piece joins the pantry soon, and its photographs, ingredients and price will be published here as soon as they are ready.',
    ingredients: 'To be published with the launch.',
    pairings: [],
    badges: ['New'],
    season: 'Coming soon',
    recipes: [],
  },
  {
    slug: 'argan-oil',
    aspect: 0.75,
    priceTbc: true,
    name: 'Argan Oil',
    kind: 'Moroccan argan oil',
    category: 'Oils',
    image: 'placeholder-argan-oil.svg',
    tint: '#e3cf9d',
    tintInk: '#4a3a12',
    ring: 'ARGAN · ',
    sizes: [{ id: 'tbc', label: 'Size to be confirmed', price: 0 }],
    short: 'A new addition to the pantry, arriving soon.',
    description:
      'The full description is still being written. This bottle joins the pantry soon, and its photographs, ingredients and price will be published here as soon as they are ready.',
    ingredients: 'To be published with the launch.',
    pairings: [],
    badges: ['New'],
    season: 'Coming soon',
    recipes: [],
  },
]

/** The hero carousel order. */
export const heroOrder = ['amlou-beldi', 'amlou-cashew', 'zammita', 'argan-oil', 'amlou-chocolate', 'chebakia', 'amlou-peanut']

export type Course = 'Starter' | 'Main' | 'Sweet'
export type Recipe = {
  slug: string
  title: string
  image: string
  course: Course
  minutes: number
  serves: number
  intro: string
  products: string[]
  ingredients: string[]
  steps: string[]
}

export const recipes: Recipe[] = [
  {
    slug: 'msemen-amlou',
    title: 'Msemen with amlou',
    image: 'r-crostini',
    course: 'Starter',
    minutes: 20,
    serves: 4,
    intro: 'Breakfast, or the first thing to put on the table when guests arrive.',
    products: ['amlou-beldi'],
    ingredients: ['8 msemen or other flatbreads', '1 jar Almond Amlou', 'Honey, to taste', 'Toasted sesame', 'Mint tea, to serve'],
    steps: [
      'Warm the msemen on a dry pan until soft and lightly golden.',
      'Spoon amlou over each one and spread it to the edges while the bread is warm.',
      'Add a thread of honey and a pinch of sesame.',
      'Fold and eat straight away, with mint tea.',
    ],
  },
  {
    slug: 'argan-couscous',
    title: 'Couscous with toasted argan oil',
    image: 'r-pasta',
    course: 'Main',
    minutes: 30,
    serves: 4,
    intro: 'The oil goes on at the end, off the heat, so its nutty perfume stays.',
    products: ['argan-oil'],
    ingredients: ['300 g couscous', '400 ml vegetable stock', '1 courgette and 1 carrot', 'A handful of chickpeas', '3 tbsp Argan Oil', 'Salt and black pepper'],
    steps: [
      'Pour the hot stock over the couscous, cover and leave for ten minutes.',
      'Steam or pan-fry the vegetables until tender, then fold in the chickpeas.',
      'Fluff the couscous with a fork and season.',
      'Take the pan off the heat and stir through the argan oil just before serving.',
    ],
  },
  {
    slug: 'chebakia-tea',
    title: 'Mint tea with chebakia',
    image: 'r-tart',
    course: 'Sweet',
    minutes: 10,
    serves: 4,
    intro: 'The tea is poured from a height; the chebakia are there to be dipped.',
    products: ['chebakia'],
    ingredients: ['1 tbsp green tea', 'A large bunch of fresh mint', '600 ml boiling water', 'Honey, to taste', '8 Chebakia'],
    steps: [
      'Rinse the tea with a little boiling water, then add the mint and the rest of the water.',
      'Leave to steep for five minutes.',
      'Sweeten with honey and pour from a height into small glasses.',
      'Serve with chebakia on the same tray.',
    ],
  },
]

export const home = {
  ringFallback: 'MADE IN MOROCCO · ',
  discover: 'Discover the product',
  scroll: 'Scroll to discover',
  statement: {
    eyebrow: comingSoon.label,
    lead: comingSoon.title,
    accent: comingSoon.line,
    body: comingSoon.note,
  },
  bestsellers: { eyebrow: 'From the pantry', title: 'A first look at the pantry', cta: 'See all products' },
  categories: { eyebrow: 'Shop by shelf', title: 'Three shelves of the pantry' },
  story: {
    eyebrow: 'Our story',
    title: 'Our story is still being written.',
    body: comingSoon.line,
    cta: 'Read our story',
  },
  recipes: { eyebrow: 'In the kitchen', title: 'What to make with a jar', cta: 'All recipes' },
  promises: [
    { title: 'Amlou & spreads', body: 'Almond, argan and toasted grain.' },
    { title: 'Argan oil', body: 'Culinary and pure.' },
    { title: 'Zammita', body: 'A traditional Moroccan blend.' },
    { title: 'Moroccan sweets', body: 'Sellou, zammita and chebakia.' },
  ],
}

export const farm = {
  eyebrow: 'Our story',
  title: comingSoon.title,
  intro: comingSoon.line,
  note: {
    eyebrow: comingSoon.label,
    title: 'The full story will live here.',
    body: comingSoon.note,
  },
  stats: [
    { value: 'Amlou', label: 'stone-ground almond spread' },
    { value: 'Argan', label: 'culinary and pure oil' },
    { value: 'Honey', label: 'raw and single-flower' },
    { value: 'Sweets', label: 'zammita and chebakia' },
  ],
  seasonsTitle: 'The Moroccan year',
  seasons: [
    { month: 'Jan', crop: 'Olives, citrus' },
    { month: 'Mar', crop: 'Orange blossom, thyme' },
    { month: 'May', crop: 'Barley, first honey' },
    { month: 'Jun', crop: 'Almonds' },
    { month: 'Aug', crop: 'Figs, sesame' },
    { month: 'Oct', crop: 'Argan kernels' },
    { month: 'Dec', crop: 'Dates, preserved lemons' },
  ],
  kitchenTitle: 'The workshop, coming soon.',
  kitchenBody: 'More about the workshop will be published here. Until then, write to us with any question.',
  visitCta: 'Write to us',
}

export const recipesPage = {
  eyebrow: 'Recipes',
  title: 'Cook with a jar',
  intro: 'Simple dishes from the Moroccan table, each built around something from the pantry.',
  empty: 'No recipes in this course yet.',
}

export const shop = {
  eyebrow: 'The pantry',
  title: 'Everything we make',
  intro: 'Amlou, argan oil and traditional Moroccan sweets, made in small batches.',
  searchLabel: 'Search the pantry',
  searchPlaceholder: 'Amlou, argan, chebakia…',
  all: 'Everything',
  sortLabel: 'Sort by',
  sorts: [
    { id: 'featured', label: 'Featured' },
    { id: 'price-asc', label: 'Price, low to high' },
    { id: 'price-desc', label: 'Price, high to low' },
    { id: 'name', label: 'Name' },
  ],
  empty: { title: 'Nothing on this shelf', body: 'Try another word or clear the filters.', cta: 'Clear filters' },
  stockError: 'We could not check stock just now. Everything is shown as available.',
}

export const productPage = {
  add: 'Add to bag',
  added: 'Added to bag',
  soldOut: 'Sold out',
  lowStock: (n: number) => `Only ${n} left this batch`,
  inStock: 'In stock, ships in 2 days',
  checking: 'Checking stock…',
  sizes: 'Size',
  quantity: 'Quantity',
  ingredients: 'Ingredients',
  pairings: 'Good with',
  recipes: 'Cook with it',
  related: 'From the same shelf',
  notFound: 'We could not find that jar.',
}

export const bag = {
  title: 'Your bag',
  empty: { title: 'Your bag is empty', body: 'The pantry is full, though.', cta: 'Visit the pantry' },
  summary: 'Order summary',
  subtotal: 'Subtotal',
  shipping: 'Delivery',
  discount: 'Discount',
  total: 'Total',
  free: 'Free',
  freeOver: 60,
  freeNote: (left: string) => `Add ${left} more for free delivery`,
  freeDone: 'You have free delivery',
  promoLabel: 'Promo code',
  promoHint: 'Try TAFUKT10',
  promoApply: 'Apply',
  shippingOptions: [
    { id: 'standard', label: 'Standard, 3–5 days', price: 6.9 },
    { id: 'express', label: 'Express, 1–2 days', price: 12.9 },
    { id: 'pickup', label: 'Collect from the workshop', price: 0 },
  ],
  detailsTitle: 'Delivery details',
  fields: { name: 'Full name', email: 'Email', address: 'Street address', city: 'Town or city', postcode: 'Postcode', country: 'Country', note: 'Gift note (optional)' },
  countries: ['Morocco', 'France', 'Spain', 'Germany', 'Belgium', 'Netherlands', 'Italy', 'United Kingdom', 'United States'],
  place: 'Place order',
  demo: 'This is a demo checkout. No payment is taken.',
}

export const order = {
  title: 'Shukran!',
  body: 'Your order is in. We will pack it by hand and email you when it leaves the workshop.',
  reference: 'Order reference',
  missing: 'We could not find that order on this device.',
  again: 'Keep browsing',
  history: 'Earlier orders on this device',
}

export const footer = {
  newsletterTitle: 'Letters from TAFUKT PURE',
  newsletterBody: 'The first letter is being written. Leave your email and we will send it as soon as it is ready.',
  newsletterPlaceholder: 'Your email',
  newsletterCta: 'Subscribe',
  newsletterDone: 'Thank you. You will hear from us soon.',
  columns: [
    { title: 'Shop', links: [{ to: '/shop', label: 'All products' }, { to: '/shop?c=Spreads', label: 'Amlou & spreads' }, { to: '/shop?c=Oils', label: 'Argan oil' }, { to: '/shop?c=Sweets', label: 'Traditional sweets' }] },
    { title: 'House', links: [{ to: '/farm', label: 'Our story' }, { to: '/recipes', label: 'Recipes' }, { to: '/shop', label: 'The pantry' }] },
    { title: 'Help', links: [{ to: '/bag', label: 'Your bag' }, { to: '/styleguide', label: 'Style guide' }] },
  ],
  legal: '© 2026 TAFUKT PURE. A demo storefront: products, prices and photographs are placeholders.',
}

export const notFound = {
  eyebrow: '404',
  title: 'This path leads off the trail',
  body: 'The page you were looking for is not here. Perhaps the sun moved it.',
  cta: 'Back to TAFUKT PURE',
}
