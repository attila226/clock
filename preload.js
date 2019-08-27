window.addEventListener('DOMContentLoaded', () => {
  let bitcoin, temperature = 72, isDisplayBtc = true;

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

  const getWeather = async () => {
    const p = {
      "id": "2172797",
      "units": "imperial",
      "q": "san diego"
    };

    const url = `https://community-open-weather-map.p.rapidapi.com/weather?id=${p.id}&q=${p.q}&units=${p.units}`;

    let response = await fetch(url, {
      method: 'GET',
      headers:{
        "x-rapidapi-host": "community-open-weather-map.p.rapidapi.com",
        "x-rapidapi-key": "ae15d43d72msh47e66be4e30c0ecp17c5bdjsn3520e4183b37"
      }
    });

    let json = await response.json();

    const temp = json.main.temp;

    return await temp;
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

    getWeather().then(temp => {
      temperature = temp;
    });

    //Update data intervals
    setInterval(()=> {
      getBTC().then((amount) => {
        bitcoin = amount;
      });
    }, 30 * 1000);

    setInterval(()=> {
      getWeather().then((temp) => {
        temperature = temp;
      });
    }, 60 * 1000);

    //Update UI intervals
    setInterval(()=> {
      if(isDisplayBtc){
        replaceText('area1', temperature + String.fromCharCode(176));
        document.getElementById('svg').style.display = 'none';
        isDisplayBtc = false;
      }else{
        replaceText('area1', bitcoin);
        document.getElementById('svg').style.display = null;
        isDisplayBtc = true;
      }
    }, 8 * 1000);

    setInterval(()=> replaceText(`area2`, getTime()), 200);
  }catch(err){
    replaceText(`area2`, err)
  }

})

