const path = require("path");
const withCSS = require("@zeit/next-css");
const nextConfig = {};

// Setting page extensions
nextConfig.pageExtensions = ["jsx", "js"];

// Change assert path, because PDF generated need use file directory.
// Ref : https://nextjs.org/docs/api-reference/next.config.js/cdn-support-with-asset-prefix
nextConfig.assetPrefix = ".";

// Setting environment variable
nextConfig.env = {
    customKey: "env-hash-key",
    cwd: process.cwd(),
    datapath: path.join(process.cwd(), "build", "tmp-ebook-md2json")
};

// Setting webpack config
nextConfig.webpack = ( config, options ) => {
    config.resolve.modules.push("src");
    return config;
}

// Exports config options.
module.exports = withCSS(nextConfig);
