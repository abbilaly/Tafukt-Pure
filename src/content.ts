// Every string, price and piece of seed data for the Cedrina Farm template.
// Edit here first; the pages only lay this out.

/** All imagery routes through this one helper. Swap the files in
 *  public/images (same names) for real photography, or point IMAGE_BASE at a CDN. */
const IMAGE_BASE = '/images'
export const img = (name: string) => `${IMAGE_BASE}/${name}.webp`

export const brand = {
  name: 'Cedrina Farm',
  word: 'Cedrina',
  sub: 'Farm',
  tagline: 'Pestos, preserves and citrus from a family hillside farm',
  place: 'Contrada Cedrina, on the terraces above the sea',
  email: 'ciao@cedrinafarm.example',
  phone: '+39 0000 000 000',
  founded: 1961,
}

export type Currency = 'EUR' | 'USD'
export const currencies: { id: Currency; symbol: string; label: string; rate: number }[] = [
  { id: 'EUR', symbol: '€', label: 'Prices in euro', rate: 1 },
  { id: 'USD', symbol: '$', label: 'Prices in US dollars', rate: 1.09 },
]

export const nav = [
  { to: '/shop', label: 'The larder', note: 'All products' },
  { to: '/farm', label: 'Our farm', note: 'Three generations' },
  { to: '/recipes', label: 'Recipes', note: 'Cook with a jar' },
  { to: '/bag', label: 'Your bag', note: 'Cart and checkout' },
]

export type Category = 'Pesto' | 'Preserves' | 'Citrus'
export const categories: { id: Category; title: string; blurb: string; image: string; tint: string }[] = [
  { id: 'Pesto', title: 'Pesto', blurb: 'Stone-ground at the farm, never heated.', image: 'jar-smeraldo', tint: '#cfe0a6' },
  { id: 'Preserves', title: 'Preserves', blurb: 'Fruit, sugar and patience. Nothing else.', image: 'jar-gelsi', tint: '#b9c0e6' },
  { id: 'Citrus', title: 'Citrus', blurb: 'Crates picked to order, in season.', image: 'box-citrus', tint: '#f9d6a2' },
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
    slug: 'smeraldo',
    aspect: 0.539,
    label: { y: 72, color: '#f6ece2' }, 
    name: 'Smeraldo',
    kind: 'Pistachio pesto',
    category: 'Pesto',
    image: 'jar-smeraldo',
    tint: '#cfe0a6',
    tintInk: '#2c4419',
    ring: 'PISTACCHIO · GROUND BY STONE · ',
    sizes: [
      { id: '190', label: '190 g jar', price: 12.5 },
      { id: '3x190', label: 'Three jars', price: 33 },
    ],
    short: 'Green pistachios, olive oil and a little lemon zest.',
    description:
      'Our best-loved jar. Pistachios from the upper terrace are shelled by hand, ground slowly on stone with our own olive oil and finished with Cedrina lemon zest. Stir it through hot pasta, spread it on warm bread or eat it from the spoon.',
    ingredients: 'Pistachios 60%, extra virgin olive oil, Grana cheese (milk), lemon zest, sea salt.',
    pairings: ['Trofie or busiate pasta', 'Burrata', 'Grilled fish'],
    badges: ['Bestseller', 'Vegetarian'],
    season: 'Harvest in September',
    recipes: ['pistachio-trofie'],
  },
  {
    slug: 'gelsi-neri',
    aspect: 0.564,
    label: { y: 55, color: '#ffffff' }, 
    name: 'Gelsi Neri',
    kind: 'Black mulberry jam',
    category: 'Preserves',
    image: 'jar-gelsi',
    tint: '#b9c0e6',
    tintInk: '#232a5c',
    ring: 'GELSI NERI · PICKED AT DAWN · ',
    sizes: [
      { id: '240', label: '240 g jar', price: 9.5 },
      { id: '3x240', label: 'Three jars', price: 25 },
    ],
    short: 'Dark, tart mulberries from the old tree by the well.',
    description:
      'The mulberry tree by the well is older than the farmhouse. Its fruit stains everything it touches, so we pick in the cool of the morning and cook within the hour, with 70% fruit and a squeeze of lemon to keep it bright.',
    ingredients: 'Black mulberries 70%, cane sugar, lemon juice.',
    pairings: ['Ricotta and toast', 'Crostata', 'Aged pecorino'],
    badges: ['Vegan', 'Extra fruit'],
    season: 'Harvest in June',
    recipes: ['mulberry-crostata'],
  },
  {
    slug: 'arance-a-fette',
    aspect: 0.501,
    label: { y: 56, color: '#ffffff' }, 
    name: 'Arance a Fette',
    kind: 'Sliced orange marmalade',
    category: 'Preserves',
    image: 'jar-arance',
    tint: '#f6b98a',
    tintInk: '#6b2508',
    ring: 'ARANCE A FETTE · WHOLE SLICES · ',
    sizes: [
      { id: '240', label: '240 g jar', price: 8.9 },
      { id: '3x240', label: 'Three jars', price: 23.5 },
    ],
    short: 'Thin rounds of whole orange, bitter peel and all.',
    description:
      'Winter oranges sliced whole and simmered in their own juice until the peel turns to glass. It is less sweet than most marmalades and keeps the gentle bitterness of the pith. Organic, from the lower grove.',
    ingredients: 'Oranges 65%, cane sugar, lemon juice.',
    pairings: ['Butter and sourdough', 'Olive oil cake', 'Dark chocolate'],
    badges: ['Organic', 'Vegan'],
    season: 'Harvest in January',
    recipes: ['orange-olive-oil-cake'],
  },
  {
    slug: 'pesto-rosso',
    aspect: 0.569,
    label: { y: 66, color: '#ffffff' }, 
    name: 'Pesto Rosso',
    kind: 'Tomato and almond pesto',
    category: 'Pesto',
    image: 'jar-rosso',
    tint: '#f2b3a3',
    tintInk: '#6e1a10',
    ring: 'PESTO ROSSO · SUN DRIED · ',
    sizes: [
      { id: '190', label: '190 g jar', price: 9.9 },
      { id: '3x190', label: 'Three jars', price: 26 },
    ],
    short: 'Sun-dried tomatoes, toasted almonds and a pinch of chilli.',
    description:
      'Tomatoes dried on racks in the August sun, pounded with toasted almonds, basil and a little chilli from the kitchen garden. Sweet, smoky and just warm enough.',
    ingredients: 'Sun-dried tomatoes 45%, extra virgin olive oil, almonds, basil, garlic, chilli, sea salt.',
    pairings: ['Bruschetta', 'Roast vegetables', 'Mozzarella'],
    badges: ['Vegan'],
    season: 'Harvest in August',
    recipes: ['pesto-rosso-bruschetta'],
  },
  {
    slug: 'limone',
    aspect: 0.556,
    label: { y: 55, color: '#5c1724' }, 
    name: 'Limone',
    kind: 'Lemon marmalade',
    category: 'Preserves',
    image: 'jar-limone',
    tint: '#f5e39a',
    tintInk: '#4f4006',
    ring: 'LIMONE · CEDRINA LEMONS · ',
    sizes: [
      { id: '240', label: '240 g jar', price: 8.5 },
      { id: '3x240', label: 'Three jars', price: 22.5 },
    ],
    short: 'Fine-shred lemon marmalade, sharp and golden.',
    description:
      'The lemons that gave the farm its name. Unwaxed, cut into fine shreds and set with their own pectin. Bright enough to wake up yoghurt, gentle enough for a breakfast croissant.',
    ingredients: 'Lemons 60%, cane sugar.',
    pairings: ['Greek yoghurt', 'Shortbread', 'Roast chicken glaze'],
    badges: ['Organic', 'Vegan'],
    season: 'Harvest in March',
    recipes: [],
  },
  {
    slug: 'basilico',
    aspect: 0.562,
    label: { y: 55, color: '#f6ece2' }, 
    name: 'Basilico',
    kind: 'Basil and pine nut pesto',
    category: 'Pesto',
    image: 'jar-basilico',
    tint: '#9fc49a',
    tintInk: '#173b1a',
    ring: 'BASILICO · PICKED BY HAND · ',
    sizes: [
      { id: '190', label: '190 g jar', price: 10.5 },
      { id: '3x190', label: 'Three jars', price: 28 },
    ],
    short: 'Young basil leaves, pine nuts and aged cheese.',
    description:
      'We pick the basil young, before it flowers, and pound it the old way with pine nuts, garlic and aged cheese. A summer jar for any time of year.',
    ingredients: 'Basil 50%, extra virgin olive oil, pine nuts, Grana cheese (milk), pecorino (milk), garlic, sea salt.',
    pairings: ['Linguine', 'Minestrone', 'Tomato salad'],
    badges: ['Vegetarian'],
    season: 'Harvest in July',
    recipes: ['pistachio-trofie'],
  },
  {
    slug: 'caponata',
    aspect: 0.526,
    label: { y: 53, color: '#f6ece2' }, 
    name: 'Caponata',
    kind: 'Sweet and sour aubergine',
    category: 'Pesto',
    image: 'jar-caponata',
    tint: '#cdb2d6',
    tintInk: '#3e1946',
    ring: 'CAPONATA · AGRODOLCE · ',
    sizes: [
      { id: '280', label: '280 g jar', price: 11 },
      { id: '3x280', label: 'Three jars', price: 29 },
    ],
    short: 'Aubergine, celery, olives and capers in agrodolce.',
    description:
      'Nonna Rosa’s caponata: aubergines fried in olive oil and cooked down with celery, green olives, capers and a splash of red wine vinegar. Better on the second day, so we let every batch rest before jarring.',
    ingredients: 'Aubergine 55%, tomato, celery, olive oil, green olives, capers, onion, wine vinegar, sugar, sea salt.',
    pairings: ['Crusty bread', 'Grilled lamb', 'Antipasto board'],
    badges: ['Vegan', 'Family recipe'],
    season: 'Harvest in August',
    recipes: [],
  },
  {
    slug: 'fichi-e-noci',
    aspect: 0.553,
    label: { y: 54, color: '#fff6e6' }, 
    name: 'Fichi e Noci',
    kind: 'Fig and walnut preserve',
    category: 'Preserves',
    image: 'jar-fichi',
    tint: '#e8c27a',
    tintInk: '#4e3104',
    ring: 'FICHI E NOCI · LATE SUMMER · ',
    sizes: [
      { id: '240', label: '240 g jar', price: 9.9 },
      { id: '3x240', label: 'Three jars', price: 26 },
    ],
    short: 'Purple figs and walnuts, made for the cheese board.',
    description:
      'Purple figs from the dry terrace cooked slowly with walnuts and a little bay. It is thick, dark and barely sweet, the jar we reach for when there is cheese on the table.',
    ingredients: 'Figs 60%, cane sugar, walnuts 8%, lemon juice, bay leaf.',
    pairings: ['Pecorino and gorgonzola', 'Ricotta crostini', 'Pork roast'],
    badges: ['Vegan'],
    season: 'Harvest in September',
    recipes: ['fig-ricotta-crostini'],
  },
  {
    slug: 'citrus-crate',
    aspect: 1.161,
    
    name: 'Cassetta di Agrumi',
    kind: 'Mixed citrus crate',
    category: 'Citrus',
    image: 'box-citrus',
    tint: '#f9d6a2',
    tintInk: '#5a3000',
    ring: 'AGRUMI · PICKED TO ORDER · ',
    sizes: [
      { id: '3kg', label: '3 kg crate', price: 24 },
      { id: '5kg', label: '5 kg crate', price: 36 },
    ],
    short: 'Lemons and oranges with their leaves, picked the day we ship.',
    description:
      'A wooden crate of unwaxed lemons and oranges, picked the morning it ships and packed with their leaves on. The peel is untreated, so zest away.',
    ingredients: 'Unwaxed lemons and oranges, untreated after harvest.',
    pairings: ['Fresh juice', 'Salt-cured lemons', 'Your own marmalade'],
    badges: ['Organic', 'In season'],
    season: 'November to April',
    recipes: ['orange-olive-oil-cake'],
  },
  {
    slug: 'sanguinelle',
    aspect: 1.122,
    
    name: 'Sanguinelle',
    kind: 'Blood orange crate',
    category: 'Citrus',
    image: 'box-sanguinelle',
    tint: '#f4b1a0',
    tintInk: '#6a120c',
    ring: 'SANGUINELLE · CRIMSON FLESH · ',
    sizes: [
      { id: '3kg', label: '3 kg crate', price: 27 },
      { id: '5kg', label: '5 kg crate', price: 40 },
    ],
    short: 'Blood oranges at their deepest red, for a short season only.',
    description:
      'Cold nights on the hill turn our blood oranges crimson. We pick them only in their few best weeks, when the flesh is dark and the juice tastes of raspberries.',
    ingredients: 'Unwaxed blood oranges, untreated after harvest.',
    pairings: ['Fennel salad', 'Breakfast juice', 'Campari spritz'],
    badges: ['Organic', 'Limited'],
    season: 'January to March',
    recipes: [],
  },
]

/** The hero carousel order. */
export const heroOrder = ['smeraldo', 'gelsi-neri', 'pesto-rosso', 'limone', 'basilico', 'caponata', 'fichi-e-noci', 'arance-a-fette']

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
    slug: 'pistachio-trofie',
    title: 'Trofie with Smeraldo and lemon',
    image: 'r-pasta',
    course: 'Main',
    minutes: 20,
    serves: 4,
    intro: 'The supper we make when the pistachio harvest is in and nobody wants to cook.',
    products: ['smeraldo'],
    ingredients: ['400 g trofie or other short pasta', '1 jar Smeraldo pistachio pesto', '1 unwaxed lemon', 'A handful of shelled pistachios', 'Olive oil and sea salt'],
    steps: [
      'Cook the pasta in well-salted water until just tender. Keep a cup of the cooking water.',
      'Spoon the pesto into a warm bowl and loosen it with three tablespoons of the pasta water.',
      'Drain the pasta, toss it through the pesto and add more water until it coats every piece.',
      'Finish with lemon zest, crushed pistachios and a thread of olive oil.',
    ],
  },
  {
    slug: 'fig-ricotta-crostini',
    title: 'Ricotta crostini with figs and walnuts',
    image: 'r-crostini',
    course: 'Starter',
    minutes: 10,
    serves: 6,
    intro: 'Five minutes, one jar, and the aperitivo is ready.',
    products: ['fichi-e-noci'],
    ingredients: ['1 small sourdough loaf', '250 g fresh ricotta', '½ jar Fichi e Noci', 'A few walnuts', 'Thyme and black pepper'],
    steps: [
      'Slice the bread thinly and toast it until golden at the edges.',
      'Spread each slice with ricotta and season with pepper.',
      'Top with a spoonful of fig preserve, a broken walnut and a few thyme leaves.',
    ],
  },
  {
    slug: 'orange-olive-oil-cake',
    title: 'Olive oil cake with marmalade glaze',
    image: 'r-cake',
    course: 'Sweet',
    minutes: 60,
    serves: 8,
    intro: 'A moist, plain cake that lets the oranges speak. It keeps for days under a cloth.',
    products: ['arance-a-fette', 'citrus-crate'],
    ingredients: ['3 eggs', '200 g sugar', '160 ml extra virgin olive oil', 'Zest and juice of 2 oranges', '220 g flour', '2 tsp baking powder', '½ jar Arance a Fette'],
    steps: [
      'Heat the oven to 175°C and line a 22 cm tin.',
      'Whisk the eggs and sugar until pale, then pour in the oil slowly while whisking.',
      'Add the zest and juice, then fold in the flour and baking powder.',
      'Bake for 40 minutes, until a skewer comes out clean.',
      'Warm the marmalade with a spoon of water and lay the slices over the warm cake.',
    ],
  },
  {
    slug: 'pesto-rosso-bruschetta',
    title: 'Bruschetta with Pesto Rosso and burrata',
    image: 'r-bruschetta',
    course: 'Starter',
    minutes: 15,
    serves: 4,
    intro: 'Grilled bread, a red jar and a soft cheese: the whole of August on a plate.',
    products: ['pesto-rosso'],
    ingredients: ['4 thick slices of country bread', '1 clove garlic', '½ jar Pesto Rosso', '1 burrata', 'Basil leaves and olive oil'],
    steps: [
      'Grill the bread until charred in places and rub it with the cut garlic.',
      'Spread a generous layer of Pesto Rosso over each slice.',
      'Tear the burrata over the top, add basil and finish with olive oil and salt.',
    ],
  },
  {
    slug: 'mulberry-crostata',
    title: 'Black mulberry crostata',
    image: 'r-tart',
    course: 'Sweet',
    minutes: 75,
    serves: 8,
    intro: 'Every Sunday in June. The lattice does not need to be neat.',
    products: ['gelsi-neri'],
    ingredients: ['300 g flour', '150 g cold butter', '100 g sugar', '1 egg and 1 yolk', 'Zest of 1 lemon', '1 jar Gelsi Neri'],
    steps: [
      'Rub the butter into the flour and sugar, then bind with the egg, yolk and lemon zest. Chill for 30 minutes.',
      'Roll two thirds of the pastry into a 24 cm tin and spread the jam over it.',
      'Cut the rest into strips and lay a loose lattice on top.',
      'Bake at 180°C for 35 minutes, until golden. Cool before slicing.',
    ],
  },
]

export const home = {
  ringFallback: 'IN FORMA DI CONSERVA · ',
  discover: 'Discover the product',
  scroll: 'Scroll to discover',
  statement: {
    eyebrow: 'Since 1961',
    lead: 'One hillside above the sea, three generations, and a kitchen that never stops.',
    accent: 'We pick at dawn and jar by noon.',
    body: 'Everything we sell grows on our own terraces: pistachios, citrus, figs, basil and the old mulberry by the well. We cook in small batches in the farmhouse kitchen and ship straight from the farm.',
  },
  bestsellers: { eyebrow: 'From the larder', title: 'The jars we are known for', cta: 'See all products' },
  categories: { eyebrow: 'Shop by shelf', title: 'Three shelves, one farm' },
  story: {
    eyebrow: 'Our farm',
    title: 'The terraces our grandfather built by hand',
    body: 'Nonno Salvatore planted the first lemon trees in 1961 on terraces he walled himself. Today his grandchildren farm the same stones without chemicals, and cook every jar in the kitchen he built.',
    cta: 'Read our story',
  },
  recipes: { eyebrow: 'In the kitchen', title: 'What to make with a jar', cta: 'All recipes' },
  promises: [
    { title: 'Grown by us', body: 'Every ingredient we can grow, we grow on the farm.' },
    { title: 'Small batches', body: 'Cooked in copper pans, 60 jars at a time.' },
    { title: 'Shipped from the farm', body: 'Packed by hand and sent within two days.' },
    { title: 'Free over €60', body: 'Free tracked delivery across Europe above €60.' },
  ],
}

export const farm = {
  eyebrow: 'Our farm',
  title: 'Sixty years on the same terraces',
  intro:
    'Cedrina is a small family farm on a south-facing hillside above the sea. Eleven terraces of citrus, pistachio, fig and olive, a kitchen garden, and a farmhouse kitchen where every jar is still cooked by hand.',
  timeline: [
    { year: '1961', title: 'The first lemon trees', body: 'Salvatore and Rosa buy a ruined hillside, rebuild its dry stone walls and plant forty lemon trees.' },
    { year: '1978', title: 'Rosa’s kitchen', body: 'Rosa starts jarring caponata and marmalade for the village market. The recipes have not changed.' },
    { year: '1996', title: 'Pistachios on the top terrace', body: 'Their son Pietro plants pistachios where nothing else would grow. They take twelve years to crop.' },
    { year: '2011', title: 'Organic, all the way', body: 'The whole farm is certified organic. We swap sprays for ladybirds and hens under the trees.' },
    { year: 'Today', title: 'The third generation', body: 'Giulia and Marco run the farm and the kitchen, and ship across Europe straight from the hill.' },
  ],
  stats: [
    { value: '11', label: 'stone terraces' },
    { value: '1,400', label: 'citrus trees' },
    { value: '60', label: 'jars per batch' },
    { value: '0', label: 'synthetic sprays' },
  ],
  seasonsTitle: 'What grows when',
  seasons: [
    { month: 'Jan', crop: 'Oranges, blood oranges' },
    { month: 'Mar', crop: 'Lemons, wild fennel' },
    { month: 'Jun', crop: 'Black mulberries' },
    { month: 'Jul', crop: 'Basil' },
    { month: 'Aug', crop: 'Tomatoes, aubergines' },
    { month: 'Sep', crop: 'Pistachios, figs' },
    { month: 'Nov', crop: 'Olives, first citrus' },
  ],
  kitchenTitle: 'The farmhouse kitchen',
  kitchenBody:
    'Our kitchen is a converted olive store at the bottom of the hill. We cook in copper pans, sixty jars at a time, and label every batch with the day it was made. Visitors are welcome on Saturday mornings from April to October.',
  visitCta: 'Write to arrange a visit',
}

export const recipesPage = {
  eyebrow: 'Recipes',
  title: 'Cook with a jar',
  intro: 'Simple dishes from the farmhouse table, each built around something from the larder.',
  empty: 'No recipes in this course yet.',
}

export const shop = {
  eyebrow: 'The larder',
  title: 'Everything from the hill',
  intro: 'Pestos, preserves and fresh citrus, cooked and packed by hand at the farm.',
  searchLabel: 'Search the larder',
  searchPlaceholder: 'Pistachio, lemon, fig…',
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
  empty: { title: 'Your bag is empty', body: 'The larder is full, though.', cta: 'Visit the larder' },
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
  promoHint: 'Try CEDRINA10',
  promoApply: 'Apply',
  shippingOptions: [
    { id: 'standard', label: 'Standard, 3–5 days', price: 6.9 },
    { id: 'express', label: 'Express, 1–2 days', price: 12.9 },
    { id: 'pickup', label: 'Collect at the farm', price: 0 },
  ],
  detailsTitle: 'Delivery details',
  fields: { name: 'Full name', email: 'Email', address: 'Street address', city: 'Town or city', postcode: 'Postcode', country: 'Country', note: 'Gift note (optional)' },
  countries: ['Italy', 'France', 'Germany', 'Spain', 'Netherlands', 'Belgium', 'Austria', 'United Kingdom', 'United States'],
  place: 'Place order',
  demo: 'This is a demo checkout. No payment is taken.',
}

export const order = {
  title: 'Grazie!',
  body: 'Your order is in. We will pack it by hand and email you when it leaves the farm.',
  reference: 'Order reference',
  missing: 'We could not find that order on this device.',
  again: 'Keep browsing',
  history: 'Earlier orders on this device',
}

export const footer = {
  newsletterTitle: 'Letters from the hill',
  newsletterBody: 'One email a season: what is ripe, what is new in the larder, and a recipe.',
  newsletterPlaceholder: 'Your email',
  newsletterCta: 'Subscribe',
  newsletterDone: 'Thank you. The next letter goes out with the first oranges.',
  columns: [
    { title: 'Shop', links: [{ to: '/shop', label: 'All products' }, { to: '/shop?c=Pesto', label: 'Pesto' }, { to: '/shop?c=Preserves', label: 'Preserves' }, { to: '/shop?c=Citrus', label: 'Citrus' }] },
    { title: 'Farm', links: [{ to: '/farm', label: 'Our story' }, { to: '/recipes', label: 'Recipes' }, { to: '/farm#visit', label: 'Visit us' }] },
    { title: 'Help', links: [{ to: '/bag', label: 'Your bag' }, { to: '/styleguide', label: 'Style guide' }] },
  ],
  legal: '© 2026 Cedrina Farm. A demo template: names, products and photos are placeholders.',
}

export const notFound = {
  eyebrow: '404',
  title: 'This path leads off the terrace',
  body: 'The page you were looking for is not here. Perhaps it was eaten.',
  cta: 'Back to the farm',
}
