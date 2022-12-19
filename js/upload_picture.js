import { PUCTURE_FORMATS } from "./data.js";

const imgUploadInput = document.querySelector('.img-upload__input');
const imgUploadPreview = document.querySelector('.img-upload__preview img');
const effectsPreview = document.querySelectorAll('.effects__preview');


export function setFileListener(evt) {
  const file = evt.target.files[0];
  if (PUCTURE_FORMATS.some((type) => file.name.toLowerCase().endsWith(type))) {
    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      imgUploadPreview.src = fileReader.result;
      effectsPreview.forEach((preview) => {
        preview.style.backgroundImage = `url('${fileReader.result}')`;
      });
    });
    fileReader.readAsDataURL(file);
  }
  else {
    imgUploadInput.value = '';
    imgUploadPreview.src = 'img/upload-default-image.jpg';
    effectsPreview.forEach((preview) => {
      preview.style.removeProperty('background-image');
    });
  }
};
