import type { MetadataRoute } from "next";
import { services } from "@/lib/services";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [
    "",
    "/services",
    ...services.map((s) => `/services/${s.slug}`),
    "/book",
    "/about",
    "/gallery",
    "/reviews",
    "/faq",
    "/contact",
    "/privacy",
  ];
  return paths.map((p) => ({
    url: `${site.url}${p}`,
    priority: p === "" ? 1 : p.startsWith("/services/") ? 0.7 : 0.8,
  }));
}
