// Endpoint for data
var apiKey = "wJwp9NFb-QWNy3d1f9_w";
var ticker = "AAPL"
var value =  1000;
var start_date = '2013-01-01'
var gold_url = `https://www.quandl.com/api/v3/datasets/LBMA/GOLD/data.json?api_key=wJwp9NFb-QWNy3d1f9_w&column_index=2&start_date=${start_date}&order=asc`
var ticker_url = `https://www.quandl.com/api/v3/datasets/EOD/${ticker}/data.json?api_key=wJwp9NFb-QWNy3d1f9_w&column_index=2&start_date=${start_date}&order=asc`
var ferd_url = `https://www.quandl.com/api/v3/datasets/FED/RIFSPFF_N_D.json?api_key=KqktrbxvFdVxc81KAHb6&order=asc`
var BTC_url = `https://www.quandl.com/data.json?api_key=wJwp9NFb-QWNy3d1f9_w/CUR/CAD&order=asc`
var app_gold ="/gold_returns"
var app_ticker = "/ticker_returns"
// Initialise the web page with county1 and county 2 default comparisons
function Initialize(){

 gold()
  //console.log(`Initialise is running`)
};
Initialize();

function gold(){
  d3.json(gold_url).then(function(data_gold) {
    
    /*===============================
           GOLD 
     ===============================*/

    // Grab values from the data json object to build the plots
    var name = `London Bullion Market Association <hl> Closing Gold Price `;
    var stock = 'Closing Gold Price';
    var startDate = data_gold.dataset_data.start_date;
    var endDate = data_gold.dataset_data.end_date;
    var dates = data_gold.dataset_data.data.map(d => d[0]);
    var closingPrices_gold = data_gold.dataset_data.data.map(d => d[1]);

     /*===============================
           STOCK CHOICE
     ===============================*/

     d3.json(ticker_url).then(function(data_ticker){

     var dates_ticker = data_ticker.dataset_data.data.map(d => d[0]);
     var closingPrices_ticker = data_ticker.dataset_data.data.map(d => d[1]);

     //=====Investment values=====
     var gold_qty = value/closingPrices_gold[0]
     var ticker_qty = value/closingPrices_ticker[0]
     

     var gold_inv = closingPrices_gold.map(d=>d*gold_qty)
     var ticker_inv = closingPrices_ticker.map(d=>d*ticker_qty)

     console.log(gold_qty)
     console.log(gold_inv[0]) 
     console.log(closingPrices_gold[0])
     console.log(dates[0])

     /*========Share price plot id=share_price =======STARTS*/
      var selectorOptions = {
        buttons: [{
            step: 'month',
            stepmode: 'backward',
            count: 1,
            label: '1m'
        }, {
            step: 'month',
            stepmode: 'backward',
            count: 6,
            label: '6m'
        }, {
            step: 'year',
            stepmode: 'todate',
            count: 1,
            label: 'YTD'
        }, {
            step: 'year',
            stepmode: 'backward',
            count: 1,
            label: '1y'
        },{
          step: 'year',
          stepmode: 'backward',
          count: 5,
          label: '5y'
      }, {
            step: 'all',
        }],
      };

      var trace1 = {
        type: "scatter",
        mode: "lines",
        name: `Gold price/ounce (USD)`,
        x: dates,
        y: closingPrices_gold,
        line: {
          color: "#17BECF"
        }
      
      };

      var trace2 = {
        type: "scatter",
        mode: "lines",
        name: `${ticker}`,
        x: dates_ticker,
        y: closingPrices_ticker,
        line: {
          color: "black"
        }
      };

      var data = [trace1, trace2];

      var layout = {
        title: `London Bullion Market Association <br> Closing Gold Price (USD)`,
        xaxis: {
          rangeselector: selectorOptions,
          rangeslider: {}
        },
        yaxis: {
          fixedrange: true
        }
      };

      Plotly.newPlot("gold_plot", data, layout);

      /*========Share price plot id=share_price =======ENDS*/

      /*========Investment value plot id=investment_plot =======STARTS*/
      var selectorOptions = {
        buttons: [{
            step: 'month',
            stepmode: 'backward',
            count: 1,
            label: '1m'
        }, {
            step: 'month',
            stepmode: 'backward',
            count: 6,
            label: '6m'
        }, {
            step: 'year',
            stepmode: 'todate',
            count: 1,
            label: 'YTD'
        }, {
            step: 'year',
            stepmode: 'backward',
            count: 1,
            label: '1y'
        },{
          step: 'year',
          stepmode: 'backward',
          count: 5,
          label: '5y'
      }, {
            step: 'all',
        }],
      };

      var trace1 = {
        type: "scatter",
        mode: "lines",
        name: "Gold investment value",
        x: dates,
        y: gold_inv,
        line: {
          color: "#17BECF"
        }
      
      };

      var trace2 = {
        type: "scatter",
        mode: "lines",
        name: `${ticker} investment value`,
        x: dates_ticker,
        y: ticker_inv,
        line: {
          color: "black"
        }
      };

      var data = [trace1, trace2];

      var layout = {
        title: `Investment Value Plot`,
        xaxis: {
          rangeselector: selectorOptions,
          rangeslider: {}
        },
        yaxis: {
          fixedrange: true
        }
      };

      Plotly.newPlot("investment_plot", data, layout);
      /*========Investment plot id=investment_plot =======ENDS*/

       /*========Box plot id=box_plot =======STARTS*/
       d3.json(app_gold).then(function(app_gold_data) {

        d3.json(app_ticker).then(function(app_ticker_data) {
          
          var app_gold_dates = app_gold_data.map(d => d.Date)
          var app_gold_Returns = app_gold_data.map(d => d.Returns)

          var app_ticker_dates = app_ticker_data.map(d => d.Date)
          var app_ticker_Returns = app_ticker_data.map(d => d.Returns)

          console.log(app_gold_Returns)
          console.log(app_ticker_Returns)

          var xData = ['Gold Returns (%)', `${ticker} Returns %`];

         
          var yData = [
                  app_gold_Returns,
                  app_ticker_Returns
              ];
          var colors = ['rgba(44, 160, 101, 0.5)','rgba(255, 144, 14, 0.5)'];

          var data2 = [];

          for ( var i = 0; i < xData.length; i ++ ) {
              var result = {
                  type: 'box',
                  y: yData[i],
                  name: xData[i],
                  boxpoints: 'all',
                  jitter: 2,
                  // whiskerwidth: 0.2,
                  // fillcolor: 'cls',
                  marker: {
                      size: 2
                  },
                  // line: {
                  //     width: 0.5
                  // }
              };
              data2.push(result);
          };

          layout2 = {
              title: `Gold & ${ticker} Returns Volatility comparison`,
              yaxis: {
              //     autorange: true,
              //     showgrid: true,
              //     zeroline: true,
                //  dtick: 2,
              //     gridcolor: 'rgb(255, 255, 255)',
                //  gridwidth: 5,
              //     zerolinecolor: 'rgb(255, 255, 255)',
              //     zerolinewidth: 2
              },
              // margin: {
              //     l: 40,
              //     r: 30,
              //     b: 80,
              //     t: 100
              // },
              paper_bgcolor: 'rgb(243, 243, 243)',
              plot_bgcolor: 'rgb(243, 243, 243)',
              showlegend: false
          };

          Plotly.newPlot('box_plot', data2, layout2);
                    


        });
       });


       /*========Box plot id=box_plot =======ENDS*/


    }); //close d3 STOCK CHOICE
  });   //close d3 GOLD
};







// // buildCharts("Autauga, AL", "Baldwin, AL")
//   //filter county data for selecting county1 and county 2 and build charts
// function buildCharts(county1, county2) {

//   d3.json(url).then(data => {

//                     /*
//               2000: "16138", 
//               2001: "16211",
//               2002: "15944",
//               2003: "16484",
//               2004: "16884",
//               2005: "17404",
//               2006: "17189",
//               2007: "17998",
//               2008: "17802",
//               2009: "17483",
//               2010: "16988",
//               2011: "17298",
//               2012: "16421",
//               2013: "16476",
//               2014: "16858",
//               2015: "17278",
//               2016: "17434",
//               2017: "17800",
//               2018: "18172",
//               2019: "18493",
//               County: "Autauga",
//               Description: "Total employment (number of jobs)",
//               GeoName: "Autauga, AL",
//               State: " AL",
//               Unit: "Number of jobs",
//               index: 85
//                   */

//     // Prepare metadata
//     // var selector_county1 = d3.select('city1');
//     // var selector_county2 = d3.select('city2');
//     var selector_county1 = county1;
//     var selector_county2 = county2;

//     //console.log('county / selector test');
//     //console.log(county1);
//     //console.log(selector_county1);

//     var county_data = data['data'];

//     //console.log(data);
//     //console.log(county1)
//     //console.log(county2)

//     // Filter for county1 and county2 selection
//     var filtered_county1 = county_data.filter(d => d['GeoName'] == selector_county1);
//     var filtered_county2 = county_data.filter(d => d['GeoName'] == selector_county2);

//     /* Filter for plot variables AKA description aliased as
//           Pop -> Population (persons) 3/
//           PCI -> Per capita personal income 4/
//           PCE -> Per capita net earnings 4/
//           TE ->  Total employment (number of jobs)
//           AEJ -> Average earnings per job (dollars) 
//           AWS -> Average wages and salaries
//     */

//     var description = {
//       Pop : 'Population (persons) 3/',
//       PCI : 'Per capita personal income 4/',
//       PCE : 'Per capita net earnings 4/',
//       TE : 'Total employment (number of jobs)',
//       AEJ : 'Average earnings per job (dollars)', 
//       AWS : 'Average wages and salaries'
//     };

//     //console.log('filterd counties');
//     //console.log(filtered_county1);
//     //console.log(filtered_county2);



//     // Plot variables for county1
//     var Pop_county1 = filtered_county1.filter(d => d['Description'] == description['Pop']).map(m => Object.values(m).slice(0,20))[0];
//     var PCI_county1 = filtered_county1.filter(d => d['Description'] == description['PCI']).map(m => Object.values(m).slice(0,20))[0];
//     var PCE_county1 = filtered_county1.filter(d => d['Description'] == description['PCE']).map(m => Object.values(m).slice(0,20))[0];
//     var TE_county1 = filtered_county1.filter(d => d['Description'] == description['TE']).map(m => Object.values(m).slice(0,20))[0];
//     var AEJ_county1 = filtered_county1.filter(d => d['Description'] == description['AEJ']).map(m => Object.values(m).slice(0,20))[0];
//     var AWS_county1 = filtered_county1.filter(d => d['Description'] == description['AWS']).map(m => Object.values(m).slice(0,20))[0];

//     // Plot variables for county2
//     var Pop_county2 = filtered_county2.filter(d => d['Description'] == description['Pop']).map(m => Object.values(m).slice(0,20))[0];
//     var PCI_county2 = filtered_county2.filter(d => d['Description'] == description['PCI']).map(m => Object.values(m).slice(0,20))[0];
//     var PCE_county2 = filtered_county2.filter(d => d['Description'] == description['PCE']).map(m => Object.values(m).slice(0,20))[0];
//     var TE_county2 = filtered_county2.filter(d => d['Description'] == description['TE']).map(m => Object.values(m).slice(0,20))[0];
//     var AEJ_county2 = filtered_county2.filter(d => d['Description'] == description['AEJ']).map(m => Object.values(m).slice(0,20))[0];
//     var AWS_county2 = filtered_county2.filter(d => d['Description'] == description['AWS']).map(m => Object.values(m).slice(0,20))[0];

//     var date = filtered_county2.filter(d => d['Description'] == description['AWS']).map(m => Object.keys(m).slice(0,20))[0];

//     //console.log(Pop_county1);
//     //console.log(Pop_county2);
//     //console.log(date);


//     //--------MY PLOT--------
//     function buildPlot() {
//       //d3.select("#ecosplot").HTML("")   
         
//       var button_layer_2_height = 1.2
      
//       var data = [{
//           x: date,                          //Population (persons)
//           y: Pop_county1, 
//           mode: 'lines',
//           name: `${county1}`,  
//           marker: {color: 'royalblue'}
//         },
//         {
//           x: date, 
//           y: Pop_county2,
//           name: `${county2}`,
//           mode: 'lines',
//           marker: {color: '#F06A6A'}
//         },
//         {     
//           x: date,                         //Per capita personal income
//           y: PCI_county1,
//           mode: 'lines',
//           name: `${county1}`,
//           line: {color: 'royalblue'},
//           visible: false
//         },
//         {
//           x: date,                        
//           y: PCI_county2,
//           mode: 'lines',
//           name: `${county2}`,
//           visible: false,
//           line: {color: '#F06A6A'}
//         },
//         {
//           x: date,                          // Per capita net earnings 
//           y: PCE_county1,
//           mode: 'lines',
//           name: `${county1}`,
//           visible: false,
//           line: {color: 'royalblue'}
//         },
//         {
//           x: date,                        
//           y: PCE_county2,
//           mode: 'lines',
//           name: `${county2}`,
//           visible: false,
//           line: {color: '#F06A6A'}
//         },
//         {
//           x: date,                          // Total employment (number of jobs)
//           y: TE_county1,
//           mode: 'lines',
//           name: `${county1}`,
//           visible: false,
//           line: {color: 'royalblue'}
//         },
//         {
//           x: date,                       
//           y: TE_county2,
//           mode: 'lines',
//           name: `${county2}`,
//           visible: false,
//           line: {color: '#F06A6A'}
//         },
//         {
//           x: date,                        // Average earnings per job (dollars)          
//           y: AEJ_county1,
//           mode: 'lines',
//           name: `${county1}`,
//           visible: false,
//           line: {color: 'royalblue'}
//         },
//         {
//           x: date, 
//           y: AEJ_county2,
//           mode: 'lines',
//           name: `${county2}`,
//           visible: false,
//           line: {color: '#F06A6A'}
//         },
//         { 
//           x: date,                        // Average earnings per job (dollars)          
//           y: AWS_county1,
//           mode: 'lines',
//           name: `${county1}`,
//           visible: false,
//           line: {color: 'royalblue'}
//         },
//         {
//           x: date, 
//           y: AWS_county2,
//           mode: 'lines',
//           name: `${county2}`,
//           visible: false,
//           line: {color: '#F06A6A'}
//         }
//         ]

//       // var high_annotations = [
//       //     {
//       //       text: 'High Average:<br>' + high_ave.toFixed(2), 
//       //       x: '2016-03-01', 
//       //       y: high_ave, 
//       //       yref: 'y', xref: 'x', 
//       //       ay: -40, ax: 0
//       //     },
//       //     {
//       //       text: 'High Max:<br>' + high_max.toFixed(2), 
//       //       x: date[high.indexOf(high_max)], 
//       //       y: high_max, 
//       //       yref: 'y', xref: 'x', 
//       //       ay: -40, ax: 0
//       //     },  
//       //   ]

//       // var low_annotations = [{
//       //       text: 'Low Average:<br>' + low_ave.toFixed(2), 
//       //       x: '2015-05-01', 
//       //       y: low_ave, 
//       //       yref: 'y', xref: 'x', 
//       //       ay: 40, ax: 0
//       //     },
//       //     {
//       //       text: 'Low Min:<br>' + low_min.toFixed(2), 
//       //       x: date[low.indexOf(low_min)], 
//       //       y: low_min, 
//       //       yref: 'y', xref: 'x', 
//       //       ay: 40, ax: 0
//       //     }
//       // ]

//       var updatemenus=[
//           {
//               buttons: [   
//                   {
//                       args: [{'visible': [true, true, false, false, false, false, false, false, false, false, false, false]},
//                             {'title': `${county1} vs ${county2} <br> Population Comparison`/*,
//                   'annotations': high_annotations*/}],
//                       label: 'Population',
//                       method: 'update'
//                   },
//                   {
//                       args: [{'visible': [false, false, true, true, false, false, false, false, false, false, false, false]},
//                             {'title': `${county1} vs ${county2} <br> Personal Income Per Capita Comparison`/*,
//                   'annotations': low_annotations*/}],
//                       label: 'Personal Income <br> Per Capita',
//                       method: 'update'
//                   },
//                   {
//                       args: [{'visible': [false, false, false, false, true, true, false, false, false, false, false, false]},
//                             {'title': `${county1} vs ${county2} <br> Net Earnings Per Capita Comparison`/*,
//                   'annotations': [...low_annotations, ...high_annotations]*/}],
//                       label: 'Net Earnings <br> Per Capita',
//                       method: 'update'
//                   },
//                   {
//                     args: [{'visible': [false, false, false, false, false, false, true, true, false, false, false, false]},
//                           {'title': `${county1} vs ${county2} <br> Total Employment (Number of Jobs) Comparison`/*,
//                   'annotations': high_annotations*/}],
//                     label: 'Total Employment <br> (jobs)',
//                     method: 'update'
//                   },
//                   {
//                     args: [{'visible': [false, false, false, false, false, false, false, false, true, true, false, false]},
//                           {'title': `${county1} vs ${county2} <br> Average Earnings Per Job Comparison`/*,
//                   'annotations': high_annotations*/}],
//                     label: 'Average Earnings <br> Per Job',
//                     method: 'update'
//                   },
//                   {
//                       args: [{'visible': [false, false, false, false, false, false, false, false, false, false, true, true,]},
//                             {'title': `${county1} vs ${county2} <br> Average Wages & Salaries Comparison`/*,
//                   'annotations': []*/}],
//                       label: 'Average Wages <br> & Salaries',
//                       method: 'update'
//                   },
                  
//               ],
//               direction: 'down',
//               pad: {'r': 30, 't': 90},
//               showactive: true,
//               type: 'buttons',
//               x: -0.6,
//               xanchor: 'left',
//               y: button_layer_2_height,
//               yanchor: 'top',
              

//           }
          
          
//       ]

     

//       var layout = {
//           title: `${county1} vs ${county2} <br> Population Comparison`,
//           updatemenus: updatemenus,
//           showlegend: true,
//           scene: {
//             xaxis:{
//                 title: 'testing',
                
//             },
//             yaxis: {
//                 gridcolor: 'rgb(255, 255, 255)',
//                 zerolinecolor: 'rgb(255, 255, 255)',
//                 showbackground: true,
//                 backgroundcolor: 'rgb(230, 230, 230)'
//             },
           
//             aspectratio: {x: 1, y: 1, z: 0.7},
//             aspectmode: 'manual'
//       }
          
//       }

      

      

//       Plotly.newPlot("ecosplot", data, layout, {showSendToCloud: true});

      
//     };
    
//     buildPlot()   
    
//     });
    
// }




//   /*=================================================================
//             ON CHANGE PROCESSING
//   ===================================================================*/
// function processSubmit() {
//  // console.log('test');
//   document.getElementById('ThisMap').innerHTML = '<div class="col-5 map-container" id="map">This is row for city one bar chart </div>';
//   input_tokens = document.getElementsByClassName('token-input-token');

//   county1 = input_tokens[0].innerText.replace('×','').replace('\n','').trim();
//   county2 = input_tokens[1].innerText.replace('×','').replace('\n','').trim();
  
//   //console.log(county1);
//  // console.log(county2);
//   //console.log(input_tokens[0]);
//   buildCharts(county1, county2);
//   rendercounty(us_county, county1, county2);
//   imagesLoad(county1, county2);
//   reviewsLoad(county1, county2);



// }

// document.getElementById('submit').addEventListener('click', processSubmit);

//  /*=================================================================
//             ON CHANGE PROCESSING ---- ENDS
//   ===================================================================*/


//  /*=================================================================
//             MAPPING STARTS
//   ===================================================================*/




// // Use L.geoJSON to create a geoJSON layer



 
// function rendercounty(county, county1, county2) {
//   d3.json(county).then(data =>{
    
//     county1_striped = county1.split(",")[0] //.replace('\n','').trim();
//     county2_striped = county2.split(",")[0]
//     // filter county data to have only county and county2 info
//     console.log(data.features)
//     county1_data = data.features.filter(d => d.properties.NAME == county1_striped)
//     county2_data = data.features.filter(d => d.properties.NAME == county2_striped)
//     //console.log(county1_data)
//     //console.log(county2_data)
    
//     renderMap(us_states, county1_data, county2_data)

//     //console.log(`rendercounty is running`)

//   }); 

// };


// // Grabbing our State GeoJSON data..
// function renderMap(state, county1_data, county2_data) {
//   d3.json(state).then(data => {
    
//       stateData = data['features'];

//       // Use L.geoJSON to create a geoJSON layer
//       var stateLayer = L.geoJSON(stateData, {
//         onEachFeature: function (feature, layer) {
//           layer.bindPopup(`<h3>${feature.properties.NAME}</h3>`);
//             }
//         });
//      // console.log(county1_striped)
//       var county1_Layer = L.geoJSON(county1_data, {
//         onEachFeature: function (feature, layer) {
//           L.marker(layer.bindPopup(`<h3>${feature.properties.NAME}</h3>`));
//             }
//         });

//       var county2_Layer = L.geoJSON(county2_data, {
//         onEachFeature: function (feature, layer) {
//           L.marker(layer.bindPopup(`<h3>${feature.properties.NAME}</h3>`));
//             }
//         });
    
//         // Define streetmap, lightmap, and darkmap layers
//       var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//         attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
//         tileSize: 512,
//         maxZoom: 18,
//         zoomOffset: -1,
//         id: "mapbox/streets-v11",
//         accessToken: API_KEY
//       });

//       var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//         attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//         maxZoom: 18,
//         id: "light-v10",
//         accessToken: API_KEY
//       });

//       var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
//         attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
//         maxZoom: 18,
//         id: "dark-v10",
//         accessToken: API_KEY
//       });

    
//       // Define a baseMaps object to hold our base layers
      
//       var baseMaps2 = {
//         "Street Map": streetmap,
//         "Light Map": lightmap,
//         "Dark Map" : darkmap      
//       };

//       // Create overlay object to hold our overlay layer
    
//       var overlayMaps2 = {
//         State: stateLayer,
//         County1: county1_Layer,
//         County2 : county2_Layer    
//       };

//       var myMap = L.map("map", {
//         center: [37.09, -95.71],
//         zoom: 4,
//         layers: [lightmap, county1_Layer, county2_Layer]

//       });

    
//       L.control.layers(baseMaps2, overlayMaps2, {
//         collapsed: false
//       }).addTo(myMap);
      
//     });
//     //console.log(`renderMAP is running`)
//   };


//   /*=================================
//             Render Images
//     ==================================*/
// function imagesLoad(county1, county2){
//   d3.json(imageurl).then(data => {
//     console.log('images running')
     

//     var selector_county1 = county1;
//     var selector_county2 = county2;

//     var filtered_county1 = data.filter(d => d['county_state'] == selector_county1);
//     var filtered_county2 = data.filter(d => d['county_state'] == selector_county2);
    
//     var images_url_county1 = filtered_county1[0].img_src
//     var images_url_county2 = filtered_county2[0].img_src

//     images_descr_county1 = filtered_county1[0].img_descr
//     images_descr_county2 = filtered_county2[0].img_descr
//     //console.log(images_descr_county2)
//     document.getElementById('cnty1').src = images_url_county1
//     document.getElementById('cnty2').src = images_url_county2
//     document.getElementById('cnty1_text').innerText = images_descr_county1
//     document.getElementById('cnty2_text').innerText = images_descr_county2
    
//   });
// }

// function reviewsLoad(county1, county2){
//   d3.json(reviewsurl).then(data => {
//     console.log('reviews function is running')
//     //console.log(data)
//     tbody = d3.select("#table_county1" )
//     tbody.html('');
//     tbody = d3.select("#table_county2" )
//     tbody.html('');

//     var selector_county1 = county1;
//     var selector_county2 = county2;

//     var filtered_county1 = data.filter(d => d['county_state'] == selector_county1);
//     var filtered_county2 = data.filter(d => d['county_state'] == selector_county2);
//     //console.log(filtered_county1)
   
//     d3.select("#table1" ).text("")
//     d3.select("#table2" ).text("")

//     d3.select("#table1" ).text(`Reviews for ${selector_county1}`)
//     d3.select("#table2" ).text(`Reviews for ${selector_county2}`)
//     filtered_county1.slice(0,3).forEach(record => {
//       var comment_county1 = record.comment
//       var town_county1 = record.town
//       var tbody = d3.select("#table_county1" )
//       var row = tbody.append('tr')
//       row.append('td').text(comment_county1)
      

//     })

//     filtered_county2.slice(0,3).forEach(record => {
//       var comment_county2 = record.comment
//       var town_county2 = record.town
//       var tbody = d3.select("#table_county2" )
//       var row = tbody.append('tr')
//       row.append('td').text(comment_county2)
      

//     })
 
    
//   });
// }



