
// The second Map - Visualize fires 500+ acres by number of acres burned


// Create 2nd map object
var myMap2 = L.map("map2", {
    center: [40, -109.05],
    zoom: 4.5
  });
  

// Add tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/dark-v10",
    accessToken: API_KEY
  }).addTo(myMap2);


// Import Data
d3.json("/firedata").then(function(data) {

  // convert strings to int
  data.forEach(function(data) {
    data.TOTALACRES = +data.TOTALACRES;
    data.Y = +data.Y;
    data.X = +data.X;
  });

      // Loop through the quakeFeatures data
      for (var i = 0; i < data.length; i++) {

        var color = "";
        if (data[i].TOTALACRES<= 25000) {
          color = "#ffffb2";
        }
        else if (data[i].TOTALACRES <= 50000) {
          color = "#fed976";
        }
        else if (data[i].TOTALACRES <= 100000) {
            color = "#feb24c";
          }
        else if (data[i].TOTALACRES <= 250000) {
          color = "#fd8d3c";
        }
        else if (data[i].TOTALACRES <= 500000) {
            color = "#f03b20";
          }
        else {
          color = "#bd0026";
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
        }).bindPopup("<h5>Fire Name: <b>" + data[i].FIRENAME + "</b></h5><h5>Year: "+ data[i].FIREYEAR + "<h/5><p>Total Acres burned: "+ data[i].TOTALACRES).addTo(myMap2);
      }
    });




// ---------------------------------------------------------------------------------------------

// The Chart.js doughnut visual - Acres Burned


var ctx = document.getElementById('doughChart').getContext('2d');
var doughnutChart = new Chart(ctx, {
    // The type of chart we want to create
    type: 'doughnut',

    // The data for our dataset
    data: {
        labels: ['0-1 acres', '1-5 acres', '5-10 acres', '10-100 acres', '100-1000 acres', '1000-5000 acres', '5000-10000 acres', '10000 +'],
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





// ---------------------------------------------------------------------------------------------

//  Fire Cause Visualization

var ctx2 = document.getElementById('doughChart2').getContext('2d');
  var doughnutChart2 = new Chart(ctx2, {
    // The type of chart we want to create
    type: 'doughnut',
    // The data for our dataset
    data: {
        labels: ['0-Unknown', '1-Lightning', '2-Equipment Use', '3-Smoking', '4-Campfire', '5-Debris Burning', '6-Railroad', '7-Arson', '8-Children', '9-Miscellaneous'],
        datasets: [{
            label: 'My dataset',
            backgroundColor: ['#03071E', "#370617", "#6A040F", '#9D0208', "#D00000", "#DC2F02","#E85D04", "#F48C06", "#FAA307", "#FFBA08"],
            borderColor: 'rgb(255, 255, 255)',
            data: [18, 1091, 85, 2, 57, 15, 11, 94, 3, 394]
        }]
    },
    // Configuration options go here
    options: {}
  });
