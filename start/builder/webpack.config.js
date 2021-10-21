const path = require("path");
const { WebpackManifestPlugin } = require("webpack-manifest-plugin");

module.exports = (env, argv) => {
    const configs = process.env;

    const { APP_NAME } = configs;

    const rootDir = path.resolve(__dirname, "..", "packages", APP_NAME);

    let outputPath = path.resolve(rootDir, "public", "dist");

    return {
        entry: path.resolve(rootDir, "src", "index.js"),
        output: {
            path: outputPath,
            filename: "lib.js",
            clean: true,
        },
        plugins: [new WebpackManifestPlugin({ features: ["!gotoSymbol"] })],
        stats: "normal",
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /(node_modules|bower_components)/,
                    use: {
                        loader: "babel-loader",
                        options: {
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react",
                            ],
                        },
                    },
                },
                {
                    test: /\.((c|sa|sc)ss)$/i,
                    use: [
                        "style-loader",
                        {
                            loader: "css-loader",
                            options: {
                                // Run `postcss-loader` on each CSS `@import`, do not forget that `sass-loader` compile non CSS `@import`'s into a single file
                                // If you need run `sass-loader` and `postcss-loader` on each CSS `@import` please set it to `2`
                                importLoaders: 1,
                                // Automatically enable css modules for files satisfying `/\.module\.\w+$/i` RegExp.
                                modules: { auto: true },
                            },
                        },
                        {
                            loader: "sass-loader",
                            options: {
                                // Prefer `dart-sass`
                                // eslint-disable-next-line global-require
                                implementation: require("node-sass"),
                            },
                        },
                    ],
                },
                {
                    test: /\.svg$/,
                    use: [
                        {
                            loader: "@svgr/webpack",
                            options: {
                                svgoConfig: {
                                    plugins: [
                                        {
                                            removeViewBox: false,
                                        },
                                    ],
                                },
                            },
                        },
                    ],
                },
                {
                    test: /\.(png|jpe?g|gif)$/i,
                    use: [
                        {
                            loader: "file-loader",
                        },
                    ],
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/i,
                    type: "asset/resource",
                },
            ],
        },
        resolve: {
            fallback: {
                path: false,
            },
        },
    };
};
