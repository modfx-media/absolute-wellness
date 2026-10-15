import type { MetadataRoute } from "next";
import { BLOG_IS_PUBLIC } from "@/lib/blog-visibility";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: BLOG_IS_PUBLIC ? ["/api/"] : ["/api/", "/blog/"],
      },
    ],
    sitemap: "https://awceugene.com/sitemap.xml",
    host: "https://awceugene.com",
  };
}
