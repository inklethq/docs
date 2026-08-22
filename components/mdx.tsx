import type { MDXComponents } from "mdx/types";
import defaultMdxComponents from "fumadocs-ui/mdx";
import { Step, Steps } from "fumadocs-ui/components/steps";
import { Tab, Tabs } from "fumadocs-ui/components/tabs";
import { AutoTypeTable } from "fumadocs-typescript/ui";
import {
  createFileSystemGeneratorCache,
  createGenerator,
} from "fumadocs-typescript";

const sdkTypeGenerator = createGenerator({
  cache: createFileSystemGeneratorCache(".next/fumadocs-typescript"),
  tsconfigPath: "./tsconfig.json",
});

type SdkTypeProperties = {
  file:
    | "assets"
    | "client"
    | "contents"
    | "displays"
    | "errors"
    | "presentations"
    | "push";
  name: string;
};

async function SdkType({ file, name }: SdkTypeProperties) {
  return (
    <AutoTypeTable
      generator={sdkTypeGenerator}
      path={`node_modules/@inklethq/sdk/dist/types/${file}.d.ts`}
      name={name}
    />
  );
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...defaultMdxComponents,
    Step,
    Steps,
    Tab,
    Tabs,
    SdkType,
    ...components,
  } satisfies MDXComponents;
}

export const useMDXComponents = getMDXComponents;

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
