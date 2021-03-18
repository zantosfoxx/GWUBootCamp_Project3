var oil_app = "/dataOil";
var prime_app = "/dataPrime";
var misery_app = "/dataMisery";



function build_oil_Plot() {
    d3.json(oil_app).then(function (dataOil) {                  // Start of DataOil 
        d3.json(prime_app).then(function (dataPrime) {                  // Start of Prime Data
            d3.json(misery_app).then(function (dataMisery) {                // Start of misery Data
                // console.log("Nick testing")
                
                oil_date = dataOil.map(d => moment(d.Date).format("YYYY-MM-DD"))
               // moment(1382086394000).format("DD-MM-YYYY
                oil_values = dataOil.map(d => d.Value)

                prime_date = dataPrime.map(d => moment(d.Date).format("YYYY-MM-DD"))
                prime_values = dataPrime.map(d => d.MPRIME)

                misery_date = dataMisery.map(d =>moment(d.Date).format("YYYY-MM-DD"))
                misery_values = dataMisery.map(d => d['Misery Index'])
console.log( prime_date)
            

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
                    }, {
                      step: 'year',
                      stepmode: 'backward',
                      count: 5,
                      label: '5y'
                    }, {
                      step: 'all',
                    }],
                    y: 1.1,
                  };
                  var trace1 = {
                    type: "scatter",
                    mode: "lines",
                    name: `Oil Price`,
                    x:  oil_date,
                    y: oil_values,
                    line: {
                      color: "#17BECF"
                    }
                  };
                  var trace2 = {
                    type: "scatter",
                    mode: "lines",
                    name: `Interest Rate`,
                    yaxis: 'y2',
                    x: prime_date,
                    y: prime_values,
                    line: {
                      color: "black"
                    }
                  };
                  var data = [trace1, trace2];
                  var duallayout = {
                    xaxis: {
                      rangeselector: selectorOptions,
                      rangeslider: {},
                      tickfont: {
                        size: 10,
                        color: '#7f7f7f'
                      }
                    },
                    yaxis: {
                      title: {text: 'Oil Price/Barrel (USD)',
                      font: {
                        size: 10,
                        color: '#7f7f7f'}},
                      ixedrange: true,
                      tickfont: {
                        size: 10,
                        color: '#7f7f7f'
                      }
                    },
                    yaxis2: {
                      title: {text: 'Interest Rate (%)',
                      font: {
                        size: 10,
                        color: '#7f7f7f'}},
                      overlaying: 'y',
                      side: 'right',
                      tickfont: {
                        size: 10,
                        color: '#7f7f7f'
                      }
                    },
                    showlegend: true,
                    legend: {"orientation": "h",
                    x: 0.15,
                    xanchor: 'bottom',
                    y: 1.1,}
                  };
                  Plotly.newPlot("Nick_plot", data, duallayout);

/*Nicks Misery and prime data*/
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
                    }, {
                      step: 'year',
                      stepmode: 'backward',
                      count: 5,
                      label: '5y'
                    }, {
                      step: 'all',
                    }],
                    y: 1.1,
                  };
                  var trace1 = {
                    type: "bar",
                    mode: "lines",
                    name: `Misery index`,
                    x:  misery_date,
                    y: misery_values,
                    line: {
                      color: "#17BECF"
                    }
                  };
                  var trace2 = {
                    type: "scatter",
                    mode: "lines",
                    name: `Interest Rate`,
                    yaxis: 'y2',
                    x: prime_date,
                    y: prime_values,
                    line: {
                      color: "black"
                    }
                  };
                  var data = [trace1, trace2];
                  var duallayout = {
                    xaxis: {
                      rangeselector: selectorOptions,
                      rangeslider: {},
                      tickfont: {
                        size: 10,
                        color: '#7f7f7f'
                      }
                    },
                    yaxis: {
                      title: {text: 'Misery index',
                      font: {
                        size: 10,
                        color: '#7f7f7f'}},
                      ixedrange: true,
                      tickfont: {
                        size: 10,
                        color: '#7f7f7f'
                      }
                    },
                    yaxis2: {
                      title: {text: 'Interest Rate (%)',
                      font: {
                        size: 10,
                        color: '#7f7f7f'}},
                      overlaying: 'y',
                      side: 'right',
                      tickfont: {
                        size: 10,
                        color: '#7f7f7f'
                      }
                    },
                    showlegend: true,
                    legend: {"orientation": "h",
                    x: 0.15,
                    xanchor: 'bottom',
                    y: 1.1,}
                  };
                  Plotly.newPlot("Nick_plot2", data, duallayout);


            });  // Start of misery Data                                  
        }); //End of Prime Data
    }); // End of DataOil  


};

build_oil_Plot()
