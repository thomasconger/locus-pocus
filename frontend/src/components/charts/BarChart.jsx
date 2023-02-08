import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';

function BarChart({width, height, data}) {

  const ref = useRef(null);

  // Sets Left Axis top value, starts at 10 and increases by 1 as needed
  useEffect(() => {
    const max = data.reduce((acc,ele)=>{
      if (acc > ele.count) {
        return acc
      }
      return ele.count
    }, 5) + 5




  const adjHeight = height - 100
  const adjWidth = width - 100



  const svg = d3.select(ref.current)

  svg.selectAll('rect').remove()
  svg.selectAll('g').remove()

  svg.attr("width", width)
    .attr("height", height)
    .attr('margin-left', '50px' )
    .attr('padding-left', '20px')
    .attr('viewBox', `-100 -100 ${width * 1.1} ${height * 1.1}`)

  const x = d3.scaleBand()
    .range([0,adjWidth])
    .domain(data.map(d => d.name))
    .padding(0.2)

  svg.append("g")
    .attr("transform", "translate(0," + adjHeight + ")")
    .call(d3.axisBottom(x))
    .selectAll('text')
    .attr('width', '10px')
    .attr("transform", "translate(0,0) rotate(-10)")
    .style("text-anchor", "end");

  const y = d3.scaleLinear()
    .domain([0, max]) // change
    .range([adjHeight, 0]); // change

    svg.append('g')
      .call(d3.axisLeft(y))

    svg.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr("x", function(d) { return x(d.name); })
      .attr("y", function(d) { return y(d.count); })
      .attr("width", x.bandwidth())
      .attr("height", function(d) {
        console.log('d', d)
        return adjHeight - y(d.count); } )
      .attr("fill", "#69b3a2")

  });

return (
  <div className="chart">
      <svg ref={ref}>

      </svg>
  </div>

)
}

export default BarChart;
