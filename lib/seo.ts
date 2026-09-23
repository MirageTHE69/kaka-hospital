import type { Metadata } from "next";
import { site } from "@/content/site";

/** Per-page metadata. Titles use the root template: "{Page} | KK Multispeciality Hospital, Vadodara". */
export function pageMeta({
  title,
  description,
  path,
  image,
  noindex,
  absoluteTitle,
  type = "website",
}: {
  title: string;
  description: string;
  path: string;
  image?: string;
  noindex?: boolean;
  absoluteTitle?: boolean;
  type?: "website" | "article";
}): Metadata {
  const url = new URL(path, site.url).toString();
  const fullTitle = absoluteTitle ? title : `${title} | KK Multispeciality Hospital, Vadodara`;
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: { canonical: url },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      type,
      url,
      title: fullTitle,
      description,
      siteName: site.name,
      locale: "en_IN",
      images: [{ url: image ?? "/images/og-default.jpg", alt: site.name }],
    },
    twitter: { card: "summary_large_image", title: fullTitle, description },
  };
}
