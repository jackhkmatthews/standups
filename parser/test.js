const StandupParser = require('standup-parser').StandupParser;

console.log(StandupParser);

const standupParser = new StandupParser;

console.log(standupParser);

let filePath = `${__dirname}/week.txt`;

standupParser.parse(filePath)
  .then(data => console.log(data));

filePath = `${__dirname}/year.txt`;

standupParser.parse(filePath)
  .then(data => console.log(data));
