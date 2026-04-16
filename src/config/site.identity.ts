export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'ak4q8x2m7v',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Aporia Kennels',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Showcase images and featured highlights',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'A visual-first site designed for image-led showcases, updates, and gallery browsing.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'aporiakennels.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://aporiakennels.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',

} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const

