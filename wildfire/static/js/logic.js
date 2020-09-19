// Create map object
var myMap = L.map("map", {
    center: [46.9989, -109.0452],
    zoom: 4
  });
  

// Add tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

//  link for drought data
link = "https://www1.ncdc.noaa.gov/pub/data/nidis/geojson/us/usdm/historical/usdm-geojson/geo-simplified/USDM-20120327.geojson"


d3.json(link).then(function(data) {
  console.log(data)
});





// Import Data
d3.csv("all.csv").then(function(data) {

  console.log(data)
  // convert strings to int
  data.forEach(function(data) {
    data.TOTALACRES = +data.TOTALACRES;
    data.Y = +data.Y;
    data.X = +data.X;
  });
  console.log(data)
      // Loop through the quakeFeatures data
      for (var i = 0; i < data.length; i++) {

        var color = "";
        if (data[i].TOTALACRES<= 25000) {
          color = "#f7f7f7";
        }
        else if (data[i].TOTALACRES <= 50000) {
          color = "#d9d9d9";
        }
        else if (data[i].TOTALACRES <= 100000) {
            color = "#bdbdbd";
          }
        else if (data[i].TOTALACRES <= 250000) {
          color = "#969696";
        }
        else if (data[i].TOTALACRES <= 500000) {
            color = "#636363";
          }
        else {
          color = "#252525";
        }
        
        var droughtLocs = [data[i].Y,data[i].X]

        // Add circles to map
        // console.log(data[i].TOTALACRES);
        // console.log(droughtLocs);
        L.circle(droughtLocs, {
          fillOpacity: 0.75,
          color: "white",
          weight: 0.5,
          fillColor: color,
          // Adjust radius
          radius: data[i].TOTALACRES * 0.5,
        }).bindPopup("<h5>Fire Name: " + data[i].FIRENAME + "</h5><p>Total Acres burned: "+ data[i].TOTALACRES).addTo(myMap);
      }
    });




// ---------------------------------------------------------------------------------------------




var ctx = document.getElementById('doughChart').getContext('2d');
var doughnutChart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'doughnut',

    // The data for our dataset
    data: {
        labels: ['0-1', '1-5', '5-10', '10-100', '100-1000', '1000-5000', '5000-10000', '10000 +'],
        datasets: [{
            label: 'My dataset',
            backgroundColor: ['rgb(8, 8, 248)', 'rgb(8, 152, 248)','rgb(8, 248, 88)', 'rgb(33, 141, 6)',
            'rgb(8, 83, 1)', 'rgb(208, 255, 0)','rgb(255, 145, 0)', 'rgb(255, 0, 0)' ],
            borderColor: 'rgb(255, 255, 255)',
            data: [63290, 16279, 2450, 5046, 2127, 749, 223, 344]
        }]
    },
    // Configuration options go here
    options: {}

});


