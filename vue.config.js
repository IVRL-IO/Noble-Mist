const {defineConfig} = require("@vue/cli-service");
const webpack = require("webpack");
const {VueLoaderPlugin} = require("vue-loader");
module.exports = defineConfig({
                                pluginOptions: {
                                  electronBuilder: {
                                    nodeIntegration: true,
                                  },
                                },
                                transpileDependencies: true,
                                configureWebpack: {
                                  resolve: {
                                    alias: {
                                      __dirname: require.resolve("insert-module-globals"),
                                    },
                                    fallback: {
                                      fs: require.resolve("browserify-fs"),
                                      crypto: require.resolve("crypto-browserify"),
                                      os: require.resolve("os-browserify/browser"),
                                      path: require.resolve("path-browserify"),
                                      // path: false,
                                      // assert: false,
                                      // dns: false,
                                      // net: false,
                                      // tls: false,
                                      // http2: false,
                                      https: require.resolve("https-browserify"),
                                      http: require.resolve("stream-http"),
                                      stream: require.resolve("stream-browserify"),
                                      zlib: require.resolve("browserify-zlib"),
                                      // zlib: false,
                                    },
                                  },
                                  plugins: [
                                    new webpack.ProvidePlugin({
                                                                process: "process/browser",
                                                                Buffer: ["buffer", "Buffer"],
                                                              }),
                                  ],
                                },
                              });
