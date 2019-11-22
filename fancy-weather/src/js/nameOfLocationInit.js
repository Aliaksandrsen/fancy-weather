import { longitude, latitude } from './main';

// be_BY — белорусский;
// ru_Ru — русский;
// en_RU — ответ на английском, российские особенности карты;
// en_US — ответ на английском, американские особенности карты;
window.onload = function f() {
  fetch(`https://geocode-maps.yandex.ru/1.x/?format=json&apikey=e1d2fdeb-5a51-4d55-a96b-99d83404c3d3&geocode=${longitude},${latitude}&kind=locality&results=1&lang=en_US`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data.response.GeoObjectCollection.featureMember[0].GeoObject.description);
      console.log(data.response.GeoObjectCollection.featureMember[0].GeoObject.name);
    });
};
