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


const roadGroup = svg.insert("g", "g")
    .attr("id", "road")
    .attr("fill", "none")
    .attr("stroke", "grey")
    .attr("stroke-linejoin", "round");

function redrawRoad(data) {
    roadGroup.selectAll("path")
        .data([data])
        .enter().append("path")
        .attr("d", function (points) {
            var path = new d3.path();
            (({x, y}) => path.moveTo(x, y)).call(null, points[0]);
            points.slice(1).forEach(({x, y}) => path.lineTo(x, y));
            path.closePath();
            return path.toString();
        });
}

redrawRoad([
    {x: 0, y: 0},
    {x: 200, y: 0},
    {x: 200, y: 200},
    {x: 0, y: 200},
]);


const arrayw1Group = svg.insert("g", "g")
    .attr("id", "array1")
    .attr("fill", "light-green")
    .attr("stroke", "green")
    .attr("stroke-linejoin", "round")
    .attr("transform", "translate(0 100)");

const arrayw2Group = svg.insert("g", "g")
    .attr("id", "array2")
    .attr("fill", "light-blue")
    .attr("stroke", "green")
    .attr("stroke-linejoin", "round")
    .attr("transform", "rotate(-90, 100, 100) translate(100 100)");

function redrawArraw(group, data) {
    group.selectAll("path")
        .data([data])
        .enter().append("path")
        .attr("d", function (len) {
            debugger
            const size = 3;
            const points = [
                [
                    0,
                    0
                ],
                [
                    len - size,
                    0
                ],
                [
                    len - size,
                    size
                ],
                [
                    len,
                    0
                ],
                [
                    len - size,
                    -size
                ],
                [
                    len - size,
                    0
                ]
            ];
            const path = new d3.path();
            (([x, y]) => path.moveTo(x, y)).call(null, points[0]);
            points.slice(1).forEach(([x, y]) => path.lineTo(x, y));
            path.closePath();
            return path.toString();
        });
}
function redrawArraws(len1, len2) {
    redrawArraw(arrayw1Group, len1);
    redrawArraw(arrayw2Group, len2);
}

redrawArraws(10, 50)
redrawArraws(100, 40)