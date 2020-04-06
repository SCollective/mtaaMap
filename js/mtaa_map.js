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
// function filterLayer(feature, layer) {   
//     return (feature.properties.category == "Community" );
// }

//LEGENDS

//feel color rating
var legend_feeling = L.control({position: 'bottomleft'});

// legend_feeling.onAdd = function (map) {
//     var div = L.DomUtil.create('div', 'info legend'),
//         grades = ["color0", "color1","color2","color3","color4","color5","color6"],
//         labels = [];
//     div.innerHTML += '<b>Feeling</b><br>' 
//     for (var i = 0; i < grades.length; i++) {
//         div.innerHTML += 
//             '<i style="background:' + feelingColor(grades[i]) + '"></i> ' +
//             grades[i] + (grades[i] ?  '<br>' : '+');
//     }
//     return div;
// };

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



// //STYLES
// //style water
// var styleWater = {
//     "color":"#4f4e4d",
//     "weight": 0.5,
//     "opacity": 0,
//     "fillColor": "#8ADAFA",
//     "fillOpacity": 1
// };
// //style aqua forest
// var styleforest = {
//     "color":"#badd69",
//     "weight": 0,
//     "opacity": 0,
//     "fillColor": "#badd69",
//     "fillOpacity": 1
// };
// //style shehia
// var style_shehia = {
//     "color":"#4f4e4d",
//     "weight": 0.5,
//     "opacity": 0.5,
//     "dashArray": '5,5',
//     "fillColor": "#4f4e4d",
//     "fillOpacity": 0
// };
// //style drainage point features
// // create metro icons

// var drainIcon = L.icon({
//   iconUrl: '../img/openCities/drain.svg',
//   iconSize: [15,15]
// });
// var bdrainIcon = L.icon({
//   iconUrl: '../img/openCities/bf.svg',
//   iconSize: [20,20]
// });
// var mhIcon = L.icon({
//   iconUrl: '../img/openCities/mh.svg',
//   iconSize: [5,5]
// });
// var otherIcon = L.icon({
//   iconUrl: '../img/openCities/other.svg',
//   iconSize: [5,5]
// });



          
// // function to use different icons based on number of stations
// function iconByfeature(feature){
//   var icon;
//   if (feature.properties.waterway === 'man_hole') icon = mhIcon;
//   else if (feature.properties.waterway === 'drain:building_drain') icon = bdrainIcon;
//   else if (feature.properties.waterway === 'drain:outflow') icon = drainIcon;
//   else if (feature.properties.waterway === 'drain:pipe_inflow') icon = drainIcon;
//   else icon = otherIcon;

//   return icon;
// }
        



// //style drainage
// function styleDrainage(b) {
//     return b == 'ditch' ? '#ffb32f' :
//            b == 'drain'  ? '#198cff' :
//            b == 'stream'  ? '#a6cee3' :
//            b == 'underground_drain'  ? '#9e9e9e' :
//                       '#FFEDA0';
// }
// function drainageStyle(feature,map) {
//     return { 
//         opacity:1,
//         weight:2,
//         color: styleDrainage(feature.properties.waterway),
//         fillOpacity:1
//     };
// }

// //MAP INTERACTIONS
// function zoomToShehia(e) {
//     map.fitBounds(e.target.getBounds());
// }
// function onEachShehia(feature, layer) {
//     layer.bindPopup('Shehia:'+ feature.properties.Ward_Name);
//     layer.on({
//         click: zoomToShehia   
//     });
// }
// function zoomToDrainage(e) {
//     map.fitBounds(e.target.getBounds());
// }
// function onEachDrainage(feature, layer) {
//     layer.bindPopup('Feature: '+ feature.properties.waterway+'<br>Profile: '+ feature.properties.profile+'<br>Blockage: '+ feature.properties.blockage);
//     layer.on({
//         click: zoomToDrainage   
//     });
// }

// //LEGENDS

// //drainage type
// var legend_drainage = L.control({position: 'bottomleft'});

// legend_drainage.onAdd = function (map) {
//     var div = L.DomUtil.create('div', 'info legend'),
//         grades = ["ditch", "drain","stream","underground_drain"],
//         labels = [];
//     div.innerHTML += '<b>Drainage Type</b><br>' 
//     for (var i = 0; i < grades.length; i++) {
//         div.innerHTML += 
//             '<i style="background:' + styleDrainage(grades[i]) + '"></i> ' +
//             grades[i] + (grades[i] ?  '<br>' : '+');
//     }
//     return div;
// };
// map.addControl(legend_drainage);

// //data
// var shehias = L.geoJson(allShehias,{style:style_shehia}).addTo(map);
// var drainage = L.geoJson(drainageLines,{style:drainageStyle,onEachFeature:onEachDrainage}).addTo(map);
// var forest = L.geoJson(aquaForest,{style:styleforest}).addTo(map);

// var drainageP = L.geoJson(drainagePoints,  {
//   pointToLayer: function (feature, latlng) {
//     return L.marker(latlng, {icon: iconByfeature(feature)});
//   }
// });
// var water = L.geoJson(waterFeatures,{style:styleWater}).addTo(map);


// //layer control
// var overlays = {
//             "Drainage related features":drainageP
//         };
// var basemaps = {
//             "OpenStreetMap":osmlayer
//         };

// L.control.layers(overlays,basemaps,{position:'topleft'}).addTo(map);




// var style_health = {
//     "color":"#ff0101",
//     "weight": 0,
//     "opacity": 1,
//     "fillColor": "#ff0101",
//     "fillOpacity": 1
// };

// var style_buildings = {
//     "color":"#c2c2c2",
//     "weight": 0,
//     "opacity": 1,
//     "fillColor": "#c2c2c2",
//     "fillOpacity": 1
// };
// function getColor(test) {
//     return  test === 'residentia' ? '#996600' :
//             test === 'educationa'  ? '#0066ff' :
//             test === 'health'  ? '#ff1a1a' :
//             test === 'religious'  ? '#00cc00' :
//             test === 'business'  ? '#cc00cc' :
//             test === 'administra'  ? '#009900' :
//                 'black';
// }
// //style buildings according to type
// //toilets
// function styleToilets(b) {
//     return b == 'no' ? '#ff0000' :
//            b == 'yes'  ? '#00cc00' :
//                       '#FFEDA0';
// }
// function toiletStyle(feature,map) {
//     return { 
//         opacity:0.5,
//         weight:0.5,
//         fillColor: styleToilets(feature.properties.toilets),
//         fillOpacity:0.4
//     };
// }
// //shared
// function styleShared(b) {
//     return b == 'sharedplot' ? '#ff0000' :
//            b == 'onlyplot'  ? '#00cc00' :
//                       '#FFEDA0';
// }
// function sharedStyle(feature,map) {
//     return { 
//         opacity:0.5,
//         weight:0.5,
//         fillColor: styleShared(feature.properties.shared),
//         fillOpacity:0.4
//     };
// }
// //connected
// function styleConnected(b) {
//     return b == 'FALSE' ? '#ff0000' :
//            b == 'TRUE'  ? '#00cc00' :
//                       '#FFEDA0';
// }
// function connectedStyle(feature,map) {
//     return { 
//         opacity:0.5,
//         weight:0.5,
//         fillColor: styleConnected(feature.properties.connected),
//         fillOpacity:0.4
//     };
// }
// //pit
// function stylePit(b) {
//     return b == 'FALSE' ? '#ff0000' :
//            b == 'TRUE'  ? '#00cc00' :
//                       '#FFEDA0';
// }
// function pitStyle(feature,map) {
//     return { 
//         opacity:0.5,
//         weight:0.5,
//         fillColor: stylePit(feature.properties.pit),
//         fillOpacity:0.4
//     };
// }

// // function filtStyle(feature) {
// //     return { 
// //         opacity:0.5,
// //         weight:0.5,
// //         fillColor: getColor(feature.properties[ test ]),
// //         color: "black",
// //         fillOpacity:0.4
// //     };
// // }

// //var filt;
// //var nameIG;

// function highlightFeature(e) {
//     var layer = e.target;

//     layer.setStyle({
//         weight: 4,
//         color: '#ffff00',
//         dashArray: '',
//         fillOpacity: 0
//     });

//     if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
//         layer.bringToFront();
//     }
//     info.update(layer.feature.properties);
// }
// function resetHighlight(e) {
//     grid.resetStyle(e.target);
//     info.update();
// }


// function zoomToFeature(e) { 
//     map.fitBounds(e.target.getBounds());
// }

// function onEachFeature(feature, layer) {
//     layer.on({
//         mouseover: highlightFeature,
//         mouseout: resetHighlight,
//     	click: zoomToFeature 	   
//     });    
// }

// var extract = L.geoJson(viwandani,{style:style_buildings}).addTo(map);


// //LEGEND FILTER
// var infoW = L.control({position: 'bottomright'});

// infoW.onAdd = function (map) {
//     this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
//     this.update();
//     return this._div;
// };

// // method that we will use to update the control based on feature properties passed
// infoW.update = function (props) {
//     this._div.innerHTML = '<h4> TOGGLE HOUSE TYPES </h4>'+'<div class="#containerElement">'+
//     '<div>'+
//         '<input type="radio" name="level0" value="residentia" id="A"/>'+
//         '<label class="container0 "for="A">Residential</label>'+
//         '<div class="sub1">'+
//             '<div>'+
//                 '<input type="radio" name="level1" value="toilets" id="A0"/>'+
//                 '<label for="A0">Toilet Available?</label>'+
//             '</div>'+
//             '<div>'+
//                 '<input type="radio" name="level1" value="shared" id="A1"/>'+
//                 '<label for="A1">Shared?</label>'+
//             '</div>'+
//             '<div>'+
//                 '<input type="radio" name="level1" value="connected" id="A1"/>'+
//                 '<label for="A1">Sewer Connecter</label>'+
//             '</div>'+
//             '<div>'+
//                 '<input type="radio" name="level1" value="pit" id="A1"/>'+
//                 '<label for="A1">Pit Latrines</label>'+
//             '</div>'+
//         '</div>'+
//     '</div>'+
//     '<div>'+
//         '<input type="radio" name="level0" value="educationa" id="B"/>'+
//         '<label class="container0" for="B">Educational</label>'+
//         '<div class="sub1">'+
//             '<div>'+
//                 '<input type="radio" name="level1" value="toilets" id="A0"/>'+
//                 '<label for="A0">Toilet Available?</label>'+
//             '</div>'+
//             '<div>'+
//                 '<input type="radio" name="level1" value="shared" id="A1"/>'+
//                 '<label for="A1">Shared?</label>'+
//             '</div>'+
//             '<div>'+
//                 '<input type="radio" name="level1" value="connected" id="A1"/>'+
//                 '<label for="A1">Sewer Connecter</label>'+
//             '</div>'+
//             '<div>'+
//                 '<input type="radio" name="level1" value="pit" id="A1"/>'+
//                 '<label for="A1">Pit Latrines</label>'+
//             '</div>'+
//         '</div>'+
//     '</div>'+
//     '<div>'+
//         '<input type="radio" name="level0" value="health" id="C"/>'+
//         '<label class="container0" for="C">Health</label>'+
//         '<div class="sub1">'+
//             '<div>'+
//                 '<input type="radio" name="level1" value="toilets" id="A0"/>'+
//                 '<label for="A0">Toilet Available?</label>'+
//             '</div>'+
//             '<div>'+
//                 '<input type="radio" name="level1" value="shared" id="A1"/>'+
//                 '<label for="A1">Shared?</label>'+
//             '</div>'+
//             '<div>'+
//                 '<input type="radio" name="level1" value="connected" id="A1"/>'+
//                 '<label for="A1">Sewer Connecter</label>'+
//             '</div>'+
//             '<div>'+
//                 '<input type="radio" name="level1" value="pit" id="A1"/>'+
//                 '<label for="A1">Pit Latrines</label>'+
//             '</div>'+
//         '</div>'+
//     '</div>'+
//     '<div>'+
//         '<input type="radio" name="level0" value="business" id="C"/>'+
//         '<label class="container0" for="C">Business</label>'+
//         '<div class="sub1">'+
//             '<div>'+
//                 '<input type="radio" name="level1" value="toilets" id="A0"/>'+
//                 '<label for="A0">Toilet Available?</label>'+
//             '</div>'+
//             '<div>'+
//                 '<input type="radio" name="level1" value="shared" id="A1"/>'+
//                 '<label for="A1">Shared?</label>'+
//             '</div>'+
//             '<div>'+
//                 '<input type="radio" name="level1" value="connected" id="A1"/>'+
//                 '<label for="A1">Sewer Connecter</label>'+
//             '</div>'+
//             '<div>'+
//                 '<input type="radio" name="level1" value="pit" id="A1"/>'+
//                 '<label for="A1">Pit Latrines</label>'+
//             '</div>'+
//         '</div>'+
//     '</div>'+
//     '<div>'+
//         '<input type="radio" name="level0" value="religious" id="C"/>'+
//         '<label class="container0" for="C">Religious</label>'+
//         '<div class="sub1">'+
//             '<div>'+
//                 '<input type="radio" name="level1" value="toilets" id="A0"/>'+
//                 '<label for="A0">Toilet Available?</label>'+
//             '</div>'+
//             '<div>'+
//                 '<input type="radio" name="level1" value="shared" id="A1"/>'+
//                 '<label for="A1">Shared?</label>'+
//             '</div>'+
//             '<div>'+
//                 '<input type="radio" name="level1" value="connected" id="A1"/>'+
//                 '<label for="A1">Sewer Connecter</label>'+
//             '</div>'+
//             '<div>'+
//                 '<input type="radio" name="level1" value="pit" id="A1"/>'+
//                 '<label for="A1">Pit Latrines</label>'+
//             '</div>'+
//         '</div>'+
//     '</div>'+
//     '</div>'+'</div>';    
// };

// //<label class="radiobox"></label>

// infoW.addTo(map);

// //pie legend
// var infoPie = L.control({position: 'bottomleft'});

// infoPie.onAdd = function (map) {
//     this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
//     this.update();
//     return this._div;
// };

// // method that we will use to update the control based on feature properties passed
// infoPie.update = function (props) {
//     this._div.innerHTML = '<h4> Pie chart </h4>'+'<div id="pieChart"></div>';    
// };

// infoPie.addTo(map);



// //$('<p>Place Holder</p><br><p>Place Holder</p>').appendTo('.content');
// //$('.collapsible').collapsible({bind: 'click'});

// filtered=L.featureGroup();

// //add the pie div
//         $('<div id="pie"></div>').appendTo('#pieChart');
// //pie chart  
//             // var data = [
//             //         { label: "Residential", value: 10, color: "#cccccc" },
//             //         { label: "Administration", value: 10, color: "#cccccc" },
//             //         { label: "Business", value: 10, color: "#cccccc" },
//             //         { label: "Health", value: 10, color: "#cccccc" },
//             //         { label: "Religious", value: 10, color: "#cccccc" },
//             //         { label: "Educational", value: 10, color: "#888888" }
//             //     ];
//             var data;
//             // var pie = new d3pie("pie", {
//             //     labels: {
//             //       outer: {
//             //         format: "none"
//             //       }
//             //     },
//             //     size: {
//             //         canvasHeight: 200,
//             //         canvasWidth: 200
//             //     },
//             //     data: {
//             //         content: data
//             //     }
//             // });
//             // pie.destroy();
// //dimple pie
// var svg = dimple.newSvg("#pie", 220, 170);

// // var data = [
// //     { Sector: "Co-operative Societies", Recorded: 440 },
// //     { Sector: "Factories ", Recorded: 922 },
// //     { Sector: "Estate Producers", Recorded: 327 },
// //     { Sector: "Small Estates", Recorded: 563 }
// // ];
// // var myChart = new dimple.chart(svg, data);
// // myChart.setBounds(120, 60, 600, 350)
// // var x = myChart.addCategoryAxis("x", "Sector");
// // var y = myChart.addMeasureAxis("y", "Recorded");
// // y.tickFormat = ',';
// // y.showGridlines = false;
// // y.hidden = true;
// // myChart.addColorAxis("Recorded",["red","#ededed","blue","#008000"]);
// // myChart.addSeries("Owner", dimple.plot.pie);
// // myChart.draw();  

//       var myChart = new dimple.chart(svg, data);
//       myChart.defaultColors = [
//         new dimple.color("#00cc00"),
//         new dimple.color("#ff0000") 
//       ];
//       myChart.setBounds(5, 30, '75%', '75%')
//       myChart.addMeasureAxis("p", "value");
//       //myChart.assignColor("yes", "#ff0000");
//       //myChart.assignColor("no", "blue");
//       //myChart.addColorAxis("label","#00cc00", "#ff0000");
//       myChart.addSeries("label", dimple.plot.pie);
//       myChart.addLegend('65%','10%', 90, 30, "left");
//       myChart.draw();


// //USING RADIO
// // //level1
// // $( "input:radio[name='level1']" ).on('click',function( event) {
// //     //$('.collapsible').collapsible({bind: 'click'});
// //     if($('input[name="level1"]:checked').prop("checked") == true){
// //         var test1 = $( "input[name='level1']:checked" ).val();
// //         console.log(test1);
// //         filtered.setStyle(toiletStyle); 
// //     }
// //     else if($('input[name="level1"]:checked').prop("checked") == false){

// //     }

// // });

// //level0
// $( "input:radio[name='level0']" ).on('click',function( event) {
//     //$('.collapsible').collapsible({bind: 'click'});
//     if($('input[name="level0"]:checked').prop("checked") == true){
//         filtered.clearLayers();
//         //pie.destroy();
//         var layerClicked = window[event.target.value];
//         var test = $( 'input[name="level0"]:checked' ).val();
//         console.log(test); 

//          //console.log(extract);
//          //console.log(viwandani);
// //underscore filter
//         var testfilt=_.filter(viwandani.features, function(viw){ 
//             if (viw.properties[ test ] === "TRUE") return true
//         });
//         console.log(testfilt.length);
//         filter=L.geoJson(testfilt,{style:filtStyle}).addTo(map);
// //leaflet filter
//         //filter=L.geoJson(viwandani,{filter: htypeFilter,style:filtStyle}).addTo(map);
//         // function htypeFilter(feature) {
//         //     if (feature.properties[ test ] === "TRUE") return true
//         // }
//         function filtStyle(feature) {
//             return { 
//                 opacity:0.5,
//                 weight:0,
//                 fillColor: getColor(test),
//                 color: "black",
//                 fillOpacity:0.4
//             };
//         }

// //level1
//         $( "input:radio[name='level1']" ).on('click',function( event) {
//             //$('.collapsible').collapsible({bind: 'click'});
//             if($('input[name="level1"]:checked').prop("checked") == true){
//                 var test1 = $( "input[name='level1']:checked" ).val();
//                 console.log(test1);
//                 console.log(testfilt); 
//                 if (test1=='toilets') {
//                     filtered.setStyle(toiletStyle);
//                     var counts = _.countBy(testfilt, function(p){ 
//                         return (p.properties.toilets);
//                     });
//                     console.log(counts);
//                     //data.push(counts);
//                     var data = [
//                         { label: "Yes", value: counts.yes },
//                         { label: "No", value: counts.no }
//                     ];
//                     myChart.data = data;
//                     myChart.ease = "bounce";
//                     myChart.draw(500);
//                 } else if(test1=='shared'){
//                     filtered.setStyle(sharedStyle);
//                     var counts = _.countBy(testfilt, function(p){ 
//                         return (p.properties.shared);
//                     });
//                     console.log(counts);
//                     //data.push(counts);
//                     var data = [
//                         { label: "Sharedplot", value: counts.sharedplot },
//                         { label: "Onlyplot", value: counts.onlyplot }
//                     ];
//                     myChart.data = data;
//                     myChart.ease = "bounce";
//                     myChart.draw(500);                    
//                 }else if(test1=='connected'){
//                     filtered.setStyle(connectedStyle);
//                     var counts = _.countBy(testfilt, function(p){ 
//                         return (p.properties.connected);
//                     });
//                     console.log(counts);
//                     //data.push(counts);
//                     var data = [
//                         { label: "True", value: counts.TRUE },
//                         { label: "False", value: counts.FALSE }
//                     ];
//                     myChart.data = data;
//                     myChart.ease = "bounce";
//                     myChart.draw(500);           
//                 }else if(test1=='pit'){
//                     filtered.setStyle(pitStyle);
//                     var counts = _.countBy(testfilt, function(p){ 
//                         return (p.properties.pit);
//                     });
//                     console.log(counts);
//                     //data.push(counts);
//                     var data = [
//                         { label: "True", value: counts.TRUE },
//                         { label: "False", value: counts.FALSE }
//                     ];
//                     myChart.data = data;
//                     myChart.ease = "bounce";
//                     myChart.draw(500);
//                 }else {

//                 }; 
//             }
//             else if($('input[name="level1"]:checked').prop("checked") == false){

//             }

//         });


// // //click to filter 
// //         $('.toiBtn').on('click',function colo(feature,map) {

// //             filtered.setStyle(buildingStyle);
// //             console.log("Button works");
// //             console.log(testfilt);
// // //counts
// //             var counts = _.countBy(testfilt, function(p){ 
// //                 return (p.properties.toilets);
// //             });

// //             console.log(counts);
// //             //console.log(filter);
// // //update pie
// // //data[0].value=counts.yes;
// // //data[1].value=counts.no;
// //             var data = [
// //                     { label: "Yes", value: counts.yes },
// //                     { label: "No", value: counts.no }
// //                 ];
// // //data.push(counts);
// // //console.log(data);
// // myChart.data = data;
// // myChart.ease = "bounce";
// // myChart.draw(1000);
// // // pie.updateProp("data.content", data);
// // // pie.redraw();


// //         });  

//         filtered = L.featureGroup().addLayer(filter);
//         filtered.addTo(map);  
//         console.log("Checkbox is checked.");




//     }

//     else if($('input[name="level0"]:checked').prop("checked") == false){
//         // $('<div id="pie"></div>').remove('.content');
//         filtered.clearLayers();
//         //pie.destroy();
//         console.log("Checkbox is unchecked.");
//     }

//     // var layerClicked = window[event.target.value];
//     // var test = $( "input:checked" ).val();
//     // console.log(); 
//     //  //console.log(extract);
//     //  //console.log(viwandani);
//     // var filt=L.geoJson(viwandani,{filter: htypeFilter,style:style_health}).addTo(map);
//     // function htypeFilter(feature) {
//     //     if (feature.properties[ test ] === "TRUE") return true
//     // }
// });





// //alternatively
// // $('.collapsible').click(function(event) {
// //     filtered.clearLayers();
// //     //console.log($(this).attr('id'));
// //     var test=$(this).attr('id');
// //     if (($(this).attr('id')=='residentia')){
// //         console.log('successR');
// //         filtered.clearLayers();
// //         filter=L.geoJson(viwandani,{filter: htypeFilter,style:filtStyle});
// //         function htypeFilter(feature) {
// //             if (feature.properties[ test ] === "TRUE") return true
// //         }
// //         function filtStyle(feature) {
// //             return { 
// //                 opacity:0.5,
// //                 weight:0,
// //                 fillColor: getColor(test),
// //                 color: "black",
// //                 fillOpacity:0.4
// //             };
// //         }
// //         console.log(filter);    
// //         filtered = L.featureGroup().addLayer(filter);
// //         filtered.addTo(map);
// //         if($('.content').css('display') == 'none')
// //         {
// //             console.log('outttt!!');
// //             filtered.clearLayers();
// //             map.removeLayer(filtered);
// //         }
// //         // filtered.clearLayers();
// //         // if ($('.content').css('display') == 'block'){
// //         //     console.log('progress');
// //         //     filter=L.geoJson(viwandani,{filter: htypeFilter,style:filtStyle});
// //         //     function htypeFilter(feature) {
// //         //         if (feature.properties[ test ] === "TRUE") return true
// //         //     }
// //         //     function filtStyle(feature) {
// //         //         return { 
// //         //             opacity:0.5,
// //         //             weight:0,
// //         //             fillColor: getColor(test),
// //         //             color: "black",
// //         //             fillOpacity:0.4
// //         //         };
// //         //     }
// //         //     console.log(filter);    
// //         //     filtered = L.featureGroup().addLayer(filter);
// //         //     filtered.addTo(map);    
// //         // } else if ($('.content').css('display') == 'none') {
// //         //     //filtered.clearLayers();
// //         //     map.removeLayer(filtered);
// //         // } 
// //     } else if (($(this).attr('id')=='educationa') || ($('.content').is(':visible'))) {
// //         console.log('successE');
// //         filtered.clearLayers();
// //         filter=L.geoJson(viwandani,{filter: htypeFilter,style:filtStyle});
// //         function htypeFilter(feature) {
// //             if (feature.properties[ test ] === "TRUE") return true
// //         }
// //         function filtStyle(feature) {
// //             return { 
// //                 opacity:0.5,
// //                 weight:0,
// //                 fillColor: getColor(test),
// //                 color: "black",
// //                 fillOpacity:0.4
// //             };
// //         }
// //         console.log(filter);    
// //         filtered = L.featureGroup().addLayer(filter);
// //         filtered.addTo(map);
// //         if($('.content').is(':hidden')){
// //             console.log('progress');
// //             //filtered.clearLayers();
// //         }
// //     } else if (($(this).attr('id')=='administra') || ($('.content').is(':visible')) ){
// //         filter=L.geoJson(viwandani,{filter: htypeFilter,style:filtStyle});
// //         function htypeFilter(feature) {
// //             if (feature.properties[ test ] === "TRUE") return true
// //         }
// //         function filtStyle(feature) {
// //             return { 
// //                 opacity:0.5,
// //                 weight:0,
// //                 fillColor: getColor(test),
// //                 color: "black",
// //                 fillOpacity:0.4
// //             };
// //         }
// //         console.log(filter);    
// //         filtered = L.featureGroup().addLayer(filter);
// //         filtered.addTo(map);
// //         if($('.content').is(':hidden')){
// //             console.log('progress');
// //             //filtered.clearLayers();
// //         }
// //         console.log('successA');
// //     } else if (($(this).attr('id')=='health') || ($('.content').is(':visible')) ){
// //         filter=L.geoJson(viwandani,{filter: htypeFilter,style:filtStyle});
// //         function htypeFilter(feature) {
// //             if (feature.properties[ test ] === "TRUE") return true
// //         }
// //         function filtStyle(feature) {
// //             return { 
// //                 opacity:0.5,
// //                 weight:0,
// //                 fillColor: getColor(test),
// //                 color: "black",
// //                 fillOpacity:0.4
// //             };
// //         }
// //         console.log(filter);    
// //         filtered = L.featureGroup().addLayer(filter);
// //         filtered.addTo(map);
// //         if($('.content').is(':hidden')){
// //             console.log('progress');
// //             //filtered.clearLayers();
// //         }
// //         console.log('successH');
// //     } else if (($(this).attr('id')=='business') || ($('.content').is(':visible')) ){
// //         filter=L.geoJson(viwandani,{filter: htypeFilter,style:filtStyle});
// //         function htypeFilter(feature) {
// //             if (feature.properties[ test ] === "TRUE") return true
// //         }
// //         function filtStyle(feature) {
// //             return { 
// //                 opacity:0.5,
// //                 weight:0,
// //                 fillColor: getColor(test),
// //                 color: "black",
// //                 fillOpacity:0.4
// //             };
// //         }
// //         console.log(filter);    
// //         filtered = L.featureGroup().addLayer(filter);
// //         filtered.addTo(map);
// //         if($('.content').is(':hidden')){
// //             console.log('progress');
// //             //filtered.clearLayers();
// //         }
// //         console.log('successB');
// //     } else if (($(this).attr('id')=='religious') || ($('.content').is(':visible')) ){
// //         filter=L.geoJson(viwandani,{filter: htypeFilter,style:filtStyle});
// //         function htypeFilter(feature) {
// //             if (feature.properties[ test ] === "TRUE") return true
// //         }
// //         function filtStyle(feature) {
// //             return { 
// //                 opacity:0.5,
// //                 weight:0,
// //                 fillColor: getColor(test),
// //                 color: "black",
// //                 fillOpacity:0.4
// //             };
// //         }
// //         console.log(filter);    
// //         filtered = L.featureGroup().addLayer(filter);
// //         filtered.addTo(map);
// //         if($('.content').is(':hidden')){
// //             console.log('progress');
// //             //filtered.clearLayers();
// //         }
// //         console.log('successRR');
// //     } else {
// //         greeting = "Good evening";
// //     }


// // });
//     //$('.collapsible').collapsible({bind: 'click'});
//     //console.log('works'); 


// // var pie = new d3pie("pie", {
// //     header: {
// //         title: {
// //             text: "A very simple example pie"
// //         }
// //     },
// //     size: {
// //         canvasHeight: 150,
// //         canvasWidth: 150
// //     },
// //     data: {
// //         content: [
// //             { label: "JavaScript", value: 264131 },
// //             { label: "Ruby", value: 218812 },
// //             { label: "Java", value: 157618},
// //         ]
// //     }
// // });



// //NEW CHECKBOXES
// // infoW.update = function (props) {
// //     this._div.innerHTML = '<h4> HOUSE TYPE </h4>'+'<div class="#containerElement">'+
// //     '<div>'+
// //         '<input type="radio" name="level0" value="residentia" id="A"/>'+
// //         '<label class="container0 "for="A">Residential</label>'+
// //         '<div class="sub1">'+
// //             '<div>'+
// //                 '<input type="radio" name="level1" value="toilets" id="A0"/>'+
// //                 '<label for="A0">Toilet Available?</label>'+
// //             '</div>'+
// //             '<div>'+
// //                 '<input type="radio" name="level1" value="shared" id="A1"/>'+
// //                 '<label for="A1">Shared?</label>'+
// //             '</div>'+
// //             '<div>'+
// //                 '<input type="radio" name="level1" value="connected" id="A1"/>'+
// //                 '<label for="A1">Sewer Connecter</label>'+
// //             '</div>'+
// //             '<div>'+
// //                 '<input type="radio" name="level1" value="pit" id="A1"/>'+
// //                 '<label for="A1">Pit Latrines</label>'+
// //             '</div>'+
// //         '</div>'+
// //     '</div>'+
// //     '<div>'+
// //         '<input type="radio" name="level0" value="educationa" id="B"/>'+
// //         '<label class="container0" for="B">Educational</label>'+
// //         '<div class="sub1">'+
// //             '<div>'+
// //                 '<input type="radio" name="level1" value="toilets" id="A0"/>'+
// //                 '<label for="A0">Toilet Available?</label>'+
// //             '</div>'+
// //             '<div>'+
// //                 '<input type="radio" name="level1" value="shared" id="A1"/>'+
// //                 '<label for="A1">Shared?</label>'+
// //             '</div>'+
// //             '<div>'+
// //                 '<input type="radio" name="level1" value="connected" id="A1"/>'+
// //                 '<label for="A1">Sewer Connecter</label>'+
// //             '</div>'+
// //             '<div>'+
// //                 '<input type="radio" name="level1" value="pit" id="A1"/>'+
// //                 '<label for="A1">Pit Latrines</label>'+
// //             '</div>'+
// //         '</div>'+
// //     '</div>'+
// //     '<div>'+
// //         '<input type="radio" name="level0" value="health" id="C"/>'+
// //         '<label class="container0" for="C">Health</label>'+
// //         '<div class="sub1">'+
// //             '<div>'+
// //                 '<input type="radio" name="level1" value="toilets" id="A0"/>'+
// //                 '<label for="A0">Toilet Available?</label>'+
// //             '</div>'+
// //             '<div>'+
// //                 '<input type="radio" name="level1" value="shared" id="A1"/>'+
// //                 '<label for="A1">Shared?</label>'+
// //             '</div>'+
// //             '<div>'+
// //                 '<input type="radio" name="level1" value="connected" id="A1"/>'+
// //                 '<label for="A1">Sewer Connecter</label>'+
// //             '</div>'+
// //             '<div>'+
// //                 '<input type="radio" name="level1" value="pit" id="A1"/>'+
// //                 '<label for="A1">Pit Latrines</label>'+
// //             '</div>'+
// //         '</div>'+
// //     '</div>'+
// //     '<div>'+
// //         '<input type="radio" name="level0" value="business" id="C"/>'+
// //         '<label class="container0" for="C">Business</label>'+
// //         '<div class="sub1">'+
// //             '<div>'+
// //                 '<input type="radio" name="level1" value="toilets" id="A0"/>'+
// //                 '<label for="A0">Toilet Available?</label>'+
// //             '</div>'+
// //             '<div>'+
// //                 '<input type="radio" name="level1" value="shared" id="A1"/>'+
// //                 '<label for="A1">Shared?</label>'+
// //             '</div>'+
// //             '<div>'+
// //                 '<input type="radio" name="level1" value="connected" id="A1"/>'+
// //                 '<label for="A1">Sewer Connecter</label>'+
// //             '</div>'+
// //             '<div>'+
// //                 '<input type="radio" name="level1" value="pit" id="A1"/>'+
// //                 '<label for="A1">Pit Latrines</label>'+
// //             '</div>'+
// //         '</div>'+
// //     '</div>'+
// //     '<div>'+
// //         '<input type="radio" name="level0" value="religious" id="C"/>'+
// //         '<label class="container0" for="C">Religious</label>'+
// //         '<div class="sub1">'+
// //             '<div>'+
// //                 '<input type="radio" name="level1" value="toilets" id="A0"/>'+
// //                 '<label for="A0">Toilet Available?</label>'+
// //             '</div>'+
// //             '<div>'+
// //                 '<input type="radio" name="level1" value="shared" id="A1"/>'+
// //                 '<label for="A1">Shared?</label>'+
// //             '</div>'+
// //             '<div>'+
// //                 '<input type="radio" name="level1" value="connected" id="A1"/>'+
// //                 '<label for="A1">Sewer Connecter</label>'+
// //             '</div>'+
// //             '<div>'+
// //                 '<input type="radio" name="level1" value="pit" id="A1"/>'+
// //                 '<label for="A1">Pit Latrines</label>'+
// //             '</div>'+
// //         '</div>'+
// //     '</div>'+
// //     '<div>'+
// //         '<input type="radio" name="level0" value="administra" id="C"/>'+
// //         '<label class="container0" for="C">Administration</label>'+
// //         '<div class="sub1">'+
// //             '<div>'+
// //                 '<input type="radio" name="level1" value="toilets" id="A0"/>'+
// //                 '<label for="A0">Toilet Available?</label>'+
// //             '</div>'+
// //             '<div>'+
// //                 '<input type="radio" name="level1" value="shared" id="A1"/>'
// //                 '<label for="A1">Shared?</label>'+
// //             '</div>'+
// //             '<div>'+
// //                 '<input type="radio" name="level1" value="connected" id="A1"/>'+
// //                 '<label for="A1">Sewer Connecter</label>'+
// //             '</div>'+
// //             '<div>'+
// //                 '<input type="radio" name="level1" value="pit" id="A1"/>'+
// //                 '<label for="A1">Pit Latrines</label>'+
// //             '</div>'+
// //         '</div>'+
// //     '</div>'+'</div>';    
// // };

