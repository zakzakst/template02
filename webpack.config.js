module.exports = {
  mode: 'production', // production / development

  entry: './src/js/script.js',

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
              ],
            },
          },
        ],
      },
    ],
  },

  target: [
    'web',
    'es5',
  ],

  output: {
    path: `${__dirname}/dist/js`,
    filename: 'main.js',
  },

  devServer: {
    static: 'dist',
    open: true,
  },
};