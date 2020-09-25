// drought data from each year GeoJSON
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
      return "#FEE5D9";
    case 1:
      return "#FCAE91";
    case 2:
      return "#FB6A4A";
    case 3:
      return "#DE2D26";
    case 4:
      return "#A50F15";
    default:
      return "purple";
    }
  }
  // function chooseColor(d) {
  //   return d = 0 ? '#FEE5D9' :
  //          d = 1 ? '#FCAE91' :
  //          d = 2 ? '#FB6A4A' :
  //          d = 3 ? '#DE2D26' :
  //          d = 4 ? '#A50F15' :
  //        'purple';
  //   } 
// creating layer groups
var yeargroup2010 = new L.layerGroup();
var yeargroup2011 = new L.layerGroup();
var yeargroup2012 = new L.layerGroup();
var yeargroup2013 = new L.layerGroup();
var yeargroup2014 = new L.layerGroup();
var yeargroup2015 = new L.layerGroup();
var yeargroup2016 = new L.layerGroup();
var yeargroup2017 = new L.layerGroup();
var yeargroup2018 = new L.layerGroup();
var yeargroup2019 = new L.layerGroup();
var yeargroup2020 = new L.layerGroup();
yearlayers= [yeargroup2010,yeargroup2011,yeargroup2012,yeargroup2013,yeargroup2014,yeargroup2015,yeargroup2016,yeargroup2017,yeargroup2018,yeargroup2019,yeargroup2020]

droughtyears.forEach((droughtyear, i) => {
d3.json(droughtyear).then(function(data) {
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
});

// create legend
var legend = L.control({position: 'bottomright'});
legend.onAdd = function(map) {
var div = L.DomUtil.create('div', 'info legend'),
    grades = [0, 1, 2, 3, 4],
    labels = [];
// loop through our density intervals and generate a label with a colored square for each interval
for (var i = 0; i < grades.length; i++) {
    div.innerHTML +=
        '<i style="background:' + chooseColor(grades[i]) + '"></i> ' +
        grades[i] + (grades[i+1] ? '&ndash;' + grades[i] + '<br>' : '+');
        // 
}
return div;
};

// Import Data
d3.json("/firedata").then(function(firedata) {
yearlayers.forEach((yearlayer, i) => {
  let fires = firedata.filter(f => +f.FIREYEAR == 2010 + i)
  console.log(fires)
  fires.forEach(fire => {
      console.log("line 90")
    L.marker([fire.Y, fire.X])
      .addTo(yearlayer)
  })
})
});

// basemaps
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
Drought2020: yeargroup2020
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
legend.addTo(myMap);