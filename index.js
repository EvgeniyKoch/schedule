// margin conversation
const margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
};

const width = 900 - margin.left - margin.right;
const height = 900 - margin.top - margin.bottom;

const svg = d3.select('body')
  .append('svg')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
  .append('g')
    .attr('transform', `translate(${margin.left}, ${margin.top})`);

const data = [
  { id: 1, title: 'hello', value: 22 },
  { id: 2, title: 'hello2', value: 1000 },
  { id: 3, title: 'hello3', value: 1122 },
  { id: 4, title: 'hello4', value: 322 },
  { id: 5, title: 'hello5', value: 522 },
];

const x = d3.scaleLinear().range([0, width]);
const xAxis = d3.axisTop().scale(x);

svg
  .append('g')
  .attr('class', 'axis-x')
  .call(xAxis);

const y = d3.scaleBand().range([0, height]);
const yAxis = d3.axisLeft().scale(y);

svg
  .append('g')
  .attr('class', 'axis-y')
  .call(yAxis);

const draw = () => {
  const barHeight = 50;
  const barOffset = 3;
  const bars = svg.selectAll('.bar').data(data);

  const valueRange = [
    0,
    d3.max(data, d => d.value)
  ];

  x.domain(valueRange);
  y
    .domain(data.map(d => d.title))
    .range([0, data.length * barHeight + data.length * barOffset - barOffset]);

  bars
    .exit()
      .transition()
        .duration(1000)
          .attr('width', 0)
          .style('fill', 'red')
          .remove();

  const addBars = bars
    .enter()
      .append('rect')
        .attr('class', 'bar')
        .attr('height', barHeight);

  addBars.merge(bars)
    .transition()
      .duration(1000)
        .attr('width', d => x(d.value))
        .attr('y', (d, n) => n * barHeight + n * barOffset);

  svg
    .select('.axis-x')
    .transition()
      .call(xAxis);

   svg
     .select('.axis-y')
     .transition()
      .call(yAxis);
};

setInterval(() => {
  const indexElem = Math.ceil(Math.random() * data.length - 1);
  const randomValue = Math.round(Math.random() * 800);
  data[indexElem].value = randomValue;
  draw();
}, 1500);

// Promise.all([
//   d3.json('http://localhost:8005/api/2/btc_usd/depth').then(d => ({ name: 'btc', ...d })),
//   d3.json('http://localhost:8005/api/2/ltc_usd/depth').then(d => ({ name: 'ltc', ...d })),
//   d3.json('http://localhost:8005/api/2/eth_usd/depth').then(d => ({ name: 'eth', ...d })),
// ]).then(result => {
//   data = result.map((depth, n) => ({ id: n, title: depth.name, value: depth.bids[0][0] }));
//   draw(data);
// });