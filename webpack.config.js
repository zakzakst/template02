module.exports = {
  mode: 'development', // production / development

  entry: './src/js/script.js',

  output: {
    path: `${__dirname}/dist/js`,
    filename: 'main.js',
  },

  devServer: {
    static: 'dist',
    open: true,
  },
};