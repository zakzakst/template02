module.exports = {
  mode: 'production', // production / development
  
  entry: './src/js/script.js',

  output: {
    path: `${__dirname}/dist`,
    filename: 'main.js',
  },
};