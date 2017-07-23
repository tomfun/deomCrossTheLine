import * as d3 from "d3";

var svg    = d3.select("svg"),
    width  = +svg.attr("width"),
    height = +svg.attr("height");


svg.selectAll("path")
    .data([
        [
            {x: 150, y: 0},
            {x: 75, y: 200},
            {x: 225, y: 200},
        ]
    ])
    .enter().append("path")
    .attr("d", function (points) {
        var path = new d3.path();
        path.moveTo(points[0].x, points[0].y);
        path.lineTo(points[1].x, points[1].y);
        path.lineTo(points[2].x, points[2].y);
        path.closePath();
        return path.toString();
    });
