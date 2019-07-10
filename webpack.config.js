const path = require(`path`);
const webpack = require(`webpack`);

module.exports = (env, options) => {
  return {
    entry: `./src/index.tsx`,
    output: {
      filename: `bundle.js`,
      path: path.join(__dirname, `public`)
    },
    devServer: {
      contentBase: path.join(__dirname, `public`),
      compress: false,
      port: 1337,
      historyApiFallback: true
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: `babel-loader`
          }
        },
        {
          test: /\.(tsx|ts)?$/,
          loader: `ts-loader`
        }
      ]
    },
    resolve: {
      extensions: [`.ts`, `.tsx`, `.js`, `json`]
    },
    devtool: `source-map`,
    plugins: [
      new webpack.DefinePlugin({
        "process.env": {
          NODE_ENV: JSON.stringify(`${options.mode}`)
        }
      })
    ]
  };
};
