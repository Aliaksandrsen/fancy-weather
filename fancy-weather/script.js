window.addEventListener('load', () => {
    let longitude;
    let latitude;
    let temperatureDescreption = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');
    let temperatureSection = document.querySelector('.temperature');
    let temperatureSpan = document.querySelector('.temperature span');


    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            // console.log(position);
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
            const proxy = 'https://cors-anywhere.herokuapp.com/'
            const urlWithCoordinates = `${proxy}https://api.darksky.net/forecast/ef66892cfcce1b6b628ef03d7a7a6d3c/${latitude},${longitude}?lang=ru`;

            fetch(urlWithCoordinates)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    const { temperature, summary, icon } = data.currently;
                    // set DOM Elements from the API
                    temperatureDegree.textContent = temperature;
                    temperatureDescreption.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    // Formula for celsius
                    let celsius = (temperature - 32) * (5 / 9);
                    // Set Icon
                    setIcons(icon, document.querySelector('.icon'));

                    // Change temperature to Celsius/Farenheit
                    temperatureSection.addEventListener('click', () => {
                        if (temperatureSpan.textContent === '°F') {
                            temperatureSpan.textContent = '°C';
                            temperatureDegree.textContent = Math.floor(celsius * 100) / 100;
                        } else {
                            temperatureSpan.textContent = '°F';
                            temperatureDegree.textContent = temperature;
                        }
                    })
                });
        })
    } else {
        console.log('df')
        locationTimezone.innerHTML = '<p>We have some problems</p>';
    }

    function setIcons(icon, iconID) {
        const skycons = new Skycons({ color: 'white' });
        const currentIcon = icon.replace(/-/g, '_').toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);

    }
});