import { isEsc } from "./util";

const form = document.querySelector('.img-upload__form');
const hashtags = form.querySelector('.text__hashtags');
const submitButton = form.querySelector('.img-upload__submit');

const hashtagRegex = /(^#[A-Za-zА-Яа-яЁё0-9]{1,19}$)|(^\s*$)/


let isHashtagRight = true;
let isCommentRight = true;


const pristine = new Pristine(form, {
    classTo: 'img-upload__field-wrapper',
    errorClass: 'text-invalid',
    successClass: 'text-valid',
    errorTextParent: 'img-upload__field-wrapper',
    errorTextTag: 'div',
    errorTextClass: 'text-invalid__error'
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
    hashtags,
    (hashtag) => {
        const keys = hashtag.split(' ').map((tag) => tag.toLowerCase());
        return (new Set(hashtags).size == hashtags.length);
    },
    'Hashtag is not uniuque'
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


export {pristine};

