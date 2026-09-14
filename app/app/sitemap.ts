import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, priority: 1 },
    { url: `${site.url}/servicos`, priority: 0.9 },
    { url: `${site.url}/contato`, priority: 0.9 },
    { url: `${site.url}/portfolio`, priority: 0.8 },
    { url: `${site.url}/quem-somos`, priority: 0.7 },
    { url: `${site.url}/termos`, priority: 0.3 },
    { url: `${site.url}/privacidade`, priority: 0.3 },
  ];
}
