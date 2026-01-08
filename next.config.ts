import type { NextConfig } from "next";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  // Enable static export for deployment
  output: "export",

  // Configure page extensions to include MDX
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],

  // Image optimization disabled for static export
  images: {
    unoptimized: true,
  },
};

const withMDX = createMDX({
  // Add markdown plugins here if needed
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
