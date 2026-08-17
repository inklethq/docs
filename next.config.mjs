import nextra from "nextra";

const withNextra = nextra({
  defaultShowCopyCode: true,
  codeHighlight: true,
  search: { codeblocks: false },
});

export default withNextra({
  reactStrictMode: true,
});
