// Endpoint for data
var apiKey = "wJwp9NFb-QWNy3d1f9_w";

var app_gold = "/gold_returns"

// Initialise the web page with county1 and county 2 default comparisons
function Initialize_analyse() {
  var app_ticker = "/ticker_returns"
  var value = 1000;
  var ticker = "AAPL"
  var inv_startdate = `2018-10-19`
  var inv_enddate = `2020-02-05`
 

  volatility_analyse(ticker, app_ticker)
  //console.log(`Initialise is running`)
};
Initialize_analyse();



//=============================

function volatility_analyse(ticker, app_ticker) {
  /*========Box plot id=box_plot =======STARTS*/

 

  //Delay time to allow python to process
  var delayInMilliseconds = 3000; //1 second

  setTimeout(function () {
    //your code to be executed after 1 second
  }, delayInMilliseconds);

  d3.json(app_gold).then(function (app_gold_data) {

    d3.json(app_ticker).then(function (app_ticker_data) {

     // var app_gold_dates = app_gold_data.map(d => d.Date)
      var app_gold_Returns = app_gold_data.map(d => d.Returns)

      //var app_ticker_dates = app_ticker_data.map(d => d.Date)
      var app_ticker_Returns = app_ticker_data.map(d => d.Returns)

      // console.log(app_gold_Returns)
      // console.log(app_ticker_Returns)

      var xData = ['Gold Returns (%)', `${ticker} Returns %`];


      var yData = [
        app_gold_Returns,
        app_ticker_Returns
      ];
      var colors = ['rgba(44, 160, 101, 0.5)', 'rgba(255, 144, 14, 0.5)'];

      var data2 = [];

      for (var i = 0; i < xData.length; i++) {
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

        yaxis: {
          autorange: true,
          showgrid: true,
          zeroline: true,
          dtick: 2,
          gridcolor: '#7f7f7f',
          gridwidth: 5,
          zerolinecolor: '#7f7f7f',
          zerolinewidth: 2,
          tickfont: {
            size: 10,
            color: '#7f7f7f'
          },


        },

        xaxis: {

          tickfont: {
            size: 10,
            color: '#7f7f7f'
          }

        },
        margin: {
          l: 40,
          r: 30,
          b: 80,
          t: 100
        },
        paper_bgcolor: 'white',
        plot_bgcolor: 'white',

        showlegend: true,
        legend: {
          "orientation": "h",
          x: 0.15,
          y: 1.1,
        }
      };


      Plotly.newPlot('box_plot', data2, layout2);



    });
  });


  /*========Box plot id=box_plot =======ENDS*/
}



// $( document ).ready(function() {

//   function post_ticker() {
//    var ticker = document.getElementsByClassName('token-input-token')[0].innerText.replace('×', '').replace('\n', '').trim();;

//    return ticker;
//  }

//  $.post( "/ticker_returns", {
//   ticker: JSON.stringify(outputData)
// }, function(err, req, resp){
//   window.location.href = "/results/"+resp["responseJSON"]["uuid"];  
// });
// }





/*=================================================================
          ON CHANGE PROCESSING
===================================================================*/
function processSubmit_analyse() {
  // console.log('test');


  ticker = document.getElementsByClassName('token-input-token')[0].innerText.replace('×', '').replace('\n', '').trim();
  daterange = document.getElementsByClassName('drp-selected')[0].innerText.split(" - ")
  start_split_date = daterange[0].split("/")
  startdate = `${start_split_date[2]}-${start_split_date[0]}-${start_split_date[1]}`

  end_split_date = daterange[1].split("/")
  enddate = `${end_split_date[2]}-${end_split_date[0]}-${end_split_date[1]}`

  amount = document.getElementById('val-number').value

  // var entry = {
  //   start_date : startdate,
  //   end_date : enddate,
  //   ticker : ticker
  // };

  api_call = `/ticker_test?start_date=${startdate}&end_date=${enddate}&ticker=${ticker}`

  d3.json(api_call).then(data => {
    //console.log(data);
    volatility_analyse(ticker, api_call)
  });

  // fetch('/ticker_test', {
  //   method: "POST",
  //   credentials: "include",
  //   body: JSON.stringify(entry),
  //   //cache: "no-cache",
  //   headers: new Headers ({
  //     'content-type': "application/json"
  //   })
  // })
  // .then(function(response){
  //   if (response.status != 200) {
  //     console.log(`POST method failed: ${response}`);
  //     return ;
  //   }
    // app_ticker = '/ticker_returns'
    // volatility(ticker, app_ticker);
    //console.log(`POST method is successful:)
   

   

    
  }

  

  



//  console.log(`ProcessSubmit is running`)


document.getElementById('submit').addEventListener('click', processSubmit_analyse);

/*=================================================================
           ON CHANGE PROCESSING ---- ENDS
 ===================================================================*/


/* STRESS TEST*/









