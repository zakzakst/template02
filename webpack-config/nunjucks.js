const HTMLWebpackPlugin = require('html-webpack-plugin');
const constants = require('../src/nunjucks/constants.js');
const fileNames = [
  'parts',
  'parts2',
];

exports.rules = [
  {
    test: /\.njk$/,
    use: [
      {
        loader: 'simple-nunjucks-loader',
        options: {},
      },
    ],
  },
];

exports.plugins = fileNames.map((fileName) => {
  return new HTMLWebpackPlugin({
    template: `./src/nunjucks/pages/${fileName}.njk`,
    templateParameters: constants,
    filename: `${fileName}.html`,
  });
});