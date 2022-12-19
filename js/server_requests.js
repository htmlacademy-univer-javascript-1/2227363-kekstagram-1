import { pictureObjects } from './data.js';
import { setEventFilter } from './gallery.js';



function getData(render) {
  fetch('https://26.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((photos) => render(photos))
    .then(() => {
      setEventFilter();
    })
    .catch(() => render(pictureObjects));
};


function sendData(onFail, onSuccess, body) {
  fetch(
    'https://26.javascript.pages.academy/kekstagram',
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (!response.ok) {
        if (response.status === 400) {
          onFail('Wrong data format!');
        } else {
          onFail('Data not sent!');
        }
      } else {
        onSuccess();
      }
    })
    .catch(() => {
      onFail('Data not sent!');
    });
};

export { getData, sendData };
