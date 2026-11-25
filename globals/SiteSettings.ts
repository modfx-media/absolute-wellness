import type { GlobalConfig } from "payload";

/** Editor-only. Page titles, descriptions, and canonicals stay in the site code. */
export const SiteSettings: GlobalConfig = {
  slug: "site-settings",
  label: "Site Settings",
  versions: {
    drafts: {
      autosave: false,
    },
  },
  fields: [
    {
      name: "siteName",
      type: "text",
      defaultValue: "Absolute Wellness Center",
    },
  ],
};
