import { generateStaticParamsFor, importPage } from "nextra/pages";
import { useMDXComponents as getMDXComponents } from "../../mdx-components";

export const generateStaticParams = generateStaticParamsFor("mdxPath");

type PageProps = {
  params: Promise<{ mdxPath?: string[] }>;
};

export async function generateMetadata(props: PageProps) {
  const params = await props.params;
  const { metadata } = await importPage(params.mdxPath);
  return metadata;
}

const Wrapper = getMDXComponents().wrapper!;

export default async function Page(props: PageProps) {
  const params = await props.params;
  const result = await importPage(params.mdxPath);
  const { default: MDXContent, toc, metadata, sourceCode } = result;

  // `sourceCode` is what powers the theme's "Copy page / Open in ChatGPT /
  // Open in Claude" menu — without it the button renders with nothing to give.
  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <MDXContent {...props} params={params} />
    </Wrapper>
  );
}
