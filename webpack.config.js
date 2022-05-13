const typescriptConfig = require('./webpack-config/typescript');
const scssConfig = require('./webpack-config/scss');
const nunjucksConfig = require('./webpack-config/nunjucks');

const MODE = 'production'; // production / development

module.exports = {
  mode: MODE,

  entry: {
    ...typescriptConfig.entries,
    ...scssConfig.entries,
  },

  module: {
    rules: [
      ...typescriptConfig.rules,
      ...scssConfig.rules,
      ...nunjucksConfig.rules,
    ],
  },

  plugins: [
    ...scssConfig.plugins,
    ...nunjucksConfig.plugins,
  ],

  ...typescriptConfig.config,

  output: {
    path: `${__dirname}/dist`,
    filename: 'js/[name].js',
  },

  devServer: {
    static: 'dist',
    open: true,
  },
};