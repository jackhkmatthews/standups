const StandupParser = require('standup-parser').StandupParser;
const standupParser = new StandupParser;

const filePath = `${__dirname}/year.txt`;

standupParser.parse(filePath)
  .then(data => console.log(data[data.length -1]));
