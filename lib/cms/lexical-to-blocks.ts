import type { BlogBlock } from "@/lib/blog";

type LexicalNode = {
  type?: string;
  tag?: string;
  text?: string;
  url?: string;
  listType?: string;
  children?: LexicalNode[];
  fields?: {
    url?: string;
    linkType?: string;
    newTab?: boolean;
  };
  value?: unknown;
};

function linkHref(node: LexicalNode): string {
  const fromFields = node.fields?.url;
  if (typeof fromFields === "string" && fromFields.trim()) return fromFields.trim();
  if (typeof node.url === "string" && node.url.trim()) return node.url.trim();
  return "";
}

function inlineText(node: LexicalNode | undefined): string {
  if (!node) return "";
  if (node.type === "linebreak") return "\n";
  if (node.type === "text") return node.text ?? "";
  if (node.type === "link" || node.type === "autolink") {
    const label = (node.children ?? []).map((child) => inlineText(child)).join("");
    const href = linkHref(node);
    if (!href || !label) return label;
    return `[${label}](${href})`;
  }
  return (node.children ?? []).map((child) => inlineText(child)).join("");
}

function mediaFromUpload(value: unknown): { src: string; alt: string } | null {
  if (!value || typeof value !== "object") return null;
  const record = value as { url?: unknown; alt?: unknown; filename?: unknown };
  if (typeof record.url !== "string" || !record.url) return null;
  const alt =
    typeof record.alt === "string" && record.alt.trim()
      ? record.alt
      : typeof record.filename === "string"
        ? record.filename
        : "";
  return { src: record.url, alt };
}

function blocksFromNode(node: LexicalNode): BlogBlock[] {
  switch (node.type) {
    case "heading": {
      const text = inlineText(node).trim();
      if (!text) return [];
      const level = node.tag === "h3" || node.tag === "h4" || node.tag === "h5" || node.tag === "h6" ? 3 : 2;
      return [{ type: "heading", level, text }];
    }
    case "paragraph": {
      const text = inlineText(node).trim();
      if (!text) return [];
      return [{ type: "paragraph", text }];
    }
    case "quote": {
      const text = inlineText(node).trim();
      if (!text) return [];
      return [{ type: "quote", text }];
    }
    case "list": {
      const items = (node.children ?? [])
        .map((item) => inlineText(item).trim())
        .filter(Boolean);
      if (!items.length) return [];
      const style = node.listType === "number" || node.tag === "ol" ? "number" : "bullet";
      return [{ type: "list", style, items }];
    }
    case "horizontalrule":
      return [{ type: "divider" }];
    case "upload": {
      const media = mediaFromUpload(node.value);
      if (!media) return [];
      return [{ type: "image", src: media.src, alt: media.alt }];
    }
    case "listitem":
    case "text":
    case "link":
    case "linebreak":
      return [];
    default: {
      if (node.children?.length) {
        return node.children.flatMap((child) => blocksFromNode(child));
      }
      return [];
    }
  }
}

export function lexicalToBlocks(content: unknown): BlogBlock[] {
  if (!content || typeof content !== "object") return [];
  const root = (content as { root?: LexicalNode }).root;
  if (!root) return [];
  return (root.children ?? []).flatMap((child) => blocksFromNode(child));
}

export function blockPlainText(blocks: BlogBlock[]): string {
  return blocks
    .map((block) => {
      switch (block.type) {
        case "heading":
        case "paragraph":
        case "quote":
          return block.text;
        case "list":
          return block.items.join(" ");
        case "callout":
          return block.text;
        default:
          return "";
      }
    })
    .join(" ");
}
