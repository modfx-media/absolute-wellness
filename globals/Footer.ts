import type { GlobalConfig } from "payload";

/** Editor-only. The public footer is the designed site component. */
export const Footer: GlobalConfig = {
  slug: "footer",
  label: "Footer",
  versions: {
    drafts: {
      autosave: false,
    },
  },
  fields: [
    {
      name: "note",
      type: "textarea",
      admin: {
        description: "Stored for editors. The public footer does not read this global.",
      },
    },
  ],
};
