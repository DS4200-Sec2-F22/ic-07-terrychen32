/*
D3 Class Demo 1
Prof. Mosca 
Modified: 10/04/2022
*/
const FRAME_HEIGHT = 900;
const FRAME_WIDTH = 500;
const MARGINS = {left:50, right:50, top:50, bottom:50};


// Binding Data: D3 lets us bind elements to data so you know which data point is which circle
const data = [55000, 48000, 27000, 66000, 90000]; 

const VIS_HEIGHT = FRAME_HEIGHT - MARGINS.top - MARGINS.bottom;
const VIS_WIDTH =  FRAME_WIDTH - MARGINS.left - MARGINS.right;

const FRAME = d3.select('#vis1')
                .append('svg')
                    .attr('height', FRAME_HEIGHT)
                    .attr('width', FRAME_WIDTH)
                    .attr('class', 'frame');


// define scaling function
const MAX_Y = d3.max(data, (d) => {return d; });

console.log('Max Y: ' + MAX_Y);
const Y_SCALE = d3.scaleLinear()
                .domain([0,MAX_Y]) // what values should it expect to get in? numbers between zero and the max in my dataset
                .range([0,VIS_HEIGHT]) // out put pixel values between zero and however wide my vis is

console.log('Input 40000, Y_SCALE output:' + Y_SCALE(40000));

FRAME.selectAll('points')
                .data(data)
                .enter()
                .append('circle')
                    .attr('cx', 2 * MARGINS.left)
                    .attr("cy", (d) => {
                        return (Y_SCALE(d) + MARGINS.top)
                    })
                    .attr('r', 20)
                    .attr('class', 'point')


FRAME.append('g')  // g is a general SVG
        .attr('transform', "translate(" + 2* MARGINS.left +"," + (MARGINS.top) +")") // transform can transalte things by whatever you tell it, we want over a bit on x and down by top margin and visheight
        .call(d3.axisLeft(Y_SCALE).ticks(4))
                .attr('font-size', '20px');