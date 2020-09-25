Plotly.d3.csv("https://raw.githubusercontent.com/erharker/Wildfires-Javascript-Project/master/Nino_Data.csv", function(err, rows){

  function unpack(rows, key) {
  return rows.map(function(row) { return row[key]; });
}
let markerColor = "black";

 if(unpack(rows, "NINO INDEX") > .5) {

   markerColor = "red";
 }


var trace1 = {
  type: "bar",
  mode: "lines",
  name: 'Nino Data',
  x: unpack(rows, 'Date'),
  y: unpack(rows, 'NINO INDEX'),
  marker: {color: markerColor},
  width: .4
}

var trace2 = {
  type: "scatter",
  mode: "lines",
  name: 'Nino Data',
  x: unpack(rows, 'Date'),
  y: unpack(rows, 'NINO INDEX'),
  line: {color: 'black'}
}

var data = [trace1, trace2];

var layout = {
  title: 'Monthly Oceanic Nino Index (ONI)',
  xaxis: {
    automargin: true,
    title:{
      text: 'Month',
      standoff: 20
    },
    titlefont: {
      size: 12,
      color: 'black'
    },
  },
  yaxis: {
    title: 'Change in Temperature (C)',
    titlefont: {
      size: 12,
      color: 'black'
    },
  },
  shapes: [
    {
        type: 'line',
        xref: 'paper',
        x0: 0,
        y0: .5,
        x1: 1,
        y1: .5,
        line:{
            color: 'red',
            width: 2,
            dash:'dot'
        }
      },
    {
        type: 'line',
        xref: 'paper',
        x0: 0,
        y0: -.5,
        x1: 1,
        y1: -.5,
        line:{
            color: 'blue',
            width: 2,
            dash:'dot'
        }    
    }
    ],
};

Plotly.newPlot('myDiv', data, layout);
})