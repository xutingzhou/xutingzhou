import remarkGfm from "remark-gfm";
import rehypePrism from "rehype-prism-plus";

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {},
  pageExtensions: ["js", "jsx", "ts", "tsx", "mdx"],

  experimental: {
    mdxRs: false,
    optimizePackageImports: ["@phosphor-icons/react"],
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.mdx?$/,
      use: [
        {
          loader: "@mdx-js/loader",
          options: {
            remarkPlugins: [[remarkGfm, {}]],
            rehypePlugins: [[rehypePrism, {}]],
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
