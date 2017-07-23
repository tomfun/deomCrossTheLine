import React from 'react';
import ReactDOM from 'react-dom';

const svgWidth = 640;
const svgHeight = 480;

function drawArrow(length) {

    const size = 3;
    const points = [
        [
            0,
            0
        ],
        [
            length - size,
            0
        ],
        [
            length - size,
            size
        ],
        [
            length,
            0
        ],
        [
            length - size,
            -size
        ],
        [
            length - size,
            0
        ]
    ];
    const join = (arr, glue) => arr.map(a => a.join(' ')).join(glue);
    const d = `M ${join(points.slice(0, 1), '')} L ${join(points.slice(1), 'L ')} Z`;
    return (<path d={d}/>);
}

/**
 * @param {{triangleSideMin: number, triangleSideMax: number, rectWidth: number, rectHeight: number, Vp: number, Vm: number}} figure
 */
function redrawScheme(figure) {
    const offsetY = (svgHeight - figure.rectHeight) / 2;
    const triangleData = `M ${figure.rectWidth} ${figure.rectHeight + offsetY} l ${figure.triangleSideMin} ${-figure.rectHeight} l ${-figure.triangleSideMin + figure.triangleSideMax} 0 Z`;
    const rectData = {
        x: 0,
        y: offsetY,
        width: figure.rectWidth,
        height: figure.rectHeight,
    };
    return (
        <svg width={svgWidth} height={svgHeight} style={{padding: '5px'}}>
            <rect x={rectData.x} y={rectData.y} width={rectData.width} height={rectData.height}
                  style={{fill: 'blue', stroke: 'grey', strokeWidth: 3, fillOpacity: 0.1, strokeOpacity: 0.2}}/>
            <path d={triangleData}
                  style={{fill: 'green', stroke: 'red', strokeWidth: 3, fillOpacity: 0.3, strokeOpacity: 0.2}}/>
            <g
                stroke="red"
                transform={`translate(0 ${svgHeight / 2})`}>
                {drawArrow(figure.Vm)}
            </g>
            <g
                stroke="blue"
                transform={`rotate(-90, ${figure.rectWidth}, ${svgHeight}) translate(${figure.rectWidth} ${svgHeight})`}>
                {drawArrow(figure.Vp)}
            </g>
        </svg>
    );
}

function calcAlphas(omega, beta) {
    const sd = beta * Math.sqrt(beta * beta + 1 -  omega * omega);
    const alpha1 = (omega + sd) / (1 + beta * beta);
    const alpha2 = (omega - sd) / (1 + beta * beta);
    const sin = {
        sinMax: Math.max(alpha1, alpha2),
        sinMin: Math.min(alpha1, alpha2),
    };
    return Object.assign({
        alphaMax: Math.asin(sin.sinMax) + Math.PI / 2,
        alphaMin: Math.asin(sin.sinMin) + Math.PI / 2,
    }, sin)
}

/**
 * Transform parameters to real size object
 * @param {number} omega Vm / Vp
 * @param {number} beta d / h
 * @param {number} alphaMin minimum angle(X axis, Vp)
 * @param {number} alphaMax maximum angle(X axis, Vp)
 * @return {{triangleSideMin: number, triangleSideMax: number, rectWidth: number, rectHeight: number, Vp: number, Vm: number}}
 */
function calcObject({omega, beta, alphaMin, alphaMax}) {
    const rectHeight = 1;
    const Vp = 1;
    const Vm = omega * Vp;

    const zoomV = Math.min(svgHeight / Vp, svgWidth / Vm) * 0.8;

    const triangleSideMin = -rectHeight / Math.tan(alphaMin);
    const triangleSideMax = -rectHeight / Math.tan(alphaMax);
    const rectWidth = beta * rectHeight;

    const zoom = Math.min(
        svgHeight / rectHeight,
        svgWidth / rectWidth,
        svgWidth / (rectWidth + triangleSideMin),
        svgWidth / (rectWidth + triangleSideMax)
    );

    return {
        triangleSideMin: triangleSideMin * zoom,
        triangleSideMax: triangleSideMax * zoom,
        rectWidth: rectWidth * zoom,
        rectHeight: rectHeight * zoom,
        Vp: Vp * zoomV,
        Vm: Vm * zoomV,
    }
}

const calcData = {omega: 2, beta: 2, alphaMax: 	2.498091544796509, alphaMin: Math.PI / 2};
console.log('----', calcData)
console.log(calcObject(calcData))
console.log('----')

function redrawControls() {
    const overallHandler = ({target}) => {
        calcData[target.name] = +target.value;
        Object.assign(calcData, calcAlphas(calcData.omega, calcData.beta));
        redrawAll();
    };
    return (<div>
        {['omega', 'beta'].map(key => (<lebel>
            {key}
            <input name={key} type="range" min="0" step="0.01" value={calcData[key]} onChange={overallHandler}/>
        </lebel>))}
        <br/>
        <table>
            <tbody>
            {['omega', 'beta', 'alphaMax', 'alphaMin', 'sinMax', 'sinMin'].map(key => (<tr><td>{key}</td><td>{calcData[key]}</td></tr>))}
            </tbody>
        </table>
    </div>);
}

const reactRoot = document.getElementById('application');

function redrawAll() {
    ReactDOM.render(
        (<div>
            <div>
                {redrawControls()}
            </div>
            <div>
                {redrawScheme(calcObject(calcData))}
            </div>
        </div>),
        reactRoot
    );
}

redrawAll();
