import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://crafthive.com";

  const routes = [
    "",
    "/about",
    "/contact",
    "/gallery",
    "/services",
    "/services/custom-framing",
    "/services/handicrafts",
    "/services/shadow-box",
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1.0 : route.startsWith("/services") ? 0.9 : 0.8,
  }));
}
