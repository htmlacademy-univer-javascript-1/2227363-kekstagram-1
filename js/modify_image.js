import {EFFECTS} from './data.js';

const DEFAULT_EFFECT = 'none';

const imgPreview = document.querySelector('.img-upload__preview');
const effectsList = document.querySelector('.effects__list');
const slider = document.querySelector('.effect-level__slider');
const effectLevel = document.querySelector('.img-upload__effect-level');
const effectLevelValue = document.querySelector('.effect-level__value');

const scaleConrolValue = document.querySelector('.scale__control--value');
const scaleControl = document.querySelector('.img-upload__scale');


let currentEffect = DEFAULT_EFFECT;


function setEffect(effect) {
  imgPreview.classList.add(`effects_preview--${effect}`);
  imgPreview.style.filter = DEFAULT_EFFECT;
  effectLevelValue.value = slider.noUiSlider.get();
  if (effect === DEFAULT_EFFECT) {
    effectLevel.classList.add('hidden');
  }
  else {
    effectLevel.classList.remove('hidden');
    slider.noUiSlider.updateOptions(EFFECTS[effect].noui);
    imgPreview.style.filter = EFFECTS[effect].filter(slider.noUiSlider.get());
  }
};


function resetEffect() {
  currentEffect = DEFAULT_EFFECT;
  setEffect(currentEffect);
};


function onEffectChange(evt) {
  if (evt.target.closest('.effects__radio')) {
    currentEffect = evt.target.value;
    setEffect(currentEffect);
  }
};


function onMoveSlider() {
  effectLevelValue.value = slider.noUiSlider.get();
  if (currentEffect !== DEFAULT_EFFECT) {
    imgPreview.style.filter = EFFECTS[currentEffect].filter(slider.noUiSlider.get());
  }
};


function setSlider() {
  effectLevel.classList.add('hidden');
  noUiSlider.create(
    slider, {
      range: {
        min: 0,
        max: 100
      },
      start: 100,
      step: 1,
      connect: 'lower',
    }
  );
  setEffect(currentEffect);
  effectsList.addEventListener('change', onEffectChange);
  slider.noUiSlider.on('update', onMoveSlider);
};


const STEP = 25;
const DEFAULT_SCALE = 100;


function changeScale(evt) {
  const scaleValue = parseInt(scaleConrolValue.value.replace('%', ''), 10);

  if (evt.target.closest('.scale__control--smaller') && scaleValue > 25) {
    scaleConrolValue.value = `${scaleValue - STEP}%`;
    imgPreview.style.transform = `scale(${(scaleValue - STEP) / 100})`;
  } else if (evt.target.closest('.scale__control--bigger') && scaleValue < 100) {
    scaleConrolValue.value = `${scaleValue + STEP}%`;
    imgPreview.style.transform = `scale(${(scaleValue + STEP) / 100})`;
  }
};


function setPreview() {
  imgPreview.style.transform = `scale(${DEFAULT_SCALE / 100})`;
  scaleConrolValue.value = `${DEFAULT_SCALE}%`;
  scaleControl.addEventListener('click', changeScale);
};


function resetScale() {
  scaleControl.removeEventListener('click', changeScale);
};


export {resetScale, setPreview, setSlider, resetEffect}
