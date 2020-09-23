 
// drought data from each year
var DroughtData2010 = "https://www1.ncdc.noaa.gov/pub/data/nidis/geojson/us/usdm/historical/usdm-geojson/geo-original/USDM-20100907-original.geojson";
var DroughtData2011 = "https://www1.ncdc.noaa.gov/pub/data/nidis/geojson/us/usdm/historical/usdm-geojson/geo-original/USDM-20110913-original.geojson"
var DroughtData2012 = "https://www1.ncdc.noaa.gov/pub/data/nidis/geojson/us/usdm/historical/usdm-geojson/geo-original/USDM-20120911-original.geojson"
var DroughtData2013 = "https://www1.ncdc.noaa.gov/pub/data/nidis/geojson/us/usdm/historical/usdm-geojson/geo-original/USDM-20130910-original.geojson"
var DroughtData2014 = "https://www1.ncdc.noaa.gov/pub/data/nidis/geojson/us/usdm/historical/usdm-geojson/geo-original/USDM-20140909-original.geojson"
var DroughtData2015 = "https://www1.ncdc.noaa.gov/pub/data/nidis/geojson/us/usdm/historical/usdm-geojson/geo-original/USDM-20150908-original.geojson"
var DroughtData2016 = "https://www1.ncdc.noaa.gov/pub/data/nidis/geojson/us/usdm/historical/usdm-geojson/geo-original/USDM-20160913-original.geojson"
var DroughtData2017 = "https://www1.ncdc.noaa.gov/pub/data/nidis/geojson/us/usdm/historical/usdm-geojson/geo-original/USDM-20170912-original.geojson"
var DroughtData2018 = "https://www1.ncdc.noaa.gov/pub/data/nidis/geojson/us/usdm/historical/usdm-geojson/geo-original/USDM-20180911-original.geojson"
var DroughtData2019 = "https://www1.ncdc.noaa.gov/pub/data/nidis/geojson/us/usdm/historical/usdm-geojson/geo-original/USDM-20190910-original.geojson"
var DroughtData2020 = "https://www1.ncdc.noaa.gov/pub/data/nidis/geojson/us/usdm/historical/usdm-geojson/geo-original/USDM-20200915-original.geojson"

var droughtyears = [DroughtData2010, DroughtData2011, DroughtData2012, DroughtData2013, DroughtData2014, DroughtData2015, DroughtData2016, DroughtData2017, DroughtData2018, DroughtData2019, DroughtData2020]

  function chooseColor(droughtcat) {
    switch (droughtcat) {
    case 0:
      return "#fee5d9";
    case 1:
      return "#fcae91";
    case 2:
      return "#fb6a4a";
    case 3:
      return "#de2d26";
    case 4:
      return "purple";
    default:
      return "#a50f15";
    }
  }

// Grabbing our GeoJSON data..
var yeargroup2010 = L.layerGroup();
var yeargroup2011 = L.layerGroup();
var yeargroup2012 = L.layerGroup();
var yeargroup2013 = L.layerGroup();
var yeargroup2014 = L.layerGroup();
var yeargroup2015 = L.layerGroup();
var yeargroup2016 = L.layerGroup();
var yeargroup2017 = L.layerGroup();
var yeargroup2018 = L.layerGroup();
var yeargroup2019 = L.layerGroup();
var yeargroup2020 = L.layerGroup();

yearlayers= [yeargroup2010,yeargroup2011,yeargroup2012,yeargroup2013,yeargroup2014,yeargroup2015,yeargroup2016,yeargroup2017,yeargroup2018,yeargroup2019,yeargroup2020]

droughtyears.forEach((droughtyear, i) => {
d3.json(droughtyear, function(data) {
  // Creating a geoJSON layer with the retrieved data
  L.geoJson(data, {
    style: function(feature) {
      return {
        color: "white",
        fillColor: chooseColor(feature.properties.DM),
        fillOpacity: 0.5,
        weight: 1.5
      };
    }
  }).addTo(yearlayers[i])
})
})


var lightmap= L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?" +
"access_token={accessToken}",{
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 18,
  accessToken: API_KEY
})

var satellite = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
maxZoom: 18,
id: "mapbox.satellite",
accessToken: API_KEY
})

// Define a baseMaps object to hold our base layers
var baseMaps = {
"Light Map": lightmap,
"satellite": satellite
};

// Create overlay object to hold our overlay layer
var overlayMaps = {
Drought2010: yeargroup2010,
Drought2011: yeargroup2011,
Drought2012: yeargroup2012,
Drought2013: yeargroup2013,
Drought2014: yeargroup2014,
Drought2015: yeargroup2015,
Drought2016: yeargroup2016,
Drought2017: yeargroup2017,
Drought2018: yeargroup2018,
Drought2019: yeargroup2019,
Droguth2020: yeargroup2020
};

// Create our map, giving it the streetmap and earthquakes layers to display on load
var myMap = L.map("map", {
center: [
  37.09, -95.71
],
zoom: 4,
layers: [lightmap, satellite,]
});

// Create a layer control
// Pass in our baseMaps and overlayMaps
// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
collapsed: false
}).addTo(myMap);










// ---------------------------------------------------------------------------------------------







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
d3.csv("filtered_fire.csv").then(function(data) {

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


