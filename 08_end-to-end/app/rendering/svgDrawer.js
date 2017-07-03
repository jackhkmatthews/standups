class SvgDrawer {
  constructor(day){
    this.day = day;
  }

  getSvgHtml(dom) {

    const d3 = dom.window.d3;
    const svg = d3.select(dom.window.document).select('svg')
      .attr('version', 1.1)
      .attr('xmlns', 'http://www.w3.org/2000/svg');

    const originX = 200;
    const originY = 200;
    const outerCircleRadius = 100;

    const outerCircle = svg.append('circle').attrs({
      cx: originX,
      cy: originY,
      opacity: 0,
      r: outerCircleRadius,
      fill: 'none',
      stroke: 'black'
    });

    let augmentedFormation = [];

    this.day.formation.forEach((name, index, array) => {
      const chairOriginX = originX + ((outerCircleRadius) * Math.sin(((2*Math.PI)/array.length)*index));
      const chairOriginY = originY - ((outerCircleRadius) * Math.cos(((2*Math.PI)/array.length)*index));
      const coordinate = [chairOriginX, chairOriginY];
      const person = {
        name,
        coordinate
      };
      augmentedFormation.push(person);
      let pointOnOuterCircle = svg.append('circle').attrs({
        cx: chairOriginX,
        cy: chairOriginY,
        opacity: 1,
        r: 5,
        fill: 'black'
      });
      let nameOnOuterCircle = svg.append('text')
        .attrs({
          x: chairOriginX,
          y: chairOriginY,
          'font-family': 'sans-serif',
          'font-size': '20px',
          fill: 'black'
        })
        .text(name);
    });

    const augmentedPasses = [];

    this.day.passes.forEach((pass, index, array) => {
      const augmentedPass = {
        passIndex: pass.passIndex,
        from: {
          name: pass.from,
          coordinate: []
        },
        to: {
          name: pass.to,
          coordinate: []
        }
      };
      augmentedFormation.forEach((person, index, array) => {
        if (person.name === pass.from) {
          augmentedPass.from.coordinate = person.coordinate;
        }
        if (person.name === pass.to) {
          augmentedPass.to.coordinate = person.coordinate;
        }
      });
      augmentedPasses.push(augmentedPass);  
    });

    let lineGenerator = d3.line()
      .x(person => person.coordinate[0])
      .y(person => person.coordinate[1]);

    augmentedPasses.forEach((augmentedPass, index, array) => {
      let pathData = lineGenerator([augmentedPass.from, augmentedPass.to]);
      let line = svg.append('path')
        .attr('d', pathData)
        .attr('stroke', 'black')
        .attr('fill', 'transparent');
    });

    return dom.window.document.querySelector('svg').outerHTML;
  }

}

exports.SvgDrawer = SvgDrawer;
