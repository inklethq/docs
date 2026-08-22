"use client";

import { createOpenAPIPage } from "fumadocs-openapi/ui";
import { createCodeUsageGeneratorRegistry } from "fumadocs-openapi/requests/generators";
import { registerDefault } from "fumadocs-openapi/requests/generators/all";

const codeUsages = createCodeUsageGeneratorRegistry();
registerDefault(codeUsages);

export const OpenAPIPage = createOpenAPIPage({
  codeUsages,
  playground: {
    // PATs are server credentials. The public reference deliberately shows
    // executable examples without asking readers to paste a PAT into a page.
    enabled: false,
  },
  schemaUI: { showExample: true },
});
