const fs = require('fs');
const nunjucks = require('nunjucks');
const CONSTANTS = require('../src/nunjucks/constants.js');

const fileNames = [
  'parts',
];

fileNames.forEach((fileName) => {
  const res = nunjucks.render(`src/nunjucks/pages/${fileName}.njk`, CONSTANTS);
  fs.writeFile(`dist/${fileName}.html`, res, (err) => {
    if (err) throw err;
    console.log('正常に書き込みが完了しました');
  });
});
