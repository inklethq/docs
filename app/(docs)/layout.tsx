import { DocsLayout } from "fumadocs-ui/layouts/docs";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";

export default function DocumentationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <DocsLayout
      {...baseOptions()}
      tree={source.getPageTree()}
      tabMode="auto"
      sidebar={{ defaultOpenLevel: 1 }}
    >
      {children}
    </DocsLayout>
  );
}
