import { resetEffect, resetScale, setPreview, setSlider } from "./modify_image.js";
import { pristine } from "./post_validaton.js";
import { sendData } from "./server_requests.js";
import { isEsc } from "./util.js";

const form = document.querySelector('#upload-select-image');


const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCansel = document.querySelector('#upload-cancel');
const description = form.querySelector('.text__description');

const imgUploadForm = document.querySelector('.img-upload__form');
const textHashtags = imgUploadForm.querySelector('.text__hashtags');

const successTemplate = document.querySelector('#success');
const errorTemplate = document.querySelector('#error');
const imgUploadSubmit = form.querySelector('.img-upload__submit');


function closeOverlay() {
    pristine.reset();
    imgUploadForm.reset();
    resetScale();
    resetEffect();
    imgUploadOverlay.classList.add('hidden');
    document.body.classList.remove('modal-open');
    document.removeEventListener('keydown', escListener);
    uploadCansel.removeEventListener('click', closeOverlay);
}

function escListener(evt) {
    if (isEsc(evt) && evt.target !== description && evt.target !== textHashtags) {
        closeOverlay();
    }
}

function createPostForm() {
  setSlider();

  uploadFile.addEventListener('change', () => {
    setPreview();
    document.addEventListener('keydown', escListener);
    uploadCansel.addEventListener('click', closeOverlay, {once: true});
    document.body.classList.add('modal-open');
    imgUploadOverlay.classList.remove('hidden');
  });
};


function createSuccessElement() {
    const successElement = successTemplate.cloneNode(true).content.querySelector('.success');

    successElement.addEventListener(
      'click',
      (evt) => {
        if (evt.target.className !== 'success__inner' && evt.target.className !== 'success__title') {
          document.body.removeChild(successElement);
          closeOverlay();
        }
      });
    document.body.appendChild(successElement);
};


function createErrorElement(errorTitle) {
    const errorElement = errorTemplate.cloneNode(true).content.querySelector('.error');
    errorElement.querySelector('.error__title').textContent = errorTitle;

    errorElement.addEventListener(
      'click',
      (evt) => {
        if (evt.target.className !== 'error__inner' && evt.target.className !== 'error__title') {
          document.body.removeChild(errorElement);
        }
      });
    document.body.appendChild(errorElement);
  };


export function activateUploadFile() {
    form.addEventListener('submit',
      (evt) => {
        evt.preventDefault();
        if (pristine.validate()) {
          imgUploadSubmit.textContent = 'Submit';
          sendData(
            createErrorElement,
            createSuccessElement,
            new FormData(form));
          closeOverlay();
        } else {
          imgUploadSubmit.textContent = 'Wrong data, check again';
        }
      });

    createPostForm();
    resetEffect();
    resetScale();
  };

