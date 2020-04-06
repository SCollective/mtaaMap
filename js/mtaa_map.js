accessToken = 'pk.eyJ1Ijoic2ltb2EiLCJhIjoiX216YUw5NCJ9.q3fbwUbgxeh55HSI2kvWbQ';

var map = L.map('map', {
    zoom: 15,
    attributionControl: true,
    center: L.latLng([-6.164653, 39.208925]),
    //maxBounds: L.latLngBounds([[42.41281,12.28821],[42.5589,12.63805]]).pad(0.5)
  }),
  osmLayer = new L.TileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
  styledLayer = new L.TileLayer(
      'https://api.mapbox.com/styles/v1/simoa/ck25ym3wt049x1dqg2kdj6j47/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2ltb2EiLCJhIjoiX216YUw5NCJ9.q3fbwUbgxeh55HSI2kvWbQ', {
          tileSize: 512,
          zoomOffset: -1,
          attribution: '© <a href="https://apps.mapbox.com/feedback/">Mapbox</a> © <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      }).addTo(map);
  
//map.addLayer(osmLayer);

//point style
function feelingColor(b) {
    return b == 'color0' ? '#d7191c' :
           b == 'color1' ? '#ed6e43' :
           b == 'color2' ? '#feba6f' :
           b == 'color3' ? '#ffe8a5' :
           b == 'color4' ? '#e6f5a8' :
           b == 'color5' ? '#b3df76' :
                      '#1a9641';
}

function ratingStyle(feature,map) {
    return { 
        opacity:1,
        radius: 8,
        weight:2,
        fillColor: feelingColor(feature.properties.Color),
        fillOpacity:1
    };
}

//MAP INTERACTIONS
function zoomToStory(e) {
    map.fitBounds(e.target.getBounds());
}
function onEachStory(feature, layer) {
    layer.bindPopup(feature.properties.Descriptio);
    layer.on({
        click: zoomToStory   
    });
}

function iconByName(name) {
  return '<i class="icon icon-'+name+'"></i>';
}

function featureToMarker(feature, latlng) {

  return L.circleMarker(latlng, {
    opacity:0.5,
    radius: 5,
    weight:0.8,
    fillColor: feelingColor(feature.properties.Color),
    fillOpacity:1
    // icon: L.divIcon({
    //  className: 'marker-'+feature.properties.amenity,
    //  html: iconByName(feature.properties.amenity),
    //  iconUrl: '../images/markers/'+feature.properties.amenity+'.png',
    //  iconSize: [25, 41],
    //  iconAnchor: [12, 41],
    //  popupAnchor: [1, -34],
    //  shadowSize: [41, 41]
    // })
  });
}

//LEGENDS

//feel color rating
var legend_feeling = L.control({position: 'bottomleft'});

legend_feeling.onAdd = function(map) {
  var div = L.DomUtil.create('div', 'info legend');
  div.innerHTML += "<h4>How do you feel? </h4>";
  div.innerHTML += '<i style="background: #d7191c"></i><span>Terrible</span><br>';
  div.innerHTML += '<i style="background: #ed6e43"></i><span>Very Bad</span><br>';
  div.innerHTML += '<i style="background: #feba6f"></i><span>Bad</span><br>';
  div.innerHTML += '<i style="background: #ffe8a5"></i><span>Okay</span><br>';
  div.innerHTML += '<i style="background: #e6f5a8"></i><span>Good</span><br>';
  div.innerHTML += '<i style="background: #b3df76"></i><span>Very Good</span><br>';
  div.innerHTML += '<i style="background: #1a9641"></i><span>Great</span><br>';
  return div;
};

map.addControl(legend_feeling);



var baseLayers = [
  {
    name: "Base Map",
    layer: styledLayer
  },
  {
    name: "OpenStreetMap",
    layer: osmLayer
  }
  // {
  //   name: "Outdoors",
  //   layer: L.tileLayer('http://{s}.tile.thunderforest.com/outdoors/{z}/{x}/{y}.png')
  // }
];

var overLayers = [
  {
    name: "Community",
    layer: L.geoJson(mtaaData, {pointToLayer: featureToMarker, onEachFeature:onEachStory,
      filter: function(feature, layer) {   
              return (feature.properties.category == "Community" );
          } })
  },
  {
    name: "Flooding",
    layer: L.geoJson(mtaaData, {pointToLayer: featureToMarker, onEachFeature:onEachStory,
      filter: function(feature, layer) {   
              return (feature.properties.category == "Flooding" );
          } })
  },
  {
    name: "Infrastructure",
    layer: L.geoJson(mtaaData, {pointToLayer: featureToMarker, onEachFeature:onEachStory,
      filter: function(feature, layer) {   
              return (feature.properties.category == "Flooding" );
          } })
  },
  {
    name: "Sanitation",
    layer: L.geoJson(mtaaData, {pointToLayer: featureToMarker, onEachFeature:onEachStory,
      filter: function(feature, layer) {   
              return (feature.properties.category == "Sanitation" );
          } })
  },
  {
    name: "Security",
    layer: L.geoJson(mtaaData, {pointToLayer: featureToMarker, onEachFeature:onEachStory,
      filter: function(feature, layer) {   
              return (feature.properties.category == "Security" );
          } })
  },
  {
    name: "Waste Management",
    layer: L.geoJson(mtaaData, {pointToLayer: featureToMarker, onEachFeature:onEachStory,
      filter: function(feature, layer) {   
              return (feature.properties.category == "Waste Management" );
          } })
  },
  {
    name: "Water",
    //icon: iconByName('bar'),
    layer: L.geoJson(mtaaData, {pointToLayer: featureToMarker, onEachFeature:onEachStory,
      filter: function(feature, layer) {   
              return (feature.properties.category == "Water" );
          } })
  },
];

var panelLayers = new L.Control.PanelLayers(baseLayers, overLayers);

map.addControl(panelLayers);
