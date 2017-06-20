let Parser = require('simple-text-parser');
const fs = require('fs');

const filename = 'week.txt';

const output = {};

fs.readFile(filename, 'utf8', function(err, data) {
  
  let parser = new Parser();

  parser.addRule(/:.*?\|/ig, function(formation) {
    return { type: 'formation', text: formation };
  });


  let fileAsString = '';
  if (err) throw err;
  fileAsString = data;
  let json = parser.toTree(fileAsString);
  json = json.filter((element) => {
    return (element.type === 'formation');
  })
  json = json.map(element => {
    return element.text;
  });
  const formation = json[0].match(/(\w+)/ig);
  output.formation = formation;
  console.log(output);
});


fs.readFile(filename, 'utf8', function(err, data) {

  let parser = new Parser();

  parser.addRule(/\|.*/ig, function(order) {
    return { type: 'order', text: order };
  });

  let fileAsString = '';
  if (err) throw err;
  fileAsString = data;
  let json = parser.toTree(fileAsString);
  json = json.filter((element) => {
    return (element.type === 'order');
  });
  json = json.map(element => {
    return element.text;
  });
  const order = json[0].match(/(\w+)/ig);
  output.passes = order.map((name, index, array) => {
    if (index === array.length -1) return;
    const pass = {
      passIndex: index,
      from: name,
      to: array[index + 1]
    };
    return pass;
  });
  console.log(output);
});

