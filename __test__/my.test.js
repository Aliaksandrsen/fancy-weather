import degToDms from '../src/js/degToDms';
import formatTime from '../src/js/formatTime';
import { getStringSeasonAndHourForImageRequest, getSeason } from '../src/js/getStringSeasonAndHourForImageRequest';
import fahrenheitToCelsius from '../src/js/fahrenheitToCelsius';
import getAverageTemperature from '../src/js/getAverageTemperature';
import chooseOrientation from '../src/js/chooseOrientation';
import iconNameDashToIconNameUpperCase from '../src/js/iconNameDashToIconNameUpperCase';
import { mphToMetresPerSecond, fractionToPercents } from '../src/js/windSpeedAndHumidityInit';

describe('Degrees to D M S view function', () => {
  test('adds coordinates 29.1933854 to equal 29° 11" 36\'', () => {
    expect(degToDms(29.1933854)).toBe('29° 11" 36\'');
    expect(degToDms(53.1645105)).toBe('53° 9" 52\'');
  });
});


describe('Time to localeString', () => {
  test('adds UTC miliseconds time 1575493200 to equal Thursday, 12/5', () => {
    expect(formatTime(1575493200, 'Europe/Minsk')).toBe('Thursday, 12/5');
    expect(formatTime(1575590400, 'Europe/London')).toBe('Friday, 12/6');
    expect(formatTime(1575673200, 'Europe/Berlin')).toBe('Saturday, 12/7');
  });
});


describe('getStringSeasonAndHourForImageRequest', () => {
  test('adds UTC miliseconds time 1575493200 to equal winter,9 PM', () => {
    expect(getStringSeasonAndHourForImageRequest(1575484882031)).toBe('winter,9 PM');
    expect(getStringSeasonAndHourForImageRequest(1571488142031)).toBe('autumn,3 PM');
    expect(getStringSeasonAndHourForImageRequest(15723881424)).toBe('summer,2 AM');
  });
});


describe('convert fahrenheit to celsius', () => {
  test('adds 35 fahrenheit to equal 2 celsius', () => {
    expect(fahrenheitToCelsius(35)).toBe(2);
    expect(fahrenheitToCelsius(29)).toBe(-2);
    expect(fahrenheitToCelsius(47)).toBe(8);
  });
});


describe('getAverageTemperature', () => {
  test('adds 0 and 6 degrees to equal 3 degrees', () => {
    expect(getAverageTemperature(0, 10)).toBe(5);
    expect(getAverageTemperature(-5, 5)).toBe(0);
    expect(getAverageTemperature(-22, 23)).toBe(1);
  });
});


describe('get name of season', () => {
  test('adds 7 month to equal summer season', () => {
    expect(getSeason('12')).toBe('winter');
    expect(getSeason('4')).toBe('spring');
    expect(getSeason('7')).toBe('summer');
  });
});


describe('choose screen orientation', () => {
  test('adds 1024 pixels width and 768 pixels height to equal landscape', () => {
    expect(chooseOrientation(1024, 768)).toBe('landscape');
    expect(chooseOrientation(375, 812)).toBe('portrait');
    expect(chooseOrientation(800, 600)).toBe('landscape');
  });
});


describe('tansform string to target form', () => {
  test('adds clear-day and to equal CLEAR_DAY', () => {
    expect(iconNameDashToIconNameUpperCase('clear-day')).toBe('CLEAR_DAY');
    expect(iconNameDashToIconNameUpperCase('cloudy')).toBe('CLOUDY');
    expect(iconNameDashToIconNameUpperCase('partly-cloudy-day')).toBe('PARTLY_CLOUDY_DAY');
  });
});


describe('speed translation', () => {
  test('20 miles per hour to equal 9 meters per second.', () => {
    expect(mphToMetresPerSecond(20)).toBe(9);
    expect(mphToMetresPerSecond(5)).toBe(2);
    expect(mphToMetresPerSecond(50)).toBe(22);
  });
});


describe('fraction to percents', () => {
  test('0.92 to equal 92%', () => {
    expect(fractionToPercents(0.92)).toBe('92%');
    expect(fractionToPercents(0.5)).toBe('50%');
    expect(fractionToPercents(0.01)).toBe('1%');
  });
});
