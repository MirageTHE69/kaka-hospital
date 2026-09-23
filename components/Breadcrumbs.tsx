import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { JsonLd } from "./JsonLd";
import { site } from "@/content/site";

export type Crumb = { label: string; href: string };

export function Breadcrumbs({ items, tone = "light" }: { items: Crumb[]; tone?: "light" | "dark" }) {
  const all = [{ label: "Home", href: "/" }, ...items];
  const muted = tone === "dark" ? "text-film/80 hover:text-white" : "text-slate-500 hover:text-ward";
  const current = tone === "dark" ? "text-white" : "text-radiograph";
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-[15px]">
        <ol className="flex flex-wrap items-center gap-1.5">
          {all.map((c, i) => {
            const last = i === all.length - 1;
            return (
              <li key={c.href} className="flex items-center gap-1.5">
                {last ? (
                  <span aria-current="page" className={`font-medium ${current}`}>
                    {c.label}
                  </span>
                ) : (
                  <>
                    <Link href={c.href} className={`transition-colors ${muted}`}>
                      {c.label}
                    </Link>
                    <ChevronRight aria-hidden className={`h-4 w-4 ${tone === "dark" ? "text-film/50" : "text-slate-400"}`} />
                  </>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: all.map((c, i) => ({
            "@type": "ListItem",
            position: i + 1,
            name: c.label,
            item: new URL(c.href, site.url).toString(),
          })),
        }}
      />
    </>
  );
}
