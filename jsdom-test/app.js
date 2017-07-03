const fs = require('fs');
const jsdom = require('jsdom');
const d3 = require('d3');
require('d3-selection-multi');
const { JSDOM } = jsdom;

JSDOM.fromFile('./index.html', { 
  beforeParse(window) {
    window.d3 = d3.select(window.document);
  } 
}).then(dom => {
  const d3 = dom.window.d3;
  var svg = d3.select('svg')
    .attr('version', 1.1)
    .attr('xmlns', 'http://www.w3.org/2000/svg');

  const pointOnOuterCircle = svg.append('circle').attrs({
    cx: 100,
    cy: 100,
    opacity: 1,
    r: 5,
    fill: 'black'
  });

  fs.writeFileSync('./output.svg', dom.window.document.querySelector('svg').outerHTML);
});