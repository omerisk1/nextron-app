module.exports = {
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.target = "electron-renderer";
    }

    return config;
  },
  images: {
    domains: ["localhost"],
    unoptimized: true,
  },
};
