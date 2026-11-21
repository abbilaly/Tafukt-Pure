// Mirrors the @theme tokens in styles.css for the style guide.
export const colors = [
  { name: 'cream', hex: '#f7f1e3', use: 'Page background' },
  { name: 'cream-2', hex: '#ece2cd', use: 'Alternate bands, quiet fills' },
  { name: 'paper', hex: '#fdfaf1', use: 'Fields, cards' },
  { name: 'line', hex: '#ddd0b6', use: 'Dividers' },
  { name: 'line-strong', hex: '#c2b08c', use: 'Field and chip borders' },
  { name: 'wine', hex: '#2f3a22', use: 'Headings, outlines, summary panel (deep olive)' },
  { name: 'maroon', hex: '#45512f', use: 'Hero hill, statement band (olive)' },
  { name: 'maroon-deep', hex: '#232b18', use: 'Menu, footer, story band (darkest olive)' },
  { name: 'maroon-soft', hex: '#63704a', use: 'Emblem and secondary olive' },
  { name: 'ink', hex: '#292a1d', use: 'Body text' },
  { name: 'muted', hex: '#69644f', use: 'Secondary text' },
  { name: 'on-dark', hex: '#f7f1e3', use: 'Text on olive' },
  { name: 'on-dark-muted', hex: '#d5cab0', use: 'Secondary text on olive' },
  { name: 'flame', hex: '#b08d57', use: 'Display gold, ring, dots' },
  { name: 'flame-ink', hex: '#7f6134', use: 'Button fills with white text' },
  { name: 'flame-text', hex: '#755831', use: 'Small gold text on cream' },
  { name: 'flame-light', hex: '#d4b483', use: 'Display accents on olive (AA large)' },
  { name: 'flame-soft', hex: '#ece0c6', use: 'Badges' },
  { name: 'olive', hex: '#4a5230', use: 'Pairing badges' },
  { name: 'terracotta', hex: '#b4552d', use: 'Selection and warm accents' },
  { name: 'terracotta-soft', hex: '#e9cdb9', use: 'Quiet terracotta fills' },
  { name: 'success', hex: '#4e6b3a', use: 'In stock, confirmations' },
  { name: 'danger', hex: '#a8442a', use: 'Errors, sold out' },
]
export const typeScale = [
  { name: 'display', size: '76 / 1.0 Playfair', cls: 'font-serif text-[76px] leading-none text-wine', sample: 'Amlou Beldi' },
  { name: 'h1', size: '68 / 1.05 Playfair', cls: 'font-serif text-[68px] leading-[1.05] text-wine', sample: 'The pantry' },
  { name: 'h2', size: '52 / 1.05 Playfair', cls: 'font-serif text-[52px] leading-[1.05] text-wine', sample: 'Three shelves, one land' },
  { name: 'h3', size: '30 / 1.2 Playfair', cls: 'font-serif text-[30px] text-wine', sample: 'Order summary' },
  { name: 'kind', size: '24 italic Playfair', cls: 'font-serif text-[24px] italic text-flame-text', sample: 'Almond & argan spread' },
  { name: 'lead', size: '17 / 1.6 DM Sans', cls: 'text-[17px] leading-relaxed text-muted', sample: 'Amlou, argan oil and honey, made by hand.' },
  { name: 'body', size: '15 / 1.5 DM Sans', cls: 'text-[15px] text-ink', sample: 'Toasted almonds, argan oil, honey, sea salt.' },
  { name: 'eyebrow', size: '12 bold, 0.2em caps', cls: 'text-[12px] font-bold uppercase tracking-[0.2em] text-flame-text', sample: 'From the pantry' },
]
export const spacing = [4, 8, 12, 16, 20, 24, 32, 40, 56, 80, 128]
export const radii = [
  { name: 'field', value: '14px' },
  { name: 'card', value: '22px' },
  { name: 'panel', value: '32px' },
  { name: 'arch', value: '999px 999px 22px 22px' },
  { name: 'control', value: '999px' },
]
export const shadows = [
  { name: 'pill', cls: 'shadow-pill' },
  { name: 'card', cls: 'shadow-card' },
  { name: 'jar', cls: 'shadow-jar' },
  { name: 'drawer', cls: 'shadow-drawer' },
]
export const motionTokens = [
  { name: 'bob', cls: 'animate-bob', detail: '6s ease-in-out loop, hero jars' },
  { name: 'rise', cls: 'animate-rise', detail: '0.8s ease-out-soft, entries on scroll' },
  { name: 'fade', cls: 'animate-fade', detail: '0.5s ease-out, ring text swap' },
  { name: 'pulse-dot', cls: 'animate-pulse-dot', detail: '1.8s loop, live dots' },
  { name: 'spring', cls: 'animate-rise', detail: 'stiffness 70, damping 18: carousel jars' },
]
