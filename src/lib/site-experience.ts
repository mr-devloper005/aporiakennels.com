export type SiteExperience = {
  key:
    | "tynewebdesign"
    | "codepixelmedia"
    | "radianpark"
    | "lashisking"
    | "scoreminers"
    | "linedesing"
    | "helloartcity"
    | "housesdecors"
    | "aporiakennels"
    | "earthskydesign";
  label: string;
  fontClass: string;
  pageClass: string;
  panelClass: string;
  softPanelClass: string;
  mutedClass: string;
  badgeClass: string;
  buttonClass: string;
  outlineButtonClass: string;
  heroEyebrow: string;
  heroDescription: string;
};

const FALLBACK_EXPERIENCE: SiteExperience = {
  key: "tynewebdesign",
  label: "Northern Glass",
  fontClass: "font-sans",
  pageClass:
    "bg-[radial-gradient(circle_at_top,rgba(56,189,248,0.18),transparent_28%),linear-gradient(180deg,#f4fbff_0%,#ffffff_100%)]",
  panelClass:
    "border border-white/50 bg-white/72 shadow-[0_30px_90px_rgba(14,116,144,0.16)] backdrop-blur-xl",
  softPanelClass: "border border-white/60 bg-white/55 backdrop-blur-lg",
  mutedClass: "text-slate-600",
  badgeClass: "bg-sky-950 text-sky-50",
  buttonClass: "bg-sky-950 text-white hover:bg-sky-900",
  outlineButtonClass: "border border-sky-200 bg-white/70 text-sky-950 hover:bg-sky-50",
  heroEyebrow: "Glassmorphic creator surfaces",
  heroDescription:
    "Floating identity blocks, softer depth, and a masonry-first gallery flow built for visual browsing.",
};

const EXPERIENCES: Record<SiteExperience["key"], SiteExperience> = {
  tynewebdesign: FALLBACK_EXPERIENCE,
  codepixelmedia: {
    key: "codepixelmedia",
    label: "Signal Split",
    fontClass: "font-sans",
    pageClass:
      "bg-[linear-gradient(135deg,#0a1020_0%,#111931_42%,#eef3ff_42%,#eef3ff_100%)]",
    panelClass:
      "border border-cyan-400/20 bg-slate-950/92 text-slate-50 shadow-[0_28px_80px_rgba(6,182,212,0.18)]",
    softPanelClass: "border border-cyan-400/20 bg-slate-900/78",
    mutedClass: "text-slate-300",
    badgeClass: "bg-cyan-300 text-slate-950",
    buttonClass: "bg-cyan-300 text-slate-950 hover:bg-cyan-200",
    outlineButtonClass: "border border-cyan-400/30 bg-transparent text-cyan-100 hover:bg-cyan-400/10",
    heroEyebrow: "Split-screen social dashboard",
    heroDescription:
      "Profile identity on one side, task media on the other, with sharper contrast and faster scan lines.",
  },
  radianpark: {
    key: "radianpark",
    label: "Orbit Header",
    fontClass: "font-sans",
    pageClass:
      "bg-[linear-gradient(180deg,#fdfdfd_0%,#f5f6f8_48%,#ffffff_100%)]",
    panelClass:
      "border border-zinc-200 bg-white shadow-[0_24px_70px_rgba(24,24,27,0.08)]",
    softPanelClass: "border border-zinc-200 bg-zinc-50",
    mutedClass: "text-zinc-600",
    badgeClass: "bg-zinc-950 text-white",
    buttonClass: "bg-zinc-950 text-white hover:bg-zinc-800",
    outlineButtonClass: "border border-zinc-300 bg-white text-zinc-950 hover:bg-zinc-100",
    heroEyebrow: "Minimal signal-bar profile system",
    heroDescription:
      "Horizontal identity bars, dense metadata, and magazine-cover result cards with disciplined spacing.",
  },
  lashisking: {
    key: "lashisking",
    label: "Salon Luxe",
    fontClass: "font-serif",
    pageClass:
      "bg-[radial-gradient(circle_at_top,rgba(244,114,182,0.18),transparent_30%),linear-gradient(180deg,#fff8fc_0%,#fffdf8_100%)]",
    panelClass:
      "border border-rose-200/70 bg-white/92 shadow-[0_32px_90px_rgba(190,24,93,0.13)]",
    softPanelClass: "border border-rose-200/70 bg-rose-50/80",
    mutedClass: "text-rose-950/70",
    badgeClass: "bg-rose-900 text-rose-50",
    buttonClass: "bg-gradient-to-r from-rose-700 to-fuchsia-500 text-white hover:opacity-95",
    outlineButtonClass: "border border-rose-300 bg-white text-rose-900 hover:bg-rose-50",
    heroEyebrow: "Luxury social profile cards",
    heroDescription:
      "Serif-led hierarchy, rounded social chips, and beauty-led image framing with softer glow depth.",
  },
  scoreminers: {
    key: "scoreminers",
    label: "Brutalist Board",
    fontClass: "font-sans",
    pageClass:
      "bg-[linear-gradient(180deg,#fff7d1_0%,#f5efe1_100%)]",
    panelClass:
      "border-[3px] border-slate-950 bg-white shadow-[12px_12px_0_rgba(15,23,42,0.9)]",
    softPanelClass: "border-[3px] border-slate-950 bg-[#fff5b4]",
    mutedClass: "text-slate-700",
    badgeClass: "bg-lime-300 text-slate-950",
    buttonClass: "bg-slate-950 text-lime-200 hover:bg-slate-800",
    outlineButtonClass: "border-[3px] border-slate-950 bg-white text-slate-950 hover:bg-slate-100",
    heroEyebrow: "Hard-shadow performance surfaces",
    heroDescription:
      "Big-number blocks, sharp edges, and zero-frill cards that feel like a scored media terminal.",
  },
  linedesing: {
    key: "linedesing",
    label: "Blueprint Editorial",
    fontClass: "font-serif",
    pageClass:
      "bg-[linear-gradient(180deg,#f4f7fb_0%,#ffffff_100%)]",
    panelClass:
      "border border-sky-200 bg-white shadow-[0_18px_60px_rgba(14,116,144,0.08)]",
    softPanelClass:
      "border border-sky-200 bg-[linear-gradient(180deg,rgba(224,242,254,0.55),rgba(255,255,255,0.95))]",
    mutedClass: "text-slate-600",
    badgeClass: "bg-sky-800 text-sky-50",
    buttonClass: "bg-sky-800 text-white hover:bg-sky-700",
    outlineButtonClass: "border border-sky-300 bg-white text-sky-900 hover:bg-sky-50",
    heroEyebrow: "Blueprint-inspired article frames",
    heroDescription:
      "Measured side rails, technical dividers, and cleaner editorial scaffolding for dense result pages.",
  },
  helloartcity: {
    key: "helloartcity",
    label: "Poster Playground",
    fontClass: "font-sans",
    pageClass:
      "bg-[linear-gradient(180deg,#fff9ea_0%,#ffffff_45%,#eefcf7_100%)]",
    panelClass:
      "border border-orange-200 bg-white shadow-[0_24px_70px_rgba(249,115,22,0.14)]",
    softPanelClass: "border border-emerald-200 bg-emerald-50/70",
    mutedClass: "text-stone-700",
    badgeClass: "bg-orange-500 text-white",
    buttonClass: "bg-orange-500 text-white hover:bg-orange-400",
    outlineButtonClass: "border border-orange-300 bg-white text-orange-900 hover:bg-orange-50",
    heroEyebrow: "Playful poster-stack layouts",
    heroDescription:
      "Collaged cards, sticker-like metadata, and energetic related-work modules for art-forward browsing.",
  },
  housesdecors: {
    key: "housesdecors",
    label: "Interior Ledger",
    fontClass: "font-serif",
    pageClass:
      "bg-[linear-gradient(180deg,#f7f1e8_0%,#fcfaf7_100%)]",
    panelClass:
      "border border-amber-200 bg-[#fffdf8] shadow-[0_22px_70px_rgba(120,53,15,0.09)]",
    softPanelClass: "border border-amber-200 bg-[#f5ede0]",
    mutedClass: "text-amber-950/70",
    badgeClass: "bg-amber-900 text-amber-50",
    buttonClass: "bg-amber-900 text-white hover:bg-amber-800",
    outlineButtonClass: "border border-amber-300 bg-white text-amber-950 hover:bg-amber-50",
    heroEyebrow: "Warm interior showcase surfaces",
    heroDescription:
      "Layered material panels, room-note style metadata, and vertically paced gallery browsing.",
  },
  aporiakennels: {
    key: "aporiakennels",
    label: "Field Journal",
    fontClass: "font-sans",
    pageClass:
      "bg-[radial-gradient(circle_at_top,rgba(74,222,128,0.12),transparent_28%),linear-gradient(180deg,#f7fbf2_0%,#ffffff_100%)]",
    panelClass:
      "border border-emerald-200 bg-white shadow-[0_20px_64px_rgba(22,101,52,0.1)]",
    softPanelClass: "border border-emerald-200 bg-emerald-50/70",
    mutedClass: "text-emerald-950/70",
    badgeClass: "bg-emerald-900 text-emerald-50",
    buttonClass: "bg-emerald-900 text-white hover:bg-emerald-800",
    outlineButtonClass: "border border-emerald-300 bg-white text-emerald-950 hover:bg-emerald-50",
    heroEyebrow: "Field-note kennel identity pages",
    heroDescription:
      "Passport-like profile modules, kennel stats as badges, and calm image rails that foreground trust.",
  },
  earthskydesign: {
    key: "earthskydesign",
    label: "Organic Horizon",
    fontClass: "font-serif",
    pageClass:
      "bg-[radial-gradient(circle_at_top,rgba(59,130,246,0.14),transparent_24%),linear-gradient(180deg,#eff8f7_0%,#fffdf8_100%)]",
    panelClass:
      "border border-teal-200/80 bg-white/90 shadow-[0_26px_80px_rgba(13,148,136,0.12)] backdrop-blur",
    softPanelClass: "border border-teal-200 bg-teal-50/60",
    mutedClass: "text-slate-600",
    badgeClass: "bg-teal-800 text-teal-50",
    buttonClass: "bg-teal-800 text-white hover:bg-teal-700",
    outlineButtonClass: "border border-teal-300 bg-white text-teal-950 hover:bg-teal-50",
    heroEyebrow: "Airy organic profile landscapes",
    heroDescription:
      "Soft split layouts, rounded environmental framing, and breathable task detail pages with cleaner reading rhythm.",
  },
};

export function getSiteExperience(baseUrl?: string): SiteExperience {
  const host = (baseUrl || "")
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/.*$/, "")
    .toLowerCase();

  if (host.includes("codepixelmedia")) return EXPERIENCES.codepixelmedia;
  if (host.includes("radianpark")) return EXPERIENCES.radianpark;
  if (host.includes("lashisking")) return EXPERIENCES.lashisking;
  if (host.includes("scoreminers")) return EXPERIENCES.scoreminers;
  if (host.includes("linedesing")) return EXPERIENCES.linedesing;
  if (host.includes("helloartcity")) return EXPERIENCES.helloartcity;
  if (host.includes("housesdecors")) return EXPERIENCES.housesdecors;
  if (host.includes("aporiakennels")) return EXPERIENCES.aporiakennels;
  if (host.includes("earthskydesign")) return EXPERIENCES.earthskydesign;
  return EXPERIENCES.tynewebdesign;
}

