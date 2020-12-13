const { merge } = require("webpack-merge");
const common = require("./webpack.common.js");

module.exports = merge(common, {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    contentBase: "./dist",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["@babel/preset-env"],
        },
      },

      {
        test: /\.(scss)$/,
        use: [
          {
            loader: "style-loader", 
          },
          {
            loader: "css-loader", 
          },
          {
            loader: "postcss-loader", 
            options: {
              postcssOptions: {
                plugins: ["autoprefixer"],
              },
            },
          },
          {
            loader: "sass-loader", 
          },
        ],
      },
    ],
  },
});
