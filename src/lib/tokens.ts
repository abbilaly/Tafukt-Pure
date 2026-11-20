// Mirrors the @theme tokens in styles.css for the style guide.
export const colors = [
  { name: 'cream', hex: '#f6ece2', use: 'Page background' },
  { name: 'cream-2', hex: '#efe0d1', use: 'Alternate bands, quiet fills' },
  { name: 'paper', hex: '#fbf6f0', use: 'Fields, cards' },
  { name: 'line', hex: '#e3cfbd', use: 'Dividers' },
  { name: 'line-strong', hex: '#c9ab93', use: 'Field and chip borders' },
  { name: 'wine', hex: '#5c1724', use: 'Headings, outlines, summary panel' },
  { name: 'maroon', hex: '#76212f', use: 'Hero hill, statement band' },
  { name: 'maroon-deep', hex: '#3e0f18', use: 'Menu, footer, story band' },
  { name: 'maroon-soft', hex: '#8f3443', use: 'Emblem leaf' },
  { name: 'ink', hex: '#33141a', use: 'Body text' },
  { name: 'muted', hex: '#6e4e4f', use: 'Secondary text' },
  { name: 'on-dark', hex: '#f6ece2', use: 'Text on maroon' },
  { name: 'on-dark-muted', hex: '#d9bfb8', use: 'Secondary text on maroon' },
  { name: 'flame', hex: '#f0521f', use: 'Display type on maroon, ring, dots' },
  { name: 'flame-ink', hex: '#c63c0f', use: 'Button fills with white text' },
  { name: 'flame-text', hex: '#b0360c', use: 'Small orange text on cream' },
  { name: 'flame-light', hex: '#ff7a4a', use: 'Display accents on maroon (AA large)' },
  { name: 'flame-soft', hex: '#fbd9c8', use: 'Badges' },
  { name: 'olive', hex: '#3f5d2a', use: 'Pairing badges' },
  { name: 'success', hex: '#2f6b2c', use: 'In stock, confirmations' },
  { name: 'danger', hex: '#b3261e', use: 'Errors, sold out' },
]
export const typeScale = [
  { name: 'display', size: '76 / 1.0 Playfair', cls: 'font-serif text-[76px] leading-none text-wine', sample: 'Smeraldo' },
  { name: 'h1', size: '68 / 1.05 Playfair', cls: 'font-serif text-[68px] leading-[1.05] text-wine', sample: 'The larder' },
  { name: 'h2', size: '52 / 1.05 Playfair', cls: 'font-serif text-[52px] leading-[1.05] text-wine', sample: 'Three shelves, one farm' },
  { name: 'h3', size: '30 / 1.2 Playfair', cls: 'font-serif text-[30px] text-wine', sample: 'Order summary' },
  { name: 'kind', size: '24 italic Playfair', cls: 'font-serif text-[24px] italic text-flame-text', sample: 'Pistachio pesto' },
  { name: 'lead', size: '17 / 1.6 DM Sans', cls: 'text-[17px] leading-relaxed text-muted', sample: 'Pestos, preserves and citrus cooked by hand.' },
  { name: 'body', size: '15 / 1.5 DM Sans', cls: 'text-[15px] text-ink', sample: 'Pistachios 60%, olive oil, lemon zest, sea salt.' },
  { name: 'eyebrow', size: '12 bold, 0.2em caps', cls: 'text-[12px] font-bold uppercase tracking-[0.2em] text-flame-text', sample: 'From the larder' },
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
