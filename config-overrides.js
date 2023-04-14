const path = require("path");

module.exports = function override(config, env) {
  config.module.rules.push({
    test: /\.module\.scss$/,
    use: [
      "style-loader",
      {
        loader: "css-loader",
        options: {
          modules: {
            localIdentName: "[name]__[local]__[hash:base64:5]",
          },
          importLoaders: 1,
        },
      },
      "sass-loader",
    ],
    include: path.resolve(__dirname, "../src"),
  });

  return config;
};
