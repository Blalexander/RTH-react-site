const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./src/index.html",
  filename: "./index.html",
});

module.exports = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.js$|jsx/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  entry: {
    index: "./src/index.js",
    // print: './src/print.js',
  },
  devtool: "inline-source-map",
  devServer: {
    historyApiFallback: true,
    contentBase: './',
    hot: true
  },
  plugins: [htmlPlugin],
  output: {
    filename: "[name].bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,

    publicPath: "/",
  },
};

// module.exports = {mode: 'development',
//   module: {
//     rules: [{
//    test: /\.js$/,
//    exclude: /node_modules/,
//    use: {
//      loader: 'babel-loader'
//    }
//  },
//   {
//    test: /\.css$/,
//    use: ['style-loader', 'css-loader']
//   }
// ]},
//  plugins: [htmlPlugin]
// };
