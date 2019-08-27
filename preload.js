window.addEventListener('DOMContentLoaded', () => {
  let bitcoin, temperature;

  const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) 
      element.innerText = text
  } 

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  });

  const getBTC = async () => {
    let response = await fetch('https://api.coinbase.com/v2/prices/BTC-USD/buy');
    let myJson = await response.json();
    let amount = myJson.data.amount;
    return await amount;
  }

  const getTime = () => {
    const now = new Date();
    let suffix = 'am';
    let hour = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    if(hour ===0){
      hour= 12; 
    }else if(hour > 12){
      hour = hour - 12;
      suffix = 'pm';
    }
    
    if(minutes < 10){
      minutes = `0${minutes}`
    }

    if(seconds < 10){
      seconds = `0${seconds}`
    }

    return`${hour}:${minutes}:${seconds} ${suffix}`;
  }

  try{
    //Initialize data
    getBTC().then((amount) => {
      bitcoin = amount;
      replaceText('area1', bitcoin);
    });

    //Update data intervals
    setInterval(()=> {
      getBTC().then((amount) => {
        bitcoin = amount;
      });
    }, 30 * 1000);

    //Update UI intervals
    setInterval(()=> replaceText('area1', bitcoin), 5 * 1000);

    setInterval(()=> replaceText(`area2`, getTime()), 200);
  }catch(err){
    replaceText(`area2`, err)
  }

})

