var svg = d3.select('svg')
  .attr('version', 1.1)
  .attr('xmlns', 'http://www.w3.org/2000/svg');
var originX = 200;
var originY = 200;
var innerCircleRadius = 40;
var outerCircleRadius = 60;

var outerCircle = svg.append('circle').attrs({
  cx: originX,
  cy: originY,
  opacity: 0,
  r: outerCircleRadius,
  fill: 'none',
  stroke: 'black'
});


var people = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
var coordinates = [];

people.forEach((person, index, array) => {
  var chairOriginX = originX + ((60) * Math.sin(((2*Math.PI)/array.length)*index));
  var chairOriginY = originY - ((60) * Math.cos(((2*Math.PI)/array.length)*index));
  var coordinate = [chairOriginX, chairOriginY];
  coordinates.push(coordinate);
  let pointOnOuterCircle = svg.append('circle').attrs({
    cx: chairOriginX,
    cy: chairOriginY,
    opacity: 1,
    r: 5,
    fill: 'black'
  });
});

function shuffleArray(array) {
  for (let i = array.length; i; i--) {
    const randomIndex = Math.floor(Math.random() * i);
    [array[i - 1], array[randomIndex]] = [array[randomIndex], array[i - 1]];
  }
}

shuffleArray(coordinates);

var lineGenerator = d3.line();

var pathData = lineGenerator(coordinates);

var line = svg.append('path')
  .attr('d', pathData)
  .attr('stroke', 'black')
  .attr('fill', 'transparent');

