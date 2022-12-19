import { debounce, getRandomUniqueElements } from "./util.js";

const filterButtons = document.querySelectorAll('.img-filters__button');
const imgFilters = document.querySelector('.img-filters');

let currentPictures;

export function activatePictures(pictures, mode) {
  currentPictures = pictures;
  prepareBigPicture();
  document.querySelectorAll('.picture').forEach((pic) => pic.remove());
  switch (mode) {
    case ("filter-default"):
      pictures.forEach((object) => drawSmallPicture(object));
      break;
    case ("filter-random"):
      getRandomUniqueElements(pictures, 10).forEach((object) => drawSmallPicture(object));
      break;
    default:
      const sortedPics = Array.from(pictures);
      sortedPics.sort((first, second) => second.comments.length - first.comments.length);
      sortedPics.forEach((object) => drawSmallPicture(object));
      break;
  }
}

const debouncedActivatePictures = debounce(activatePictures, 500);

function drawSmallPicture(object) {
  let newObject = document.querySelector('#picture').cloneNode(true).content;

  newObject.querySelector('.picture__img').setAttribute('src', object.url);
  newObject.querySelector('.picture__likes').textContent = object.likes;
  newObject.querySelector('.picture__comments').textContent = object.comments.length;


  newObject.querySelector('.picture').addEventListener('click', (evt) => {
    evt.preventDefault();

    drawBigPicture(object);
  });

  document.querySelector('.pictures').append(newObject);

}


function prepareBigPicture() {
  let bigPicture = document.querySelector('.big-picture');


  bigPicture.querySelector('#picture-cancel').addEventListener('click', (evt) => {
    evt.preventDefault();


    bigPicture.classList.add('hidden');
    document.querySelector('body').classList.remove('modal-open');
  });

    document.addEventListener('keydown', function(event){
      if(event.key === "Escape") {
        bigPicture.classList.add('hidden');
        document.querySelector('body').classList.remove('modal-open');
      }
    });

}


function drawBigPicture(object) {
  document.querySelector('body').classList.add('modal-open');

  let bigPicture = document.querySelector('.big-picture');
  bigPicture.classList.remove('hidden');

  bigPicture.querySelector('.big-picture__img').querySelector('img').setAttribute('src', object.url);
  bigPicture.querySelector('.big-picture__img').querySelector('img').setAttribute('alt', object.description);
  bigPicture.querySelector('.social__caption').textContent = object.description;
  bigPicture.querySelector('.likes-count').textContent = object.likes;
  bigPicture.querySelector('.comments-count').textContent = object.comments.length;



  let socialComments = bigPicture.querySelector('.social__comments');
  let commentLoader =  bigPicture.querySelector(".social__comments-loader");
  commentLoader.classList.remove('hidden');


  socialComments.querySelectorAll('.social__comment').forEach((oldComment) => oldComment.remove());

  let allComments = [];

  object.comments.forEach((comment) => {
    let listItem = document.createElement('li');
    listItem.classList.add('social__comment');

    let commentImage = document.createElement('img');
    commentImage.setAttribute('class', 'social__picture');
    commentImage.setAttribute('src', comment.avatar);
    commentImage.setAttribute('alt', comment.name);
    commentImage.setAttribute('width', 35);
    commentImage.setAttribute('heigth', 35);


    let commentText = document.createElement('p');
    commentText.setAttribute('class', 'social__text');
    commentText.textContent = comment.message;

    listItem.append(commentImage);
    listItem.append(commentText);

    allComments.push(listItem);
  });

  let commentIndex = 0;

  while (commentIndex < 5 && commentIndex < allComments.length) {
    socialComments.append(allComments[commentIndex]);
    commentIndex++;
  }

  if (commentIndex >= allComments.length) {
    commentLoader.classList.add('hidden');
  }

  bigPicture.querySelector(".current-comments-count").textContent = commentIndex;

  commentLoader.addEventListener('click', function addComments (evt) {
    let comentBorder = commentIndex + 5;
    while (commentIndex < comentBorder && commentIndex < allComments.length) {
      socialComments.append(allComments[commentIndex]);
      commentIndex++;
    }

    if (commentIndex >= allComments.length) {
      commentLoader.classList.add('hidden');
      commentLoader.removeEventListener('click', addComments);
    }

    bigPicture.querySelector(".current-comments-count").textContent = commentIndex;
  });
}


export function setEventFilter() {
  imgFilters.classList.remove('img-filters--inactive');
  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      filterButtons.forEach((otherButton) => otherButton.classList.remove('img-filters__button--active'));
      button.classList.add('img-filters__button--active');
      debouncedActivatePictures(currentPictures, button.id);
    });
  });
};
