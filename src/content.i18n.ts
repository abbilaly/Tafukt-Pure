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
  homeNote: 'Back to the hill',
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
  fromLarder: 'From the larder',
  allCourses: 'All courses',
  courseLabel: 'Course',
  courses: { Starter: 'Starter', Main: 'Main', Sweet: 'Sweet' } as Record<Course, string>,
  recipeNotFound: 'We could not find that recipe.',
  keepShopping: 'Keep shopping',
  itemsHeading: 'Items',
  collectNote: 'Collect from the farm kitchen, Saturdays 9–12.',
  removePromo: 'Remove promo code',
  theLarder: 'The larder',
  orderWord: 'Order',
  orderNotFound: 'Order not found',
  confirmationTo: (email: string) => `Confirmation to ${email}`,
  confirmed: (ref: string) => `Order ${ref} confirmed`,
  season: 'Season',
  nextBatch: 'The next batch is in the pan.',
  shopTheLarder: 'Shop the larder',
  visitEyebrow: 'Visit',
  seasonsEyebrow: 'The year on the hill',
  dayLabel: 'of',
  homeCrumb: 'Back to the farm',
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
  homeNote: 'عودة إلى التلّة',
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
  showing: (name, kind, i, n) => `يُعرض ${name}، ${kind}. ${i} من ${n}.`,
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
  collectNote: 'الاستلام من مطبخ المزرعة، السبت 9–12.',
  removePromo: 'إزالة رمز الخصم',
  theLarder: 'المؤونة',
  orderWord: 'طلب',
  orderNotFound: 'الطلب غير موجود',
  confirmationTo: (email) => `تأكيد على ${email}`,
  confirmed: (ref) => `تم تأكيد الطلب ${ref}`,
  season: 'الموسم',
  nextBatch: 'الدفعة التالية على النار.',
  shopTheLarder: 'تسوّق المؤونة',
  visitEyebrow: 'زيارة',
  seasonsEyebrow: 'العام على التلّة',
  dayLabel: 'من',
  homeCrumb: 'عودة إلى المزرعة',
}

const catAr: Record<Category, { title: string; blurb: string }> = {
  Pesto: { title: 'بيستو', blurb: 'مطحون بالحجر في المزرعة، ولا يُسخَّن أبدًا.' },
  Preserves: { title: 'مربّيات', blurb: 'فاكهة وسكّر وصبر. لا شيء آخر.' },
  Citrus: { title: 'حمضيات', blurb: 'صناديق تُقطَف حسب الطلب، في موسمها.' },
}

export const ar: Copy = {
  brand: {
    ...brand,
    name: 'مزرعة تشيدرينا',
    sub: 'مزرعة',
    tagline: 'بيستو ومربّيات وحمضيات من مزرعة عائلية على التلال',
    place: 'كونترادا تشيدرينا، على المصاطب المطلّة على البحر',
  },
  nav: [
    { to: '/shop', label: 'المؤونة', note: 'كل المنتجات' },
    { to: '/farm', label: 'مزرعتنا', note: 'ثلاثة أجيال' },
    { to: '/recipes', label: 'وصفات', note: 'اطبخ ببرطمان' },
    { to: '/bag', label: 'سلّتك', note: 'السلة والدفع' },
  ],
  categories: categories.map((c) => ({ ...c, ...catAr[c.id] })),
  home: {
    ringFallback: 'IN FORMA DI CONSERVA · ',
    discover: 'تعرّف على المنتج',
    scroll: 'انزل للاكتشاف',
    statement: {
      eyebrow: 'منذ 1961',
      lead: 'تلّة واحدة فوق البحر، ثلاثة أجيال، ومطبخ لا يتوقّف.',
      accent: 'نقطف عند الفجر ونملأ البرطمانات قبل الظهر.',
      body: 'كل ما نبيعه ينمو على مصاطبنا: الفستق والحمضيات والتين والريحان وشجرة التوت العتيقة قرب البئر. نطبخ دُفعات صغيرة في مطبخ البيت ونشحن مباشرة من المزرعة.',
    },
    bestsellers: { eyebrow: 'من المؤونة', title: 'البرطمانات التي نُعرَف بها', cta: 'كل المنتجات' },
    categories: { eyebrow: 'تسوّق حسب الرف', title: 'ثلاثة رفوف، مزرعة واحدة' },
    story: {
      eyebrow: 'مزرعتنا',
      title: 'المصاطب التي بناها جدّنا بيديه',
      body: 'غرس الجدّ سالفاتوري أول شجرات الليمون عام 1961 على مصاطب شيّد حجارتها بنفسه. اليوم يزرع أحفاده الحجارة نفسها بلا كيماويات، ويطبخون كل برطمان في المطبخ الذي بناه.',
      cta: 'اقرأ قصتنا',
    },
    recipes: { eyebrow: 'في المطبخ', title: 'ماذا تصنع ببرطمان', cta: 'كل الوصفات' },
    promises: [
      { title: 'نزرعه بأنفسنا', body: 'كل مكوّن نقدر على زراعته، نزرعه في المزرعة.' },
      { title: 'دُفعات صغيرة', body: 'نطبخ في قدور نحاسية، ستين برطمانًا في الدفعة.' },
      { title: 'الشحن من المزرعة', body: 'يُحزَّم يدويًا ويُرسَل خلال يومين.' },
      { title: 'مجاني فوق 60 €', body: 'توصيل متتبَّع مجاني في أوروبا فوق 60 يورو.' },
    ],
  },
  farm: {
    eyebrow: 'مزرعتنا',
    title: 'ستون عامًا على المصاطب نفسها',
    intro:
      'تشيدرينا مزرعة عائلية صغيرة على تلّة جنوبية تطل على البحر. إحدى عشرة مصطبة من الحمضيات والفستق والتين والزيتون، وحديقة مطبخ، ومطبخ بيت ريفي لا يزال كل برطمان فيه يُطبخ باليد.',
    timeline: [
      { year: '1961', title: 'أول شجرات الليمون', body: 'يشتري سالفاتوري وروزا تلّة خربة، ويعيدان بناء جدرانها الحجرية الجافة ويغرسان أربعين شجرة ليمون.' },
      { year: '1978', title: 'مطبخ روزا', body: 'تبدأ روزا بملء برطمانات الكابوناتا والمربّى لسوق القرية. الوصفات لم تتغيّر منذ ذلك الحين.' },
      { year: '1996', title: 'الفستق على المصطبة العليا', body: 'يغرس ابنهما بييترو الفستق حيث لا ينمو شيء آخر. يحتاج اثني عشر عامًا حتى يُثمر.' },
      { year: '2011', title: 'عضوي بالكامل', body: 'تُعتمد المزرعة كلها للزراعة العضوية. استبدلنا المبيدات بالدعسوق والخناجر تحت الأشجار.' },
      { year: 'اليوم', title: 'الجيل الثالث', body: 'تدير جوليا وماركو المزرعة والمطبخ، ويشحنان إلى أوروبا مباشرة من التلّة.' },
    ],
    stats: [
      { value: '11', label: 'مصطبة حجرية' },
      { value: '1,400', label: 'شجرة حمضيات' },
      { value: '60', label: 'برطمانًا في الدفعة' },
      { value: '0', label: 'رشّ صناعي' },
    ],
    seasonsTitle: 'ماذا ينمو ومتى',
    seasons: [
      { month: 'يناير', crop: 'برتقال وبرتقال أحمر' },
      { month: 'مارس', crop: 'ليمون وشمر برّي' },
      { month: 'يونيو', crop: 'توت أسود' },
      { month: 'يوليو', crop: 'ريحان' },
      { month: 'أغسطس', crop: 'طماطم وباذنجان' },
      { month: 'سبتمبر', crop: 'فستق وتين' },
      { month: 'نوفمبر', crop: 'زيتون وأول الحمضيات' },
    ],
    kitchenTitle: 'مطبخ البيت الريفي',
    kitchenBody:
      'مطبخنا مخزن زيتون قديم حُوِّل في أسفل التل. نطبخ في قدور نحاسية، ستين برطمانًا في المرة، ونكتب على كل دفعة يوم صنعها. الزوّار مرحّب بهم صباح السبت من أبريل إلى أكتوبر.',
    visitCta: 'اكتب لنا لترتيب زيارة',
  },
  recipesPage: {
    eyebrow: 'وصفات',
    title: 'اطبخ ببرطمان',
    intro: 'أطباق بسيطة من مائدة البيت، كل واحد منها مبني على شيء من المؤونة.',
    empty: 'لا توجد وصفات في هذا القسم بعد.',
  },
  shop: {
    eyebrow: 'المؤونة',
    title: 'كل ما في التلّة',
    intro: 'بيستو ومربّيات وحمضيات طازجة، تُطبخ وتُحزَّم يدويًا في المزرعة.',
    searchLabel: 'ابحث في المؤونة',
    searchPlaceholder: 'فستق، ليمون، تين…',
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
    promoHint: 'جرّب CEDRINA10',
    promoApply: 'تطبيق',
    shippingOptions: [
      { id: 'standard', label: 'عادي، 3–5 أيام', price: 6.9 },
      { id: 'express', label: 'سريع، 1–2 يوم', price: 12.9 },
      { id: 'pickup', label: 'الاستلام من المزرعة', price: 0 },
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
    body: 'وصلنا طلبك. سنحزمه باليد ونراسلك بالبريد حين يغادر المزرعة.',
    reference: 'رقم الطلب',
    missing: 'لم نجد هذا الطلب على هذا الجهاز.',
    again: 'واصل التسوّق',
    history: 'طلبات سابقة على هذا الجهاز',
  },
  footer: {
    newsletterTitle: 'رسائل من التلّة',
    newsletterBody: 'رسالة واحدة كل موسم: ما نضج، وما الجديد في المؤونة، ووصفة.',
    newsletterPlaceholder: 'بريدك الإلكتروني',
    newsletterCta: 'اشترك',
    newsletterDone: 'شكرًا لك. تصلك الرسالة التالية مع أول البرتقال.',
    columns: [
      {
        title: 'المتجر',
        links: [
          { to: '/shop', label: 'كل المنتجات' },
          { to: '/shop?c=Pesto', label: 'بيستو' },
          { to: '/shop?c=Preserves', label: 'مربّيات' },
          { to: '/shop?c=Citrus', label: 'حمضيات' },
        ],
      },
      {
        title: 'المزرعة',
        links: [
          { to: '/farm', label: 'قصتنا' },
          { to: '/recipes', label: 'وصفات' },
          { to: '/farm#visit', label: 'زُرنا' },
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
    legal: '© 2026 مزرعة تشيدرينا. قالب تجريبي: الأسماء والمنتجات والصور نماذج فقط.',
  },
  notFound: {
    eyebrow: '404',
    title: 'هذا الدرب يخرج عن المصاطب',
    body: 'الصفحة التي تبحث عنها ليست هنا. ربما أكلها أحدهم.',
    cta: 'عودة إلى المزرعة',
  },
  ui: uiAr,
}

export const copy: Record<Lang, Copy> = { en, ar }

/** Arabic shop-country names; the submitted value stays the English name so
 *  the Worker keeps validating against bag.countries. */
export const countryNamesAr: Record<string, string> = {
  Italy: 'إيطاليا',
  France: 'فرنسا',
  Germany: 'ألمانيا',
  Spain: 'إسبانيا',
  Netherlands: 'هولندا',
  Belgium: 'بلجيكا',
  Austria: 'النمسا',
  'United Kingdom': 'المملكة المتحدة',
  'United States': 'الولايات المتحدة',
}

export const promoLabelsAr: Record<string, string> = {
  CEDRINA10: 'خصم 10% على طلبك',
  BENVENUTO: 'خصم 15% على طلبك الأول',
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
  smeraldo: {
    kind: 'بيستو الفستق',
    short: 'فستق أخضر، زيت زيتون وقليل من بشر الليمون.',
    description:
      'برطماننا الأكثر حبًّا. يُقشَّر فستق المصطبة العليا باليد، ويُطحَن على مهل بالحجر مع زيت الزيتون من أرضنا، ثم يُكمَّل ببشر ليمون تشيدرينا. حرّكه في معكرونة ساخنة، أو ادهنه على خبز دافئ، أو كُله بالملعقة.',
    ingredients: 'فستق 60%، زيت زيتون بكر ممتاز، جبن غرانا (حليب)، بشر ليمون، ملح بحري.',
    pairings: ['معكرونة تروفيه أو بوزياتي', 'بوراتا', 'سمك مشوي'],
    badges: ['الأكثر مبيعًا', 'نباتي'],
    season: 'يُحصد في سبتمبر',
    sizes: ['برطمان 190 غ', 'ثلاثة برطمانات'],
  },
  'gelsi-neri': {
    kind: 'مربّى التوت الأسود',
    short: 'توت أسود داكن وحامض من الشجرة العتيقة قرب البئر.',
    description:
      'شجرة التوت قرب البئر أقدم من بيت المزرعة. ثمرها يصبغ كل ما يلمسه، لذا نقطفه في برودة الصباح ونطبخه في غضون ساعة، بنسبة 70% فاكهة وعصرة ليمون تحفظ لونه.',
    ingredients: 'توت أسود 70%، سكّر قصب، عصير ليمون.',
    pairings: ['ريكوتا وخبز محمّص', 'كروستاتا', 'جبنتشو بيكورينو معتّقة'],
    badges: ['نباتي صرف', 'فاكهة مضاعفة'],
    season: 'يُحصد في يونيو',
    sizes: ['برطمان 240 غ', 'ثلاثة برطمانات'],
  },
  'arance-a-fette': {
    kind: 'مربّى البرتقال المقطّع',
    short: 'أقراص رقيقة من البرتقال الكامل، بقشرها المرّ.',
    description:
      'برتقال الشتاء يُقطَّع كاملًا ويُطهى على نار هادئة في عصيره حتى يصير القشر كالزجاج. أقل حلاوةً من معظم المربّيات، ويحفظ مرارة اللبّ اللطيفة. عضوي، من البستان الأسفل.',
    ingredients: 'برتقال 65%، سكّر قصب، عصير ليمون.',
    pairings: ['زبدة وخبز عجين حامض', 'كيك زيت الزيتون', 'شوكولاتة داكنة'],
    badges: ['عضوي', 'نباتي صرف'],
    season: 'يُحصد في يناير',
    sizes: ['برطمان 240 غ', 'ثلاثة برطمانات'],
  },
  'pesto-rosso': {
    kind: 'بيستو الطماطم واللوز',
    short: 'طماطم مجفّفة ولوز محمّص ورشّة فلفل حار.',
    description:
      'طماطم جفّفناها على الشبكات في شمس أغسطس، دُقّت مع لوز محمّص وريحان وقليل من الفلفل الحار من حديقة المطبخ. حلوة ودخانية ودافئة بالقدر الكافي.',
    ingredients: 'طماطم مجفّفة 45%، زيت زيتون بكر ممتاز، لوز، ريحان، ثوم، فلفل حار، ملح بحري.',
    pairings: ['بروسكيتا', 'خضار مشوية', 'موزاريلا'],
    badges: ['نباتي صرف'],
    season: 'يُحصد في أغسطس',
    sizes: ['برطمان 190 غ', 'ثلاثة برطمانات'],
  },
  limone: {
    kind: 'مربّى الليمون',
    short: 'مربّى ليمون مقطّع رفيعًا، حادّ وذهبي.',
    description:
      'الليمون الذي منح المزرعة اسمها. غير مشمّع، يُقطَّع شرائح رقيقة ويُغلَّى بالبكتين الطبيعي. مضيء بما يكفي لإيقاظ الزبادي، لطيف بما يكفي لكرواسان الفطور.',
    ingredients: 'ليمون 60%، سكّر قصب.',
    pairings: ['زبادي يوناني', 'بسكويت زبدة', 'طلاء دجاج مشوي'],
    badges: ['عضوي', 'نباتي صرف'],
    season: 'يُحصد في مارس',
    sizes: ['برطمان 240 غ', 'ثلاثة برطمانات'],
  },
  basilico: {
    kind: 'بيستو الريحان والصنوبر',
    short: 'أوراق ريحان صغيرة، صنوبر وجبن معتّق.',
    description:
      'نقطف الريحان صغيرًا قبل أن يُزهر، ونَدُقّه على الطريقة القديمة مع الصنوبر والثوم والجبن المعتّق. برطمان صيفي لأي وقت من السنة.',
    ingredients: 'ريحان 50%، زيت زيتون بكر ممتاز، صنوبر، جبن غرانا (حليب)، بيكورينو (حليب)، ثوم، ملح بحري.',
    pairings: ['لينغويني', 'مينستروني', 'سلطة طماطم'],
    badges: ['نباتي'],
    season: 'يُحصد في يوليو',
    sizes: ['برطمان 190 غ', 'ثلاثة برطمانات'],
  },
  caponata: {
    kind: 'كابوناتا الباذنجان الحلوة الحامضة',
    short: 'باذنجان وكرفس وزيتون وكبر في صلصة أكرو دولتشي.',
    description:
      'كابوناتا الجدّة روزا: باذنجان مقلي في زيت الزيتون يُطهى مع الكرفس والزيتون الأخضر والكبر ورشّة خلّ نبيذ أحمر. أطيب في اليوم الثاني، لذا نترك كل دفعة ترتاح قبل التعبئة.',
    ingredients: 'باذنجان 55%، طماطم، كرفس، زيت زيتون، زيتون أخضر، كبر، بصل، خلّ نبيذ، سكّر، ملح بحري.',
    pairings: ['خبز مقرمش', 'لحم خروف مشوي', 'طبق أنتيباستو'],
    badges: ['نباتي صرف', 'وصفة عائلية'],
    season: 'يُحصد في أغسطس',
    sizes: ['برطمان 280 غ', 'ثلاثة برطمانات'],
  },
  'fichi-e-noci': {
    kind: 'مربّى التين والجوز',
    short: 'تين بنفسجي وجوز، صُنع لمائدة الأجبان.',
    description:
      'تين بنفسجي من المصطبة الجافة يُطهى ببطء مع الجوز وورقة غار. كثيف وداكن وقليل الحلاوة، البرطمان الذي نمتدّ إليه حين يكون الجبن على الطاولة.',
    ingredients: 'تين 60%، سكّر قصب، جوز 8%، عصير ليمون، ورقة غار.',
    pairings: ['بيكورينو وغورغونزولا', 'كروستيني ريكوتا', 'لحم خنزير مشوي'],
    badges: ['نباتي صرف'],
    season: 'يُحصد في سبتمبر',
    sizes: ['برطمان 240 غ', 'ثلاثة برطمانات'],
  },
  'citrus-crate': {
    kind: 'صندوق حمضيات مشكّل',
    short: 'ليمون وبرتقال بأوراقه، يُقطَف يوم الشحن.',
    description:
      'صندوق خشبي من الليمون والبرتقال غير المشمّع، يُقطَف صباح يوم الشحن ويُحزَّم بأوراقه. القشر غير معالَج، فابشر ما تشاء.',
    ingredients: 'ليمون وبرتقال غير مشمّع، بلا معالجة بعد الحصاد.',
    pairings: ['عصير طازج', 'ليمون مملّح', 'مربّاك الخاص'],
    badges: ['عضوي', 'في موسمه'],
    season: 'من نوفمبر إلى أبريل',
    sizes: ['صندوق 3 كغ', 'صندوق 5 كغ'],
  },
  sanguinelle: {
    kind: 'صندوق برتقال أحمر',
    short: 'برتقال أحمر في أعمق لونه، لموسم قصير فقط.',
    description:
      'ليالي التلّة الباردة تُلبس برتقالنا الأحمر لونًا قرمزيًا. نقطفه في أسابيعه القليلة الأفضل فقط، حين يصير اللبّ داكنًا وطعم العصير كالتوت الشامي.',
    ingredients: 'برتقال أحمر غير مشمّع، بلا معالجة بعد الحصاد.',
    pairings: ['سلطة شمر', 'عصير فطور', 'سبريتز كامباري'],
    badges: ['عضوي', 'كمية محدودة'],
    season: 'من يناير إلى مارس',
    sizes: ['صندوق 3 كغ', 'صندوق 5 كغ'],
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
  'pistachio-trofie': {
    title: 'تروفيه مع سمرالدو والليمون',
    intro: 'العشاء الذي نصنعه حين يحين موسم الفستق ولا يريد أحد أن يطبخ.',
    course: 'Main',
    ingredients: ['400 غ تروفيه أو معكرونة قصيرة أخرى', 'برطمان سمرالدو بيستو الفستق', 'ليمونة غير مشمّعة', 'حفنة فستق مقشّر', 'زيت زيتون وملح بحري'],
    steps: [
      'اسلق المعكرونة في ماء مملّح جيدًا حتى تنضج قليلًا. احفظ كوبًا من ماء السلق.',
      'ضع البيستو في وعاء دافئ وخفّفه بثلاث ملاعق من ماء المعكرونة.',
      'صفِّ المعكرونة وقلّبها في البيستو، وأضف مزيدًا من الماء حتى يغطّي كل قطعة.',
      'أنهِ ببشر الليمون والفستق المجروش وخيط من زيت الزيتون.',
    ],
  },
  'fig-ricotta-crostini': {
    title: 'كروستيني ريكوتا مع التين والجوز',
    intro: 'خمس دقائق وبرطمان واحد، والأنتيباستو جاهز.',
    course: 'Starter',
    ingredients: ['رغيف صغير من خبز العجين الحامض', '250 غ ريكوتا طازجة', 'نصف برطمان فيكي إي نوتشي', 'بضع حبات جوز', 'زعتر وفلفل أسود'],
    steps: [
      'قطّع الخبز رقيقًا وحمّصه حتى تذهب أطرافه إلى الذهبي.',
      'ادهن كل شريحة بالريكوتا وتبّلها بالفلفل.',
      'أضف ملعقة من مربّى التين، وحبة جوز مكسورة، وبعض أوراق الزعتر.',
    ],
  },
  'orange-olive-oil-cake': {
    title: 'كيك زيت الزيتون مع طلاء المربّى',
    intro: 'كيك طري وبسيط يدع البرتقال يتكلّم. يبقى أيامًا تحت قطعة قماش.',
    course: 'Sweet',
    ingredients: ['3 بيضات', '200 غ سكّر', '160 مل زيت زيتون بكر ممتاز', 'بشر وعصير برتقالتين', '220 غ طحين', 'ملعقتان صغيرتان بيكنغ باودر', 'نصف برطمان أرانتشي إيه فيتّه'],
    steps: [
      'سخّن الفرن إلى 175°م وافرش قالبًا قطره 22 سم.',
      'اخفق البيض والسكّر حتى يبيضّا، ثم اسكب الزيت ببطء أثناء الخفق.',
      'أضف البشر والعصير، ثم أضف الطحين والبيكنغ باودر برفق.',
      'اخبز 40 دقيقة، حتى يخرج العود نظيفًا.',
      'سخّن المربّى مع ملعقة ماء ورتّب الشرائح على الكيك الدافئ.',
    ],
  },
  'pesto-rosso-bruschetta': {
    title: 'بروسكيتا مع بيستو روسّو والبوراتا',
    intro: 'خبز مشوي وبرطمان أحمر وجبن طري: أغسطس كله في طبق.',
    course: 'Starter',
    ingredients: ['4 شرائح سميكة من خبز الريف', 'فص ثوم', 'نصف برطمان بيستو روسّو', 'بوراتا واحدة', 'أوراق ريحان وزيت زيتون'],
    steps: [
      'اشوِ الخبز حتى يتفحّم في بعض المواضع وافركه بالثوم المقطوع.',
      'ادهن طبقة سخيّة من بيستو روسّو على كل شريحة.',
      'مزّق البوراتا فوقها، أضف الريحان وأنهِ بزيت الزيتون والملح.',
    ],
  },
  'mulberry-crostata': {
    title: 'كروستاتا التوت الأسود',
    intro: 'كل أحد في يونيو. الشبكة لا تحتاج أن تكون مرتّبة.',
    course: 'Sweet',
    ingredients: ['300 غ طحين', '150 غ زبدة باردة', '100 غ سكّر', 'بيضة وصفار', 'بشر ليمونة', 'برطمان غيلسي نيري'],
    steps: [
      'افرك الزبدة في الطحين والسكّر، ثم اربطها بالبيضة والصفار وبشر الليمون. برّدها 30 دقيقة.',
      'افرد ثلثي العجين في قالب قطره 24 سم وادهنه بالمربّى.',
      'قطّع الباقي شرائح ورتّب شبكة مرتخية فوق السطح.',
      'اخبز على 180°م لمدة 35 دقيقة حتى يذهب إلى الذهبي. برّده قبل التقطيع.',
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
