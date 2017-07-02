const fs = require('fs');
const page = require('webpage').create();
const url = 'file://' + fs.absolute('./index.html');

const drawer = function() {
  const body = document.getElementById('body');
  body.innerHTML = 'Paragraph changed!';
  const doc = document.getElementById('html');
  return doc.outerHTML;
};

page.open(url, function (status) {
  console.log(page.evaluate(drawer));
  phantom.exit();
});
