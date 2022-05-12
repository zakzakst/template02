const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CONSTANTS = require('./src/nunjucks/constants.js');

const MODE = 'production'; // production / development
const enabledSourceMap = MODE === 'development';
const fileNames = [
  'parts',
  'parts2',
];
const templates = fileNames.map((fileName) => {
  return new HTMLWebpackPlugin({
    template: `./src/nunjucks/pages/${fileName}.njk`,
    templateParameters: CONSTANTS,
    filename: `${fileName}.html`,
  });
});

module.exports = {
  mode: MODE,

  entry: {
    script: './src/ts/script.ts',
    script2: './src/ts/script2.ts',
    'style.css': './src/scss/style.scss',
    'style2.css': './src/scss/style2.scss',
    // 'parts.html': './src/nunjucks/pages/parts.njk',
  },

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
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
              sourceMap: enabledSourceMap,
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ['autoprefixer', {grid: true}],
                ],
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: enabledSourceMap,
            },
          },
        ],
      },
      {
        test: /\.njk$/,
        use: [
          {
            loader: 'simple-nunjucks-loader',
            options: {},
          },
        ],
      },
    ],
  },

  // import 文で .ts ファイルを解決するため
  // これを定義しないと import 文で拡張子を書く必要が生まれる。
  // フロントエンドの開発では拡張子を省略することが多いので、
  // 記載したほうがトラブルに巻き込まれにくい。
  resolve: {
    // 拡張子を配列で指定
    extensions: [
      '.ts', '.js',
    ],
  },

  plugins: [
    new FixStyleOnlyEntriesPlugin({
      extensions: ['scss', 'css']
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name]',
    }),
    // new HTMLWebpackPlugin({
    //   template: './src/nunjucks/pages/parts.njk',
    //   templateParameters: CONSTANTS,
    //   filename: 'parts.html',
    // }),
    ...templates,
  ],

  target: [
    'web',
    'es5',
  ],

  output: {
    path: `${__dirname}/dist`,
    filename: 'js/[name].js',
  },

  devServer: {
    static: 'dist',
    open: true,
  },
};