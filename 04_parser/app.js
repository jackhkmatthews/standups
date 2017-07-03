const fs = require('fs');

const filename = 'week.txt';

const week = [];

fs.readFile(filename, 'utf8', function(err, dataAsString) {


  const formationsAsStrings = dataAsString.match(/:.*?\|/ig);


  formationsAsStrings.forEach((formationAsString, index, array) => {
    const formationAsArray = formationAsString.match(/(\w+)/ig);
    const day = {
      formation: formationAsArray
    };
    week.push(day);
  });


  const ordersAsStrings = dataAsString.match(/\|.*/ig);


  ordersAsStrings.forEach((orderAsString, index, array) => {
    const orderAsArray = orderAsString.match(/(\w+)/ig);
    const passes = [];
    orderAsArray.forEach((name, index, array) => {
      const pass = {
        passIndex: index,
        from: name,
        to: array[index + 1]
      };
      passes.push(pass);
    });
    week[index].passes = passes;
  });

  const datesAsStrings = dataAsString.match(/..\/..\/..../ig);


  datesAsStrings.forEach((dateAsString, index, array) => {
    week[index].date = dateAsString;
  });

  console.log(JSON.stringify(week, null, 4));

});

