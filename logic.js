Plotly.d3.csv("https://raw.githubusercontent.com/sjani184/Fire/master/Nino_Data.csv", function(err, rows){

  function unpack(rows, key) {
  return rows.map(function(row) { return row[key]; });
}


var trace1 = {
  type: "scatter",
  mode: "lines",
  name: 'Nino Data',
  x: unpack(rows, 'Date'),
  y: unpack(rows, 'NINO INDEX'),
  line: {color: '#17BECF'}
}

var data = [trace1];

var layout = {
  title: 'Nino',
};

Plotly.newPlot('myDiv', data, layout);
})