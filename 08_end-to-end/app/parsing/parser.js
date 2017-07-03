const StandupParser = require('standup-parser').StandupParser;
const standupParser = new StandupParser;
const fs = require('fs');

const filePath = `${__dirname}/year.txt`;

standupParser.parse(filePath)
  .then(json => {
    fs.writeFile(`${__dirname}/year.json`, JSON.stringify(json), 'utf8', function (err) {
      if (err) {
        return console.log(err);
      }
      console.log('The file was saved!');
    });
  });
