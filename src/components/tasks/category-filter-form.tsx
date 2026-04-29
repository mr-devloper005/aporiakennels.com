"use client";

import { Suspense } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { CATEGORY_OPTIONS } from "@/lib/categories";

type CategoryFilterFormProps = {
  experience: any;
};

function CategoryFilterInner({ experience }: CategoryFilterFormProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get("category") || "all";

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    
    if (newCategory === "all") {
      params.delete("category");
    } else {
      params.set("category", newCategory);
    }
    
    const queryString = params.toString();
    router.push(`${pathname}${queryString ? `?${queryString}` : ''}`, { scroll: false });
  };

  return (
    <div className="grid gap-3">
      <label className={`text-xs font-semibold uppercase tracking-[0.24em} ${experience.mutedClass}`}>
        Category
      </label>
      <select
        value={currentCategory}
        onChange={handleCategoryChange}
        className="h-11 rounded-xl border border-border bg-white/80 px-3 text-sm text-foreground"
      >
        <option value="all">All categories</option>
        {CATEGORY_OPTIONS.map((item) => (
          <option key={item.slug} value={item.slug}>
            {item.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export function CategoryFilterForm(props: CategoryFilterFormProps) {
  return (
    <Suspense fallback={<div className="h-11 rounded-xl border border-border bg-white/80 animate-pulse" />}>
      <CategoryFilterInner {...props} />
    </Suspense>
  );
}
