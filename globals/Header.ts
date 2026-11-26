import type { GlobalConfig } from "payload";

/** Editor-only. The public header is the designed site component. */
export const Header: GlobalConfig = {
  slug: "header",
  label: "Header",
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
        description: "Stored for editors. The public header does not read this global.",
      },
    },
  ],
};
