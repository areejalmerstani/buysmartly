import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // React Compiler — stable in Next.js 16, reduces re-renders automatically
    reactCompiler: true,

    images: {
        remotePatterns: [
            { protocol: "https", hostname: "**.amazon.com" },
            { protocol: "https", hostname: "**.ebayimg.com" },
            { protocol: "https", hostname: "**.alicdn.com" },
            { protocol: "https", hostname: "**.noon.com" },
            { protocol: "https", hostname: "**.walmartimages.com" },
        ],
    },

    // Typed routes — catches broken <Link href> at build time
    experimental: {
        typedRoutes: true,
    },
};

export default nextConfig;