import type { Metadata } from 'next'
import Link from 'next/link'
import { WarmMarketingLayout } from '@/components/marketing/warm-marketing-layout'
import { PressAssetPanel } from '@/components/marketing/press-asset-panel'
import { Button } from '@/components/ui/button'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/press',
    title: `Press | ${SITE_CONFIG.name}`,
    description: `Brand assets, coverage, and media notes for ${SITE_CONFIG.name}.`,
  })
}

export default function PressPage() {
  return (
    <WarmMarketingLayout
      eyebrow="Press"
      title="Tell the story with the right frames"
      description={`Journalists and partners can pull approved photography, color guidance, and product context without chasing scattered links. ${SITE_CONFIG.name} keeps everything in one warm, editorial layout.`}
      actions={
        <Button asChild variant="outline" className="rounded-full border-[#e8dfd4] bg-white text-[#3d291c] hover:bg-[#fff5eb]">
          <Link href="/help">Talk to comms</Link>
        </Button>
      }
    >
      <PressAssetPanel />
    </WarmMarketingLayout>
  )
}
