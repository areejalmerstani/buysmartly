import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            { protocol: "https", hostname: "**.amazon.com" },
            { protocol: "https", hostname: "**.ebayimg.com" },
            { protocol: "https", hostname: "**.alicdn.com" },
            { protocol: "https", hostname: "**.noon.com" },
            { protocol: "https", hostname: "**.walmartimages.com" },
        ],
    },
    experimental: {
        typedRoutes: true,
    },
};

export default withNextIntl(nextConfig);