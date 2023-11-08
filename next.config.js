/** @type {import('next').NextConfig} */
const nextConfig = {
    // reactStrictMode: true,
    swcMinify: true,

    webpack(config, { isServer }) {
        config.module.rules.push({
            test: /\.svg$/i,
            issuer: /\.[jt]sx?$/,
            use: ["@svgr/webpack"],
        });

        if (!isServer) {
            config.resolve.fallback.net = false;
            config.resolve.fallback.tls = false;
            config.resolve.fallback.fs = false;
        }

        return config;
    },

    env: {
        MYSQL_HOST: "127.0.0.1",
        MYSQL_PORT: "3306",
        MYSQL_DATABASE: "ght_bar",
        MYSQL_USER: "root",
        MYSQL_PASSWORD: "password",
    },
    // env: {
    //     MYSQL_HOST: "ght.bar",
    //     MYSQL_PORT: "3306",
    //     MYSQL_DATABASE: "ght_bar",
    //     MYSQL_USER: "Developer",
    //     MYSQL_PASSWORD: "Developer1902",
    // },
};

module.exports = nextConfig;
