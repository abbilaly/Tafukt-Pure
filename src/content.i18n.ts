// The bilingual layer. English lives in content.ts; this file adds the Arabic
// copy for every screen plus the helpers that localise products and recipes.
// Structure (slugs, prices, images) stays shared; only text changes.
import {
  bag,
  brand,
  categories,
  farm,
  footer,
  home,
  nav,
  notFound,
  order,
  productPage,
  products,
  recipes,
  recipesPage,
  shop,
  type Category,
  type Course,
  type Product,
  type Recipe,
} from './content'

export type Lang = 'en' | 'ar'
export const LANGS: { id: Lang; label: string; short: string }[] = [
  { id: 'en', label: 'English', short: 'EN' },
  { id: 'ar', label: 'العربية', short: 'ع' },
]

const uiEn = {
  menu: 'Menu',
  closeMenu: 'Close menu',
  menuLabel: 'Menu',
  home: 'Home',
  homeNote: 'Back to the source',
  mainNav: 'Main',
  skip: 'Skip to content',
  language: 'Language',
  currency: 'Currency',
  openBag: (n: number) => `Open bag, ${n} ${n === 1 ? 'item' : 'items'}`,
  closeBag: 'Close bag',
  reviewCheckout: 'Review and check out',
  dismiss: 'Dismiss',
  productsCount: (n: number) => `${n} ${n === 1 ? 'product' : 'products'}`,
  checkingStock: 'checking stock…',
  shelf: 'Shelf',
  clearSearch: 'Clear search',
  viewProduct: 'View product',
  showProduct: (name: string) => `Show ${name}`,
  featuredJars: 'Featured jars',
  showing: (name: string, kind: string, i: number, n: number) => `Showing ${name}, ${kind}. ${i} of ${n}.`,
  addToBag: (name: string) => `Add ${name} to bag`,
  addedToast: (name: string) => `${name} added to your bag`,
  soldOut: 'Sold out',
  soldOutToast: (name: string) => `${name} is sold out`,
  onlyLeft: (n: number) => `Only ${n} left`,
  quantityOf: (name: string) => `Quantity of ${name}`,
  removeItem: (name: string) => `Remove ${name}`,
  decrease: 'Decrease quantity',
  increase: 'Increase quantity',
  viewBag: 'View your bag',
  addShort: 'Add',
  minutes: (n: number) => `${n} min`,
  serves: (n: number) => `Serves ${n}`,
  ingredients: 'Ingredients',
  method: 'Method',
  tickSteps: 'Tick each step as you go.',
  tryAnotherCourse: 'Try another course.',
  fromLarder: 'From the pantry',
  allCourses: 'All courses',
  courseLabel: 'Course',
  courses: { Starter: 'Starter', Main: 'Main', Sweet: 'Sweet' } as Record<Course, string>,
  recipeNotFound: 'We could not find that recipe.',
  keepShopping: 'Keep shopping',
  itemsHeading: 'Items',
  collectNote: 'Collect from the workshop by arrangement.',
  removePromo: 'Remove promo code',
  theLarder: 'The pantry',
  orderWord: 'Order',
  orderNotFound: 'Order not found',
  confirmationTo: (email: string) => `Confirmation to ${email}`,
  confirmed: (ref: string) => `Order ${ref} confirmed`,
  season: 'Season',
  nextBatch: 'The next batch is being made.',
  shopTheLarder: 'Shop the pantry',
  visitEyebrow: 'Visit',
  seasonsEyebrow: 'The year in Morocco',
  dayLabel: 'of',
  homeCrumb: 'Back to the shop',
}

export const en = {
  brand,
  nav,
  categories,
  home,
  farm,
  recipesPage,
  shop,
  productPage,
  bag,
  order,
  footer,
  notFound,
  ui: uiEn,
}

export type Copy = typeof en

const uiAr: Copy['ui'] = {
  menu: 'القائمة',
  closeMenu: 'إغلاق القائمة',
  menuLabel: 'القائمة',
  home: 'الرئيسية',
  homeNote: 'عودة إلى الأصل',
  mainNav: 'التنقّل الرئيسي',
  skip: 'تخطَّ إلى المحتوى',
  language: 'اللغة',
  currency: 'العملة',
  openBag: (n) => `افتح السلّة، ${n} ${n === 1 ? 'منتج' : 'منتجات'}`,
  closeBag: 'إغلاق السلّة',
  reviewCheckout: 'المراجعة وإتمام الطلب',
  dismiss: 'إغلاق',
  productsCount: (n) => (n === 1 ? 'منتج واحد' : `${n} منتجات`),
  checkingStock: 'جارٍ التحقق من المخزون…',
  shelf: 'الرف',
  clearSearch: 'مسح البحث',
  viewProduct: 'عرض المنتج',
  showProduct: (name) => `اعرض ${name}`,
  featuredJars: 'برطمانات مختارة',
  showing: (name, kind, i, n) => `يُعرض ${name}، ${kind}. ${i} من ${n}`,
  addToBag: (name) => `أضف ${name} إلى السلّة`,
  addedToast: (name) => `أُضيف ${name} إلى سلّتك`,
  soldOut: 'نفدت الكمية',
  soldOutToast: (name) => `${name} نفدت كميته`,
  onlyLeft: (n) => `بقي ${n} فقط`,
  quantityOf: (name) => `كمية ${name}`,
  removeItem: (name) => `إزالة ${name}`,
  decrease: 'تقليل الكمية',
  increase: 'زيادة الكمية',
  viewBag: 'اعرض سلّتك',
  addShort: 'أضف',
  minutes: (n) => `${n} دقيقة`,
  serves: (n) => `يكفي ${n}`,
  ingredients: 'المكوّنات',
  method: 'الطريقة',
  tickSteps: 'علّم كل خطوة أثناء العمل.',
  tryAnotherCourse: 'جرّب قسمًا آخر.',
  fromLarder: 'من المؤونة',
  allCourses: 'كل الأقسام',
  courseLabel: 'القسم',
  courses: { Starter: 'مقبّلات', Main: 'أطباق رئيسية', Sweet: 'حلويات' },
  recipeNotFound: 'لم نجد هذه الوصفة.',
  keepShopping: 'واصل التسوّق',
  itemsHeading: 'المنتجات',
  collectNote: 'الاستلام من الورشة بموعد مسبق.',
  removePromo: 'إزالة رمز الخصم',
  theLarder: 'المؤونة',
  orderWord: 'طلب',
  orderNotFound: 'الطلب غير موجود',
  confirmationTo: (email) => `تأكيد على ${email}`,
  confirmed: (ref) => `تم تأكيد الطلب ${ref}`,
  season: 'الموسم',
  nextBatch: 'الدفعة التالية قيد الإعداد.',
  shopTheLarder: 'تسوّق المؤونة',
  visitEyebrow: 'زيارة',
  seasonsEyebrow: 'العام في المغرب',
  dayLabel: 'من',
  homeCrumb: 'عودة إلى المتجر',
}

const catAr: Record<Category, { title: string; blurb: string }> = {
  Spreads: { title: 'أملو ومنتجات الدهن', blurb: 'لوز وأركان، مطحونان على مهل.' },
  Oils: { title: 'زيت الأركان', blurb: 'معصور بكميات صغيرة، للمطبخ والبشرة.' },
  Sweets: { title: 'عسل وحلويات', blurb: 'عسل خام، سلو، زمّيطة وشباكية.' },
}

export const ar: Copy = {
  brand: {
    ...brand,
    name: 'تفوكت بيور',
    tagline: 'منتجات مغربية طبيعية',
    place: 'المغرب',
  },
  nav: [
    { to: '/shop', label: 'المؤونة', note: 'كل المنتجات' },
    { to: '/farm', label: 'قصتنا', note: 'من قلب المغرب' },
    { to: '/recipes', label: 'وصفات', note: 'من المائدة المغربية' },
    { to: '/bag', label: 'سلّتك', note: 'السلة والدفع' },
  ],
  categories: categories.map((c) => ({ ...c, ...catAr[c.id] })),
  home: {
    ringFallback: 'صُنع في المغرب · ',
    discover: 'تعرّف على المنتج',
    scroll: 'انزل للاكتشاف',
    statement: {
      eyebrow: 'قريباً',
      lead: 'شيء جميل قادم قريباً.',
      accent: 'تجربة جديدة مستوحاة من روح التراث المغربي.',
      body: 'قصة تفوكت بيور قيد الكتابة. وإلى أن تكتمل، المؤونة مفتوحة.',
    },
    bestsellers: { eyebrow: 'من المؤونة', title: 'لمحة أولى من المؤونة', cta: 'كل المنتجات' },
    categories: { eyebrow: 'تسوّق حسب الرف', title: 'ثلاثة رفوف من المؤونة' },
    story: {
      eyebrow: 'قصتنا',
      title: 'قصتنا قيد الكتابة.',
      body: 'تجربة جديدة مستوحاة من روح التراث المغربي.',
      cta: 'اقرأ قصتنا',
    },
    recipes: { eyebrow: 'في المطبخ', title: 'ماذا تصنع ببرطمان', cta: 'كل الوصفات' },
    promises: [
      { title: 'أملو ومنتجات الدهن', body: 'لوز وأركان وحبوب محمّصة.' },
      { title: 'زيت الأركان', body: 'للطبخ وللعناية.' },
      { title: 'عسل', body: 'زعتر وزهر البرتقال.' },
      { title: 'حلويات مغربية', body: 'سلو وزمّيطة وشباكية.' },
    ],
  },
  farm: {
    eyebrow: 'قصتنا',
    title: 'شيء جميل قادم قريباً.',
    intro: 'تجربة جديدة مستوحاة من روح التراث المغربي.',
    note: {
      eyebrow: 'قريباً',
      title: 'ستُروى القصة كاملة هنا.',
      body: 'قصة تفوكت بيور قيد الكتابة. وإلى أن تكتمل، المؤونة مفتوحة.',
    },
    stats: [
      { value: 'أملو', label: 'معجون اللوز المطحون على الحجر' },
      { value: 'أركان', label: 'زيت للطبخ وللعناية' },
      { value: 'عسل', label: 'خام وأحادي الزهرة' },
      { value: 'حلويات', label: 'سلو، زمّيطة، شباكية' },
    ],
    seasonsTitle: 'العام في المغرب',
    seasons: [
      { month: 'يناير', crop: 'زيتون وحمضيات' },
      { month: 'مارس', crop: 'زهر البرتقال والزعتر' },
      { month: 'مايو', crop: 'شعير وأول العسل' },
      { month: 'يونيو', crop: 'لوز' },
      { month: 'أغسطس', crop: 'تين وسمسم' },
      { month: 'أكتوبر', crop: 'نوى الأركان' },
      { month: 'ديسمبر', crop: 'تمر وليمون مملّح' },
    ],
    kitchenTitle: 'الورشة، قريباً.',
    kitchenBody: 'سيُضاف المزيد عن الورشة هنا. وإلى ذلك الحين، اكتب إلينا بأي سؤال.',
    visitCta: 'اكتب لنا',
  },
  recipesPage: {
    eyebrow: 'وصفات',
    title: 'اطبخ ببرطمان',
    intro: 'أطباق بسيطة من المائدة المغربية، كل واحد منها مبني على شيء من المؤونة.',
    empty: 'لا توجد وصفات في هذا القسم بعد.',
  },
  shop: {
    eyebrow: 'المؤونة',
    title: 'كل ما نصنعه',
    intro: 'أملو وزيت أركان وعسل وحلويات مغربية تقليدية، تُصنع بكميات صغيرة.',
    searchLabel: 'ابحث في المؤونة',
    searchPlaceholder: 'أملو، أركان، عسل…',
    all: 'الكل',
    sortLabel: 'ترتيب حسب',
    sorts: [
      { id: 'featured', label: 'المميّزة' },
      { id: 'price-asc', label: 'السعر، من الأقل' },
      { id: 'price-desc', label: 'السعر، من الأعلى' },
      { id: 'name', label: 'الاسم' },
    ],
    empty: { title: 'لا شيء على هذا الرف', body: 'جرّب كلمة أخرى أو امسح عوامل التصفية.', cta: 'مسح التصفية' },
    stockError: 'لم نتمكّن من التحقق من المخزون الآن. يظهر كل شيء كمتوفّر.',
  },
  productPage: {
    add: 'أضف إلى السلّة',
    added: 'أُضيف إلى السلّة',
    soldOut: 'نفدت الكمية',
    lowStock: (n) => `بقيت ${n} فقط من هذه الدفعة`,
    inStock: 'متوفّر، يُشحَن خلال يومين',
    checking: 'جارٍ التحقق من المخزون…',
    sizes: 'الحجم',
    quantity: 'الكمية',
    ingredients: 'المكوّنات',
    pairings: 'يليق مع',
    recipes: 'اطبخ به',
    related: 'من الرف نفسه',
    notFound: 'لم نجد هذا البرطمان.',
  },
  bag: {
    ...bag,
    title: 'سلّتك',
    empty: { title: 'سلّتك فارغة', body: 'لكن المؤونة ممتلئة.', cta: 'زُر المؤونة' },
    summary: 'ملخّص الطلب',
    subtotal: 'المجموع الفرعي',
    shipping: 'التوصيل',
    discount: 'الخصم',
    total: 'الإجمالي',
    free: 'مجاني',
    freeNote: (left) => `أضف ${left} لتحصل على توصيل مجاني`,
    freeDone: 'لديك توصيل مجاني',
    promoLabel: 'رمز الخصم',
    promoHint: 'جرّب TAFUKT10',
    promoApply: 'تطبيق',
    shippingOptions: [
      { id: 'standard', label: 'عادي، 3–5 أيام', price: 6.9 },
      { id: 'express', label: 'سريع، 1–2 يوم', price: 12.9 },
      { id: 'pickup', label: 'الاستلام من الورشة', price: 0 },
    ],
    detailsTitle: 'بيانات التوصيل',
    fields: {
      name: 'الاسم الكامل',
      email: 'البريد الإلكتروني',
      address: 'عنوان الشارع',
      city: 'المدينة أو البلدة',
      postcode: 'الرمز البريدي',
      country: 'الدولة',
      note: 'بطاقة إهداء (اختياري)',
    },
    place: 'إتمام الطلب',
    demo: 'هذا دفع تجريبي. لا يُخصَم أي مبلغ.',
  },
  order: {
    title: 'شكرًا!',
    body: 'وصلنا طلبك. سنحزمه باليد ونراسلك بالبريد حين يغادر الورشة.',
    reference: 'رقم الطلب',
    missing: 'لم نجد هذا الطلب على هذا الجهاز.',
    again: 'واصل التسوّق',
    history: 'طلبات سابقة على هذا الجهاز',
  },
  footer: {
    newsletterTitle: 'رسائل من تفوكت بيور',
    newsletterBody: 'الرسالة الأولى قيد الكتابة. اترك بريدك ونرسلها إليك حين تكون جاهزة.',
    newsletterPlaceholder: 'بريدك الإلكتروني',
    newsletterCta: 'اشترك',
    newsletterDone: 'شكرًا لك. سنراسلك قريبًا.',
    columns: [
      {
        title: 'المتجر',
        links: [
          { to: '/shop', label: 'كل المنتجات' },
          { to: '/shop?c=Spreads', label: 'أملو ومنتجات الدهن' },
          { to: '/shop?c=Oils', label: 'زيت الأركان' },
          { to: '/shop?c=Sweets', label: 'عسل وحلويات' },
        ],
      },
      {
        title: 'الدار',
        links: [
          { to: '/farm', label: 'قصتنا' },
          { to: '/recipes', label: 'وصفات' },
          { to: '/shop', label: 'المؤونة' },
        ],
      },
      {
        title: 'المساعدة',
        links: [
          { to: '/bag', label: 'سلّتك' },
          { to: '/styleguide', label: 'دليل الأنماط' },
        ],
      },
    ],
    legal: '© 2026 تفوكت بيور. متجر تجريبي: المنتجات والأسعار والصور نماذج فقط.',
  },
  notFound: {
    eyebrow: '404',
    title: 'هذا الدرب يخرج عن الطريق',
    body: 'الصفحة التي تبحث عنها ليست هنا. ربما حرّكتها الشمس.',
    cta: 'عودة إلى تفوكت بيور',
  },
  ui: uiAr,
}

export const copy: Record<Lang, Copy> = { en, ar }

/** Arabic shop-country names; the submitted value stays the English name so
 *  the Worker keeps validating against bag.countries. */
export const countryNamesAr: Record<string, string> = {
  Morocco: 'المغرب',
  France: 'فرنسا',
  Spain: 'إسبانيا',
  Germany: 'ألمانيا',
  Belgium: 'بلجيكا',
  Netherlands: 'هولندا',
  Italy: 'إيطاليا',
  'United Kingdom': 'المملكة المتحدة',
  'United States': 'الولايات المتحدة',
}

export const promoLabelsAr: Record<string, string> = {
  TAFUKT10: 'خصم 10% على طلبك',
  MARHABA: 'خصم 15% على طلبك الأول',
}

export const currencyLabelsAr: Record<string, string> = {
  EUR: 'الأسعار باليورو',
  USD: 'الأسعار بالدولار الأمريكي',
}

type ProductText = {
  kind: string
  short: string
  description: string
  ingredients: string
  pairings: string[]
  badges: string[]
  season: string
  sizes: string[]
}

const productsAr: Record<string, ProductText> = {
  'amlou-beldi': {
    kind: 'معجون اللوز والأركان',
    short: 'لوز محمّص وزيت أركان وقليل من العسل.',
    description:
      'أملو كما يُصنع في البيت: لوز يُحمَّص على مهل ويُطحن مع زيت الأركان والعسل حتى يصير معجونًا طريًا سهل السكب. ادهنه على خبز دافئ أو مسمن، أو حرّكه في الزبادي، أو كُله بالملعقة.',
    ingredients: 'لوز محمّص، زيت أركان، عسل، ملح بحري.',
    pairings: ['مسمن أو بغرير', 'زبادي وفاكهة طازجة', 'خبز دافئ'],
    badges: ['توقيع الدار'],
    season: 'يُصنع بكميات صغيرة',
    sizes: ['برطمان 190 غ', 'ثلاثة برطمانات'],
  },
  zammita: {
    kind: 'خليط الحبوب واللوز المحمّص',
    short: 'خليط محمّص من الحبوب واللوز والسمسم.',
    description:
      'طعم الزمّيطة هو طعم صباح مغربي: شعير وحمّص يُحمَّصان حتى يصيرا كالجوز، يُطحنان مع اللوز والسمسم، ثم يُجمعان بقليل من العسل. قدّمها مع زيت الزيتون والخبز، أو خفّفها بحليب دافئ.',
    ingredients: 'شعير محمّص، حمّص، لوز، سمسم، عسل، ملح بحري.',
    pairings: ['زيت زيتون وخبز', 'حليب دافئ', 'تمر'],
    badges: ['تقليدية'],
    season: 'تُصنع بكميات صغيرة',
    sizes: ['برطمان 280 غ', 'ثلاثة برطمانات'],
  },
  'argan-grille': {
    kind: 'زيت أركان محمّص للطبخ',
    short: 'نوى أركان محمّصة لطعم عميق كالجوز.',
    description:
      'نوى أركان محمّصة تُعصر ببطء للمطبخ. غنيّة وطاغية الطعم، تُنهي السلطات والكسكس والخضار المشوية، وهي الزيت التي تمنح الأملو طابعه.',
    ingredients: 'زيت أركان محمّص 100%.',
    pairings: ['كسكس', 'سلطات', 'أملو'],
    badges: ['للطبخ'],
    season: 'يُعصر بكميات صغيرة',
    sizes: ['قارورة 100 مل', 'قارورة 250 مل'],
  },
  'argan-pur': {
    kind: 'زيت أركان صافٍ',
    short: 'زيت أركان غير محمّص، صافٍ وخفيف.',
    description:
      'نوى غير محمّصة تُعصر بلا حرارة لتعطي زيتًا صافيًا خفيفًا برائحة لطيفة. بضع قطرات على البشرة، أو في صلصة حين تريد أن تتقدّم بقية المكوّنات.',
    ingredients: 'زيت أركان صافٍ 100%.',
    pairings: ['البشرة والشعر', 'صلصات السلطة', 'جبن طازج'],
    badges: ['غير محمّص'],
    season: 'يُعصر بكميات صغيرة',
    sizes: ['قارورة 100 مل', 'قارورة 250 مل'],
  },
  'miel-thym': {
    kind: 'عسل الزعتر',
    short: 'عسل داكن عطري من زهر الزعتر.',
    description:
      'يُجمع حين يُزهر الزعتر، فيكون داكنًا كثيفًا غنيًا بالراتنج. نضعه فوق جبن الماعز، أو نحرّكه في ماء ساخن مع الليمون، أو نطلي به شيّ اللحم.',
    ingredients: 'عسل زعتر 100%.',
    pairings: ['جبن الماعز', 'شاي بالليمون', 'جزر مشوي'],
    badges: ['خام'],
    season: 'يُحصد في الربيع',
    sizes: ['برطمان 240 غ', 'ثلاثة برطمانات'],
  },
  'miel-oranger': {
    kind: 'عسل زهر البرتقال',
    short: 'عسل فاتح عطري من زهر البرتقال.',
    description:
      'زهر البرتقال يمنح هذا العسل لونه الذهبي الفاتح ورائحة البستان في أبريل. لطيف بما يكفي للزبادي والحلويات، وهو العسل الذي نستعمله في الشباكية.',
    ingredients: 'عسل زهر البرتقال 100%.',
    pairings: ['زبادي', 'حلويات', 'شاي بالنعناع'],
    badges: ['خام'],
    season: 'يُحصد في الربيع',
    sizes: ['برطمان 240 غ', 'ثلاثة برطمانات'],
  },
  sellou: {
    kind: 'دقيق محمّص ولوز',
    short: 'دقيق محمّص ولوز وسمسم، مطحون ناعمًا.',
    description:
      'السلو يُصنع من دقيق يُحمَّص حتى تفوح منه رائحة البندق، يُطحن مع اللوز والسمسم واليانسون، ثم يُربط بالعسل وقليل من الزبدة. قدّمه أكوامًا صغيرة مع الشاي بالنعناع، أو مع التمر.',
    ingredients: 'دقيق محمّص، لوز، سمسم، عسل، زبدة (حليب)، يانسون، قرفة.',
    pairings: ['شاي بالنعناع', 'تمر', 'قهوة'],
    badges: ['تقليدي'],
    season: 'يُصنع بكميات صغيرة',
    sizes: ['برطمان 280 غ', 'ثلاثة برطمانات'],
  },
  chebakia: {
    kind: 'حلوى السمسم والعسل',
    short: 'حلوى سمسم بشكل الوردة مغموسة في العسل.',
    description:
      'شرائط عجين مطويّة مع سمسم محمّص ويانسون، تُقلى حتى تصير مقرمشة وتُغمس في عسل دافئ بماء الزهر. الشباكية تبقى أسابيع في علبة معدنية، وهي مصنوعة للشاي بالنعناع.',
    ingredients: 'دقيق، سمسم، عسل، زبدة (حليب)، يانسون، قرفة، ماء الزهر، زعفران.',
    pairings: ['شاي بالنعناع', 'قهوة', 'مائدة رمضان'],
    badges: ['تقليدي'],
    season: 'تُصنع بكميات صغيرة',
    sizes: ['علبة 300 غ', 'ثلاث علب'],
  },
}

/** The printed jar label stays in Latin, so keep the original kind around. */
const productsWithLatinKind: Product[] = products.map((p) => ({ ...p, kindLatin: p.kind }))

export function localizeProducts(lang: Lang): Product[] {
  if (lang === 'en') return productsWithLatinKind
  return productsWithLatinKind.map((p) => {
    const t = productsAr[p.slug]
    if (!t) return p
    return {
      ...p,
      kind: t.kind,
      short: t.short,
      description: t.description,
      ingredients: t.ingredients,
      pairings: t.pairings,
      badges: t.badges,
      season: t.season,
      sizes: p.sizes.map((s, i) => ({ ...s, label: t.sizes[i] ?? s.label })),
    }
  })
}

type RecipeText = { title: string; intro: string; ingredients: string[]; steps: string[]; course: Course }

const recipesAr: Record<string, RecipeText> = {
  'msemen-amlou': {
    title: 'مسمن مع الأملو',
    intro: 'فطور، أو أول ما يُوضع على الطاولة حين يصل الضيوف.',
    course: 'Starter',
    ingredients: ['8 مسمن أو أرغفة مسطّحة أخرى', 'برطمان أملو بلدي', 'عسل حسب الرغبة', 'سمسم محمّص', 'شاي بالنعناع للتقديم'],
    steps: [
      'سخّن المسمن في مقلاة جافة حتى يلين ويذهب قليلًا إلى الذهبي.',
      'ضع الأملو على كل واحد وافرده حتى الأطراف والخبز ساخن.',
      'أضف خيط عسل ورشّة سمسم.',
      'اطوِه وكُله فورًا مع الشاي بالنعناع.',
    ],
  },
  'sellou-dates': {
    title: 'سلو مع التمر والجوز',
    intro: 'طبق صغير من السلو وبعض التمر وكأس شاي: أقصر طريق إلى أصيل النهار.',
    course: 'Sweet',
    ingredients: ['6 ملاعق كبيرة سلو', '12 تمرة مجهول', 'حفنة جوز', 'رشّة قرفة', 'شاي بالنعناع للتقديم'],
    steps: [
      'ضع السلو في أطباق صغيرة واملس سطحه.',
      'انثر القرفة والجوز المكسور فوقه.',
      'انزع نوى التمر ورتّبه إلى جانبه.',
      'قدّمه مع الشاي بالنعناع.',
    ],
  },
  'argan-couscous': {
    title: 'كسكس بزيت الأركان المحمّص',
    intro: 'يُضاف الزيت في النهاية، بعيدًا عن النار، ليبقى عطره كالجوز.',
    course: 'Main',
    ingredients: ['300 غ كسكس', '400 مل مرق خضار', 'كوسة وجزرة', 'حفنة حمّص', '3 ملاعق كبيرة أركان محمّص', 'ملح وفلفل أسود'],
    steps: [
      'اسكب المرق الساخن على الكسكس، غطّه واتركه عشر دقائق.',
      'اطبخ الخضار على البخار أو في المقلاة حتى تلين، ثم أضف الحمّص.',
      'خفّف الكسكس بالشوكة وتبّله.',
      'ارفع القدر عن النار وحرّك فيه زيت الأركان قبل التقديم مباشرة.',
    ],
  },
  'orange-blossom-cake': {
    title: 'كيك زهر البرتقال بالعسل',
    intro: 'كيك بسيط عطري يبقى أيامًا تحت قطعة قماش.',
    course: 'Sweet',
    ingredients: ['3 بيضات', '150 غ عسل', '120 مل زيت زيتون', 'بشر برتقالة', 'ملعقة كبيرة ماء زهر', '220 غ طحين', 'ملعقتان صغيرتان بيكنغ باودر'],
    steps: [
      'سخّن الفرن إلى 175°م وافرش قالبًا قطره 22 سم.',
      'اخفق البيض والعسل حتى يبيضّا، ثم اسكب الزيت ببطء.',
      'أضف البشر وماء الزهر والطحين والبيكنغ باودر وقلّب بلطف.',
      'اخبز 40 دقيقة، حتى يخرج العود نظيفًا.',
      'سخّن ملعقة عسل مع قليل من الماء وادهن بها الكيك الدافئ.',
    ],
  },
  'chebakia-tea': {
    title: 'شاي بالنعناع مع الشباكية',
    intro: 'الشاي يُسكب من علو، والشباكية هناك لتُغمس.',
    course: 'Sweet',
    ingredients: ['ملعقة كبيرة شاي أخضر', 'حزمة كبيرة نعناع طازج', '600 مل ماء مغلي', 'عسل حسب الرغبة', '8 قطع شباكية'],
    steps: [
      'اغسل الشاي بقليل من الماء المغلي، ثم أضف النعناع وبقية الماء.',
      'اتركه خمس دقائق لينقع.',
      'حلّه بالعسل واسكبه من علو في كؤوس صغيرة.',
      'قدّمه مع الشباكية على الصينية نفسها.',
    ],
  },
}

export function localizeRecipes(lang: Lang): Recipe[] {
  if (lang === 'en') return recipes
  return recipes.map((r) => {
    const t = recipesAr[r.slug]
    if (!t) return r
    return { ...r, ...t }
  })
}
