const fs = require('fs');
const xml2js = require('xml2js');
const parser = new xml2js.Parser();

fs.readFile('test-results.xml', (err, data) => {
  if (err) throw err;
  parser.parseString(data, (err, result) => {
    if (err) throw err;
    if (result.testsuite.$.failures > 0) {
      console.log('CASHIFY: 1 o mas pruebas fallaron.');
      process.exit(1);
    }
  });
});
