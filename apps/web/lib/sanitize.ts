import sanitizeHtml from "sanitize-html";

const ALLOWED_TAGS = [
  "h1", "h2", "h3", "h4", "h5", "h6",
  "p", "br", "hr",
  "strong", "em", "b", "i", "u", "s", "del", "mark", "code", "pre",
  "ul", "ol", "li",
  "blockquote",
  "a",
  "img",
  "table", "thead", "tbody", "tr", "th", "td",
  "figure", "figcaption",
  "div", "span",
];

const ALLOWED_ATTRIBUTES: sanitizeHtml.IOptions["allowedAttributes"] = {
  "*": ["id", "class", "style"],
  a: ["href", "target", "rel"],
  img: ["src", "alt", "width", "height", "loading"],
  th: ["colspan", "rowspan"],
  td: ["colspan", "rowspan"],
};

export function sanitizeContent(html: string): string {
  return sanitizeHtml(html, {
    allowedTags: ALLOWED_TAGS,
    allowedAttributes: ALLOWED_ATTRIBUTES,
    allowedSchemes: ["https", "http", "mailto"],
    // strip style attributes that could be used for exfil/injection
    allowedStyles: {
      "*": {
        "scroll-margin-top": [/.*/],
        color: [/^#[0-9a-f]{3,6}$/i],
      },
    },
  });
}
