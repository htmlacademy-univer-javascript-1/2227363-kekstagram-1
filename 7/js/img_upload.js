import { isEsc } from "./util.js";

const imgUpload = document.querySelector('.img-upload__overrlay');
const uploadCansel = document.querySelector('#upload-cancel');
const uploadFile = document.querySelector('#upload-file');

const form = document.querySelector('.img-upload__form');
const description = form.querySelector('.text__description');
const hashtags = form.querySelector('.text__hashtags');
const submitButton = form.querySelector('.img-upload__submit');

const hashtagRegex = /(^#[A-Za-zА-Яа-яЁё0-9]{1,19}$)|(^\s*$)/


let isHashtagRight = true;
let isCommentRight = true;

function closeOverlay() {
    uploadFile.value = '';
    imgUpload.classList.add('hidden');
    document.body.classList.add('modal-open');
    document.removeEventListener('keydown', escListener);
}


function escListener(evt) {
    if (isEsc(evt)) {
        evt.preventDefault();
        closeOverlay();
    }
}


uploadFile.addEventListener('change', (evt) => {
    document.addEventListener('keydown', escListener);
    uploadCansel.addEventListener('click', closeOverlay);

    evt.preventDefault();

    document.body.classList.add('modal-open');
    imgUpload.classList.remove('hidden');
});



const pristine = new Pristine(form, {
    classTo: 'text',
    errorClass: 'text--invalid',
    successClass: 'text-valid',
    errorTextParent: 'text',
    errorTextTag: 'div',
    errorTextClass: 'text__error'
}, true);


pristine.addValidation(
    hashtags,
    (value) => {
        const hashtags = value.split(' ');
        isHashtagRight = hashtags.every(hashtagRegex.test(text));
        submitButton.setAttribute('disabled', (!isHashtagRight || !isCommentRight)? 'false' : 'true');
        return isHashtagRight;
    },
    'incorrect hashtag'
);

pristine.addValidation(
    description,
    (value) => {
        isCommentRight = value.length < 140;
        submitButton.setAttribute('disabled', (!isHashtagRight || !isCommentRight)? 'false' : 'true');
        return isCommentRight;
    },
    'Comment is too big'
);

form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    pristine.validate();
});
