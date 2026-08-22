import { loader } from "fumadocs-core/source";
import { lucideIconsPlugin } from "fumadocs-core/source/lucide-icons";
import type { Folder, Item, Node, Root } from "fumadocs-core/page-tree";
import { defineDocs } from "fumadocs-mdx/macro";
import { metaSchema, pageSchema } from "fumadocs-core/source/schema";
import { openapi } from "./openapi";

const docs = defineDocs({
  dir: "content",
  docs: {
    schema: pageSchema,
    postprocess: { includeProcessedMarkdown: true },
  },
  meta: { schema: metaSchema },
});

function collectUrls(node: Node): string[] {
  if (node.type === "page") return [node.url];
  if (node.type === "separator") return [];

  return [
    ...(node.index ? [node.index.url] : []),
    ...node.children.flatMap(collectUrls),
  ];
}

function firstPage(nodes: Node[]): Item | undefined {
  for (const node of nodes) {
    if (node.type === "page") return node;
    if (node.type === "folder") {
      if (node.index) return node.index;
      const nested = firstPage(node.children);
      if (nested) return nested;
    }
  }
}

function tabFolder(
  id: string,
  name: string,
  description: string,
  children: Node[],
): Folder {
  return {
    $id: `inklet-${id}`,
    type: "folder",
    name,
    description,
    root: true,
    index: firstPage(children),
    children,
  };
}

function navigationTabs(root: Root): Root {
  const guides: Node[] = [];
  const sdk: Node[] = [];
  const http: Node[] = [];

  for (const node of root.children) {
    const urls = collectUrls(node);
    if (urls.length === 0) continue;

    if (urls.every((url) => url.startsWith("/http/"))) {
      // The OpenAPI source already groups operations by tag. Flatten only its
      // outer implementation folder so the selected tab starts at Displays.
      http.push(...(node.type === "folder" ? node.children : [node]));
    } else if (
      urls.every((url) => url.startsWith("/api/") || url === "/errors")
    ) {
      sdk.push(...(node.type === "folder" ? node.children : [node]));
    } else {
      guides.push(node);
    }
  }

  sdk.push(
    { $id: "inklet-sdk-resources", type: "separator", name: "Resources" },
    {
      $id: "inklet-sdk-overview",
      type: "page",
      name: "SDK overview",
      url: "https://iminklet.com/developers",
      external: true,
    },
    {
      $id: "inklet-sdk-npm",
      type: "page",
      name: "npm package",
      url: "https://www.npmjs.com/package/@inklethq/sdk",
      external: true,
    },
  );

  return {
    ...root,
    children: [
      tabFolder(
        "guides",
        "Guides",
        "Setup, authentication, plans, and push workflows.",
        guides,
      ),
      tabFolder(
        "typescript-sdk",
        "TypeScript SDK",
        "Client resources, generated types, and errors.",
        sdk,
      ),
      tabFolder(
        "http-api",
        "HTTP API",
        "The public OpenAPI reference, grouped by resource.",
        http,
      ),
    ],
  };
}

export const source = loader(
  {
    docs: docs.toFumadocsSource(),
    openapi: await openapi.staticSource({
      baseDir: "http",
      meta: { folderStyle: "separator" },
      groupBy: "tag",
      per: "operation",
    }),
  },
  {
    baseUrl: "/",
    plugins: [
      lucideIconsPlugin(),
      openapi.loaderPlugin(),
      {
        name: "inklet:navigation-tabs",
        transformPageTree: { root: navigationTabs },
      },
    ],
  },
);

export { openapi };

export function getPageMarkdownUrl(page: (typeof source)["$inferPage"]) {
  const segments = [...page.slugs, "content.md"];
  return {
    segments,
    url: `/${["llms.mdx", ...segments].filter(Boolean).join("/")}`,
  };
}

export async function getLLMText(page: (typeof source)["$inferPage"]) {
  if (page.type === "openapi") {
    return `# ${page.data.title} (${page.url})\n\n${JSON.stringify(
      page.data.getSchema().bundled,
      null,
      2,
    )}`;
  }

  return `# ${page.data.title} (${page.url})\n\n${await page.data.getText(
    "processed",
  )}`;
}
