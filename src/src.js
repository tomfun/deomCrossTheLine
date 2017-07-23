import * as d3 from "d3";

const svg = d3.select("svg");
const width = +svg.attr("width");
const height = +svg.attr("height");

const triangleGroup = svg.insert("g", "g")
    .attr("id", "triangle")
    .attr("fill", "none")
    .attr("stroke", "steelblue")
    .attr("stroke-linejoin", "round");

function redrawTriangle(data) {
    triangleGroup.selectAll("path")
        .data([data])
        .enter().append("path")
        .attr("d", function (points) {
            var path = new d3.path();
            path.moveTo(points[0].x, points[0].y);
            path.lineTo(points[1].x, points[1].y);
            path.lineTo(points[2].x, points[2].y);
            path.closePath();
            return path.toString();
        });
}

redrawTriangle([
    {x: 150, y: 0},
    {x: 75, y: 200},
    {x: 225, y: 200},
])

redrawTriangle([
    {x: 150, y: 0},
    {x: 75, y: 200},
    {x: 225, y: 200},
])
