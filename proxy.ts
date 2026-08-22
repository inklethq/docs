import { NextRequest, NextResponse } from "next/server";
import { isMarkdownPreferred, rewritePath } from "fumadocs-core/negotiation";

const { rewrite: rewriteDocs } = rewritePath(
  "{/*path}",
  "/llms.mdx{/*path}/content.md",
);
const { rewrite: rewriteSuffix } = rewritePath(
  "{/*path}.md",
  "/llms.mdx{/*path}/content.md",
);

export default function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  // Rewrites re-enter the proxy. Stop once a request has reached the internal
  // Markdown route or the destination would keep growing until Next returns
  // 431 (request headers too large).
  if (pathname.startsWith("/llms.mdx/")) {
    return NextResponse.next();
  }

  const suffixResult = rewriteSuffix(pathname);
  if (suffixResult) {
    return NextResponse.rewrite(new URL(suffixResult, request.nextUrl));
  }

  if (isMarkdownPreferred(request)) {
    const docsResult = rewriteDocs(pathname);
    if (docsResult) {
      return NextResponse.rewrite(new URL(docsResult, request.nextUrl), {
        headers: { Vary: "Accept" },
      });
    }
  }

  return NextResponse.next();
}
