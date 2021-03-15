/* Calendar Javascript control function */


// Endpoint for data


var prime_rate_url = "/falling_prime_rates"
// Initialise the web page with county1 and county 2 default comparisons


d3.json(prime_rate_url).then(function (data_prime_rate) {
  console.log(data_prime_rate)
});
   