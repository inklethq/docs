import { createOpenAPI } from "fumadocs-openapi/server";
import path from "node:path";

export const openapi = createOpenAPI({
  // Resolve the schema before Next.js moves server modules into `.next`.
  // A relative string would otherwise be interpreted from a build worker.
  input: [path.resolve(process.cwd(), "contracts/public-api.yaml")],
});
