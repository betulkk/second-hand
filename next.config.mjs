import { withNextVideo } from "next-video/process";
/** @type {import('next').NextConfig} */
import dotenv from "dotenv";
dotenv.config();
const nextConfig = {
    webpack: (config, { isServer }) => {
        if (isServer) {
            config.resolve.fallback = {
                ...config.resolve.fallback,
                fs: false,
                path: false, 
            };
        }

        config.module.rules.push({
            test: /\.html$/,
            use: ['html-loader'],
        });

        return config;
    },
    images: {
        domains: ["th.bing.com", "www.ilkebebe.com", "images.hepsiburada.net"]
    },
    env: {
        GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
        GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
    }
};

export default withNextVideo(nextConfig);