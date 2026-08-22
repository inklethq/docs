# inklet documentation

The public documentation for the inklet TypeScript SDK and HTTP API. The site
is built with Next.js and Fumadocs.

## Source of truth

- `content/` contains the user-facing guides and SDK workflows.
- `contracts/public-api.yaml` contains the curated public HTTP contract.
  Fumadocs generates the entire `/http` reference section from this file.
- Type tables in the SDK reference are generated from the published
  `@inklethq/sdk` declaration files pinned in `package.json`.
- Internal endpoints, deployment details, and operational notes belong in the
  private `docs-dev` site, not in this repository.

This separation is intentional: the public site documents stable behavior,
while implementation details remain private.

## Development

```bash
pnpm install
pnpm dev
```

Useful checks:

```bash
pnpm types:check
pnpm build
pnpm check
```

## Updating the reference

1. Publish the SDK version that contains the new public types.
2. Update `@inklethq/sdk` in `package.json`.
3. Update `contracts/public-api.yaml` for HTTP-level changes.
4. Update the relevant guide in `content/` when behavior or workflows change.
5. Run `pnpm check` and verify both the SDK and HTTP reference pages locally.

Do not copy the internal API schema wholesale into this repository. Review the
contract and expose only the stable endpoints and fields intended for SDK users.
