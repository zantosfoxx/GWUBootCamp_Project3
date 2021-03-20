var year30_app = "/yearMortgage_30";
var prime_app = "/dataPrimer";
var year15_app = "/yearMortgage_15";
var year7_app = "/yearMortgage_7";
var prime5_app = "/dataPrime5yrs";
var year5_app = "/yearMortgage_5";

/*regina long term  and prime data*/
function build_mortgage_Plot() {

  d3.json(year30_app).then(function (yearMortgage_30) {                  // Start of yearMortgage_30 
    d3.json(prime_app).then(function (dataPrimer) {                  // Start of Prime Data
      d3.json(year15_app).then(function (yearMortgage_15) {
        d3.json(year7_app).then(function (yearMortgage_7) {                  // Start of yearMortgage_30 
          d3.json(prime5_app).then(function (dataPrime5yrs) {                  // Start of Prime Data
            d3.json(year5_app).then(function (yearMortgage_5) {                  // Start of yearMortgage_15

              year30_app = yearMortgage_30.map(d => moment(d.Date).format("YYYY-MM-DD"))
              // moment(1382086394000).format("DD-MM-YYYY
              year30_values = yearMortgage_30.map(d => d.Value)

             var  prime_date = dataPrimer.map(d => moment(d.Date).format("YYYY-MM-DD"))
             var prime_values = dataPrimer.map(d => d.MPRIME)

              year15_app = yearMortgage_15.map(d => moment(d.Date).format("YYYY-MM-DD"))
              year15_values = yearMortgage_15.map(d => d.Value)
              //console.log(prime_date)


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
                name: `30Year mortgage rate`,
                x: year30_app,
                y: year30_values,
                line: {
                  color: "#17BECF"
                }
              };
              var trace2 = {
                type: "scatter",
                mode: "lines",
                name: `prime Rate`,
                yaxis: 'y2',
                x: prime_date,
                y: prime_values,
                line: {
                  color: "black"
                }
              };

              var trace3 = {
                type: "scatter",
                mode: "lines",
                name: `15Year mortgage rate`,

                x: year15_app,
                y: year15_values,
                line: {
                  color: "red"
                }
              };
              var data = [trace1, trace2, trace3];
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
                  title: {
                    text: 'interest rate(%)',
                    font: {
                      size: 10,
                      color: '#7f7f7f'
                    }
                  },
                  ixedrange: true,
                  tickfont: {
                    size: 10,
                    color: '#7f7f7f'
                  }
                },
                yaxis2: {
                  title: {
                    text: 'prime Rate (%)',
                    font: {
                      size: 10,
                      color: '#7f7f7f'
                    }
                  },
                  overlaying: 'y',
                  side: 'right',
                  tickfont: {
                    size: 10,
                    color: '#7f7f7f'
                  }
                },
                showlegend: true,
                legend: {
                  "orientation": "h",
                  x: 0.15,
                  xanchor: 'bottom',
                  y: 1.1,
                }
              };
              Plotly.newPlot("regina_plot", data, duallayout);
              //console.log("Regina is running end")
              // /*regina short term  and prime data*/



              //                // Start of yearMortgage_15

              year7_app = yearMortgage_7.map(d => moment(d.Date).format("YYYY-MM-DD"))
              year7_values = yearMortgage_7.map(d => d.Value)

              prime5_date = dataPrime5yrs.map(d => moment(d.Date).format("YYYY-MM-DD"))
              prime5_values = dataPrime5yrs.map(d => d.MPRIME)

              year5_app = yearMortgage_5.map(d => moment(d.Date).format("YYYY-MM-DD"))
              year5_values = yearMortgage_5.map(d => d.Value)
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
                name: `7years mortgage rate`,
                x: year7_app,
                y: year7_values,
                line: {
                  color: "#17BECF"
                }
              };
              var trace2 = {
                type: "scatter",
                mode: "lines",
                name: `prime Rate`,
                yaxis: 'y2',
                x: prime5_date,
                y: prime5_values,
                line: {
                  color: "black"
                }
              };

              var trace3 = {
                type: "scatter",
                mode: "lines",
                name: `5years mortgage rate`,
                x: year5_app,
                y: year5_values,
                line: {
                  color: "red"
                }
              };
              var data = [trace1, trace2, trace3];
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
                  title: {
                    text: '7 year mortgage',
                    font: {
                      size: 10,
                      color: '#7f7f7f'
                    }
                  },
                  ixedrange: true,
                  tickfont: {
                    size: 10,
                    color: '#7f7f7f'
                  }
                },
                yaxis2: {
                  title: {
                    text: 'Interest Rate (%)',
                    font: {
                      size: 10,
                      color: '#7f7f7f'
                    }
                  },
                  overlaying: 'y',
                  side: 'right',
                  tickfont: {
                    size: 10,
                    color: '#7f7f7f'
                  }
                },
                showlegend: true,
                legend: {
                  "orientation": "h",
                  x: 0.15,
                  xanchor: 'bottom',
                  y: 1.1,
                }
              };
              Plotly.newPlot("regina_plot2", data, duallayout);
            });
          });
        });
      });
    });
  });
};
build_mortgage_Plot()


        //   };








        // buildPlot2();

