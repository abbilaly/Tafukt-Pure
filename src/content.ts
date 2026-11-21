// Every string, price and piece of seed data for the TAFUKT PURE storefront.
// Edit here first; the pages only lay this out.

/** All imagery routes through this one helper. Swap the files in
 *  public/images (same names) for real photography, or point IMAGE_BASE at a CDN. */
const IMAGE_BASE = '/images'
export const img = (name: string) => `${IMAGE_BASE}/${name}.webp`

export const brand = {
  name: 'TAFUKT PURE',
  word: 'Tafukt',
  sub: 'Pure',
  tagline: 'Moroccan natural products, made in small batches',
  place: 'Morocco',
  email: 'hello@tafuktpure.example',
  phone: '+212 0000 00000',
  founded: 2026,
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
  { id: 'Spreads', title: 'Amlou & spreads', blurb: 'Almonds and argan, ground slowly.', image: 'jar-smeraldo', tint: '#dcc9a0' },
  { id: 'Oils', title: 'Argan oil', blurb: 'Pressed in small lots, for the kitchen and the skin.', image: 'jar-limone', tint: '#e2d3a8' },
  { id: 'Sweets', title: 'Honey & sweets', blurb: 'Raw honey, sellou, zammita and chebakia.', image: 'jar-gelsi', tint: '#e6d0a4' },
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
    aspect: 0.539,
    label: { y: 72, color: '#f6ece2' },
    name: 'Amlou Beldi',
    kind: 'Almond & argan spread',
    category: 'Spreads',
    image: 'jar-smeraldo',
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
    slug: 'zammita',
    aspect: 0.526,
    label: { y: 53, color: '#f6ece2' },
    name: 'Zammita',
    kind: 'Toasted grain & almond blend',
    category: 'Spreads',
    image: 'jar-caponata',
    tint: '#cbb894',
    tintInk: '#3a2f1c',
    ring: 'ZAMMITA · TOASTED GRAIN · ',
    sizes: [
      { id: '280', label: '280 g jar', price: 11 },
      { id: '3x280', label: 'Three jars', price: 29 },
    ],
    short: 'A toasted blend of grains, almonds and sesame.',
    description:
      'Zammita tastes of a Moroccan morning: barley and chickpeas toasted until nutty, ground with almonds and sesame, then brought together with a little honey. Serve it with olive oil and bread, or loosen it with warm milk.',
    ingredients: 'Toasted barley, chickpeas, almonds, sesame, honey, sea salt.',
    pairings: ['Olive oil and bread', 'Warm milk', 'Dates'],
    badges: ['Traditional'],
    season: 'Made in small batches',
    recipes: ['sellou-dates'],
  },
  {
    slug: 'argan-grille',
    aspect: 0.556,
    label: { y: 55, color: '#5c1724' },
    name: 'Argan Grillé',
    kind: 'Toasted culinary argan oil',
    category: 'Oils',
    image: 'jar-limone',
    tint: '#e3cf9d',
    tintInk: '#4a3a12',
    ring: 'ARGAN · TOASTED · ',
    sizes: [
      { id: '100', label: '100 ml bottle', price: 24 },
      { id: '250', label: '250 ml bottle', price: 36 },
    ],
    short: 'Argan kernels roasted for a deep, nutty taste.',
    description:
      'Roasted argan kernels pressed slowly for the kitchen. Nutty and generous, it finishes salads, couscous and grilled vegetables, and it is the oil that gives amlou its character.',
    ingredients: '100% toasted argan oil.',
    pairings: ['Couscous', 'Salads', 'Amlou'],
    badges: ['Culinary'],
    season: 'Pressed in small lots',
    recipes: ['argan-couscous'],
  },
  {
    slug: 'argan-pur',
    aspect: 0.569,
    label: { y: 66, color: '#ffffff' },
    name: 'Argan Pur',
    kind: 'Pure argan oil',
    category: 'Oils',
    image: 'jar-rosso',
    tint: '#d8d2b8',
    tintInk: '#33301c',
    ring: 'ARGAN · UNROASTED · ',
    sizes: [
      { id: '100', label: '100 ml bottle', price: 27 },
      { id: '250', label: '250 ml bottle', price: 40 },
    ],
    short: 'Unroasted argan oil, pressed clear and light.',
    description:
      'Unroasted kernels pressed without heat for a clear, light oil with a mild scent. A few drops on the skin, or in a dressing when you want the other ingredients to lead.',
    ingredients: '100% pure argan oil.',
    pairings: ['Skin and hair', 'Salad dressings', 'Fresh cheese'],
    badges: ['Unroasted'],
    season: 'Pressed in small lots',
    recipes: [],
  },
  {
    slug: 'miel-thym',
    aspect: 0.564,
    label: { y: 55, color: '#ffffff' },
    name: 'Miel de Thym',
    kind: 'Thyme honey',
    category: 'Sweets',
    image: 'jar-gelsi',
    tint: '#e8cf94',
    tintInk: '#4c3a0d',
    ring: 'THYM · DARK HONEY · ',
    sizes: [
      { id: '240', label: '240 g jar', price: 9.5 },
      { id: '3x240', label: 'Three jars', price: 25 },
    ],
    short: 'Dark, aromatic honey from thyme in flower.',
    description:
      'Collected when the thyme is in flower, this honey is dark, thick and resinous. Spoon it over goat cheese, stir it into hot water with lemon, or use it to glaze a roast.',
    ingredients: '100% thyme honey.',
    pairings: ['Goat cheese', 'Lemon tea', 'Roast carrots'],
    badges: ['Raw'],
    season: 'Harvest in spring',
    recipes: [],
  },
  {
    slug: 'miel-oranger',
    aspect: 0.501,
    label: { y: 56, color: '#ffffff' },
    name: "Miel d'Oranger",
    kind: 'Orange blossom honey',
    category: 'Sweets',
    image: 'jar-arance',
    tint: '#efd9a8',
    tintInk: '#4a3610',
    ring: 'ORANGE BLOSSOM · PALE HONEY · ',
    sizes: [
      { id: '240', label: '240 g jar', price: 8.9 },
      { id: '3x240', label: 'Three jars', price: 23.5 },
    ],
    short: 'Pale, fragrant honey from orange blossom.',
    description:
      'Orange blossom gives this honey its pale gold colour and the scent of a grove in April. Delicate enough for yoghurt and pastries, and the honey we use in chebakia.',
    ingredients: '100% orange blossom honey.',
    pairings: ['Yoghurt', 'Pastries', 'Mint tea'],
    badges: ['Raw'],
    season: 'Harvest in spring',
    recipes: ['chebakia-tea'],
  },
  {
    slug: 'sellou',
    aspect: 0.553,
    label: { y: 54, color: '#fff6e6' },
    name: 'Sellou',
    kind: 'Roasted flour & almond sweet',
    category: 'Sweets',
    image: 'jar-fichi',
    tint: '#dcc39a',
    tintInk: '#453015',
    ring: 'SELLOU · TOASTED FLOUR · ',
    sizes: [
      { id: '280', label: '280 g jar', price: 9.9 },
      { id: '3x280', label: 'Three jars', price: 26 },
    ],
    short: 'Toasted flour, almonds and sesame, ground fine.',
    description:
      'Sellou is made from flour toasted until it smells of hazelnut, ground with almonds, sesame and anise, then bound with honey and a little butter. Serve it in small mounds with mint tea, or with dates.',
    ingredients: 'Toasted flour, almonds, sesame, honey, butter (milk), anise, cinnamon.',
    pairings: ['Mint tea', 'Dates', 'Coffee'],
    badges: ['Traditional'],
    season: 'Made in small batches',
    recipes: ['sellou-dates'],
  },
  {
    slug: 'chebakia',
    aspect: 0.562,
    label: { y: 55, color: '#f6ece2' },
    name: 'Chebakia',
    kind: 'Sesame & honey cookie',
    category: 'Sweets',
    image: 'jar-basilico',
    tint: '#d9a97f',
    tintInk: '#4d2410',
    ring: 'CHEBAKIA · SESAME & HONEY · ',
    sizes: [
      { id: '300', label: '300 g box', price: 10.5 },
      { id: '3x300', label: 'Three boxes', price: 28 },
    ],
    short: 'Rose-shaped sesame cookies soaked in honey.',
    description:
      'Folded ribbons of dough with toasted sesame and anise, fried until crisp and dipped in warm honey with orange blossom. Chebakia keeps for weeks in a tin and is made for mint tea.',
    ingredients: 'Flour, sesame, honey, butter (milk), anise, cinnamon, orange blossom water, saffron.',
    pairings: ['Mint tea', 'Coffee', 'Ramadan table'],
    badges: ['Traditional'],
    season: 'Made in small batches',
    recipes: ['chebakia-tea'],
  },
]

/** The hero carousel order. */
export const heroOrder = ['amlou-beldi', 'miel-thym', 'argan-grille', 'chebakia', 'zammita', 'miel-oranger', 'sellou', 'argan-pur']

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
    ingredients: ['8 msemen or other flatbreads', '1 jar Amlou Beldi', 'Honey, to taste', 'Toasted sesame', 'Mint tea, to serve'],
    steps: [
      'Warm the msemen on a dry pan until soft and lightly golden.',
      'Spoon amlou over each one and spread it to the edges while the bread is warm.',
      'Add a thread of honey and a pinch of sesame.',
      'Fold and eat straight away, with mint tea.',
    ],
  },
  {
    slug: 'sellou-dates',
    title: 'Sellou with dates and walnuts',
    image: 'r-bruschetta',
    course: 'Sweet',
    minutes: 10,
    serves: 6,
    intro: 'A small bowl of sellou, a few dates and a glass of tea: the shortest route to an afternoon.',
    products: ['sellou', 'zammita'],
    ingredients: ['6 tbsp Sellou', '12 Medjool dates', 'A handful of walnuts', 'A pinch of cinnamon', 'Mint tea, to serve'],
    steps: [
      'Spoon the sellou into small bowls and smooth the top.',
      'Dust with cinnamon and scatter over broken walnuts.',
      'Pit the dates and set them alongside.',
      'Serve with mint tea.',
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
    products: ['argan-grille'],
    ingredients: ['300 g couscous', '400 ml vegetable stock', '1 courgette and 1 carrot', 'A handful of chickpeas', '3 tbsp Argan Grillé', 'Salt and black pepper'],
    steps: [
      'Pour the hot stock over the couscous, cover and leave for ten minutes.',
      'Steam or pan-fry the vegetables until tender, then fold in the chickpeas.',
      'Fluff the couscous with a fork and season.',
      'Take the pan off the heat and stir through the argan oil just before serving.',
    ],
  },
  {
    slug: 'orange-blossom-cake',
    title: 'Orange blossom cake with honey',
    image: 'r-cake',
    course: 'Sweet',
    minutes: 60,
    serves: 8,
    intro: 'A plain, fragrant cake that keeps for days under a cloth.',
    products: ['miel-oranger'],
    ingredients: ['3 eggs', '150 g honey', '120 ml olive oil', 'Zest of 1 orange', '1 tbsp orange blossom water', '220 g flour', '2 tsp baking powder'],
    steps: [
      'Heat the oven to 175°C and line a 22 cm tin.',
      'Whisk the eggs and honey until pale, then pour in the oil slowly.',
      'Add the zest, orange blossom water, flour and baking powder and fold gently.',
      'Bake for 40 minutes, until a skewer comes out clean.',
      'Warm a spoon of honey with a little water and brush it over the warm cake.',
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
    products: ['chebakia', 'miel-oranger'],
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
    eyebrow: 'Morocco, made by hand',
    lead: 'Amlou, argan oil and honey from Morocco, made slowly and in small quantities.',
    accent: 'The sun, in a jar.',
    body: 'TAFUKT PURE gathers the everyday luxuries of the Moroccan table: stone-ground amlou, pressed argan oil, raw honey and the sweets we grew up with. Small batches, honest ingredients, and nothing added to hurry them.',
  },
  bestsellers: { eyebrow: 'From the pantry', title: 'The jars we are known for', cta: 'See all products' },
  categories: { eyebrow: 'Shop by shelf', title: 'Three shelves, one land' },
  story: {
    eyebrow: 'Our story',
    title: 'The sun, the almond and the argan tree',
    body: 'Tafukt means sun in Amazigh. Our emblem sets that sun inside the geometry of Amazigh craft: a mark for a house built on Moroccan ingredients, made slowly and by hand.',
    cta: 'Read our story',
  },
  recipes: { eyebrow: 'In the kitchen', title: 'What to make with a jar', cta: 'All recipes' },
  promises: [
    { title: 'Natural ingredients', body: 'Nuts, argan oil, honey and grain: ingredients we can name.' },
    { title: 'Small batches', body: 'Made in short runs and filled by hand.' },
    { title: 'Traditional methods', body: 'Slow toasting, stone grinding, hand folding.' },
    { title: 'Packed with care', body: 'Sealed, labelled and sent from Morocco.' },
  ],
}

export const farm = {
  eyebrow: 'Our story',
  title: 'Rooted in Morocco, made by hand',
  intro:
    'TAFUKT PURE brings together amlou, argan oil, honey and the sweets of the Moroccan table. We work in small quantities, with traditional methods and ingredients we can name, and we keep every jar close to the way it is made at home.',
  timeline: [
    { year: 'Amlou', title: 'Almonds, argan, honey', body: 'Almonds are toasted and ground slowly so the paste stays soft and the oils stay warm. Nothing is added to stretch it.' },
    { year: 'Argan', title: 'Pressed in small lots', body: 'Kernels are roasted, ground and pressed in short runs, so each bottle keeps its own character.' },
    { year: 'Honey', title: 'Chosen by flower and season', body: 'We pick honeys by the flower they come from and leave them raw, so their perfume stays intact.' },
    { year: 'Sweets', title: 'Recipes from the family table', body: 'Sellou, zammita and chebakia are made to the recipes we grew up with, a batch at a time.' },
    { year: 'Tafukt', title: 'The name', body: 'Tafukt means sun in Amazigh. Our emblem joins that sun with the geometry of Amazigh craft.' },
  ],
  stats: [
    { value: 'Amlou', label: 'stone-ground almond spread' },
    { value: 'Argan', label: 'culinary and pure oil' },
    { value: 'Honey', label: 'raw and single-flower' },
    { value: 'Sweets', label: 'sellou, zammita, chebakia' },
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
  kitchenTitle: 'The workshop',
  kitchenBody:
    'Everything is made in small quantities: nuts toasted and ground the same day, honey warmed just enough to pour, cookies folded by hand. Jars are filled, labelled and checked one at a time.',
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
  intro: 'Amlou, argan oil, honey and traditional Moroccan sweets, made in small batches.',
  searchLabel: 'Search the pantry',
  searchPlaceholder: 'Amlou, argan, honey…',
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
  newsletterTitle: 'Letters from Morocco',
  newsletterBody: 'One email a season: what is in season, what is new in the pantry, and a recipe.',
  newsletterPlaceholder: 'Your email',
  newsletterCta: 'Subscribe',
  newsletterDone: 'Thank you. The next letter goes out with the first oranges.',
  columns: [
    { title: 'Shop', links: [{ to: '/shop', label: 'All products' }, { to: '/shop?c=Spreads', label: 'Amlou & spreads' }, { to: '/shop?c=Oils', label: 'Argan oil' }, { to: '/shop?c=Sweets', label: 'Honey & sweets' }] },
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
