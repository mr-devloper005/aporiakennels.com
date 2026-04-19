'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useToast } from '@/components/ui/use-toast'
import { mockPressAssets, mockPressCoverage } from '@/data/mock-data'
import { warmCardClass } from '@/components/marketing/warm-marketing-layout'

export function PressAssetPanel() {
  const { toast } = useToast()
  const [activeAssetId, setActiveAssetId] = useState<string | null>(null)
  const activeAsset = mockPressAssets.find((asset) => asset.id === activeAssetId)

  return (
    <>
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div className={warmCardClass}>
          <h2 className="text-lg font-semibold text-[#3d291c]">Press kit</h2>
          <p className="mt-2 text-sm leading-7 text-[#6a5548]">
            Logos, palette notes, and photography that match our gallery story—ready for editors and partners.
          </p>
          <div className="mt-6 grid gap-3">
            {mockPressAssets.map((asset) => (
              <div key={asset.id} className="rounded-[1rem] border border-[#ebe3d7] bg-[#fffefb] px-4 py-4">
                <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                  <div>
                    <p className="text-sm font-semibold text-[#3d291c]">{asset.title}</p>
                    <p className="text-xs text-[#6a5548]">{asset.description}</p>
                  </div>
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge className="border-[#e8dfd4] bg-[#f3ebe2] text-[#3d291c]">{asset.fileType}</Badge>
                    <Button size="sm" variant="outline" className="rounded-full border-[#e8dfd4]" onClick={() => setActiveAssetId(asset.id)}>
                      Preview
                    </Button>
                    <Button
                      size="sm"
                      className="rounded-full bg-[#e68a4f] text-white hover:bg-[#d97a42]"
                      onClick={() =>
                        toast({
                          title: 'Download started',
                          description: `${asset.title} is downloading.`,
                        })
                      }
                    >
                      Download
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-[#6a5548]">In the press</p>
          {mockPressCoverage.map((item) => (
            <div key={item.id} className={`${warmCardClass} transition hover:-translate-y-0.5 hover:shadow-[0_22px_55px_rgba(62,40,20,0.1)]`}>
              <div className="text-[11px] font-semibold uppercase tracking-[0.18em] text-[#e68a4f]">{item.outlet}</div>
              <p className="mt-2 text-sm font-medium leading-relaxed text-[#3d291c]">{item.headline}</p>
              <p className="mt-2 text-xs text-[#6a5548]">{item.date}</p>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={Boolean(activeAsset)} onOpenChange={() => setActiveAssetId(null)}>
        <DialogContent className="max-w-3xl border-[#e8dfd4] bg-[#fffefb]">
          <DialogHeader>
            <DialogTitle className="text-[#3d291c]">{activeAsset?.title}</DialogTitle>
          </DialogHeader>
          {activeAsset?.previewUrl ? (
            <div className="relative aspect-video overflow-hidden rounded-[1rem] border border-[#ebe3d7] bg-[#f3ebe2]">
              <Image src={activeAsset.previewUrl} alt={activeAsset.title} fill className="object-cover" />
            </div>
          ) : null}
          <p className="text-sm text-[#6a5548]">{activeAsset?.description}</p>
          <DialogFooter>
            <Button variant="outline" className="rounded-full border-[#e8dfd4]" onClick={() => setActiveAssetId(null)}>
              Close
            </Button>
            <Button
              className="rounded-full bg-[#e68a4f] text-white hover:bg-[#d97a42]"
              onClick={() =>
                toast({
                  title: 'Download started',
                  description: `${activeAsset?.title} is downloading.`,
                })
              }
            >
              Download {activeAsset?.fileType}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
