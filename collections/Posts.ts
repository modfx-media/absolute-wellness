import type { CollectionConfig, FieldHook } from "payload";

const emptySlugToNull: FieldHook = ({ value }) => {
  if (typeof value !== "string") return null;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : null;
};

export const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "slug", "datePublished", "_status"],
    preview: (doc) => {
      const slug = typeof doc?.slug === "string" ? doc.slug.trim() : "";
      const secret = process.env.PREVIEW_SECRET;
      if (!slug || !secret) return null;
      const params = new URLSearchParams({
        path: `/blog/${slug}/`,
        previewSecret: secret,
      });
      return `/next/preview?${params.toString()}`;
    },
  },
  versions: {
    drafts: {
      autosave: false,
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      unique: true,
      index: true,
      hooks: {
        beforeValidate: [emptySlugToNull],
      },
    },
    {
      name: "datePublished",
      type: "date",
      required: true,
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
      },
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "content",
      type: "richText",
    },
    {
      name: "seo",
      type: "group",
      label: "SEO",
      fields: [
        { name: "metaTitle", type: "text" },
        { name: "metaDescription", type: "textarea" },
        { name: "canonicalUrl", type: "text" },
        { name: "noIndex", type: "checkbox", defaultValue: false },
        { name: "excludeFromSitemap", type: "checkbox", defaultValue: false },
      ],
    },
  ],
};
