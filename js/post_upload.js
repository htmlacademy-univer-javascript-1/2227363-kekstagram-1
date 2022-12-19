import { resetEffect, resetScale, setPreview, setSlider } from "./modify_image.js";
import { pristine } from "./post_validaton.js";
import { isEsc } from "./util.js";

const uploadFile = document.querySelector('#upload-file');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCansel = document.querySelector('#upload-cancel');
const description = form.querySelector('.text__description');

const imgUploadForm = document.querySelector('.img-upload__form');
const textHashtags = imgUploadForm.querySelector('.text__hashtags');

function closeOverlay() {
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
        evt.preventDefault();
        closeOverlay();
    }
}

function createPostForm() {
  imgUploadForm.addEventListener('submit', (evt) => {
    if (!pristine.validate()) {
      evt.preventDefault();
    }
  });

  setSlider();

  uploadFile.addEventListener('change', () => {
    setPreview();
    document.addEventListener('keydown', escListener);
    uploadCansel.addEventListener('click', closeOverlay, {once: true});
    document.body.classList.add('modal-open');
    imgUploadOverlay.classList.remove('hidden');
  });
};

export {createPostForm};
