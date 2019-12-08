const template = `

<header class="header">
      <div class="header__half header__half_buttons-panel">

        <button id="loadBackground" class="load-background button button_load">
          <i class="fa fa-refresh" aria-hidden="true"></i>
        </button>
        <button id="en" class="button button_en">EN</button>
        <button id="ru" class="button button_ru">RU</button>
        <button id="be" class="button button_be">BE</button>
        <button id="F" class="button button_F">°F</button>
        <button id="C" class="button button_C">°C</button>

      </div>
      <div class="header__half header__half_search-panel">
        <button id="searchButton" class="load-town button button_search">
          <i class="fa fa-search" aria-hidden="true"></i>
        </button>
        <button id="voice" class="button button_voice">
          <i class="fa fa-microphone" aria-hidden="true"></i>
        </button>
        <input id="searchInput" class="header__serch-input" type="text">
      </div>
    </header>

    <main class="main" id="main">

      <div class="weather">
        <div class="weather-card weather-card_big">
          <div class="weather__location" id="weatherLocation">
            <h1 class="weather__town" id="town"></h1>
            <div class="weather__country" id="country"></div>
          </div>
          <div class="weather__time weather__time_big" id="weatherTime"></div>
          <div class="weather__time weather__time_big" id="weatherHoursAndMinutes"></div>
          <div class="weather__about">
            <div class="weather__about-left weather__about-left_big">

              <p class="weather__description weather__description_big" id="weatherDescreption"></p>
            </div>
            <canvas id="icon" class="icon_big" width="196" height="196"></canvas>
          </div>


          <div class="weather__parameters">

            <div class="weather__in-this-day" id="weatherToday">
              <h2 class="degree-value degree-value_big" id="degreesValue"></h2>
              <span class="degree-symbol degree-symbol_big" id="degreesSymbol"></span>
            </div>

            <div class="weather__humidity-wind">
              <p class="degree-value degree-value_apparent">
                  <span class="degree-value" id="apparentTemperatureLabel"></span>
                  <span class="degree-value" id="degreesValueApparent"></span>
                  <span class="degree-symbol" id="degreesSymbolApparent"></span>
              </p>
              <p id="windSpeed"></p>
              <p id="humidity"></p>
            </div>
          </div>

        </div>


        <div class="weather__next-days">

          <div class="weather-card weather-card_small">
            <div class="weather__time weather__time_small" id="weatherTimeFirst"></div>
            <div class="weather__about">
              <div class="weather__about-left weather__about-left_small">

                <p class="weather__description weather__description_small" id="weatherDescreptionFirst"></p>
              </div>
              <canvas id="icon1" class="icon_small" width="64" height="64"></canvas>
            </div>

            <div class="weather__in-this-day" id="weatherFirst">
              <h3 class="degree-value degree-value_small" id="degreesValueFirst"></h3>
              <span class="degree-symbol degree-symbol_small" id="degreesSymbolFirst"></span>
            </div>
          </div>

          <div class="weather-card weather-card_small">
            <div class="weather__time weather__time_small" id="weatherTimeSecond"></div>
            <div class="weather__about">
              <div class="weather__about-left weather__about-left_small">

                <p class="weather__description weather__description_small" id="weatherDescreptionSecond"></p>
              </div>
              <canvas id="icon2" class="icon_small" width="64" height="64"></canvas>
            </div>

            <div class="weather__in-this-day" id="weatherSecond">
              <h3 class="degree-value degree-value_small" id="degreesValueSecond"></h3>
              <span class="degree-symbol degree-symbol_small" id="degreesSymbolSecond"></span>
            </div>
          </div>

          <div class="weather-card weather-card_small">
            <div class="weather__time weather__time_small" id="weatherTimeThird"></div>
            <div class="weather__about">
              <div class="weather__about-left weather__about-left_small">

                <p class="weather__description weather__description_small" id="weatherDescreptionThird"></p>
              </div>
              <canvas id="icon3" class="icon_small" width="64" height="64"></canvas>
            </div>

            <div class="weather__in-this-day" id="weatherThird">
              <h3 class="degree-value degree-value_small" id="degreesValueThird"></h3>
              <span class="degree-symbol degree-symbol_small" id="degreesSymbolThird"></span>
            </div>
          </div>

        </div>
      </div>

      <div class="map-block" id="mapBlock">
        <div class="map-wrapper" id="mapWrapper">
          <div id="map" class="map"></div>
        </div>
        <p class="latitude-with-minute" id="latitudeWithMinute"></p>
        <p class="longitude-with-minute" id="longitudeWithMinute"></p>
      </div>

    </main>

    <div id="output"></div>
`;

export default template;
