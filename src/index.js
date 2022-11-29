const fetchDataAndDraw = async () => {
  // Fetching data
  const res = await fetch(
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json"
  );
  let data = await res.json();
  data = data.data;
  let datesArray = data.map((d) => {
    return new Date(d[0]);
  });
  let gdpArray = data.map((d) => d[1]);

  console.log(data);
  console.log(gdpArray);

  let height = 400;
  let width = 750;
  let padding = 60;
  let svg = d3.select("svg").attr("width", width).attr("height", height);

  let heightScale = d3
    .scaleLinear()
    .domain([
      0,
      d3.max(data, (d) => {
        return d[1];
      }),
    ])
    .range([0, height - 2 * padding]);

  let xScale = d3
    .scaleLinear()
    .domain([0, data.length - 1])
    .range([padding, width - padding]);

  let xAxisScale = d3
    .scaleTime()
    .domain([d3.min(datesArray), d3.max(datesArray)])
    .range([padding, width - padding]);

  let yAxisScale = d3
    .scaleLinear()
    .domain([0, d3.max(gdpArray)])
    .range([height - padding, padding]);

  let xAxis = d3.axisBottom(xAxisScale);
  let yAxis = d3.axisLeft(yAxisScale);

  svg
    .append("g")
    .call(xAxis)
    .attr("id", "x-axis")
    .attr("transform", "translate(30," + (height - padding) + ")");

  svg
    .append("g")
    .call(yAxis)
    .attr("id", "y-axis")
    .attr("transform", "translate(" + (30 + padding) + ",0)");

  svg
    .selectAll("react")
    .data(data)
    .enter()
    .append("rect")
    .attr("class", "bar")
    .attr("width", (width - 2 * padding) / data.length)

    .attr("height", (d) => {
      return heightScale(d[1]);
    })
    .attr("x", (d, i) => {
      return 30 + xScale(i);
    })
    .attr("y", (d) => {
      return height - padding - heightScale(d[1]);
    })
    .attr("data-date", (d) => {
      return d[0];
    })
    .attr("data-gdp", (d) => {
      return d[1];
    })
    .on("mouseover", (d) => {
      tooltip.transition().style("visibility", "visible");
      tooltip2.transition().style("visibility", "visible");
      
      tooltip.text(`Year: ${d[0]}`)
      tooltip2.text(`GDP: ${d[1].toLocaleString()}`)
      document.querySelector("#tooltip").setAttribute("data-date", d[0]);
    })
    .on("mouseout", (d) => {
      tooltip.transition().style("visibility", "hidden");
      tooltip2.transition().style("visibility", "hidden");
    });

    svg.append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width - 30)
    .attr("y", height - 15)
    .text("Year");

    svg.append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 35)
    .attr("x", -55) 
    .attr("transform", "rotate(-90)")
    .text("GDP (Billions of Dollars)");

  let = tooltip = d3
    .select("div")
    .append("div")
    .attr("id", "tooltip")
    .style("visibility", "hidden")
    .attr("class", "myTooltip")
    .style("top", "-280px") 

  let = tooltip2 = d3
    .select("div")
    .append("div")
    .attr("id", "tooltip")
    .style("visibility", "hidden")
    .attr("class", "myTooltip")
    .style("top", "-280px")
};

fetchDataAndDraw();
