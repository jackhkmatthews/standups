var lineGenerator = d3.line();

var points = [
  [0, 80],
  [80, 0],
  [80, 160],
  [160, 150],
  [160, 40],
  [20, 150]
];

var pathData = lineGenerator(points);

var svg = d3.select("svg")
  .attr("width", 600)
  .attr("height", 600);

var line = svg.append('path')
  .attr('d', pathData)
  .attr('stroke', 'black')
  .attr('fill', 'transparent');
