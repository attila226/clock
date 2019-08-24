window.addEventListener('DOMContentLoaded', () => {
  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) 
      element.innerText = text
  } 

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const getBTC = () => {
    fetch('https://api.coinbase.com/v2/prices/BTC-USD/buy')
    .then(function(response) {
      return response.json();
    })
  .then(function(myJson) {
    replaceText(`btc`, formatter.format(myJson.data.amount));
  });
  }


  try{
    getBTC();

    setInterval(()=> getBTC(), 30 * 1000);
  }catch(err){
    replaceText(`err`, err)
  }

})

