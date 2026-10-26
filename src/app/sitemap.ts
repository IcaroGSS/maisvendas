import type { MetadataRoute } from "next";
import { nichos, site } from "@/config/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const paginas = ["", "/modelos", "/nichos", "/previa-gratis", "/como-funciona", "/planos", "/duvidas"];
  return [
    ...paginas.map((p) => ({
      url: `${site.url}${p}`,
      changeFrequency: "monthly" as const,
      priority: p === "" ? 1 : p === "/previa-gratis" ? 0.9 : 0.7,
    })),
    ...nichos.map((n) => ({
      url: `${site.url}/nichos/${n.slug}`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
