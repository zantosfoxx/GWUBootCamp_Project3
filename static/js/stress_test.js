/* Calendar Javascript control function */

$(function () {
  $('.calendar').pignoseCalendar({
    theme: 'blue' // light, dark, blue
  });
});






// Endpoint for data
var apiKey = "wJwp9NFb-QWNy3d1f9_w";
var ticker = "AAPL"
var value = 1000;
var start_date = '2007-01-01'
var gold_url = `https://www.quandl.com/api/v3/datasets/LBMA/GOLD/data.json?api_key=wJwp9NFb-QWNy3d1f9_w&column_index=2&start_date=${start_date}&order=asc`
var ticker_url = `https://www.quandl.com/api/v3/datasets/EOD/${ticker}/data.json?api_key=wJwp9NFb-QWNy3d1f9_w&column_index=2&start_date=${start_date}&order=asc`
var ferd_url = `https://www.quandl.com/api/v3/datasets/FED/RIFSPFF_N_D.json?api_key=KqktrbxvFdVxc81KAHb6&order=asc`
var BTC_url = `https://www.quandl.com/data.json?api_key=wJwp9NFb-QWNy3d1f9_w/CUR/CAD&order=asc`
var app_gold = "/gold_returns"
var app_ticker = "/ticker_returns"
// Initialise the web page with county1 and county 2 default comparisons
function Initialize() {

  gold()
  //console.log(`Initialise is running`)
};
Initialize();

function gold() {
  d3.json(gold_url).then(function (data_gold) {
    d3.json(ticker_url).then(function (data_ticker) {


      /*======PERIODS OF  STOCK MARKET DECLINES======
        analysis: stress test during periods of US stock market declines
        code: st1
        Activity 	                            Start Date	  End Date
        Global Fiancial Crisis (Fcrisis)	    09-Oct-07	    09-Mar-09
        US Downgrade (Downgrade)	            30-Mar-11	    03-Oct-11
        Global Slow down fears (Slowdown)	     22-May-15	    25-Aug-15
        Oil, US recession fears (recession)	   04-Nov-15	    11-Feb-16
        Covid-19 concerns	  (covid)            19-Feb-20	    23-Mar-20
      */

      /*===============================
             GOLD 
       ===============================*/
      //==============  Global Fiancial Crisis (Fcrisis)	    09-Oct-07	    09-Mar-09
      var open_Fcrisis = '2007-10-09'
      var close_Fcrisis = '2009-03-09'

      var open_gold_Fcrisis = data_gold.dataset_data.data.filter(d => d[0] == open_Fcrisis)
      var close_gold_Fcrisis = data_gold.dataset_data.data.filter(d => d[0] == close_Fcrisis)
      var gold_Fcrisis_change = (close_gold_Fcrisis[0][1] - open_gold_Fcrisis[0][1]) / open_gold_Fcrisis[0][1] * 100
      //============== US Downgrade (Downgrade)	            30-Mar-11	    03-Oct-11
      var open_Downgrade = '2011-03-30'
      var close_Downgrade = '2011-10-03'

      var open_gold_Downgrade = data_gold.dataset_data.data.filter(d => d[0] == open_Downgrade)
      var close_gold_Downgrade = data_gold.dataset_data.data.filter(d => d[0] == close_Downgrade)
      var gold_Downgrade_change = (close_gold_Downgrade[0][1] - open_gold_Downgrade[0][1]) / open_gold_Downgrade[0][1] * 100


      //============== Global Slow down fears (Slowdown)	     22-May-15	    25-Aug-15
      var open_Slowdown = '2015-05-22'
      var close_Slowdown = '2015-08-19'

      var open_gold_Slowdown = data_gold.dataset_data.data.filter(d => d[0] == open_Slowdown)
      var close_gold_Slowdown = data_gold.dataset_data.data.filter(d => d[0] == close_Slowdown)
      console.log(open_gold_Slowdown)
      console.log(close_gold_Slowdown)
      var gold_Slowdown_change = (close_gold_Slowdown[0][1] - open_gold_Slowdown[0][1]) / open_gold_Slowdown[0][1] * 100
      //============== Oil, US recession fears (recession)	   04-Nov-15	    11-Feb-16
      var open_recession = '2015-11-04'
      var close_recession = '2016-02-16'

      var open_gold_recession = data_gold.dataset_data.data.filter(d => d[0] == open_recession)
      var close_gold_recession = data_gold.dataset_data.data.filter(d => d[0] == close_recession)
      var gold_recession_change = (close_gold_recession[0][1] - open_gold_recession[0][1]) / open_gold_recession[0][1] * 100
      //============== Covid-19 concerns	  (covid)            19-Feb-20	    23-Mar-20
      var open_covid = '2020-02-19'
      var close_covid = '2020-03-23'

      var open_gold_covid = data_gold.dataset_data.data.filter(d => d[0] == open_covid)
      var close_gold_covid = data_gold.dataset_data.data.filter(d => d[0] == close_covid)
      var gold_covid_change = (close_gold_covid[0][1] - open_gold_covid[0][1]) / open_gold_covid[0][1] * 100

      //============== USer's Period
      start_date2 = `2018-10-19`
      end_date = `2020-02-05`
      var open_inv = start_date2
      var close_inv = end_date

      var open_gold_inv = data_gold.dataset_data.data.filter(d => d[0] == open_inv)
      var close_gold_inv = data_gold.dataset_data.data.filter(d => d[0] == close_inv)
      var gold_inv_change = (close_gold_inv[0][1] - open_gold_Fcrisis[0][1]) / open_gold_inv[0][1] * 100

      /*===============================
               USER's Ticker
          ===============================*/
      //==============  Global Fiancial Crisis (Fcrisis)      09-Oct-07     09-Mar-09


      var open_ticker_Fcrisis = data_ticker.dataset_data.data.filter(d => d[0] == open_Fcrisis)
      var close_ticker_Fcrisis = data_ticker.dataset_data.data.filter(d => d[0] == close_Fcrisis)
      var ticker_Fcrisis_change = (close_ticker_Fcrisis[0][1] - open_ticker_Fcrisis[0][1]) / open_ticker_Fcrisis[0][1] * 100
      //============== US Downgrade (Downgrade)             30-Mar-11     03-Oct-11


      var open_ticker_Downgrade = data_ticker.dataset_data.data.filter(d => d[0] == open_Downgrade)
      var close_ticker_Downgrade = data_ticker.dataset_data.data.filter(d => d[0] == close_Downgrade)
      var ticker_Downgrade_change = (close_ticker_Downgrade[0][1] - open_ticker_Downgrade[0][1]) / open_ticker_Downgrade[0][1] * 100


      //============== Global Slow down fears (Slowdown)       22-May-15      25-Aug-15


      var open_ticker_Slowdown = data_ticker.dataset_data.data.filter(d => d[0] == open_Slowdown)
      var close_ticker_Slowdown = data_ticker.dataset_data.data.filter(d => d[0] == close_Slowdown)
      var ticker_Slowdown_change = (close_ticker_Slowdown[0][1] - open_ticker_Slowdown[0][1]) / open_ticker_Slowdown[0][1] * 100
      //============== Oil, US recession fears (recession)     04-Nov-15      11-Feb-16


      var open_ticker_recession = data_ticker.dataset_data.data.filter(d => d[0] == open_recession)
      var close_ticker_recession = data_ticker.dataset_data.data.filter(d => d[0] == close_recession)
      var ticker_recession_change = (close_ticker_recession[0][1] - open_ticker_recession[0][1]) / open_ticker_recession[0][1] * 100
      //============== Covid-19 concerns    (covid)            19-Feb-20      23-Mar-20


      var open_ticker_covid = data_ticker.dataset_data.data.filter(d => d[0] == open_covid)
      var close_ticker_covid = data_ticker.dataset_data.data.filter(d => d[0] == close_covid)
      var ticker_covid_change = (close_ticker_covid[0][1] - open_ticker_covid[0][1]) / open_ticker_covid[0][1] * 100

      //============== USer's Period


      var open_ticker_inv = data_ticker.dataset_data.data.filter(d => d[0] == open_inv)
      var close_ticker_inv = data_ticker.dataset_data.data.filter(d => d[0] == close_inv)
      var ticker_inv_change = (close_ticker_inv[0][1] - open_ticker_Fcrisis[0][1]) / open_ticker_inv[0][1] * 100

      console.log(ticker_covid_change)


      //============== Bar plot of US Stock market decline========
      var trace1 = {
        x: [
          `Global Fiancial Crisis <br> From 09-Oct-07 <br> to 09-Mar-09`,
          `US Downgrade <br> From 30-Mar-11 <br> to 03-Oct-11`,
          `Global Slow down fears <br> From 22-May-15 <br> to 25-Aug-15`,
          `Oil, US recession fears <br> From 04-Nov-15 <br> to 11-Feb-16`,
          `Covid-19 concerns <br> From 19-Feb-20 <br> to 23-Mar-20`,
          `Your Investment Period <br> From ${start_date2} <br> to ${end_date}`
        ],
        y: [gold_Fcrisis_change,
          gold_Downgrade_change,
          gold_Slowdown_change,
          gold_recession_change,
          gold_covid_change,
          gold_inv_change
        ],
        name: 'Gold',
        type: 'bar',
      
      };

      var trace2 = {
        x: [
          `Global Fiancial Crisis <br> From 09-Oct-07 <br> to 09-Mar-09`,
          `US Downgrade <br> From 30-Mar-11 <br> to 03-Oct-11`,
          `Global Slow down fears <br> From 22-May-15 <br> to 25-Aug-15`,
          `Oil, US recession fears <br> From 04-Nov-15 <br> to 11-Feb-16`,
          `Covid-19 concerns <br> From 19-Feb-20 <br> to 23-Mar-20`,
          `Your Investment Period <br> From ${start_date2} <br> to ${end_date}`
        ],
        y: [ticker_Fcrisis_change,
          ticker_Downgrade_change,
          ticker_Slowdown_change,
          ticker_recession_change,
          ticker_covid_change,
          ticker_inv_change
        ],

        name: `${ticker}`,
        type: 'bar',

      };
        



      var data = [trace1, trace2];

      // var layout = {
      //   barmode: 'group',
      //   yaxis: {
      //     title: {
      //       text: 'Returns (%)',
      //       font: {
      //         family: 'Courier New, monospace',
      //         size: 10,
      //         color: '#7f7f7f',
      //         tickformat: '%'
      //       },
            
      //     },
      //   },
      //   tickfont:{'family': "Courier New, monospace",
      //   'size': 5, 
      //   'color': '#7f7f7f'}
      // };
      var layout = {
        
        xaxis: {tickfont: {
            size: 10,
            color: '#7f7f7f'
          }},
        yaxis: {
          title: 'Returns (%)',
          titlefont: {
            size: 10,
            color: '#7f7f7f'
          },
          tickfont: {
            size: 10,
            color: '#7f7f7f'
          }
        },
        legend: {
          x: 0,
          y: 1.0,
          bgcolor: 'rgba(255, 255, 255, 0)',
          bordercolor: 'rgba(255, 255, 255, 0)'
        },
        barmode: 'group',
        bargap: 0.4,
        bargroupgap: 0
      };


      Plotly.newPlot('decline_plot', data, layout);






    }); //close d3 STOCK CHOICE
  });   //close d3 GOLD
};


/* STRESS TEST*/









