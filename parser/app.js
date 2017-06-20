let Parser = require('simple-text-parser');
let parser = new Parser();
const fs = require('fs')

parser.addRule(/:.*?\|/ig, function(formation) {
  return { type: 'formation', text: formation };
});

const filename = 'week.txt';

let fileAsString = '';

fs.readFile(filename, 'utf8', function(err, data) {
  if (err) throw err;
  fileAsString = data;
  let json = parser.toTree(fileAsString);
  json = json.filter((element) => {
    return (element.type === 'formation');
  })
  json = json.map(element => {
    return element.text;
  });
  console.log(json[0]);
  const formation = json[0].match(/(\w+)/ig);
  console.log(formation);
});

