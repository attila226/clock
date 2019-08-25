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

  const getTime = () => {
    const now = new Date();
    let suffix = 'am';
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let  seconds = now.getSeconds();

    if(hour > 12){
      hour = hour - 12;
      suffix = 'pm';
    }
    
    if(minutes < 10){
      minutes = `0${minutes}`
    }

    if(seconds < 10){
      seconds = `0${seconds}`
    }

    replaceText(`time`, `${hour}:${minutes}:${seconds} ${suffix}`);
  }

  try{
    getBTC();

    setInterval(()=> getBTC(), 30 * 1000);

    setInterval(()=> getTime(), 200);
  }catch(err){
    replaceText(`err`, err)
  }

})

