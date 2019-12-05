import { stringForBackgroundresponse } from './main';
import { getStringSeasonAndHourForImageRequest, timeIsNow } from './getStringSeasonAndHourForImageRequest';
import chooseOrientation from './chooseOrientation';

export default function backgroundInit() {
  // doing an analysis for the request background based on English localization
  async function getLinkToImage() {
    const UNSPLASH_KEY = '97468db9ac3f46aba050edeb6ee94ee6c2fa732c4970c3d260cdbf50156a6f44';

    // determine which orientation to load the image
    const orientation = chooseOrientation(window.innerWidth, window.innerHeight);

    const informationForImage = `${stringForBackgroundresponse},${getStringSeasonAndHourForImageRequest(timeIsNow)}`;
    const url = `https://api.unsplash.com/photos/random?orientation=${orientation}&per_page=1&query=${informationForImage}&client_id=${UNSPLASH_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      const urlImg = data.urls.small;

      document.body.style.backgroundImage = `linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1) ), url('${urlImg}')`;
      document.body.style.backgroundRepeat = 'no-repeat';
      document.body.style.backgroundSize = '100% 100vh';
    } catch (err) {
      if (err.name === 'SyntaxError') {
        document.body.style.backgroundImage = 'linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 1) )';
      }
    }
  }
  getLinkToImage();
}


document.querySelector('#loadBackground').addEventListener('click', () => {
  backgroundInit();
});
