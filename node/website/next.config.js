const path = require("path");
const withCSS = require('@zeit/next-css');
const nextConfig = {};

// Setting page extensions
nextConfig.pageExtensions = ["jsx", "js"];

// Setting environment variable
nextConfig.env = {
    customKey: "my-value"
};

// Setting webpack config
nextConfig.webpack = ( config, options ) => {
    config.resolve.modules.push(path.resolve("./src"));
    return config;
}

// Exports config options.
module.exports = withCSS(nextConfig);
