
// HTML variabler
const container = document.querySelector('.container');

const form = document.querySelector('form');

const list = document.querySelector('.weather-list');

const wrapper = document.querySelector('.wrapper');

// skapar alla list items och ger dom en class
let descItem = document.createElement('li');
descItem.setAttribute('class', 'list-item');

let ikonItem = document.createElement('li');
ikonItem.setAttribute('class', 'list-item');
let ikonImg = document.createElement('img');
ikonItem.appendChild(ikonImg);

let tempItem = document.createElement('li');
tempItem.setAttribute('class', 'list-item');

let windItem = document.createElement('li');
windItem.setAttribute('class', 'list-item');

let humidItem = document.createElement('li');
humidItem.setAttribute('class', 'list-item');

let errItem = document.createElement('li');
errItem.setAttribute('class', 'list-item');

// sätter in alla list items i min UL
list.appendChild(descItem);
list.appendChild(tempItem);
list.appendChild(windItem);
list.appendChild(humidItem);
list.appendChild(ikonItem);
list.appendChild(errItem);

// Eventlistener för formen med eventet "submit"
form.addEventListener('submit', function(event){
    event.preventDefault();
    
    // Min api key
    const key = '0fa1772507a1a6468d8928fbc590e60b';


    // variabel som ska innehålla användarens sökning
    let textInput = document.querySelector('#city');

    let city = textInput.value;

    list.appendChild(errItem);

    //API urlen
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`


    // Fetch anropet med url
    fetch(url).then(function(response){

        return response.json();
    }).then(function(data){

        // Lägger till innehåll från APIn till respektive list item
        descItem.innerText = `Todays forecast shows us ${data.weather[0].description}`

        tempItem.innerText = `and temperatures of ${Math.round(data.main.temp)} degrees celsius`

        windItem.innerText = `with winds up to ${data.wind.speed} m/s.`

        humidItem.innerText = `Humidity will be around ${data.main.humidity}%`

        ikonImg.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`

        // If-sats som ändrar färg på bakgrunden beroende på temperaturen på sökningens stad
        if(data.main.temp < 5){
            wrapper.style.background = 'url(https://images.creativemarket.com/0.1.0/ps/1964355/1360/1844/m1/fpnw/wm1/zz8cohytpovc0itqksego3lwktlm2loas407csfivdjecs7apagyn8jvu7qopzx2-.jpg?1480452344&s=31e65325325e705e80e6681d3314fd52)'
        }else if(data.main.temp < 10){
            wrapper.style.background = 'cornflowerblue';
            wrapper.style.transition = 'background 3s ease'// Transition som gör övergången snyggare
        }else if(data.main.temp < 15){
            wrapper.style.background = '#ffff99';
            wrapper.style.transition = 'background 3s ease'
        }else if(data.main.temp < 20){
            wrapper.style.background = '#ff6600';
            wrapper.style.transition = 'background 3s ease'
        }else{
            wrapper.style.background = 'rgba(195, 34, 48, 0.8)';
            wrapper.style.transition = 'background 3s ease'
        }

        console.log(data)

        // Catch funktionen som visas vid ogiltig sökning.
    }).catch(function(error){
        errItem.innerText = `${city} is not a valid city, please try again.`

        // Timer som tar bort errorelementet efter 3 sekunder
        setTimeout(function(){
            errItem.innerText = '';
            errItem.remove();
        }, 3000)
    })
})

