import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  DocsBody,
  DocsDescription,
  DocsPage,
  DocsTitle,
  MarkdownCopyButton,
  ViewOptionsPopover,
} from "fumadocs-ui/layouts/docs/page";
import { createRelativeLink } from "fumadocs-ui/mdx";
import { getMDXComponents } from "@/components/mdx";
import { OpenAPIPage } from "@/components/openapi-page";
import {
  getPageMarkdownUrl,
  source,
} from "@/lib/source";

type PageProperties = {
  params: Promise<{ slug?: string[] }>;
};

export default async function DocumentationPage({ params }: PageProperties) {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  if (page.type === "openapi") {
    return (
      <DocsPage toc={page.data.toc} full>
        <DocsTitle>{page.data.title}</DocsTitle>
        <DocsBody>
          <OpenAPIPage
            {...page.data.getOpenAPIPageProps()}
          />
        </DocsBody>
      </DocsPage>
    );
  }

  const MDX = page.data.body;
  const markdownUrl = getPageMarkdownUrl(page).url;

  return (
    <DocsPage toc={page.data.toc} full={page.data.full}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription className="mb-0">
        {page.data.description}
      </DocsDescription>
      <div className="flex items-center gap-2 border-b pb-6">
        <MarkdownCopyButton markdownUrl={markdownUrl} />
        <ViewOptionsPopover
          markdownUrl={markdownUrl}
          githubUrl={`https://github.com/inklethq/docs/blob/main/content/${page.path}`}
        />
      </div>
      <DocsBody>
        <MDX
          components={getMDXComponents({
            a: createRelativeLink(source, page),
          })}
        />
      </DocsBody>
    </DocsPage>
  );
}

export function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata({
  params,
}: PageProperties): Promise<Metadata> {
  const { slug } = await params;
  const page = source.getPage(slug);
  if (!page) notFound();

  return {
    title: page.data.title,
    description: page.data.description,
    alternates:
      page.type === "docs"
        ? { canonical: page.url, types: { "text/markdown": getPageMarkdownUrl(page).url } }
        : { canonical: page.url },
  };
}
