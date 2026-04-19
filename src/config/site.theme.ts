import { defineSiteTheme } from '@/config/site.theme.defaults'

export const SITE_THEME = defineSiteTheme({
  shell: 'editorial',
  hero: {
    variant: 'gallery-mosaic',
    eyebrow: 'Image gallery',
  },
  home: {
    layout: 'editorial-rhythm',
    primaryTask: 'image',
    featuredTaskKeys: ['image'],
  },
  navigation: {
    variant: 'editorial',
  },
  footer: {
    variant: 'editorial',
  },
  cards: {
    listing: 'listing-elevated',
    article: 'editorial-feature',
    image: 'editorial-feature',
    profile: 'studio-panel',
    classified: 'catalog-grid',
    pdf: 'catalog-grid',
    sbm: 'editorial-feature',
    social: 'studio-panel',
    org: 'catalog-grid',
    comment: 'editorial-feature',
  },
})
