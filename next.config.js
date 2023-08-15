/** @type {import('next').NextConfig} */

const nextConfig = {
    experimental: {
        serverComponentsExternalPackages: ['mongoose'], 
    },
    compiler: {
        removeConsole: false,
    },
    webpack: (config) => {
        config.experiments = {
            topLevelAwait: true,
            layers: true,
        }
        return config
    },
}

module.exports = nextConfig
