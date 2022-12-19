const form = document.querySelector('.img-upload__form');
const hashtagsField = form.querySelector('.text__hashtags');
const submitButton = form.querySelector('.img-upload__submit');

const description = form.querySelector('.text__description');

const hashtagRegex = /(^#[A-Za-zА-Яа-яЁё0-9]{1,19}$)|(^\s*$)/




let pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'text-invalid',
  successClass: 'text-valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'div',
  errorTextClass: 'text-invalid__error'
}, true);


pristine.addValidator(
  hashtagsField,
  (value) => {
    const hashtagList = value.split(' ');

    let isHashtagRight = true;
    hashtagList.forEach(text => {
        isHashtagRight = isHashtagRight & hashtagRegex.test(text);
    });
    return isHashtagRight;
  },
  'incorrect hashtag'
  );

pristine.addValidator(
    hashtagsField,
    (hashtag) => {
        const keys = hashtag.split(' ').map((tag) => tag.toLowerCase());

        return (new Set(keys).size == keys.length);
    },
    'Hashtags is not uniuque'
);

pristine.addValidator(
    description,
    (value) => value.length < 140,
    'Comment is too big'
);


export { pristine };

