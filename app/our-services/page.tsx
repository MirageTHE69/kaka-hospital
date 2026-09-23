import { departments } from "@/content/departments";
import { site, telHref } from "@/content/site";
import { pageMeta } from "@/lib/seo";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Placeholder } from "@/components/Placeholder";
import { ServicesExplorer, type ExplorerItem } from "@/components/services/ServicesExplorer";
import { DefaultCtaBand } from "@/components/ui";

export const metadata = pageMeta({
  title: "Our Services",
  description:
    "Departments at KK Multispeciality Hospital, Vadodara: orthopedics, gynecology & obstetrics, internal medicine, physiotherapy, dermatology, diagnostics & lab, pharmacy and 24×7 emergency & trauma care.",
  path: "/our-services/",
});

export default function ServicesPage() {
  const items: ExplorerItem[] = departments.map((d) => ({
    slug: d.slug,
    name: d.name,
    summary: d.summary,
    art: d.art,
    image: d.image ?? d.heroImage,
    serviceCount: d.services.length,
    haystack: [d.name, d.h1, d.summary ?? "", ...d.services.map((s) => s.title), ...d.bullets, ...d.keywords].join(" ").toLowerCase(),
  }));

  return (
    <>
      <ServicesExplorer
        items={items}
        breadcrumbs={<Breadcrumbs tone="dark" items={[{ label: "Our Services", href: "/our-services/" }]} />}
        phone={{ display: site.phone.display, href: telHref }}
        photos={[
          { src: "/images/dr-alpesh-parekh.png", alt: "Dr. Alpesh Parekh, Orthopaedic Surgeon", position: "top" },
          { src: "/images/stock/gynecology-ultrasound.jpg", alt: "Pregnancy ultrasound scan" },
          { src: "/images/stock/pharmacist.jpg", alt: "Pharmacist at the in-house pharmacy" },
        ]}
      />
      {departments.some((d) => !d.summary) && (
        <div className="container-site -mt-8 mb-8">
          <Placeholder>One-line summaries for: {departments.filter((d) => !d.summary).map((d) => d.name).join(", ")}.</Placeholder>
        </div>
      )}
      <DefaultCtaBand />
    </>
  );
}
