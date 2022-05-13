exports.entries = {
  script: './src/ts/script.ts',
  script2: './src/ts/script2.ts',
};

exports.rules = [
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
];

exports.config = {
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

  target: [
    'web',
    'es5',
  ],
};